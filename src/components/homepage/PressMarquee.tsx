'use client';

import React from 'react';

const PRESS_LOGOS = [
  { name: 'ARCHITECTURAL DIGEST', text: 'ARCHITECTURAL DIGEST' },
  { name: 'WALLPAPER*', text: 'WALLPAPER*' },
  { name: 'ELLE DECOR', text: 'ELLE DECOR' },
  { name: 'DEZEEN', text: 'DEZEEN' },
  { name: 'ARCHDAILY', text: 'ARCHDAILY' },
  { name: 'VOGUE LIVING', text: 'VOGUE LIVING' },
  { name: 'DWELL', text: 'DWELL' },
  { name: 'SURFACE MAGAZINE', text: 'SURFACE' }
];

export const PressMarquee: React.FC = () => {
  return (
    <section className="bg-[#f2c98a] py-6 overflow-hidden border-y border-amber-300/80 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* Double array for seamless loop */}
        {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, idx) => (
          <div key={idx} className="flex items-center mx-8">
            <span className="font-display font-extrabold text-lg sm:text-xl text-zinc-950 uppercase tracking-widest opacity-85 hover:opacity-100 transition-opacity whitespace-nowrap">
              {logo.text}
            </span>
            <span className="ml-8 text-zinc-950/40 text-xs">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
