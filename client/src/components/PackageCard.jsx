import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, MessageCircle } from 'lucide-react';
import { buildPackageWhatsAppUrl } from '../utils/whatsapp';
import { api } from '../services/api';

export default function PackageCard({ pkg, settings, badgeText = null, badgeColor = null }) {
  const whatsappUrl = buildPackageWhatsAppUrl(pkg, '', settings);

  const logWhatsAppInquiry = () => {
    api.submitEnquiry({
      name: 'Direct WhatsApp Visitor',
      package_title: pkg.title,
      duration: pkg.duration,
      budget: `₹${Number(pkg.starting_price).toLocaleString('en-IN')}`,
      source: 'Package Card WhatsApp CTA'
    });
  };

  let badge = badgeText;
  if (!badge) {
    if (pkg.category === 'family' || pkg.id?.includes('family')) badge = 'Family Favorite';
    else if (pkg.id?.includes('tour-package') || pkg.slug === 'kashmir-tour-package-6d5n') badge = 'Most Popular';
    else if (pkg.id?.includes('offbeat') || pkg.slug?.includes('offbeat')) badge = 'Offbeat';
  }

  const badgeBg = badgeColor || 'bg-[#0e2a1e]';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.12)] transition-all flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={pkg.hero_image} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full ${badgeBg} text-white text-[11px] font-semibold tracking-wide shadow-sm`}>
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link to={`/packages/${pkg.slug}`}>
            <h3 className="font-serif text-lg font-bold text-slate-900 hover:text-[#c89f56] transition-colors line-clamp-1">
              {pkg.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs text-black font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
            <span>{pkg.duration || `${pkg.days} Days / ${pkg.nights} Nights`}</span>
          </div>

          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-black font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
              <span className="truncate">{pkg.destinations.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              ₹{Number(pkg.starting_price || 0).toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-black font-normal">Starting from</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={logWhatsAppInquiry}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0e2a1e] hover:bg-[#153e2d] text-white font-medium text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>

            <Link
              to={`/packages/${pkg.slug}`}
              className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#c89f56] hover:bg-slate-50 text-black hover:text-[#c89f56] font-semibold text-xs transition-colors"
            >
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
