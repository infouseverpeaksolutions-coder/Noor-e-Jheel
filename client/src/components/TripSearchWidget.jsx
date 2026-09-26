import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { buildCustomTripWhatsAppUrl } from '../utils/whatsapp';

export default function TripSearchWidget({ settings }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState('2 Adults');

  const handleQuoteSearch = (e) => {
    e.preventDefault();
    const url = buildCustomTripWhatsAppUrl({
      destination: destination || 'Kashmir',
      travel_date: travelDate || 'Upcoming Season',
      adults: travellers.split(' ')[0] || 2,
      duration: '6 Days / 5 Nights',
      notes: 'Search widget quick inquiry'
    }, settings);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
        <div className="w-10 h-7 bg-white rounded-t-lg flex items-center justify-center border-t border-x border-[#c89f56]/40 shadow-sm">
          <svg className="w-6 h-4 text-[#c89f56]" viewBox="0 0 24 16" fill="none">
            <path d="M12 2L19 14H5L12 2Z" stroke="#c89f56" strokeWidth="1.8" strokeLinejoin="round" fill="#fff" />
            <path d="M16 8L21 14H13L16 8Z" stroke="#c89f56" strokeWidth="1.5" strokeLinejoin="round" fill="#fff" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.14)] border border-slate-100">
        <form onSubmit={handleQuoteSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-2 items-center">
          <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 transition-colors text-left">
            <MapPin className="w-4 h-4 text-[#c89f56] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider block leading-none mb-1">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-black focus:outline-none cursor-pointer truncate"
              >
                <option value="">Select Destination</option>
                <option value="Srinagar">Srinagar & Dal Lake</option>
                <option value="Gulmarg">Gulmarg</option>
                <option value="Pahalgam">Pahalgam</option>
                <option value="Sonamarg">Sonamarg</option>
                <option value="Gurez Valley">Gurez Valley</option>
                <option value="Doodhpathri">Doodhpathri</option>
                <option value="Ladakh">Ladakh (Leh/Pangong)</option>
                <option value="Amarnath Yatra">Amarnath Yatra</option>
                <option value="Vaishno Devi">Vaishno Devi</option>
                <option value="Holy Umrah">Holy Umrah</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 transition-colors text-left">
            <Calendar className="w-4 h-4 text-[#c89f56] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider block leading-none mb-1">
                Travel Date
              </label>
              <select
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-black focus:outline-none cursor-pointer truncate"
              >
                <option value="">Select Date</option>
                <option value="This Month">This Month</option>
                <option value="Next Month">Next Month</option>
                <option value="Spring (Mar - Apr)">Spring (Mar - Apr)</option>
                <option value="Summer (May - Jun)">Summer (May - Jun)</option>
                <option value="Autumn (Sep - Nov)">Autumn (Sep - Nov)</option>
                <option value="Winter (Dec - Feb)">Winter (Dec - Feb)</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 transition-colors text-left">
            <Users className="w-4 h-4 text-[#c89f56] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider block leading-none mb-1">
                Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-black focus:outline-none cursor-pointer truncate"
              >
                <option value="2 Adults">2 Adults</option>
                <option value="3 Adults">3 Adults</option>
                <option value="4 Family Members">4 Family Members</option>
                <option value="5-8 Group">5 - 8 Group</option>
                <option value="8+ Group">8+ Group</option>
                <option value="1 Adult">1 Adult (Solo)</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#0e2a1e] hover:bg-[#153e2d] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
