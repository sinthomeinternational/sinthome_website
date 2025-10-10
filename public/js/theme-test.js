// Display current theme information
function updateThemeInfo() {
    const html = document.documentElement;
    const info = document.getElementById('theme-info');
    if (info) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = urlParams.get('theme');
        const computedStyles = getComputedStyle(document.body);
        const bgColor = computedStyles.backgroundColor;
        const textColor = computedStyles.color;

        info.innerHTML = `
            <p><strong>URL theme param:</strong> ${urlTheme || 'none'}</p>
            <p><strong>HTML classes:</strong> ${html.className || 'none'}</p>
            <p><strong>Data-theme:</strong> ${html.getAttribute('data-theme') || 'none'}</p>
            <p><strong>LocalStorage theme:</strong> ${localStorage.getItem('theme') || 'none'}</p>
            <p><strong>Body classes:</strong> ${document.body.className || 'none'}</p>
            <p><strong>Computed body bg:</strong> ${bgColor}</p>
            <p><strong>Computed body color:</strong> ${textColor}</p>
            <p><strong>CSS Variables:</strong>
                bg-primary: ${getComputedStyle(html).getPropertyValue('--theme-bg-primary') || 'not set'},
                text-primary: ${getComputedStyle(html).getPropertyValue('--theme-text-primary') || 'not set'}
            </p>
        `;
    }
}

// Initial update
updateThemeInfo();

// Update when theme changes
const observer = new MutationObserver(updateThemeInfo);
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
});

// Also listen for theme change events
document.addEventListener('DOMContentLoaded', updateThemeInfo);
window.addEventListener('load', updateThemeInfo);