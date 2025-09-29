import React from 'react';
import WarpBackground from '../ui/WarpBackground';
import { motion } from 'motion/react';

export default function IndustrialWarpBackground() {
  return (
    <>
      {/* Fluid Warp Background with Zero Sharpness - Like Homepage */}
      <div className="fixed inset-0 z-0">
        <WarpBackground
          color1="#000000"    // Deep black base
          color2="#7f1d1d"    // Dark industrial red
          color3="#0a0a0a"    // Near black for depth
          speed={0.15}        // Slow, deliberate movement
          swirl={0.95}        // High swirl for organic flow
          swirlIterations={35} // Complex patterns
          scale={0.8}         // Larger fluid patterns
          distortion={0.08}   // Subtle industrial distortion
        />
      </div>

      {/* Subtle Grid Overlay - Very Faint */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Dynamic Light Streaks - Subtle and Fluid */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/10 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-red-600/10 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
            scaleY: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Subtle Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>
    </>
  );
}