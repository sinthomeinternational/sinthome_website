/**
 * Theme and Language Switcher Component
 * Uses URL parameters for language switching (SSR-compatible)
 * Themes are still stored in localStorage (client-side only)
 */

import { useState, useEffect } from 'react';
import type { Language } from '../../config/languages';
import type { ThemeId } from '../../config/themes';
import { getCurrentLanguageClient } from '../../lib/translations';
import { getStoredTheme, applyTheme } from '../../config/themes';

interface ThemeLanguageSwitcherProps {
  className?: string;
}

export default function ThemeLanguageSwitcher({
  className = ''
}: ThemeLanguageSwitcherProps) {
  // Initialize with values from browser to prevent mismatch
  const getInitialTheme = (): ThemeId => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
    }
    return 'dark';
  };

  const getInitialLang = (): Language => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('lang') === 'zh' ? 'zh' : 'en';
    }
    return 'en';
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeId>(getInitialTheme);
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get current theme from DOM (already applied by inline script)
    const root = document.documentElement;
    const currentThemeFromDOM = root.classList.contains('theme-light') ? 'light' : 'dark';
    setCurrentTheme(currentThemeFromDOM);

    // Get current language from URL
    const lang = getCurrentLanguageClient();
    setCurrentLang(lang);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';

    // Store the scroll position to restore it after reload
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());

    // Update URL with new language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);

    // Navigate to the new URL (this will trigger a page reload)
    window.location.href = url.toString();
  };

  if (!mounted) {
    // Render placeholder buttons to prevent layout shift
    // These will be replaced once React hydrates
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
            currentTheme === 'dark'
              ? 'bg-zinc-800 text-white'
              : 'bg-gray-200 text-gray-900'
          } opacity-50 cursor-wait`}
          aria-label="Loading theme switcher"
          disabled
        >
          {currentTheme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
            currentTheme === 'dark'
              ? 'bg-zinc-800 text-white'
              : 'bg-gray-200 text-gray-900'
          } opacity-50 cursor-wait`}
          aria-label="Loading language switcher"
          disabled
        >
          {currentLang === 'en' ? '中文' : 'EN'}
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
        {currentTheme === 'dark' ? 'Light' : 'Dark'}
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
        {currentLang === 'en' ? '中文' : 'EN'}
      </button>
    </div>
  );
}