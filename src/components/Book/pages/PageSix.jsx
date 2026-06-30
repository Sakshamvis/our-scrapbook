import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';

const DREAMS = [
  "Go on a hot air balloon ride.",
  "Build a quiet cozy cottage garden.",
  "See the cherry blossoms in Tokyo.",
  "Adopt a golden retriever puppy."
];

export const PageSix = React.forwardRef((props, ref) => {
  const { clickStar } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={false} className="relative bg-[#fffef9] overflow-hidden">
      
      {/* Vintage Map Background lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-brown fill-none stroke-[0.5]">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="50" />
          <path d="M100,0 L100,200 M0,100 L200,100" />
          <path d="M30,30 L170,170 M30,170 L170,30" />
          <path d="M20,40 Q40,30 50,55 T80,45 T110,60 T140,50 T180,90 Q150,120 130,110 T80,130 T40,110 Z" />
        </svg>
      </div>

      {/* Right side page vertical grid line */}
      <div className="absolute right-6 top-10 bottom-10 w-[1px] bg-dashed border-r border-dashed border-brown/20 pointer-events-none z-10" />

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-between p-4 pr-8 mt-4 relative z-10">
        
        {/* Top Header Label */}
        <div className="text-right select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">Bucket List</span>
        </div>

        {/* Passport Stamp 1 (Top Left area) */}
        <div className="absolute top-[28%] left-[2%] rotate-[-15deg] opacity-65 pointer-events-none select-none">
          <div className="border-2 border-dashed border-blue-500/50 text-blue-600/70 rounded-full w-14 h-14 flex flex-col items-center justify-center font-sans text-[7px] font-bold uppercase tracking-wider p-1">
            <span>PASSPORT</span>
            <span>DEPARTED</span>
            <span>★ TOKYO ★</span>
          </div>
        </div>

        {/* Passport Stamp 2 (Bottom Right area) */}
        <div className="absolute bottom-[22%] right-[5%] rotate-[18deg] opacity-60 pointer-events-none select-none">
          <div className="border-2 border-double border-red-500/50 text-red-600/60 rounded w-16 h-12 flex flex-col items-center justify-center font-sans text-[7px] font-bold uppercase tracking-widest leading-none">
            <span>APPROVED</span>
            <span className="text-[5px] mt-1">IMMIGRATION</span>
            <span className="text-[6px] mt-0.5">PARIS</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-left mt-2 select-none">
          <h2 className="font-caveat text-4xl text-textDark">Future Dreams</h2>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-4 max-w-[280px] mx-auto my-6 relative select-none">
          
          {DREAMS.map((dream, idx) => (
            <motion.div 
              key={`dream-${idx}`} 
              className="flex items-center gap-3 bg-[#fffefc]/80 backdrop-blur-sm p-2 rounded shadow-sm border border-brown/5 cursor-pointer"
              whileHover={{ 
                x: 4, 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Checkbox box with ticked mark */}
              <div className="w-5 h-5 border border-brown/30 rounded flex items-center justify-center flex-shrink-0 bg-[#fffdfa] shadow-inner">
                <motion.svg 
                  viewBox="0 0 24 24" 
                  className="w-3.5 h-3.5 stroke-gold fill-none stroke-[3.5]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: idx * 0.4 + 1.2, duration: 0.6 }}
                >
                  <path d="M4.5 12.75l6 6 9-13.5" />
                </motion.svg>
              </div>
              
              <p className="font-patrick text-base text-textDark/85 leading-snug">
                {dream}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

      {/* Star 4 Easter Egg Trigger */}
      <button
        onClick={() => clickStar(4)}
        className="absolute bottom-4 right-6 text-brown/10 hover:text-gold/60 transition-colors cursor-pointer p-1 z-35"
        title="Secret Star"
        aria-label="Secret Star 4"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 6</span>
      </div>
    </BookPage>
  );
});

PageSix.displayName = 'PageSix';
export default PageSix;
