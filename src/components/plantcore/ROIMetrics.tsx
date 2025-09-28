import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animatedValue?: number;
  suffix?: string;
}

const metrics: Metric[] = [
  {
    id: 'procurement-savings',
    value: '≥10%',
    label: 'Procurement Savings',
    description: 'Immediate cost reduction through intelligent procurement decisions',
    color: 'from-green-500 to-green-600',
    animatedValue: 10,
    suffix: '%',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    id: 'inventory-reduction',
    value: '~7%',
    label: 'Inventory Shrinkage Reduction',
    description: 'Optimize inventory management through predictive analytics',
    color: 'from-blue-500 to-blue-600',
    animatedValue: 7,
    suffix: '%',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 'decision-points',
    value: '150K+',
    label: 'AI Agents Deployed',
    description: 'By 2030, across 10,000 factories for comprehensive coverage',
    color: 'from-red-500 to-red-600',
    animatedValue: 150,
    suffix: 'K+',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'decision-samples',
    value: '100M+',
    label: 'Decision Samples',
    description: 'Validated decision data points for Industrial LLM training',
    color: 'from-purple-500 to-purple-600',
    animatedValue: 100,
    suffix: 'M+',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

function AnimatedNumber({
  value,
  duration = 2000,
  suffix = '',
  inView
}: {
  value: number;
  duration?: number;
  suffix?: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(value * easeOutCubic));

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
  }, [value, duration, inView]);

  return <span>{displayValue}{suffix}</span>;
}

export default function ROIMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-3xl blur-xl"></div>

      <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Proven ROI & Growth Metrics
          </h3>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Our AI-driven approach delivers immediate value while building the foundation for long-term industrial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
            >
              {/* Card */}
              <div className={`
                relative bg-gradient-to-r ${metric.color} p-0.5 rounded-xl
                group-hover:scale-105 transition-all duration-300
              `}>
                <div className="bg-zinc-900 rounded-xl p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`
                      p-3 rounded-full bg-gradient-to-r ${metric.color} text-white mb-4
                      group-hover:animate-pulse
                    `}>
                      {metric.icon}
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-bold text-white mb-2">
                      {metric.animatedValue ? (
                        <AnimatedNumber
                          value={metric.animatedValue}
                          suffix={metric.suffix}
                          inView={isInView}
                        />
                      ) : (
                        metric.value
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-lg font-semibold text-zinc-200 mb-3">
                      {metric.label}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
                    animate={{
                      y: [-20, -60],
                      x: [0, Math.random() * 40 - 20],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8 + index * 0.2,
                      ease: "easeOut"
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      bottom: '20%'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-700/10 border border-red-600/30 rounded-full text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium">Start seeing ROI from day one with our pilot program</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}