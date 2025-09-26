/**
 * WarpBackgroundTester - Comprehensive debugging component for @paper-design/shaders-react
 *
 * DEBUGGING GUIDE:
 * ================
 *
 * 1. Common Issues & Solutions:
 *    - "504 Outdated Optimize Dep": Run `pnpm run clean:cache && pnpm run dev`
 *    - "Failed to fetch dynamically imported module": Check Vite config optimizeDeps
 *    - White background: Component loading but shader not rendering
 *    - Console errors: Check WebGL support in browser
 *
 * 2. Debug Controls (enable with Debug On button):
 *    - Status indicator shows component state
 *    - Render count tracks re-renders
 *    - Error messages show detailed failures
 *    - Container Test appears on errors to verify rendering
 *
 * 3. WebGL Requirements:
 *    - Browser must support WebGL 2.0
 *    - Hardware acceleration enabled
 *    - No privacy/security extensions blocking WebGL
 *
 * 4. Cache Issues:
 *    - Run ./clear-vite-cache.sh to completely reset
 *    - Or use `pnpm run fix-shader`
 *    - Clear browser cache/hard refresh
 *
 * 5. Fallback Options:
 *    - Click "Use Fallback" for CSS-based animation
 *    - Error boundary provides graceful degradation
 *    - Loading states prevent white screen
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
        scale: 1.0,        // Added missing scale parameter
        proportion: 1.0,    // Added missing proportion parameter
        softness: 0.5,      // Added missing softness parameter
        distortion: 0.5     // Added missing distortion parameter
    });

    // Memoized Warp props to prevent unnecessary re-renders
    const warpProps = useMemo(() => ({
        // Core animation properties
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
        // Critical: Canvas styling for WebGL rendering
        style: {
            width: '100%',
            height: '100%',
            position: 'absolute' as const,
            top: 0,
            left: 0,
            zIndex: 1,  // Changed from 0 to ensure visibility
            pointerEvents: 'none' as const,  // Allow interaction with controls
            display: 'block',  // Ensure canvas is displayed
            backgroundColor: 'transparent'  // Ensure transparency
        }
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
            // Only set to loaded if WebGL is working
            if (warpStatus === 'loading') {
                setWarpStatus('loaded');
            }
        }
    }, [warpStatus]);

    // Debug effects
    useEffect(() => {
        console.log('🎨 WarpBackgroundTester mounted/updated');
        console.log('📊 Current params:', params);
        console.log('🔧 Warp status:', warpStatus);
        console.log('🔄 Render count:', renderCount + 1);
        console.log('🎮 WebGL diagnostics:', webglDiagnostics);

        setRenderCount(prev => prev + 1);

        // Test if @paper-design/shaders-react is available
        try {
            console.log('📦 Warp component:', typeof Warp);
            console.log('📦 Warp constructor:', Warp.toString().substring(0, 100) + '...');

            // Don't automatically set to loaded - wait for WebGL diagnostics
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

    // Warp component with error handling
    const handleWarpError = useCallback((error: Error) => {
        console.error('❌ Warp component error:', error);
        setLastError(error.message);
        setWarpStatus('error');
    }, []);

    // Try to render Warp component with enhanced debugging
    const renderWarpComponent = useCallback(() => {
        try {
            console.log('🚀 Attempting to render Warp component');
            console.log('🎛️ Warp props:', warpProps);
            console.log('🖥️ Container ref:', warpContainerRef.current);

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
                    <ShaderErrorBoundary
                        onError={(error) => {
                            console.error('🔥 ShaderErrorBoundary caught:', error);
                            handleWarpError(error);
                            setWarpStatus('error');
                        }}
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-red-900/20">
                                <div className="text-center">
                                    <p className="text-red-400 mb-4">Shader Error Detected</p>
                                    <button
                                        onClick={() => setWarpStatus('fallback')}
                                        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
                                    >
                                        Use Fallback Animation
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                background: 'transparent'
                            }}
                        >
                            <Warp {...warpProps} key={`warp-${forceRender}`} />
                        </div>
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
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Debug overlay (top-right corner) */}
            {debugMode && (
                <div className="absolute top-4 right-4 z-50 bg-black/90 backdrop-blur-sm rounded-lg p-3 max-w-sm max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-semibold text-green-400">Debug Panel</h4>
                        <button
                            onClick={() => setDebugMode(false)}
                            className="text-zinc-400 hover:text-white text-xs"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="space-y-1 text-xs text-zinc-300">
                        <div>Status: <span className={`font-mono ${
                            warpStatus === 'loaded' ? 'text-green-400' :
                            warpStatus === 'error' ? 'text-red-400' :
                            warpStatus === 'fallback' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>{warpStatus}</span></div>
                        <div>Renders: <span className="font-mono text-blue-400">{renderCount}</span></div>
                        <div>Force Render: <span className="font-mono text-cyan-400">{forceRender}</span></div>
                        <div>Warp Type: <span className="font-mono text-purple-400">{typeof Warp}</span></div>
                        <div>Browser: <span className="font-mono text-zinc-400">{typeof window !== 'undefined' ? 'Client' : 'Server'}</span></div>

                        {webglDiagnostics && (
                            <div className="mt-2 p-2 bg-zinc-800/50 rounded">
                                <div className="font-semibold mb-1">WebGL Status:</div>
                                <div className={webglDiagnostics.supported ? 'text-green-400' : 'text-red-400'}>
                                    {webglDiagnostics.supported ? '✅ Supported' : '❌ Not Supported'}
                                </div>
                                {webglDiagnostics.capabilities && (
                                    <div className="text-xs mt-1">
                                        <div>Version: {webglDiagnostics.capabilities.webgl2 ? 'WebGL 2.0' : 'WebGL 1.0'}</div>
                                        <div>HW Accel: {webglDiagnostics.capabilities.hardwareAccelerated ? 'Yes' : 'No'}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {lastError && (
                            <div className="text-red-400 mt-2 p-2 bg-red-900/20 rounded text-xs">
                                <strong>Error:</strong> {lastError}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Diagnostics Panel (always run first) */}
            <div className="absolute top-4 left-4 z-40 space-y-3 max-w-sm">
                <WebGLDetector
                    onResult={handleWebGLDiagnostics}
                    showDetails={debugMode}
                />

                {debugMode && (
                    <>
                        <CanvasDebugger />
                        <TroubleshootingGuide
                            webglDiagnostics={webglDiagnostics}
                            lastError={lastError}
                            warpStatus={warpStatus}
                        />
                    </>
                )}
            </div>

            {/* Warp Background Preview */}
            <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }}>
                {/* Loading state */}
                {warpStatus === 'loading' && <WarpLoader />}

                {/* Main Warp component */}
                {warpStatus === 'loaded' && webglDiagnostics?.supported && (
                    <Suspense fallback={<WarpLoader />}>
                        {renderWarpComponent()}
                    </Suspense>
                )}

                {/* Error state - still try to render but with more debugging */}
                {warpStatus === 'error' && webglDiagnostics?.supported && (
                    <div className="absolute inset-0">
                        <Suspense fallback={<WarpLoader />}>
                            {renderWarpComponent()}
                        </Suspense>
                        {/* Show error overlay */}
                        <div className="absolute inset-0 bg-red-900/10 flex items-center justify-center pointer-events-none">
                            <div className="bg-red-900/80 text-red-100 p-4 rounded-lg max-w-md text-center">
                                <h3 className="font-bold mb-2">Shader Rendering Issue</h3>
                                <p className="text-sm">{lastError}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Fallback animation */}
                {(warpStatus === 'fallback' || !webglDiagnostics?.supported) && <WarpFallback />}

                {/* Debug tools */}
                {debugMode && (
                    <>
                        {/* Render test overlay */}
                        <RenderTest
                            name="Container Test"
                            className="absolute top-20 left-4 w-48 h-24"
                            style={{ zIndex: 10 }}
                        />

                        {/* Canvas detection test */}
                        <div className="absolute bottom-4 left-4 bg-blue-900/80 text-blue-100 p-2 rounded text-xs" style={{ zIndex: 10 }}>
                            Canvas Elements: {typeof document !== 'undefined' ? document.querySelectorAll('canvas').length : 'N/A'}
                        </div>

                        {/* Visibility test - border should be visible */}
                        <div className="absolute inset-0 border-2 border-red-500/20 pointer-events-none" style={{ zIndex: 2 }}></div>
                    </>
                )}
            </div>

            {/* Control Panel - Positioned on top but not blocking entire view */}
            <div className="relative" style={{ zIndex: 10 }}>
                <div className="max-w-md ml-8 mt-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-zinc-800">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Warp Background Tester
                    </h1>

                    <div className="space-y-4">
                        {/* Color Controls */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-zinc-300">Colors</h2>

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

                        {/* Parameter Controls */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-zinc-300">Parameters</h2>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Speed</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.speed?.toFixed(2) ?? '0.00'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.05"
                                    value={params.speed}
                                    onChange={(e) => updateParam('speed', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Rotation</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.rotation?.toFixed(2) ?? '0.00'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={params.rotation}
                                    onChange={(e) => updateParam('rotation', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Swirl</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.swirl?.toFixed(2) ?? '0.00'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={params.swirl}
                                    onChange={(e) => updateParam('swirl', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Swirl Iterations</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.swirlIterations}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    step="1"
                                    value={params.swirlIterations}
                                    onChange={(e) => updateParam('swirlIterations', parseInt(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Shape Scale</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.shapeScale?.toFixed(2) ?? '0.00'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step="0.01"
                                    value={params.shapeScale}
                                    onChange={(e) => updateParam('shapeScale', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Scale</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.scale?.toFixed(2) ?? '1.00'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={params.scale}
                                    onChange={(e) => updateParam('scale', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Softness</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.softness?.toFixed(2) ?? '0.50'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={params.softness}
                                    onChange={(e) => updateParam('softness', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm">Distortion</label>
                                    <span className="text-sm font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                        {params.distortion?.toFixed(2) ?? '0.50'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={params.distortion}
                                    onChange={(e) => updateParam('distortion', parseFloat(e.target.value))}
                                    className="w-full slider"
                                />
                            </div>
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

                            {/* Debug and Status Controls */}
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
                                        console.log('🔄 Force reloading Warp component...');
                                        setWarpStatus('loading');
                                        setLastError(null);
                                        setForceRender(prev => prev + 1);
                                        setTimeout(() => {
                                            if (webglDiagnostics?.supported) {
                                                setWarpStatus('loaded');
                                            } else {
                                                setWarpStatus('fallback');
                                            }
                                        }, 1000);
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
                                <button
                                    onClick={() => {
                                        if (webglDiagnostics?.supported) {
                                            setWarpStatus('loaded');
                                        } else {
                                            setWarpStatus('fallback');
                                        }
                                    }}
                                    className="px-3 py-1 bg-green-600/20 text-green-400 rounded transition hover:bg-green-600/30"
                                >
                                    Auto-Fix
                                </button>
                            </div>

                            {/* Status indicator */}
                            <div className={`text-center py-2 px-3 rounded text-sm font-medium ${
                                warpStatus === 'loaded' ? 'bg-green-900/30 text-green-400' :
                                warpStatus === 'error' ? 'bg-red-900/30 text-red-400' :
                                warpStatus === 'fallback' ? 'bg-yellow-900/30 text-yellow-400' :
                                'bg-blue-900/30 text-blue-400'
                            }`}>
                                Status: {warpStatus.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Current Configuration Display */}
                    <div className="mt-6 space-y-3">
                        <div className="p-3 bg-zinc-800/50 rounded-lg">
                            <h3 className="text-sm font-semibold mb-2 text-zinc-400">Current Configuration:</h3>
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
    style={{ width: '100%', height: '100%' }}
/>`}
                            </pre>
                        </div>

                        {debugMode && (
                            <DebugInfo title="Component State" data={{
                                warpStatus,
                                renderCount,
                                lastError,
                                paramsCount: Object.keys(params).length,
                                warpAvailable: typeof Warp !== 'undefined'
                            }} />
                        )}
                    </div>
                </div>
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
            `}</style>
        </div>
    );
}