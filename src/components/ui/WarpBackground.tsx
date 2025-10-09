import React, { useEffect, useState, useRef } from 'react';
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
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        console.log('🟢 BROWSER: WarpBackground mounted successfully!');

        // Debug instrumentation
        const isDebugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1';

        if (isDebugMode) {
            console.log('🔍 [WarpDebug] Debug mode enabled');

            // Check dvh support
            const supportsDvh = typeof CSS !== 'undefined' && CSS.supports('height', '100dvh');
            console.log('🔍 [WarpDebug] supports 100dvh:', supportsDvh);

            // Check WebGL support
            const canvas = document.createElement('canvas');
            const gl2 = canvas.getContext('webgl2');
            const gl = gl2 || canvas.getContext('webgl');
            console.log('🔍 [WarpDebug] WebGL2:', !!gl2, 'WebGL:', !!gl);

            // Check motion preferences
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            console.log('🔍 [WarpDebug] prefers-reduced-motion:', prefersReducedMotion);

            // Log layout after mount
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const wrapper = rootRef.current?.parentElement;
                    if (wrapper) {
                        const rect = wrapper.getBoundingClientRect();
                        const computedStyle = getComputedStyle(wrapper);
                        console.log('🔍 [WarpDebug] wrapper rect:', rect);
                        console.log('🔍 [WarpDebug] wrapper z-index:', computedStyle.zIndex);
                        console.log('🔍 [WarpDebug] wrapper background:', computedStyle.backgroundColor);

                        // Check for canvas
                        const canvases = wrapper.querySelectorAll('canvas');
                        console.log('🔍 [WarpDebug] canvas count:', canvases.length);
                        canvases.forEach((c, i) => {
                            console.log(`🔍 [WarpDebug] canvas ${i} size:`, c.offsetWidth + 'x' + c.offsetHeight);
                        });

                        // Add visual debug outline
                        wrapper.style.outline = '3px dashed magenta';
                        wrapper.style.outlineOffset = '-3px';
                    }

                    // Check body background
                    const bodyBg = getComputedStyle(document.body).backgroundColor;
                    console.log('🔍 [WarpDebug] body background:', bodyBg);
                }, 0);
            });

            // Add resize observer
            if (rootRef.current?.parentElement) {
                const resizeObserver = new ResizeObserver((entries) => {
                    entries.forEach((entry) => {
                        console.log('🔍 [WarpDebug] wrapper resized:', entry.contentRect);
                    });
                });
                resizeObserver.observe(rootRef.current.parentElement);
            }
        }
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
    let warpProps = { ...defaultProps, ...props };

    // Debug mode: allow URL parameter overrides
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const isDebugMode = urlParams.get('debug') === '1';

        if (isDebugMode) {
            // Override props from URL parameters
            const overrides: Partial<WarpBackgroundProps> = {};

            ['speed', 'swirl', 'swirlIterations', 'shapeScale', 'rotation', 'scale', 'softness', 'distortion'].forEach(param => {
                const value = urlParams.get(param);
                if (value !== null) {
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                        (overrides as any)[param] = numValue;
                    }
                }
            });

            ['color1', 'color2', 'color3'].forEach(param => {
                const value = urlParams.get(param);
                if (value !== null) {
                    (overrides as any)[param] = decodeURIComponent(value);
                }
            });

            if (Object.keys(overrides).length > 0) {
                warpProps = { ...warpProps, ...overrides };
                console.log('🔍 [WarpDebug] URL parameter overrides:', overrides);
                console.log('🔍 [WarpDebug] Final warp props:', warpProps);
            }
        }
    }

    // Static fallback gradient - hidden by default
    const fallbackStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #000000 0%, #1a0000 25%, #940000 50%, #1a0000 75%, #000000 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease-in-out infinite',
        display: 'none' // Hidden by default
    };

    if (!mounted) {
        // Server-side rendering fallback
        return (
            <div style={{ ...fallbackStyle, display: 'block' }} />
        );
    }

    const isDebugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1';

    try {
        const debugHUD = isDebugMode && mounted ? (
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'lime',
                padding: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                zIndex: 9999,
                borderRadius: '4px',
                border: '1px solid lime',
                maxWidth: '300px'
            }}>
                <div>🔍 Debug Mode Active</div>
                <div>Props: speed={warpProps.speed}, scale={warpProps.shapeScale}</div>
                <div>Distortion: {warpProps.distortion}, Color2: {warpProps.color2}</div>
                <div>WebGL: {typeof window !== 'undefined' ? 'Available' : 'Unknown'}</div>
                <div>DVH: {typeof CSS !== 'undefined' && CSS.supports('height', '100dvh') ? 'Yes' : 'No'}</div>
            </div>
        ) : null;

        const debugOverlay = isDebugMode && mounted ? (
            <div style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(255, 0, 0, 0.1)',
                pointerEvents: 'none',
                zIndex: -1,
                border: '2px dashed red'
            }} />
        ) : null;

        return (
            <div ref={rootRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Warp
                    {...warpProps}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    className="warp-background"
                />
                {debugHUD}
                {debugOverlay}
                <div className="warp-background-fallback" style={fallbackStyle} />
            </div>
        );
    } catch (error) {
        console.error('WarpBackground error:', error);
        return React.createElement('div', {
            style: { ...fallbackStyle, display: 'block' }
        });
    }
}