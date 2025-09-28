/**
 * Site Configuration
 * Centralized configuration for URLs, API endpoints, and site metadata
 * All URLs and external references should be configured here
 */

export const SITE_CONFIG = {
  // Site metadata
  name: import.meta.env.PUBLIC_SITE_NAME || 'SINTHOME',
  tagline: 'Empowering Communities Through Technology',
  description: 'A non-profit organization dedicated to making technology accessible for everyone',

  // URLs - These will be automatically adjusted based on environment
  urls: {
    // Base URL is set by Astro config
    base: import.meta.env.BASE_URL || '/',

    // Site URL
    site: import.meta.env.PUBLIC_SITE_URL || 'https://sinthome.org',

    // External links - Using environment variables with fallbacks
    github: import.meta.env.PUBLIC_GITHUB_URL || 'https://github.com/sinthomeinternational',
    linkedin: import.meta.env.PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/sinthome',
    twitter: import.meta.env.PUBLIC_TWITTER_URL || 'https://twitter.com/sinthome',
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL || 'https://facebook.com/sinthome',
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://instagram.com/sinthome',
    youtube: import.meta.env.PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/sinthome',

    // Chinese platforms
    bilibili: import.meta.env.PUBLIC_BILIBILI_URL || 'https://space.bilibili.com/38423906',
    wechat: import.meta.env.PUBLIC_WECHAT_URL || 'https://mp.weixin.qq.com/s/t-_H49ehMTsceQ7PZsse3A',
    xiaohongshu: import.meta.env.PUBLIC_XIAOHONGSHU_URL || 'https://www.xiaohongshu.com/user/profile/628d9dad00000000210216c3',
  },

  // Payment and donation links
  payments: {
    paypal: import.meta.env.PUBLIC_PAYPAL_URL || 'https://paypal.me/sinthome',
    venmo: import.meta.env.PUBLIC_VENMO_URL || 'https://venmo.com/sinthome',
  },

  // Google Forms configuration
  forms: {
    contact: import.meta.env.PUBLIC_CONTACT_FORM_ID || '',
    newsletter: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID || '',
    volunteer: import.meta.env.PUBLIC_VOLUNTEER_FORM_ID || '',
    donation: import.meta.env.PUBLIC_DONATION_FORM_ID || '',
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
    email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'contact@sinthome.org',
    phone: import.meta.env.PUBLIC_CONTACT_PHONE || '+1 (555) 123-4567',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA'
    }
  },

  // Social media handles (without @ or full URLs)
  social: {
    twitter: 'sinthome',
    linkedin: 'sinthome',
    github: 'sinthomeinternational',
    facebook: 'sinthome',
    instagram: 'sinthome'
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
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
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