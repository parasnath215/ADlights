'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

export default function JournalIndexPage() {
  const { articles } = useAdmin();
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filtered = selectedCat === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCat);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* Editorial Header */}
      <div className="bg-bg-muted py-16 border-b border-border mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
            <Sparkles size={13} /> Architectural Insights
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter text-text-primary">
            The Lighting <WarmUnderline>Journal</WarmUnderline>
          </h1>
          <p className="text-sm text-text-secondary mt-3 max-w-xl mx-auto">
            Design principles, Kelvin color temperature guides, and behind-the-scenes Italian glass craftsmanship.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-bg-muted text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-card overflow-hidden border border-border shadow-xs hover:border-zinc-950 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-zinc-900">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-xs text-zinc-950 rounded-pill text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-text-secondary font-medium mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-amber-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-text-secondary mt-3 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="relative inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group/link"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
