import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Car, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { buildCustomTripWhatsAppUrl } from '../utils/whatsapp';
import { api } from '../services/api';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SEOHead from '../components/SEOHead';

const ALL_DESTINATIONS = [
  "Srinagar & Dal Lake",
  "Gulmarg Snow & Gondola",
  "Pahalgam & Betaab Valley",
  "Sonamarg Thajiwas Glacier",
  "Gurez Valley (Offbeat)",
  "Doodhpathri (Valley of Milk)",
  "Bungus Valley Wilderness",
  "Aru Valley & Baisaran",
  "Drung Frozen Waterfall",
  "Ladakh (Leh, Nubra, Pangong)",
  "Mata Vaishno Devi (Katra)",
  "Amarnath Yatra Holy Cave",
  "Holy Umrah (Makkah & Madinah)"
];

const HOTEL_CATEGORIES = [
  { id: "3-Star Deluxe", name: "3-Star Deluxe", desc: "Clean, comfortable, heated rooms with buffet breakfast & dinner" },
  { id: "4-Star Premium", name: "4-Star Premium", desc: "High-end mountain views, premier amenities, multi-cuisine dining" },
  { id: "5-Star Luxury / Resort", name: "5-Star Luxury Resort", desc: "World-class luxury (e.g. The Khyber, Radisson, Vivanta)" },
  { id: "Heritage Royal Houseboat", name: "Heritage Royal Houseboat", desc: "Hand-carved fragrant cedar wood on Dal Lake or Nigeen Lake" },
  { id: "Budget Comfortable", name: "Budget Friendly", desc: "Affordable standard verified guest houses for backpackers & students" }
];

const CAB_TYPES = [
  { id: "Private Sedan (Etios/Dzire)", name: "Private Sedan", desc: "Ideal for couples and small families (up to 3-4 pax)" },
  { id: "Toyota Innova / Crysta", name: "Innova / Crysta", desc: "Spacious luxury SUV, best comfort on mountain curves (up to 6 pax)" },
  { id: "Tempo Traveller (12/17 Seater)", name: "Tempo Traveller", desc: "Pushback luxury seats for large families & friend groups" },
  { id: "Self-Arranged / Only Hotel", name: "No Cab Required", desc: "I only need hotel, houseboat & sightseeing arrangements" }
];

const BUDGET_OPTIONS = [
  "Budget (₹15,000 - ₹25,000 / person)",
  "Standard (₹25,000 - ₹40,000 / person)",
  "Premium (₹40,000 - ₹65,000 / person)",
  "Luxury (₹65,000+ / person)",
  "Flexible / Best Value"
];

