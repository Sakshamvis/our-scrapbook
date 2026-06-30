import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Typewriter text character animator component
function TypewriterText({ text, delay = 0, onComplete, className }) {
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0);
  const onCompleteRef = React.useRef(onComplete);

  // Keep ref updated with latest callback
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Phase 1: "Some stories... are written in books."
    // Phase 2: "Our story... was written in moments."
    // Phase 3: "Made with ❤️ for Shreya"
    // Phase 4: Complete and unmount

    let t1, t2, t3;

    if (step === 0) {
      t1 = setTimeout(() => {
        setStep(1); // Transition to Phase 2
      }, 4500);
    } else if (step === 1) {
      t2 = setTimeout(() => {
        setStep(2); // Transition to Phase 3 (Made for Shreya)
      }, 4500);
    } else if (step === 2) {
      t3 = setTimeout(() => {
        setStep(3); // Fade out complete intro
      }, 4500);
    } else if (step === 3) {
      const t4 = setTimeout(() => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 1200);
      return () => clearTimeout(t4);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          id="component-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#160f0a] flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none"
        >
          {/* Subtle vignette and particles background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 pointer-events-none" />
          <div className="paper-texture-overlay opacity-3 pointer-events-none" />

          {/* Render Step-by-Step Cinematic Texts */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[120px]">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4 text-paperLight/90"
              >
                <TypewriterText 
                  text="Some stories..." 
                  className="font-poppins text-lg sm:text-xl tracking-widest font-light" 
                />
                <TypewriterText 
                  text="...are written in books." 
                  delay={1.5}
                  className="font-caveat text-3xl sm:text-4xl text-gold" 
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4 text-paperLight/90"
              >
                <TypewriterText 
                  text="Our story" 
                  className="font-poppins text-lg sm:text-xl tracking-widest font-light" 
                />
                <TypewriterText 
                  text="...was written in moments." 
                  delay={1.5}
                  className="font-caveat text-3xl sm:text-4xl text-pink" 
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-3 text-paperLight/90"
              >
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.7 }} 
                  transition={{ delay: 0.5, duration: 1 }} 
                  className="font-sans text-xs tracking-widest uppercase font-semibold text-paperLight/50"
                >
                  Made with ❤️
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.4 }} 
                  transition={{ delay: 1.2, duration: 1 }} 
                  className="font-sans text-[11px] tracking-widest uppercase italic"
                >
                  for
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 1.8, duration: 1.2, type: 'spring' }} 
                  className="font-caveat text-4xl sm:text-5xl text-gold drop-shadow-md font-bold tracking-wide mt-2"
                >
                  Shreya
                </motion.h1>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
