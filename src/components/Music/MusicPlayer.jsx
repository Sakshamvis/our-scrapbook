import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiVolume2, FiVolumeX, FiPlay, FiPause, FiChevronDown } from 'react-icons/fi';
import { useAudio } from '../../context/AudioContext';
import { useEasterEggs } from '../../context/EasterEggContext';

export default function MusicPlayer() {
  const {
    isPlaying,
    volume,
    currentTime,
    duration,
    isMuted,
    isExpanded,
    setIsExpanded,
    togglePlay,
    adjustVolume,
    toggleMute,
    seekTo,
    playBackground,
  } = useAudio();

  const { clickVinyl } = useEasterEggs();

  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isExpanded &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest('.music-trigger-btn')
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, setIsExpanded]);

  // Handle first interaction trigger on button click
  const handleTriggerClick = () => {
    clickVinyl(); // Trigger easter egg click counter
    setIsExpanded(!isExpanded);
    // If not playing and first time click, trigger play automatically
    if (!isPlaying) {
      playBackground();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Expandable Glassmorphic Control Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.85, y: 15, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="mb-4 w-72 bg-[#26170e]/95 backdrop-blur-md border border-gold/20 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-paperLight flex flex-col gap-3.5 select-none"
            role="region"
            aria-label="Music Player Controls"
          >
            {/* Header / Song Info */}
            <div className="flex items-center justify-between pb-1.5 border-b border-gold/10">
              <div className="text-left">
                <h4 className="font-poppins text-xs font-semibold tracking-wider text-gold uppercase">Now Playing</h4>
                <p className="font-caveat text-xl text-paperLight leading-tight mt-0.5">Turning Page</p>
                <p className="font-sans text-[10px] text-paperLight/60 tracking-wide font-light">Sleeping At Last</p>
              </div>
              
              {/* Close Panel Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-paperLight/50 hover:text-gold transition-colors p-1"
                aria-label="Minimize Player"
              >
                <FiChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Slider Track */}
            <div className="flex flex-col gap-1">
              <div className="relative group">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className="w-full h-1 bg-gold/25 rounded-lg appearance-none cursor-pointer accent-gold hover:bg-gold/45 transition-colors"
                  aria-label="Song Position"
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-paperLight/50">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls & Volume Row */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Play / Pause Toggle Button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-[#bda142] hover:brightness-110 text-brown flex items-center justify-center shadow transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isPlaying ? <FiPause className="w-4 h-4 text-[#301f14]" /> : <FiPlay className="w-4 h-4 text-[#301f14] translate-x-[1px]" />}
              </button>

              {/* Volume Slider Block */}
              <div className="flex-1 flex items-center gap-2 bg-black/25 px-2.5 py-1.5 rounded-lg border border-gold/5">
                <button
                  onClick={toggleMute}
                  className="text-gold hover:text-paperLight transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <FiVolumeX className="w-4 h-4" /> : <FiVolume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                  className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                  aria-label="Volume Slider"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Action Button (Vinyl Disk) */}
      <motion.button
        onClick={handleTriggerClick}
        className="music-trigger-btn relative w-12 h-12 bg-[#29170e] hover:bg-[#382013] text-gold border border-gold/30 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(204,165,45,0.4)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Music Controller"
        aria-expanded={isExpanded}
      >
        {/* Breathing ambient ring */}
        <div className="absolute inset-0 rounded-full border border-gold/15 animate-ping opacity-45 pointer-events-none" />

        {/* Rotating Vinyl Record Graphic */}
        <div className={`relative w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/5 shadow-inner ${isPlaying ? 'animate-[spin_5s_linear_infinite]' : ''}`}>
          {/* Vinyl grooves */}
          <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-2.5 rounded-full border border-white/5 pointer-events-none" />
          
          {/* Center sticker label */}
          <div className="w-4.5 h-4.5 rounded-full bg-gold/90 flex items-center justify-center border border-black/40">
            <FiMusic className="w-2.5 h-2.5 text-[#301f14]" />
          </div>
        </div>
      </motion.button>

    </div>
  );
}
