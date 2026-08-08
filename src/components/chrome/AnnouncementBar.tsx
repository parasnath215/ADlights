'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ANNOUNCEMENTS = [
  '✦ COMPLIMENTARY EXPRESS SHIPPING ON ALL ORDERS OVER ₹5999',
  '✦ DISPATCH WITHIN 24 HOURS ACROSS INDIA',
  '✦ USE CODE "AD20" FOR 20% OFF YOUR FIRST ORDER',
  '✦ ARCHITECT & DESIGNER TRADE PROGRAM — UP TO 25% OFF BULK ORDERS'
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { currency, setCurrency, language, setLanguage } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-zinc-950 text-white text-[11px] font-semibold py-2 px-4 flex items-center justify-between border-b border-zinc-800 select-none z-50 relative">
      {/* Phone & Email Left */}
      <div className="hidden md:flex items-center gap-4 text-zinc-300">
        <a href="tel:+919119865555" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Phone size={12} className="text-amber-400" />
          <span>+91 91198 65555</span>
        </a>
        <a href="mailto:hello@adlights.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Mail size={12} className="text-amber-400" />
          <span>hello@adlights.com</span>
        </a>
      </div>

      {/* Rotating Center Announcement */}
      <div className="flex-1 text-center truncate">
        <span className="inline-block transition-all duration-500 font-mono tracking-wider text-amber-300">
          {ANNOUNCEMENTS[index]}
        </span>
      </div>

      {/* Language & Currency Selector Right */}
      <div className="hidden sm:flex items-center gap-3 text-zinc-300">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-zinc-900 text-zinc-200 rounded px-1.5 py-0.5 text-[10px] border border-zinc-800 focus:outline-none cursor-pointer"
        >
          <option value="EN">EN</option>
          <option value="HI">HI</option>
        </select>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-zinc-900 text-zinc-200 rounded px-1.5 py-0.5 text-[10px] border border-zinc-800 focus:outline-none cursor-pointer font-mono"
        >
          <option value="INR (₹)">INR (₹)</option>
          <option value="USD ($)">USD ($)</option>
        </select>
      </div>
    </div>
  );
};
