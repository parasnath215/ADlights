'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  Globe,
  Leaf,
  MapPin,
  Phone,
  Mail,
  Zap,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { WarmUnderline } from '../../components/ui/WarmUnderline';
import { TrustBadges } from '../../components/homepage/TrustBadges';

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen">
      {/* Editorial Luxury Ambient Hero Header */}
      <div className="bg-zinc-950 text-white py-20 sm:py-28 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-6">
            <Sparkles size={14} className="text-amber-400" /> The Atelier & Philosophy
          </span>

          <h1 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tighter leading-none max-w-4xl mx-auto">
            Sculpting Space Through <WarmUnderline>Architectural Light</WarmUnderline>
          </h1>

          <p className="text-sm sm:text-xl text-zinc-300 mt-6 max-w-2xl mx-auto font-normal leading-relaxed">
            AURORA DECOR LIGHTS designs museum-grade foot lights, mouth-blown crystal chandeliers, and IP65 linear fixtures engineered for warm, atmospheric distinction.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <span className="font-mono font-extrabold text-3xl sm:text-4xl text-amber-400 block">50,000+</span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">L70 Rated Operating Hours</span>
            </div>
            <div>
              <span className="font-mono font-extrabold text-3xl sm:text-4xl text-white block">CRI 98+</span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">True Spectrum Optics</span>
            </div>
            <div>
              <span className="font-mono font-extrabold text-3xl sm:text-4xl text-amber-400 block">IP65</span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Weatherproof Engineering</span>
            </div>
            <div>
              <span className="font-mono font-extrabold text-3xl sm:text-4xl text-white block">5-Year</span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Electronics Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Narrative & Craftsmanship Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 relative aspect-4/3 rounded-card overflow-hidden bg-bg-muted border border-border shadow-2xl group">
            <Image
              src="https://adlights.stellarweb.in/wp-content/uploads/2026/03/AD-Lights.png"
              alt="AURORA DECOR LIGHTS Craftsmanship"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Atelier Studio</span>
              <p className="font-display font-bold text-lg">Precision Thermal Dissipation & Hand Finishing</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Design Philosophy
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight leading-tight">
              Where Engineering Meets Italian Glassmaking
            </h2>

            <p className="text-sm text-text-secondary leading-relaxed">
              At AURORA DECOR LIGHTS, we believe luminaires should never merely illuminate—they should shape architectural volume, cast rich shadows, and elevate circadian well-being.
            </p>

            <p className="text-sm text-text-secondary leading-relaxed">
              From our IP54 recessed step lights engineered with anti-glare downward louvers to our mouth-blown crystal chandeliers, every fixture undergoes rigorous thermal dissipation testing and 98+ CRI color rendering calibration.
            </p>

            <div className="pt-2 space-y-3">
              {[
                'CNC Machined Aircraft-Grade Aluminum Casing',
                'Mouth-Blown Italian Crystal & Smoked Amber Glass',
                'Zero-Flicker Constant Current LED Drivers',
                '5-Year Replacement Warranty on Electronics'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-bold text-text-primary">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">The Standards</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary mt-1">
              Four Pillars of <WarmUnderline>AURORA Engineering</WarmUnderline>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Museum-Grade Optics',
                desc: 'High-efficiency COB LED arrays calibrated for zero flicker, crisp beam angles, and long operational lifespan.'
              },
              {
                icon: ShieldCheck,
                title: '5-Year Guarantee',
                desc: 'Complete warranty coverage on driver electronics, LED emitters, and anodized corrosion-resistant finishes.'
              },
              {
                icon: Globe,
                title: 'Architect Concierge',
                desc: 'Bespoke specification assistance, DIALux lighting calculations, and insured white-glove courier shipping.'
              },
              {
                icon: Leaf,
                title: 'Eco-Conscious Alloy',
                desc: '100% recyclable aluminum alloy casing, zero toxic chemical plating, and minimal plastic packaging.'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-8 rounded-card bg-bg-muted border border-border space-y-4 hover:border-zinc-950 transition-all shadow-xs group">
                  <div className="p-3.5 rounded-full bg-zinc-950 text-amber-400 inline-block group-hover:scale-110 transition-transform">
                    <Icon size={22} />
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
        </div>

        {/* Brand Timeline Story */}
        <div className="mb-28 bg-zinc-950 text-white rounded-card p-8 sm:p-14 border border-zinc-800">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Our Journey</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight mt-1">
              Evolution of an <WarmUnderline>Architectural Icon</WarmUnderline>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: '2018',
                title: 'Zero-Glare Foot Light Patent',
                desc: 'Launched our flagship recessed step light series, eliminating harsh direct glare for luxury residential staircases.'
              },
              {
                year: '2022',
                title: 'Italian Crystal Glass Studio',
                desc: 'Partnered with artisanal glassblowers to craft mouth-blown crystal globes for cluster chandeliers.'
              },
              {
                year: '2026',
                title: 'Lucknow Showroom Launch',
                desc: 'Opened our flagship architectural lighting experience center in Vibhuti Khand, Gomti Nagar.'
              }
            ].map((milestone, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Calendar size={16} />
                  <span className="font-mono font-extrabold text-xl">{milestone.year}</span>
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
                  {milestone.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Showroom & Concierge Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-card bg-bg-muted border border-border mb-20">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Visit Our Experience Center
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary uppercase tracking-tight">
              Lucknow Flagship Showroom
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Experience the warm, glare-free luminescence of our entire collection in person. Consult with our lighting architects for custom residential or commercial projects.
            </p>

            <div className="space-y-2 pt-2 text-xs font-medium text-text-primary">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-amber-600 shrink-0" />
                <span>B-2/5, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-600 shrink-0" />
                <a href="tel:+919119865555" className="hover:underline">+91 91198 65555</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber-600 shrink-0" />
                <a href="mailto:hello@adlights.com" className="hover:underline">hello@adlights.com</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            <Link
              href="/trade"
              className="px-6 py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 text-center shadow-lg"
            >
              <span>Architect & Trade Program</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              className="px-6 py-4 rounded-pill bg-white border border-border text-zinc-950 font-extrabold text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 text-center"
            >
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>

      <TrustBadges />
    </div>
  );
}
