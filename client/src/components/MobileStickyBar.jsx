import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function MobileStickyBar({ settings, currentPackage }) {
  const whatsappUrl = currentPackage 
    ? null // Handled dynamically in package detail if present
    : buildGeneralWhatsAppUrl("Hello Noor-e-Jheel Tour & Travel! I would like to enquire about your tour packages.", settings);

  const phoneNumber = settings?.phone || "+91 78896 89811";
  const cleanPhone = phoneNumber.replace(/\s+/g, '');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-xl border-t border-gold-500/30 p-2.5 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-950/60"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          <span className="truncate">WhatsApp Us</span>
        </a>

        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 active:from-gold-600 active:to-gold-500 text-dark-900 font-bold text-sm shadow-md shadow-gold-500/20"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span className="truncate">Call Now</span>
        </a>
      </div>
    </div>
  );
}
