import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function BlogListPage({ blogs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(blogs.map(b => b.category))];

  const filtered = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Kashmir & Ladakh Travel Guides, Tips & Insights | Noor-e-Jheel"
        description="Comprehensive travel advice, season guides, route comparisons and pilgrimage tips written by local Kashmiri travel experts at Noor-e-Jheel."
      />

      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/packages/kashmir-offbeat-package.jpg"
            alt="Kashmir Valley Guide"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d10]/90 via-[#0a0d10]/75 to-[#0a0d10]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Travel Guide Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Kashmir & Ladakh Travel Guides
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Practical packing tips, offbeat secrets, route advice, and season information curated by native Kashmiri guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-[#c89f56] text-slate-950 font-bold shadow-md'
                  : 'bg-white text-black hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden flex flex-col group border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c89f56]" />
                      <span>{article.published_date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c89f56]" />
                      <span>{article.read_time}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#c89f56] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-black line-clamp-3 leading-relaxed font-normal">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-[#c89f56] group-hover:text-[#b38945] flex items-center justify-between">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
