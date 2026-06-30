import React from 'react';

export default function BookNavigation({ 
  onPrev, 
  onNext, 
  currentPage, 
  totalPages,
  isPrevDisabled, 
  isNextDisabled,
  nextLabel = "Next" 
}) {
  return (
    <div className="flex items-center gap-6 mt-6 z-30 select-none bg-paperLight/80 backdrop-blur-sm px-6 py-2 rounded-full border border-brown/10 shadow-sm font-sans">
      
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="text-xs uppercase tracking-wider text-brown hover:text-gold disabled:opacity-30 disabled:hover:text-brown transition-colors cursor-pointer disabled:cursor-not-allowed font-semibold px-2 py-1"
      >
        Prev
      </button>

      {/* Page indicator */}
      <span className="text-sm font-medium text-textDark/70 tracking-widest min-w-[80px] text-center">
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="text-xs uppercase tracking-wider text-[#a33835] hover:text-gold disabled:opacity-30 disabled:hover:text-brown transition-colors cursor-pointer disabled:cursor-not-allowed font-bold px-2 py-1"
      >
        {nextLabel}
      </button>
    </div>
  );
}
