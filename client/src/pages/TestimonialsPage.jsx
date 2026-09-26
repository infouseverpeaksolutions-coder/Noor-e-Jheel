import React from 'react';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';
import { Star, MessageCircle, ShieldCheck } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function TestimonialsPage({ testimonials = [], settings }) {
  const whatsappUrl = buildGeneralWhatsAppUrl("Hello Noor-e-Jheel! I would like to enquire about customer reviews and experiences.", settings);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Guest Reviews & Testimonials | Noor-e-Jheel Tour & Travel"
        description="Read real customer reviews and testimonials from families, couples and pilgrims who traveled to Kashmir, Ladakh and Umrah with Noor-e-Jheel Tour & Travel."
      />

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1 text-[#c89f56]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#c89f56]" />
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Guest Testimonials & Reviews
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            4.9 out of 5 stars based on 10,000+ happy travelers across India and abroad.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(review => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-md text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Ready to Create Your Own Unforgettable Kashmir Memories?
          </h3>
          <p className="text-xs text-black font-normal">
            Let us design a seamless itinerary tailored to your budget and travel dates.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat with Srinagar Team</span>
          </a>
        </div>
      </div>
    </div>
  );
}
