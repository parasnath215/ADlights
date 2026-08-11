'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const CATEGORIES = [
  {
    id: 'hanging-lights',
    title: 'Hanging Pendants',
    subtext: 'Amber teardrop & mouth-blown glass clusters',
    count: '24+ Fixtures',
    image: '/images/hero-pendant-banner.png',
    link: '/shop?category=Pendant'
  },
  {
    id: 'wall-lights',
    title: 'Wall Sconces & Lights',
    subtext: 'Architectural up/down sconces & low-glare beams',
    count: '18+ Fixtures',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/WL-107-6-1.png',
    link: '/shop?category=Wall Sconces'
  },
  {
    id: 'chandeliers',
    title: 'Crystal Chandeliers',
    subtext: 'Cascading gold & crystal globe chandeliers',
    count: '15+ Fixtures',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/HL-109-3.png',
    link: '/shop?category=Pendant'
  },
  {
    id: 'table-floor-lamps',
    title: 'Table & Floor Lamps',
    subtext: 'Cordless touch dining & natural rattan tripod lamps',
    count: '12+ Fixtures',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/03/ADLIGHTS-Table-lamps.jpg',
    link: '/shop?category=Table & Desk'
  },
  {
    id: 'outdoor-ip65',
    title: 'Outdoor IP65 Lights',
    subtext: 'Weatherproof lanterns, coach lights & gate pillars',
    count: '20+ Fixtures',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/OL-107-5.png',
    link: '/shop?category=Outdoor IP65'
  },
  {
    id: 'architectural-footlights',
    title: 'Architectural Step Lights',
    subtext: 'Recessed low-level LED foot lights for stairs & walls',
    count: '16+ Fixtures',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png',
    link: '/shop?category=Architectural'
  }
];

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-bg-muted border border-border text-xs font-bold uppercase tracking-widest text-text-secondary">
            <Sparkles size={13} className="text-amber-500" />
            Curated Collections
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-2">
            Explore By <WarmUnderline>Category</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-3 max-w-xl mx-auto">
            Discover precision-engineered luminaires tailored for modern interiors, staircases, and outdoor architectural spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative rounded-card overflow-hidden bg-bg-muted border border-border flex flex-col justify-between h-80 p-6 transition-all duration-500 hover:border-zinc-950 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/20" />
              </div>

              {/* Top Tag: Fixture Count */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="px-3 py-1 rounded-pill bg-white/90 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                  {cat.count}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 text-white">
                <h3 className="font-display font-extrabold text-xl uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 font-normal line-clamp-2">
                  {cat.subtext}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
