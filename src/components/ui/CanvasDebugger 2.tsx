/**
 * CanvasDebugger - Advanced canvas and WebGL context debugging component
 *
 * This component provides deep inspection of canvas creation, WebGL context issues,
 * and helps identify why shaders might not be rendering properly.
 */

import { useEffect, useState, useRef } from 'react';

interface CanvasTest {
    name: string;
    result: 'success' | 'failed' | 'pending';
    details: string;
    data?: any;
}

interface CanvasDebuggerProps {
    className?: string;
    onComplete?: (tests: CanvasTest[]) => void;
}

export default function CanvasDebugger({ className, onComplete }: CanvasDebuggerProps) {
    const [tests, setTests] = useState<CanvasTest[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        runCanvasTests();
    }, []);

    const runCanvasTests = async () => {
        setIsRunning(true);
        const testResults: CanvasTest[] = [];

        // Test 1: Canvas creation
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            testResults.push({
                name: 'Canvas Creation',
                result: 'success',
                details: `Created ${canvas.width}x${canvas.height} canvas`,
                data: { width: canvas.width, height: canvas.height }
            });
        } catch (error) {
            testResults.push({
                name: 'Canvas Creation',
                result: 'failed',
                details: `Failed to create canvas: ${(error as Error).message}`
            });
        }

        // Test 2: 2D Context
        try {
            const canvas = document.createElement('canvas');
            const ctx2d = canvas.getContext('2d');
            if (ctx2d) {
                ctx2d.fillStyle = 'red';
                ctx2d.fillRect(0, 0, 10, 10);
                testResults.push({
                    name: '2D Context',
                    result: 'success',
                    details: 'Successfully created 2D rendering context',
                    data: { fillStyle: ctx2d.fillStyle }
                });
            } else {
                throw new Error('2D context is null');
            }
        } catch (error) {
            testResults.push({
                name: '2D Context',
                result: 'failed',
                details: `2D context failed: ${(error as Error).message}`
            });
        }

        // Test 3: WebGL context creation
        try {
            const canvas = document.createElement('canvas');
            const webglOptions = {
                alpha: true,
                antialias: true,
                depth: true,
                failIfMajorPerformanceCaveat: false,
                powerPreference: 'default' as WebGLPowerPreference,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false,
                stencil: false
            };

            let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2', webglOptions) as WebGL2RenderingContext | null;
            let version = 'WebGL 2.0';

            if (!gl) {
                gl = canvas.getContext('webgl', webglOptions) as WebGLRenderingContext | null;
                version = 'WebGL 1.0';
            }

            if (!gl) {
                throw new Error('No WebGL context available');
            }

            // Test basic WebGL functionality
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            testResults.push({
                name: 'WebGL Context',
                result: 'success',
                details: `Created ${version} context successfully`,
                data: {
                    version,
                    vendor: gl.getParameter(gl.VENDOR),
                    renderer: gl.getParameter(gl.RENDERER),
                    contextLost: gl.isContextLost()
                }
            });
        } catch (error) {
            testResults.push({
                name: 'WebGL Context',
                result: 'failed',
                details: `WebGL context failed: ${(error as Error).message}`
            });
        }

        // Test 4: Shader compilation
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');

            if (!gl) {
                throw new Error('No WebGL context for shader test');
            }

            // Simple vertex shader
            const vertexShaderSource = `
                attribute vec2 a_position;
                void main() {
                    gl_Position = vec4(a_position, 0.0, 1.0);
                }
            `;

            // Simple fragment shader
            const fragmentShaderSource = `
                precision mediump float;
                uniform vec3 u_color;
                void main() {
                    gl_FragColor = vec4(u_color, 1.0);
                }
            `;

            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            if (!vertexShader) throw new Error('Failed to create vertex shader');

            gl.shaderSource(vertexShader, vertexShaderSource);
            gl.compileShader(vertexShader);

            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                throw new Error('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertexShader));
            }

            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            if (!fragmentShader) throw new Error('Failed to create fragment shader');

            gl.shaderSource(fragmentShader, fragmentShaderSource);
            gl.compileShader(fragmentShader);

            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                throw new Error('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
            }

            // Create program
            const program = gl.createProgram();
            if (!program) throw new Error('Failed to create shader program');

            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error('Program linking failed: ' + gl.getProgramInfoLog(program));
            }

            testResults.push({
                name: 'Shader Compilation',
                result: 'success',
                details: 'Vertex and fragment shaders compiled and linked successfully'
            });

        } catch (error) {
            testResults.push({
                name: 'Shader Compilation',
                result: 'failed',
                details: `Shader compilation failed: ${(error as Error).message}`
            });
        }

        // Test 5: Canvas in DOM
        try {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const computed = window.getComputedStyle(canvasRef.current);

                testResults.push({
                    name: 'DOM Canvas',
                    result: 'success',
                    details: 'Canvas successfully mounted in DOM',
                    data: {
                        rect: { width: rect.width, height: rect.height },
                        computed: {
                            display: computed.display,
                            visibility: computed.visibility,
                            position: computed.position,
                            zIndex: computed.zIndex
                        }
                    }
                });
            } else {
                throw new Error('Canvas ref is null');
            }
        } catch (error) {
            testResults.push({
                name: 'DOM Canvas',
                result: 'failed',
                details: `DOM canvas test failed: ${(error as Error).message}`
            });
        }

        // Test 6: Animation frame
        try {
            let rafCalled = false;
            const rafId = requestAnimationFrame(() => {
                rafCalled = true;
            });

            // Wait a bit for RAF to fire
            await new Promise(resolve => setTimeout(resolve, 50));

            if (rafCalled) {
                testResults.push({
                    name: 'Animation Frame',
                    result: 'success',
                    details: 'requestAnimationFrame working correctly'
                });
            } else {
                testResults.push({
                    name: 'Animation Frame',
                    result: 'failed',
                    details: 'requestAnimationFrame did not fire'
                });
            }

            cancelAnimationFrame(rafId);
        } catch (error) {
            testResults.push({
                name: 'Animation Frame',
                result: 'failed',
                details: `Animation frame test failed: ${(error as Error).message}`
            });
        }

        setTests(testResults);
        setIsRunning(false);
        onComplete?.(testResults);

        console.group('🎨 Canvas Debugger Results');
        testResults.forEach(test => {
            const symbol = test.result === 'success' ? '✅' : '❌';
            console.log(`${symbol} ${test.name}: ${test.details}`);
            if (test.data) {
                console.log('   Data:', test.data);
            }
        });
        console.groupEnd();
    };

    if (isRunning) {
        return (
            <div className={`p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg ${className || ''}`}>
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                    <span className="text-blue-400 text-sm">Running canvas diagnostics...</span>
                </div>
            </div>
        );
    }

    const successCount = tests.filter(t => t.result === 'success').length;
    const totalTests = tests.length;
    const allPassed = successCount === totalTests;

    return (
        <div className={`p-4 ${allPassed ? 'bg-green-900/20 border-green-600/50' : 'bg-red-900/20 border-red-600/50'} border rounded-lg ${className || ''}`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{allPassed ? '✅' : '⚠️'}</span>
                <span className={`font-semibold ${allPassed ? 'text-green-400' : 'text-yellow-400'}`}>
                    Canvas Tests: {successCount}/{totalTests} Passed
                </span>
            </div>

            {/* Test Canvas for DOM testing */}
            <canvas
                ref={canvasRef}
                width={100}
                height={50}
                className="hidden"
                style={{ position: 'absolute', top: -1000, left: -1000 }}
            />

            <div className="space-y-1 text-sm">
                {tests.map((test, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <span className="text-base">
                            {test.result === 'success' ? '✅' : test.result === 'failed' ? '❌' : '⏳'}
                        </span>
                        <div className="flex-1">
                            <div className={`font-medium ${test.result === 'success' ? 'text-green-400' : test.result === 'failed' ? 'text-red-400' : 'text-yellow-400'}`}>
                                {test.name}
                            </div>
                            <div className="text-zinc-300 text-xs">{test.details}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-700">
                <button
                    onClick={runCanvasTests}
                    className="text-xs bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded transition"
                >
                    Rerun Tests
                </button>
            </div>
        </div>
    );
}