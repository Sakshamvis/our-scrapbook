import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

/**
 * Stable hash rotation to prevent jitter during page flips.
 */
const getStableRotation = (str, range = 8) => {
  if (!str) return '0deg';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rot = (hash % range);
  return `${rot}deg`;
};

export default function SmartPhoto({
  src,
  caption,
  rotation, // Override stable rotation
  className = '',
  washiColor = 'bg-pink/25',
  placeholderEmoji = '📸',
  placeholderTitle = 'Photo Placeholder',
  doubleClickReveal = false,
  isUnlocked = false,
  onDoubleClick,
  hero = false,
  mini = false,
  style = {},
  fit = 'contain' // Force 'contain' to preserve entire photo composition
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, ratio: 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playSFX } = useAudio();
  const imgRef = useRef(null);

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

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleImageLoad({ target: imgRef.current });
    }
  }, [src]);

  // Esc key closure
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

  // Prevent event bubbling to parent react-pageflip
  const stopBubbling = (e) => {
    e.stopPropagation();
  };

  const handleWrapperClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpen();
  };

  const handleWrapperDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDoubleClick) onDoubleClick(e);
  };

  const isLandscape = isLoaded && dimensions.ratio > 1.15;
  const isPortrait = isLoaded && dimensions.ratio < 0.85;

  // Frame aspect ratio selection based on orientation
  let frameAspectClass = 'aspect-[3/3.8]'; // Portrait polaroid frame
  if (isLandscape) {
    frameAspectClass = 'aspect-[4/3.4]'; // Landscape polaroid frame
  } else if (mini) {
    frameAspectClass = 'aspect-[3/3.6]';
  }

  // Polaroid wrapper padding and layout styles
  let frameClasses = 'bg-[#fdfcf7] p-2.5 pb-6.5 shadow-md border border-black/[0.04] flex flex-col justify-between select-none group';
  if (hero) {
    frameClasses = 'bg-[#fdfcf7] p-3.5 pb-9 shadow-lg border border-black/[0.05] flex flex-col justify-between select-none group';
  } else if (mini) {
    frameClasses = 'bg-[#fdfcf7] p-1.5 pb-4 shadow-sm border border-black/[0.03] flex flex-col justify-between select-none group';
  }

  // Tape styling
  let tapeElement = null;
  if (!mini) {
    if (hero) {
      tapeElement = (
        <>
          <motion.div 
            className={`absolute -top-3 -left-3.5 w-16 h-4.5 washi-tape opacity-80 rotate-[-22deg] ${washiColor}`}
            whileHover={{ rotate: -18, scale: 1.05 }}
          />
          <motion.div 
            className={`absolute -top-3.5 -right-3 w-16 h-4.5 washi-tape opacity-80 rotate-[22deg] ${washiColor}`}
            whileHover={{ rotate: 18, scale: 1.05 }}
          />
        </>
      );
    } else if (isLandscape) {
      tapeElement = (
        <motion.div 
          className={`absolute -top-3 -left-2.5 w-18 h-4.5 washi-tape opacity-85 rotate-[-12deg] ${washiColor}`}
          whileHover={{ rotate: -8, scale: 1.03 }}
        />
      );
    } else {
      tapeElement = (
        <motion.div 
          className={`absolute -top-3.5 left-[28%] w-20 h-4.5 washi-tape opacity-85 rotate-[-3deg] ${washiColor}`}
          whileHover={{ rotate: -1, scale: 1.03 }}
        />
      );
    }
  } else {
    tapeElement = (
      <div className={`absolute -top-2 left-[20%] w-11 h-3.5 washi-tape opacity-75 rotate-[6deg] ${washiColor}`} />
    );
  }

  return (
    <>
      {/* 1. Polaroid Print View */}
      <motion.div
        onDoubleClick={handleWrapperDoubleClick}
        onClick={handleWrapperClick}
        onMouseDown={stopBubbling}
        onMouseUp={stopBubbling}
        onTouchStart={stopBubbling}
        onTouchEnd={stopBubbling}
        style={{ rotate: finalRotation, ...style }}
        whileHover={{
          scale: hero ? 1.02 : 1.05,
          y: -6,
          rotate: finalRotation === '0deg' ? '1deg' : '0deg',
          boxShadow: hero 
            ? '0 22px 35px rgba(45,30,20,0.16)' 
            : '0 15px 25px rgba(45,30,20,0.12)',
          zIndex: 45
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className={`${className.includes('absolute') ? 'absolute' : 'relative'} ${frameClasses} ${frameAspectClass} ${className}`}
      >
        {/* Inner Card Photo Holder with neutral cardboard backing color */}
        <div className="w-full h-[82%] overflow-hidden relative flex items-center justify-center border border-black/[0.04] rounded-sm bg-[#e8e4d3] shadow-inner">
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
              alt={caption || 'Scrapbook Printed Photo'} 
              onLoad={handleImageLoad}
              // fit='contain' preserves the full uncropped picture width and height, centering it in the frame
              className={`w-full h-full pointer-events-none rounded-sm transition-all duration-300 ${
                fit === 'contain' ? 'object-contain p-1 bg-white/70' : 'object-cover object-center'
              }`} 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-70">
              <span className="text-2xl mb-1">{placeholderEmoji}</span>
              <span className="font-caveat text-xs text-textDark/60 font-semibold">{placeholderTitle}</span>
            </div>
          )}
          
          {/* Photorealistic shadow gradient inside photo bounds */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        {caption && (
          <span 
            className={`text-center font-caveat text-textDark mt-1.5 font-bold tracking-wide opacity-85 group-hover:opacity-100 transition-opacity duration-300 leading-tight ${
              hero ? 'text-[12px]' : mini ? 'text-[8.5px]' : 'text-[10px]'
            }`}
          >
            {caption}
          </span>
        )}

        {/* Vintage textured overlay */}
        <div className="absolute inset-0 paper-texture-overlay opacity-5 rounded pointer-events-none" />

        {/* Tape layer */}
        {tapeElement}
      </motion.div>

      {/* 2. Lightbox Zoom Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleClose()}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: isLandscape ? '680px' : isPortrait ? '400px' : '480px'
              }}
              className="bg-[#fdfcf9] p-4 pb-8 rounded shadow-2xl border border-white/5 w-full flex flex-col justify-between cursor-default relative"
            >
              {/* Close (X) Trigger */}
              <button
                onClick={(e) => handleClose(e)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-textDark/60 hover:text-textDark transition-all duration-200 cursor-pointer z-50 shadow-sm"
                title="Close"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Lightbox photo area - Always displays full uncropped image */}
              <div 
                className={`w-full overflow-hidden border border-black/5 rounded-sm bg-[#e8e4d3] shadow-inner flex items-center justify-center relative select-none ${
                  isLandscape ? 'aspect-[4/3]' : isPortrait ? 'aspect-[3/4.2]' : 'aspect-square'
                }`}
              >
                {doubleClickReveal && isUnlocked ? (
                  <div className="w-full h-full bg-pink/20 flex flex-col items-center justify-center min-h-[260px]">
                    <span className="text-4xl mb-2">🧺</span>
                    <span className="font-caveat text-xl text-[#a33835] font-bold">Secret Picnic Together ❤️</span>
                  </div>
                ) : src ? (
                  <motion.img 
                    src={src} 
                    alt={caption || 'Scrapbook Memory'} 
                    animate={{ scale: isZoomed ? 1.6 : 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    // Always show full image in lightbox (contain)
                    className="w-full h-full object-contain p-2 bg-white/40" 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-brown/50 min-h-[220px]">
                    <span className="text-4xl mb-2">{placeholderEmoji}</span>
                    <span className="font-caveat text-lg font-bold">{placeholderTitle}</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
              </div>

              {/* Lightbox Zoom Toggle */}
              {src && (
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-2 left-4 px-2 py-0.5 text-[9px] font-sans font-bold uppercase rounded bg-black/5 hover:bg-black/10 text-textDark/60 hover:text-textDark transition-all duration-200 cursor-pointer z-50"
                >
                  {isZoomed ? '🔍 Zoom Out' : '🔍 Zoom In'}
                </button>
              )}

              {/* Caption */}
              {caption && (
                <div className="text-center mt-4">
                  <span className="font-caveat text-2xl text-textDark font-bold tracking-wide">
                    {caption}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
