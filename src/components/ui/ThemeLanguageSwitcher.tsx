/**
 * Theme and Language Switcher Component
 * Uses URL parameters for language switching (SSR-compatible)
 * Themes are still stored in localStorage (client-side only)
 */

import { useState, useEffect } from 'react';
import type { Language } from '../../config/languages';
import type { ThemeId } from '../../config/themes';
import { getCurrentLanguageClient, useTranslations } from '../../lib/translations';
import { applyTheme } from '../../config/themes';

interface ThemeLanguageSwitcherProps {
  className?: string;
}

export default function ThemeLanguageSwitcher({
  className = ''
}: ThemeLanguageSwitcherProps) {
  // Default to dark theme during SSR
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Get translations
  const translations = useTranslations();

  useEffect(() => {
    setMounted(true);

    // Check URL params first for theme
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme') as ThemeId | null;

    // Get current theme from URL first, then localStorage, then fallback to DOM
    const storedTheme = localStorage.getItem('theme') as ThemeId;
    const root = document.documentElement;

    // Check multiple sources for theme
    let currentThemeFromDOM: ThemeId;
    if (urlTheme === 'light' || urlTheme === 'dark') {
      currentThemeFromDOM = urlTheme;
      // Apply the URL theme
      applyTheme(urlTheme);
    } else if (storedTheme === 'light' || storedTheme === 'dark') {
      currentThemeFromDOM = storedTheme;
    } else if (root.classList.contains('theme-light')) {
      currentThemeFromDOM = 'light';
    } else {
      // Default to dark if nothing else is set
      currentThemeFromDOM = 'dark';
    }

    setCurrentTheme(currentThemeFromDOM);

    // Get current language from URL
    const lang = getCurrentLanguageClient();
    setCurrentLang(lang);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    applyTheme(newTheme);

    // Update URL with theme parameter
    const url = new URL(window.location.href);
    url.searchParams.set('theme', newTheme);

    // Update URL without page reload using History API
    window.history.replaceState({}, '', url.toString());
  };

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';

    // Store the scroll position and active element to restore after reload
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    sessionStorage.setItem('languageSwitchTimestamp', Date.now().toString());

    // Update URL with new language parameter and preserve theme
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    url.searchParams.set('theme', currentTheme);

    // Navigate to new URL (causes page reload for SSR language switch)
    window.location.href = url.toString();
  };

  // Get button labels from translations or use defaults
  const getThemeButtonLabel = () => {
    if (!translations?.common?.buttons) {
      return currentTheme === 'dark' ? 'Light' : 'Dark';
    }
    return currentTheme === 'dark'
      ? translations.common.buttons.themeLight
      : translations.common.buttons.themeDark;
  };

  const getLanguageButtonLabel = () => {
    if (!translations?.common?.buttons) {
      return currentLang === 'en' ? '中文' : 'EN';
    }
    return currentLang === 'en'
      ? translations.common.buttons.languageChinese
      : translations.common.buttons.languageEnglish;
  };

  if (!mounted) {
    // Render placeholder buttons to prevent layout shift
    // These will be replaced once React hydrates
    // Default to dark theme appearance
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          className="px-3 py-1.5 rounded-lg transition-colors text-sm font-medium bg-zinc-800 text-white opacity-50 cursor-wait"
          aria-label="Loading theme switcher"
          disabled
        >
          Light
        </button>
        <button
          className="px-3 py-1.5 rounded-lg transition-colors text-sm font-medium bg-zinc-800 text-white opacity-50 cursor-wait"
          aria-label="Loading language switcher"
          disabled
        >
          中文
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Theme Switcher */}
      <button
        onClick={handleThemeToggle}
        className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
          currentTheme === 'dark'
            ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
        }`}
        aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {getThemeButtonLabel()}
      </button>

      {/* Language Switcher */}
      <button
        onClick={handleLanguageToggle}
        className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
          currentTheme === 'dark'
            ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
        }`}
        aria-label={`Switch to ${currentLang === 'en' ? 'Chinese' : 'English'}`}
      >
        {getLanguageButtonLabel()}
      </button>
    </div>
  );
}