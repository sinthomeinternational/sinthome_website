import React from 'react';
import { motion } from 'motion/react';

export default function ProjectContext() {
  return (
    <section className="relative py-20 bg-zinc-950/90 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Status Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-red-500" />
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide uppercase">
              PROJECT OVERVIEW
            </h2>
            <div className="w-12 h-px bg-red-500" />
          </div>
          <p className="text-lg text-zinc-400 font-mono max-w-3xl mx-auto">
            // PORTFOLIO SHOWCASE DEMONSTRATING SINTHOME'S DESIGN & DEVELOPMENT CAPABILITIES
          </p>
        </motion.div>

        {/* Project Context Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black border-2 border-zinc-800 p-6"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-yellow-500" />
              <h3 className="text-lg font-bold text-white uppercase">Project Status</h3>
            </div>
            <p className="text-zinc-300 mb-2">
              <span className="text-yellow-400 font-bold">CONCEPT DESIGN</span>
            </p>
            <p className="text-sm text-zinc-400 font-mono">
              Strategic vision and architectural framework for industrial AI platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black border-2 border-zinc-800 p-6"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-500" />
              <h3 className="text-lg font-bold text-white uppercase">Technical Stack</h3>
            </div>
            <div className="space-y-1 text-sm text-zinc-300 font-mono">
              <div>• React + TypeScript</div>
              <div>• Motion (Framer)</div>
              <div>• Canvas API</div>
              <div>• Tailwind CSS</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black border-2 border-zinc-800 p-6"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500" />
              <h3 className="text-lg font-bold text-white uppercase">Capabilities</h3>
            </div>
            <div className="space-y-1 text-sm text-zinc-300 font-mono">
              <div>• UI/UX Design</div>
              <div>• System Architecture</div>
              <div>• Component Library</div>
              <div>• Responsive Layout</div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-zinc-900/50 border border-zinc-800 p-8"
          style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
        >
          <h3 className="text-xl font-bold text-red-400 mb-6 uppercase tracking-wide">
            Development Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-400 mb-2">Q1</div>
              <div className="text-sm font-bold text-white">RESEARCH</div>
              <div className="text-xs text-zinc-500 font-mono">Market Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-400 mb-2">Q2</div>
              <div className="text-sm font-bold text-white">DESIGN</div>
              <div className="text-xs text-zinc-500 font-mono">UI/UX Concept</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">Q3</div>
              <div className="text-sm font-bold text-white">CURRENT</div>
              <div className="text-xs text-zinc-500 font-mono">Portfolio Showcase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-zinc-600 mb-2">Q4</div>
              <div className="text-sm font-bold text-zinc-500">FUTURE</div>
              <div className="text-xs text-zinc-600 font-mono">TBD</div>
            </div>
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-black/80 border-2 border-red-500/30 px-8 py-6"
               style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}>
            <h3 className="text-lg font-bold text-red-400 mb-3 uppercase">
              Showcase Highlights
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300">Complex Animations</span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300">Industrial Theme</span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300">Responsive Design</span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300">Component Architecture</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}