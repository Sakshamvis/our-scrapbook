import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';

const TIMELINE_EVENTS = [
  { date: 'Dec 2024', title: 'First Hello', desc: 'The moment our paths crossed.' },
  { date: 'Feb 2025', title: 'Two Hearts, One Journey', desc: 'When we made it official.' },
  { date: 'March 2026', title: 'Our First Trip Together', desc: 'A beautiful 5-day escape to make memories.' },
];

export const PageFour = React.forwardRef((props, ref) => {
  const { clickStar } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={false} className="relative bg-[#fffef9]">
      {/* Ruled notebook paper background lines */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'repeating-linear-gradient(#fffef9, #fffef9 24px, #e8dfd5 24px, #e8dfd5 25px)',
          backgroundPosition: '0 40px'
        }}
      />

      {/* Red margin line on left of notebook page */}
      <div className="absolute left-[38px] top-0 bottom-0 w-[1px] bg-red-400/35 pointer-events-none z-0" />

      {/* Right side page vertical grid line */}
      <div className="absolute right-6 top-10 bottom-10 w-[1px] bg-dashed border-r border-dashed border-brown/20 pointer-events-none z-10" />

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-between p-4 pr-8 pl-12 mt-4 relative z-10">
        
        {/* Top Header Label */}
        <div className="text-right select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">Milestones</span>
        </div>

        {/* Vintage Postage Stamp (Top Right) */}
        <div className="absolute top-10 right-8 w-16 h-20 bg-[#fbf9f2] p-1.5 border border-dashed border-brown/30 shadow rotate-[8deg] flex flex-col justify-between z-20 pointer-events-none">
          <div className="w-full h-[75%] bg-[#eae4d5] overflow-hidden flex items-center justify-center relative border border-black/5">
            {/* Stamp silhouette (Eiffel tower or flower) */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-brown/50 fill-none stroke-[2]">
              <path d="M50,90 L50,60 L40,30 L50,10 L60,30 L50,60 M30,90 H70 M35,75 H65" />
            </svg>
            <div className="absolute bottom-1 left-1 text-[7px] font-sans text-brown/50">12c</div>
          </div>
          <span className="text-[7px] text-center font-sans tracking-widest text-brown/60 uppercase font-semibold">Love Mail</span>
          {/* Postmark cancellation overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-black stroke-[1.5]">
              <circle cx="50" cy="50" r="35" />
              <path d="M15,40 Q50,45 85,40 M15,50 Q50,55 85,50 M15,60 Q50,65 85,60" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-left mt-2 select-none">
          <h2 className="font-caveat text-4xl text-textDark">Our Timeline</h2>
        </div>

        {/* Timeline Path */}
        <div className="relative flex-1 flex flex-col justify-around pl-8 border-l border-dashed border-brown/30 max-h-[350px] my-6 max-w-[280px] select-none">
          
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div 
              key={`timeline-${idx}`} 
              className="relative pl-6 flex flex-col items-start text-left group cursor-default"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Timeline Bullet Node with hover pulse */}
              <motion.div 
                className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-gold border-[3px] border-[#fffef9] shadow-sm z-25"
                whileHover={{ scale: 1.25 }}
              />
              
              <span className="text-[9px] font-sans tracking-wider uppercase text-brown/50 font-bold">{event.date}</span>
              <h3 className="font-caveat text-xl text-textDark leading-tight mt-0.5 font-bold">{event.title}</h3>
              <p className="font-patrick text-sm text-textDark/75 mt-0.5 leading-snug">{event.desc}</p>
            </motion.div>
          ))}

          {/* Doodled Arrow pointing down timeline */}
          <div className="absolute -left-3.5 -bottom-6 opacity-30">
            <svg viewBox="0 0 50 50" className="w-6 h-6 stroke-brown fill-none stroke-[2]">
              <path d="M15,10 C15,25 25,35 25,35 L20,38 M25,35 L28,30" />
            </svg>
          </div>

        </div>

      </div>

      {/* Star 3 Easter Egg Trigger */}
      <button
        onClick={() => clickStar(3)}
        className="absolute bottom-4 right-6 text-brown/10 hover:text-gold/60 transition-colors cursor-pointer p-1 z-35"
        title="Secret Star"
        aria-label="Secret Star 3"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20 select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 4</span>
      </div>
    </BookPage>
  );
});

PageFour.displayName = 'PageFour';
export default PageFour;
