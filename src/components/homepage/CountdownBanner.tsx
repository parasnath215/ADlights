'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

export const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="relative py-12 sm:py-24 bg-zinc-950 text-white overflow-hidden select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1600&q=80"
          alt="Limited Flash Sale Atmosphere"
          fill
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Column: Content */}
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-pill bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
            <Flame size={13} className="text-rose-400" />
            Limited Architectural Flash Event
          </span>

          <h2 className="font-display font-extrabold text-2xl sm:text-5xl uppercase tracking-tighter leading-tight text-white">
            Private VIP Discount Ends Soon
          </h2>

          <p className="mt-3 text-xs sm:text-base text-zinc-300">
            Enjoy <strong>15% OFF</strong> on all Solis Hand-Blown Amber Pendants and Halo Ring Chandeliers. Complimentary express shipping on orders over ₹5999.
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
            <Link
              href="/shop?badge=Sale"
              className="group px-6 py-3.5 sm:px-8 sm:py-4 rounded-pill bg-amber-400 text-zinc-950 font-extrabold text-xs uppercase tracking-widest hover:scale-105 hover:bg-white transition-all duration-300 flex items-center gap-2.5 shadow-2xl"
            >
              <span>Shop Flash Event</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Flip-Digit Countdown Display (Fully mobile responsive) */}
        <div className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-6 bg-zinc-900/90 p-4 sm:p-8 rounded-card border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
          {[
            { label: 'DAYS', val: formatDigit(timeLeft.days) },
            { label: 'HOURS', val: formatDigit(timeLeft.hours) },
            { label: 'MINS', val: formatDigit(timeLeft.minutes) },
            { label: 'SECS', val: formatDigit(timeLeft.seconds) }
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                {/* Digit Box */}
                <div className="w-13 h-16 sm:w-20 sm:h-24 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono font-extrabold text-lg sm:text-4xl text-amber-300 shadow-inner overflow-hidden relative">
                  <span key={item.val} className="animate-slide-up inline-block">
                    {item.val}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-zinc-400 mt-1.5">
                  {item.label}
                </span>
              </div>

              {idx < 3 && (
                <span className="font-mono font-bold text-lg sm:text-3xl text-amber-400 mb-4 sm:mb-6">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
