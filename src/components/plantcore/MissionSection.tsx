import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Real-World Decision Intelligence",
    description: "Capture and analyze the countless micro-decisions that truly drive industrial operations, beyond what traditional ERP systems can see"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Immediate ROI Generation",
    description: "Deliver ≥10% procurement savings and ~7% inventory reduction from day one while building long-term intelligence assets"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Scalable Intelligence Network",
    description: "Build toward 150,000 AI Agents across 10,000 factories by 2030, creating the world's largest industrial decision dataset"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Human-AI Collaboration",
    description: "Enhance rather than replace human expertise, creating an intelligent decision network that amplifies collective industrial knowledge"
  }
];

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" ref={ref} className="relative py-20 bg-zinc-950/50 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
            Building the world's first Industrial Vertical Large Language Model to drive
            a fundamental transformation in manufacturing through intelligent decision-making
          </p>
        </motion.div>

        {/* Core Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 border border-red-600/20 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Core Vision</h3>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              We believe the future of industry lies not in automated execution, but in the
              <span className="text-red-400 font-semibold"> intelligent and collective structuring of decision-making</span>.
              Every act of production is shaped by countless judgments and choices—decisions that are the true drivers of industry.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-red-600/20 to-red-700/10 border border-red-600/30 rounded-lg text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-red-100 transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              The Challenge We're Solving
            </h3>
            <p className="text-zinc-300 leading-relaxed max-w-4xl mx-auto">
              Current ERP systems record transactions and processes but fail to capture the on-the-ground
              choices made by workers and managers in real time. This blind spot prevents the accumulation
              of experiential data and blocks the path toward genuine intelligent decision-making.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-700/10 border border-red-600/30 rounded-full text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Learn how our three-layer architecture solves this challenge</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}