import React from 'react';

export default function UnlockQuestion({ question }) {
  return (
    <div className="text-center my-4">
      <p className="font-sans text-[10px] uppercase tracking-widest text-[#cca52d] font-bold mb-1">
        Unlock Question
      </p>
      <h3 className="font-caveat text-2xl sm:text-3xl text-[#301f14] font-bold leading-tight px-4 select-none">
        "{question}"
      </h3>
    </div>
  );
}
