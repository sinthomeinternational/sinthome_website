import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx/lite";
import ThemeLanguageSwitcher from "../ui/ThemeLanguageSwitcher";
import { getCurrentLanguageClient, useTranslations } from "../../lib/translations";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface TopNavigationProps {
  variant?: 'fixed' | 'static';
  theme?: 'default' | 'redwhite';
}

// Shared styles
const logoStyle = {
  fontFamily: "'League Spartan', sans-serif",
  fontWeight: 700,
  fontSize: "1.5rem",
  letterSpacing: "0.01em",
  transform: "scaleX(1)"
};

// Logo component
const Logo = ({ href, className }: { href: string; className: string }) => (
  <a href={href} className={className} style={logoStyle} aria-label="SINTHOME homepage">
    SINTHOME
  </a>
);

// Navigation items component
interface NavItemsProps {
  items: NavItem[];
  getFullPath: (path: string) => string;
  linkClasses: string;
  dropdownBgClasses: string;
  dropdownLinkClasses: string;
  openDropdown: string | null;
  handleMouseEnter: (label: string) => void;
  handleMouseLeave: () => void;
}

const NavItems = ({
  items,
  getFullPath,
  linkClasses,
  dropdownBgClasses,
  dropdownLinkClasses,
  openDropdown,
  handleMouseEnter,
  handleMouseLeave
}: NavItemsProps) => (
  <>
    {items.map((item) => (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => item.children && handleMouseEnter(item.label)}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={getFullPath(item.href || "#")}
          className={clsx(
            linkClasses,
            "py-4 text-sm font-medium",
            item.children && "flex items-center gap-1"
          )}
        >
          {item.label}
          {item.children && (
            <svg
              className={clsx(
                "w-4 h-4 transition-transform",
                openDropdown === item.label && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </a>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {item.children && openDropdown === item.label && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 w-48 z-50"
            >
              {/* Invisible bridge to prevent gap */}
              <div className="h-2 bg-transparent" />
              <div className={clsx(
                "rounded-lg shadow-xl border overflow-hidden",
                dropdownBgClasses
              )}>
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={getFullPath(child.href || "#")}
                    className={dropdownLinkClasses}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}
  </>
);

export default function TopNavigation({ variant = 'fixed', theme = 'default' }: TopNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get current language from URL
  const [currentLang, setCurrentLang] = useState('en');
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  // Get translations
  const translations = useTranslations();

  useEffect(() => {
    const lang = getCurrentLanguageClient();
    setCurrentLang(lang);

    // Filter out "Home" from navigation items and map dropdown correctly
    if (translations?.navigation?.items) {
      const filteredItems = translations.navigation.items
        .filter(item => item.label !== 'Home' && item.label !== '首页')
        .map(item => ({
          label: item.label,
          href: item.href,
          children: item.dropdown as NavItem[] | undefined
        }));
      setNavItems(filteredItems);
    }
  }, [translations]);

  // Handle base path for GitHub Pages, theme routing, and language parameter
  const getFullPath = (path: string) => {
    const basePath = import.meta.env.BASE_URL || "";
    const themePath = theme === 'redwhite' ? 'redwhite/' : '';

    let fullPath: string;
    if (path.startsWith("/")) {
      fullPath = `${basePath}${themePath}${path.slice(1)}`;
    } else {
      fullPath = path;
    }

    // Preserve language parameter in all navigation links
    if (currentLang === 'zh') {
      return `${fullPath}${fullPath.includes('?') ? '&' : '?'}lang=zh`;
    }
    return fullPath;
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // Increased delay for better UX
  };

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  // Style variations based on variant and theme
  const isRedWhite = theme === 'redwhite';

  const navClasses = variant === 'fixed'
    ? clsx(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b",
        isRedWhite ? "bg-white/95 border-gray-200" : "bg-black/90 border-white/10"
      )
    : clsx(
        "w-full border-b sticky top-0 z-50",
        isRedWhite ? "bg-white border-gray-200" : "bg-black border-white/10"
      );

  const containerClasses = variant === 'static'
    ? "px-4 sm:px-8"
    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  const linkClasses = isRedWhite
    ? "text-red-600 hover:text-red-800 transition-colors"
    : "text-white hover:text-red-500 transition-colors";

  const dropdownBgClasses = isRedWhite
    ? "bg-white border-gray-200"
    : "bg-zinc-900 border-white/10";

  const dropdownLinkClasses = isRedWhite
    ? "block px-4 py-3 text-sm text-black hover:bg-red-600 hover:text-white transition-colors"
    : "block px-4 py-3 text-sm text-white hover:bg-red-600 hover:text-white transition-colors";

  const mobileBgClasses = isRedWhite
    ? "bg-white border-gray-200"
    : "bg-zinc-900 border-white/10";

  const mobileLinkClasses = isRedWhite
    ? "text-black hover:text-red-600"
    : "text-white hover:text-red-500";

  const mobileSubLinkClasses = isRedWhite
    ? "text-gray-600 hover:text-red-600"
    : "text-zinc-400 hover:text-red-500";

  const buttonClasses = isRedWhite
    ? "text-black hover:bg-gray-100"
    : "text-white hover:bg-white/10";

  return (
    <nav className={navClasses}>
      <div className={containerClasses}>
        <div className="flex items-center justify-between h-16">
          {variant === 'fixed' ? (
            <>
              {/* Fixed variant: Logo left, nav right */}
              <Logo
                href={getFullPath("/")}
                className={linkClasses}
              />

              <div className="hidden lg:flex items-center space-x-8">
                <NavItems
                  items={navItems}
                  getFullPath={getFullPath}
                  linkClasses={linkClasses}
                  dropdownBgClasses={dropdownBgClasses}
                  dropdownLinkClasses={dropdownLinkClasses}
                  openDropdown={openDropdown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
                <ThemeLanguageSwitcher />
              </div>
            </>
          ) : (
            <>
              {/* Static variant: Nav left, logo right */}
              <div className="hidden lg:flex items-center gap-6">
                <NavItems
                  items={navItems}
                  getFullPath={getFullPath}
                  linkClasses={linkClasses}
                  dropdownBgClasses={dropdownBgClasses}
                  dropdownLinkClasses={dropdownLinkClasses}
                  openDropdown={openDropdown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              </div>

              <div className="flex items-center gap-6">
                <Logo
                  href={getFullPath("/")}
                  className={linkClasses}
                />
                <ThemeLanguageSwitcher />
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={clsx(
              "lg:hidden p-2 rounded-lg transition-colors",
              buttonClasses
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "lg:hidden border-t",
              mobileBgClasses
            )}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={getFullPath(item.href || "#")}
                    className={clsx(
                      "block py-2 transition-colors font-medium",
                      mobileLinkClasses
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={getFullPath(child.href || "#")}
                          className={clsx(
                            "block py-2 text-sm transition-colors",
                            mobileSubLinkClasses
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}