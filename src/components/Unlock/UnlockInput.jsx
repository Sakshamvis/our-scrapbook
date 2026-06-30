import React from 'react';
import { motion } from 'framer-motion';

export default function UnlockInput({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-[280px] flex flex-col items-center gap-4 my-2">
      <input
        type="text"
        placeholder="Type your answer..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2.5 bg-[#fdfbf7] border border-[#a48464]/30 rounded-lg text-[#301f14] font-patrick text-lg text-center placeholder-[#301f14]/35 focus:outline-none focus:border-[#cca52d]/60 focus:ring-1 focus:ring-[#cca52d]/30 shadow-inner"
        autoFocus
        aria-label="Secret Answer Input"
      />
      <motion.button
        onClick={onSubmit}
        className="px-8 py-2.5 bg-gradient-to-r from-gold via-[#cca52d] to-gold text-[#301f14] font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_4px_12px_rgba(139,94,60,0.15)] cursor-pointer border border-[#cca52d]/30"
        whileHover={{ scale: 1.04, boxShadow: '0 6px 16px rgba(204,165,45,0.25)' }}
        whileTap={{ scale: 0.96 }}
        aria-label="Submit Answer"
      >
        Unlock Diary
      </motion.button>
    </div>
  );
}
