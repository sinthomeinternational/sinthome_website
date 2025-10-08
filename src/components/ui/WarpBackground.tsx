import { Warp } from '@paper-design/shaders-react';

interface AccessibleWarpBackgroundProps {
  fallbackClassName?: string;
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

export default function WarpBackground({ fallbackClassName = '', ...props }: AccessibleWarpBackgroundProps) {
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

    // Always render both: CSS will handle accessibility via media queries
    return (
        <>
            {/* Animated WebGL background - hidden by CSS if prefers-reduced-motion */}
            <div className="warp-background" role="img" aria-label="Animated background pattern">
                <Warp
                    {...defaultProps}
                    {...props}
                    style={{ ...defaultProps.style, ...props.style }}
                />
            </div>

            {/* Static fallback - shown by CSS if prefers-reduced-motion */}
            <div
                className={`warp-background-fallback ${fallbackClassName}`}
                style={defaultProps.style}
                role="img"
                aria-label="Static background pattern"
            />
        </>
    );
}