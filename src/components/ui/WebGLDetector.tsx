/**
 * WebGLDetector - Comprehensive WebGL support detection and diagnostics
 *
 * This component tests WebGL availability and provides detailed diagnostics
 * for debugging shader rendering issues.
 */

import { useEffect, useState } from 'react';

export interface WebGLCapabilities {
    webgl1: boolean;
    webgl2: boolean;
    maxTextureSize: number;
    maxVertexUniforms: number;
    maxFragmentUniforms: number;
    extensions: string[];
    renderer: string;
    vendor: string;
    version: string;
    contextLost: boolean;
    hardwareAccelerated: boolean;
}

export interface WebGLDiagnostics {
    supported: boolean;
    capabilities: WebGLCapabilities | null;
    errors: string[];
    warnings: string[];
    tests: {
        canCreateContext: boolean;
        canCreateShader: boolean;
        canCreateProgram: boolean;
        canRender: boolean;
    };
}

function testWebGLCapabilities(): WebGLDiagnostics {
    const diagnostics: WebGLDiagnostics = {
        supported: false,
        capabilities: null,
        errors: [],
        warnings: [],
        tests: {
            canCreateContext: false,
            canCreateShader: false,
            canCreateProgram: false,
            canRender: false
        }
    };

    try {
        // Create test canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;

        // Test WebGL context creation
        let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

        try {
            gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
        } catch (e) {
            diagnostics.warnings.push('WebGL2 context creation failed: ' + (e as Error).message);
        }

        if (!gl) {
            try {
                gl = canvas.getContext('webgl') as WebGLRenderingContext;
            } catch (e) {
                diagnostics.errors.push('WebGL context creation failed: ' + (e as Error).message);
                return diagnostics;
            }
        }

        if (!gl) {
            diagnostics.errors.push('No WebGL context available');
            return diagnostics;
        }

        diagnostics.tests.canCreateContext = true;

        // Check if context is lost
        const contextLost = gl.isContextLost();
        if (contextLost) {
            diagnostics.errors.push('WebGL context is lost');
            return diagnostics;
        }

        // Get WebGL capabilities
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const capabilities: WebGLCapabilities = {
            webgl1: !!canvas.getContext('webgl'),
            webgl2: !!canvas.getContext('webgl2'),
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
            maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
            maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
            extensions: gl.getSupportedExtensions() || [],
            renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
            vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
            version: gl.getParameter(gl.VERSION),
            contextLost,
            hardwareAccelerated: !gl.getParameter(gl.RENDERER).includes('Software')
        };

        diagnostics.capabilities = capabilities;

        // Test shader compilation
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        if (vertexShader) {
            gl.shaderSource(vertexShader, `
                attribute vec2 position;
                void main() {
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `);
            gl.compileShader(vertexShader);

            if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                diagnostics.tests.canCreateShader = true;
            } else {
                diagnostics.errors.push('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertexShader));
            }
        }

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShader && diagnostics.tests.canCreateShader) {
            gl.shaderSource(fragmentShader, `
                precision mediump float;
                void main() {
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                }
            `);
            gl.compileShader(fragmentShader);

            if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                // Test program creation
                const program = gl.createProgram();
                if (program && vertexShader) {
                    gl.attachShader(program, vertexShader);
                    gl.attachShader(program, fragmentShader);
                    gl.linkProgram(program);

                    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        diagnostics.tests.canCreateProgram = true;
                        diagnostics.tests.canRender = true;
                        diagnostics.supported = true;
                    } else {
                        diagnostics.errors.push('Shader program linking failed: ' + gl.getProgramInfoLog(program));
                    }
                }
            } else {
                diagnostics.errors.push('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
            }
        }

        // Additional checks
        if (!capabilities.hardwareAccelerated) {
            diagnostics.warnings.push('Hardware acceleration may not be available - using software rendering');
        }

        if (capabilities.maxTextureSize < 1024) {
            diagnostics.warnings.push(`Low maximum texture size: ${capabilities.maxTextureSize}px`);
        }

        if (capabilities.maxFragmentUniforms < 16) {
            diagnostics.warnings.push(`Limited fragment uniforms: ${capabilities.maxFragmentUniforms}`);
        }

    } catch (error) {
        diagnostics.errors.push('WebGL test failed: ' + (error as Error).message);
    }

    return diagnostics;
}

interface WebGLDetectorProps {
    onResult?: (diagnostics: WebGLDiagnostics) => void;
    showDetails?: boolean;
    className?: string;
}

