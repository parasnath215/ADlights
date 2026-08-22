'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Building2, Globe, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

const STATS = [
  {
    id: 'fixtures',
    target: 1250,
    prefix: '',
    suffix: '+',
    label: 'Fixtures Shipped',
    subtext: 'Amber teardrops, crystal chandeliers & footlights',
    icon: Sparkles
  },
  {
    id: 'projects',
    target: 480,
    prefix: '',
    suffix: '+',
    label: 'Architectural Projects',
    subtext: 'Luxury villas, boutique hotels & modern residences',
    icon: Building2
  },
  {
    id: 'cities',
    target: 100,
    prefix: '',
    suffix: '+',
    label: 'Cities Covered',
    subtext: 'Safe express delivery across India with transit protection',
    icon: Globe
  },
  {
    id: 'satisfaction',
    target: 99.4,
    prefix: '',
    suffix: '%',
    label: 'Client Satisfaction Rate',
    subtext: 'Rated 4.9 / 5 stars based on verified client reviews',
    isDecimal: true,
    icon: Award
  }
];

export const CountdownBanner: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    fixtures: 0,
    projects: 0,
    cities: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds count animation
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        fixtures: Math.floor(1250 * progress),
        projects: Math.floor(480 * progress),
        cities: Math.floor(100 * progress),
        satisfaction: Number((99.4 * progress).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          fixtures: 1250,
          projects: 480,
          cities: 100,
          satisfaction: 99.4
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-10 sm:py-14 bg-zinc-950 text-white overflow-hidden select-none border-b border-zinc-800">
      {/* Dark Lifestyle Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=90"
          alt="Architectural Lighting Background"
          fill
          sizes="100vw"
          className="object-cover brightness-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" />
            Illuminating Excellence
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            Our Impact <WarmUnderline>In Numbers</WarmUnderline>
          </h2>

          <p className="text-xs sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Transforming ordinary spaces into extraordinary atmosphere with precision optics, solid brass engineering, and mouth-blown glass.
          </p>
        </div>

        {/* 4 Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            const value = counts[stat.id] || 0;
            const displayValue = stat.isDecimal ? value.toFixed(1) : value.toLocaleString();

            return (
              <div
                key={stat.id}
                className="bg-zinc-900/80 border border-zinc-800/80 rounded-card p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 shadow-2xl backdrop-blur-md group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-pill border border-zinc-800">
                      ADLIGHTS METRIC
                    </span>
                  </div>

                  {/* Counter Number */}
                  <div className="font-mono font-extrabold text-4xl sm:text-5xl text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {stat.prefix}
                    {displayValue}
                    {stat.suffix}
                  </div>

                  <h3 className="font-display font-extrabold text-base uppercase tracking-tight text-white mt-3">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center gap-2 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  <ShieldCheck size={12} />
                  <span>Verified Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-7 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-900/50 p-5 sm:p-6 rounded-card border border-zinc-800">
          <div>
            <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white">
              Ready to Upgrade Your Lighting Experience?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Explore our best selling collections or request a custom fixture catalog.
            </p>
          </div>

          <Link
            href="/shop"
            className="group px-8 py-3.5 rounded-pill bg-amber-400 text-zinc-950 font-extrabold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Explore All Products</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
