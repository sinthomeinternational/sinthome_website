import React, { useEffect, useState } from 'react';
import { Warp } from '@paper-design/shaders-react';

interface WarpBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  swirl?: number;
  swirlIterations?: number;
  shapeScale?: number;
  rotation?: number;
  scale?: number;
  softness?: number;
  distortion?: number;
  style?: React.CSSProperties;
}

export default function WarpBackground(props: WarpBackgroundProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default props that match the original homepage settings
    const defaultProps = {
        color1: '#000000',  // Black
        color2: '#940000',  // Dark red
        color3: '#000000',  // Black
        speed: 0.3,
        swirl: 0.98,
        swirlIterations: 41,
        shapeScale: 0.7,
        rotation: 0.55,
        scale: 0.5,
        softness: 0,
        distortion: 0
    };

    // Combine default props with passed props
    const warpProps = { ...defaultProps, ...props };

    if (!mounted) {
        // Server-side rendering fallback
        return React.createElement('div', {
            style: {
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #000000, #1a1a1a)',
            }
        });
    }

    try {
        return React.createElement('div', {
            style: {
                width: '100%',
                height: '100%'
            }
        }, React.createElement(Warp, warpProps));
    } catch (error) {
        console.error('WarpBackground error:', error);
        // Fallback to static gradient if Warp fails
        return React.createElement('div', {
            style: {
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #000000, #1a1a1a)',
            }
        });
    }
}