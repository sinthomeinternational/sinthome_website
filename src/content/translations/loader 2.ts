/**
 * Content loader for translations
 * Dynamically loads the appropriate language content
 */

import type { Language } from '../../config/languages';
import type { SiteContent } from '../types';
import { enContent } from './en/site';
import { zhContent } from './zh/site';

// Map of language content
const contentMap: Record<Language, SiteContent> = {
  en: enContent,
  zh: zhContent,
};

/**
 * Get content for a specific language
 */
export function getContent(language: Language): SiteContent {
  return contentMap[language] || enContent;
}

/**
 * Get specific page content
 */
export function getPageContent(language: Language, pageName: string) {
  const content = getContent(language);
  return content.pages[pageName];
}

/**
 * Get navigation content
 */
export function getNavigationContent(language: Language) {
  const content = getContent(language);
  return content.navigation;
}

/**
 * Get common content (buttons, messages, etc.)
 */
export function getCommonContent(language: Language) {
  const content = getContent(language);
  return content.common;
}

/**
 * Get footer content
 */
export function getFooterContent(language: Language) {
  const content = getContent(language);
  return content.footer;
}