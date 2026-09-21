'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';
import { useAdmin } from '../../context/AdminContext';

export const BrandPartners: React.FC = () => {
  const { partners } = useAdmin();

  if (partners.length === 0) return null;

  // Duplicate the array multiple times to ensure the marquee is wide enough even with few items
  const displayPartners = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-8 bg-[#faf9f5] border-t border-border overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-extrabold uppercase tracking-widest text-amber-700 shadow-xs">
          <Sparkles size={13} className="text-amber-500" /> Authorized Ecosystem
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary mt-1.5">
          Official <WarmUnderline>Brand Partners</WarmUnderline>
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Slider Ticker */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {displayPartners.map((partner, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center mx-6 px-6 py-4 rounded-card bg-white border border-border shadow-xs hover:border-zinc-950 hover:shadow-md transition-all shrink-0 min-w-[200px] h-[80px]"
          >
            <img 
              src={partner.imageUrl} 
              alt={partner.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply" 
              title={partner.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
