import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';

export const PageEight = React.forwardRef((props, ref) => {
  const { triggerMemory, clickStar } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={false} className="relative bg-[#fffef9]">
      
      {/* Right side page vertical grid line */}
      <div className="absolute right-6 top-10 bottom-10 w-[1px] bg-dashed border-r border-dashed border-brown/20 pointer-events-none" />

      {/* Coffee Stain overlay */}
      <div className="absolute top-[12%] left-[4%] w-28 h-28 opacity-10 pointer-events-none rotate-95">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#c4a482]">
          <path d="M50,15 C70,15 80,35 80,50 C80,65 60,80 50,85 C40,80 20,65 20,50 C20,35 30,15 50,15 Z" />
        </svg>
      </div>

      {/* Butterfly Easter Egg Trigger */}
      <motion.div
        onClick={triggerMemory}
        className="absolute top-10 left-6 w-10 h-10 cursor-pointer z-20 group"
        animate={{ 
          y: [-3, 3, -3],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15 }}
        title="Click the Butterfly"
        aria-label="Butterfly Easter Egg"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brown/55 fill-none stroke-[2.2] group-hover:stroke-gold transition-colors duration-300">
          <path d="M50,50 Q30,25 25,35 Q20,45 50,50 M50,50 Q35,65 30,60 Q25,55 50,50" className="fill-[#e8c3b9]/25" />
          <path d="M50,50 Q70,25 75,35 Q80,45 50,50 M50,50 Q65,65 70,60 Q75,55 50,50" className="fill-[#e8c3b9]/25" />
          <path d="M50,30 L50,70" className="stroke-brown stroke-[3]" />
          <path d="M50,30 Q47,20 42,22 M50,30 Q53,20 58,22" />
        </svg>
      </motion.div>

      {/* Page Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 pr-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-right w-full select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">Ending</span>
        </div>

        {/* Centerpiece watercolor heart and text */}
        <div className="flex-1 flex flex-col items-center justify-center my-4 relative select-none">
          
          {/* Watercolor Heart Illustration with floating breath */}
          <motion.div 
            className="relative mb-6 cursor-pointer"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            whileHover={{ scale: 1.08 }}
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-pink/60 fill-[#f8c8dc]/25 stroke-[1.5] drop-shadow-md">
              <path d="M12,30 C12,10 42,10 50,28 C58,10 88,10 88,30 C88,60 50,90 50,90 C50,90 12,60 12,30 Z" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl text-pink/50">❤️</span>

            {/* Glowing gold sparkles floating around heart */}
            <motion.div 
              className="absolute -top-2 -right-2 text-gold font-bold text-lg pointer-events-none"
              animate={{ opacity: [0.3, 1, 0.3], y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 -left-2 text-gold font-bold text-base pointer-events-none"
              animate={{ opacity: [0.2, 0.9, 0.2], y: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              ✦
            </motion.div>
          </motion.div>

          <h2 className="font-caveat text-4xl text-textDark mb-1 font-bold">To Be Continued...</h2>
          <h3 className="font-sans text-[10px] tracking-wider uppercase text-brown/40 mb-5 font-semibold">Thank You</h3>
          
          <p className="font-patrick text-xl text-textDark/90 text-center leading-relaxed max-w-[240px] italic">
            "Our story has only just begun."
          </p>

          {/* Hanging botanical flower leaf on the right edge */}
          <div className="absolute right-[-10px] bottom-[5%] opacity-35 select-none pointer-events-none">
            <svg viewBox="0 0 80 120" className="w-14 h-20 stroke-brown fill-none stroke-[2]">
              <path d="M10,10 Q30,20 40,70 T60,110" />
              <path d="M40,70 C50,60 60,65 55,75 Z" className="fill-[#8da280]/20" />
              <path d="M25,40 C35,30 45,35 40,45 Z" className="fill-[#8da280]/20" />
            </svg>
          </div>

        </div>

      </div>

      {/* Star 5 Easter Egg Trigger */}
      <button
        onClick={() => clickStar(5)}
        className="absolute bottom-4 right-6 text-brown/10 hover:text-gold/60 transition-colors cursor-pointer p-1 z-35"
        title="Secret Star"
        aria-label="Secret Star 5"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 8</span>
      </div>
    </BookPage>
  );
});

PageEight.displayName = 'PageEight';
export default PageEight;
