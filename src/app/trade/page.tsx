'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Send, Sparkles, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { WarmUnderline } from '../../components/ui/WarmUnderline';
import { TrustBadges } from '../../components/homepage/TrustBadges';

export default function TradePage() {
  const [projectUnits, setProjectUnits] = useState(15);
  const [firmName, setFirmName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Discount calculation heuristics based on units
  const discountRate = projectUnits >= 50 ? 25 : projectUnits >= 20 ? 20 : 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFirmName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-zinc-950 text-white py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-4">
            <Building2 size={14} className="text-amber-400" /> Architect & Designer Privileges
          </span>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter leading-tight">
            ADLIGHTS Trade <WarmUnderline>Architect Program</WarmUnderline>
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 mt-4 max-w-2xl mx-auto font-normal">
            Exclusive volume discounts, dedicated white-glove project specification managers, and priority custom production for commercial & residential projects.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tier Discount Calculator */}
        <div className="bg-bg-muted p-8 rounded-card border border-border mb-16 max-w-4xl mx-auto shadow-lg space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Volume Calculator</span>
            <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary mt-1">
              Estimate Your Project Savings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-text-primary">
              <span>Project Fixtures Required: <strong className="font-mono text-lg text-zinc-950">{projectUnits} units</strong></span>
              <span className="px-3 py-1 bg-amber-400 text-zinc-950 rounded-pill font-mono font-extrabold">
                {discountRate}% Trade Discount
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="100"
              value={projectUnits}
              onChange={(e) => setProjectUnits(Number(e.target.value))}
              className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
            />

            <div className="flex justify-between text-[11px] font-bold text-text-secondary">
              <span>5 Units (15% Off)</span>
              <span>20 Units (20% Off)</span>
              <span>50+ Units (25% Off + Custom Finish)</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-card p-8 border border-border shadow-xl">
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary mb-2 text-center">
            Apply for Trade Accreditation
          </h2>
          <p className="text-xs text-text-secondary text-center mb-6">
            Licensed architects, interior design studios, and commercial lighting specifiers qualify for instant VIP pricing.
          </p>

          {submitted ? (
            <div className="p-6 rounded-card bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 text-center">
              <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
              <h3 className="font-display font-bold text-lg">Application Submitted!</h3>
              <p className="text-xs">
                Our Trade Director will review your credentials and send your dedicated VIP discount code within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Architecture / Design Firm</label>
                  <input
                    type="text"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    required
                    placeholder="e.g. Studio Rostova Architecture"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Lead Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="elena@rostova.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} /> Submit Trade Accreditation Application
              </button>
            </form>
          )}
        </div>
      </div>

      <TrustBadges />
    </div>
  );
}
