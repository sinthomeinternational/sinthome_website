import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx/lite";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Who We Are", href: "/who-we-are" },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "AI Hackathon", href: "/what-we-do/ai-hackathon/" },
      { label: "Workers Assist", href: "/what-we-do/workers-assist" },
      { label: "Plantcore AI", href: "/what-we-do/plantcore-ai" },
      { label: "SRTP", href: "/what-we-do/srtp" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Events", href: "/events#upcoming" },
      { label: "Past Events", href: "/events#past" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Donate", href: "/donate" },
];

interface TopNavigationProps {
  variant?: 'fixed' | 'static';
}

export default function TopNavigation({ variant = 'fixed' }: TopNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle base path for GitHub Pages
  const getFullPath = (path: string) => {
    const basePath = import.meta.env.BASE_URL || "";
    return path.startsWith("/") ? `${basePath}${path.slice(1)}` : path;
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

  // Style variations based on variant
  const navClasses = variant === 'fixed'
    ? "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
    : "w-full bg-black border-b border-white/10 sticky top-0 z-50";

  const linkClasses = "text-white hover:text-red-500 transition-colors";

  const dropdownBgClasses = "bg-zinc-900 border-white/10";

  const dropdownLinkClasses = "block px-4 py-3 text-sm text-white hover:bg-red-600 hover:text-white transition-colors";

  const mobileBgClasses = "bg-zinc-900 border-white/10";

  const mobileLinkClasses = "text-white hover:text-red-500";

  const mobileSubLinkClasses = "text-zinc-400 hover:text-red-500";

  const buttonClasses = "text-white hover:bg-white/10";

  return (
    <nav className={navClasses}>
      <div className={variant === 'static' ? "px-4 sm:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation on the left for static variant */}
          {variant === 'static' && (
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
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
            </div>
          )}

          {/* Logo/Home Link - left for fixed, right for static */}
          {variant === 'fixed' ? (
            <>
              <a
                href={getFullPath("/")}
                className={linkClasses}
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.06em",
                  transform: "scaleX(1)"
                }}
              >
                SINTHOME
              </a>

              {/* Desktop Navigation on the right for fixed variant */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
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
                          className="absolute top-full left-0 w-48"
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
              </div>
            </>
          ) : (
            /* Logo on the right for static variant */
            <a
              href={getFullPath("/")}
              className="text-white hover:text-red-500 transition-colors"
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "-0.06em",
                transform: "scaleX(1)"
              }}
            >
              SINTHOME
            </a>
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