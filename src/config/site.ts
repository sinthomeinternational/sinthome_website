/**
 * Site Configuration
 * Centralized configuration for URLs, API endpoints, and site metadata
 */

export const SITE_CONFIG = {
  // Site metadata
  name: 'SINTHOME',
  tagline: 'Empowering Communities Through Technology',
  description: 'A non-profit organization dedicated to making technology accessible for everyone',

  // URLs - These will be automatically adjusted based on environment
  urls: {
    // Base URL is set by Astro config
    base: import.meta.env.BASE_URL || '/',

    // External links
    github: 'https://github.com/Yiluo-pHoton/sinthome_website',
    linkedin: 'https://linkedin.com/company/sinthome',
    twitter: 'https://twitter.com/sinthome',
    facebook: 'https://facebook.com/sinthome',
  },

  // API endpoints (when backend is added)
  api: {
    // Future API configuration
    // baseUrl: import.meta.env.PUBLIC_API_URL || 'https://api.sinthome.org',
    // endpoints: {
    //   contact: '/contact',
    //   newsletter: '/newsletter',
    //   events: '/events',
    // }
  },

  // Contact information
  contact: {
    email: 'contact@sinthome.org',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA'
    }
  },

  // Social media handles
  social: {
    twitter: '@sinthome',
    linkedin: 'sinthome',
    github: 'sinthome',
    facebook: 'sinthome',
    instagram: '@sinthome'
  },

  // Navigation items
  navigation: {
    main: [
      { label: 'Home', href: '/' },
      { label: 'Who We Are', href: '/who-we-are' },
      {
        label: 'What We Do',
        href: '/what-we-do',
        dropdown: [
          { label: 'AI Hackathon', href: '/what-we-do/ai-hackathon' },
          { label: 'Workers Assist', href: '/what-we-do/workers-assist' },
          { label: 'Plantcore AI', href: '/what-we-do/plantcore-ai' },
          { label: 'SRTP', href: '/what-we-do/srtp' },
        ]
      },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Contact', href: '/contact' },
      { label: 'Donate', href: '/donate' },
    ],
    footer: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ]
  },

  // Feature flags
  features: {
    newsletter: true,
    donations: true,
    events: true,
    blog: false, // Future feature
  }
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof SITE_CONFIG;
export type NavigationItem = typeof SITE_CONFIG.navigation.main[number];