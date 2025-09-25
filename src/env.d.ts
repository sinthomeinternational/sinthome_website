/// <reference types="astro/client" />

// Global TypeScript declarations for the Sinthome website

interface ContentData {
  pages: {
    home: {
      title: string;
      description: string;
      hero: {
        title: string;
        tagline: string;
        subtitle: string;
        practices: string[];
        cta: Array<{
          text: string;
          href: string;
          style?: 'primary' | 'secondary' | 'outline';
        }>;
      };
    };
    [key: string]: any;
  };
  [key: string]: any;
}

declare global {
  interface Window {
    CONTENT_DATA: {
      en: ContentData;
      zh: ContentData;
      [lang: string]: ContentData; // Allow string indexing
    };
    applyTheme?: (theme: string) => void;
  }
}