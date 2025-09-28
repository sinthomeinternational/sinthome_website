/**
 * Translation system utilities
 * Handles loading and accessing translations based on URL parameters
 * SSR-compatible implementation for Vercel deployment
 */

import type { Language } from '../config/languages';

// Import all translation files
import enTranslations from '../content/translations/en/site';
import zhTranslations from '../content/translations/zh/site';

// Translation map
const translations = {
  en: enTranslations,
  zh: zhTranslations,
} as const;

/**
 * Get language from URL parameters (SSR-compatible)
 * @param url URL object from Astro context
 * @returns Language code
 */
export function getLanguageFromURL(url: URL): Language {
  const lang = url.searchParams.get('lang');
  if (lang === 'zh') return 'zh';
  return 'en'; // Default to English
}

/**
 * Get translations for the specified language
 * @param lang Language code
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language = 'en') {
  return translations[lang] || translations.en;
}

/**
 * Get a specific translation by path
 * @param path Dot-separated path to translation (e.g., 'navigation.home')
 * @param lang Language code
 * @returns The translation string or the path if not found
 */
export function t(path: string, lang: Language = 'en'): string {
  const translations = getTranslations(lang);
  const keys = path.split('.');

  let current: any = translations;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      // Return the path if translation not found (for debugging)
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

/**
 * Build URL with language parameter
 * @param baseUrl Base URL or path
 * @param lang Language code
 * @param preserveParams Whether to preserve existing query parameters
 * @returns URL with language parameter
 */
export function buildLanguageURL(baseUrl: string, lang: Language, preserveParams: boolean = true): string {
  try {
    // Handle both absolute and relative URLs
    const url = baseUrl.startsWith('http')
      ? new URL(baseUrl)
      : new URL(baseUrl, 'http://localhost'); // Dummy base for relative URLs

    if (preserveParams) {
      // Preserve existing parameters
      url.searchParams.set('lang', lang);
    } else {
      // Clear parameters and set only language
      const pathname = url.pathname;
      url.search = '';
      url.searchParams.set('lang', lang);
    }

    // Return appropriate format
    return baseUrl.startsWith('http')
      ? url.toString()
      : `${url.pathname}${url.search}`;
  } catch {
    // Fallback for simple paths
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}lang=${lang}`;
  }
}

/**
 * Get current language from URL or fallback
 * For client-side React components
 */
export function getCurrentLanguageClient(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === 'zh') return 'zh';
  }
  return 'en';
}

/**
 * Hook for React components to get translations
 * Uses URL parameters for language detection
 */
export function useTranslations() {
  if (typeof window === 'undefined') {
    // SSR: return default translations
    return getTranslations('en');
  }

  // Client-side: get language from URL
  const lang = getCurrentLanguageClient();
  return getTranslations(lang);
}

// Deprecated functions for backward compatibility
export function getCurrentLanguage(): Language {
  console.warn('getCurrentLanguage() is deprecated. Use getLanguageFromURL() or getCurrentLanguageClient() instead.');
  return getCurrentLanguageClient();
}

export function getCurrentLang(): Language {
  console.warn('getCurrentLang() is deprecated. Use getLanguageFromURL() or getCurrentLanguageClient() instead.');
  return getCurrentLanguageClient();
}