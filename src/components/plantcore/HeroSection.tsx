import React from 'react';
import { motion } from 'motion/react';
import Button from '../ui/Button';
import IndustrialWarpBackground from './IndustrialWarpBackground';

interface HeroSectionProps {
  onRequestDemo: () => void;
  onJoinPilot: () => void;
}

export default function HeroSection({ onRequestDemo, onJoinPilot }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Warp Background */}
      <IndustrialWarpBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 border border-red-600/40 text-red-400 text-sm font-semibold rounded-full backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Industrial Vertical LLM
            <div className="text-xs bg-red-600/20 px-2 py-1 rounded-full">Live</div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              Industrial Vertical
              <br />
              <span className="text-red-500">Large Language Model</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900/40 border-l-4 border-red-500 pl-6 py-6 text-left rounded-r-lg backdrop-blur-sm">
              <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-medium mb-3">
                Building the first Industrial Vertical Large Language Model
              </p>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                by deploying AI Agents that capture real-time Context-Decision-Outcome (CDO) data from factory floors
              </p>
              <p className="text-sm text-red-400 mt-4">
                Transforming manufacturing through intelligent decision-making
              </p>
            </div>
          </motion.div>

          {/* Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/40 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
              {[
                { label: "Procurement", value: "≥10%", unit: "Savings", color: "text-green-400" },
                { label: "Inventory", value: "~7%", unit: "Reduction", color: "text-blue-400" },
                { label: "Factories", value: "10K", unit: "By 2030", color: "text-yellow-400" },
                { label: "AI Agents", value: "150K+", unit: "Deployed", color: "text-red-400" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className={`text-2xl md:text-3xl font-bold ${metric.color} mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-semibold">
                    {metric.label}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {metric.unit}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              onClick={onRequestDemo}
              variant="primary"
              size="lg"
              className="min-w-[200px]"
            >
              Request Demo
            </Button>

            <Button
              onClick={onJoinPilot}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              Join Pilot Program
            </Button>
          </motion.div>

        </motion.div>

        {/* Bottom Section - Scroll & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 pb-8"
        >
          {/* Scroll Indicator */}
          <div className="text-center mb-4">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center"
            >
              <span className="text-sm text-zinc-300 mb-2 font-medium">Scroll to explore</span>
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>

          {/* System Status Bar */}
          <div className="flex justify-center">
            <div className="flex items-center gap-8 px-8 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-zinc-800/50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-xs text-zinc-300 font-medium">System Active</span>
              </div>

              <div className="w-px h-3 bg-zinc-700/50" />

              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
                <span className="text-xs text-zinc-300 font-medium">Agents Deployed</span>
              </div>

              <div className="w-px h-3 bg-zinc-700/50" />

              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                <span className="text-xs text-zinc-300 font-medium">CDO Data Capture</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
