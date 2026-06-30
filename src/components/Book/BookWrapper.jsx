import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import CoverPage from './pages/CoverPage';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';
import PageFive from './pages/PageFive';
import PageSix from './pages/PageSix';
import PageSeven from './pages/PageSeven';
import PageEight from './pages/PageEight';
import PageNine from './pages/PageNine';
import PageTen from './pages/PageTen';
import BookNavigation from './BookNavigation';
import { useEasterEggs } from '../../context/EasterEggContext';
import { useAudio } from '../../context/AudioContext';

export default function BookWrapper({ onEnding }) {
  const flipBookRef = useRef(null);
  const containerRef = useRef(null);
  
  const { isSecretUnlocked } = useEasterEggs();
  const { playSFX } = useAudio();
  const [scale, setScale] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  const totalPages = isSecretUnlocked ? 10 : 8;

  // 1. Auto-open book cover on mount after transition zoom completes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (flipBookRef.current) {
        // Programmatically flip to page 1 (reveals Page 1 & 2 spread)
        flipBookRef.current.pageFlip().flip(1);
      }
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // 2. CSS Transform Scaling for perfect mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const targetWidth = 940; // 900px book width + padding buffer
      if (containerWidth < targetWidth) {
        setScale(containerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Keyboard Navigation (Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!flipBookRef.current) return;
      const pageFlip = flipBookRef.current.pageFlip();
      if (!pageFlip) return;

      if (event.key === 'ArrowLeft') {
        pageFlip.flipPrev();
      } else if (event.key === 'ArrowRight') {
        if (currentPageIndex >= totalPages - 1) {
          if (onEnding) onEnding();
        } else {
          pageFlip.flipNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, totalPages, onEnding]);

  // 4. Navigation Click Handlers
  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex >= totalPages - 1) {
      if (onEnding) onEnding();
    } else if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e) => {
    setCurrentPageIndex(e.data);
    playSFX('pageFlip');
  };

  // Convert raw 0-based pageFlip state to double-page user format
  const getPageNumberString = () => {
    if (currentPageIndex === 0) return "Cover";
    const startPage = currentPageIndex; // Left page is always odd index in double spread
    const endPage = Math.min(startPage + 1, totalPages);
    return `${startPage}-${endPage}`;
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center py-6 relative">
      {/* Scaled Book Frame with breathing animation */}
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'center center', 
          width: '900px', 
          height: '650px' 
        }} 
        className="flex items-center justify-center relative rounded-2xl shadow-[0_20px_50px_rgba(42,33,27,0.28)] bg-[#2b1b11] p-[4px] border border-[#3e2c20]"
      >
        {/* Shadow Overlay representing page spine in center */}
        <div className="absolute top-[4px] bottom-[4px] left-[450px] w-6 -translate-x-1/2 z-30 book-gutter-ring pointer-events-none" />

        {/* HTMLFlipBook Instance */}
        <HTMLFlipBook
          ref={flipBookRef}
          width={450}
          height={650}
          size="fixed"
          display="double"
          usePortrait={false}
          minWidth={450}
          maxWidth={450}
          minHeight={650}
          maxHeight={650}
          maxShadowOpacity={0.4}
          showCover={true} // closed cover on page 0
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="overflow-hidden rounded-xl"
        >
          {/* Construct a clean flat array of children, filtering out falsy/null values */}
          {[
            <CoverPage key="cover" />,
            <PageOne key="p1" />,
            <PageTwo key="p2" />,
            <PageThree key="p3" />,
            <PageFour key="p4" />,
            <PageFive key="p5" />,
            <PageSix key="p6" />,
            <PageSeven key="p7" />,
            <PageEight key="p8" />,
            isSecretUnlocked ? <PageNine key="p9" /> : null,
            isSecretUnlocked ? <PageTen key="page10" /> : null
          ].filter(Boolean)}
        </HTMLFlipBook>
      </div>

      {/* Book Navigation controls */}
      <BookNavigation
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        currentPage={getPageNumberString()}
        totalPages={totalPages}
        isPrevDisabled={currentPageIndex <= 0}
        isNextDisabled={false}
        nextLabel={currentPageIndex >= totalPages - 1 ? "Close Book ❤️" : "Next"}
      />
    </div>
  );
}
