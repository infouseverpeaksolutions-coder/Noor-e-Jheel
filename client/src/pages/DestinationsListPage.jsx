import React, { useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import SEOHead from '../components/SEOHead';
import { Mountain, Search, Sparkles } from 'lucide-react';

export default function DestinationsListPage({ destinations = [] }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = destinations.filter(dest => {
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesSearch = !searchTerm || 
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dest.tagline || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Destinations in Kashmir, Ladakh & Jammu | Noor-e-Jheel Tour & Travel"
        description="Explore 20+ breathtaking destinations across Kashmir, Ladakh and Jammu. From Srinagar and Gulmarg to Gurez, Bungus, Pangong Lake and Vaishno Devi."
      />

      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/destinations/srinagar.jpg"
            alt="Himalayan Destinations"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d10]/90 via-[#0a0d10]/75 to-[#0a0d10]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Himalayan Paradises
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Explore Destinations
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Discover iconic landmarks, serene alpine valleys, raw high-altitude passes, and sacred pilgrimage shrines across Kashmir, Ladakh, and Jammu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'kashmir', label: '🏔️ Kashmir Valley (11)' },
              { id: 'ladakh', label: '🏍️ Ladakh & Leh (6)' },
              { id: 'jammu', label: '🪔 Jammu & Katra (3)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedRegion === tab.id
                    ? 'bg-[#c89f56] text-slate-950 font-bold shadow-md'
                    : 'bg-white text-black hover:border-[#c89f56] hover:text-[#c89f56] border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#c89f56]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-black font-medium">
            No destinations found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
