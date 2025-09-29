import { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx/lite";
import type { NavigationContent, Language, Theme } from "../../content/types";
import { getTheme } from "../../config/themes";

interface UniversalNavigationProps {
  navigation: NavigationContent;
  language: Language;
  theme: Theme;
  variant?: 'fixed' | 'static';
}

// Logo component
const Logo = ({
  text,
  href,
  theme,
  language
}: {
  text: string;
  href: string;
  theme: Theme;
  language?: Language;
}) => {
  const themeConfig = getTheme(theme);
  const logoClasses = theme === 'light'
    ? "text-red-600 hover:text-red-800"
    : "text-white hover:text-red-500";

  const logoStyle = {
    fontFamily: "'League Spartan', sans-serif",
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "0.01em",
  };

  // Build URL with parameters
  const buildLogoUrl = () => {
    const basePath = import.meta.env.BASE_URL || '/';
    const fullPath = `${basePath}${href.startsWith('/') ? href.slice(1) : href}`;

    // Get current URL parameters (only in browser)
    let currentTheme = theme;
    let currentLang = language || 'en';

    if (typeof window !== 'undefined') {
      const currentParams = new URLSearchParams(window.location.search);
      currentTheme = (currentParams.get('theme') as Theme) || theme;
      currentLang = (currentParams.get('lang') as Language) || language || 'en';
    }

    const params = new URLSearchParams();
    if (currentLang !== 'en') params.set('lang', currentLang);
    if (currentTheme) params.set('theme', currentTheme);

    const queryString = params.toString();
    return queryString ? `${fullPath}?${queryString}` : fullPath;
  };

  return (
    <a href={buildLogoUrl()} className={clsx("transition-colors", logoClasses)} style={logoStyle}>
      {text}
    </a>
  );
};

// Navigation item component
const NavItem = ({
  item,
  theme,
  language,
  isTop = true
}: {
  item: NavigationContent['items'][0];
  theme: Theme;
  language: Language;
  isTop?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const basePath = import.meta.env.BASE_URL || '/';
  const themeConfig = getTheme(theme);

  // Theme-specific styles
  const linkClasses = theme === 'light'
    ? "text-red-600 hover:text-red-800"
    : "text-white hover:text-red-500";

  const dropdownBg = theme === 'light'
    ? "bg-white border-gray-200"
    : "bg-zinc-900 border-zinc-800";

  const dropdownItemClasses = theme === 'light'
    ? "text-gray-700 hover:bg-red-50 hover:text-red-700"
    : "text-zinc-300 hover:bg-zinc-800 hover:text-white";

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Build URLs with language and theme parameters
  const buildUrl = (href: string) => {
    if (href.startsWith('http')) return href;

    // Start with the base path and href
    const cleanHref = href.startsWith('/') ? href : `/${href}`;
    const fullPath = `${basePath}${cleanHref.slice(1)}`;

    // Get current URL parameters (only in browser)
    let currentTheme = theme;
    let currentLang = language;

    if (typeof window !== 'undefined') {
      const currentParams = new URLSearchParams(window.location.search);
      currentTheme = (currentParams.get('theme') as Theme) || theme;
      currentLang = (currentParams.get('lang') as Language) || language;
    }

    // Add language and theme as URL parameters
    const params = new URLSearchParams();
    if (currentLang !== 'en') params.set('lang', currentLang);
    if (currentTheme) params.set('theme', currentTheme);

    const queryString = params.toString();
    return queryString ? `${fullPath}?${queryString}` : fullPath;
  };

  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
      onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
    >
      <a
        href={buildUrl(item.href)}
        className={clsx(
          "px-4 py-2 text-sm font-medium transition-colors",
          linkClasses,
          isTop && "block"
        )}
        onClick={(e) => {
          if (hasDropdown && isTop) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {item.label}
        {hasDropdown && (
          <span className="ml-1">▼</span>
        )}
      </a>

      {hasDropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "absolute left-0 mt-1 w-56 rounded-md border shadow-lg z-50",
                dropdownBg
              )}
            >
              <div className="py-1">
                {item.dropdown!.map((subItem) => (
                  <a
                    key={subItem.href}
                    href={buildUrl(subItem.href)}
                    className={clsx(
                      "block px-4 py-2 text-sm transition-colors",
                      dropdownItemClasses
                    )}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

// Language/Theme switcher
const Switcher = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange
}: {
  language: Language;
  theme: Theme;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: Theme) => void;
}) => {
  const buttonClasses = theme === 'light'
    ? "text-gray-600 hover:text-red-600 border-gray-300"
    : "text-zinc-400 hover:text-white border-zinc-700";

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <button
        onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
        className={clsx(
          "px-3 py-1 text-xs font-medium border rounded transition-colors",
          buttonClasses
        )}
        aria-label="Switch language"
      >
        {language === 'en' ? '中文' : 'EN'}
      </button>

      {/* Theme Switcher */}
      <button
        onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        className={clsx(
          "px-3 py-1 text-xs font-medium border rounded transition-colors",
          buttonClasses
        )}
        aria-label="Switch theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default function UniversalNavigation({
  navigation,
  language,
  theme,
  variant = 'fixed'
}: UniversalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeConfig = getTheme(theme);

  // Navigation container styles
  const navClasses = clsx(
    "w-full z-50 transition-all duration-300",
    variant === 'fixed' ? "fixed top-0" : "relative",
    theme === 'light'
      ? "bg-white/95 backdrop-blur-sm border-b border-gray-200"
      : "bg-black/95 backdrop-blur-sm border-b border-zinc-800"
  );

  // Mobile menu button styles
  const mobileButtonClasses = theme === 'light'
    ? "text-gray-600 hover:text-red-600"
    : "text-zinc-400 hover:text-white";

  // Handle language change
  const handleLanguageChange = (newLang: Language) => {
    // Emit custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('language-change', {
        detail: { language: newLang }
      }));
    }
    // Store preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    // Emit custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-change', {
        detail: { theme: newTheme }
      }));
    }
    // Store preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo
            text={navigation.logo?.text || 'SINTHOME'}
            href={navigation.logo?.href || '/'}
            theme={theme}
            language={language}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navigation.items.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                theme={theme}
                language={language}
              />
            ))}
            <Switcher
              language={language}
              theme={theme}
              onLanguageChange={handleLanguageChange}
              onThemeChange={handleThemeChange}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              "md:hidden p-2 transition-colors",
              mobileButtonClasses
            )}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.items.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    theme={theme}
                    language={language}
                    isTop={false}
                  />
                ))}
                <div className="pt-4 border-t">
                  <Switcher
                    language={language}
                    theme={theme}
                    onLanguageChange={handleLanguageChange}
                    onThemeChange={handleThemeChange}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}