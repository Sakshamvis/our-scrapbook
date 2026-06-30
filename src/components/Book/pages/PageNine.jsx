import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';

export const PageNine = React.forwardRef((props, ref) => {
  return (
    <BookPage ref={ref} {...props} isLeft={true} className="relative bg-[#fffdf5] overflow-hidden">
      {/* Decorative vertical divider line */}
      <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-dashed border-l border-dashed border-brown/20 pointer-events-none" />

      {/* Coffee Stain overlay */}
      <div className="absolute top-[30%] left-[8%] w-24 h-24 opacity-10 pointer-events-none rotate-[15deg]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#c4a482]">
          <path d="M50,15 C65,15 75,25 75,45 C75,60 65,70 50,75 C35,70 25,60 25,45 C25,25 35,15 50,15 Z" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4 pl-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-left select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#cca52d] font-bold">★ Secret Chapter ★</span>
        </div>

        {/* Title */}
        <div className="text-left mt-2 select-none">
          <h2 className="font-caveat text-4.5xl text-[#301f14] leading-tight font-bold rotate-[-2deg] drop-shadow-sm">
            Secret Memories
          </h2>
          <div className="w-20 h-[1.5px] bg-[#cca52d]/40 my-2" />
        </div>

        {/* Polaroid mockup representing a hidden treasure */}
        <div className="flex-1 flex flex-col items-center justify-center my-4 relative select-none">
          <motion.div 
            className="w-56 bg-white p-3 shadow-xl border border-black/5 flex flex-col justify-between z-10 rotate-[2deg]"
            whileHover={{ scale: 1.03, rotate: '0deg' }}
          >
            <div className="w-full aspect-[4/3.2] bg-gradient-to-tr from-[#fdfbf7] to-[#f5f0e1] overflow-hidden relative flex flex-col items-center justify-center border border-[#cca52d]/25 rounded">
              <span className="text-3xl mb-1">🗝️</span>
              <span className="font-caveat text-sm text-[#301f14]/80 font-bold">Unlocking more adventures...</span>
            </div>
            <span className="text-[10px] text-center font-caveat text-textDark mt-2 font-semibold">
              The keys to my heart belong to you.
            </span>
          </motion.div>
        </div>

        {/* Sweet text paragraph */}
        <div className="text-left pr-4 mb-2 select-none">
          <p className="font-patrick text-base text-[#301f14]/85 leading-relaxed">
            There are some pages in my heart that only you can read, some jokes only you understand, and a love that grows stronger with every passing day. Thank you for finding these hidden pages.
          </p>
        </div>

      </div>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-[#cca52d] uppercase">Secret 9</span>
      </div>
    </BookPage>
  );
});

PageNine.displayName = 'PageNine';
export default PageNine;
