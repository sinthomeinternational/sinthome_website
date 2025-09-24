/**
 * Shared TypeScript interfaces and types for the entire application
 */

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  dropdown?: NavigationItem[];
  external?: boolean;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  date: Date | string;
  endDate?: Date | string;
  location: string;
  description: string;
  registrationUrl?: string;
  capacity?: number;
  category?: string;
  featured?: boolean;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  featured?: boolean;
  image?: string;
  href?: string;
  impact?: string[];
  startDate?: Date | string;
  status?: 'active' | 'completed' | 'planning';
}

// Article/Blog Types
export interface Article {
  id: string;
  title: string;
  slug: string;
  snippet: string;
  content?: string;
  category: string;
  author: string;
  pubDate: Date | string;
  updatedDate?: Date | string;
  readingDuration?: number;
  coverImage?: string;
  coverAlt?: string;
  originalLink?: string;
  isDraft?: boolean;
  tags?: string[];
  relatedArticles?: string[];
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface DonationFormData {
  amount: number;
  frequency: 'one-time' | 'monthly' | 'yearly';
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  anonymous?: boolean;
  message?: string;
}

// Component Props Base Types
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface LinkProps extends BaseComponentProps {
  href: string;
  external?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

// Layout Props
export interface LayoutProps {
  title: string;
  description?: string;
  showNavigation?: boolean;
  useInfoLayout?: boolean;
  ogImage?: string;
  canonicalUrl?: string;
}

// Page Metadata
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  publishedDate?: Date | string;
  modifiedDate?: Date | string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Utility Types
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Social Media Links
export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'github' | 'instagram' | 'youtube';
  url: string;
  label?: string;
}

// Team Member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: SocialLink[];
}