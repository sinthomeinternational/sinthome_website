import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Benefit {
  label: string;
  number: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    label: "Intelligence",
    number: "01",
    title: "Real-World Decision Intelligence",
    description: "Capture and analyze the countless micro-decisions that truly drive industrial operations, beyond what traditional ERP systems can see"
  },
  {
    label: "Impact",
    number: "02",
    title: "Immediate ROI Generation",
    description: "Target ≥10% procurement savings and ~7% inventory reduction while building long-term intelligence assets"
  },
  {
    label: "Scale",
    number: "03",
    title: "Scalable Intelligence Network",
    description: "Build toward 150,000 AI Agents across 10,000 factories by 2030, creating the world's largest industrial decision dataset"
  },
  {
    label: "Synergy",
    number: "04",
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Mission: Reshaping the Future of Industry
          </h2>
          <p className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
            Plantcore.AI is committed to building the world's first Industrial Vertical Large Language Model (LLM)
            to drive a fundamental transformation in manufacturing.
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
              We believe the future of industry is not limited to automated execution but lies in the
              <span className="text-red-400 font-semibold"> intelligent and collective structuring of decision-making</span>.
              Every act of production is shaped by countless judgments and choices—decisions that are the true drivers of industry.
              Plantcore.AI begins from this reality, aiming to construct a new industrial intelligence system grounded in real-world decision data.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative bg-zinc-900/80 border border-zinc-800/80 rounded-lg overflow-hidden hover:border-red-600/30 hover:bg-zinc-900 transition-all duration-300 group"
            >
              {/* Red accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-700 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card content */}
              <div className="p-8 pl-10">
                {/* Header section with label and number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Label badge */}
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-zinc-800/60 text-zinc-400 rounded border border-zinc-700/50 group-hover:text-red-400 group-hover:border-red-600/30 transition-all duration-300">
                      {benefit.label}
                    </span>
                  </div>
                  {/* Sequence number */}
                  <div className="text-5xl font-bold text-zinc-800/40 group-hover:text-red-600/20 transition-colors duration-300">
                    {benefit.number}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-white mb-4 leading-tight group-hover:text-white transition-colors duration-300">
                  {benefit.title}
                </h4>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-300">
                  {benefit.description}
                </p>
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
              Method: Starting from Decisions
            </h3>
            <p className="text-zinc-300 leading-relaxed max-w-4xl mx-auto">
              Current ERP systems record transactions and processes but fail to capture the on-the-ground
              choices made by workers and managers in real time. This blind spot prevents the accumulation
              of experiential data and blocks the path toward genuine intelligent decision-making.
              Plantcore.AI addresses this gap by deploying AI Agents directly on the factory floor to capture
              Context–Decision–Outcome (CDO) data.
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
