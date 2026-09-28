import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Star, 
  Check, 
  X, 
  ChevronDown, 
  Phone, 
  Calendar, 
  Share2, 
  ShieldCheck, 
  Sparkles,
  Bed,
  Utensils
} from 'lucide-react';
import { api } from '../services/api';
import { buildPackageWhatsAppUrl } from '../utils/whatsapp';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SEOHead from '../components/SEOHead';

export default function PackageDetailPage({ settings }) {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestNotes, setGuestNotes] = useState('');
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getPackageBySlug(slug)
      .then(data => {
        setPkg(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 text-sm">Loading handcrafted itinerary...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md glass-card p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-serif font-bold text-white">Package Not Found</h2>
          <p className="text-sm text-slate-400">The package you are looking for may have been updated or moved.</p>
          <Link to="/kashmir-tour-packages" className="inline-block px-6 py-2.5 rounded-full bg-gold-500 text-dark-900 font-bold text-sm">
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = buildPackageWhatsAppUrl(pkg, guestNotes, settings);
  const phoneNumber = settings?.phone || "+91 78896 89811";
  const cleanPhone = phoneNumber.replace(/\s+/g, '');

  const trackWhatsAppLead = () => {
    api.submitEnquiry({
      name: 'Package Detail Visitor',
      package_title: pkg.title,
      duration: pkg.duration,
      notes: guestNotes || 'Clicked Enquire on WhatsApp',
      budget: `Starting from ₹${Number(pkg.starting_price).toLocaleString('en-IN')}`,
      source: 'Package Detail Page'
    });
  };

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.description,
    "touristType": ["Family", "Couple", "Pilgrim", "Adventure"],
    "offers": {
      "@type": "Offer",
      "price": pkg.starting_price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": (pkg.itinerary || []).length,
      "itemListElement": (pkg.itinerary || []).map((step, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": step.title,
        "description": step.description
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24 md:pb-16">
      <SEOHead
        title={`${pkg.title} | Noor-e-Jheel Tour & Travel`}
        description={pkg.short_description || pkg.description}
        image={pkg.hero_image}
        schema={touristTripSchema}
      />

      <div className="relative min-h-[45vh] flex items-end pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#0a0d10]">
        <div className="absolute inset-0 z-0">
          <img
            src={pkg.hero_image}
            alt={pkg.title}
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d10] via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-[#c89f56]">Home</Link>
            <span>/</span>
            <Link to="/kashmir-tour-packages" className="hover:text-[#c89f56] capitalize">{pkg.category}</Link>
            <span>/</span>
            <span className="text-[#c89f56] truncate max-w-xs">{pkg.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
              {pkg.category} Package
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-xs font-medium text-slate-200 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>{pkg.duration}</span>
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{pkg.rating || 4.9} ({pkg.reviews_count || 32} Reviews)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight">
            {pkg.title}
          </h1>

          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Stops:</span>
              </span>
              {pkg.destinations.map((dest, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-dark-300/80 text-slate-200 border border-white/10">
                  {dest}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-left">
              <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c89f56]" />
                <span>Trip Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-black leading-relaxed font-normal">
                {pkg.description}
              </p>

              {pkg.highlights && pkg.highlights.length > 0 && (
                <div className="pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-[#c89f56] uppercase tracking-wider">
                    Key Highlights & Experiences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-medium p-3 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                        <span className="w-5 h-5 rounded-full bg-[#c89f56]/20 text-[#0e2a1e] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                        <span className="leading-snug text-black">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#c89f56] uppercase tracking-wider">
                    Day-by-Day Journey
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Detailed Tour Itinerary
                  </h2>
                </div>

                <div className="space-y-4">
                  {pkg.itinerary.map((day) => {
                    const isOpen = openDay === day.day_number;
                    return (
                      <div
                        key={day.day_number}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-[#c89f56]/60"
                      >
                        <button
                          onClick={() => setOpenDay(isOpen ? null : day.day_number)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-[#c89f56]/15 border border-[#c89f56]/30 text-[#0e2a1e] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                              D{day.day_number}
                            </span>
                            <div>
                              <span className="text-xs text-[#c89f56] block font-semibold">Day {day.day_number}</span>
                              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                                {day.title}
                              </h3>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-slate-700 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-2 space-y-4 text-sm sm:text-base text-black leading-relaxed border-t border-slate-100 animate-fadeIn">
                            <p className="text-black font-normal">{day.description}</p>
                            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 border-t border-slate-100">
                              {day.meals && (
                                <span className="flex items-center gap-1.5 text-black font-medium">
                                  <Utensils className="w-3.5 h-3.5 text-[#c89f56]" />
                                  <span>{day.meals}</span>
                                </span>
                              )}
                              {day.stay && (
                                <span className="flex items-center gap-1.5 text-black font-medium">
                                  <Bed className="w-3.5 h-3.5 text-[#c89f56]" />
                                  <span>Stay: {day.stay}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200/90 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-700" />
                    <span>What's Included</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-black font-medium">
                    {(pkg.inclusions || []).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                        <span className="text-black">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/70 rounded-2xl p-6 border border-rose-200/90 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                    <X className="w-5 h-5 text-rose-700" />
                    <span>What's Not Included</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-black font-medium">
                    {(pkg.exclusions || []).map((exc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">×</span>
                        <span className="text-black">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Photo Highlights
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pkg.gallery.map((imgUrl, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
                      <img
                        src={imgUrl}
                        alt={`${pkg.title} snapshot ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pkg.faqs && pkg.faqs.length > 0 && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {pkg.faqs.map((faq, i) => {
                    const isFaqOpen = openFaq === i;
                    return (
                      <div key={i} className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                        <button
                          onClick={() => setOpenFaq(isFaqOpen ? -1 : i)}
                          className="w-full text-left font-serif text-sm sm:text-base font-bold text-slate-900 flex items-center justify-between gap-3"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-700 shrink-0 transition-transform ${isFaqOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isFaqOpen && (
                          <p className="mt-3 text-sm text-black leading-relaxed border-t border-slate-100 pt-3 font-normal">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 border border-slate-200 space-y-6 shadow-xl text-left">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Special Offer Rate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{Number(pkg.starting_price).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">/ person*</span>
                </div>
                {pkg.original_price && (
                  <span className="text-xs text-slate-400 line-through">
                    Regular: ₹{Number(pkg.original_price).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="block text-xs text-emerald-700 font-semibold mt-1">
                  ✓ Instant WhatsApp quotation & customized options
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 block">
                  Add dates or questions for faster quote:
                </label>
                <textarea
                  value={guestNotes}
                  onChange={(e) => setGuestNotes(e.target.value)}
                  placeholder="e.g. 2 Adults, travel in June, need 4-star hotels with balcony view..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#c89f56]"
                />
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppLead}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0e2a1e] hover:bg-[#153e2d] active:bg-[#091a13] text-white font-bold text-sm shadow-md transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs transition-all"
                >
                  <Phone className="w-4 h-4 text-[#c89f56] shrink-0" />
                  <span>Call Us: {phoneNumber}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-black font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Advance Booking Hassle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c89f56] shrink-0" />
                  <span>100% Tailor-made to Your Budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c89f56] shrink-0" />
                  <span>24/7 Local Kashmiri Tour Manager</span>
                </div>
              </div>

              <div className="text-[11px] text-black leading-normal font-normal">
                * Rates are starting estimates based on seasonal averages and standard twin-sharing. Offline quote will be confirmed on WhatsApp based on your final choice of vehicle and hotel category.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-900/98 backdrop-blur-xl border-t border-gold-500/30 p-2.5 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-between gap-3">
          <div className="pl-1">
            <span className="text-[10px] text-slate-400 block font-normal">Starting from</span>
            <span className="text-base font-bold text-gold-400">
              ₹{Number(pkg.starting_price).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppLead}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-950/60"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Quote</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="p-3 rounded-xl bg-dark-100 border border-gold-500/30 text-gold-400"
              aria-label="Call Noor-e-Jheel"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
