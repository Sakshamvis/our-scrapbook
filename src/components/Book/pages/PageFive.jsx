import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';

const REASONS = [
  { text: "How you bring a smile to my face even on the hardest days.", color: 'bg-[#fffbce]', border: 'border-yellow-300/40', rotate: '-3deg' },
  { text: "Your kindness, warm heart, and the gentle way you care.", color: 'bg-[#fce5eb]', border: 'border-pink/30', rotate: '2deg' },
  { text: "Our quiet moments together, simply sitting and feeling complete.", color: 'bg-[#e3f0fd]', border: 'border-blue-300/30', rotate: '-1.5deg' },
  { text: "How you support my dreams and make me believe in myself.", color: 'bg-[#fffefe]', border: 'border-brown/10', rotate: '1.5deg' }
];

export const PageFive = React.forwardRef((props, ref) => {
  const { triggerTeddy } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={true} className="relative bg-[#fffef9]">
      {/* Decorative vertical divider line */}
      <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-dashed border-l border-dashed border-brown/20 pointer-events-none" />

      {/* Coffee Stain overlay */}
      <div className="absolute top-[8%] right-[10%] w-20 h-20 opacity-10 pointer-events-none rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#c4a482]">
          <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" />
        </svg>
      </div>

      {/* Teddy Bear Easter Egg Trigger */}
      <motion.div
        onClick={triggerTeddy}
        className="absolute top-10 right-8 w-12 h-12 cursor-pointer z-20 group"
        whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
        title="Teddy Bear"
        aria-label="Teddy Bear Easter Egg"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brown/55 fill-none stroke-[2.2] group-hover:stroke-gold transition-colors duration-300">
          <circle cx="30" cy="30" r="11" />
          <circle cx="70" cy="30" r="11" />
          <circle cx="50" cy="45" r="26" />
          <circle cx="30" cy="30" r="5" className="fill-pink/20" />
          <circle cx="70" cy="30" r="5" className="fill-pink/20" />
          <circle cx="43" cy="43" r="2.5" className="fill-brown" />
          <circle cx="57" cy="43" r="2.5" className="fill-brown" />
          <ellipse cx="50" cy="51" rx="7" ry="5" />
          <path d="M50,48 L50,51 M50,51 Q48,54 46,53 M50,51 Q52,54 54,53" />
        </svg>
      </motion.div>

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-between p-4 pl-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-left select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">Affection</span>
        </div>

        {/* Title */}
        <div className="text-left mt-2 mb-4 select-none">
          <h2 className="font-caveat text-3.5xl text-textDark">Reasons I Love You</h2>
        </div>

        {/* Stack of wiggling notes */}
        <div className="flex-1 flex flex-col gap-5 max-w-[300px] mx-auto relative my-2 select-none">
          
          {REASONS.map((reason, idx) => (
            <motion.div 
              key={`reason-${idx}`} 
              className={`p-3 rounded shadow-sm border-l-4 ${reason.color} ${reason.border} flex items-start gap-2.5 cursor-pointer`}
              style={{ rotate: reason.rotate }}
              whileHover={{ 
                scale: 1.03,
                rotate: [parseFloat(reason.rotate), -parseFloat(reason.rotate), parseFloat(reason.rotate)],
                boxShadow: '0 6px 12px rgba(0,0,0,0.08)'
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Little tape marker */}
              <div className="absolute -top-2 left-4 w-7 h-3 bg-pink/20 washi-tape opacity-80" />

              <span className="font-caveat text-xl text-gold font-bold leading-none">{idx + 1}.</span>
              <p className="font-patrick text-sm text-textDark/85 leading-snug">
                {reason.text}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 5</span>
      </div>
    </BookPage>
  );
});

PageFive.displayName = 'PageFive';
export default PageFive;
