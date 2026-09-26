import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Footer({ settings }) {
  const whatsappUrl = buildGeneralWhatsAppUrl("Hello NOOR-E-JHEEL TOUR AND TRAVEL! I would like to enquire about your tour packages.", settings);
  const phoneNumber = settings?.phone || "+91 78896 89811";
  const cleanPhone = phoneNumber.replace(/\s+/g, '');
  const altPhone = settings?.alt_phone || "+91 90708 99749";
  const cleanAltPhone = altPhone.replace(/\s+/g, '');
  const email = settings?.email || "noorjheel78@gmail.com";
  const address = settings?.address || "Parimpora, Qamarwari, Srinagar, Jammu & Kashmir 190017";
  const mapUrl = settings?.google_maps_url || "https://share.google/Exz3T7BoYsUdk8qD9";

  return (
    <footer className="bg-[#0a0d10] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Noor-e-Jheel Tour & Travel" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#c89f56] font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>Navigate to Office (GPS)</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/amarnath-yatra-packages" className="hover:text-white transition-colors">Yatra</Link>
              <Link to="/kashmir-tour-packages" className="hover:text-white transition-colors">Kashmir</Link>
              <Link to="/honeymoon-packages" className="hover:text-white transition-colors">Honeymoon</Link>
              <Link to="/ladakh-tour-packages" className="hover:text-white transition-colors">Ladakh</Link>
              <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <Link to="/umrah-packages" className="hover:text-white transition-colors">Umrah</Link>
              <Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#c89f56] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                    {phoneNumber}
                  </a>
                  <a href={`tel:${cleanAltPhone}`} className="hover:text-white transition-colors text-[11px] text-slate-400">
                    Alt: {altPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0 mt-0.5" />
                <div>
                  <p>{address}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#c89f56] hover:text-[#dfb974] transition-colors font-medium mt-1"
                  >
                    <Navigation className="w-3 h-3 shrink-0" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a 
                href={settings?.social_links?.facebook || "https://www.facebook.com/noorjheeltravels.in/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877f2] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.594 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a 
                href={settings?.social_links?.instagram || "https://www.instagram.com/noor_e_jheel_tour_travels?stkn=MTIzejJwNXk0bmtqbA=="} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-medium text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 NOOR-E-JHEEL TOUR AND TRAVEL. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
