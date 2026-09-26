import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Thermometer, 
  Car, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  ArrowRight,
  Mountain
} from 'lucide-react';
import { api } from '../services/api';
import PackageCard from '../components/PackageCard';
import SEOHead from '../components/SEOHead';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function DestinationDetailPage({ packages = [], settings }) {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getDestinationBySlug(slug)
      .then(data => {
        setDestination(data);
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
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#c89f56] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-black text-sm font-medium">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-slate-900">Destination Not Found</h2>
          <p className="text-sm text-black">The destination you are looking for may have been moved.</p>
          <Link to="/destinations" className="inline-block px-6 py-2.5 rounded-full bg-[#c89f56] text-slate-950 font-bold text-sm shadow-md">
            View All Destinations
          </Link>
        </div>
      </div>
    );
  }

  // Find related packages covering this destination
  const relatedPackages = packages.filter(p => 
    (p.destinations || []).some(d => 
      d.toLowerCase().includes(destination.name.toLowerCase()) || 
      destination.name.toLowerCase().includes(d.toLowerCase())
    )
  );

  const whatsappInquiryUrl = buildGeneralWhatsAppUrl(`Hello Noor-e-Jheel! I am interested in visiting ${destination.name} (${destination.region}). Please suggest packages and customized itineraries covering this place.`, settings);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title={`${destination.name} Travel Guide & Packages | Noor-e-Jheel Tour & Travel`}
        description={`${destination.name}: ${destination.tagline}. ${destination.description}`}
        image={destination.hero_image}
      />

      <div className="relative min-h-[50vh] flex items-end pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#0a0d10]">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.hero_image}
            alt={destination.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d10] via-[#0a0d10]/80 to-[#0a0d10]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-[#c89f56]">Home</Link>
            <span>/</span>
            <Link to="/destinations" className="hover:text-[#c89f56]">Destinations</Link>
            <span>/</span>
            <span className="text-[#c89f56] font-semibold">{destination.name}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            <Mountain className="w-3.5 h-3.5" />
            <span className="capitalize">{destination.region} Region</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            {destination.name}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-light italic max-w-2xl">
            "{destination.tagline}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#c89f56]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Best Time to Visit</h4>
              <p className="text-sm font-semibold text-black mt-0.5">{destination.best_time_to_visit}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
              <Thermometer className="w-5 h-5 text-[#c89f56]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weather & Temp</h4>
              <p className="text-sm font-semibold text-black mt-0.5">{destination.temperature_summary}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c89f56]/15 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-[#c89f56]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">How to Reach</h4>
              <p className="text-xs text-black font-medium mt-0.5 leading-snug">{destination.how_to_reach}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                About {destination.name}
              </h2>
              <p className="text-sm text-black leading-relaxed whitespace-pre-line font-normal">
                {destination.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {destination.top_attractions && destination.top_attractions.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c89f56]" />
                    <span>Must-Visit Places</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-black font-medium">
                    {destination.top_attractions.map((attr, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c89f56]"></span>
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {destination.top_activities && destination.top_activities.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c89f56]" />
                    <span>Top Activities</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-black font-medium">
                    {destination.top_activities.map((act, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Visit {destination.name}</h3>
                <p className="text-xs text-black mt-2 leading-relaxed">
                  Want to include {destination.name} in your custom Kashmir or Ladakh tour? Chat with our local Srinagar team.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  to="/customize-trip"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c89f56] to-[#b38945] text-slate-950 font-bold text-sm shadow-md transition-all hover:brightness-105"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Customize Trip with {destination.name}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#c89f56] uppercase tracking-wider">Recommended Trips</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Packages Covering {destination.name}
              </h2>
            </div>
            <Link to="/kashmir-tour-packages" className="text-xs text-[#c89f56] font-semibold hover:underline flex items-center gap-1">
              <span>View All Tour Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {relatedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} settings={settings} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center space-y-3">
              <p className="text-sm text-black">
                We can add {destination.name} to any of our custom packages!
              </p>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-sm hover:bg-emerald-500"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Request Custom Quote on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
