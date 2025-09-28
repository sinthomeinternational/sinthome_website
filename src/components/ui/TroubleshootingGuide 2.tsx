/**
 * TroubleshootingGuide - Comprehensive guide for Warp shader issues
 *
 * This component provides step-by-step troubleshooting instructions
 * based on detected issues and environment conditions.
 */

import { useState } from 'react';
import type { WebGLDiagnostics } from './WebGLDetector';

interface TroubleshootingSolution {
    id: string;
    title: string;
    description: string;
    steps: string[];
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: 'webgl' | 'cache' | 'browser' | 'performance' | 'config';
}

interface TroubleshootingGuideProps {
    webglDiagnostics?: WebGLDiagnostics | null;
    lastError?: string | null;
    warpStatus?: string;
    className?: string;
}

const SOLUTIONS: TroubleshootingSolution[] = [
    {
        id: 'webgl-not-supported',
        title: 'WebGL Not Supported',
        description: 'Your browser or system does not support WebGL, which is required for shader rendering.',
        category: 'webgl',
        priority: 'critical',
        steps: [
            'Check if your browser supports WebGL by visiting webglreport.com',
            'Enable hardware acceleration in browser settings',
            'Update your graphics drivers',
            'Try a different browser (Chrome, Firefox, Edge)',
            'Disable browser extensions that might block WebGL',
            'Check if you\'re in private/incognito mode (some browsers disable WebGL)'
        ]
    },
    {
        id: 'webgl-context-lost',
        title: 'WebGL Context Lost',
        description: 'The WebGL context has been lost, usually due to graphics driver issues.',
        category: 'webgl',
        priority: 'critical',
        steps: [
            'Refresh the page to restore WebGL context',
            'Close other graphics-intensive tabs or applications',
            'Restart your browser',
            'Update graphics drivers',
            'Check system temperature (overheating can cause context loss)'
        ]
    },
    {
        id: 'cache-issues',
        title: 'Vite Cache Issues',
        description: 'Outdated dependencies or corrupted cache causing shader loading problems.',
        category: 'cache',
        priority: 'high',
        steps: [
            'Run: pnpm run clean:cache && pnpm run dev',
            'Delete node_modules/.vite folder manually',
            'Clear browser cache (Ctrl+Shift+Delete)',
            'Hard refresh the page (Ctrl+Shift+R)',
            'Run: pnpm run reset:full (removes node_modules)',
            'Check if @paper-design/shaders-react is properly installed'
        ]
    },
    {
        id: 'software-rendering',
        title: 'Software Rendering Detected',
        description: 'Hardware acceleration is disabled, causing poor shader performance.',
        category: 'performance',
        priority: 'high',
        steps: [
            'Enable hardware acceleration in browser settings',
            'Go to chrome://settings/system (Chrome) or about:config (Firefox)',
            'Enable "Use hardware acceleration when available"',
            'Restart the browser',
            'Check graphics driver support for your browser',
            'Try different browser if issue persists'
        ]
    },
    {
        id: 'shader-compilation-failed',
        title: 'Shader Compilation Failed',
        description: 'The WebGL shaders failed to compile, preventing rendering.',
        category: 'webgl',
        priority: 'critical',
        steps: [
            'Check browser console for specific shader errors',
            'Verify WebGL extensions are available',
            'Try reducing shader complexity (lower swirlIterations)',
            'Update browser to latest version',
            'Check if using integrated vs dedicated graphics',
            'Report the specific error to shader library maintainers'
        ]
    },
    {
        id: 'canvas-not-visible',
        title: 'Canvas Not Visible',
        description: 'The canvas element is created but not visible on screen.',
        category: 'config',
        priority: 'medium',
        steps: [
            'Check if canvas has proper dimensions (width/height)',
            'Verify CSS z-index and positioning',
            'Ensure canvas is not hidden behind other elements',
            'Check if canvas style has display: block',
            'Inspect element to see if canvas exists in DOM',
            'Verify parent container has proper dimensions'
        ]
    },
    {
        id: 'performance-issues',
        title: 'Performance Issues',
        description: 'Shader is rendering but with poor performance or stuttering.',
        category: 'performance',
        priority: 'medium',
        steps: [
            'Reduce swirlIterations parameter (try 10-15 instead of 25)',
            'Lower shapeScale for better performance',
            'Close other browser tabs using GPU',
            'Check system resource usage',
            'Enable GPU process in browser settings',
            'Use lower resolution display if possible'
        ]
    },
    {
        id: 'hydration-errors',
        title: 'React Hydration Errors',
        description: 'React hydration mismatches causing component failures.',
        category: 'config',
        priority: 'medium',
        steps: [
            'Ensure component uses client:load directive in Astro',
            'Check for server-side rendering conflicts',
            'Verify useEffect hooks run only on client',
            'Add typeof window !== "undefined" checks',
            'Use dynamic imports for client-only components',
            'Check React version compatibility'
        ]
    }
];

