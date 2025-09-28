import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MethodCard {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  icon: React.ReactNode;
}

const methods: MethodCard[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortDescription: 'Generate direct value and cover decision points where ERP cannot reach.',
    longDescription: 'Our AI Agents are deployed directly on the factory floor to capture real-time decision-making data. They monitor and learn from the countless micro-decisions made by workers and managers throughout the production process.',
    benefits: [
      '≥10% procurement cost savings',
      'Real-time decision tracking',
      'Immediate ROI generation',
      'Seamless ERP integration'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'cdo-platform',
    title: 'CDO Data Platform',
    shortDescription: 'Standardizes and systematizes decisions into a governed "decision ledger."',
    longDescription: 'The Context-Decision-Outcome (CDO) Platform transforms raw decision data into structured, analyzable formats. It creates a comprehensive ledger of industrial intelligence that grows more valuable over time.',
    benefits: [
      'Structured decision analytics',
      'Governance and compliance',
      'Historical decision tracking',
      'Cross-factory knowledge transfer'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    )
  },
  {
    id: 'industrial-llm',
    title: 'Industrial Vertical LLM',
    shortDescription: 'Trains on authentic decision data to become the decision operating system for manufacturing.',
    longDescription: 'Built on millions of real industrial decisions, our LLM becomes the intelligence engine that guides future production choices, amplifies collective knowledge, and reshapes human-machine collaboration.',
    benefits: [
      'Predictive decision guidance',
      'Collective intelligence scaling',
      'Automated optimization',
      'Industry 4.0 foundation'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
];

export default function MethodCards() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {methods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-red-400 flex-shrink-0 mt-1">
                {method.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  {method.title}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {method.shortDescription}
                </p>
              </div>
            </div>

            {/* Expand Button */}
            <button
              onClick={() => toggleCard(method.id)}
              className="w-full mt-4 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-red-600 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              aria-expanded={expandedCard === method.id}
              aria-controls={`method-details-${method.id}`}
            >
              {expandedCard === method.id ? 'Show Less' : 'Learn More'}
              <motion.svg
                className="w-4 h-4"
                animate={{ rotate: expandedCard === method.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {expandedCard === method.id && (
              <motion.div
                id={`method-details-${method.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="border-t border-zinc-800"
              >
                <div className="p-6">
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    {method.longDescription}
                  </p>

                  <div>
                    <h4 className="text-white font-medium mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {method.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                          <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
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