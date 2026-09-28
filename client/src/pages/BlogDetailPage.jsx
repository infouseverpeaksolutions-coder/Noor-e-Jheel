import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { api } from '../services/api';
import SEOHead from '../components/SEOHead';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function BlogDetailPage({ settings }) {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getBlogBySlug(slug)
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-[#c89f56] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-slate-900">Article Not Found</h2>
          <Link to="/blog" className="mt-4 inline-block text-[#c89f56] font-semibold underline">Back to All Guides</Link>
        </div>
      </div>
    );
  }

  const whatsappInquiryUrl = buildGeneralWhatsAppUrl(`Hello Noor-e-Jheel! I read your article "${article.title}" and would like to get a quote for a trip based on this guide.`, settings);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title={`${article.title} | Noor-e-Jheel Travel Desk`}
        description={article.summary}
        image={article.cover_image}
      />

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0d10]">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-[#c89f56] font-semibold hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Travel Guides</span>
          </Link>

          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c89f56]/20 text-[#c89f56] text-xs font-semibold uppercase tracking-wider">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1 text-slate-200">
              <User className="w-3.5 h-3.5 text-[#c89f56]" />
              <span>{article.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#c89f56]" />
              <span>{article.published_date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#c89f56]" />
              <span>{article.read_time}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 max-h-[500px]">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-black text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
          {article.content}
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Inspired to Visit Kashmir?
          </h3>
          <p className="text-xs text-black max-w-lg mx-auto font-normal">
            Our local tour managers can design an itinerary covering these exact sights with private sanitized cabs and verified hotels.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Plan This Itinerary on WhatsApp</span>
            </a>
            <Link
              to="/customize-trip"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 border border-slate-300 text-black font-semibold text-sm hover:bg-slate-200"
            >
              <span>Customize Trip</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
