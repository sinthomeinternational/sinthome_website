import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Deploy on factory floor to capture real-time decisions',
    color: 'from-blue-500 to-blue-600',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'cdo-platform',
    title: 'CDO Platform',
    description: 'Process and structure decision data into governed ledger',
    color: 'from-green-500 to-green-600',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    )
  },
  {
    id: 'industrial-llm',
    title: 'Industrial LLM',
    description: 'Train on decision data to become manufacturing intelligence',
    color: 'from-red-500 to-red-600',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
];

export default function DataFlowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Auto-cycle through steps for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Flow Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex-1 min-w-0"
            >
              <motion.div
                className={`
                  relative bg-gradient-to-r ${step.color} p-0.5 rounded-xl cursor-pointer
                  transition-all duration-300 hover:scale-105
                  ${activeStep === step.id ? 'ring-2 ring-white/50 scale-105' : ''}
                `}
                onClick={() => handleStepClick(step.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-zinc-900 rounded-xl p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`
                      p-3 rounded-full bg-gradient-to-r ${step.color} text-white mb-4
                      ${activeStep === step.id ? 'animate-pulse' : ''}
                    `}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </motion.div>

            {/* Arrow */}
            {index < flowSteps.length - 1 && (
              <div className="flex-shrink-0 lg:mx-4">
                <motion.div
                  className="hidden lg:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index + 1) * 0.2 }}
                >
                  <svg className="w-12 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      pathLength={0}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: (index + 1) * 0.2 + animationTrigger * 0.1,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </svg>
                </motion.div>

                {/* Mobile arrow */}
                <div className="lg:hidden flex justify-center my-4">
                  <svg className="w-6 h-8 text-zinc-600 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      pathLength={0}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: (index + 1) * 0.2 + animationTrigger * 0.1,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </svg>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Flow Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-0 w-2 h-2 bg-red-400 rounded-full opacity-70"
          animate={{
            left: ['0%', '100%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Data Flow Indicators */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-zinc-400 text-sm"
        >
          <div className="font-semibold text-blue-400">Raw Decisions</div>
          <div>Real-time capture</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-zinc-400 text-sm"
        >
          <div className="font-semibold text-green-400">Structured Data</div>
          <div>Governed intelligence</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-zinc-400 text-sm"
        >
          <div className="font-semibold text-red-400">Smart Decisions</div>
          <div>Predictive guidance</div>
        </motion.div>
      </div>

      {/* Interactive Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-center text-zinc-500 text-sm"
      >
        Click on any step to explore in detail
      </motion.div>
    </div>
  );
}