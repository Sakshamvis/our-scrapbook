import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const [particles, setParticles] = useState({ bg: [], mid: [], fg: [] });

  useEffect(() => {
    // 1. Background Layer: Warm golden dust, tiny glowing particles
    const bg = Array.from({ length: 20 }).map((_, i) => ({
      id: `bg-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.35 + 0.1,
      duration: Math.random() * 18 + 16,
      delay: Math.random() * -20, // Negative delay to start immediately
      xRange: Math.random() * 40 - 20,
      yRange: Math.random() * -50 - 50,
    }));

    // 2. Middle Layer: Flower petals, small dried leaves, tiny paper fragments
    const types = ['petal', 'leaf', 'paper'];
    const mid = Array.from({ length: 14 }).map((_, i) => {
      const type = types[i % 3];
      return {
        id: `mid-${i}`,
        type,
        left: Math.random() * 100,
        size: Math.random() * 8 + 8,
        opacity: Math.random() * 0.45 + 0.3,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * -12,
        xRange: Math.random() * 60 - 30,
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 360 * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    // 3. Foreground Layer: Two butterflies, drifting blurred petals
    const fg = [
      {
        id: 'butterfly-1',
        type: 'butterfly',
        left: 15 + Math.random() * 20,
        size: 24,
        opacity: 0.75,
        duration: 16,
        delay: -4,
        xRange: [0, 80, -30, 20],
        yRange: ['105vh', '50vh', '15vh', '-10vh'],
        blur: 'blur(0.5px)',
      },
      {
        id: 'butterfly-2',
        type: 'butterfly',
        left: 65 + Math.random() * 20,
        size: 22,
        opacity: 0.7,
        duration: 18,
        delay: -8,
        xRange: [0, -60, 40, -10],
        yRange: ['105vh', '60vh', '20vh', '-10vh'],
        blur: 'blur(0.8px)',
      },
      // Drifting foreground blurred petals
      {
        id: 'fg-petal-1',
        type: 'petal',
        left: Math.random() * 90,
        size: 18,
        opacity: 0.55,
        duration: 8,
        delay: -2,
        xRange: [0, 40, -10],
        yRange: ['-10vh', '50vh', '105vh'],
        blur: 'blur(1.5px)',
      },
      {
        id: 'fg-petal-2',
        type: 'petal',
        left: Math.random() * 90,
        size: 20,
        opacity: 0.5,
        duration: 9,
        delay: -5,
        xRange: [0, -50, 15],
        yRange: ['-10vh', '40vh', '105vh'],
        blur: 'blur(2px)',
      }
    ];

    setParticles({ bg, mid, fg });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      
      {/* Dynamic Lighting God Rays Overlay */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_65%)] pointer-events-none z-0" />
      <motion.div
        animate={{ rotate: [0, 3, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-[repeating-linear-gradient(45deg,rgba(212,175,55,0.02)_0px,rgba(212,175,55,0.02)_40px,transparent_80px,transparent_120px)] pointer-events-none z-0 mix-blend-screen"
        style={{ transformOrigin: 'top left' }}
      />

      {/* Layer 1: Background Warm Gold Dust */}
      {particles.bg.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.xRange, 0],
            y: [0, p.yRange, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Layer 2: Middle Layer (Petals, Leaves, Paper Crumbs) */}
      {particles.mid.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: '105vh', rotate: p.rotationStart }}
          animate={{
            y: '-10vh',
            x: [0, p.xRange, -p.xRange / 2, 0],
            rotate: p.rotationEnd,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.type === 'petal' && (
            <div 
              className="w-full h-full bg-[#f8c8dc]/60" 
              style={{ borderRadius: '60% 10% 60% 50%' }}
            />
          )}
          {p.type === 'leaf' && (
            <div 
              className="w-full h-full bg-[#a3b899]/40 border border-[#8da280]/20" 
              style={{ borderRadius: '10% 90% 10% 90%' }}
            />
          )}
          {p.type === 'paper' && (
            <div className="w-full h-full bg-[#fffefe]/50 rotate-[12deg] shadow-sm" />
          )}
        </motion.div>
      ))}

      {/* Layer 3: Foreground (Fluttering Butterflies & blurred close-up items) */}
      {particles.fg.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur,
          }}
          initial={{ y: p.yRange[0] }}
          animate={{
            x: p.xRange,
            y: p.yRange,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'butterfly' ? (
            <motion.div
              className="w-full h-full relative"
              animate={{ rotateY: [0, 75, 0] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
            >
              {/* Custom SVG Butterfly */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-gold/60 stroke-gold/80 stroke-[2.5]">
                <path d="M50,50 Q30,25 25,35 Q20,45 50,50 M50,50 Q35,65 30,60 Q25,55 50,50" />
                <path d="M50,50 Q70,25 75,35 Q80,45 50,50 M50,50 Q65,65 70,60 Q75,55 50,50" />
                <line x1="50" y1="30" x2="50" y2="70" className="stroke-gold stroke-[4.5]" />
              </svg>
            </motion.div>
          ) : (
            // Foreground blurred petal
            <div 
              className="w-full h-full bg-[#f8c8dc]/40" 
              style={{ borderRadius: '60% 10% 60% 50%' }}
            />
          )}
        </motion.div>
      ))}

    </div>
  );
}
