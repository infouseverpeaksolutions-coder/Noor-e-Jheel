import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Heart, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function AboutPage({ settings }) {
  const whatsappUrl = buildGeneralWhatsAppUrl("Hello NOOR-E-JHEEL TOUR AND TRAVEL team! I would like to know more about your company and tour packages.", settings);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="About Us | Noor-e-Jheel Tour & Travel"
        description="Learn about Noor-e-Jheel Tour & Travel — a government-registered Kashmiri tour operator in Srinagar with over 15 years of unmatched Himalayan hospitality."
      />

      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/destinations/srinagar.jpg"
            alt="Dal Lake Srinagar"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d10]/90 via-[#0a0d10]/75 to-[#0a0d10]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Our Story & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            About Noor-e-Jheel Tour & Travel
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Born on the banks of Dal Lake, rooted in centuries of Kashmiri hospitality ("Mehman-Nawazi"), dedicated to creating unforgettable journeys across the Himalayas.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              The Light of the Lake — <span className="text-[#c89f56]">Noor-e-Jheel</span>
            </h2>
            <p className="text-sm text-black leading-relaxed font-normal">
              "Noor-e-Jheel" translates to <em>"The Radiance of the Lake"</em>. Founded by seasoned Kashmiri mountaineers and hospitality experts, we started with a singular vision: to offer travelers authentic, deep, and worry-free explorations of Jammu, Kashmir, Ladakh, and holy pilgrimages.
            </p>
            <p className="text-sm text-black leading-relaxed font-normal">
              Unlike online travel conglomerates who outsource travelers to third-party sub-contractors, NOOR-E-JHEEL TOUR AND TRAVEL maintains our own on-ground logistics headquarters in Parimpora, Qamarwari, Srinagar 190017. Our chauffeurs, houseboat caretakers, and valley guides are our own trusted family.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="/images/packages/kashmir-offbeat-package.jpg"
              alt="Kashmir Valley Noor-e-Jheel"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#c89f56]/15 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#c89f56]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Govt. Registered Agency</h3>
            <p className="text-xs text-black leading-relaxed font-normal">
              Officially recognized and registered with Jammu & Kashmir Tourism Department. Adhering to highest safety and quality standards.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Genuine Kashmiri Hospitality</h3>
            <p className="text-xs text-black leading-relaxed font-normal">
              We treat every traveler not as a customer, but as an honored guest in our home. From piping hot Kehwa to 24/7 care, your comfort is sacred to us.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#c89f56]/15 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#c89f56]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Transparent Quotes</h3>
            <p className="text-xs text-black leading-relaxed font-normal">
              No hidden check-in fees, no surprise road taxes, no commission shopping traps. Honest itineraries with verified star stays.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Plan Your Vacation with Local Kashmiri Experts
          </h3>
          <p className="text-xs text-black max-w-lg mx-auto font-normal">
            Connect directly with our tour managers on WhatsApp. We answer in minutes with customized options and early-booking deals.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
