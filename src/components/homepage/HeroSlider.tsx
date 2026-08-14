'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Instagram, Twitter, Facebook, Youtube, Tag } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Aurora Teardrop Glass Pendants',
    subtitle: 'Hand-blown amber teardrop pendants with warm tungsten filaments engineered for pure atmospheric distinction.',
    cta: 'Explore Hanging Collection',
    link: '/shop?category=Pendant',
    image: '/images/hero-pendant-banner.png',
    highlightWord: 'Glass Pendants'
  },
  {
    id: 2,
    title: 'Upgrade Your Lighting Game',
    subtitle: 'Transform ordinary spaces into elegant experiences with thoughtfully designed lighting solutions. From cozy homes to modern workspaces.',
    cta: 'Explore All Fixtures',
    link: '/shop',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/03/Upgrade-Your-Lighting-Game.png',
    highlightWord: 'Lighting Game'
  },
  {
    id: 3,
    title: 'ADLIGHTS Architectural Luminaires',
    subtitle: 'Discover fixtures that bring warmth, style, and functionality to every corner with IP54 outdoor & interior step lights.',
    cta: 'Shop Recessed Step Lights',
    link: '/shop?category=Architectural',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/03/AD-Lights.png',
    highlightWord: 'Luminaires'
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative w-full h-[75vh] sm:h-[85vh] min-h-[480px] sm:min-h-[620px] bg-zinc-950 text-white overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Side Rail (Social Icons + GET 20% OFF vertical badge - 35% Transparent) */}
      <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center bg-zinc-950/65 text-white rounded-pill p-2 shadow-2xl backdrop-blur-md border border-zinc-800/80 w-[40px] sm:w-[42px] transition-all hover:bg-zinc-950/80">
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

        <button
          onClick={() => {
            alert('Use promo code AD20 for 20% OFF your order!');
          }}
          className="group relative flex flex-col items-center py-3 text-amber-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Get 20% Discount"
        >
          <Tag size={14} className="mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
            GET 20% OFF
          </span>
        </button>
      </div>

      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover brightness-75 scale-105 transition-transform duration-[10000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/50" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-14 sm:pl-20 lg:pl-24 flex flex-col justify-center items-start pt-12 sm:pt-16 max-w-full overflow-hidden">
        <div className="max-w-3xl animate-slide-up">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-pill bg-white/10 border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-4 sm:mb-6">
            <Sparkles size={13} className="text-amber-400" />
            <span>Official AURORA DECOR LIGHTS Collection</span>
          </span>

          <h1 className="font-display font-extrabold text-2xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[1.05] text-white break-words">
            {HERO_SLIDES[current].title.split(HERO_SLIDES[current].highlightWord)[0]}
            <WarmUnderline>{HERO_SLIDES[current].highlightWord}</WarmUnderline>
            {HERO_SLIDES[current].title.split(HERO_SLIDES[current].highlightWord)[1]}
          </h1>

          <p className="mt-4 sm:mt-6 text-xs sm:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed">
            {HERO_SLIDES[current].subtitle}
          </p>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <Link
              href={HERO_SLIDES[current].link}
              className="group px-6 py-3.5 sm:px-8 sm:py-4 rounded-pill bg-white text-zinc-950 font-extrabold text-[11px] sm:text-xs uppercase tracking-widest hover:scale-105 hover:bg-amber-300 transition-all duration-300 flex items-center gap-2.5 shadow-xl"
            >
              <span>{HERO_SLIDES[current].cta}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Indicator Dots Bottom-Center */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next Arrows Bottom Corners */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 backdrop-blur-md border border-white/20 transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 backdrop-blur-md border border-white/20 transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};