export default function WebGLDetector({ onResult, showDetails = true, className }: WebGLDetectorProps) {
    const [diagnostics, setDiagnostics] = useState<WebGLDiagnostics | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Run WebGL detection after component mounts (client-side only)
        const runDiagnostics = () => {
            try {
                const result = testWebGLCapabilities();
                setDiagnostics(result);
                onResult?.(result);

                // Log comprehensive diagnostics
                console.group('🔍 WebGL Diagnostics');
                console.log('Supported:', result.supported);
                console.log('Capabilities:', result.capabilities);
                console.log('Errors:', result.errors);
                console.log('Warnings:', result.warnings);
                console.log('Tests:', result.tests);
                console.groupEnd();
            } catch (error) {
                console.error('WebGL diagnostics failed:', error);
                const errorResult: WebGLDiagnostics = {
                    supported: false,
                    capabilities: null,
                    errors: [(error as Error).message],
                    warnings: [],
                    tests: {
                        canCreateContext: false,
                        canCreateShader: false,
                        canCreateProgram: false,
                        canRender: false
                    }
                };
                setDiagnostics(errorResult);
                onResult?.(errorResult);
            } finally {
                setIsLoading(false);
            }
        };

        // Delay to ensure DOM is ready
        const timer = setTimeout(runDiagnostics, 100);
        return () => clearTimeout(timer);
    }, [onResult]);

    if (isLoading) {
        return (
            <div className={`p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg ${className || ''}`}>
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                    <span className="text-blue-400 text-sm">Testing WebGL support...</span>
                </div>
            </div>
        );
    }

    if (!diagnostics) {
        return null;
    }

    const bgColor = diagnostics.supported ? 'bg-green-900/20' : 'bg-red-900/20';
    const borderColor = diagnostics.supported ? 'border-green-600/50' : 'border-red-600/50';
    const textColor = diagnostics.supported ? 'text-green-400' : 'text-red-400';

    return (
        <div className={`p-4 ${bgColor} border ${borderColor} rounded-lg ${className || ''}`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">
                    {diagnostics.supported ? '✅' : '❌'}
                </span>
                <span className={`font-semibold ${textColor}`}>
                    WebGL {diagnostics.supported ? 'Supported' : 'Not Supported'}
                </span>
            </div>

            {diagnostics.errors.length > 0 && (
                <div className="mb-3">
                    <div className="text-red-400 font-medium text-sm mb-1">Errors:</div>
                    {diagnostics.errors.map((error, index) => (
                        <div key={index} className="text-red-300 text-xs bg-red-900/20 px-2 py-1 rounded mb-1">
                            {error}
                        </div>
                    ))}
                </div>
            )}

            {diagnostics.warnings.length > 0 && (
                <div className="mb-3">
                    <div className="text-yellow-400 font-medium text-sm mb-1">Warnings:</div>
                    {diagnostics.warnings.map((warning, index) => (
                        <div key={index} className="text-yellow-300 text-xs bg-yellow-900/20 px-2 py-1 rounded mb-1">
                            {warning}
                        </div>
                    ))}
                </div>
            )}

            {showDetails && diagnostics.capabilities && (
                <div className="space-y-2">
                    <div className="text-zinc-300 font-medium text-sm">Details:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-zinc-800/50 p-2 rounded">
                            <div className="text-zinc-400">WebGL Version</div>
                            <div className="text-white font-mono">
                                {diagnostics.capabilities.webgl2 ? 'WebGL 2.0' : diagnostics.capabilities.webgl1 ? 'WebGL 1.0' : 'None'}
                            </div>
                        </div>
                        <div className="bg-zinc-800/50 p-2 rounded">
                            <div className="text-zinc-400">Hardware Acceleration</div>
                            <div className={`font-mono ${diagnostics.capabilities.hardwareAccelerated ? 'text-green-400' : 'text-red-400'}`}>
                                {diagnostics.capabilities.hardwareAccelerated ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <div className="bg-zinc-800/50 p-2 rounded">
                            <div className="text-zinc-400">Max Texture Size</div>
                            <div className="text-white font-mono">{diagnostics.capabilities.maxTextureSize}px</div>
                        </div>
                        <div className="bg-zinc-800/50 p-2 rounded">
                            <div className="text-zinc-400">Extensions</div>
                            <div className="text-white font-mono">{diagnostics.capabilities.extensions.length}</div>
                        </div>
                    </div>

                    <div className="bg-zinc-800/50 p-2 rounded">
                        <div className="text-zinc-400 text-xs mb-1">Renderer</div>
                        <div className="text-white font-mono text-xs break-all">{diagnostics.capabilities.renderer}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-xs">
                        {Object.entries(diagnostics.tests).map(([test, passed]) => (
                            <div key={test} className="flex items-center gap-1">
                                <span>{passed ? '✅' : '❌'}</span>
                                <span className="text-zinc-300">{test}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}