'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Award, Globe, Leaf } from 'lucide-react';
import { WarmUnderline } from '../../components/ui/WarmUnderline';
import { TrustBadges } from '../../components/homepage/TrustBadges';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-zinc-950 text-white py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-4">
            <Sparkles size={14} className="text-amber-400" /> Our Heritage
          </span>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter leading-tight">
            Elevating Spaces Through <WarmUnderline>Architectural Warmth</WarmUnderline>
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 mt-4 max-w-2xl mx-auto font-normal">
            ADLIGHTS designs museum-grade step lights, mouth-blown crystal chandeliers, and precision wall sconces engineered for pure atmospheric distinction.
          </p>
        </div>
      </div>

      {/* Main Philosophy & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-4/3 rounded-card overflow-hidden bg-bg-muted border border-border shadow-2xl">
            <Image
              src="https://adlights.stellarweb.in/wp-content/uploads/2026/03/AD-Lights.png"
              alt="ADLIGHTS Studio Craftsmanship"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Design Excellence
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
              Crafted with Precision Aircraft Aluminum & Italian Glass
            </h2>

            <p className="text-sm text-text-secondary leading-relaxed">
              At ADLIGHTS, we believe lighting should not merely brighten a space—it should shape architectural volume, cast rich shadows, and regulate circadian well-being.
            </p>

            <p className="text-sm text-text-secondary leading-relaxed">
              From our IP54 recessed foot lights engineered with anti-glare downward louvers to our mouth-blown crystal chandeliers, every luminaire undergoes rigorous thermal dissipation testing and 98+ CRI color rendering calibration.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="font-mono font-bold text-3xl text-zinc-950">50,000+</span>
                <span className="block text-xs text-text-secondary">Operating Hours</span>
              </div>
              <div className="h-10 w-[1px] bg-border" />
              <div>
                <span className="font-mono font-bold text-3xl text-zinc-950">CRI 98+</span>
                <span className="block text-xs text-text-secondary">True Color Optics</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of ADLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Award,
              title: 'Museum-Grade Quality',
              desc: 'High-efficiency COB LED arrays calibrated for zero flicker and long operational lifespan.'
            },
            {
              icon: ShieldCheck,
              title: '5-Year Guarantee',
              desc: 'Complete warranty coverage on driver electronics and anodized metal finishes.'
            },
            {
              icon: Globe,
              title: 'Global White-Glove Delivery',
              desc: 'Complimentary express insured courier delivery on all orders over $150.'
            },
            {
              icon: Leaf,
              title: 'Eco-Conscious Anodization',
              desc: '100% recyclable alloy casing and eco-packaged for minimal environmental footprint.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-card bg-bg-muted border border-border space-y-3">
                <div className="p-3 rounded-full bg-zinc-950 text-amber-400 inline-block">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="p-12 rounded-card bg-zinc-950 text-white text-center space-y-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter">
            Ready to Transform Your Architecture?
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto">
            Browse our full catalog of recessed step lights, chandeliers, and wall sconces.
          </p>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-pill bg-white text-zinc-950 font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2"
            >
              <span>Explore Lighting Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <TrustBadges />
    </div>
  );
}
