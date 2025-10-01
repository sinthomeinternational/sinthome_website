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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-40">
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
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 bg-zinc-950/80 border border-zinc-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl shadow-red-900/10">
              {[
                { label: "Procurement", value: "≥10%", unit: "Savings" },
                { label: "Inventory", value: "~7%", unit: "Reduction" },
                { label: "Factories", value: "10K", unit: "By 2030" },
                { label: "AI Agents", value: "150K+", unit: "Deployed" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/40 hover:border-red-600/30 transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-black text-red-500 mb-2 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm text-zinc-200 font-bold uppercase tracking-wide mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-10"
          >
            <Button
              onClick={onRequestDemo}
              variant="primary"
              size="lg"
              className="min-w-[220px] shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Request Demo
            </Button>

            <Button
              onClick={onJoinPilot}
              variant="outline"
              size="lg"
              className="min-w-[220px] backdrop-blur-sm bg-zinc-900/20 hover:bg-zinc-900/40 shadow-lg shadow-black/20 hover:scale-105 active:scale-100 transition-all duration-200"
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
          className="absolute bottom-0 left-0 right-0 pb-8 px-4"
        >
          {/* Scroll Indicator */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-2"
            >
              <span className="text-sm md:text-base text-zinc-200 font-semibold tracking-wide">Scroll to explore</span>
              <div className="w-8 h-12 border-2 border-zinc-500 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-red-500 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* System Status Bar */}
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-6 md:px-10 py-3 md:py-4 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-zinc-800/60 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                </div>
                <span className="text-xs md:text-sm text-zinc-100 font-semibold">System Online</span>
              </div>

              <div className="w-px h-4 bg-zinc-700" />

              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
                <span className="text-xs md:text-sm text-zinc-100 font-semibold">150K+ Agents</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
