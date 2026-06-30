import React from 'react';
import { motion } from 'framer-motion';
import BookPage from '../BookPage';
import { useEasterEggs } from '../../../context/EasterEggContext';
import SmartPhoto from '../../UI/SmartPhoto';
import { assetUrl } from '../../../utils/assetUrl';

export const PageOne = React.forwardRef((props, ref) => {
  const { triggerCompliment, toggleNightMode, clickStar } = useEasterEggs();

  // Animation variants for writing the title character-by-character
  const titleContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const titleChar = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 120, damping: 10 } 
    }
  };

  // Animation variants for paragraphs fading in line by line
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.7
      }
    }
  };

  const letterParagraph = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  return (
    <BookPage ref={ref} {...props} isLeft={true} className="relative bg-[#fffef9] overflow-hidden">
      
      {/* 1. Moving warm light sweep effect in the background */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-65"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(254, 240, 138, 0.18) 0%, transparent 60%)',
          animation: 'pulse 12s ease-in-out infinite alternate'
        }}
      />

      {/* 2. Coffee Stain Background decoration (bottom-left) */}
      <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-[0.07] pointer-events-none mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8b5e3c]">
          <path d="M50,10 C75,10 90,25 90,50 C90,75 75,90 50,90 C25,90 10,75 10,50 C10,25 25,10 50,10 Z" />
          <path d="M48,18 C68,18 82,30 82,50 C82,70 68,82 48,82 C28,82 18,70 18,50 C18,30 28,18 48,18 Z" className="opacity-60" />
        </svg>
      </div>

      {/* 3. Swaying pressed flower sketch (top-left) - Interactive Easter Egg */}
      <motion.div 
        onClick={triggerCompliment}
        className="absolute top-6 left-6 w-20 h-40 origin-bottom cursor-pointer group z-20"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        title="Click the pressed flower"
      >
        <svg viewBox="0 0 100 200" className="w-full h-full stroke-brown/55 fill-none stroke-[2] drop-shadow-sm group-hover:stroke-gold/80 transition-colors duration-300">
          {/* Stem */}
          <path d="M50,185 C50,135 46,85 52,25" />
          {/* Leaves */}
          <path d="M50,145 Q66,135 72,125 Q58,130 50,145" className="fill-[#8da280]/15 stroke-[#728566]/80" />
          <path d="M49,115 Q32,110 25,100 Q40,105 49,115" className="fill-[#8da280]/15 stroke-[#728566]/80" />
          <path d="M51,85 Q70,75 77,65 Q60,70 51,85" className="fill-[#8da280]/15 stroke-[#728566]/80" />
          {/* Flower head */}
          <path d="M52,25 Q63,15 52,5 Q41,15 52,25" className="fill-[#e8c3b9]/30 stroke-[#d29b8c]/90" />
          <circle cx="52" cy="15" r="3" className="fill-gold/80" />
          <path d="M57,35 Q68,28 63,18 Q54,23 57,35" className="fill-[#e8c3b9]/30 stroke-[#d29b8c]/90" />
          <path d="M47,35 Q36,28 41,18 Q50,23 47,35" className="fill-[#e8c3b9]/30 stroke-[#d29b8c]/90" />
        </svg>
      </motion.div>

      {/* 4. Top Header Label with Moon Toggle */}
      <div className="absolute top-6 left-28 right-6 flex justify-between items-center select-none z-20">
        <span className="text-[9px] font-sans tracking-widest uppercase text-brown/40 font-semibold">February 2025</span>
        <button 
          onClick={toggleNightMode}
          className="text-brown/40 hover:text-gold transition-colors cursor-pointer p-1"
          title="Toggle Night Mode"
          aria-label="Toggle Night Mode"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      {/* 5. Polaroid First Photo (Top Right) - Slides gently from the right */}
      {/* 5. Polaroid First Photo (Top Right) - Slides gently from the right */}
      <motion.div
        initial={{ x: 60, opacity: 0, rotate: 0 }}
        animate={{ x: 0, opacity: 1, rotate: 7 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.6 }}
        className="absolute top-12 right-6 z-20 pointer-events-none"
        style={{ transformOrigin: 'center center' }}
      >
        <SmartPhoto 
          src={assetUrl('/photos/first_pic.jpg')}
          caption="Where it all began... (02 Feb 2025)"
          rotation="0deg"
          className="w-[135px] pointer-events-auto"
          washiColor="bg-pink/30"
        />
      </motion.div>


      {/* 6. Main Handwritten Title (Left Side of Page) */}
      <div className="absolute top-14 left-28 select-none z-10">
        <motion.h2 
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="font-caveat text-4.5xl text-textDark leading-none font-bold rotate-[-2deg]"
        >
          {Array.from("Our Story Begins").map((char, index) => (
            <motion.span key={index} variants={titleChar} className="inline-block whitespace-pre">
              {char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Handwritten underline ink scribble */}
        <svg viewBox="0 0 160 10" className="w-40 h-2.5 stroke-pink/45 fill-none stroke-[2] mt-1 ml-1">
          <path d="M5,5 Q40,2 80,6 T155,4 Q100,5 5,5" />
        </svg>
      </div>

      {/* 7. Introduction Letter Body (Center & Bottom area) */}
      <div className="flex-1 flex flex-col justify-end p-4 pl-10 pr-6 pb-12 mt-40">
        <motion.div 
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="font-caveat text-[14.5px] leading-relaxed text-textDark/90 text-left space-y-3.5 select-text selection:bg-pink/20"
        >
          <motion.p variants={letterParagraph} className="font-bold text-textDark">
            My Dearest Shreya, ❤️
          </motion.p>

          <motion.p variants={letterParagraph}>
            Before you turn these pages, let me share something from my heart...
          </motion.p>

          <motion.p variants={letterParagraph}>
            Sometimes I still wonder how someone as wonderful as you became such an important part of my life. Meeting you is one of the greatest blessings I've ever received, and I genuinely thank God for bringing you into my life. Every Tuesday when I visit the temple, one of my prayers is simply filled with gratitude—for you, for us, and for everything we've shared together.
          </motion.p>

          <motion.p variants={letterParagraph}>
            This scrapbook isn't just a collection of photos. It's a little piece of my heart. Every page holds a memory, every picture has a story, and every word has been written with love. I wanted to create something that you could come back to whenever you miss us, whenever you smile thinking about our moments, or whenever you simply want to remember how special you are to me.
          </motion.p>

          <motion.p variants={letterParagraph}>
            No matter where life takes us, I promise I'll always stand beside you, support you, make you laugh, and create countless more memories together.
          </motion.p>

          <motion.p variants={letterParagraph} className="font-bold text-[#a33835]">
            Now, let's go back to where our beautiful story began... ❤️
          </motion.p>
        </motion.div>
      </div>

      {/* 8. Bottom Decoration Details & Page Footer */}
      {/* Tiny heart doodles scattered near bottom */}
      <div className="absolute bottom-10 left-10 opacity-30 pointer-events-none">
        <svg viewBox="0 0 20 20" className="w-5 h-5 fill-pink">
          <path d="M10,18 L8.5,16.5 C3.5,12 1,9.5 1,6.5 C1,4 3,2 5.5,2 C7,2 8.5,3 10,4.5 C11.5,3 13,2 14.5,2 C17,2 19,4 19,6.5 C19,9.5 16.5,12 11.5,16.5 L10,18 Z" />
        </svg>
      </div>

      {/* "Turn the page..." indicator (bottom-right) */}
      <div className="absolute bottom-6 right-8 select-none z-20 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity duration-300">
        <span className="font-caveat text-sm text-pink/85 italic rotate-[-2deg]">
          Turn the page...
        </span>
        <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-pink/85 animate-[pulse_2s_ease-in-out_infinite]">
          <path d="M10,18 L8.5,16.5 C3.5,12 1,9.5 1,6.5 C1,4 3,2 5.5,2 C7,2 8.5,3 10,4.5 C11.5,3 13,2 14.5,2 C17,2 19,4 19,6.5 C19,9.5 16.5,12 11.5,16.5 L10,18 Z" />
        </svg>
      </div>

      {/* Secret Star 1 Easter Egg Trigger (bottom-left) */}
      <button
        onClick={() => clickStar(1)}
        className="absolute bottom-4 left-6 text-brown/10 hover:text-gold/60 transition-colors cursor-pointer p-1 z-20"
        title="Secret Star"
        aria-label="Secret Star 1"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Page number footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none select-none">
        <span className="text-[10px] font-sans tracking-widest text-brown/30 uppercase">Page 1</span>
      </div>

    </BookPage>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
