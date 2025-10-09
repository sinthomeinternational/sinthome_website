import React from 'react';
import { Warp, type WarpProps } from '@paper-design/shaders-react';

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

export default function WarpBackgroundMinimal(props: WarpBackgroundProps) {
    // Use exactly the same props as the working main branch
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
        distortion: 0,
        style: { width: '100%', height: '100%' }
    };

    // Simple merge without any complex logic
    const finalProps = { ...defaultProps, ...props };

    console.log('🔍 WarpBackgroundMinimal props:', finalProps);

    try {
        return <Warp
            {...finalProps}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                ...finalProps.style
            }}
            className="warp-background"
        />;
    } catch (error) {
        console.error('WarpBackgroundMinimal error:', error);
        return (
            <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #000000 0%, #940000 50%, #000000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                Warp Error: {(error as Error)?.message || 'Unknown error'}
            </div>
        );
    }
}