import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import SmartPhoto from '../UI/SmartPhoto';

const DUST_PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  x: [10, 25, 45, 60, 80, 15, 35, 55, 75, 90, 5, 50, 70, 85, 95][i % 15],
  y: [15, 30, 60, 40, 75, 85, 20, 50, 10, 95, 65, 80, 45, 35, 70][i % 15],
  size: (i % 3) + 1.5,
  delay: (i * 0.4) % 4,
  duration: 10 + ((i * 3) % 8),
}));

const FLOWER_PETALS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  x: [15, 35, 50, 65, 85, 25, 45, 60, 75, 95][i % 10],
  size: 14 + ((i * 4) % 10),
  delay: i * 1.5,
  duration: 12 + ((i * 5) % 12),
  rotationStart: i * 35,
}));

export default function Cover({ onOpen }) {
  const { playBackground, playSFX } = useAudio();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1. Mouse coordinates tracking for 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map coordinate offset to 3D rotation angles (Max ±5 deg)
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-250, 250], [-5, 5]);

  const handleMouseMove = (event) => {
    if (isTransitioning) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Get mouse offsets relative to the center of the card
    const offsetX = event.clientX - rect.left - width / 2;
    const offsetY = event.clientY - rect.top - height / 2;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    // Gently spring back to center when mouse leaves
    animate(mouseX, 0, { type: 'spring', stiffness: 120, damping: 15 });
    animate(mouseY, 0, { type: 'spring', stiffness: 120, damping: 15 });
  };

  // Cinematic page open trigger
  const handleOpenClick = () => {
    setIsTransitioning(true);
    // Play creak sound
    playSFX('bookOpen');
    // Smoothly fade-in background music over 2 seconds
    playBackground();
    // Smooth cinematic morph scale delay before mounting the open book
    setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <div 
      id="scrapbook-cover-container" 
      className="relative w-full h-screen bg-paper overflow-hidden flex flex-col items-center justify-center px-4 select-none"
    >
      {/* Background Texture & Vignette - Fades slightly on transition */}
      <motion.div 
        className="absolute inset-0 paper-texture-overlay z-0" 
        animate={{ opacity: isTransitioning ? 0.01 : 0.04 }}
        transition={{ duration: 0.7 }}
      />
      <motion.div 
        className="absolute inset-0 vignette-overlay z-0" 
        animate={{ opacity: isTransitioning ? 0.4 : 1 }}
        transition={{ duration: 0.7 }}
      />

      {/* Floating Dust Particles */}
      {!isTransitioning && DUST_PARTICLES.map((particle) => (
        <motion.div
          key={`dust-${particle.id}`}
          className="absolute rounded-full bg-gold pointer-events-none z-0"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Falling Flower Petals */}
      {!isTransitioning && FLOWER_PETALS.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          className="absolute bg-pink/45 pointer-events-none z-0"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 0.85,
            borderRadius: '60% 10% 60% 50%',
            opacity: 0.5,
          }}
          initial={{ y: -50, rotate: petal.rotationStart }}
          animate={{
            y: '105vh',
            rotate: [petal.rotationStart, petal.rotationStart + 180, petal.rotationStart + 360],
            x: [0, 25, -15, 10],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Outer Floating Animation Wrapper (Idle Floating) */}
      <motion.div
        animate={isTransitioning ? {} : { y: [-6, 6] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        className="w-full flex justify-center items-center z-10"
      >
        {/* Inner 3D Tilt Wrapper */}
        <motion.div
          id="leather-journal"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isTransitioning ? 0 : rotateX,
            rotateY: isTransitioning ? 0 : rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
          // Transition scaling: scales up and fades out during transition
          animate={{
            scale: isTransitioning ? 1.08 : 1,
            opacity: isTransitioning ? 0 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[450px] aspect-[3/4.0] rounded-3xl bg-gradient-to-br from-[#4b3323] via-[#352115] to-[#1c0f09] leather-journal-shadow p-6 flex flex-col justify-between items-center overflow-hidden border-l-[3.5px] border-[#29170e] cursor-pointer"
        >
          {/* Leather grain background texture overlay */}
          <div className="leather-texture-overlay rounded-3xl" />

          {/* Double Gold Foil Border */}
          <div className="gold-foil-tooling" />

          {/* Book Spine ribs & indentation */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/45 via-black/15 to-transparent border-r border-black/35 rounded-l-3xl z-10" />
          <div className="absolute left-0 top-[20%] w-8 h-1 bg-black/45 border-y border-white/5 z-20" />
          <div className="absolute left-0 top-[40%] w-8 h-1 bg-black/45 border-y border-white/5 z-20" />
          <div className="absolute left-0 top-[60%] w-8 h-1 bg-black/45 border-y border-white/5 z-20" />
          <div className="absolute left-0 top-[80%] w-8 h-1 bg-black/45 border-y border-white/5 z-20" />

          {/* Brass corner protectors with screw details */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-gold via-[#bda142] to-[#8c7126] rounded-tl-3xl shadow-sm z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-gold via-[#bda142] to-[#8c7126] rounded-tr-3xl shadow-sm z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-gold via-[#bda142] to-[#8c7126] rounded-bl-3xl shadow-sm z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gold via-[#bda142] to-[#8c7126] rounded-br-3xl shadow-sm z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
          </div>
          {/* Polaroid Decoration (Right) */}
          <SmartPhoto 
            src="/photos/cover_pic.jpg"
            caption="Our Memories"
            rotation="10deg"
            className="absolute top-8 right-8 w-24 z-20"
            washiColor="bg-pink/25"
          />

          {/* Polaroid Decoration (Top Left) */}
          <SmartPhoto 
            src="/photos/cover_left_pic.jpg"
            caption="Moments"
            rotation="-8deg"
            className="absolute top-8 left-8 w-24 z-20"
            washiColor="bg-pink/25"
          />

          {/* Vintage Botanical Doodle (Bottom Left) */}
          <div className="absolute bottom-6 left-8 z-20 pointer-events-none opacity-45">
            <svg viewBox="0 0 100 150" className="w-16 h-24 stroke-gold/60 fill-none stroke-[1.5]">
              <path d="M20,130 Q45,100 50,20" />
              <path d="M50,20 Q65,15 75,5 Q60,30 50,50" />
              <path d="M50,50 Q25,55 15,65 Q35,65 50,80" />
              <path d="M50,80 Q70,95 80,110 Q60,110 50,130" />
            </svg>
          </div>

          {/* Vintage Butterfly Outline Doodle (Middle Right) */}
          <div className="absolute top-[48%] right-6 z-20 pointer-events-none opacity-40">
            <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-gold/50 fill-none stroke-[2]">
              <path d="M50,50 C60,30 85,25 80,45 C75,60 55,55 50,55 C45,55 25,60 20,45 C15,25 40,30 50,50 Z" />
              <path d="M50,55 C55,70 75,80 70,85 C65,90 55,80 50,75 C45,75 35,90 30,85 C25,80 45,70 50,55 Z" />
              <path d="M50,50 C50,40 52,30 55,25 M50,50 C50,40 48,30 45,25" />
            </svg>
          </div>

          {/* Center Text Layout */}
          <div className="w-full flex-1 flex flex-col justify-center items-center mt-12 px-6">
            <motion.h1 
              className="text-4xl sm:text-5xl font-caveat text-paperLight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Our Little Scrapbook
            </motion.h1>
            
            <motion.div 
              className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold/60 to-transparent my-4 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />

            <motion.p 
              className="text-base sm:text-lg font-poppins text-pink tracking-wider drop-shadow-sm font-light"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Saksham and Shreya Little Digi Scrapbook
            </motion.p>

            {/* Moved Quote inside cover */}
            <motion.p 
              className="text-xs sm:text-sm font-sans italic text-paperLight/60 tracking-wider text-center mt-2.5 max-w-[220px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              "Every page holds a memory."
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* 6. Premium Button */}
      <motion.div
        className="mt-6 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          y: isTransitioning ? 15 : 0 
        }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.button
          onClick={handleOpenClick}
          className="relative px-10 py-3.5 bg-gradient-to-r from-gold via-[#cca52d] to-gold text-[#301f14] font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_6px_20px_rgba(139,94,60,0.2)] gold-latch-glow flex items-center gap-3 cursor-pointer border border-[#cca52d]/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <span>Open Our Story</span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            className="w-4 h-4"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
