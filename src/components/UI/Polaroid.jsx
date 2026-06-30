import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

export default function Polaroid({ 
  src, 
  caption, 
  rotation = '0deg', 
  className = '', 
  doubleClickReveal = false,
  isUnlocked = false,
  onDoubleClick,
  washiColor = 'bg-pink/25',
  placeholderEmoji = '📷',
  placeholderTitle = 'Photo Placeholder',
  aspectRatio = 'aspect-[4/3.2]',
  lightboxAspectRatio = 'aspect-[4/3]',
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { playSFX } = useAudio();

  const handleOpen = useCallback(() => {
    playSFX('buttonTap');
    setIsOpen(true);
  }, [playSFX]);

  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    playSFX('buttonTap');
    setIsOpen(false);
  }, [playSFX]);

  // Listen for Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  return (
    <>
      {/* 1. Interactive Polaroid on Page */}
      <motion.div
        onDoubleClick={onDoubleClick}
        onClick={handleOpen}
        style={{ rotate: rotation, ...style }}
        whileHover={{
          scale: 1.05,
          y: -10,
          rotate: rotation === '0deg' ? '2deg' : '0deg',
          boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
          zIndex: 35
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className={`bg-white p-3 shadow-md border border-black/5 flex flex-col justify-between cursor-pointer select-none group ${className.includes('absolute') ? 'absolute' : 'relative'} ${className}`}
      >
        {/* Inner photo container */}
        <div className={`w-full ${aspectRatio} overflow-hidden relative flex items-center justify-center border border-black/[0.03] rounded bg-[#eae5da]`}>
          {doubleClickReveal && isUnlocked ? (
            <div className="w-full h-full bg-pink/15 flex flex-col items-center justify-center relative">
              <span className="text-3xl mb-1">🧺</span>
              <span className="font-caveat text-base text-[#a33835] font-bold text-center tracking-wider px-2">
                Secret Picnic Together ❤️
              </span>
              <span className="text-[8px] font-sans text-brown/45 absolute bottom-1 font-semibold">12-25-2024</span>
            </div>
          ) : src ? (
            <img src={src} alt={caption} className="w-full h-full object-cover rounded" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-85">
              <span className="text-2xl mb-1">{placeholderEmoji}</span>
              <span className="font-caveat text-xs text-textDark/60 font-semibold">{placeholderTitle}</span>
            </div>
          )}
          
          {/* Subtle vignette on photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Caption with hover fade-in effect */}
        <motion.span 
          className="text-[11px] text-center font-caveat text-textDark mt-2 font-bold tracking-wider opacity-85 group-hover:opacity-100 transition-opacity duration-300"
        >
          {caption}
        </motion.span>

        {/* Washi Tape that bends/skews on hover */}
        <motion.div 
          className={`absolute -top-3.5 left-[25%] w-24 h-4.5 washi-tape opacity-85 ${washiColor}`}
          whileHover={{ skewX: -4, rotate: -2 }}
        />
      </motion.div>

      {/* 2. Lightbox Portal/Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleClose()}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md cursor-zoom-out p-4"
          >
            {/* Polaroid Modal Sheet */}
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: '-2deg' }}
              animate={{ scale: 1, y: 0, rotate: '0deg' }}
              exit={{ scale: 0.9, y: 20, rotate: '2deg' }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-[#fcfbf9] p-5 pb-8 rounded shadow-2xl border border-white/10 w-full flex flex-col justify-between cursor-default relative ${lightboxAspectRatio.includes('3/4') ? 'max-w-xs' : 'max-w-lg'}`}
            >
              {/* Close Button (X) */}
              <button
                onClick={(e) => handleClose(e)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-textDark/60 hover:text-textDark transition-colors cursor-pointer z-50"
                title="Close"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Photo Area */}
              <div className={`w-full ${lightboxAspectRatio} bg-[#eae5da] overflow-hidden border border-black/5 rounded shadow-inner flex items-center justify-center relative`}>
                {doubleClickReveal && isUnlocked ? (
                  <div className="w-full h-full bg-pink/20 flex flex-col items-center justify-center">
                    <span className="text-5xl mb-2">🧺</span>
                    <span className="font-caveat text-2xl text-[#a33835] font-bold">Secret Picnic Together ❤️</span>
                    <span className="text-xs font-sans text-brown/50 mt-1 font-semibold">December 25, 2024</span>
                  </div>
                ) : src ? (
                  <img src={src} alt={caption} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-brown/50">
                    <span className="text-5xl mb-2">{placeholderEmoji}</span>
                    <span className="font-caveat text-xl font-bold">{placeholderTitle}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption in lightbox */}
              <div className="text-center mt-6">
                <span className="font-caveat text-3xl text-textDark font-bold tracking-widest">
                  {caption}
                </span>
              </div>

              {/* Close helper label */}
              <span className="absolute bottom-2 right-4 text-[9px] font-sans uppercase text-brown/40 tracking-widest font-semibold select-none">
                Press ESC, click outside, or click the X to close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
