'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { notFound } from 'next/navigation';

export default function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { articles } = useAdmin();
  const article = articles.find(a => a.slug === resolvedParams.slug) || articles[0];

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([
    {
      name: 'Ananya Deshmukh',
      text: 'The explanation of low-glare downlighting for staircase walls was extremely helpful for our bungalow renovation.',
      date: 'August 6, 2026'
    }
  ]);
  const [submitted, setSubmitted] = useState(false);

  if (!article) return notFound();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    setComments(prev => [
      ...prev,
      {
        name: commentName,
        text: commentText,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      }
    ]);
    setSubmitted(true);
    setCommentName('');
    setCommentText('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Lighting Journal</span>
        </Link>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Meta */}
        <div className="space-y-4 text-center sm:text-left">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-pill text-[10px] font-extrabold uppercase tracking-wider">
            {article.category}
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-text-secondary border-y border-border py-3">
            <span className="flex items-center gap-1 font-semibold"><Calendar size={14} /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold"><Clock size={14} /> {article.readTime}</span>
            <span>•</span>
            <span>By <strong>ADLIGHTS Editorial Studio</strong></span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-16/9 rounded-card overflow-hidden bg-bg-muted my-8 border border-border shadow-lg">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        </div>

        {/* Article Content Body */}
        <div className="prose max-w-none text-text-primary text-sm sm:text-base leading-relaxed space-y-6">
          <p className="font-medium text-lg text-text-secondary leading-snug">
            {article.excerpt}
          </p>

          <p>
            Architectural lighting is not simply about illuminating a room; it is about sculpting perception. By thoughtfully directing lumens and utilizing precision 2700K to 3000K warm LED sources, designers create structural rhythm, accentuating plaster textures, natural stone, and polished brass fixtures.
          </p>

          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary pt-4">
            1. Eliminating Harsh Eye Glare with Downward Optics
          </h2>
          <p>
            In recessed foot lights like the <strong>Aurora J019-6W</strong> and <strong>ADL StepGlow 2W</strong>, anti-glare louvering directs light downward onto floor surfaces. This ensures nighttime staircase safety while preventing direct eye-level glare for guests moving through hallways and terraces.
          </p>

          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary pt-4">
            2. The Warmth of Mouth-Blown Crystal Glass
          </h2>
          <p>
            When pairing suspended cluster pendants like the <strong>Aurora Luxe 3-Light Gold Chandelier</strong> above dining counters, multi-faceted crystal glass diffusers soften the emission beam, creating golden-hour reflections across dining settings.
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary mb-6">
            Reader Discussion ({comments.length})
          </h3>

          <div className="space-y-4 mb-8">
            {comments.map((c, idx) => (
              <div key={idx} className="p-4 rounded-card bg-bg-muted border border-border text-xs">
                <div className="flex justify-between items-center mb-1">
                  <strong className="font-bold text-text-primary text-sm">{c.name}</strong>
                  <span className="text-text-secondary">{c.date}</span>
                </div>
                <p className="text-text-secondary leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="bg-bg-muted p-6 rounded-card border border-border space-y-4">
            <h4 className="font-display font-bold text-sm text-text-primary uppercase">Leave a Comment</h4>

            {submitted && (
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Thank you! Your comment has been published.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your Name..."
                required
                className="px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:border-zinc-950"
              />
            </div>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              placeholder="Share your architectural lighting thoughts..."
              required
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:border-zinc-950"
            />

            <button
              type="submit"
              className="px-6 py-2.5 rounded-pill bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-2"
            >
              <Send size={14} /> Post Comment
            </button>
          </form>
        </div>
      </article>
    </div>
  );
}
