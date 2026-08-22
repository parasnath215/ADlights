'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Sparkles } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    location: 'Mumbai, MH',
    role: 'Homeowner & Architect',
    rating: 5,
    date: 'August 2026',
    verified: true,
    product: 'Aurora Teardrop Glass Pendants',
    title: 'Transformed our staircase completely!',
    quote: 'The warm amber glow from the teardrop glass pendants is absolutely breathtaking. Everyone who steps into our foyer immediately asks where we bought these fixtures. Museum-grade finish!'
  },
  {
    id: 'rev-2',
    author: 'Vikramaditya Mehta',
    location: 'New Delhi, DL',
    role: 'Lead Designer, Studio V',
    rating: 5,
    date: 'July 2026',
    verified: true,
    product: 'ADL StepGlow 2W Recessed Foot Light',
    title: 'Flawless low-glare safety lighting',
    quote: 'We specified ADLIGHTS foot lights across a 12,000 sq.ft private estate. Zero glare, crisp warm temperature, and robust IP54 build quality. Our client could not be happier.'
  },
  {
    id: 'rev-3',
    author: 'Priya Nair',
    location: 'Bengaluru, KA',
    role: 'Interior Decorator',
    rating: 5,
    date: 'July 2026',
    verified: true,
    product: 'Aurora Luxe 3-Light Crystal Chandelier',
    title: 'Stunning craftsmanship & gold radiance',
    quote: 'The mouth-blown crystal globes catch the evening light so beautifully. Dispatch was fast, packaging was super protective, and installation was seamless.'
  },
  {
    id: 'rev-4',
    author: 'Rohan Deshmukh',
    location: 'Pune, MH',
    role: 'Villa Owner',
    rating: 5,
    date: 'June 2026',
    verified: true,
    product: 'Royal Vintage Antique Gold Wall Lantern',
    title: 'Brings royal character to our villa entrance',
    quote: 'Solid brass feel, heavy glass, and weather-resistant sealing. Stood up to monsoon rain without a single issue. Definitely worth every rupee!'
  },
  {
    id: 'rev-5',
    author: 'Kavita Reddy',
    location: 'Hyderabad, TS',
    role: 'Boutique Hotelier',
    rating: 5,
    date: 'June 2026',
    verified: true,
    product: 'Modern Opal Glass Cluster Chandelier',
    title: 'Elevated our lobby atmosphere tenfold',
    quote: 'We replaced generic ceiling fixtures with ADLIGHTS opal globes. The difference in ambiance is night and day. Guests comment on the lighting daily.'
  },
  {
    id: 'rev-6',
    author: 'Siddharth Varma',
    location: 'Chennai, TN',
    role: 'Architectural Consultant',
    rating: 5,
    date: 'May 2026',
    verified: true,
    product: 'Natural Rattan Cane Tripod Lamp',
    title: 'Warm accent lighting for cozy spaces',
    quote: 'Craftsmanship is top-notch. The woven texture filters light into soft pattern shadows. Perfect for luxury reading corners and lounge suites.'
  }
];

export const TestimonialSlider: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const visibleCount = 3;
  const maxStart = Math.max(0, REVIEWS.length - visibleCount);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, maxStart]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const visibleReviews = REVIEWS.slice(startIndex, startIndex + visibleCount);

  return (
    <section
      className="py-10 sm:py-12 bg-zinc-950 text-white border-b border-zinc-800 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-amber-400 mb-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-zinc-900 border border-zinc-800">
            <Sparkles size={14} />
            <span>Verified Customer Reviews</span>
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
            What Our Clients <WarmUnderline>Say</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Rated <strong className="text-amber-400 font-mono">4.9 / 5.0</strong> based on 480+ verified architectural projects across India.
          </p>
        </div>

        {/* 3 Reviews Grid in One Screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900/90 border border-zinc-800/80 rounded-card p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 shadow-xl relative group"
            >
              <div>
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-pill border border-emerald-800/50">
                      <CheckCircle size={10} /> Verified Purchase
                    </span>
                  )}
                </div>

                {/* Review Headline */}
                <h3 className="font-display font-bold text-base text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Review Body Quote */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                  {rev.quote}
                </p>
              </div>

              <div>
                {/* Product Tagged */}
                <div className="pt-4 border-t border-zinc-800/80 mb-4 text-[10px] uppercase font-bold tracking-wider text-amber-400 truncate">
                  Purchased: {rev.product}
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 font-extrabold text-xs flex items-center justify-center shadow-md shrink-0">
                    {rev.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-white truncate">{rev.author}</h4>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {rev.role} • {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation: Left Arrow, Indicators, Right Arrow */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Reviews"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Carousel Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxStart + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === startIndex ? 'w-8 bg-amber-400' : 'w-2 bg-zinc-800 hover:bg-zinc-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Reviews"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
