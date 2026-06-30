import React from 'react';
import SmartPhoto from '../../UI/SmartPhoto';

export const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="relative w-[450px] h-[650px] bg-gradient-to-br from-[#4b3323] via-[#352115] to-[#1c0f09] p-6 flex flex-col justify-between items-center overflow-hidden border-l-[3.5px] border-[#29170e] select-none rounded-r-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.15)]"
    >
      {/* Leather texture overlay */}
      <div className="leather-texture-overlay rounded-r-2xl" />

      {/* Double Gold Foil Border */}
      <div className="gold-foil-tooling" />

      {/* Spine ribs effect in gutter area */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-black/35 border-r border-white/5 z-20" />

      {/* Corner Protectors */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-gold via-[#bda142] to-[#8c7126] rounded-tr-xl shadow-sm z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gold via-[#bda142] to-[#8c7126] rounded-br-xl shadow-sm z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black/55 rounded-full shadow-inner border-[0.5px] border-white/10" />
      </div>

      {/* Polaroid Decoration (Right) */}
      <SmartPhoto 
        src="/photos/cover_pic.jpg"
        caption="Our Memories"
        rotation="10deg"
        className="absolute top-10 right-10 w-24"
        washiColor="bg-pink/25"
      />

      {/* Polaroid Decoration (Top Left) */}
      <SmartPhoto 
        src="/photos/cover_left_pic.jpg"
        caption="Moments"
        rotation="-8deg"
        className="absolute top-10 left-10 w-24"
        washiColor="bg-pink/25"
      />

      {/* Center Text Title - Absolutely Centered */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-12 pointer-events-none select-none z-10">
        <h1 className="text-3.5xl font-caveat text-paperLight tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Our Little Scrapbook
        </h1>
        
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent my-4 mx-auto" />

        <p className="text-sm font-poppins text-pink tracking-wider text-center drop-shadow-sm font-medium leading-relaxed">
          Saksham and Shreya Little Digi Scrapbook
        </p>

        <p className="text-[10px] font-sans italic text-paperLight/60 tracking-wider text-center mt-3">
          "Every page holds a memory."
        </p>
      </div>

      {/* Leaf Doodle */}
      <div className="absolute bottom-6 left-8 z-20 pointer-events-none opacity-40">
        <svg viewBox="0 0 100 150" className="w-14 h-20 stroke-gold/60 fill-none stroke-[1.5]">
          <path d="M20,130 Q45,100 50,20" />
          <path d="M50,20 Q65,15 75,5 Q60,30 50,50" />
          <path d="M50,50 Q25,55 15,65 Q35,65 50,80" />
        </svg>
      </div>
    </div>
  );
});

CoverPage.displayName = 'CoverPage';
export default CoverPage;
