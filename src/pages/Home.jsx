import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader/Loader';
import Cover from '../components/Cover/Cover';
import Book from '../components/Book/Book';
import FloatingHearts from '../components/FloatingHearts/FloatingHearts';
import MusicPlayer from '../components/Music/MusicPlayer';
import UnlockScreen from '../components/Unlock/UnlockScreen';
import EasterEggManager from '../components/UI/EasterEggManager';
import { useEasterEggs } from '../context/EasterEggContext';
import { useAudio } from '../context/AudioContext';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isBookOpened, setIsBookOpened] = useState(false);
  
  // 0 = Active story, 1 = "Our story doesn't end here...", 2 = "Happy 7 Months / Made only for Kallu", 3 = Fade to Black
  const [endingPhase, setEndingPhase] = useState(0); 

  const { isNightMode } = useEasterEggs();
  const { pauseBackground, playSFX } = useAudio();

  const handleIntroComplete = React.useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  const handleEnding = () => {
    // 1. Play soft leather creak of the book closing
    playSFX('bookOpen');
    setEndingPhase(1);
    
    // 2. Smoothly fade out music
    pauseBackground();
 
    // 3. Transition to phase 2 (Happy 7 Months) after 4.5 seconds
    setTimeout(() => {
      setEndingPhase(2);
    }, 4500);
 
    // 4. Transition to phase 3 (fade to solid black) after 9.5 seconds
    setTimeout(() => {
      setEndingPhase(3);
    }, 9500);
  };

  return (
    <div 
      id="home-page" 
      className="relative w-full min-h-screen bg-paper overflow-hidden transition-colors duration-1000"
    >
      {/* Film Grain Overlay - Always visible across entire app for vintage feel */}
      <div className="film-grain" />

      {/* 1. Global Secret Easter Egg Parchment Notifier */}
      {endingPhase === 0 && <EasterEggManager />}

      {/* 2. Global Night Mode Midnight Overlay (Mix-Blend) */}
      {isNightMode && endingPhase === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[#0d1527]/30 mix-blend-multiply pointer-events-none z-45"
          style={{ backdropFilter: 'contrast(1.04) brightness(0.72) sepia(0.05)' }}
        />
      )}

      {/* 3. Screen Switch: Unlock Screen or Main Story Screen */}
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="unlock-screen-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <UnlockScreen onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="unlocked-scrapbook-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            {/* Cinematic Fullscreen Intro Sequence (starts after unlock) */}
            {!isIntroComplete && (
              <Loader onComplete={handleIntroComplete} />
            )}

            {/* Scrapbook Reveal (Once loader completes) */}
            <AnimatePresence mode="wait">
              {isIntroComplete && endingPhase === 0 && (
                <motion.div
                  key="scrapbook-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="relative w-full min-h-screen"
                >
                  {/* Global Ambient Floating Particles */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <FloatingHearts />
                  </div>

                  {/* View Coordinator: Cover Page or Opened Flipbook */}
                  <AnimatePresence mode="wait">
                    {!isBookOpened ? (
                      <motion.div
                        key="cover-view"
                        initial={{ opacity: 1 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 1.05,
                          filter: 'brightness(0.6)' 
                        }}
                        transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="relative z-10 w-full"
                      >
                        <Cover onOpen={() => setIsBookOpened(true)} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="book-view"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full min-h-screen flex items-center justify-center"
                      >
                        <Book onEnding={handleEnding} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Persistent Global Music Player */}
                  <MusicPlayer />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cinematic Final Ending Screen Overlay */}
            <AnimatePresence>
              {endingPhase > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 z-[80] flex flex-col items-center justify-center bg-[#f7f2e8]"
                >
                  {/* Kept drifting petals in background of the ending cards */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
                    <FloatingHearts />
                  </div>

                  {/* Phase 1: Our story doesn't end here... */}
                  <AnimatePresence mode="wait">
                    {endingPhase === 1 && (
                      <motion.h2
                        key="ending-p1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="font-caveat text-4.5xl text-textDark text-center px-6 leading-relaxed select-none z-10"
                      >
                        Our story doesn't end here...
                      </motion.h2>
                    )}

                    {/* Phase 2: Happy 7 Months ❤️ / Made only for Kallu. */}
                    {endingPhase === 2 && (
                      <motion.div
                        key="ending-p2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        className="text-center z-10 px-4"
                      >
                        <h2 className="font-caveat text-5xl text-[#a33835] font-bold select-none mb-4">
                          Happy 7 Months ❤️
                        </h2>
                        <p className="font-sans text-xs tracking-widest uppercase text-brown/50 font-semibold select-none">
                          Made only for Kallu.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Phase 3: Screen fades completely to black */}
                  {endingPhase === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2.2, ease: 'linear' }}
                      className="absolute inset-0 bg-black z-50 pointer-events-auto"
                    />
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
