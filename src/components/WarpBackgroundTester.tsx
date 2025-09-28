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
        <div className="relative min-h-screen bg-black text-white flex flex-row" style={{ backgroundColor: '#000000', color: 'white', display: 'flex', flexDirection: 'row' }}>
            {/* Left Panel - Controls (Fixed width, scrollable) */}
            <div
                className="w-[420px] min-w-[420px] flex-shrink-0 h-screen overflow-y-auto bg-zinc-950 border-r border-zinc-800"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    backgroundColor: 'rgb(9, 9, 11)',
                    color: 'white',
                    borderRightColor: 'rgb(39, 39, 42)'
                }}>
                <div className="p-4">
                    <div className="mb-8">
                        <h1 className="text-2xl font-light text-white mb-2">
                            Warp Background Tester
                        </h1>
                        <div className="h-0.5 bg-gradient-to-r from-red-600 to-transparent"></div>
                    </div>

                    {/* Status Indicator */}
                    <div className="mb-6 flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                            warpStatus === 'loaded' ? 'bg-green-500' :
                            warpStatus === 'error' ? 'bg-red-500' :
                            warpStatus === 'fallback' ? 'bg-yellow-500' :
                            'bg-blue-500'
                        } animate-pulse`}></div>
                        <span className="text-zinc-400 uppercase tracking-wider">
                            Status: <span className="text-zinc-300 font-medium">{warpStatus}</span>
                        </span>
                        {debugMode && <span className="text-zinc-500">| Renders: {renderCount}</span>}
                    </div>

                    <div className="space-y-4">
                        {/* Color Controls */}
                        <div>
                            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                                Colors
                            </h2>

                            {/* Grid layout for colors */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { key: 'color1', label: 'C1', value: params.color1 },
                                    { key: 'color2', label: 'C2', value: params.color2 },
                                    { key: 'color3', label: 'C3', value: params.color3 }
                                ].map(({ key, label, value }) => (
                                    <div key={key} className="flex flex-col items-center gap-1">
                                        <label className="text-[11px] text-zinc-500 font-medium">{label}</label>
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => updateParam(key, e.target.value)}
                                            className="w-8 h-6 rounded border border-zinc-700 cursor-pointer"
                                        />
                                        <span className="text-[10px] font-mono text-zinc-400 truncate w-full text-center">
                                            {value.substring(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Parameter Controls */}
                        <div>
                            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                                Parameters
                            </h2>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2">

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
                                <div key={key} className="col-span-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[11px] text-zinc-500 truncate">{label}</label>
                                        <span className="text-[10px] font-mono text-zinc-400 min-w-0">
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
                                        className="w-full slider-compact"
                                        aria-label={`${label}: ${params[key as keyof typeof params]}`}
                                    />
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 pt-3 border-t border-zinc-800">
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={copyConfig}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 px-2 rounded text-[11px] font-medium transition-colors"
                                >
                                    {copied ? '✓ Copied' : 'Copy'}
                                </button>
                                <button
                                    onClick={resetToDefaults}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 px-2 rounded text-[11px] font-medium transition-colors"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Debug Controls */}
                            <div className="grid grid-cols-3 gap-1">
                                <button
                                    onClick={() => setDebugMode(!debugMode)}
                                    className={`px-2 py-1 rounded text-[10px] transition-colors ${
                                        debugMode ? 'bg-green-900/30 text-green-400' : 'bg-zinc-800 text-zinc-400'
                                    }`}
                                    aria-label={`Debug mode ${debugMode ? 'on' : 'off'}`}
                                >
                                    Debug
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
                                    className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded transition hover:bg-blue-600/30 text-[10px]"
                                    aria-label="Force reload animation"
                                >
                                    Reload
                                </button>
                                <button
                                    onClick={() => setWarpStatus('fallback')}
                                    className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded transition hover:bg-yellow-600/30 text-[10px]"
                                    aria-label="Use fallback animation"
                                >
                                    Fallback
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
                        <div className="mt-6 pt-4 border-t border-zinc-800">
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Configuration</h3>
                            <pre className="bg-black/30 border border-zinc-800 p-3 rounded text-xs overflow-x-auto text-zinc-500 font-mono">
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
            <div className="flex-1 flex-grow relative bg-black h-screen" style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#000000',
                minHeight: '100vh',
                flexGrow: 1,
                width: 'calc(100% - 420px)'
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
                .slider,
                .slider-compact {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 4px;
                    border-radius: 2px;
                    background: #27272a;
                    outline: none;
                    opacity: 0.9;
                    transition: opacity 0.2s;
                }

                .slider:hover,
                .slider-compact:hover {
                    opacity: 1;
                }

                .slider::-webkit-slider-thumb,
                .slider-compact::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                    border: 1px solid #000;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                .slider::-moz-range-thumb,
                .slider-compact::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                    border: 1px solid #000;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                /* Improved focus indicators for accessibility */
                .slider:focus-visible,
                .slider-compact:focus-visible {
                    outline: 2px solid #dc2626;
                    outline-offset: 2px;
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