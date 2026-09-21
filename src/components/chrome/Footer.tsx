'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, Shield } from 'lucide-react';
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-zinc-800">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-12 w-52 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-1.png"
                  alt="AURORA DECOR LIGHTS"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              AURORA DECOR LIGHTS designs museum-grade architectural floor arcs, hand-blown glass pendants, step lights, and linear fixtures. Engineered for warm, atmospheric distinction.
            </p>

            {/* Newsletter Signup Field */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Join the Private Concierge Journal
              </p>
              {subscribed ? (
                <div className="p-3 rounded-pill bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                  ✓ Subscription confirmed. Code AD20 applied.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="relative flex items-center max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className="w-full pl-4 pr-12 py-3 rounded-pill bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 rounded-full bg-white text-zinc-950 hover:bg-amber-400 flex items-center justify-center transition-transform hover:scale-105"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>



          {/* Column 3: Concierge & Trade */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 mb-4">
              Concierge Service
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li><Link href="/trade" className="hover:text-white transition-colors">Architect & Trade Program</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/journal" className="hover:text-white transition-colors">Lighting Journal & Guides</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Official Contact Info */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 mb-4">
              Lucknow Showroom
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-medium">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span>B-2/5, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <a href="tel:+919119865555" className="hover:text-white transition-colors">+91 91198 65555</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <a href="mailto:hello@adlights.com" className="hover:text-white transition-colors">hello@adlights.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <span>© 2026 AURORA DECOR LIGHTS. All rights reserved.</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-zinc-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-zinc-300 font-semibold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
