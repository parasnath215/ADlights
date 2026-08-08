'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface ProductAccordionsProps {
  highlights: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({ highlights, features, faqs }) => {
  const [openSection, setOpenSection] = useState<string | null>('highlights');

  const toggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="border-t border-border divide-y divide-border">
      {/* Highlights Accordion */}
      <div className="py-4">
        <button
          onClick={() => toggle('highlights')}
          className="w-full flex items-center justify-between font-display font-bold text-sm text-text-primary uppercase tracking-wider text-left"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" /> Architectural Highlights
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${openSection === 'highlights' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'highlights' && (
          <div className="mt-3 space-y-2 text-xs text-text-secondary animate-fade-in pl-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features & Certifications */}
      <div className="py-4">
        <button
          onClick={() => toggle('features')}
          className="w-full flex items-center justify-between font-display font-bold text-sm text-text-primary uppercase tracking-wider text-left"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" /> Features & Engineering
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${openSection === 'features' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'features' && (
          <div className="mt-3 space-y-2 text-xs text-text-secondary animate-fade-in pl-6">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQs Accordion */}
      <div className="py-4">
        <button
          onClick={() => toggle('faqs')}
          className="w-full flex items-center justify-between font-display font-bold text-sm text-text-primary uppercase tracking-wider text-left"
        >
          <span className="flex items-center gap-2">
            <HelpCircle size={16} className="text-indigo-600" /> Frequently Asked Questions
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${openSection === 'faqs' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'faqs' && (
          <div className="mt-3 space-y-4 text-xs text-text-secondary animate-fade-in pl-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-bg-muted p-3 rounded-lg border border-border">
                <p className="font-bold text-text-primary">Q: {faq.q}</p>
                <p className="mt-1 text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
