import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function FAQPage({ settings }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Booking & Inquiries",
      questions: [
        {
          q: "Why can't I pay or book directly online on the website?",
          a: "Noor-e-Jheel is a boutique high-touch tour agency, not an automated aggregator. Mountain travel in Kashmir and Ladakh requires real-time checking of pass conditions (e.g. Zoji La, Razdan Pass), Gondola slot availability, and season-specific hotel tariffs. By connecting directly on WhatsApp, our local experts design the most optimal itinerary for your exact dates and give you the best offline quote."
        },
        {
          q: "How do I confirm my tour offline?",
          a: "Once you approve your customized itinerary and quote via WhatsApp, you can reserve your tour by paying a nominal booking advance into Noor-e-Jheel Tour & Travel's official current bank account. You receive an official stamped booking confirmation voucher on company letterhead."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept official Bank NEFT/RTGS/IMPS transfers, UPI (GPay, PhonePe, Paytm), and major debit/credit cards."
        }
      ]
    },
    {
      category: "Kashmir & Ladakh Travel",
      questions: [
        {
          q: "What is the best season to visit Kashmir?",
          a: "Each season is spectacular: Spring (March-April) for millions of blooming tulips; Summer (May-August) for cool green alpine meadows and glaciers; Autumn (September-November) for romantic golden Chinars; Winter (December-February) for deep powder snow, skiing in Gulmarg, and frozen waterfalls in Drung."
        },
        {
          q: "Are Gulmarg Gondola tickets included in packages?",
          a: "Due to strict government regulations and high demand, Gondola tickets are subject to slot availability. Noor-e-Jheel's team provides full guidance and assistance to help our guests secure their desired Phase 1 & Phase 2 time slots."
        },
        {
          q: "How do you handle high altitude sickness in Ladakh?",
          a: "All our Ladakh itineraries incorporate gradual acclimatization resting in Leh. Furthermore, our expedition vehicles carry portable medical oxygen cylinders, and drivers are certified in high-altitude emergency safety."
        }
      ]
    },
    {
      category: "Umrah & Spiritual Yatras",
      questions: [
        {
          q: "How close are the Umrah hotels to Masjid al-Haram and Masjid an-Nabawi?",
          a: "Our hotels are handpicked within 300 to 500 meters of the Haram boundary in both Makkah and Madinah, ensuring easy 3-5 minute walking distance for elderly family members."
        },
        {
          q: "What documents are required for Amarnath Yatra registration?",
          a: "You need a Compulsory Health Certificate (CHC) signed by an authorized medical officer, passport photos, and government ID proof. Noor-e-Jheel facilitates the entire paperwork filing for our yatri guests."
        }
      ]
    }
  ];

  const whatsappUrl = buildGeneralWhatsAppUrl("Hello Noor-e-Jheel! I have a question regarding tour planning.", settings);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Noor-e-Jheel Tour & Travel"
        description="Find answers to common questions about Kashmir tours, Ladakh road trips, Umrah packages, Amarnath Yatra, hotel categories, and WhatsApp quotes."
      />

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c89f56]/20 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Help & Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Everything you need to know about planning, customizing, and booking your Himalayan tour.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {faqs.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              {cat.category}
            </h2>

            <div className="space-y-3">
              {cat.questions.map((faq, i) => {
                const globalKey = `${catIdx}-${i}`;
                const isOpen = openIndex === globalKey;
                return (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalKey)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-serif text-base font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-[#c89f56] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-black leading-relaxed border-t border-slate-100 font-normal animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <h3 className="text-xl font-serif font-bold text-slate-900">Still have questions?</h3>
          <p className="text-xs text-black">
            Our local tour managers in Srinagar are always ready to answer any questions on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-500"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
