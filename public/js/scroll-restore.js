/**
 * Scroll position restoration after language switch
 * This script restores the scroll position when navigating between language versions
 */

// Restore scroll position if this was a language switch
const scrollPosition = sessionStorage.getItem('scrollPosition');
const switchTimestamp = sessionStorage.getItem('languageSwitchTimestamp');

// Only restore if switch happened within last 3 seconds (prevents stale restores)
if (scrollPosition && switchTimestamp) {
	const timeSinceSwitch = Date.now() - parseInt(switchTimestamp);
	if (timeSinceSwitch < 3000) {
		// Wait for page to fully load before restoring
		window.addEventListener('load', () => {
			requestAnimationFrame(() => {
				window.scrollTo({
					top: parseInt(scrollPosition),
					behavior: 'instant'
				});
				// Clean up session storage
				sessionStorage.removeItem('scrollPosition');
				sessionStorage.removeItem('languageSwitchTimestamp');
			});
		});
	} else {
		// Clean up stale entries
		sessionStorage.removeItem('scrollPosition');
		sessionStorage.removeItem('languageSwitchTimestamp');
	}
}