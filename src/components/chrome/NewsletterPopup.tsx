'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowRight, CheckCircle2, Instagram, Twitter, Facebook } from 'lucide-react';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-card overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-slide-up border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/20 text-white hover:bg-black/60 flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Left Column: Lifestyle Photo */}
        <div className="relative min-h-[260px] md:min-h-[420px] bg-zinc-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80"
            alt="ADlights architectural ambient light"
            fill
            className="object-cover brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">Limited Access</span>
            <p className="font-display font-bold text-lg mt-1">Light up your space with architectural distinction.</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-pill text-[11px] font-bold uppercase tracking-wider mb-4">
              V.I.P Privileges
            </span>

            <h3 className="font-display font-extrabold text-2xl text-text-primary uppercase tracking-tight leading-none">
              Sign up & Get <span className="text-amber-500">20% Off</span>
            </h3>

            <p className="text-sm text-text-secondary mt-3 leading-relaxed">
              Join the ADlights journal for exclusive insider product releases, architectural lighting guides, and private VIP flash sales.
            </p>
          </div>

          {submitted ? (
            <div className="my-6 p-4 rounded-card bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 animate-fade-in">
              <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
              <div className="text-xs font-medium">
                <p className="font-bold text-emerald-950">Welcome to ADlights!</p>
                <p>Your 20% coupon code <strong className="font-mono">AD20</strong> has been activated.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="my-6">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-pill border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="Submit Email"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* Social Row & Micro Disclaimer */}
          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span className="text-[11px]">No spam. Unsubscribe anytime.</span>
            <div className="flex items-center gap-3 text-zinc-600">
              <Instagram size={14} className="hover:text-text-primary cursor-pointer" />
              <Twitter size={14} className="hover:text-text-primary cursor-pointer" />
              <Facebook size={14} className="hover:text-text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
