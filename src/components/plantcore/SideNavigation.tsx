import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(0);

  // Enhanced motion values for sophisticated animations
  const progressY = useMotionValue(0);
  const glowOpacity = useSpring(0, { stiffness: 400, damping: 30 });

  // Magnetic effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    mouseY.set(y);
  };

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
          ref={containerRef}
          initial={{ x: -320, opacity: 0, filter: 'blur(10px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ x: -320, opacity: 0, filter: 'blur(10px)' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 group"
        >
          {/* Premium Container with Glass Morphism */}
          <motion.div
            className={`
              relative overflow-hidden backdrop-blur-xl transition-all duration-500 ease-out
              ${isExpanded ? 'w-64' : 'w-16'}
            `}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => mouseY.set(0)}
            style={{
              background: `
                linear-gradient(120deg,
                  rgba(13, 13, 15, 0.98) 0%,
                  rgba(23, 23, 26, 0.95) 25%,
                  rgba(31, 31, 35, 0.92) 50%,
                  rgba(23, 23, 26, 0.95) 75%,
                  rgba(13, 13, 15, 0.98) 100%
                )
              `,
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '4px',
              boxShadow: `
                0 0 0 1px rgba(255, 255, 255, 0.02),
                0 10px 40px rgba(0, 0, 0, 0.8),
                0 2px 4px rgba(0, 0, 0, 0.5),
                0 0 60px rgba(220, 38, 38, 0.05)
              `
            }}
          >
            {/* Noise Texture Overlay */}
            <div
              className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
              }}
            />

            {/* Spotlight Effect */}
            <motion.div
              className="absolute w-32 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
                x: -64,
                y: mouseY,
                translateY: '-50%'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredItem ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Accent Light Bar with Glow */}
            <motion.div
              className="absolute left-0 top-0 w-[1px]"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.6), rgba(220, 38, 38, 0.3))',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)'
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            />

            {/* Enhanced Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 group/toggle"
              aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-full h-full backdrop-blur-xl transition-all duration-300 flex items-center justify-center"
                style={{
                  background: `
                    linear-gradient(145deg,
                      rgba(9, 9, 11, 0.95) 0%,
                      rgba(39, 39, 42, 0.9) 50%,
                      rgba(9, 9, 11, 0.95) 100%
                    )
                  `,
                  border: '1px solid rgba(220, 38, 38, 0.08)',
                  borderRadius: '2px 4px 4px 2px',
                  boxShadow: `
                    0 8px 16px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <motion.svg
                  className="w-4 h-4 text-zinc-400 group-hover/toggle:text-red-400 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </motion.svg>
              </div>
            </motion.button>

            {/* Navigation Content */}
            <div className="relative py-6 px-1">
              {/* Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.1 + index * 0.04,
                      type: 'spring',
                      stiffness: 400,
                      damping: 25
                    }}
                    className="relative"
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative w-full flex items-center px-3 py-3 group/item overflow-hidden
                        transition-all duration-300 ease-out
                        ${isExpanded ? 'rounded-sm mx-2' : 'rounded-sm mx-1 justify-center'}
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={!isExpanded ? item.label : undefined}
                    >
                      {/* Item Background with Sophisticated States */}
                      <motion.div
                        className="absolute inset-0 rounded-sm"
                        style={{
                          background: activeSection === item.id
                            ? `
                                linear-gradient(135deg,
                                  rgba(220, 38, 38, 0.15) 0%,
                                  rgba(239, 68, 68, 0.1) 50%,
                                  rgba(220, 38, 38, 0.15) 100%
                                )
                              `
                            : hoveredItem === item.id
                            ? `
                                linear-gradient(135deg,
                                  rgba(255, 255, 255, 0.03) 0%,
                                  rgba(255, 255, 255, 0.06) 50%,
                                  rgba(255, 255, 255, 0.03) 100%
                                )
                              `
                            : 'transparent',
                          border: activeSection === item.id
                            ? '1px solid rgba(220, 38, 38, 0.2)'
                            : hoveredItem === item.id
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid transparent'
                        }}
                        animate={{
                          boxShadow: activeSection === item.id
                            ? '0 4px 20px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : hoveredItem === item.id
                            ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                            : '0 0 0 rgba(0, 0, 0, 0)'
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Active Indicator Glow */}
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px]"
                          style={{
                            height: '60%',
                            background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.9), transparent)',
                            boxShadow: '0 0 6px rgba(220, 38, 38, 0.6)'
                          }}
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        />
                      )}

                      {/* Icon with Enhanced Animation */}
                      <motion.div
                        className={`
                          relative flex-shrink-0 flex items-center justify-center
                          ${isExpanded ? 'w-4 h-4' : 'w-5 h-5'}
                        `}
                        animate={{
                          color: activeSection === item.id
                            ? 'rgb(248, 113, 113)'
                            : hoveredItem === item.id
                            ? 'rgb(255, 255, 255)'
                            : 'rgb(161, 161, 170)'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Label with Premium Typography */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0, x: -10 }}
                            animate={{ opacity: 1, width: 'auto', x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -10 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.320, 1]
                            }}
                            className={`
                              ml-3 text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden
                              transition-colors duration-200
                              ${activeSection === item.id
                                ? 'text-red-200'
                                : hoveredItem === item.id
                                ? 'text-white'
                                : 'text-zinc-300'
                              }
                            `}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Premium CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 px-2"
              >
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className={`
                    relative w-full overflow-hidden group/cta
                    ${isExpanded ? 'px-4 py-2.5 rounded' : 'p-2.5 rounded mx-auto flex justify-center'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={!isExpanded ? "Join Pilot" : undefined}
                >
                  {/* CTA Background with Gradient */}
                  <div
                    className="absolute inset-0 rounded transition-all duration-300"
                    style={{
                      background: `
                        linear-gradient(135deg,
                          rgba(220, 38, 38, 0.8) 0%,
                          rgba(239, 68, 68, 0.9) 50%,
                          rgba(220, 38, 38, 0.8) 100%
                        )
                      `,
                      boxShadow: `
                        0 4px 20px rgba(220, 38, 38, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                      `
                    }}
                  />

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `
                        linear-gradient(135deg,
                          rgba(255, 255, 255, 0.1) 0%,
                          rgba(255, 255, 255, 0.2) 50%,
                          rgba(255, 255, 255, 0.1) 100%
                        )
                      `
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative flex items-center justify-center text-white">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, x: -10 }}
                          animate={{ opacity: 1, width: 'auto', x: 0 }}
                          exit={{ opacity: 0, width: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="ml-2 text-sm font-semibold tracking-tight whitespace-nowrap"
                        >
                          Join Pilot
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Sophisticated Progress Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] overflow-hidden">
              {/* Progress Track */}
              <div
                className="absolute inset-0 w-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
                }}
              />

              {/* Progress Fill with Glow */}
              <motion.div
                className="absolute left-0 top-0 w-full"
                style={{
                  background: `
                    linear-gradient(to bottom,
                      rgba(239, 68, 68, 0.9) 0%,
                      rgba(220, 38, 38, 1) 50%,
                      rgba(185, 28, 28, 0.9) 100%
                    )
                  `,
                  boxShadow: '0 0 8px rgba(220, 38, 38, 0.6), 0 0 16px rgba(220, 38, 38, 0.3)'
                }}
                initial={{ height: 0 }}
                animate={{
                  height: `${((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100}%`
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  duration: 0.6
                }}
              />
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}