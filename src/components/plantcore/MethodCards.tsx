import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MethodCard {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  icon: React.ReactNode;
  progress: number;
}

const methods: MethodCard[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortDescription: 'Factory Floor Intelligence Capture',
    longDescription: 'Autonomous agents deployed at critical decision points throughout manufacturing operations. Real-time capture of human choices, process variations, and operational contexts that traditional ERP systems cannot reach.',
    benefits: [
      'Projected cost reduction: ≥10%',
      'Decision mapping: 150K+ touchpoints',
      'Implementation timeline: Phased approach',
      'Integration design: API architecture'
    ],
    progress: 85,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    id: 'cdo-platform',
    title: 'CDO Platform',
    shortDescription: 'Decision Ledger Architecture',
    longDescription: 'Context-Decision-Outcome processing engine that transforms raw decision streams into structured industrial intelligence. Governed data architecture enabling cross-factory knowledge synthesis and compliance verification.',
    benefits: [
      'Data structuring: Designed CDO model',
      'Governance framework: Compliance-ready',
      'Knowledge architecture: Scalable design',
      'Analytics capability: AI-powered'
    ],
    progress: 75,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    id: 'industrial-llm',
    title: 'Industrial LLM',
    shortDescription: 'Manufacturing Intelligence OS',
    longDescription: 'Vertical large language model trained exclusively on validated industrial decision data. The cognitive engine that transforms historical context into predictive guidance, scaling human expertise across global operations.',
    benefits: [
      'Predictive system: ML architecture',
      'Knowledge model: Scalable design',
      'Optimization engine: Conceptual framework',
      'Industry 4.0: Strategic vision'
    ],
    progress: 90,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function MethodCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardInteraction = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {methods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
          className="group relative"
        >
          {/* Card Container */}
          <motion.div
            className={`
              relative bg-zinc-900/50 border-2 rounded-xl transition-all duration-300
              ${selectedCard === method.id ? 'border-red-500 bg-zinc-900/70 shadow-lg shadow-red-500/10' : 'border-zinc-800 hover:border-zinc-700'}
            `}
            animate={{
              scale: selectedCard === method.id ? 1.02 : 1,
            }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className={`${selectedCard === method.id ? 'text-red-300' : 'text-red-400'} transition-colors duration-300`}>
                  {method.icon}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-zinc-500 font-medium">Active</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                {method.shortDescription}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span>Capability Design</span>
                  <span className="font-semibold">{method.progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${method.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 + 0.5 }}
                  />
                </div>
              </div>

              {/* View Details Button */}
              <motion.button
                onClick={() => handleCardInteraction(method.id)}
                className={`
                  w-full py-3 px-4 font-semibold text-sm rounded-lg transition-all duration-300
                  ${selectedCard === method.id
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-transparent text-zinc-400 border-2 border-zinc-700 hover:border-zinc-600 hover:text-zinc-300'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCard === method.id ? 'Hide Details' : 'View Details'}
              </motion.button>
            </div>
          </motion.div>

          {/* Expanded Details */}
          <AnimatePresence>
            {selectedCard === method.id && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="mt-4 bg-zinc-900/70 border-2 border-red-500/30 rounded-xl p-6"
              >
                <div className="mb-4">
                  <h4 className="text-red-400 font-semibold text-sm mb-2">
                    Technical Overview
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {method.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-red-400 font-semibold text-sm mb-3">
                    Operational Metrics
                  </h4>
                  <div className="space-y-2">
                    {method.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <span className="text-zinc-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
