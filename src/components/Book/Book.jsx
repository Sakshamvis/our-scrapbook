import React from 'react';
import BookWrapper from './BookWrapper';

export default function Book({ onEnding }) {
  return (
    <div 
      id="component-book" 
      className="w-full min-h-screen py-16 flex flex-col items-center justify-center relative bg-paper overflow-hidden px-4"
    >
      {/* Background paper texture overlay */}
      <div className="paper-texture-overlay" />
      
      {/* Decorative subtitle label */}
      <div className="text-center mb-8 z-10">
        <h2 className="font-caveat text-4xl text-textDark mb-1 select-none">Our Story Lane</h2>
        <p className="font-sans text-xs tracking-widest uppercase text-brown/50 select-none">Flip the pages to read through the chapters</p>
      </div>

      {/* The main interactive flipbook */}
      <BookWrapper onEnding={onEnding} />
    </div>
  );
}
