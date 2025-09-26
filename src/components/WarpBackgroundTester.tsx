import { useState } from 'react';
import WarpBackground from './ui/WarpBackground';

export default function WarpBackgroundTester() {
    const [params, setParams] = useState({
        color1: '#000000',
        color2: '#5a0000',
        color3: '#ff0000',
        speed: 0.9,
        swirl: 0.98,
        swirlIterations: 25,
        shapeScale: 0.12,
        rotation: 0.85
    });

    const [copied, setCopied] = useState(false);

    const updateParam = (key: string, value: string | number) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    const copyConfig = () => {
        const configString = `<WarpBackground
    color1="${params.color1}"
    color2="${params.color2}"
    color3="${params.color3}"
    speed={${params.speed}}
    swirl={${params.swirl}}
    swirlIterations={${params.swirlIterations}}
    shapeScale={${params.shapeScale}}
    rotation={${params.rotation}}
    client:load
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
            rotation: 0.85
        });
    };

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Warp Background Preview */}
            <div className="fixed inset-0 -z-10">
                <WarpBackground {...params} />
            </div>

            {/* Control Panel */}
            <div className="relative z-10 p-8">
                <div className="max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-zinc-800">
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
                                        {params.speed.toFixed(2)}
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
                                        {params.rotation.toFixed(2)}
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
                                        {params.swirl.toFixed(2)}
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
                                        {params.shapeScale.toFixed(2)}
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
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
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
                    </div>

                    {/* Current Configuration Display */}
                    <div className="mt-6 p-3 bg-zinc-800/50 rounded-lg">
                        <h3 className="text-sm font-semibold mb-2 text-zinc-400">Current Configuration:</h3>
                        <pre className="text-xs overflow-x-auto text-zinc-300">
{`<WarpBackground
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