/**
 * WarpBackgroundTester - Side-by-side layout for convenient testing
 * Controls on left, animation on right - no scrolling needed
 */

import React, { useState, useEffect, useCallback, useMemo, Suspense, useRef } from 'react';
import { Warp } from '@paper-design/shaders-react';

// Loading component
function WarpLoader() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
            <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-zinc-400">Loading Warp Shader...</p>
            </div>
        </div>
    );
}

// Fallback component when Warp fails
function WarpFallback() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/10 to-transparent animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 text-center">
                <p className="text-sm opacity-50">Warp shader unavailable</p>
                <p className="text-xs opacity-30 mt-1">Using fallback animation</p>
            </div>
        </div>
    );
}

// Simple error boundary
class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default function WarpBackgroundTester() {
    // Debug states
    const [debugMode, setDebugMode] = useState(false);
    const [warpStatus, setWarpStatus] = useState<'loading' | 'loaded' | 'error' | 'fallback'>('loading');
    const [renderCount, setRenderCount] = useState(0);
    const [lastError, setLastError] = useState<string | null>(null);
    const [forceRender, setForceRender] = useState(0);
    const warpContainerRef = useRef<HTMLDivElement>(null);

    const [params, setParams] = useState({
        color1: '#000000',
        color2: '#940000',
        color3: '#000000',
        speed: 0.2,
        swirl: 0.98,
        swirlIterations: 29,
        shapeScale: 0.04,
        rotation: 0.55,
        scale: 0.4,
        proportion: 1.0,
        softness: 0,
        distortion: 0
    });

