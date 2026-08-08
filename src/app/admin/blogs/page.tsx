'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit3, X, FileText } from 'lucide-react';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { useAdmin } from '../../../context/AdminContext';
import { Article } from '../../../types/commerce';

export default function AdminBlogsPage() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdmin();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lighting Design');
  const [readTime, setReadTime] = useState('4 min read');
  const [image, setImage] = useState('https://adlights.stellarweb.in/wp-content/uploads/2026/03/Upgrade-Your-Lighting-Game.png');
  const [excerpt, setExcerpt] = useState('');

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    addArticle({
      slug,
      title,
      category,
      readTime,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image,
      excerpt: excerpt || 'Discover architectural lighting techniques and optical warmth.'
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    updateArticle(editingArticle.id, {
      title,
      category,
      readTime,
      image,
      excerpt
    });

    setEditingArticle(null);
    resetForm();
  };

  const startEdit = (a: Article) => {
    setEditingArticle(a);
    setTitle(a.title);
    setCategory(a.category);
    setReadTime(a.readTime);
    setImage(a.image);
    setExcerpt(a.excerpt);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Lighting Design');
    setReadTime('4 min read');
    setImage('https://adlights.stellarweb.in/wp-content/uploads/2026/03/Upgrade-Your-Lighting-Game.png');
    setExcerpt('');
  };

  return (
    <div className="flex min-h-screen bg-bg-muted">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
              Journal & Blog Manager ({articles.length})
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Create, edit, and publish architectural lighting articles and guides.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Create Article</span>
          </button>
        </div>

        {/* Articles Table Grid */}
        <div className="bg-white rounded-card border border-border shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-text-primary">
            <thead className="bg-zinc-950 text-white uppercase font-display font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Read Time</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-bg-muted/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
                      <Image src={a.image} alt={a.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-text-primary">{a.title}</h4>
                      <p className="text-[10px] text-text-secondary truncate max-w-xs">{a.excerpt}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-amber-700">{a.category}</td>
                  <td className="p-4 font-mono">{a.readTime}</td>
                  <td className="p-4 text-text-secondary">{a.date}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(a)}
                        className="p-2 rounded-full hover:bg-zinc-200 text-zinc-700 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => deleteArticle(a.id)}
                        className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Article Modal */}
        {(isAddModalOpen || editingArticle) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingArticle(null);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <div className="relative w-full max-w-xl bg-white rounded-card shadow-2xl z-10 border border-border p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary">
                  {editingArticle ? 'Edit Article' : 'Publish New Journal Article'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingArticle(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editingArticle ? handleSaveEdit : handleSaveNew} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Article Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Upgrade Your Lighting Game"
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Category Tag</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      placeholder="e.g. Architecture"
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Reading Time</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Excerpt & Summary</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={4}
                    placeholder="Provide article excerpt..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingArticle(null);
                    }}
                    className="px-5 py-2.5 rounded-pill border border-border font-bold hover:bg-bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-pill bg-zinc-950 text-white font-bold hover:bg-amber-500 hover:text-zinc-950 transition-colors"
                  >
                    {editingArticle ? 'Save Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
