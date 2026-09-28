import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { api } from '../services/api';
import SEOHead from '../components/SEOHead';

export default function ContactPage({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Kashmir Tour Inquiry',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const phoneNumber = settings?.phone || "+91 78896 89811";
  const altPhone = settings?.alt_phone || "+91 90708 99749";
  const cleanPhone = phoneNumber.replace(/\s+/g, '');
  const cleanAltPhone = altPhone.replace(/\s+/g, '');
  const email = settings?.email || "noorjheel78@gmail.com";
  const address = settings?.address || "Parimpora, Qamarwari, Srinagar, Jammu & Kashmir 190017";
  const mapUrl = settings?.google_maps_url || "https://share.google/Exz3T7BoYsUdk8qD9";
  const whatsappUrl = buildGeneralWhatsAppUrl("Hello NOOR-E-JHEEL TOUR AND TRAVEL! I am reaching out through your website contact page.", settings);

  const handleContactSubmit = (e) => {
    e.preventDefault();

    let text = `🌟 *CONTACT INQUIRY: NOOR-E-JHEEL TOUR AND TRAVEL*\n`;
    text += `👤 *Name:* ${formData.name}\n`;
    text += `📞 *Phone:* ${formData.phone}\n`;
    if (formData.email) text += `✉️ *Email:* ${formData.email}\n`;
    text += `📌 *Subject:* ${formData.subject}\n`;
    text += `💬 *Message:* ${formData.message}\n`;

    const waLink = `https://wa.me/${(settings?.whatsapp_number || "917889689811").replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

    api.submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      package_title: formData.subject,
      notes: formData.message,
      source: 'Contact Us Page Form'
    });

    window.open(waLink, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Contact Us | NOOR-E-JHEEL TOUR AND TRAVEL Srinagar"
        description="Contact NOOR-E-JHEEL TOUR AND TRAVEL in Parimpora, Qamarwari, Srinagar 190017. Direct WhatsApp quotes on 7889689811, 24/7 helpline, and custom Kashmir tour bookings."
      />

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Srinagar Headquarters
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Get in Touch With Us
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Our local tour specialists are based in Parimpora, Qamarwari, Srinagar 190017. Chat on WhatsApp at 7889689811 or call our round-the-clock helpline.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Office Information
            </h2>

            <div className="space-y-4 text-sm text-black">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#c89f56]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Office Address</h4>
                  <p className="text-xs text-black font-medium mt-1 leading-relaxed">{address}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#c89f56] hover:text-[#9d7835] font-semibold mt-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open GPS Navigation</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#c89f56]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone & WhatsApp</h4>
                  <p className="text-xs text-black font-semibold mt-1">
                    <a href={`tel:${cleanPhone}`} className="hover:text-[#c89f56]">{phoneNumber}</a>
                  </p>
                  <p className="text-xs text-black mt-0.5">
                    Alt: <a href={`tel:${cleanAltPhone}`} className="hover:text-[#c89f56] font-medium">{altPhone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#c89f56]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-xs text-black font-medium mt-1">
                    <a href={`mailto:${email}`} className="hover:text-[#c89f56]">{email}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#c89f56]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Working Hours</h4>
                  <p className="text-xs text-black font-medium mt-1">Daily: 8:00 AM – 10:00 PM</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">24/7 Support for on-tour guests</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a0d10] hover:bg-slate-800 text-[#c89f56] font-bold text-xs shadow-md transition-all border border-[#c89f56]/30"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate to Shop / Office (GPS)</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Inquiry Forwarded to WhatsApp!</h3>
                <p className="text-xs text-black max-w-md mx-auto">
                  Your message has opened in WhatsApp. Our team in Srinagar will review your inquiry and respond within minutes.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 rounded-full bg-slate-100 border border-slate-300 text-black text-xs font-semibold hover:bg-slate-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-slate-900">Send Us a Direct Message</h2>
                  <p className="text-xs text-black mt-1">
                    Fill in your details below. Your message will be formatted and opened directly in WhatsApp with our sales team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sameer Kapoor"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-[#c89f56]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-[#c89f56]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sameer@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-[#c89f56]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-[#c89f56]"
                    >
                      <option value="Kashmir Tour Inquiry">Kashmir Tour Packages</option>
                      <option value="Ladakh Road Trip Inquiry">Ladakh Tour Packages</option>
                      <option value="Holy Umrah Inquiry">Holy Umrah Packages</option>
                      <option value="Amarnath Yatra Inquiry">Amarnath Yatra Packages</option>
                      <option value="Vaishno Devi Inquiry">Mata Vaishno Devi</option>
                      <option value="Honeymoon Special Inquiry">Kashmir Honeymoon</option>
                      <option value="Houseboat Booking Inquiry">Dal Lake Houseboat Stay</option>
                      <option value="General Query">General Question</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Message / Query *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share number of travelers, dates, hotel preference, or any questions..."
                      rows={4}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#c89f56]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
