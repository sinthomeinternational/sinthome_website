export function formatDate(date: Date){
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
}

// 自动处理内部链接的base路径
export function getInternalHref(href: string): string {
    if (href.startsWith('/') && !href.startsWith('http')) {
        return `${import.meta.env.BASE_URL}${href.slice(1)}`;
    }
    return href;
}

/**
 * Get theme from URL parameters (SSR-compatible)
 * @param url URL object from Astro context
 * @returns Theme string ('light' or 'dark')
 */
export function getThemeFromURL(url: URL): 'light' | 'dark' {
    const theme = url.searchParams.get('theme');
    if (theme === 'light') return 'light';
    return 'dark'; // Default to dark
}