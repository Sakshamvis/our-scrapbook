import React from 'react';
import { motion } from 'framer-motion';

export default function LightRayLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Upper-left warm sun glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-radial from-gold/18 via-gold/5 to-transparent blur-3xl pointer-events-none" />

      {/* Sun Ray 1 (Left diagonal) */}
      <motion.div
        className="absolute top-0 left-0 w-[150px] h-[150vh] origin-top-left -rotate-[35deg] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(204,165,45,0.06) 50%, transparent)',
          maskImage: 'linear-gradient(to bottom, white, transparent)'
        }}
        animate={{
          opacity: [0.6, 0.85, 0.6],
          rotate: [-35, -34.5, -35]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Sun Ray 2 (Slightly wider, right diagonal) */}
      <motion.div
        className="absolute top-0 left-10 w-[240px] h-[150vh] origin-top-left -rotate-[45deg] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(204,165,45,0.05) 50%, transparent)',
          maskImage: 'linear-gradient(to bottom, white, transparent)'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          rotate: [-45, -45.5, -45]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      />

      {/* Sun Ray 3 (Central narrow ray) */}
      <motion.div
        className="absolute top-0 left-0 w-[80px] h-[150vh] origin-top-left -rotate-[25deg] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(204,165,45,0.08) 50%, transparent)',
          maskImage: 'linear-gradient(to bottom, white, transparent)'
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          rotate: [-25, -24, -25]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />

    </div>
  );
}
