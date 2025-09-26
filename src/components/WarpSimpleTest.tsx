/**
 * Simple Warp Test - Minimal component to isolate WebGL canvas visibility issues
 */

import { useState, useEffect } from 'react';
import { Warp } from '@paper-design/shaders-react';

export default function WarpSimpleTest() {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

    useEffect(() => {
        // Simple status check
        try {
            console.log('✅ Warp component loaded:', typeof Warp);
            setStatus('ready');
        } catch (error) {
            console.error('❌ Warp loading error:', error);
            setStatus('error');
        }
    }, []);

    if (status === 'loading') {
        return (
            <div className="w-full h-screen bg-zinc-900 flex items-center justify-center text-white">
                Loading Warp...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="w-full h-screen bg-red-900 flex items-center justify-center text-white">
                Failed to load Warp component
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Debug info */}
            <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-sm">
                Status: {status} | Warp: {typeof Warp}
            </div>

            {/* WebGL Canvas Background - CRITICAL POSITIONING */}
            <div
                className="fixed inset-0"
                style={{
                    zIndex: 1,
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0
                }}
            >
                <Warp
                    color1="#000000"
                    color2="#dc2626"
                    color3="#ef4444"
                    speed={0.5}
                    swirl={0.8}
                    swirlIterations={20}
                    shapeScale={0.15}
                    rotation={0.5}
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                />
            </div>

            {/* Test Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg text-white text-center">
                    <h1 className="text-2xl font-bold mb-4">Warp Simple Test</h1>
                    <p className="text-zinc-300">
                        If you can see this overlay with animation behind it, the Warp component is working!
                    </p>
                    <div className="mt-4 text-sm text-zinc-400">
                        Canvas elements on page: {typeof document !== 'undefined' ? document.querySelectorAll('canvas').length : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
}