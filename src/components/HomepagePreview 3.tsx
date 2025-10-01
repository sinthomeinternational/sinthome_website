import { Warp } from '@paper-design/shaders-react';

export default function HomepagePreview() {
    return (
        <div className="relative h-screen bg-black text-white overflow-hidden">
            {/* Warp Background */}
            <div className="absolute inset-0 z-0">
                <Warp
                    color1="#520000"
                    color2="#9d0101"
                    color3="#240000"
                    speed={0.9}
                    swirl={0.77}
                    swirlIterations={40}
                    shapeScale={0.84}
                    rotation={0}
                    scale={1.0}
                    proportion={1.0}
                    softness={0.5}
                    distortion={0.5}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Navigation */}
                <nav className="flex justify-between items-center px-8 py-6 bg-black/30 backdrop-blur-sm">
                    <div className="text-2xl font-bold tracking-wider">
                        <span className="text-red-500">SIN</span><span className="text-white">THOME</span>
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-red-400 transition">About</a>
                        <a href="#" className="hover:text-red-400 transition">Projects</a>
                        <a href="#" className="hover:text-red-400 transition">Events</a>
                        <a href="#" className="hover:text-red-400 transition">Contact</a>
                        <a href="#" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">Donate</a>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6">
                            <span className="block text-white">Empowering</span>
                            <span className="block text-red-500">Innovation</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-zinc-300">
                            Building bridges between technology and community through collaborative projects and meaningful impact
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg text-lg font-medium transition transform hover:scale-105">
                                Get Started
                            </button>
                            <button className="border border-red-600 hover:bg-red-600/10 px-8 py-3 rounded-lg text-lg font-medium transition">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="px-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-red-900/30 hover:border-red-600/50 transition">
                            <div className="text-red-500 text-3xl mb-3">🚀</div>
                            <h3 className="text-xl font-semibold mb-2">Innovation Hub</h3>
                            <p className="text-zinc-400">Fostering technological advancement through cutting-edge projects and research</p>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-red-900/30 hover:border-red-600/50 transition">
                            <div className="text-red-500 text-3xl mb-3">🤝</div>
                            <h3 className="text-xl font-semibold mb-2">Community First</h3>
                            <p className="text-zinc-400">Building lasting partnerships that create positive change in our communities</p>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-red-900/30 hover:border-red-600/50 transition">
                            <div className="text-red-500 text-3xl mb-3">🌱</div>
                            <h3 className="text-xl font-semibold mb-2">Sustainable Impact</h3>
                            <p className="text-zinc-400">Creating solutions that address real-world challenges with long-term vision</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}