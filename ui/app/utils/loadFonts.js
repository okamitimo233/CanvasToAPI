/**
 * File: ui/app/utils/loadFonts.js
 * Description: Utility for loading Google Fonts (Bodoni Moda and Jost) for the new design system
 *
 * Author: iBUHUB
 */

/**
 * Load Google Fonts for the new design system
 * Fonts: Bodoni Moda (headings) and Jost (body text)
 */
export function loadFonts() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
        'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap';

    // Add to document head
    document.head.appendChild(link);

    return new Promise((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('Failed to load Google Fonts'));
    });
}

export default loadFonts;
