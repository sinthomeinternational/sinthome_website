import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface ProcessingNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  systemCode: string;
  throughput: number;
  dataType: string;
}

const processingNodes: ProcessingNode[] = [
  {
    id: 'capture-layer',
    title: 'CAPTURE LAYER',
    description: 'REAL-TIME DECISION EXTRACTION',
    systemCode: 'CAP-001',
    throughput: 95,
    dataType: 'RAW_DECISIONS',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <div className="absolute inset-2 border border-current/60" />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-current transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    )
  },
  {
    id: 'processing-layer',
    title: 'PROCESSING LAYER',
    description: 'CONTEXT-DECISION-OUTCOME STRUCTURING',
    systemCode: 'CDO-002',
    throughput: 87,
    dataType: 'STRUCTURED_DATA',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <div className="absolute top-1 left-1 right-1 h-2 bg-current/30" />
        <div className="absolute bottom-1 left-1 right-1 h-2 bg-current/30" />
        <motion.div
          className="absolute top-1/2 left-1 right-1 h-px bg-current transform -translate-y-1/2"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    )
  },
  {
    id: 'intelligence-layer',
    title: 'INTELLIGENCE LAYER',
    description: 'PREDICTIVE MANUFACTURING OS',
    systemCode: 'LLM-003',
    throughput: 78,
    dataType: 'AI_DECISIONS',
    icon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-current" />
        <div className="absolute inset-2 border border-current/60" />
        <motion.div
          className="absolute top-1/2 left-2 right-2 h-px bg-current transform -translate-y-1/2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 bottom-2 w-px bg-current transform -translate-x-1/2"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    )
  }
];

export default function DataFlowDiagram() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dataStreams, setDataStreams] = useState<{ [key: string]: number }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Initialize data streams and canvas animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataStreams(prev => {
        const newStreams: { [key: string]: number } = {};
        processingNodes.forEach(node => {
          newStreams[node.id] = Math.max(
            20,
            node.throughput + (Math.random() - 0.5) * 20
          );
        });
        return newStreams;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Canvas-based fluid pipeline visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      size: number;
      color: string;
    }> = [];

    const createParticle = (stage: number) => {
      const colors = ['#dc2626', '#f59e0b', '#10b981'];
      const stageX = (stage / 2) * canvas.offsetWidth;

      return {
        x: stageX + (Math.random() - 0.5) * 40,
        y: canvas.offsetHeight / 2 + (Math.random() - 0.5) * 60,
        vx: 0.5 + Math.random() * 1,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: 0.8,
        size: 1 + Math.random() * 2,
        color: colors[stage] || '#dc2626'
      };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Add new particles
      if (Math.random() < 0.1) {
        particles.push(createParticle(Math.floor(Math.random() * 3)));
      }

      // Update and draw particles
      particles = particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity *= 0.995;

        if (particle.opacity > 0.01 && particle.x < canvas.offsetWidth + 50) {
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleNodeInteraction = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Industrial Pipeline Canvas Background */}
      <div className="relative h-64 mb-8 bg-black border-2 border-zinc-800 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
        />

        {/* Pipeline Structure Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          {processingNodes.map((node, index) => (
            <div key={node.id} className="flex flex-col items-center">
              <motion.div
                className="w-4 h-4 bg-red-500 rounded-full mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              />
              <div className="w-px h-16 bg-zinc-600" />
            </div>
          ))}
        </div>

        {/* Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 50 50% Q 50% 40% 50% 50% T 95% 50%"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
      </div>

      {/* Processing Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {processingNodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
            className="group relative"
          >
            {/* Industrial Node Container */}
            <motion.div
              className={`
                relative bg-black border-2 transition-all duration-500 cursor-pointer
                ${selectedNode === node.id
                  ? 'border-red-500 shadow-lg shadow-red-500/20'
                  : 'border-zinc-700 hover:border-zinc-500'
                }
              `}
              style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
              onClick={() => handleNodeInteraction(node.id)}
              whileHover={{ scale: 1.02 }}
            >
              {/* System Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="text-red-400">
                    {node.icon}
                  </div>
                  <div className="text-xs font-mono text-zinc-500">
                    [{node.systemCode}]
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {node.dataType}
                </div>
              </div>

              {/* Node Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-red-400 mb-2 tracking-wide">
                  {node.title}
                </h3>
                <p className="text-sm text-zinc-400 font-mono mb-4">
                  {node.description}
                </p>

                {/* Throughput Meter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span>THROUGHPUT</span>
                    <span className="font-mono">{Math.round(dataStreams[node.id] || node.throughput)}%</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400"
                      animate={{ width: `${dataStreams[node.id] || node.throughput}%` }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-1 h-full bg-white"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        x: [0, 4, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-zinc-500 font-mono">OPERATIONAL</span>
                  </div>
                  <div className="text-zinc-600 font-mono">
                    NODE-{String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Selection Glow */}
              {selectedNode === node.id && (
                <motion.div
                  className="absolute inset-0 border-2 border-red-400/40 pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.005, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Connection Lines to Next Node */}
            {index < processingNodes.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-zinc-600">
                <motion.div
                  className="w-full h-full bg-red-500"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 bg-zinc-900/50 border border-zinc-800 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-red-400 font-mono mb-1">150K+</div>
            <div className="text-sm text-zinc-400">DECISION POINTS</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400 font-mono mb-1">100M+</div>
            <div className="text-sm text-zinc-400">DATA SAMPLES</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 font-mono mb-1">24/7</div>
            <div className="text-sm text-zinc-400">CONTINUOUS OPS</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}