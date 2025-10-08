import { Warp, type WarpProps } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';

interface AccessibleWarpBackgroundProps extends WarpProps {
  fallbackClassName?: string;
}

export default function WarpBackground({ fallbackClassName = '', ...props }: AccessibleWarpBackgroundProps) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        // Listen for changes in motion preference
        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Same colors as homepage for consistency
    const defaultProps = {
        color1: '#000000',  // Black
        color2: '#940000',  // Dark red (same as homepage)
        color3: '#000000',  // Black
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

    // Accessibility: Show static fallback if user prefers reduced motion
    if (!isClient || prefersReducedMotion) {
        return (
            <div
                className={`warp-background-fallback ${fallbackClassName}`}
                style={defaultProps.style}
                role="img"
                aria-label="Static background pattern"
            />
        );
    }

    return (
        <div className="warp-background" role="img" aria-label="Animated background pattern">
            <Warp
                {...defaultProps}
                {...props}
                style={{ ...defaultProps.style, ...props.style }}
            />
        </div>
    );
}