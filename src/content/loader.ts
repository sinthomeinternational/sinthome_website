/**
 * Content loader utilities for multi-language support
 */

import type { SiteContent, Language, ProjectContent, EventContent } from './types';

// Dynamic imports for content files
const contentModules = {
  en: () => import('./data/en'),
  zh: () => import('./data/zh')
};

// Cache for loaded content
const contentCache = new Map<Language, SiteContent>();

/**
 * Load content for a specific language
 */
export async function loadContent(language: Language): Promise<SiteContent> {
  // Check cache first
  if (contentCache.has(language)) {
    return contentCache.get(language)!;
  }

  try {
    const module = await contentModules[language]();
    const content = module.default as SiteContent;

    // Cache the loaded content
    contentCache.set(language, content);

    return content;
  } catch (error) {
    console.error(`Failed to load content for language: ${language}`, error);

    // Fallback to English if language not found
    if (language !== 'en') {
      return loadContent('en');
    }

    throw error;
  }
}

/**
 * Get page content by key
 */
export async function getPageContent(language: Language, pageKey: string) {
  const content = await loadContent(language);
  return content.pages[pageKey];
}

/**
 * Get navigation content
 */
export async function getNavigationContent(language: Language) {
  const content = await loadContent(language);
  return content.navigation;
}

/**
 * Get footer content
 */
export async function getFooterContent(language: Language) {
  const content = await loadContent(language);
  return content.footer;
}

/**
 * Get common content (buttons, labels, messages)
 */
export async function getCommonContent(language: Language) {
  const content = await loadContent(language);
  return content.common;
}

/**
 * Get all projects
 */
export async function getProjects(language: Language): Promise<ProjectContent[]> {
  const content = await loadContent(language);
  return content.projects || [];
}

/**
 * Get project by ID
 */
export async function getProject(language: Language, id: string): Promise<ProjectContent | undefined> {
  const projects = await getProjects(language);
  return projects.find(p => p.id === id);
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(language: Language): Promise<ProjectContent[]> {
  const projects = await getProjects(language);
  return projects.filter(p => p.featured);
}

/**
 * Get all events
 */
export async function getEvents(language: Language): Promise<EventContent[]> {
  const content = await loadContent(language);
  return content.events || [];
}

/**
 * Get event by ID
 */
export async function getEvent(language: Language, id: string): Promise<EventContent | undefined> {
  const events = await getEvents(language);
  return events.find(e => e.id === id);
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(language: Language): Promise<EventContent[]> {
  const events = await getEvents(language);
  const now = new Date();

  return events
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get past events
 */
export async function getPastEvents(language: Language): Promise<EventContent[]> {
  const events = await getEvents(language);
  const now = new Date();

  return events
    .filter(e => new Date(e.endDate || e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Clear content cache (useful for hot reloading in dev)
 */
export function clearContentCache() {
  contentCache.clear();
}

/**
 * Get available languages
 */
export function getAvailableLanguages(): Language[] {
  return ['en', 'zh'];
}

/**
 * Get default language
 */
export function getDefaultLanguage(): Language {
  return 'en';
}

/**
 * Parse language from URL or browser
 */
export function detectLanguage(url?: URL, acceptLanguage?: string): Language {
  // Check URL first
  if (url) {
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0];
    if (urlLang === 'en' || urlLang === 'zh') {
      return urlLang;
    }
  }

  // Check browser language
  if (acceptLanguage) {
    if (acceptLanguage.includes('zh')) {
      return 'zh';
    }
  }

  return getDefaultLanguage();
}