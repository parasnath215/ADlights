'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const CATEGORY_TILES = [
  {
    id: 'hanging-lights',
    label: 'HANGING LIGHTS',
    subtext: 'Amber teardrop & glass cluster pendants',
    image: '/images/hero-pendant-banner.png',
    link: '/shop?category=Pendant'
  },
  {
    id: 'wall-lights',
    label: 'WALL LIGHTS',
    subtext: 'Architectural up/down wall sconces & foot lights',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/WL-107-6-1.png',
    link: '/shop?category=Wall Sconces'
  },
  {
    id: 'chandeliers',
    label: 'CHANDELIERS',
    subtext: 'Mouth-blown crystal globe chandeliers',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/HL-109-3.png',
    link: '/shop?category=Pendant'
  },
  {
    id: 'table-floor-lamps',
    label: 'TABLE & FLOOR LAMPS',
    subtext: 'Cordless touch dining & bedside lamps',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/03/ADLIGHTS-Table-lamps.jpg',
    link: '/shop?category=Table & Desk'
  }
];

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Brand Story Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pb-16 border-b border-border">
          {/* Left Column */}
          <div>
            <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
              Our Philosophy
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-2 leading-[1.08]">
              Lighting engineered as <WarmUnderline>Architectural Art</WarmUnderline>
            </h2>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 mt-8 text-xs font-extrabold uppercase tracking-widest text-text-primary hover:text-amber-600 transition-colors"
            >
              <span>Explore Our Full Lighting Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Right Column Body Copy */}
          <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
            <p>
              Transform ordinary spaces into elegant experiences with thoughtfully designed lighting solutions. From cozy homes to modern workspaces, AURORA DECOR LIGHTS brings warmth, style, and functionality to every corner.
            </p>
            <p>
              Engineered from anodized aluminum, solid brass, and mouth-blown crystal glass, our step lights, pendants, and wall sconces deliver low-glare safety and museum-grade illumination.
            </p>
          </div>
        </div>

        {/* Official Category Tiles Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={tile.link}
              className="group relative rounded-card overflow-hidden bg-bg-muted border border-border flex flex-col justify-between h-80 p-6 transition-transform duration-400 ease-out hover:scale-[1.03]"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* Top Tag */}
              <span className="relative z-10 self-start px-3 py-1 rounded-pill bg-white/90 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                Collection
              </span>

              {/* Bottom Label & Subtext */}
              <div className="relative z-10 text-white">
                <h3 className="font-display font-extrabold text-lg uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {tile.label}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 font-normal">
                  {tile.subtext}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
