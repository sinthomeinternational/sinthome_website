/**
 * Translation system utilities
 * Handles loading and accessing translations based on current language
 */

import type { Language } from '../config/languages';
import { getCurrentLanguage } from '../config/languages';

// Import all translation files
import enTranslations from '../content/translations/en/site';
import zhTranslations from '../content/translations/zh/site';

// Translation map
const translations = {
  en: enTranslations,
  zh: zhTranslations,
} as const;

/**
 * Get translations for the current language
 * @param lang Optional language override
 * @returns Translation object for the specified language
 */
export function getTranslations(lang?: Language) {
  const language = lang || getCurrentLanguage();
  return translations[language] || translations.en;
}

/**
 * Get a specific translation by path
 * @param path Dot-separated path to translation (e.g., 'navigation.home')
 * @param lang Optional language override
 * @returns The translation string or the path if not found
 */
export function t(path: string, lang?: Language): string {
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
 * Hook for React components to get translations
 * Re-renders when language changes
 */
export function useTranslations() {
  if (typeof window === 'undefined') {
    return getTranslations();
  }

  // In browser, get current language from localStorage
  const lang = getCurrentLanguage();
  return getTranslations(lang);
}

/**
 * Get the current language from URL or localStorage
 * For SSR compatibility
 */
export function getCurrentLang(): Language {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    return getCurrentLanguage();
  }

  // Default to English for SSR
  return 'en';
}