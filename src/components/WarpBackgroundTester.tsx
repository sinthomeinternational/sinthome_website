/**
 * WarpBackgroundTester - Side-by-side layout for easier parameter testing
 */

import { useState, useEffect, useCallback, useMemo, Suspense, useRef } from 'react';
import { Warp } from '@paper-design/shaders-react';
import ShaderErrorBoundary from './ui/ShaderErrorBoundary';
import RenderTest from './ui/RenderTest';
import WebGLDetector from './ui/WebGLDetector';
import type { WebGLDiagnostics } from './ui/WebGLDetector';
import CanvasDebugger from './ui/CanvasDebugger';
import TroubleshootingGuide from './ui/TroubleshootingGuide';

// Debug component to track rendering issues
function DebugInfo({ title, data }: { title: string; data: any }) {
    return (
        <div className="mt-2 p-2 bg-zinc-800 rounded text-xs text-zinc-300">
            <strong className="text-zinc-200">{title}:</strong>
            <pre className="mt-1 overflow-x-auto text-zinc-400">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

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

export default function WarpBackgroundTester() {
    // Debug states
    const [debugMode, setDebugMode] = useState(true);
    const [warpStatus, setWarpStatus] = useState<'loading' | 'loaded' | 'error' | 'fallback'>('loading');
    const [renderCount, setRenderCount] = useState(0);
    const [lastError, setLastError] = useState<string | null>(null);
    const [webglDiagnostics, setWebglDiagnostics] = useState<WebGLDiagnostics | null>(null);
    const [forceRender, setForceRender] = useState(0);
    const warpContainerRef = useRef<HTMLDivElement>(null);

    const [params, setParams] = useState({
        color1: '#000000',
        color2: '#5a0000',
        color3: '#ff0000',
        speed: 0.9,
        swirl: 0.98,
        swirlIterations: 25,
        shapeScale: 0.12,
        rotation: 0.85,
        scale: 1.0,
        proportion: 1.0,
        softness: 0.5,
        distortion: 0.5
    });

    // Memoized Warp props
    const warpProps = useMemo(() => ({
        ...params
    }), [params, forceRender]);

    // WebGL diagnostics handler
    const handleWebGLDiagnostics = useCallback((diagnostics: WebGLDiagnostics) => {
        setWebglDiagnostics(diagnostics);
        if (!diagnostics.supported) {
            console.error('❌ WebGL not supported:', diagnostics.errors);
            setLastError('WebGL not supported: ' + diagnostics.errors.join(', '));
            setWarpStatus('fallback');
        } else {
            console.log('✅ WebGL is supported');
            if (warpStatus === 'loading') {
                setWarpStatus('loaded');
            }
        }
    }, [warpStatus]);

    // Debug effects
    useEffect(() => {
        console.log('🎨 WarpBackgroundTester mounted/updated');
        console.log('📊 Current params:', params);
        setRenderCount(prev => prev + 1);

        try {
            console.log('📦 Warp component:', typeof Warp);
            if (warpStatus === 'loading' && webglDiagnostics?.supported) {
                setWarpStatus('loaded');
                setLastError(null);
            }
        } catch (error) {
            console.error('❌ Error accessing Warp component:', error);
            setLastError(error instanceof Error ? error.message : 'Unknown error');
            setWarpStatus('error');
        }
    }, [params, warpStatus, webglDiagnostics]);

    // Error handler
    const handleWarpError = useCallback((error: Error) => {
        console.error('❌ Warp component error:', error);
        setLastError(error.message);
        setWarpStatus('error');
    }, []);

    // Render Warp component
    const renderWarpComponent = useCallback(() => {
        try {
            console.log('🚀 Rendering Warp with props:', warpProps);
            return (
                <div ref={warpContainerRef} className="absolute inset-0" style={{ zIndex: 1 }}>
                    <ShaderErrorBoundary
                        onError={handleWarpError}
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-red-900/20">
                                <button
                                    onClick={() => setWarpStatus('fallback')}
                                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
                                >
                                    Use Fallback Animation
                                </button>
                            </div>
                        }
                    >
                        <Warp
                            {...warpProps}
                            key={`warp-${forceRender}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}
                        />
                    </ShaderErrorBoundary>
                </div>
            );
        } catch (error) {
            console.error('❌ Failed to render Warp:', error);
            handleWarpError(error instanceof Error ? error : new Error('Unknown render error'));
            return <WarpFallback />;
        }
    }, [warpProps, handleWarpError, forceRender]);

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
    style={{ width: '100%', height: '100%' }}
/>`;
        navigator.clipboard.writeText(configString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetToDefaults = () => {
        setParams({
            color1: '#000000',
            color2: '#5a0000',
            color3: '#ff0000',
            speed: 0.9,
            swirl: 0.98,
            swirlIterations: 25,
            shapeScale: 0.12,
            rotation: 0.85,
            scale: 1.0,
            proportion: 1.0,
            softness: 0.5,
            distortion: 0.5
        });
    };

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Left Panel - Controls */}
            <div className="w-[400px] flex-shrink-0 bg-zinc-900/95 border-r border-zinc-800 overflow-y-auto h-screen">
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-2 text-center">
                        Warp Background Tester
                    </h1>

                    {/* Status Bar */}
                    <div className={`mb-2 text-center py-1 px-2 rounded text-xs font-medium ${
                        warpStatus === 'loaded' ? 'bg-green-900/30 text-green-400' :
                        warpStatus === 'error' ? 'bg-red-900/30 text-red-400' :
                        warpStatus === 'fallback' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-blue-900/30 text-blue-400'
                    }`}>
                        Status: {warpStatus.toUpperCase()}
                    </div>

                    {/* WebGL Diagnostics */}
                    <div className="mb-2">
                        <WebGLDetector
                            onResult={handleWebGLDiagnostics}
                            showDetails={false}
                        />
                    </div>

                    {/* Color Controls */}
                    <div className="space-y-2 mb-3">
                        <h2 className="text-xs font-semibold text-zinc-300">Colors</h2>

                        {['color1', 'color2', 'color3'].map((colorKey, idx) => (
                            <div key={colorKey} className="flex items-center gap-2">
                                <label className="w-16 text-xs">Color {idx + 1}:</label>
                                <input
                                    type="color"
                                    value={params[colorKey as keyof typeof params] as string}
                                    onChange={(e) => updateParam(colorKey, e.target.value)}
                                    className="flex-1 h-6 rounded cursor-pointer"
                                />
                                <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded w-20 text-center">
                                    {params[colorKey as keyof typeof params] as string}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Parameter Controls */}
                    <div className="space-y-2 mb-3">
                        <h2 className="text-xs font-semibold text-zinc-300">Animation Parameters</h2>

                        {[
                            { key: 'speed', min: 0, max: 2, step: 0.05 },
                            { key: 'rotation', min: 0, max: 1, step: 0.05 },
                            { key: 'swirl', min: 0, max: 1, step: 0.01 },
                            { key: 'swirlIterations', min: 1, max: 50, step: 1 },
                            { key: 'shapeScale', min: 0.01, max: 1, step: 0.01 },
                            { key: 'scale', min: 0.1, max: 3, step: 0.1 },
                            { key: 'softness', min: 0, max: 1, step: 0.01 },
                            { key: 'distortion', min: 0, max: 1, step: 0.01 },
                        ].map(({ key, min, max, step }) => (
                            <div key={key}>
                                <div className="flex justify-between mb-1">
                                    <label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    <span className="text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {typeof params[key as keyof typeof params] === 'number'
                                            ? (params[key as keyof typeof params] as number).toFixed(step < 1 ? 2 : 0)
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
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <button
                                onClick={copyConfig}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-lg transition font-medium text-xs"
                            >
                                {copied ? '✓ Copied!' : 'Copy Config'}
                            </button>
                            <button
                                onClick={resetToDefaults}
                                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-2 rounded-lg transition font-medium text-xs"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Debug Controls */}
                        <div className="flex gap-2 text-xs">
                            <button
                                onClick={() => setDebugMode(!debugMode)}
                                className={`flex-1 px-2 py-1 rounded transition ${
                                    debugMode ? 'bg-green-600/20 text-green-400' : 'bg-zinc-700 text-zinc-300'
                                }`}
                            >
                                Debug {debugMode ? 'On' : 'Off'}
                            </button>
                            <button
                                onClick={() => {
                                    setWarpStatus('loading');
                                    setForceRender(prev => prev + 1);
                                    setTimeout(() => {
                                        if (webglDiagnostics?.supported) {
                                            setWarpStatus('loaded');
                                        }
                                    }, 500);
                                }}
                                className="flex-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded transition hover:bg-blue-600/30"
                            >
                                Reload
                            </button>
                            <button
                                onClick={() => setWarpStatus('fallback')}
                                className="flex-1 px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded transition hover:bg-yellow-600/30"
                            >
                                Fallback
                            </button>
                        </div>
                    </div>

                    {/* Debug Info */}
                    {debugMode && (
                        <div className="mt-3 space-y-2">
                            <CanvasDebugger />
                            <TroubleshootingGuide
                                webglDiagnostics={webglDiagnostics}
                                lastError={lastError}
                                warpStatus={warpStatus}
                            />
                            <DebugInfo title="Component State" data={{
                                warpStatus,
                                renderCount,
                                lastError,
                                paramsCount: Object.keys(params).length,
                                warpAvailable: typeof Warp !== 'undefined'
                            }} />
                        </div>
                    )}

                    {/* Current Configuration */}
                    <div className="mt-3 p-2 bg-zinc-800/50 rounded-lg">
                        <h3 className="text-xs font-semibold mb-2 text-zinc-400">Current Configuration:</h3>
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
    scale={${params.scale}}
    softness={${params.softness}}
    distortion={${params.distortion}}
/>`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Right Panel - Warp Animation */}
            <div className="flex-1 relative bg-black h-screen">
                {/* Warp Background Container */}
                <div className="absolute inset-0">
                    {/* Loading state */}
                    {warpStatus === 'loading' && <WarpLoader />}

                    {/* Main Warp component - simplified rendering */}
                    {(warpStatus === 'loaded' || warpStatus === 'error') && webglDiagnostics?.supported !== false && (
                        <Suspense fallback={<WarpLoader />}>
                            {renderWarpComponent()}
                        </Suspense>
                    )}

                    {/* Fallback animation */}
                    {(warpStatus === 'fallback' || webglDiagnostics?.supported === false) && <WarpFallback />}

                    {/* Debug overlay */}
                    {debugMode && (
                        <>
                            <RenderTest
                                name="Container Test"
                                className="absolute top-4 right-4 w-32 h-20"
                                style={{ zIndex: 10 }}
                            />
                            <div className="absolute bottom-4 right-4 bg-blue-900/80 text-blue-100 p-2 rounded text-xs" style={{ zIndex: 10 }}>
                                Canvas Elements: {typeof document !== 'undefined' ? document.querySelectorAll('canvas').length : 'N/A'}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 4px;
                    border-radius: 2px;
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
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                }

                .slider::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}