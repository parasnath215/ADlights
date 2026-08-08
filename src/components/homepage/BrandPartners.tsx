'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const BRAND_PARTNERS = [
  { name: 'VIHAN', subtitle: 'SPREAD THE LIGHT', accent: 'text-orange-500' },
  { name: 'KEI', subtitle: 'WIRES & CABLES', accent: 'text-blue-500' },
  { name: 'RR KĀBEL', subtitle: 'PREMIUM CABLING', accent: 'text-rose-500' },
  { name: 'WIPRO', subtitle: 'SMART LIGHTING', accent: 'text-purple-500' },
  { name: 'ATOMBERG', subtitle: 'BLDC TECH', accent: 'text-amber-500' },
  { name: 'SCHNEIDER ELECTRIC', subtitle: 'INFRASTRUCTURE', accent: 'text-emerald-500' },
  { name: 'FOCUS LIGHTING', subtitle: 'ARCHITECTURAL LUMINAIRES', accent: 'text-zinc-950' },
  { name: 'JUPITER', subtitle: 'PRECISION OPTICS', accent: 'text-rose-600' },
  { name: 'GEO LITING', subtitle: 'LINEAR FIXTURES', accent: 'text-red-500' },
  { name: 'STAREAGLE', subtitle: 'LED LIGHTING', accent: 'text-amber-600' },
  { name: 'ORIENT ELECTRIC', subtitle: 'LIGHTING SOLUTIONS', accent: 'text-orange-600' },
  { name: 'PHILIPS', subtitle: 'HUE & LUMINAIRES', accent: 'text-blue-600' },
  { name: 'BELEZZA', subtitle: 'LUXURY GLASSWARE', accent: 'text-zinc-800' },
  { name: 'LEDVANCE', subtitle: 'OSRAM TECH', accent: 'text-amber-500' }
];

export const BrandPartners: React.FC = () => {
  return (
    <section className="py-16 bg-[#faf9f5] border-t border-border overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-extrabold uppercase tracking-widest text-amber-700 shadow-xs">
          <Sparkles size={13} className="text-amber-500" /> Authorized Ecosystem
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary mt-2">
          Official <WarmUnderline>Brand Partners</WarmUnderline>
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Slider Ticker */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* Double array for seamless loop */}
        {[...BRAND_PARTNERS, ...BRAND_PARTNERS].map((partner, idx) => (
          <div
            key={idx}
            className="flex items-center mx-6 px-6 py-4 rounded-card bg-white border border-border shadow-xs hover:border-zinc-950 hover:shadow-md transition-all shrink-0"
          >
            <div className="text-left">
              <span className={`font-display font-extrabold text-lg sm:text-xl uppercase tracking-wider block ${partner.accent}`}>
                {partner.name}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-text-secondary block">
                {partner.subtitle}
              </span>
            </div>
            <span className="ml-8 text-amber-400 text-xs">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
