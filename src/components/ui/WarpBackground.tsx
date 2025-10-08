import { Warp, type WarpProps } from '@paper-design/shaders-react';
import { useState, useEffect } from 'react';

interface WarpBackgroundProps extends Omit<WarpProps, 'color1' | 'color2' | 'color3'> {
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function WarpBackground(props: WarpBackgroundProps) {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Detect current theme from DOM
        const detectTheme = () => {
            const root = document.documentElement;
            if (root.classList.contains('theme-light')) {
                setCurrentTheme('light');
            } else {
                setCurrentTheme('dark');
            }
        };

        detectTheme();

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            detectTheme();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Theme-specific color configurations for info layout warp
    const themeColors = {
        dark: {
            color1: '#000000',  // Black
            color2: '#940000',  // Dark red
            color3: '#000000',  // Black
        },
        light: {
            color1: '#fee2e2',  // Very light red/pink
            color2: '#fca5a5',  // Light red/pink
            color3: '#f87171',  // Medium red/pink
        }
    };

    const colors = themeColors[currentTheme];

    const defaultProps = {
        color1: props.color1 || colors.color1,
        color2: props.color2 || colors.color2,
        color3: props.color3 || colors.color3,
        speed: 0.3,  // Slightly faster for more noticeable movement
        swirl: 0.98,
        swirlIterations: 41,
        shapeScale: 0.7,
        rotation: 0.55,
        scale: 0.5,
        softness: 0,
        distortion: 0,
        style: { width: '100%', height: '100%' }
    };

    return <Warp {...defaultProps} {...props} style={{ ...defaultProps.style, ...props.style }} />;

}