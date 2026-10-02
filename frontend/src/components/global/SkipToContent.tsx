import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="absolute left-4 top-[-100px] z-[100] bg-power-red text-white px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 focus:top-4 focus:outline-none"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
