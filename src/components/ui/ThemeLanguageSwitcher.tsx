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

    // Apply initial theme
    applyTheme(storedTheme);
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