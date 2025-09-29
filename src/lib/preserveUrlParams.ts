/**
 * Utility to preserve URL parameters (theme and language) in navigation
 */

export function preserveUrlParams(href: string): string {
  // Don't modify external links
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  // Only run in browser
  if (typeof window === 'undefined') {
    return href;
  }

  // Get current URL parameters
  const currentParams = new URLSearchParams(window.location.search);
  const theme = currentParams.get('theme');
  const lang = currentParams.get('lang');

  // Start building the new URL
  const url = new URL(href, window.location.origin);

  // Preserve theme and language params
  if (theme) {
    url.searchParams.set('theme', theme);
  }
  if (lang) {
    url.searchParams.set('lang', lang);
  }

  // Return the pathname + search params (relative URL)
  return url.pathname + url.search;
}

/**
 * Initialize links on the page to preserve URL parameters
 */
export function initializePreserveParams(): void {
  if (typeof window === 'undefined') return;

  // Get all internal links
  const links = document.querySelectorAll('a:not([href^="http"]):not([href^="#"])');

  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const originalHref = anchor.getAttribute('href');

    if (originalHref) {
      // Update the href to include current params
      anchor.href = preserveUrlParams(originalHref);
    }
  });
}