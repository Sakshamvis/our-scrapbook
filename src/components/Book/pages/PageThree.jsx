import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';
import SmartPhoto from '../../UI/SmartPhoto';

export const PageThree = React.forwardRef((props, ref) => {
  const { clickStar } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={true} className="relative bg-[#fffef9] overflow-hidden">
      {/* Decorative vertical divider line */}
      <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-dashed border-l border-dashed border-brown/20 pointer-events-none" />

      {/* Coffee Stain overlay */}
      <div className="absolute bottom-[5%] right-[2%] w-24 h-24 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#c4a482]">
          <path d="M40,20 Q60,10 70,30 Q90,40 70,60 Q60,90 40,70 Q10,60 40,20 Z" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4 pl-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-left select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">First Trip</span>
        </div>

        {/* Collage Title */}
        <div className="text-left mt-2 select-none">
          <h2 className="font-caveat text-3xl text-textDark rotate-[-2deg]">Our Trip Memories</h2>
        </div>

        {/* Polaroid grid area */}
        <div className="flex-1 relative w-full mt-4 min-h-[360px]">
          
          {/* Polaroid 1 (Top Left - 8th March Elevator Selfie) */}
          <SmartPhoto 
            src="/photos/trip_elevator.png"
            caption="08 March 2026"
            rotation="-5deg"
            className="absolute top-[6%] left-[4%] w-[155px] z-10"
            washiColor="bg-blue-300/25"
            fit="cover"
          />

          {/* Polaroid 2 (Top Right - 8th March Selfie close-up 1) */}
          <SmartPhoto 
            src="/photos/trip_selfie_1.png"
            caption="08 March 2026"
            rotation="6deg"
            className="absolute top-[14%] right-[3%] w-[130px] z-20"
            washiColor="bg-pink/25"
            fit="cover"
          />

          {/* Polaroid 3 (Bottom Left Overlapping - 8th March Selfie close-up 2) */}
          <SmartPhoto 
            src="/photos/trip_selfie_2.png"
            caption="08 March 2026"
            rotation="-6deg"
            className="absolute bottom-[8%] left-[8%] w-[135px] z-30"
            washiColor="bg-yellow-200/35"
          />


          {/* Sticky Note (Wiggles on hover - Centered and slightly tilted) */}
          <motion.div 
            className="absolute top-[41%] left-[34%] w-[145px] bg-[#fffbce] p-3 shadow-md border-l-[3px] border-yellow-300/60 z-30 cursor-pointer flex flex-col justify-between"
            style={{ rotate: '3deg' }}
            whileHover={{ 
              rotate: [3, -3, 3, -1, 3],
              scale: 1.04,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Pin outline */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500/80 shadow" />
            <p className="font-patrick text-xs text-textDark/80 pt-1 leading-snug">
              Every photograph is a timestamp of a memory that I keep close.
            </p>
            <span className="text-[9px] font-caveat text-right text-pink mt-1.5 font-bold">~ Sweetest moments</span>
          </motion.div>

          {/* Small handdrawn hearts on the background */}
          <div className="absolute top-[52%] left-[10%] opacity-40 select-none">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-pink stroke-pink/50 stroke-[1]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute top-[68%] right-[8%] opacity-30 select-none rotate-[20deg]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-pink stroke-pink/50 stroke-[1]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

        </div>

      </div>

      {/* Star 2 Easter Egg Trigger */}
      <button
        onClick={() => clickStar(2)}
        className="absolute bottom-4 left-6 text-brown/10 hover:text-gold/60 transition-colors cursor-pointer p-1"
        title="Secret Star"
        aria-label="Secret Star 2"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 3</span>
      </div>
    </BookPage>
  );
});

PageThree.displayName = 'PageThree';
export default PageThree;
