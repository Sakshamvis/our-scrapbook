import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockConfig } from '../../data/unlockConfig';
import ParticleLayer from '../UI/ParticleLayer';
import LightRayLayer from '../UI/LightRayLayer';
import UnlockQuestion from './UnlockQuestion';
import UnlockInput from './UnlockInput';
import UnlockSuccess from './UnlockSuccess';
import UnlockFailure from './UnlockFailure';
import { useAudio } from '../../context/AudioContext';

export default function UnlockScreen({ onUnlock }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('input'); // 'input' | 'success' | 'error'
  const [isShaking, setIsShaking] = useState(false);
  const { playSFX } = useAudio();

  // Pick a random question once on mount
  useEffect(() => {
    const questions = unlockConfig.questions;
    if (questions && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setSelectedQuestion(questions[randomIndex]);
    }
  }, []);

  const handleValidate = () => {
    if (!selectedQuestion) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const isCorrect = selectedQuestion.answers.some(
      (ans) => ans.trim().toLowerCase() === normalizedInput
    );

    if (isCorrect) {
      // Correct answer: trigger sparkle animation
      setStatus('success');
      setIsShaking(false);
      // Wait for success animation before proceeding to cinematic intro loader
      setTimeout(() => {
        onUnlock();
      }, 2300);
    } else {
      // Wrong answer: play paper rustle, gentle shake, and show retry message
      playSFX('paperRustle');
      setStatus('error');
      setIsShaking(true);
      // Reset shake state after animation ends
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-paper flex items-center justify-center p-4 overflow-hidden select-none">
      
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 paper-texture-overlay opacity-[0.03] z-0 pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay z-0 pointer-events-none" />
      <LightRayLayer />
      <ParticleLayer type="both" count={14} />

      {/* Central Vintage Diary Card */}
      <motion.div
        animate={{ 
          y: isShaking ? 0 : [-5, 5, -5],
          x: isShaking ? [-10, 10, -10, 10, -5, 5, 0] : 0
        }}
        transition={{ 
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 0.5, ease: 'easeInOut' }
        }}
        className="relative w-full max-w-[400px] bg-gradient-to-br from-[#fffef9] via-[#fffbf2] to-[#f8f5eb] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between border border-[#a48464]/20 shadow-[0_20px_50px_rgba(42,33,27,0.18)] z-10"
        style={{
          boxShadow: '0 20px 50px rgba(42,33,27,0.18), inset 0 2px 8px rgba(255,255,255,0.85)'
        }}
      >
        {/* Soft Gold Tooling Border */}
        <div className="absolute inset-3 border border-[#cca52d]/25 rounded-2xl pointer-events-none" />
        <div className="absolute inset-4 border border-[#cca52d]/15 rounded-2xl pointer-events-none" />

        {/* Vintage Top Corner Leaves Doodles */}
        <div className="absolute top-6 left-6 opacity-35 pointer-events-none">
          <svg viewBox="0 0 50 50" className="w-8 h-8 stroke-brown fill-none stroke-[1.5]">
            <path d="M5,5 Q20,10 25,25 M25,25 Q15,20 5,5 M25,25 Q20,15 5,5" />
          </svg>
        </div>
        <div className="absolute top-6 right-6 opacity-35 pointer-events-none scale-x-[-1]">
          <svg viewBox="0 0 50 50" className="w-8 h-8 stroke-brown fill-none stroke-[1.5]">
            <path d="M5,5 Q20,10 25,25 M25,25 Q15,20 5,5 M25,25 Q20,15 5,5" />
          </svg>
        </div>

        {/* Heading & Subtitle Block */}
        <div className="text-center mt-6 w-full px-2">
          <h1 className="font-caveat text-4.5xl text-[#301f14] tracking-wide font-bold drop-shadow-sm select-none">
            Our Little Secret
          </h1>
          
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#cca52d]/50 to-transparent my-3.5 mx-auto" />

          <p className="font-patrick text-base text-[#301f14]/75 px-3 leading-relaxed select-none">
            This scrapbook holds memories meant for only two hearts.
          </p>
          <p className="font-sans text-[9px] uppercase tracking-widest text-[#a48464] font-bold mt-2 select-none">
            Answer just one question...
          </p>
        </div>

        {/* Question display */}
        {selectedQuestion && status !== 'success' && (
          <UnlockQuestion question={selectedQuestion.question} />
        )}

        {/* Validation View Slot */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <UnlockSuccess key="success" />
          ) : (
            <div key="input-form" className="w-full flex flex-col items-center">
              <UnlockInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleValidate}
              />
              {status === 'error' && <UnlockFailure />}
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Lock Icon Ornament */}
        <div className="mt-4 mb-2 opacity-25 select-none pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#301f14] fill-none stroke-[1.8]">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M12,14 L12,17 M12,17 A1.5,1.5 0 1 0 13.5,15.5" />
            <path d="M8,11 L8,7 A4,4 0 0 1 16,7 L16,11" />
          </svg>
        </div>

      </motion.div>

    </div>
  );
}
