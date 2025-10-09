// Initialize URL parameter preservation for all links
// Note: This functionality will be handled by the main page script or as a separate module
if (typeof window !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => {
		// URL parameter preservation logic can be added here if needed
		// For now, we'll focus on the animation functionality
	});
}

// Professional smooth animation logic - scoped to homepage container only
function initializeHomepageAnimations() {
	const container = document.getElementById('homepage-container');

	// Only proceed if we're on the homepage
	if (!container) return null;

	let hasScrolled = false;
	let animationTimeouts = []; // Store all timeout IDs for cancellation

	// Professional animation timing configuration
	const ANIMATION_CONFIG = {
		titleMove: 300,        // Reduced from 400
		contentDelay: 0,       // Immediate start (was 150)
		taglineDelay: 100,     // Reduced from 300
		tagsDelay: 200,        // Reduced from 450
		buttonsDelay: 400,     // Reduced from 700
		staggerDelay: 40,      // Reduced from 60
		microAnimationDelay: 800 // Reduced from 1200
	};

	// Clear all pending animations
	function clearAllAnimations() {
		animationTimeouts.forEach(timeout => clearTimeout(timeout));
		animationTimeouts = [];
	}

	function triggerAnimation() {
		// Hide scroll indicator and show collapse button + switchers
		const scrollIndicator = document.getElementById('scroll-indicator');
		const collapseButton = document.getElementById('collapse-button');
		const switcherButtons = document.getElementById('switcher-buttons');
		scrollIndicator?.classList.add('scroll-hidden');

		if (hasScrolled) return;

		// Clear any pending animations from reset
		clearAllAnimations();
		hasScrolled = true;

		const emergingContent = document.getElementById('emerging-content');
		const sinthomeTitle = document.getElementById('sinthome-title');

		// Step 1: Move SINTHOME title up smoothly
		sinthomeTitle?.classList.add('title-moved');

		// Show collapse button and switcher buttons after a delay
		animationTimeouts.push(setTimeout(() => {
			collapseButton?.classList.remove('opacity-0', 'pointer-events-none');
			collapseButton?.classList.add('opacity-100');
			switcherButtons?.classList.remove('opacity-0');
			switcherButtons?.classList.add('opacity-100');
		}, ANIMATION_CONFIG.buttonsDelay + 200));

		// Step 3: Start content animation sequence
		animationTimeouts.push(setTimeout(() => {
			emergingContent?.classList.add('content-visible');
		}, ANIMATION_CONFIG.contentDelay));

		// Step 4: Animate tagline
		animationTimeouts.push(setTimeout(() => {
			const tagline = document.querySelector('.tagline');
			tagline?.classList.add('element-visible');
		}, ANIMATION_CONFIG.taglineDelay));

		// Step 5: Animate tags with stagger
		animationTimeouts.push(setTimeout(() => {
			const tags = document.querySelectorAll('.tag-item');
			tags.forEach((tag, index) => {
				animationTimeouts.push(setTimeout(() => {
					tag.classList.add('element-visible');
				}, index * ANIMATION_CONFIG.staggerDelay));
			});
		}, ANIMATION_CONFIG.tagsDelay));

		// Step 6: Animate buttons with stagger
		animationTimeouts.push(setTimeout(() => {
			const buttons = document.querySelectorAll('.cta-button');
			buttons.forEach((button, index) => {
				animationTimeouts.push(setTimeout(() => {
					button.classList.add('element-visible');
				}, index * ANIMATION_CONFIG.staggerDelay));
			});

			// Step 7: Add subtle micro-animations after main sequence
			animationTimeouts.push(setTimeout(() => {
				// Add gentle floating animation to tags
				const tags = document.querySelectorAll('.tag-item');
				tags.forEach((tag, index) => {
					tag.classList.add('micro-float');
					tag.style.animationDelay = `${index * 0.2}s`;
				});

				// Add subtle pulse to buttons
				buttons.forEach((button, index) => {
					animationTimeouts.push(setTimeout(() => {
						button.classList.add('micro-pulse');
					}, index * 100));
				});
			}, ANIMATION_CONFIG.microAnimationDelay));
		}, ANIMATION_CONFIG.buttonsDelay));
	}

	function resetAnimation() {
		if (!hasScrolled) return;

		// Clear all pending animations immediately
		clearAllAnimations();
		hasScrolled = false;

		const emergingContent = document.getElementById('emerging-content');
		const sinthomeTitle = document.getElementById('sinthome-title');
		const scrollIndicator = document.getElementById('scroll-indicator');
		const collapseButton = document.getElementById('collapse-button');
		const switcherButtons = document.getElementById('switcher-buttons');

		// Remove all animation classes simultaneously for instant reset
		sinthomeTitle?.classList.remove('title-moved');
		emergingContent?.classList.remove('content-visible');
		scrollIndicator?.classList.remove('scroll-hidden');

		// Hide collapse button, switcher buttons and show scroll indicator
		collapseButton?.classList.add('opacity-0', 'pointer-events-none');
		collapseButton?.classList.remove('opacity-100');
		switcherButtons?.classList.add('opacity-0');
		switcherButtons?.classList.remove('opacity-100');

		// Reset all child elements and micro-animations
		document.querySelectorAll('.element-visible').forEach(el => {
			el.classList.remove('element-visible', 'micro-float', 'micro-pulse');
			el.style.animationDelay = '';
		});
	}

	// Store event handler references for cleanup
	const wheelHandler = (e) => {
		// Only prevent default within the homepage container
		e.preventDefault();
		e.stopPropagation();

		if (e.deltaY > 0) {
			triggerAnimation();
		} else if (e.deltaY < 0) {
			resetAnimation();
		}
	};

	let touchStartY = 0;

	const touchStartHandler = (e) => {
		touchStartY = e.touches[0].clientY;
	};

	const touchMoveHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const touchEndY = e.touches[0].clientY;
		const deltaY = touchStartY - touchEndY;

		if (deltaY > 30) {
			triggerAnimation();
		} else if (deltaY < -30) {
			resetAnimation();
		}
	};

	const keydownHandler = (e) => {
		// Only handle if container has focus
		if (document.activeElement !== container) return;

		// Don't hijack spacebar - it breaks default scrolling
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			e.stopPropagation();
			triggerAnimation();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			e.stopPropagation();
			resetAnimation();
		}
	};

	// Click handler for scroll indicator
	const scrollIndicatorClickHandler = (e) => {
		e.preventDefault();
		triggerAnimation();
	};

	// Click handler for collapse button
	const collapseButtonClickHandler = (e) => {
		e.preventDefault();
		resetAnimation();
	};

	// Add click listeners
	const scrollIndicator = document.getElementById('scroll-indicator');
	const collapseButton = document.getElementById('collapse-button');
	scrollIndicator?.addEventListener('click', scrollIndicatorClickHandler);
	collapseButton?.addEventListener('click', collapseButtonClickHandler);

	// Attach listeners ONLY to the homepage container, not window
	container.addEventListener('wheel', wheelHandler, { passive: false });
	container.addEventListener('touchstart', touchStartHandler, { passive: true });
	container.addEventListener('touchmove', touchMoveHandler, { passive: false });
	container.addEventListener('keydown', keydownHandler);

	// Make container focusable for keyboard events
	container.setAttribute('tabindex', '0');

	// Return cleanup function
	return () => {
		clearAllAnimations();
		container.removeEventListener('wheel', wheelHandler);
		container.removeEventListener('touchstart', touchStartHandler);
		container.removeEventListener('touchmove', touchMoveHandler);
		container.removeEventListener('keydown', keydownHandler);
		scrollIndicator?.removeEventListener('click', scrollIndicatorClickHandler);
		collapseButton?.removeEventListener('click', collapseButtonClickHandler);
	};
}

