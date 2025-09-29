import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Button from '../ui/Button';
import IndustrialWarpBackground from './IndustrialWarpBackground';

interface HeroSectionProps {
  onRequestDemo: () => void;
  onJoinPilot: () => void;
}

export default function HeroSection({ onRequestDemo, onJoinPilot }: HeroSectionProps) {
  const [dataFlow, setDataFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Industrial Warp Background */}
      <IndustrialWarpBackground />

      {/* Sharp Edge Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* Living Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal Data Flow */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            x: ['-100%', '0%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            x: ['100%', '0%', '-100%']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />

        {/* Vertical Data Flow */}
        <motion.div
          className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-red-400/50 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            y: ['-100%', '0%', '100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Industrial Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-black/80 border-2 border-red-600/60 text-red-400 text-sm font-bold tracking-wide uppercase"
            style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            INDUSTRIAL LLM PROTOCOL
            <div className="text-xs bg-red-600/20 px-2 py-1 ml-2">V1.0</div>
          </motion.div>

          {/* Main Heading with Dynamic Data Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
              DECISION
              <br />
              <span className="relative inline-block">
                INTELLIGENCE
                {/* Dynamic data indicator */}
                <motion.div
                  className="absolute -top-2 -right-4 text-xs text-red-400 font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  [{String(dataFlow).padStart(3, '0')}%]
                </motion.div>
              </span>
              <br />
              <span className="text-red-500 relative">
                DEPLOYED
                {/* Live indicator */}
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-1 bg-red-500"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Industrial Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="border-l-4 border-red-500 pl-6 text-left inline-block">
              <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-medium">
                MANUFACTURING REVOLUTION THROUGH
              </p>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-bold">
                AUTHENTIC DECISION INTELLIGENCE
              </p>
              <div className="mt-2 text-sm text-red-400 font-mono">
                // Real-time AI agents capturing factory-floor decisions
              </div>
            </div>
          </motion.div>

          {/* Industrial Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/60 border border-zinc-800 p-6">
              {[
                { label: "COST REDUCTION", value: "≥10%", unit: "MIN", color: "text-green-400" },
                { label: "INVENTORY OPT", value: "7%", unit: "AVG", color: "text-blue-400" },
                { label: "ROI TIMELINE", value: "D1", unit: "START", color: "text-yellow-400" },
                { label: "INDUSTRY VER", value: "4.0", unit: "READY", color: "text-red-400" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center border-r border-zinc-700 last:border-r-0 px-2"
                >
                  <div className={`text-2xl font-bold font-mono ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-bold tracking-wide">
                    {metric.label}
                  </div>
                  <div className="text-xs text-zinc-600 font-mono">
                    [{metric.unit}]
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industrial Action Interfaces */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            {/* Primary Action - Demo Request */}
            <motion.button
              onClick={onRequestDemo}
              className="group relative bg-red-600 border-2 border-red-500 text-white px-8 py-4 font-bold tracking-wide uppercase transition-all duration-300 hover:bg-red-700"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-current">
                  <motion.div
                    className="w-full h-full bg-current"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                REQUEST DEMO
              </div>
              <div className="absolute -bottom-1 left-4 right-4 h-px bg-white/50 group-hover:bg-white transition-colors" />
            </motion.button>

            {/* Secondary Action - Pilot Program */}
            <motion.button
              onClick={onJoinPilot}
              className="group relative bg-transparent border-2 border-zinc-400 text-zinc-300 px-8 py-4 font-bold tracking-wide uppercase transition-all duration-300 hover:border-white hover:text-white"
              style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-current" />
                PILOT PROGRAM
              </div>
              <div className="absolute -bottom-1 left-4 right-4 h-px bg-zinc-600 group-hover:bg-white transition-colors" />
            </motion.button>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-4 bg-black/40 border border-zinc-800 px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-400 font-mono">SYSTEM OPERATIONAL</span>
              </div>
              <div className="w-px h-4 bg-zinc-700" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-xs text-zinc-400 font-mono">AGENTS DEPLOYED</span>
              </div>
              <div className="w-px h-4 bg-zinc-700" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-xs text-zinc-400 font-mono">LLM TRAINING</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-zinc-400"
          >
            <span className="text-xs mb-2">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}