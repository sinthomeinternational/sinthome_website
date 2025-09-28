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
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark');
  const [currentLang, setCurrentLang] = useState<Language>('en');
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

    // Update URL with new language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);

    // Navigate to the new URL (this will trigger a page reload)
    window.location.href = url.toString();
  };

  if (!mounted) {
    // Prevent hydration mismatch
    return null;
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