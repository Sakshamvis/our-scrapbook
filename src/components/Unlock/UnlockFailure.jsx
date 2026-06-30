import React from 'react';
import { motion } from 'framer-motion';

export default function UnlockFailure() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mt-2.5 px-3 select-none"
    >
      <p className="font-patrick text-base text-[#b14949] font-bold">
        Hmm...
      </p>
      <p className="font-patrick text-sm text-[#301f14]/80 mt-0.5 leading-snug">
        That doesn't seem to unlock our memories.
      </p>
    </motion.div>
  );
}