export default function CustomizeTripPage({ settings }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    destinations: ["Srinagar & Dal Lake", "Gulmarg Snow & Gondola", "Pahalgam & Betaab Valley"],
    travel_date: "",
    duration: "6 Days / 5 Nights",
    adults: 2,
    children: 0,
    hotel_category: "3-Star Deluxe",
    cab_type: "Toyota Innova / Crysta",
    budget: "Standard (₹25,000 - ₹40,000 / person)",
    notes: "",
    name: "",
    phone: "",
    email: ""
  });

  const toggleDestination = (dest) => {
    setFormData(prev => {
      const exists = prev.destinations.includes(dest);
      if (exists) {
        return { ...prev, destinations: prev.destinations.filter(d => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

  const handleCustomTripSubmit = (e) => {
    e.preventDefault();

    const whatsappUrl = buildCustomTripWhatsAppUrl(formData, settings);

    api.submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      package_title: `Custom Tour: ${(formData.destinations || []).slice(0, 3).join(', ')}`,
      destinations: formData.destinations,
      travel_date: formData.travel_date,
      travellers: `${formData.adults} Adults, ${formData.children} Children`,
      duration: formData.duration,
      hotel_category: formData.hotel_category,
      cab_type: formData.cab_type,
      budget: formData.budget,
      notes: formData.notes,
      source: 'Customize Trip Multi-Step Form'
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Customize Your Trip | Noor-e-Jheel Tour & Travel"
        description="Design your dream holiday in Kashmir, Ladakh, or Holy Umrah. Select destinations, hotel category, dates & get an instant WhatsApp quote from local Srinagar experts."
      />

      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor-Made Holidays</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Customize Your Dream Trip
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Tell us your wishes. In 4 quick steps, get a handcrafted itinerary and transparent quote sent straight to your WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {submitted ? (
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 border-2 border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Thank You, {formData.name || 'Traveler'}!</h2>
              <p className="text-black text-sm max-w-md mx-auto">
                Your customized trip details have been compiled and sent to WhatsApp. Our Srinagar team will review your requests and reply with a complete day-by-day itinerary and best quote shortly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-xs text-left space-y-1.5 text-black">
              <div><strong className="text-[#c89f56]">Places:</strong> {formData.destinations.join(', ')}</div>
              <div><strong className="text-[#c89f56]">Duration:</strong> {formData.duration}</div>
              <div><strong className="text-[#c89f56]">Hotel:</strong> {formData.hotel_category}</div>
              <div><strong className="text-[#c89f56]">Travelers:</strong> {formData.adults} Adults, {formData.children} Children</div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                }}
                className="px-6 py-2.5 rounded-full bg-slate-100 border border-slate-300 text-black font-semibold text-xs hover:bg-slate-200"
              >
                Plan Another Trip
              </button>

              <a
                href={buildCustomTripWhatsAppUrl(formData, settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-lg hover:bg-emerald-500"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span className={currentStep >= 1 ? 'text-[#c89f56] font-bold' : ''}>1. Destinations</span>
                <span className={currentStep >= 2 ? 'text-[#c89f56] font-bold' : ''}>2. Dates & Guests</span>
                <span className={currentStep >= 3 ? 'text-[#c89f56] font-bold' : ''}>3. Stays & Cab</span>
                <span className={currentStep >= 4 ? 'text-[#c89f56] font-bold' : ''}>4. Contact Info</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#c89f56] to-[#b38945] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleCustomTripSubmit}>
              {/* STEP 1: DESTINATIONS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#c89f56]" />
                      <span>Select the Places You Want to Visit</span>
                    </h2>
                    <p className="text-xs text-black">Choose one or more destinations. You can combine classic spots with offbeat valleys.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ALL_DESTINATIONS.map((dest, idx) => {
                      const isSelected = formData.destinations.includes(dest);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleDestination(dest)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#c89f56]/15 border-[#c89f56] text-black font-semibold shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-black hover:border-[#c89f56]'
                          }`}
                        >
                          <span className="text-xs">{dest}</span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-[#c89f56] text-slate-950 font-bold' : 'border border-slate-300'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={formData.destinations.length === 0}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c89f56] hover:bg-[#b38945] text-slate-950 font-bold text-sm transition-all disabled:opacity-50"
                    >
                      <span>Next: Dates & Guests</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#c89f56]" />
                      <span>When & For How Long?</span>
                    </h2>
                    <p className="text-xs text-black">Tell us your approximate travel schedule and party size.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Tentative Travel Date / Month
                      </label>
                      <input
                        type="text"
                        value={formData.travel_date}
                        onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                        placeholder="e.g. 15th May 2025, or early Autumn"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Duration of Trip
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                      >
                        <option value="4 Days / 3 Nights">4 Days / 3 Nights (Quick Escape)</option>
                        <option value="5 Days / 4 Nights">5 Days / 4 Nights (Tulip / Snow Special)</option>
                        <option value="6 Days / 5 Nights">6 Days / 5 Nights (Most Popular Classic)</option>
                        <option value="7 Days / 6 Nights">7 Days / 6 Nights (Offbeat / Relaxed)</option>
                        <option value="8 Days / 7 Nights">8 Days / 7 Nights (Kashmir + Katra)</option>
                        <option value="10 Days / 9 Nights">10 Days / 9 Nights (Ladakh Grand Tour)</option>
                        <option value="20 Days (Holy Umrah)">20 Days (Holy Umrah Package)</option>
                        <option value="30 Days (Holy Umrah)">30 Days (Extended Umrah Package)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Adult Travelers (12+ Years)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                          className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-black font-bold text-lg hover:border-[#c89f56]"
                        >-</button>
                        <span className="text-base font-bold text-black w-12 text-center">{formData.adults}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                          className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-black font-bold text-lg hover:border-[#c89f56]"
                        >+</button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Children (Below 12 Years)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                          className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-black font-bold text-lg hover:border-[#c89f56]"
                        >-</button>
                        <span className="text-base font-bold text-black w-12 text-center">{formData.children}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                          className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-black font-bold text-lg hover:border-[#c89f56]"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-black text-xs font-semibold hover:bg-slate-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c89f56] hover:bg-[#b38945] text-slate-950 font-bold text-sm transition-all"
                    >
                      <span>Next: Stays & Cab</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-[#c89f56]" />
                      <span>Hotel Category & Private Cab</span>
                    </h2>
                    <p className="text-xs text-black">Choose your preferred comfort level.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Preferred Hotel Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {HOTEL_CATEGORIES.map((cat, idx) => (
                        <div
                          key={idx}
                          onClick={() => setFormData({ ...formData, hotel_category: cat.id })}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.hotel_category === cat.id
                              ? 'bg-[#c89f56]/15 border-[#c89f56] text-black shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-black hover:border-[#c89f56]'
                          }`}
                        >
                          <div className="font-bold text-xs text-black">{cat.name}</div>
                          <div className="text-[11px] text-black mt-1 leading-snug">{cat.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Private Vehicle Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CAB_TYPES.map((cab, idx) => (
                        <div
                          key={idx}
                          onClick={() => setFormData({ ...formData, cab_type: cab.id })}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.cab_type === cab.id
                              ? 'bg-[#c89f56]/15 border-[#c89f56] text-black shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-black hover:border-[#c89f56]'
                          }`}
                        >
                          <div className="font-bold text-xs text-black">{cab.name}</div>
                          <div className="text-[11px] text-black mt-1 leading-snug">{cab.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                    >
                      {BUDGET_OPTIONS.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-black text-xs font-semibold hover:bg-slate-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c89f56] hover:bg-[#b38945] text-slate-950 font-bold text-sm transition-all"
                    >
                      <span>Next: Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#c89f56]" />
                      <span>Almost Ready! Where Should We Send Your Itinerary?</span>
                    </h2>
                    <p className="text-xs text-black">
                      Submitting compiles your selections and opens your prefilled WhatsApp message immediately.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black focus:outline-none focus:border-[#c89f56]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Any Special Requests or Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Honeymoon cake & floral decor, elderly parents requiring ground-floor room, pure Jain meals, Gulmarg Gondola slot assistance..."
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-[#c89f56]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-black space-y-1">
                    <span className="font-bold text-[#c89f56] block mb-1">Your Trip Plan Summary:</span>
                    <div>• <strong>Destinations:</strong> {formData.destinations.join(' → ')}</div>
                    <div>• <strong>Schedule:</strong> {formData.travel_date || 'Flexible'} ({formData.duration})</div>
                    <div>• <strong>Party:</strong> {formData.adults} Adults, {formData.children} Children</div>
                    <div>• <strong>Hotel & Cab:</strong> {formData.hotel_category} | {formData.cab_type}</div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-black text-xs font-semibold hover:bg-slate-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all transform hover:scale-105"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Send Request on WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
