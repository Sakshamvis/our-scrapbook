import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

/**
 * Generates a stable, pseudo-random rotation based on the src string
 * to prevent flickering rotation shifts on re-renders.
 */
const getStableRotation = (str, range = 8) => {
  if (!str) return '0deg';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rot = (hash % range); // Output between -range/2 and +range/2
  return `${rot}deg`;
};

export default function SmartPolaroid({
  src,
  caption,
  rotation, // If provided, overrides stable random rotation
  className = '',
  washiColor = 'bg-pink/25',
  placeholderEmoji = '📸',
  placeholderTitle = 'Photo Placeholder',
  doubleClickReveal = false,
  isUnlocked = false,
  onDoubleClick,
  hero = false, // Hero layout (prominent, double tape, bigger borders)
  mini = false, // Mini layout (smaller, overlaps nicely)
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, ratio: 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); // Lightbox zoom state
  const { playSFX } = useAudio();
  const imgRef = useRef(null);

  // Stable rotation based on image source
  const finalRotation = rotation !== undefined ? rotation : getStableRotation(src || caption || '', hero ? 4 : 8);

  const handleOpen = useCallback(() => {
    playSFX('buttonTap');
    setIsOpen(true);
    setIsZoomed(false);
  }, [playSFX]);

  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    playSFX('buttonTap');
    setIsOpen(false);
    setIsZoomed(false);
  }, [playSFX]);

  // Load handler to check image metrics
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setDimensions({
        width: naturalWidth,
        height: naturalHeight,
        ratio: naturalWidth / naturalHeight
      });
      setIsLoaded(true);
    }
  };

  // Run image size check as fallback if onLoad doesn't fire immediately (cached images)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleImageLoad({ target: imgRef.current });
    }
  }, [src]);

  // Esc key listener for lightbox
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
  // Determine classes based on layout detection
  const isLandscape = isLoaded && dimensions.ratio > 1.15;
  const isPortrait = isLoaded && dimensions.ratio < 0.85;

  // Frame dimension classes
  let frameClasses = 'bg-[#fcfbf7] p-3 pb-8 shadow-md border border-black/[0.04] flex flex-col justify-between select-none group';
  if (hero) {
    frameClasses = 'bg-[#fcfbf7] p-4 pb-10 shadow-lg border border-black/[0.05] flex flex-col justify-between select-none group';
  } else if (mini) {
    frameClasses = 'bg-[#fcfbf7] p-2 pb-5 shadow-sm border border-black/[0.03] flex flex-col justify-between select-none group';
  }

  // Washi Tape positions
  let tapeElement = null;
  if (!mini) {
    if (hero) {
      // Double tape on top corners for heroes
      tapeElement = (
        <>
          <motion.div 
            className={`absolute -top-3 -left-3 w-16 h-4.5 washi-tape opacity-80 rotate-[-25deg] ${washiColor}`}
            whileHover={{ rotate: -20, scale: 1.05 }}
          />
          <motion.div 
            className={`absolute -top-3 -right-3 w-16 h-4.5 washi-tape opacity-80 rotate-[25deg] ${washiColor}`}
            whileHover={{ rotate: 20, scale: 1.05 }}
          />
        </>
      );
    } else if (isLandscape) {
      // Angled corner tape for landscape
      tapeElement = (
        <motion.div 
          className={`absolute -top-3 -left-2 w-20 h-4.5 washi-tape opacity-85 rotate-[-15deg] ${washiColor}`}
          whileHover={{ rotate: -10, skewX: -2 }}
        />
      );
    } else {
      // Top center tape for portrait / square
      tapeElement = (
        <motion.div 
          className={`absolute -top-3 left-[28%] w-24 h-4.5 washi-tape opacity-85 rotate-[-2deg] ${washiColor}`}
          whileHover={{ skewX: -4, rotate: -4 }}
        />
      );
    }
  } else {
    // Small tape piece for minis
    tapeElement = (
      <div className={`absolute -top-2 left-[20%] w-12 h-3.5 washi-tape opacity-75 rotate-[5deg] ${washiColor}`} />
    );
  }

  // Inner Image aspect ratio style
  const innerContainerStyle = {};
  if (isLoaded) {
    // Perfect aspect ratio matching original photo
    innerContainerStyle.aspectRatio = `${dimensions.width} / ${dimensions.height}`;
  } else {
    // Default placeholder aspect ratios
    innerContainerStyle.aspectRatio = isLandscape ? '4/3' : isPortrait ? '3/4' : '1/1';
  }

  // Set sizing based on orientation and hero/mini flags
  let sizingClass = 'w-full';
  if (className.includes('w-[')) {
    // Keep custom width if passed in className
    sizingClass = '';
  }

  return (
    <>
      {/* 1. Polaroid Card View */}
      <motion.div
        onDoubleClick={onDoubleClick}
        onClick={handleOpen}
        style={{ rotate: finalRotation, ...style }}
        whileHover={{
          scale: hero ? 1.03 : 1.06,
          y: -8,
          rotate: finalRotation === '0deg' ? '1.5deg' : '0deg',
          boxShadow: hero 
            ? '0 25px 40px rgba(40,25,15,0.18)' 
            : '0 18px 30px rgba(40,25,15,0.14)',
          zIndex: 40
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className={`${className.includes('absolute') ? 'absolute' : 'relative'} ${frameClasses} ${sizingClass} ${className}`}
      >
        {/* Inner photo container - Adaptable aspect ratio */}
        <div 
          style={innerContainerStyle}
          className="w-full overflow-hidden relative flex items-center justify-center border border-black/[0.04] rounded bg-[#f2edd5] shadow-inner"
        >
          {doubleClickReveal && isUnlocked ? (
            <div className="w-full h-full bg-pink/15 flex flex-col items-center justify-center p-2 relative select-none">
              <span className="text-3xl mb-1">🧺</span>
              <span className="font-caveat text-sm text-[#a33835] font-bold text-center tracking-wider leading-tight">
                Secret Picnic Together ❤️
              </span>
            </div>
          ) : src ? (
            <img 
              ref={imgRef}
              src={src} 
              alt={caption || 'Scrapbook Memory'} 
              onLoad={handleImageLoad}
              className="w-full h-full object-cover rounded pointer-events-none" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-80 min-h-[120px]">
              <span className="text-2xl mb-1">{placeholderEmoji}</span>
              <span className="font-caveat text-xs text-textDark/60 font-semibold">{placeholderTitle}</span>
            </div>
          )}
          
          {/* Subtle vignette shade for realistic photographic paper depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        {caption && (
          <span 
            className={`text-center font-caveat text-textDark mt-2.5 font-bold tracking-wide opacity-90 group-hover:opacity-100 transition-opacity duration-300 leading-tight ${
              hero ? 'text-[13px]' : mini ? 'text-[9px]' : 'text-[11px]'
            }`}
          >
            {caption}
          </span>
        )}

        {/* Paper texture overlay */}
        <div className="absolute inset-0 paper-texture-overlay opacity-5 rounded pointer-events-none" />

        {/* Washi Tape */}
        {tapeElement}
      </motion.div>

      {/* 2. Lightbox Modal View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleClose()}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          >
            {/* Polaroid Modal Sheet - Sizes itself based on photo aspect ratio */}
            <motion.div
              initial={{ scale: 0.9, y: 15, rotate: '-1deg' }}
              animate={{ scale: 1, y: 0, rotate: '0deg' }}
              exit={{ scale: 0.9, y: 15, rotate: '1deg' }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                // Scale width to fit layout beautifully
                maxWidth: isLandscape ? '720px' : isPortrait ? '420px' : '520px'
              }}
              className="bg-[#fdfcf9] p-5 pb-9 rounded shadow-2xl border border-white/10 w-full flex flex-col justify-between cursor-default relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button (X) */}
              <button
                onClick={(e) => handleClose(e)}
                className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-textDark/60 hover:text-textDark transition-all duration-200 cursor-pointer z-50 shadow-sm"
                title="Close"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-current fill-none stroke-[2.5]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Photo Zoom toggle in corner */}
              {src && (
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-3.5 left-3.5 px-2.5 py-1 text-[10px] font-sans font-bold uppercase rounded bg-black/5 hover:bg-black/10 text-textDark/60 hover:text-textDark transition-all duration-200 cursor-pointer z-50 flex items-center gap-1 shadow-sm"
                  title="Toggle Zoom"
                >
                  <span>{isZoomed ? '🔍 Zoom Out' : '🔍 Zoom In'}</span>
                </button>
              )}

              {/* Photo Area - Uses aspect ratio mapping */}
              <div 
                style={innerContainerStyle}
                className="w-full bg-[#f2edd5] overflow-hidden border border-black/5 rounded shadow-inner flex items-center justify-center relative select-none"
              >
                {doubleClickReveal && isUnlocked ? (
                  <div className="w-full h-full bg-pink/20 flex flex-col items-center justify-center min-h-[300px]">
                    <span className="text-5xl mb-2">🧺</span>
                    <span className="font-caveat text-2xl text-[#a33835] font-bold">Secret Picnic Together ❤️</span>
                    <span className="text-xs font-sans text-brown/50 mt-1 font-semibold">December 25, 2024</span>
                  </div>
                ) : src ? (
                  <motion.img 
                    src={src} 
                    alt={caption || 'Scrapbook Memory'} 
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    className={`w-full h-full transition-all duration-300 pointer-events-none ${
                      isZoomed ? 'object-contain cursor-grab' : 'object-cover'
                    }`} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-brown/50 min-h-[250px]">
                    <span className="text-5xl mb-2">{placeholderEmoji}</span>
                    <span className="font-caveat text-xl font-bold">{placeholderTitle}</span>
                  </div>
                )}
                
                {/* Subtle photography paper grain */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 paper-texture-overlay opacity-5 pointer-events-none" />
              </div>

              {/* Caption in Lightbox */}
              {caption && (
                <div className="text-center mt-6 select-none">
                  <span className="font-caveat text-3xl text-textDark font-bold tracking-wider">
                    {caption}
                  </span>
                </div>
              )}

              {/* Navigation help label */}
              <span className="absolute bottom-2.5 right-5 text-[8px] font-sans uppercase text-brown/40 tracking-widest font-semibold select-none">
                Press ESC, click outside, or click X to close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
