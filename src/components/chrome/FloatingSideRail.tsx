'use client';

import React from 'react';
import { Instagram, Youtube, Twitter, Facebook, Tag } from 'lucide-react';

interface FloatingSideRailProps {
  onOpenPromo: () => void;
}

export const FloatingSideRail: React.FC<FloatingSideRailProps> = ({ onOpenPromo }) => {
  return (
    <aside className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center bg-zinc-950/90 text-white rounded-pill p-2 shadow-2xl backdrop-blur-md border border-zinc-800/80 w-[42px] transition-all hover:bg-zinc-950">
      {/* Social Icons */}
      <div className="flex flex-col gap-3 py-2 text-zinc-400">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors p-1"
          aria-label="Instagram"
        >
          <Instagram size={15} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors p-1"
          aria-label="Twitter X"
        >
          <Twitter size={15} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors p-1"
          aria-label="Facebook"
        >
          <Facebook size={15} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors p-1"
          aria-label="YouTube"
        >
          <Youtube size={15} />
        </a>
      </div>

      <div className="w-5 h-[1px] bg-zinc-800 my-2" />

      {/* Rotated 20% OFF tab trigger button */}
      <button
        onClick={onOpenPromo}
        className="group relative flex flex-col items-center py-3 text-amber-300 hover:text-white transition-colors cursor-pointer"
        aria-label="Get 20% Discount"
      >
        <Tag size={14} className="mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
          GET 20% OFF
        </span>
      </button>
    </aside>
  );
};
