/**
 * Content types for multi-language and multi-theme support
 */

export interface PageContent {
  title: string;
  description?: string;
  hero?: {
    title: string;
    subtitle?: string;
    cta?: {
      text: string;
      href?: string;
    }[];
  };
  sections?: ContentSection[];
  meta?: {
    keywords?: string[];
    ogImage?: string;
  };
}

export interface ContentSection {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: ContentItem[];
  type?: 'text' | 'grid' | 'list' | 'faq' | 'cta' | 'image' | 'form';
}

export interface ContentItem {
  title?: string;
  description?: string;
  link?: {
    text: string;
    href: string;
    external?: boolean;
  };
  image?: {
    src: string;
    alt: string;
  };
  details?: string;
}

export interface NavigationContent {
  items: NavigationItem[];
  logo?: {
    text: string;
    href: string;
  };
  cta?: {
    text: string;
    href: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  dropdown?: NavigationItem[];
  external?: boolean;
}

export interface ProjectContent {
  id: string;
  title: string;
  description: string;
  category?: string;
  featured?: boolean;
  image?: string;
  href?: string;
  impact?: string[];
  startDate?: string;
  status?: 'active' | 'completed' | 'planning';
  content?: ContentSection[];
}

export interface EventContent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  registrationUrl?: string;
  capacity?: number;
  category?: string;
  featured?: boolean;
  content?: ContentSection[];
}

export interface FooterContent {
  copyright: string;
  links: {
    title: string;
    items: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
  }[];
  social?: Array<{
    platform: string;
    url: string;
    label: string;
  }>;
}

export interface CommonContent {
  buttons: {
    learnMore: string;
    readMore: string;
    register: string;
    donate: string;
    contact: string;
    submit: string;
    cancel: string;
    back: string;
    next: string;
  };
  messages: {
    loading: string;
    error: string;
    success: string;
    notFound: string;
  };
  labels: {
    email: string;
    phone: string;
    address: string;
    name: string;
    message: string;
    subject: string;
  };
}

export interface SiteContent {
  navigation: NavigationContent;
  footer: FooterContent;
  common: CommonContent;
  pages: {
    [key: string]: PageContent;
  };
  projects: ProjectContent[];
  events: EventContent[];
}

export type Language = 'en' | 'zh';
export type Theme = 'dark' | 'light';

export interface ContentConfig {
  language: Language;
  theme: Theme;
  content: SiteContent;
}