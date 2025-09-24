/**
 * Site context for managing theme and language state
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, Theme } from '../content/types';
import { getStoredTheme, applyTheme, type ThemeId } from '../config/themes';

interface SiteContextValue {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Combined helpers
  isLightTheme: boolean;
  isChinese: boolean;
}

const SiteContext = createContext<SiteContextValue | undefined>(undefined);

interface SiteProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  initialTheme?: Theme;
}

export function SiteProvider({
  children,
  initialLanguage = 'en',
  initialTheme = 'dark'
}: SiteProviderProps) {
  // Initialize from localStorage or props
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('language');
      if (stored === 'en' || stored === 'zh') {
        return stored;
      }
    }
    return initialLanguage;
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme();
    return stored || initialTheme;
  });

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    // Update document lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Update localStorage and apply theme when theme changes
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme as ThemeId);
  };

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Toggle between themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Apply theme on mount
  useEffect(() => {
    applyTheme(theme as ThemeId);
  }, []);

  const value: SiteContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    theme,
    setTheme,
    toggleTheme,
    isLightTheme: theme === 'light',
    isChinese: language === 'zh',
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

/**
 * Hook to use site context
 */
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}

/**
 * Hook to use language
 */
export function useLanguage() {
  const { language, setLanguage, toggleLanguage, isChinese } = useSite();
  return { language, setLanguage, toggleLanguage, isChinese };
}

/**
 * Hook to use theme
 */
export function useTheme() {
  const { theme, setTheme, toggleTheme, isLightTheme } = useSite();
  return { theme, setTheme, toggleTheme, isLightTheme };
}

/**
 * HOC to inject site context props
 */
export function withSiteContext<P extends object>(
  Component: React.ComponentType<P & SiteContextValue>
): React.FC<P> {
  return function WithSiteContext(props: P) {
    const siteContext = useSite();
    return <Component {...props} {...siteContext} />;
  };
}