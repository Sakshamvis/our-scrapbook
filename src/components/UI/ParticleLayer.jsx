import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ParticleLayer({ type = 'both', count = 12 }) {
  const dustCount = type === 'petals' ? 0 : Math.floor(count / 2);
  const petalCount = type === 'dust' ? 0 : Math.ceil(count / 2);

  const dustParticles = useMemo(() => {
    return Array.from({ length: dustCount }).map((_, i) => ({
      id: `dust-${i}`,
      x: [10, 30, 50, 70, 90, 20, 40, 60, 80][i % 9],
      y: [20, 60, 40, 80, 10, 90, 30, 50, 70][i % 9],
      size: (i % 3) + 1.2,
      duration: 12 + ((i * 3.5) % 8),
      delay: i * 0.5,
    }));
  }, [dustCount]);

  const petals = useMemo(() => {
    return Array.from({ length: petalCount }).map((_, i) => ({
      id: `petal-${i}`,
      x: [15, 35, 55, 75, 95, 25, 45, 65, 85][i % 9],
      size: 12 + ((i * 3) % 9),
      duration: 14 + ((i * 4) % 12),
      delay: i * 1.8,
      rotationStart: i * 40,
    }));
  }, [petalCount]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Golden Dust Layer */}
      {dustParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.12,
            filter: 'blur(0.5px)'
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 10, 0],
            opacity: [0.08, 0.28, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 2. Drifting Pink Flower Petals Layer */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-pink/35 pointer-events-none"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.85,
            borderRadius: '60% 12% 60% 50%',
            opacity: 0.45,
            transformOrigin: 'center center'
          }}
          initial={{ y: -50, rotate: p.rotationStart }}
          animate={{
            y: '105vh',
            rotate: [p.rotationStart, p.rotationStart + 180, p.rotationStart + 360],
            x: [0, 20, -12, 8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

    </div>
  );
}
