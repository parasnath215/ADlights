'use client';

import React from 'react';
import { Truck, PackageCheck, PhoneCall } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Fast, Free Shipping',
    desc: 'On Orders over ₹5999'
  },
  {
    icon: PackageCheck,
    title: 'Next Day Dispatch',
    desc: 'On Orders over ₹3999'
  },
  {
    icon: PhoneCall,
    title: '24/7 Support',
    desc: 'Uninterrupted Support all time!'
  }
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-6 bg-bg-muted border-t border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-4 p-4 sm:p-5 rounded-card bg-white border border-border shadow-xs hover:border-zinc-950 transition-all"
              >
                <div className="p-3.5 rounded-full bg-zinc-950 text-white shrink-0 shadow-sm">
                  <Icon size={24} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-text-primary uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-0.5 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
