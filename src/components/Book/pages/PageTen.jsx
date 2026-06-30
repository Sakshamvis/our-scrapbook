import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';

export const PageTen = React.forwardRef((props, ref) => {
  return (
    <BookPage ref={ref} {...props} isLeft={false} className="relative bg-[#fffdf5] overflow-hidden">
      {/* Right side page vertical grid line */}
      <div className="absolute right-6 top-10 bottom-10 w-[1px] bg-dashed border-r border-dashed border-brown/20 pointer-events-none" />

      {/* Coffee Stain overlay */}
      <div className="absolute bottom-[10%] right-[10%] w-20 h-20 opacity-10 pointer-events-none rotate-[-45deg]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#c4a482]">
          <path d="M50,15 C65,15 75,25 75,45 C75,60 65,70 50,75 C35,70 25,60 25,45 C25,25 35,15 50,15 Z" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4 pr-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-right select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#cca52d] font-bold">★ Unlocked ★</span>
        </div>

        {/* Title */}
        <div className="text-left mt-2 select-none">
          <h2 className="font-caveat text-4.5xl text-[#301f14] leading-tight font-bold rotate-[1deg] drop-shadow-sm">
            Our Little Forever
          </h2>
          <div className="w-24 h-[1.5px] bg-[#cca52d]/40 my-2" />
        </div>

        {/* Floating elements inside a container */}
        <div className="flex-1 flex flex-col items-center justify-center my-6 relative select-none">
          
          {/* Heart lock graphic with key */}
          <motion.div 
            className="w-28 h-28 relative flex items-center justify-center"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#cca52d] fill-none stroke-[2.2]">
              {/* Outer heart outline */}
              <path d="M12,35 C12,15 42,15 50,33 C58,15 88,15 88,35 C88,65 50,92 50,92 C50,92 12,65 12,35 Z" className="fill-[#cca52d]/5" />
              {/* Inner keyhole shape */}
              <circle cx="50" cy="45" r="5" className="fill-[#301f14]/80 stroke-none" />
              <path d="M47,48 L53,48 L55,62 L45,62 Z" className="fill-[#301f14]/80 stroke-none" />
            </svg>
          </motion.div>

        </div>

        {/* Final sweet handwritten snippet */}
        <div className="text-center pl-4 mb-4 select-none">
          <p className="font-caveat text-2xl text-pink font-bold">
            "You are, and always will be, my dream come true."
          </p>
          <span className="font-sans text-[8px] tracking-widest uppercase text-[#a48464] font-bold mt-2 block">
            Locked in My Heart
          </span>
        </div>

      </div>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-[#cca52d] uppercase">Secret 10</span>
      </div>
    </BookPage>
  );
});

PageTen.displayName = 'PageTen';
export default PageTen;
