import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MethodCard {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  icon: React.ReactNode;
  dataFlow: number[];
  systemCode: string;
}

const methods: MethodCard[] = [
  {
    id: 'ai-agents',
    title: 'AI AGENTS',
    shortDescription: 'FACTORY FLOOR INTELLIGENCE CAPTURE',
    longDescription: 'Autonomous agents deployed at critical decision points throughout manufacturing operations. Real-time capture of human choices, process variations, and operational contexts that traditional ERP systems cannot reach.',
    benefits: [
      'PROCUREMENT COST REDUCTION: ≥10%',
      'DECISION COVERAGE: 150K+ POINTS',
      'ROI REALIZATION: DAY-1 IMPACT',
      'ERP INTEGRATION: SEAMLESS API'
    ],
    dataFlow: [23, 67, 89, 45, 78, 34, 90, 56],
    systemCode: 'AG-001',
    icon: (
      <div className="relative">
        <div className="w-8 h-8 border-2 border-current relative">
          <div className="absolute inset-1 border border-current/50" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-current transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    )
  },
  {
    id: 'cdo-platform',
    title: 'CDO PLATFORM',
    shortDescription: 'DECISION LEDGER ARCHITECTURE',
    longDescription: 'Context-Decision-Outcome processing engine that transforms raw decision streams into structured industrial intelligence. Governed data architecture enabling cross-factory knowledge synthesis and compliance verification.',
    benefits: [
      'DECISION STRUCTURING: REAL-TIME',
      'GOVERNANCE LAYER: ISO COMPLIANT',
      'KNOWLEDGE TRANSFER: GLOBAL SCALE',
      'ANALYTICS ENGINE: PREDICTIVE AI'
    ],
    dataFlow: [45, 78, 23, 90, 67, 89, 34, 56],
    systemCode: 'CDO-002',
    icon: (
      <div className="relative">
        <div className="w-8 h-8 border-2 border-current relative">
          <div className="absolute top-1 left-1 right-1 h-2 border border-current" />
          <div className="absolute bottom-1 left-1 right-1 h-2 border border-current" />
          <div className="absolute top-1/2 left-1 right-1 h-px bg-current transform -translate-y-1/2" />
        </div>
      </div>
    )
  },
  {
    id: 'industrial-llm',
    title: 'INDUSTRIAL LLM',
    shortDescription: 'MANUFACTURING INTELLIGENCE OS',
    longDescription: 'Vertical large language model trained exclusively on validated industrial decision data. The cognitive engine that transforms historical context into predictive guidance, scaling human expertise across global operations.',
    benefits: [
      'PREDICTIVE GUIDANCE: ML-POWERED',
      'KNOWLEDGE SCALING: EXPONENTIAL',
      'DECISION OPTIMIZATION: AUTOMATED',
      'INDUSTRY 4.0: FOUNDATION LAYER'
    ],
    dataFlow: [90, 34, 78, 56, 89, 45, 67, 23],
    systemCode: 'LLM-003',
    icon: (
      <div className="relative">
        <div className="w-8 h-8 border-2 border-current relative">
          <div className="absolute inset-2 border border-current" />
          <div className="absolute top-1/2 left-2 right-2 h-px bg-current transform -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 bottom-2 w-px bg-current transform -translate-x-1/2" />
        </div>
      </div>
    )
  }
];

export default function MethodCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [dataFlows, setDataFlows] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      methods.forEach(method => {
        setDataFlows(prev => ({
          ...prev,
          [method.id]: method.dataFlow[Math.floor(Math.random() * method.dataFlow.length)]
        }));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

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
          {/* Industrial Container */}
          <motion.div
            className={`
              relative bg-black border-2 border-zinc-800 transition-all duration-500
              ${selectedCard === method.id ? 'border-red-500 bg-zinc-950' : 'hover:border-zinc-600'}
            `}
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
            animate={{
              scale: selectedCard === method.id ? 1.02 : 1,
            }}
            whileHover={{ scale: 1.01 }}
          >
            {/* System Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className={`text-red-400 ${selectedCard === method.id ? 'text-red-300' : ''}`}>
                  {method.icon}
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  [{method.systemCode}]
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-zinc-500">ONLINE</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-2 tracking-wide">
                {method.title}
              </h3>
              <p className="text-sm text-zinc-400 font-mono mb-4 leading-relaxed">
                {method.shortDescription}
              </p>

              {/* Data Flow Visualization */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span>DATA THROUGHPUT</span>
                  <span className="font-mono">{dataFlows[method.id] || 0}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-red-500"
                    animate={{ width: `${dataFlows[method.id] || 0}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-2 bg-red-300"
                    animate={{
                      x: [`0%`, `${(dataFlows[method.id] || 0) - 2}%`],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Access Interface */}
              <motion.button
                onClick={() => handleCardInteraction(method.id)}
                className={`
                  w-full py-3 px-4 font-bold text-sm tracking-wide uppercase transition-all duration-300
                  ${selectedCard === method.id
                    ? 'bg-red-600 text-white border-2 border-red-500'
                    : 'bg-transparent text-zinc-400 border-2 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'
                  }
                `}
                style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCard === method.id ? 'SYSTEM ACTIVE' : 'ACCESS DETAILS'}
              </motion.button>
            </div>

            {/* Breathing Edge Effect */}
            <motion.div
              className="absolute inset-0 border-2 border-red-500/20 pointer-events-none"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
              animate={{
                opacity: selectedCard === method.id ? [0.2, 0.6, 0.2] : 0,
                scale: selectedCard === method.id ? [1, 1.01, 1] : 1,
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Expanded Technical Specifications */}
          <AnimatePresence>
            {selectedCard === method.id && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="mt-4 bg-zinc-900 border-2 border-red-500/30 p-6"
                style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
              >
                <div className="mb-4">
                  <h4 className="text-red-400 font-bold text-sm mb-2 tracking-wide">
                    TECHNICAL OVERVIEW
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {method.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-red-400 font-bold text-sm mb-3 tracking-wide">
                    OPERATIONAL METRICS
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
                        <div className="w-2 h-2 bg-red-500 rotate-45" />
                        <span className="text-zinc-300 font-mono">{benefit}</span>
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