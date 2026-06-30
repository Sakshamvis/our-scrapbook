import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEggs } from '../../context/EasterEggContext';

export default function EasterEggManager() {
  const { activeNotification, setActiveNotification } = useEasterEggs();

  return (
    <AnimatePresence>
      {activeNotification && (
        <motion.div
          initial={{ opacity: 0, y: -60, x: '-50%', scale: 0.92 }}
          animate={{ opacity: 1, y: 24, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -30, x: '-50%', scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[340px] bg-gradient-to-br from-[#fffef9] via-[#fffbf4] to-[#f8f5ed] border border-[#cca52d]/45 p-4 rounded-2xl shadow-[0_15px_40px_rgba(42,33,27,0.22)] select-none cursor-pointer"
          onClick={() => setActiveNotification(null)}
          role="alert"
          aria-live="polite"
        >
          {/* Mini heart wax seal corner sticker */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#a33835] shadow-md border border-white/10 flex items-center justify-center -rotate-[15deg]">
            <span className="text-[11px] text-white">❤️</span>
          </div>

          <h5 className="font-sans text-[9px] uppercase tracking-widest text-[#cca52d] font-bold border-b border-[#cca52d]/15 pb-1 mb-2">
            {activeNotification.title}
          </h5>
          
          <p className="font-caveat text-xl sm:text-2xl text-[#301f14] leading-relaxed font-bold">
            {activeNotification.message}
          </p>
          
          <div className="text-right text-[8px] text-[#a48464]/55 font-sans italic mt-2.5">
            Click this note to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
