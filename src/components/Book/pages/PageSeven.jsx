import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';
import { useAudio } from '../../../context/AudioContext';

const LOVE_LETTER = {
  greeting: 'Dearest Shreya,',
  preview: 'Happy six months to us, my love. I love you, Shreya, most deeply...',
  paragraphs: [
    'Happy six months to us, my love. I know these months are only numbers on a calendar — yet every one with you has felt like a gentle eternity of warmth, laughter, and peace.',
    'I love you, Shreya, most deeply and most truly, more than any words on this page could ever say. You are my comfort, my joy, and the blessing I whisper thanks for every Tuesday at the temple.',
    'However far apart we may sometimes be, my heart has already chosen its forever home in you. One day you will be my future wife, and I will spend a lifetime proving you are the greatest gift life ever gave me.',
  ],
  signOff: 'Yours always, Saksham ❤️',
};

export const PageSeven = React.forwardRef((props, ref) => {
  const { triggerWaxMessage } = useEasterEggs();
  const { playSFX } = useAudio();

  // Envelope interaction states
  const [isCracked, setIsCracked] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isLetterSlidUp, setIsLetterSlidUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent clicks from bubbling to react-pageflip (which turns the page)
  const stopFlip = (e) => {
    e.stopPropagation();
  };

  // Crack the seal, flip the flap, slide the letter
  const handleSealClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCracked) return;
    
    // 1. Crack seal & play crack sound
    playSFX('waxSealCrack');
    setIsCracked(true);

    // 2. Open top flap after 600ms
    setTimeout(() => {
      setIsFlapOpen(true);
      playSFX('envelope');
    }, 600);

    // 3. Slide letter card up after 1200ms
    setTimeout(() => {
      setIsLetterSlidUp(true);
    }, 1300);
  };

  // Double click wax seal Easter Egg
  const handleSealDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    triggerWaxMessage();
  };

  const handleLetterClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLetterSlidUp) {
      playSFX('envelope');
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(false);
  };

  return (
    <BookPage ref={ref} {...props} isLeft={true} className="relative bg-[#fffef9] overflow-hidden">
      {/* Decorative vertical divider line */}
      <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-dashed border-l border-dashed border-brown/20 pointer-events-none" />

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-between p-4 pl-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-left select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold font-sans">Love Letter</span>
        </div>

        {/* Envelope layout */}
        <div className="flex-1 flex flex-col items-center justify-center my-6 relative select-none">
          
          {/* Main Envelope Body container */}
          <div
            className="relative w-full max-w-[270px] h-[180px] bg-[#dfd6c3] rounded-xl shadow-lg border border-[#ccbeab] flex items-end justify-center"
            onMouseDown={stopFlip}
            onMouseUp={stopFlip}
            onTouchStart={stopFlip}
            onTouchEnd={stopFlip}
            onClick={stopFlip}
          >
            
            {/* The Letter Card inside the Envelope */}
            <motion.div 
              onClick={handleLetterClick}
              onMouseDown={stopFlip}
              onMouseUp={stopFlip}
              onTouchStart={stopFlip}
              onTouchEnd={stopFlip}
              className="absolute w-[240px] bg-[#fdfaf2] p-4 pb-6 rounded border border-[#ebe5d6] shadow-sm select-none cursor-pointer"
              style={{ 
                backgroundImage: 'repeating-linear-gradient(#fdfaf2, #fdfaf2 20px, #ebe5d6 20px, #ebe5d6 21px)',
                lineHeight: '21px',
                transformOrigin: 'bottom center',
              }}
              initial={{ y: 15, zIndex: 5, scale: 0.95, opacity: 0.9 }}
              animate={isLetterSlidUp ? {
                y: -100,
                zIndex: 25,
                scale: 1.02,
                opacity: 1,
                rotate: '-1deg'
              } : {
                y: 15,
                zIndex: 5,
                scale: 0.95,
                opacity: 0.9
              }}
              whileHover={isLetterSlidUp ? {
                scale: 1.05,
                rotate: '0deg',
                y: -108,
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
              } : {}}
              transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            >
              <div className="font-caveat text-sm text-textDark/90 pt-1 leading-[21px]">
                <p className="font-bold">{LOVE_LETTER.greeting}</p>
                <p className="indent-3 truncate">
                  {LOVE_LETTER.preview}
                </p>
                <p className="text-right text-[10px] mt-2 text-pink font-bold">Saksham ❤️</p>
              </div>
            </motion.div>

            {/* Left and Right inner folded flaps (visual front layer) */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-[#d3c9b4]/20 pointer-events-none z-10" />
            
            {/* Envelope Pocket Front Face (visual layer sandwiching letter) */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[110px] bg-[#e6ddca] rounded-b-xl border-t border-[#dccfaf] z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]"
              style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 50% 50%, 0% 0%)'
              }}
            />

            {/* Top Envelope Flap */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[90px] bg-[#dcd2ba] border-b border-[#cca32d]/10 z-15 origin-top"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                transformStyle: 'preserve-3d',
              }}
              initial={{ rotateX: 0 }}
              animate={isFlapOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Wax Seal / Interactive Button */}
            {!isCracked ? (
              // Closed Solid Wax Seal
              <motion.div 
                onClick={handleSealClick}
                onDoubleClick={handleSealDoubleClick}
                onMouseDown={stopFlip}
                onMouseUp={stopFlip}
                onTouchStart={stopFlip}
                onTouchEnd={stopFlip}
                className="absolute bottom-[35%] left-[42%] w-11 h-11 rounded-full bg-[#a33243] flex items-center justify-center shadow-lg rotate-[-5deg] cursor-pointer z-40"
                whileHover={{ scale: 1.12, rotate: '0deg' }}
                whileTap={{ scale: 0.95 }}
                title="Click to break open seal. Double-click for note."
              >
                <div className="w-8 h-8 rounded-full border border-dashed border-[#f8c8dc]/20 flex items-center justify-center">
                  <span className="text-[12px] text-[#fce5eb]">❤️</span>
                </div>
                {/* Wax drip details */}
                <div className="absolute -bottom-1.5 left-2.5 w-3.5 h-3 bg-[#a33243] rounded-full" />
                <div className="absolute -bottom-1.5 right-3 w-3 h-3 bg-[#a33243] rounded-full" />
              </motion.div>
            ) : (
              // Split Wax Seal Animation
              <div className="absolute bottom-[35%] left-[42%] w-11 h-11 pointer-events-none z-45 flex justify-between select-none">
                <motion.div 
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: -16, opacity: 0.4, rotate: -25 }}
                  className="w-5 h-11 bg-[#a33243] rounded-l-full border-r border-[#802230]"
                  style={{ transformOrigin: 'center left' }}
                />
                <motion.div 
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 16, opacity: 0.4, rotate: 25 }}
                  className="w-5 h-11 bg-[#a33243] rounded-r-full border-l border-[#802230]"
                  style={{ transformOrigin: 'center right' }}
                />
              </div>
            )}

            {/* Tap helper indicator */}
            {!isCracked && (
              <span className="absolute bottom-3 text-[9px] font-sans text-brown/50 tracking-widest uppercase animate-pulse z-30">
                Click Seal to Open
              </span>
            )}
            {isLetterSlidUp && !isModalOpen && (
              <span className="absolute bottom-3 text-[9px] font-sans text-[#a33835] tracking-widest uppercase animate-pulse z-30">
                Click Letter to Read
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Reusable Fullscreen Modal for the Letter content */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              onClick={stopFlip}
              onMouseDown={stopFlip}
              onMouseUp={stopFlip}
              onTouchStart={stopFlip}
              onTouchEnd={stopFlip}
              className="w-full max-w-md bg-[#fdfaf2] p-8 pb-10 rounded shadow-2xl border border-white/5 relative cursor-default select-text"
              style={{ 
                backgroundImage: 'repeating-linear-gradient(#fdfaf2, #fdfaf2 28px, #ebe5d6 28px, #ebe5d6 29px)',
                lineHeight: '29px',
              }}
            >
              <div className="font-caveat text-xl text-textDark/95 pt-2 leading-[29px]">
                <p className="font-bold mb-4">{LOVE_LETTER.greeting}</p>
                {LOVE_LETTER.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-[29px] mb-2 ${index === 0 ? 'indent-4' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="text-right mt-8 pr-2 font-bold text-pink text-2xl">{LOVE_LETTER.signOff}</p>
              </div>

              {/* Close Button overlay */}
              <button 
                onClick={handleCloseModal}
                className="absolute bottom-2 right-4 text-[9px] font-sans uppercase text-brown/40 hover:text-brown tracking-widest font-semibold cursor-pointer"
              >
                Close Letter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 7</span>
      </div>
    </BookPage>
  );
});

PageSeven.displayName = 'PageSeven';
export default PageSeven;
