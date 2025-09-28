/**
 * Language configuration for multi-language support
 * Manages available languages and translations
 */

export type Language = 'en' | 'zh';

export interface LanguageConfig {
  id: Language;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  locale: string;
}

// English language configuration
export const englishLanguage: LanguageConfig = {
  id: 'en',
  name: 'English',
  nativeName: 'English',
  direction: 'ltr',
  locale: 'en-US',
};

// Chinese language configuration
export const chineseLanguage: LanguageConfig = {
  id: 'zh',
  name: 'Chinese',
  nativeName: '中文',
  direction: 'ltr',
  locale: 'zh-CN',
};

// Language configuration map
export const languages: Record<Language, LanguageConfig> = {
  en: englishLanguage,
  zh: chineseLanguage,
};

// Helper function to get language config
export function getLanguage(languageId: Language = 'en'): LanguageConfig {
  return languages[languageId] || englishLanguage;
}

// Helper function to get current language from localStorage
export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'zh')) {
      return stored;
    }
  }
  return 'en'; // Default language
}

// Helper function to set language
export function setLanguage(languageId: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', languageId);
    document.documentElement.lang = getLanguage(languageId).locale;
  }
}

// Helper function to detect preferred language from browser
export function detectPreferredLanguage(): Language {
  // Check stored preference first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'zh')) {
      return stored;
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
  }

  return 'en'; // Default to English
}

// Helper function to toggle language
export function toggleLanguage(): Language {
  const current = getCurrentLanguage();
  const next = current === 'en' ? 'zh' : 'en';
  setLanguage(next);
  return next;
}