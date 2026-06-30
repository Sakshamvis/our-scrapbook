import React from 'react';
import { motion } from 'framer-motion';

// Randomized trajectories for success sparkles
const SPARKLES = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  x: Math.cos((i * 2 * Math.PI) / 6) * 55,
  y: Math.sin((i * 2 * Math.PI) / 6) * 55,
  delay: i * 0.1,
}));

export default function UnlockSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center flex flex-col items-center justify-center my-6 relative w-full"
    >
      {/* Sparkles Container */}
      <div className="absolute w-24 h-24 flex items-center justify-center pointer-events-none select-none">
        {SPARKLES.map((sparkle) => (
          <motion.span
            key={`sparkle-${sparkle.id}`}
            className="absolute text-gold text-lg"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.2, 0.8, 0],
              x: sparkle.x,
              y: sparkle.y,
              rotate: [0, 180, 360],
              opacity: [1, 1, 0.6, 0]
            }}
            transition={{
              duration: 1.6,
              delay: sparkle.delay,
              ease: 'easeOut',
            }}
          >
            ★
          </motion.span>
        ))}
      </div>

      <motion.span
        className="text-4xl mb-3.5 select-none z-10"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        ❤️
      </motion.span>
      
      <h2 className="font-caveat text-4.5xl text-pink font-bold select-none leading-none z-10">
        Welcome back
      </h2>
      
      <p className="font-sans text-[10px] tracking-wider uppercase text-[#a48464]/65 mt-3.5 font-bold select-none z-10">
        Unlocking our memories...
      </p>
    </motion.div>
  );
}