export default function TroubleshootingGuide({
    webglDiagnostics,
    lastError,
    warpStatus,
    className
}: TroubleshootingGuideProps) {
    const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

    // Determine relevant solutions based on diagnostics
    const getRelevantSolutions = (): TroubleshootingSolution[] => {
        const relevant: TroubleshootingSolution[] = [];

        // WebGL issues
        if (!webglDiagnostics?.supported) {
            relevant.push(SOLUTIONS.find(s => s.id === 'webgl-not-supported')!);
        }

        if (webglDiagnostics?.capabilities?.contextLost) {
            relevant.push(SOLUTIONS.find(s => s.id === 'webgl-context-lost')!);
        }

        if (!webglDiagnostics?.capabilities?.hardwareAccelerated) {
            relevant.push(SOLUTIONS.find(s => s.id === 'software-rendering')!);
        }

        // Error-based solutions
        if (lastError?.includes('504 Outdated Optimize Dep') ||
            lastError?.includes('Failed to fetch dynamically imported module')) {
            relevant.push(SOLUTIONS.find(s => s.id === 'cache-issues')!);
        }

        if (lastError?.includes('shader') || lastError?.includes('compilation')) {
            relevant.push(SOLUTIONS.find(s => s.id === 'shader-compilation-failed')!);
        }

        if (lastError?.includes('hydrat') || lastError?.includes('mismatch')) {
            relevant.push(SOLUTIONS.find(s => s.id === 'hydration-errors')!);
        }

        // Status-based solutions
        if (warpStatus === 'loaded' && webglDiagnostics?.supported) {
            // Likely canvas visibility issue
            relevant.push(SOLUTIONS.find(s => s.id === 'canvas-not-visible')!);
        }

        // Performance issues
        if (webglDiagnostics?.capabilities &&
            (webglDiagnostics.capabilities.maxTextureSize < 1024 ||
             webglDiagnostics.capabilities.maxFragmentUniforms < 16)) {
            relevant.push(SOLUTIONS.find(s => s.id === 'performance-issues')!);
        }

        // If no specific issues detected, add common solutions
        if (relevant.length === 0) {
            relevant.push(
                SOLUTIONS.find(s => s.id === 'cache-issues')!,
                SOLUTIONS.find(s => s.id === 'canvas-not-visible')!
            );
        }

        return relevant.sort((a, b) => {
            const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    };

    const relevantSolutions = getRelevantSolutions();

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-400 border-red-600/50';
            case 'high': return 'text-orange-400 border-orange-600/50';
            case 'medium': return 'text-yellow-400 border-yellow-600/50';
            case 'low': return 'text-green-400 border-green-600/50';
            default: return 'text-zinc-400 border-zinc-600/50';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'webgl': return '🎮';
            case 'cache': return '🗂️';
            case 'browser': return '🌐';
            case 'performance': return '⚡';
            case 'config': return '⚙️';
            default: return '🔧';
        }
    };

    return (
        <div className={`bg-zinc-900/80 border border-zinc-700 rounded-lg p-4 ${className || ''}`}>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🩺</span>
                <h3 className="font-bold text-white">Troubleshooting Guide</h3>
            </div>

            {relevantSolutions.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">
                    <div className="text-2xl mb-2">✅</div>
                    <p>No specific issues detected. Everything appears to be working correctly!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-zinc-300 text-sm mb-4">
                        Based on your system diagnostics, here are the most likely solutions:
                    </p>

                    {relevantSolutions.map((solution) => (
                        <div
                            key={solution.id}
                            className={`border rounded-lg p-3 transition ${getPriorityColor(solution.priority)}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span>{getCategoryIcon(solution.category)}</span>
                                    <span className="font-medium">{solution.title}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded uppercase font-mono ${
                                        solution.priority === 'critical' ? 'bg-red-900/50' :
                                        solution.priority === 'high' ? 'bg-orange-900/50' :
                                        solution.priority === 'medium' ? 'bg-yellow-900/50' : 'bg-green-900/50'
                                    }`}>
                                        {solution.priority}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setExpandedSolution(
                                        expandedSolution === solution.id ? null : solution.id
                                    )}
                                    className="text-zinc-400 hover:text-white transition"
                                >
                                    {expandedSolution === solution.id ? '▼' : '▶'}
                                </button>
                            </div>

                            <p className="text-zinc-300 text-sm mt-1">{solution.description}</p>

                            {expandedSolution === solution.id && (
                                <div className="mt-3 pt-3 border-t border-zinc-700">
                                    <div className="text-sm font-medium mb-2 text-zinc-200">Steps to resolve:</div>
                                    <ol className="space-y-1 text-sm text-zinc-300">
                                        {solution.steps.map((step, index) => (
                                            <li key={index} className="flex gap-2">
                                                <span className="text-zinc-500 font-mono text-xs mt-0.5">
                                                    {index + 1}.
                                                </span>
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-zinc-700 text-xs text-zinc-400">
                <div className="flex justify-between items-center">
                    <span>💡 Tip: Try solutions in order of priority (Critical → High → Medium)</span>
                    <button
                        onClick={() => window.open('https://webglreport.com', '_blank')}
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        Test WebGL Support
                    </button>
                </div>
            </div>
        </div>
    );
}