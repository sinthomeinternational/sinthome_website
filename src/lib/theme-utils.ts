/**
 * Theme utilities for server-side and client-side theme handling
 */

/**
 * Server-side theme detection from URL parameters
 * @param url - The current page URL
 * @returns The detected theme ('light' | 'dark')
 */
export function getServerTheme(url: URL): 'light' | 'dark' {
  const urlParams = new URLSearchParams(url.search);
  const themeParam = urlParams.get('theme');

  // Return light theme if explicitly requested, otherwise default to dark
  return themeParam === 'light' ? 'light' : 'dark';
}

/**
 * Generate URL with theme and language parameters preserved
 * @param basePath - The base path to append parameters to
 * @param theme - Current theme ('light' | 'dark')
 * @param language - Current language code ('en' | 'zh')
 * @returns URL with appropriate parameters
 */
export function buildUrlWithParams(basePath: string, theme?: string, language?: string): string {
  const params = new URLSearchParams();

  // Add theme parameter if it's light theme (dark is default, no param needed)
  if (theme === 'light') {
    params.set('theme', 'light');
  }

  // Add language parameter if it's Chinese
  if (language === 'zh') {
    params.set('lang', 'zh');
  }

  // Append parameters if any exist
  if (params.toString()) {
    return `${basePath}${basePath.includes('?') ? '&' : '?'}${params.toString()}`;
  }

  return basePath;
}