'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Pause, Sparkles } from 'lucide-react';

export const CinematicBanner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] bg-zinc-950 text-white overflow-hidden flex items-center justify-center">
      {/* Background Image / Slow Pan simulation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=90"
          alt="Cinematic Lighting Experience"
          fill
          className={`object-cover brightness-60 transition-transform duration-[20000ms] ${
            isPlaying ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/60" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-6">
          <Sparkles size={14} className="text-amber-400" />
          Cinematic Atmosphere
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-none">
          Immerse Your Space in Warm Ambient Radiance
        </h2>

        <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal">
          Designed in Milan. Engineered with precision 2700K optical diffusers for zero flicker, zero eye fatigue, and absolute luxury ambience.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/product/halo-chandelier"
            className="group px-8 py-4 rounded-pill bg-white text-zinc-950 font-extrabold text-xs uppercase tracking-widest hover:scale-105 hover:bg-amber-300 transition-all duration-300 flex items-center gap-3 shadow-2xl"
          >
            <span>Explore Halo Chandelier</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Play/Pause Toggle Button Bottom-Right */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 text-xs font-semibold"
        aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span className="hidden sm:inline uppercase tracking-widest text-[10px]">
          {isPlaying ? 'Pause Motion' : 'Play Motion'}
        </span>
      </button>
    </section>
  );
};
