import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'hero',
    label: 'Overview',
    href: '#hero',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5v4M16 5v4" />
      </svg>
    )
  },
  {
    id: 'mission',
    label: 'Mission',
    href: '#mission',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'method',
    label: 'Method',
    href: '#method',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 'data-flow',
    label: 'Architecture',
    href: '#data-flow',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'roi',
    label: 'ROI',
    href: '#roi',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'vision',
    label: 'Vision',
    href: '#vision',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    id: 'contact',
    label: 'Partner',
    href: '#contact',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

export default function SideNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom - 100);
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id.replace('#', '')));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for top spacing
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50"
        >
          {/* Clean Flat Container */}
          <div
            className={`
              relative bg-black/95 backdrop-blur-sm border border-zinc-800 transition-all duration-300
              ${isExpanded ? 'w-64' : 'w-16'}
            `}
          >
            {/* Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-600/40" />

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-black/95 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
            >
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>

            {/* Navigation Content */}
            <div className="relative py-6 px-1">
              {/* Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.04,
                      type: 'spring',
                      stiffness: 400,
                      damping: 25
                    }}
                    className="relative"
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative w-full flex items-center px-3 py-3 group/item overflow-hidden
                        transition-all duration-200
                        ${isExpanded ? 'mx-2' : 'mx-1 justify-center'}
                      `}
                      title={!isExpanded ? item.label : undefined}
                    >
                      {/* Flat Background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: activeSection === item.id
                            ? 'rgba(220, 38, 38, 0.1)'
                            : hoveredItem === item.id
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'transparent',
                          borderLeft: activeSection === item.id ? '2px solid rgb(220, 38, 38)' : 'none'
                        }}
                      />

                      {/* Icon */}
                      <div
                        className={`
                          relative flex-shrink-0 flex items-center justify-center transition-colors duration-200
                          ${isExpanded ? 'w-4 h-4' : 'w-5 h-5'}
                          ${activeSection === item.id
                            ? 'text-red-400'
                            : hoveredItem === item.id
                            ? 'text-white'
                            : 'text-zinc-400'
                          }
                        `}
                      >
                        {item.icon}
                      </div>

                      {/* Label */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`
                              ml-3 text-sm font-medium whitespace-nowrap overflow-hidden
                              transition-colors duration-200
                              ${activeSection === item.id
                                ? 'text-red-300'
                                : hoveredItem === item.id
                                ? 'text-white'
                                : 'text-zinc-400'
                              }
                            `}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 px-2"
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className={`
                    relative w-full overflow-hidden bg-red-600 hover:bg-red-500 transition-colors duration-200
                    ${isExpanded ? 'px-4 py-2.5' : 'p-2.5 flex justify-center'}
                  `}
                  title={!isExpanded ? "Join Pilot" : undefined}
                >
                  <div className="relative flex items-center justify-center text-white">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 text-sm font-semibold whitespace-nowrap"
                        >
                          Join Pilot
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-800">
              <motion.div
                className="w-full bg-red-600"
                initial={{ height: 0 }}
                animate={{
                  height: `${((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100}%`
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}