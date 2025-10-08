import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface IndustrialMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animatedValue: number;
  suffix: string;
  unit: string;
  gaugeMax: number;
  category: string;
}

const industrialMetrics: IndustrialMetric[] = [
  {
    id: 'cost-efficiency',
    value: '≥10%',
    label: 'COST EFFICIENCY',
    description: 'PROJECTED PROCUREMENT OPTIMIZATION THROUGH AI DECISION INTELLIGENCE',
    color: '#10b981',
    animatedValue: 12,
    suffix: '%',
    unit: 'POTENTIAL',
    gaugeMax: 15,
    category: 'FINANCIAL',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <motion.div
          className="absolute top-2 left-2 right-2 h-1 bg-current/60"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-2 left-2 right-2 h-1 bg-current/60"
          animate={{ scaleX: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
    )
  },
  {
    id: 'inventory-optimization',
    value: '~7%',
    label: 'INVENTORY OPTIMIZATION',
    description: 'DESIGNED PREDICTIVE ANALYTICS FOR STOCK MANAGEMENT',
    color: '#3b82f6',
    animatedValue: 7,
    suffix: '%',
    unit: 'TARGET',
    gaugeMax: 10,
    category: 'CAPABILITY',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <motion.div
          className="absolute top-1 left-1 right-1 h-2 border border-current/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1 left-1 right-1 h-2 border border-current/40"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
        />
        <div className="absolute top-1/2 left-1 right-1 h-px bg-current/60 transform -translate-y-1/2" />
      </div>
    )
  },
  {
    id: 'agent-deployment',
    value: '150K+',
    label: 'DECISION POINTS',
    description: 'MAPPED DECISION TOUCHPOINTS IN MANUFACTURING ANALYSIS',
    color: '#dc2626',
    animatedValue: 150,
    suffix: 'K+',
    unit: 'ANALYZED',
    gaugeMax: 200,
    category: 'RESEARCH',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <div className="absolute inset-2 border border-current/50" />
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-current transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1 left-1 w-1 h-1 bg-current/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1 right-1 w-1 h-1 bg-current/60"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
    )
  },
  {
    id: 'data-volume',
    value: '100M+',
    label: 'DATA CAPACITY',
    description: 'DESIGNED SYSTEM CAPACITY FOR DECISION PROCESSING',
    color: '#8b5cf6',
    animatedValue: 100,
    suffix: 'M+',
    unit: 'SCALE',
    gaugeMax: 150,
    category: 'ARCHITECTURE',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <motion.div
          className="absolute bottom-1 left-1 right-1 h-2 bg-current/30"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1 left-1 w-2 h-4 bg-current/50"
          animate={{ scaleY: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-1 right-1 w-2 h-3 bg-current/50"
          animate={{ scaleY: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
        />
      </div>
    )
  }
];

// Industrial Gauge Component
function IndustrialGauge({
  value,
  max,
  color,
  inView
}: {
  value: number;
  max: number;
  color: string;
  inView: boolean;
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-zinc-800"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={inView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

// Animated Number with Industrial Style
function AnimatedIndustrialNumber({
  value,
  suffix,
  inView
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2500, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(value * easeOutExpo));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, inView]);

  return (
    <span className="font-mono font-bold">
      {displayValue}{suffix}
    </span>
  );
}

export default function ROIMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative max-w-7xl mx-auto">
      {/* Industrial Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-red-500" />
          <h3 className="text-3xl font-black text-white tracking-wide uppercase">
            PROJECT CAPABILITIES
          </h3>
          <div className="w-8 h-px bg-red-500" />
        </div>
        <p className="text-lg text-zinc-400 font-mono max-w-3xl mx-auto">
          // DESIGNED SYSTEM CAPABILITIES AND PROJECTED IMPACT
        </p>
      </motion.div>

      {/* Industrial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {industrialMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 80
            }}
            className="group relative"
          >
            {/* Industrial Console */}
            <div
              className="relative bg-black border-2 border-zinc-800 transition-all duration-500 hover:border-zinc-600"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              {/* System Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: metric.color }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <span className="text-xs font-mono text-zinc-500">{metric.category}</span>
                </div>
                <div className="text-xs font-mono text-zinc-600">
                  [{metric.id.toUpperCase()}]
                </div>
              </div>

              {/* Gauge Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div style={{ color: metric.color }} className="text-2xl">
                    {metric.icon}
                  </div>
                  <IndustrialGauge
                    value={metric.animatedValue}
                    max={metric.gaugeMax}
                    color={metric.color}
                    inView={isInView}
                  />
                </div>

                {/* Metric Display */}
                <div className="mb-4">
                  <div className="text-3xl font-black text-white mb-1">
                    <AnimatedIndustrialNumber
                      value={metric.animatedValue}
                      suffix={metric.suffix}
                      inView={isInView}
                    />
                  </div>
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-wide">
                    {metric.label}
                  </div>
                  <div className="text-xs font-mono text-zinc-600">
                    {metric.unit}
                  </div>
                </div>

                {/* Technical Description */}
                <div className="text-xs text-zinc-400 font-mono leading-relaxed">
                  {metric.description}
                </div>

                {/* Pulse Bar */}
                <div className="mt-4 h-1 bg-zinc-800 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full"
                    style={{ backgroundColor: metric.color }}
                    animate={{
                      width: ['0%', `${(metric.animatedValue / metric.gaugeMax) * 100}%`],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      width: { duration: 2, delay: index * 0.2 },
                      opacity: { duration: 2, repeat: Infinity }
                    }}
                  />
                </div>
              </div>

              {/* Subtle Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(${metric.color} 1px, transparent 1px),
                    linear-gradient(90deg, ${metric.color} 1px, transparent 1px)
                  `,
                  backgroundSize: '16px 16px'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Status Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-12 bg-zinc-900/60 border border-zinc-800 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-mono text-zinc-400">PROJECT SHOWCASE</span>
            </div>
            <div className="w-px h-4 bg-zinc-700" />
            <div className="text-sm font-mono text-zinc-500">
              CONCEPT DESIGN | PORTFOLIO PIECE
            </div>
          </div>
          <div className="text-xs font-mono text-zinc-600">
            STATUS: DEMONSTRATION
          </div>
        </div>
      </motion.div>
    </div>
  );
}