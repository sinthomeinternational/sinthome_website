/**
 * Theme initialization script to prevent flash of unstyled content
 * This script must run synchronously in the head to prevent theme flash
 */
(function() {
	// Remove any existing theme classes first
	document.documentElement.classList.remove('theme-light', 'theme-dark');

	// Check URL parameters first
	const urlParams = new URLSearchParams(window.location.search);
	const urlTheme = urlParams.get('theme');

	// Determine which theme to use (priority: URL > localStorage > default to dark)
	let theme;
	if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark')) {
		theme = urlTheme;
		// Save URL preference to localStorage for consistency
		try {
			localStorage.setItem('theme', theme);
		} catch (e) {
			// Ignore localStorage errors in private browsing
		}
	} else {
		// Try to get from localStorage, default to dark
		try {
			theme = localStorage.getItem('theme') || 'dark';
		} catch (e) {
			theme = 'dark';
		}
	}

	// Apply theme class and data attribute
	document.documentElement.classList.add(`theme-${theme}`);
	document.documentElement.setAttribute('data-theme', theme);

	// Set color scheme for browser controls
	document.documentElement.style.colorScheme = theme;
})();