    // Check WebGL support
    const checkWebGL = useCallback(() => {
        if (typeof window === 'undefined') return false;
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            return !!gl;
        } catch {
            return false;
        }
    }, []);

    // Memoized Warp props
    const warpProps = useMemo(() => ({
        color1: params.color1,
        color2: params.color2,
        color3: params.color3,
        speed: params.speed,
        swirl: params.swirl,
        swirlIterations: params.swirlIterations,
        shapeScale: params.shapeScale,
        rotation: params.rotation,
        scale: params.scale,
        proportion: params.proportion,
        softness: params.softness,
        distortion: params.distortion,
        style: {
            width: '100%',
            height: '100%',
            position: 'absolute' as const,
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none' as const,
            display: 'block',
            backgroundColor: 'transparent'
        }
    }), [params, forceRender]);

    // Check WebGL on mount
    useEffect(() => {
        const hasWebGL = checkWebGL();
        if (!hasWebGL) {
            setLastError('WebGL not supported');
            setWarpStatus('fallback');
        } else if (warpStatus === 'loading') {
            // Give it a moment to load
            setTimeout(() => setWarpStatus('loaded'), 100);
        }
    }, [checkWebGL]);

    // Track renders
    useEffect(() => {
        setRenderCount(prev => prev + 1);
    }, [params]);

    // Render Warp component
    const renderWarpComponent = useCallback(() => {
        try {
            return (
                <div
                    ref={warpContainerRef}
                    className="absolute inset-0"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        overflow: 'hidden'
                    }}
                >
                    <ErrorBoundary fallback={<WarpFallback />}>
                        <Warp {...warpProps} key={`warp-${forceRender}`} />
                    </ErrorBoundary>
                </div>
            );
        } catch (error) {
            console.error('Warp render error:', error);
            setLastError(error instanceof Error ? error.message : 'Render error');
            return <WarpFallback />;
        }
    }, [warpProps, forceRender]);

    const [copied, setCopied] = useState(false);

    const updateParam = (key: string, value: string | number) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    const copyConfig = () => {
        const configString = `<Warp
    color1="${params.color1}"
    color2="${params.color2}"
    color3="${params.color3}"
    speed={${params.speed}}
    swirl={${params.swirl}}
    swirlIterations={${params.swirlIterations}}
    shapeScale={${params.shapeScale}}
    rotation={${params.rotation}}
    scale={${params.scale}}
    softness={${params.softness}}
    distortion={${params.distortion}}
/>`;
        navigator.clipboard.writeText(configString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetToDefaults = () => {
        setParams({
            color1: '#000000',
            color2: '#940000',
            color3: '#000000',
            speed: 0.2,
            swirl: 0.98,
            swirlIterations: 29,
            shapeScale: 0.04,
            rotation: 0.55,
            scale: 0.4,
            proportion: 1.0,
            softness: 0,
            distortion: 0
        });
    };

    return (
        <div className="relative min-h-screen bg-black text-white flex" style={{ backgroundColor: '#000000', color: 'white' }}>
            {/* Left Panel - Controls (Fixed width, scrollable) */}
            <div
                className="w-[450px] flex-shrink-0 h-screen overflow-y-auto bg-zinc-900/95 border-r border-zinc-800"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900 with 95% opacity
                    color: 'white',
                    borderRightColor: 'rgb(39, 39, 42)' // zinc-800
                }}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        Warp Background Tester
                    </h1>

                    {/* Status Indicator */}
                    <div className={`mb-4 text-center py-2 px-3 rounded text-sm font-medium ${
                        warpStatus === 'loaded' ? 'bg-green-900/30 text-green-400' :
                        warpStatus === 'error' ? 'bg-red-900/30 text-red-400' :
                        warpStatus === 'fallback' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-blue-900/30 text-blue-400'
                    }`}>
                        Status: {warpStatus.toUpperCase()}
                        {debugMode && ` | Renders: ${renderCount}`}
                    </div>

                    <div className="space-y-4">
                        {/* Color Controls */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-zinc-300">Colors</h2>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <label className="w-20 text-sm">Color 1:</label>
                                    <input
                                        type="color"
                                        value={params.color1}
                                        onChange={(e) => updateParam('color1', e.target.value)}
                                        className="flex-1 h-10 rounded cursor-pointer"
                                    />
                                    <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded">
                                        {params.color1}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="w-20 text-sm">Color 2:</label>
                                    <input
                                        type="color"
                                        value={params.color2}
                                        onChange={(e) => updateParam('color2', e.target.value)}
                                        className="flex-1 h-10 rounded cursor-pointer"
                                    />
                                    <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded">
                                        {params.color2}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="w-20 text-sm">Color 3:</label>
                                    <input
                                        type="color"
                                        value={params.color3}
                                        onChange={(e) => updateParam('color3', e.target.value)}
                                        className="flex-1 h-10 rounded cursor-pointer"
                                    />
                                    <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded">
                                        {params.color3}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Parameter Controls */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-zinc-300">Parameters</h2>

                            {[
                                { key: 'speed', label: 'Speed', min: 0, max: 2, step: 0.05 },
                                { key: 'rotation', label: 'Rotation', min: 0, max: 1, step: 0.05 },
                                { key: 'swirl', label: 'Swirl', min: 0, max: 1, step: 0.01 },
                                { key: 'swirlIterations', label: 'Swirl Iterations', min: 1, max: 50, step: 1 },
                                { key: 'shapeScale', label: 'Shape Scale', min: 0.01, max: 1, step: 0.01 },
                                { key: 'scale', label: 'Scale', min: 0.1, max: 3, step: 0.1 },
                                { key: 'softness', label: 'Softness', min: 0, max: 1, step: 0.01 },
                                { key: 'distortion', label: 'Distortion', min: 0, max: 1, step: 0.01 }
                            ].map(({ key, label, min, max, step }) => (
                                <div key={key}>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-sm">{label}</label>
                                        <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                            {typeof params[key as keyof typeof params] === 'number'
                                                ? (params[key as keyof typeof params] as number).toFixed(
                                                    step < 1 ? step.toString().split('.')[1]?.length || 2 : 0
                                                )
                                                : params[key as keyof typeof params]}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={params[key as keyof typeof params] as number}
                                        onChange={(e) => updateParam(key, step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value))}
                                        className="w-full slider"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <div className="flex gap-3">
                                <button
                                    onClick={copyConfig}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition font-medium"
                                >
                                    {copied ? '✓ Copied!' : 'Copy Config'}
                                </button>
                                <button
                                    onClick={resetToDefaults}
                                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg transition font-medium"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Debug Controls */}
                            <div className="flex gap-2 text-sm flex-wrap">
                                <button
                                    onClick={() => setDebugMode(!debugMode)}
                                    className={`px-3 py-1 rounded transition ${
                                        debugMode ? 'bg-green-600/20 text-green-400' : 'bg-zinc-700 text-zinc-300'
                                    }`}
                                >
                                    Debug {debugMode ? 'On' : 'Off'}
                                </button>
                                <button
                                    onClick={() => {
                                        setWarpStatus('loading');
                                        setLastError(null);
                                        setForceRender(prev => prev + 1);
                                        setTimeout(() => {
                                            setWarpStatus('loaded');
                                        }, 500);
                                    }}
                                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded transition hover:bg-blue-600/30"
                                >
                                    Force Reload
                                </button>
                                <button
                                    onClick={() => setWarpStatus('fallback')}
                                    className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded transition hover:bg-yellow-600/30"
                                >
                                    Use Fallback
                                </button>
                            </div>
                        </div>

                        {/* Debug Info */}
                        {debugMode && (
                            <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg text-xs">
                                <div className="space-y-1">
                                    <div>WebGL: {checkWebGL() ? '✅ Supported' : '❌ Not Supported'}</div>
                                    {lastError && <div className="text-red-400">Error: {lastError}</div>}
                                    <div>Canvas elements: {typeof document !== 'undefined' ? document.querySelectorAll('canvas').length : 0}</div>
                                </div>
                            </div>
                        )}

                        {/* Config Display */}
                        <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2 text-zinc-400">Configuration:</h3>
                            <pre className="text-xs overflow-x-auto text-zinc-300">
{`<Warp
  color1="${params.color1}"
  color2="${params.color2}"
  color3="${params.color3}"
  speed={${params.speed}}
  swirl={${params.swirl}}
  swirlIterations={${params.swirlIterations}}
  shapeScale={${params.shapeScale}}
  rotation={${params.rotation}}
/>`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Warp Animation (Flexible width) */}
            <div className="flex-1 relative bg-black" style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#000000',
                minHeight: '100vh'
            }}>
                {/* Warp Background */}
                {warpStatus === 'loading' && <WarpLoader />}

                {warpStatus === 'loaded' && (
                    <Suspense fallback={<WarpLoader />}>
                        {renderWarpComponent()}
                    </Suspense>
                )}

                {warpStatus === 'error' && (
                    <div className="absolute inset-0">
                        <Suspense fallback={<WarpLoader />}>
                            {renderWarpComponent()}
                        </Suspense>
                    </div>
                )}

                {warpStatus === 'fallback' && <WarpFallback />}

                {/* Preview Label */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-sm text-zinc-400" style={{ zIndex: 20 }}>
                    Animation Preview
                </div>

                {/* Debug Border */}
                {debugMode && (
                    <div className="absolute inset-0 border-2 border-red-500/20 pointer-events-none" />
                )}
            </div>

            <style>{`
                .slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 6px;
                    border-radius: 3px;
                    background: #27272a;
                    outline: none;
                    opacity: 0.9;
                    transition: opacity 0.2s;
                }

                .slider:hover {
                    opacity: 1;
                }

                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                }

                .slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                }

                /* Custom scrollbar for controls panel */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 8px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #18181b;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
            `}</style>
        </div>
    );
}