import React from 'react';
import clsx from 'clsx';

export const BookPage = React.forwardRef(({ children, className, isLeft = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "relative w-[450px] h-[650px] bg-[#fdfaf2] flex flex-col justify-between p-8 overflow-hidden select-none",
        isLeft ? "book-page-left book-page-stack-left" : "book-page-right book-page-stack-right",
        className
      )}
      style={{
        ...props.style,
        boxShadow: isLeft 
          ? 'inset -30px 0 35px -15px rgba(40,25,15,0.18), -2px 0 8px rgba(0,0,0,0.06)' 
          : 'inset 30px 0 35px -15px rgba(40,25,15,0.18), 2px 0 8px rgba(0,0,0,0.06)'
      }}
    >
      {/* 1. Base paper noise texture overlay */}
      <div className="paper-texture-overlay opacity-8 pointer-events-none" />

      {/* 2. Pressed paper fibers pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,15 Q30,12 40,20 T70,18 T90,30' stroke='%238b5e3c' stroke-width='0.4' fill='none'/%3E%3Cpath d='M25,80 Q45,75 55,85 T80,78' stroke='%238b5e3c' stroke-width='0.3' fill='none'/%3E%3Cpath d='M5,50 Q15,48 20,53 T50,45' stroke='%238b5e3c' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px'
        }}
      />

      {/* 3. Page Imperfections (Coffee Stains & Creases) */}
      {isLeft ? (
        <>
          {/* Coffee Stain bottom-left */}
          <div 
            className="absolute -bottom-6 -left-6 w-28 h-24 rounded-full opacity-[0.06] pointer-events-none mix-blend-multiply"
            style={{
              background: 'radial-gradient(circle, #8b5e3c 10%, transparent 70%)',
              filter: 'blur(3px)'
            }}
          />
          {/* Subtle paper scratch/crease top-left */}
          <div className="absolute top-6 left-6 w-16 h-[1px] bg-black/10 rotate-[22deg] pointer-events-none opacity-40" />
          {/* Corner Crease Fold (dog-ear) */}
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#eae3d5] shadow-[1px_-1px_2px_rgba(0,0,0,0.1)] rounded-tr pointer-events-none border-t border-r border-black/10" />
        </>
      ) : (
        <>
          {/* Coffee Stain top-right */}
          <div 
            className="absolute -top-8 -right-8 w-32 h-28 rounded-full opacity-[0.05] pointer-events-none mix-blend-multiply"
            style={{
              background: 'radial-gradient(circle, #8b5e3c 20%, transparent 85%)',
              filter: 'blur(4px)'
            }}
          />
          {/* Tiny paper scratch bottom-right */}
          <div className="absolute bottom-10 right-8 w-20 h-[1px] bg-black/15 rotate-[-15deg] pointer-events-none opacity-30" />
          {/* Corner Crease Fold (dog-ear) */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#eae3d5] shadow-[-1px_-1px_2px_rgba(0,0,0,0.1)] rounded-tl pointer-events-none border-t border-l border-black/10" />
        </>
      )}

      {/* Decorative vintage page border */}
      <div className={clsx(
        "absolute inset-4 border border-brown/10 pointer-events-none rounded-lg",
        isLeft ? "mr-6" : "ml-6"
      )} />

      {/* Page Content */}
      <div className="relative w-full h-full flex flex-col justify-between z-10">
        {children}
      </div>
    </div>
  );
});

BookPage.displayName = 'BookPage';
export default BookPage;
