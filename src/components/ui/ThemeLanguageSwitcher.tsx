/**
 * Theme and Language Switcher Component
 * Provides UI controls for switching between themes and languages
 */

import { useState, useEffect } from 'react';
import type { Language } from '../../config/languages';
import type { ThemeId } from '../../config/themes';
import { getCurrentLanguage, toggleLanguage } from '../../config/languages';
import { getStoredTheme, applyTheme } from '../../config/themes';

interface ThemeLanguageSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

export default function ThemeLanguageSwitcher({
  className = '',
  showLabels = false
}: ThemeLanguageSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get stored preferences
    const storedTheme = getStoredTheme() || 'dark';
    const storedLang = getCurrentLanguage();

    setCurrentTheme(storedTheme);
    setCurrentLang(storedLang);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleLanguageToggle = () => {
    const newLang = toggleLanguage();
    setCurrentLang(newLang);
    // Reload the page to apply new language
    window.location.reload();
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
        className="p-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
        aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {currentTheme === 'dark' ? (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
        {showLabels && (
          <span className="ml-2 text-sm">
            {currentTheme === 'dark' ? 'Light' : 'Dark'}
          </span>
        )}
      </button>

      {/* Language Switcher */}
      <button
        onClick={handleLanguageToggle}
        className="p-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors flex items-center"
        aria-label={`Switch to ${currentLang === 'en' ? 'Chinese' : 'English'}`}
      >
        <span className="text-sm font-medium">
          {currentLang === 'en' ? 'EN' : '中'}
        </span>
        {showLabels && (
          <span className="ml-2 text-sm">
            {currentLang === 'en' ? '中文' : 'English'}
          </span>
        )}
      </button>
    </div>
  );
}