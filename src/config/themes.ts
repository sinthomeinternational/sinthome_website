/**
 * Theme configuration for multi-theme support
 * Defines color schemes, typography, and other theme-specific styles
 */

export interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  bgOverlay: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Accent colors
  accent: string;
  accentHover: string;
  accentContrast: string;

  // Border colors
  border: string;
  borderHover: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeConfig {
  name: string;
  id: 'dark' | 'light';
  colors: ThemeColors;
  // CSS classes for Tailwind
  classes: {
    body: string;
    card: string;
    button: string;
    link: string;
    input: string;
    heading: string;
    navigation: string;
    footer: string;
  };
}

// Dark theme (black-red)
export const darkTheme: ThemeConfig = {
  name: 'Dark',
  id: 'dark',
  colors: {
    // Backgrounds
    bgPrimary: '#0a0a0a',
    bgSecondary: '#18181b',
    bgTertiary: '#27272a',
    bgCard: 'rgba(24, 24, 27, 0.5)',
    bgOverlay: 'rgba(0, 0, 0, 0.8)',

    // Text
    textPrimary: '#ffffff',
    textSecondary: '#d4d4d8',
    textMuted: '#71717a',
    textInverse: '#000000',

    // Accent
    accent: '#dc2626',
    accentHover: '#b91c1c',
    accentContrast: '#ffffff',

    // Borders
    border: '#27272a',
    borderHover: '#3f3f46',

    // Status
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  classes: {
    body: 'bg-[#0a0a0a] text-white',
    card: 'bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800/50',
    button: 'bg-red-600 text-white hover:bg-red-700',
    link: 'text-white hover:text-red-500',
    input: 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500',
    heading: 'text-white',
    navigation: 'bg-black/95 backdrop-blur-sm border-zinc-800',
    footer: 'bg-zinc-950 border-zinc-800',
  }
};

// Light theme (red-white)
export const lightTheme: ThemeConfig = {
  name: 'Light',
  id: 'light',
  colors: {
    // Backgrounds
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgTertiary: '#f3f4f6',
    bgCard: '#ffffff',
    bgOverlay: 'rgba(0, 0, 0, 0.5)',

    // Text
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    textMuted: '#9ca3af',
    textInverse: '#ffffff',

    // Accent
    accent: '#dc2626',
    accentHover: '#b91c1c',
    accentContrast: '#ffffff',

    // Borders
    border: '#e5e7eb',
    borderHover: '#d1d5db',

    // Status
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  classes: {
    body: 'bg-white text-gray-900',
    card: 'bg-white border border-gray-200 hover:shadow-lg',
    button: 'bg-red-600 text-white hover:bg-red-700',
    link: 'text-red-600 hover:text-red-800',
    input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
    heading: 'text-gray-900',
    navigation: 'bg-white/95 backdrop-blur-sm border-gray-200 shadow-sm',
    footer: 'bg-gray-50 border-gray-200',
  }
};

// Theme utilities
export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export type ThemeId = keyof typeof themes;

/**
 * Get theme by ID
 */
export function getTheme(themeId: ThemeId): ThemeConfig {
  return themes[themeId];
}

/**
 * Get default theme
 */
export function getDefaultTheme(): ThemeConfig {
  return darkTheme;
}

/**
 * Generate CSS variables from theme
 */
export function generateThemeCSSVariables(theme: ThemeConfig): string {
  const cssVars: string[] = [];

  // Add color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    cssVars.push(`${cssVarName}: ${value};`);
  });

  return cssVars.join('\n');
}

/**
 * Apply theme to document
 */
export function applyTheme(themeId: ThemeId, enableTransition: boolean = true): void {
  const theme = getTheme(themeId);
  const root = document.documentElement;
  const body = document.body;

  // Add transition class for smooth switching (but not on initial load)
  if (enableTransition && !root.classList.contains('theme-transition')) {
    root.classList.add('theme-transition');
    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 350);
  }

  // Remove existing theme classes from both html and body
  root.classList.remove('theme-dark', 'theme-light');

  // Add new theme class to root
  root.classList.add(`theme-${themeId}`);

  // Update data attribute
  root.setAttribute('data-theme', themeId);

  // Apply CSS variables
  const cssVariables = generateThemeCSSVariables(theme);
  const styleElement = document.getElementById('theme-variables') || document.createElement('style');
  styleElement.id = 'theme-variables';
  styleElement.textContent = `:root { ${cssVariables} }`;

  if (!document.getElementById('theme-variables')) {
    document.head.appendChild(styleElement);
  }

  // Store theme preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', themeId);
  }
}

/**
 * Get stored theme preference
 */
export function getStoredTheme(): ThemeId | null {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return null;
}

/**
 * Detect preferred theme from system
 */
export function detectPreferredTheme(): ThemeId {
  // Check stored preference first
  const stored = getStoredTheme();
  if (stored) return stored;

  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // Default to dark theme
  return 'dark';
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(): void {
  const themeId = detectPreferredTheme();
  // Don't enable transitions on initial load to prevent flash
  applyTheme(themeId, false);
}