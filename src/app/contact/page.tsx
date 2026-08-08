'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { WarmUnderline } from '../../components/ui/WarmUnderline';
import { TrustBadges } from '../../components/homepage/TrustBadges';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Trade Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-bg-muted py-16 border-b border-border mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
            <Sparkles size={13} /> 24/7 Client Concierge
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter text-text-primary">
            Contact <WarmUnderline>Us</WarmUnderline>
          </h1>
          <p className="text-sm text-text-secondary mt-3 max-w-xl mx-auto">
            Book a 1-on-1 architectural lighting consultation or submit custom project inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Showroom & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Flagship Showroom
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary uppercase tracking-tight mt-1">
                Lucknow Store & Studio
              </h2>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Visit our lighting flagship in Lucknow or connect directly with our architectural consultation team.
              </p>
            </div>

            <div className="space-y-4 text-xs font-medium text-text-primary">
              <div className="flex items-start gap-3 p-4 rounded-card bg-bg-muted border border-border">
                <MapPin size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm">Lucknow Flagship Showroom</strong>
                  <span className="text-text-secondary">B-2/5, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-card bg-bg-muted border border-border">
                <Phone size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm">Direct Phone Line</strong>
                  <a href="tel:+919119865555" className="text-text-secondary hover:text-amber-700 font-mono">+91 91198 65555</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-card bg-bg-muted border border-border">
                <Mail size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm">Official Email</strong>
                  <a href="mailto:hello@adlights.com" className="text-text-secondary hover:text-amber-700 font-mono">hello@adlights.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-card bg-bg-muted border border-border">
                <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm">Operating Hours</strong>
                  <span className="text-text-secondary">Mon – Sat: 10:00 AM – 8:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-card p-8 border border-border shadow-xl">
            <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-text-secondary mb-6">
              Fill out the details below. Our certified lighting team responds within 4 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-card bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span>Message Submitted Successfully</span>
                </div>
                <p className="text-xs">
                  Thank you for reaching out to AURORA DECOR LIGHTS. A senior lighting consultant has been assigned to your message and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. hello@adlights.com"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 91198 65555"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Inquiry Type</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none"
                    >
                      <option value="Trade Consultation">Trade & Architectural Consultation</option>
                      <option value="Custom Order">Custom Villa Specification</option>
                      <option value="Order Tracking">Order Tracking & Delivery</option>
                      <option value="Warranty Claim">5-Year Warranty & Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Project Details / Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe your lighting requirements..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <TrustBadges />
    </div>
  );
}
