'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '../../data/products';
import { WarmUnderline } from '../ui/WarmUnderline';

export const JournalPreview: React.FC = () => {
  return (
    <section className="py-24 bg-bg-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
              Editorial Insights
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-2">
              The Lighting <WarmUnderline>Journal</WarmUnderline>
            </h2>
          </div>

          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-text-primary hover:text-amber-600 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-card overflow-hidden border border-border shadow-xs hover:border-zinc-950 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Category Tag Pill */}
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

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-text-secondary font-medium mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-amber-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="relative inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
