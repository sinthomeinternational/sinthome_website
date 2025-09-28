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
                <div className="p-5">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl font-medium text-zinc-100 tracking-tight">
                            Warp Background Tester
                        </h1>
                        <p className="text-xs text-zinc-500 mt-1">Configure and test warp animation parameters</p>
                    </div>

                    {/* Status Indicator Panel */}
                    <div className="bg-zinc-900/30 rounded-xl p-3 border border-zinc-800/50 mb-6">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${
                                warpStatus === 'loaded' ? 'bg-green-500' :
                                warpStatus === 'error' ? 'bg-red-500' :
                                warpStatus === 'fallback' ? 'bg-yellow-500' :
                                'bg-blue-500'
                            }`}></div>
                            <span className="text-xs font-medium text-zinc-300">
                                Status: <span className={`font-semibold ${
                                    warpStatus === 'loaded' ? 'text-green-400' :
                                    warpStatus === 'error' ? 'text-red-400' :
                                    warpStatus === 'fallback' ? 'text-yellow-400' :
                                    'text-blue-400'
                                }`}>{warpStatus.toUpperCase()}</span>
                            </span>
                            {debugMode && <span className="text-zinc-500 text-xs ml-auto">Renders: {renderCount}</span>}
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Color Controls Panel */}
                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/50">
                            <h2 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                Color Palette
                            </h2>

                            {/* Enhanced color pickers with preview */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { key: 'color1', label: 'C1', value: params.color1 },
                                    { key: 'color2', label: 'C2', value: params.color2 },
                                    { key: 'color3', label: 'C3', value: params.color3 }
                                ].map(({ key, label, value }) => (
                                    <div key={key} className="flex flex-col gap-2">
                                        <label className="text-xs text-zinc-400 font-medium">Color {label.replace('C', '')}</label>
                                        <div className="relative group">
                                            <div
                                                className="w-full h-10 rounded-lg border border-zinc-700 cursor-pointer overflow-hidden hover:border-zinc-600 transition-colors"
                                                style={{ backgroundColor: value }}
                                            >
                                                <input
                                                    type="color"
                                                    value={value}
                                                    onChange={(e) => updateParam(key, e.target.value)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    aria-label={`Color ${label.replace('C', '')}`}
                                                />
                                            </div>
                                            <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:ring-2 group-hover:ring-zinc-600 group-hover:ring-opacity-50"></div>
                                        </div>
                                        <span className="text-[11px] font-mono text-zinc-500 text-center">
                                            {value.toUpperCase()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Parameter Controls Panel */}
                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/50">
                            <h2 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Animation Parameters
                            </h2>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3">

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
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-medium text-zinc-300">{label}</label>
                                        <span className="text-xs font-mono text-zinc-500">
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
                                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer
                                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500
                                            [&::-webkit-slider-thumb]:hover:bg-red-400 [&::-webkit-slider-thumb]:transition-colors
                                            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                                            [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:hover:bg-red-400
                                            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-colors"
                                        aria-label={`${label}: ${params[key as keyof typeof params]}`}
                                    />
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Action Buttons Panel */}
                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/50">
                            <h2 className="text-sm font-semibold text-zinc-200 mb-4">Actions</h2>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <button
                                    onClick={copyConfig}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg
                                        hover:bg-red-500 active:bg-red-700 transition-all duration-200
                                        shadow-sm hover:shadow-md"
                                >
                                    {copied ? '✓ Copied!' : 'Copy Config'}
                                </button>
                                <button
                                    onClick={resetToDefaults}
                                    className="px-4 py-2 bg-zinc-800 text-zinc-100 text-sm font-medium rounded-lg
                                        hover:bg-zinc-700 active:bg-zinc-900 transition-all duration-200
                                        shadow-sm hover:shadow-md"
                                >
                                    Reset Defaults
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

                        {/* Configuration Display Panel */}
                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/50">
                            <h2 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                Configuration Code
                            </h2>
                            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg overflow-x-auto border border-zinc-800/50">
                                <pre className="text-xs font-mono">
                                    <code>
                                        <span className="text-emerald-400">&lt;Warp</span>{'\n'}
                                        <span className="text-zinc-400">  color1="</span><span className="text-amber-400">{params.color1}</span><span className="text-zinc-400">"</span>{'\n'}
                                        <span className="text-zinc-400">  color2="</span><span className="text-amber-400">{params.color2}</span><span className="text-zinc-400">"</span>{'\n'}
                                        <span className="text-zinc-400">  color3="</span><span className="text-amber-400">{params.color3}</span><span className="text-zinc-400">"</span>{'\n'}
                                        <span className="text-zinc-400">  speed={'{'}</span><span className="text-cyan-400">{params.speed}</span><span className="text-zinc-400">{'}'}</span>{'\n'}
                                        <span className="text-zinc-400">  swirl={'{'}</span><span className="text-cyan-400">{params.swirl}</span><span className="text-zinc-400">{'}'}</span>{'\n'}
                                        <span className="text-zinc-400">  swirlIterations={'{'}</span><span className="text-cyan-400">{params.swirlIterations}</span><span className="text-zinc-400">{'}'}</span>{'\n'}
                                        <span className="text-zinc-400">  shapeScale={'{'}</span><span className="text-cyan-400">{params.shapeScale}</span><span className="text-zinc-400">{'}'}</span>{'\n'}
                                        <span className="text-zinc-400">  rotation={'{'}</span><span className="text-cyan-400">{params.rotation}</span><span className="text-zinc-400">{'}'}</span>{'\n'}
                                        <span className="text-emerald-400">/&gt;</span>
                                    </code>
                                </pre>
                            </div>
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