// Global variable to store cleanup function
let cleanupHomepageAnimations = null;

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
	cleanupHomepageAnimations = initializeHomepageAnimations();
});

// Handle browser back/forward navigation (bfcache restoration)
window.addEventListener('pageshow', (event) => {
	// Only reinitialize if page was restored from bfcache
	if (event.persisted) {
		console.log('[Homepage] Restoring from bfcache');

		// Clean up stale instance first
		if (cleanupHomepageAnimations) {
			cleanupHomepageAnimations();
			cleanupHomepageAnimations = null;
		}

		// Reinitialize animations
		cleanupHomepageAnimations = initializeHomepageAnimations();
	}
});

// Clean up before page goes into bfcache (optional optimization)
window.addEventListener('pagehide', (event) => {
	// Only cleanup if page is being cached (not fully unloaded)
	if (event.persisted && cleanupHomepageAnimations) {
		console.log('[Homepage] Preparing for bfcache');
		cleanupHomepageAnimations();
		cleanupHomepageAnimations = null;
	}
});

// Handle tab visibility changes
document.addEventListener('visibilitychange', () => {
	const container = document.getElementById('homepage-container');

	// Only act if we're on the homepage
	if (!container) return;

	if (document.hidden) {
		// Tab hidden - cleanup to save resources
		if (cleanupHomepageAnimations) {
			console.log('[Homepage] Tab hidden - cleaning up animations');
			cleanupHomepageAnimations();
			cleanupHomepageAnimations = null;
		}
	} else {
		// Tab visible - reinitialize if needed
		if (!cleanupHomepageAnimations) {
			console.log('[Homepage] Tab visible - reinitializing animations');
			cleanupHomepageAnimations = initializeHomepageAnimations();
		}
	}
});