import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';
import SmartPhoto from '../../UI/SmartPhoto';

export const PageTwo = React.forwardRef((props, ref) => {
  const { triggerDateCounter } = useEasterEggs();

  return (
    <BookPage ref={ref} {...props} isLeft={false} className="relative bg-[#fffef9]">
      
      {/* Right side page vertical divider line */}
      <div className="absolute right-6 top-10 bottom-10 w-[1px] bg-dashed border-r border-dashed border-brown/20 pointer-events-none" />

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-between p-4 pr-8 mt-4 relative">
        
        {/* Top Header Label */}
        <div className="text-right select-none">
          <span className="text-[10px] font-sans tracking-widest uppercase text-brown/40 font-semibold">Chapter I</span>
        </div>

        {/* Title */}
        <div className="text-left mt-2 px-2 select-none">
          <h2 className="font-caveat text-4xl text-textDark rotate-[-1deg]">Our First Trip</h2>
        </div>

        {/* Main Content Area - Handcrafted Journal Layout */}
        <div className="flex-1 flex flex-col w-full mt-2 min-h-0">

          {/* Top row: journal text + bouquet polaroid */}
          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="flex-1 min-w-0 max-w-[215px] text-left select-none pr-1">
              <p className="font-patrick text-[14.5px] text-brown/85 leading-relaxed">
                Our first trip together became an unforgettable chapter written in my heart. The five days we shared felt so fleeting—days slipped by like sand, filled with endless laughter and moments I will cherish forever.
              </p>
              <p className="font-patrick text-[14.5px] text-brown/85 leading-relaxed mt-2.5">
                At the end of it all, it felt as if we had met only five minutes prior, and saying goodbye left me longing for your presence. Yet, as you gently reminded me, the distance is just a temporary phase, and we will surely pass it together.
              </p>
            </div>

            <SmartPhoto 
              src="/photos/trip_car.png"
              caption="07 March 2026"
              rotation="5deg"
              className="w-[128px] flex-shrink-0 -mt-1"
              washiColor="bg-pink/25"
              hero={true}
            />
          </div>

          {/* Bottom row: March 8 polaroids */}
          <div className="relative flex-1 mt-3 min-h-[210px]">
            <SmartPhoto 
              src="/photos/trip_march8_1.jpg"
              caption="08 March 2026"
              rotation="-4deg"
              className="absolute bottom-[14%] left-[2%] w-[128px] z-20"
              washiColor="bg-blue-300/25"
            />

            <SmartPhoto 
              src="/photos/trip_march8_2.jpg"
              caption="08 March 2026"
              rotation="7deg"
              className="absolute bottom-[8%] right-[2%] w-[132px] z-20"
              washiColor="bg-yellow-200/35"
            />

            {/* Distressed vintage date stamp */}
            <div 
              onClick={triggerDateCounter}
              className="absolute bottom-[2%] right-[6%] z-20 rotate-[-6deg] select-none cursor-pointer hover:scale-105 transition-transform duration-300"
              title="Click Date Stamp"
            >
              <div className="border-[2px] border-dashed border-[#b14949]/45 text-[#b14949]/70 px-2.5 py-0.5 rounded font-sans text-[10px] uppercase font-bold tracking-widest flex flex-col items-center leading-none">
                <span>Saksham & Shreya</span>
                <span className="text-[8px] mt-0.5 font-light">07 MARCH 2026</span>
              </div>
            </div>

            {/* Pressed daisy petal sketch */}
            <motion.div 
              className="absolute bottom-[4%] left-[4%] w-12 h-12 pointer-events-none z-10 opacity-80"
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#ecd284]/20 stroke-brown/50 stroke-[1.5]">
                <path d="M50,50 Q60,30 50,10 Q40,30 50,50" />
                <path d="M50,50 Q70,40 90,50 Q70,60 50,50" />
                <path d="M50,50 Q40,70 50,90 Q60,70 50,50" />
                <path d="M50,50 Q30,60 10,50 Q30,40 50,50" />
                <circle cx="50" cy="50" r="8" className="fill-[#e8b653]/60" />
              </svg>
            </motion.div>
          </div>

        </div>

        {/* Page number footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center select-none">
          <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 2</span>
        </div>

      </div>

    </BookPage>
  );
});

PageTwo.displayName = 'PageTwo';
export default PageTwo;
