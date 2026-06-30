/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const AudioContext = createContext(null);

// Synthesize organic sounds using Web Audio API as zero-delay high-fidelity sounds
const playSynthesizedSFX = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'leatherCreak') {
      // Leather creak: sequence of low-frequency pitch-glides
      for (let i = 0; i < 6; i++) {
        const time = now + i * 0.05 + Math.random() * 0.03;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90 + Math.random() * 30, time);
        osc.frequency.exponentialRampToValueAtTime(10, time + 0.04);
        
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.04);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.05);
      }
    } else if (type === 'pageFlip') {
      // Page flip: bandpass white noise sweep
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 1.8;
      
      const gain = ctx.createGain();
      
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(500, now + 0.4);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + 0.45);
    } else if (type === 'envelopeSlide') {
      // Envelope paper slide: soft highpass noise
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1400;
      
      const gain = ctx.createGain();
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + 0.35);
    } else if (type === 'waxSealCrack') {
      // Wax seal crack: short sawtooth crack + low resonance
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.07);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
      
      // Secondary crackle
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(140, now + 0.02);
      gain2.gain.setValueAtTime(0.05, now + 0.02);
      gain2.gain.linearRampToValueAtTime(0.001, now + 0.14);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.14);
    } else if (type === 'buttonTap') {
      // Button: very quiet wood/paper tap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);
      
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    }
  } catch (e) {
    console.warn("SFX synthesis failed:", e);
  }
};

export function AudioProvider({ children }) {
  const bgAudioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default volume is 20%
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize background audio element on mount with immediate & fallback autoplay
  useEffect(() => {
    const audio = new Audio('/music/TURNING_PAGE_-_SLEEPING_AT_LAST_host.ru_(mp3.pm).mp3');
    audio.loop = true;
    audio.volume = 0.2;
    bgAudioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    // Try immediate autoplay (some browser configurations allow this natively)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        console.log('Immediate autoplay prevented by browser. Setting up interaction fallback...');
      });
    }

    // Fallback: Play automatically on the absolute first user interaction anywhere on the document
    const startAudioOnInteraction = () => {
      if (audio.paused) {
        // Set volume and play
        audio.volume = 0;
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          // Gently fade-in volume to 20%
          let fadeVol = 0;
          const fadeInterval = setInterval(() => {
            fadeVol += 0.02;
            if (fadeVol >= 0.2) {
              audio.volume = 0.2;
              clearInterval(fadeInterval);
            } else {
              audio.volume = fadeVol;
            }
          }, 100);
        }).catch(err => {
          console.log('Failed to play on interaction:', err);
        });
      }
      
      // Clean up interaction listeners once triggered
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };

    window.addEventListener('click', startAudioOnInteraction);
    window.addEventListener('keydown', startAudioOnInteraction);
    window.addEventListener('touchstart', startAudioOnInteraction);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.pause();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };
  }, []);

  // Fade helper for linear volume increments/decrements
  const fadeVolume = (targetVolume, durationMs, onComplete) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const audio = bgAudioRef.current;
    if (!audio) return;

    const startVolume = audio.volume;
    const steps = 30;
    const stepTime = durationMs / steps;
    const volumeDelta = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextVolume = startVolume + volumeDelta * currentStep;
      audio.volume = Math.max(0, Math.min(1, nextVolume));

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  // Play background music with 2-second fade-in
  const playBackground = () => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    setIsPlaying(true);

    // Initial audio play from muted state
    audio.volume = 0;
    audio.play().then(() => {
      fadeVolume(isMuted ? 0 : volume, 2000);
    }).catch(err => {
      console.log('Audio autoplay blocked by browser policy:', err);
    });
  };

  // Pause background music with 1.5-second fade-out
  const pauseBackground = () => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    setIsPlaying(false);
    fadeVolume(0, 1500, () => {
      audio.pause();
    });
  };

  // Toggle play/pause state
  const togglePlay = () => {
    if (isPlaying) {
      pauseBackground();
    } else {
      playBackground();
    }
  };

  // Adjust volume directly (updates target volume for fades)
  const adjustVolume = (newVol) => {
    const cleanVol = Math.max(0, Math.min(1, newVol));
    setVolume(cleanVol);
    if (isMuted) setIsMuted(false);

    if (bgAudioRef.current && !fadeIntervalRef.current) {
      bgAudioRef.current.volume = cleanVol;
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);

    if (bgAudioRef.current) {
      if (nextMute) {
        fadeVolume(0, 500);
      } else {
        fadeVolume(volume, 500);
      }
    }
  };

  // Seek current position
  const seekTo = (seconds) => {
    if (bgAudioRef.current) {
      bgAudioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  // Tab visibility changes (dims audio slightly in the background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = bgAudioRef.current;
      if (!audio || !isPlaying) return;

      if (document.hidden) {
        // Fade down to 4% volume
        fadeVolume(0.04, 1000);
      } else {
        // Fade back to previous target volume
        fadeVolume(isMuted ? 0 : volume, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, volume, isMuted]);

  // Immersive sound effects player utilizing high-fidelity synthesizers
  const playSFX = (sfxName) => {
    // Map abstract naming to synthesizer names
    const sfxMapping = {
      bookOpen: 'leatherCreak',
      leatherCreak: 'leatherCreak',
      pageFlip: 'pageFlip',
      paperRustle: 'pageFlip',
      envelope: 'envelopeSlide',
      envelopeSlide: 'envelopeSlide',
      waxSealCrack: 'waxSealCrack',
      softCrack: 'waxSealCrack',
      button: 'buttonTap',
      buttonTap: 'buttonTap',
    };

    const targetType = sfxMapping[sfxName];
    if (targetType) {
      playSynthesizedSFX(targetType);
    }
  };

  const contextValue = {
    isPlaying,
    volume,
    currentTime,
    duration,
    isMuted,
    isExpanded,
    hasInteracted,
    setIsExpanded,
    playBackground,
    pauseBackground,
    togglePlay,
    adjustVolume,
    toggleMute,
    seekTo,
    playSFX,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used inside an AudioProvider');
  }
  return context;
}
