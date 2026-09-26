import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import SEOHead from '../components/SEOHead';
import { Filter, ArrowUpDown, Sparkles, MessageCircle, MapPin } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

const CATEGORY_CONFIG = {
  '/kashmir-tour-packages': {
    title: 'Kashmir Tour Packages 2025/2026',
    subtitle: 'Handpicked holidays covering Dal Lake, Gulmarg, Pahalgam, Sonamarg, Gurez & Doodhpathri',
    category: 'kashmir',
    seoTitle: 'Kashmir Tour Packages 2025/2026 | Best Holiday Itineraries — Noor-e-Jheel',
    seoDesc: 'Explore Kashmir tour packages starting ₹16,900. Private cabs, luxury houseboats, Gulmarg Gondola assistance & verified hotels. Enquire directly on WhatsApp.',
    heroImage: '/images/packages/kashmir-tour-package.jpg'
  },
  '/ladakh-tour-packages': {
    title: 'Ladakh Tour Packages & Expeditions',
    subtitle: 'Trans-Himalayan adventures through Khardung La, Nubra Valley sand dunes & turquoise Pangong Lake',
    category: 'ladakh',
    seoTitle: 'Ladakh Tour Packages 2025/2026 | Leh, Nubra & Pangong Tso — Noor-e-Jheel',
    seoDesc: 'Unforgettable Ladakh road trips and overland tours. Srinagar to Leh, Nubra Valley Swiss camps & Pangong Lake. 100% customized with oxygen support.',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80'
  },
  '/umrah-packages': {
    title: 'Holy Umrah Packages (20 Days & 1 Month)',
    subtitle: 'All-inclusive spiritual journeys to Makkah Mukarramah & Madinah Munawwarah with close-distance hotels',
    category: 'umrah',
    seoTitle: 'Umrah Packages 2025/2026 (20 Days & 30 Days) | Noor-e-Jheel Tour & Travel',
    seoDesc: 'Book verified Holy Umrah Packages with walking-distance hotels, visa processing, flight guidance, Kashmiri food & guided historical Ziyarat.',
    heroImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80'
  },
  '/amarnath-yatra-packages': {
    title: 'Amarnath Yatra Packages 2025/2026',
    subtitle: 'Sacred pilgrimage to the Holy Ice Lingam with helicopter and overland trek logistics',
    category: 'yatra',
    seoTitle: 'Amarnath Yatra Packages 2025/2026 | Baltal & Pahalgam Routes — Noor-e-Jheel',
    seoDesc: 'Perform Amarnath Yatra with peace of mind. Helicopter ticketing guidance, Baltal luxury tents, private Srinagar transfers, and SASB registration help.',
    heroImage: '/images/spiritual/amarnath-yatra.jpg'
  },
  '/vaishno-devi-packages': {
    title: 'Mata Vaishno Devi + Kashmir Tours',
    subtitle: 'Divine blessings at Katra Bhawan combined with the heavenly beauty of Kashmir',
    category: 'vaishno-devi',
    seoTitle: 'Mata Vaishno Devi & Kashmir Tour Packages | Katra to Srinagar — Noor-e-Jheel',
    seoDesc: 'Combined Vaishno Devi Darshan and Kashmir holiday packages. Jammu pickup, Katra stay, Banihal tunnel drive, and Dal Lake houseboat experience.',
    heroImage: '/images/spiritual/vaishno-devi.webp'
  },
  '/honeymoon-packages': {
    title: 'Kashmir Honeymoon Tour Packages',
    subtitle: 'Candlelight dinners on royal houseboats, floral Shikara rides & romantic snow moments in Gulmarg',
    category: 'honeymoon',
    seoTitle: 'Romantic Kashmir Honeymoon Packages 2025/2026 | Luxury Houseboat — Noor-e-Jheel',
    seoDesc: 'Celebrate love in Kashmir with special honeymoon packages. Flower bed decor, honeymoon cake, private sedan, and scenic Betaab valley tours.',
    heroImage: '/images/banners/honeymoon-shikara.png'
  },
  '/family-packages': {
    title: 'Kashmir Family Holiday Packages',
    subtitle: 'Relaxed itineraries, elderly-friendly comfortable cabs & verified star-rated family hotels',
    category: 'family',
    seoTitle: 'Kashmir Family Tour Packages 2025/2026 | Kid & Senior Friendly — Noor-e-Jheel',
    seoDesc: 'Unwind with your loved ones in Kashmir. Gentle pacing, family suites, Gondola assistance, safe private drivers, and delicious buffet meals.',
    heroImage: '/images/packages/kashmir-family-tour.jpg'
  },
  '/group-tours': {
    title: 'Kashmir Group & Corporate Tours',
    subtitle: 'Budget-friendly, high-energy group tours for friends, college reunions & corporate offsites',
    category: 'group',
    seoTitle: 'Kashmir Group Tour Packages 2025/2026 | Friends & Corporate Trips — Noor-e-Jheel',
    seoDesc: 'Exciting group trips to Kashmir with luxury Tempo Travellers, bonfire evenings, Dal Lake houseboat parties, and snow activities.',
    heroImage: '/images/packages/kashmir-offbeat-package.jpg'
  }
};

export default function PackagesListPage({ packages = [], settings }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get('search') || '';

  const config = CATEGORY_CONFIG[location.pathname] || {
    title: 'All Tour Packages',
    subtitle: 'Explore our complete portfolio of Kashmir, Ladakh, Spiritual and Umrah journeys',
    category: null,
    seoTitle: 'All Tour Packages | Noor-e-Jheel Tour & Travel',
    seoDesc: 'Browse all tour packages across Kashmir, Ladakh, Vaishno Devi, Amarnath Yatra & Umrah.',
    heroImage: '/images/destinations/srinagar.jpg'
  };

  const [sortOrder, setSortOrder] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [durationFilter, setDurationFilter] = useState('all');

  const filteredList = useMemo(() => {
    let list = [...packages];

    if (config.category) {
      if (config.category === 'yatra') {
        list = list.filter(p => p.category === 'yatra' || p.category === 'vaishno-devi');
      } else {
        list = list.filter(p => p.category === config.category);
      }
    }

    if (searchParam) {
      const term = searchParam.toLowerCase();
      list = list.filter(p => 
        (p.title || '').toLowerCase().includes(term) ||
        (p.destinations || []).some(d => d.toLowerCase().includes(term))
      );
    }

    if (durationFilter === 'short') {
      list = list.filter(p => (p.days || 6) <= 5);
    } else if (durationFilter === 'medium') {
      list = list.filter(p => (p.days || 6) >= 6 && (p.days || 6) <= 8);
    } else if (durationFilter === 'long') {
      list = list.filter(p => (p.days || 6) >= 9);
    }

    list = list.filter(p => (p.starting_price || 0) <= maxPrice);

    if (sortOrder === 'price-low') {
      list.sort((a, b) => a.starting_price - b.starting_price);
    } else if (sortOrder === 'price-high') {
      list.sort((a, b) => b.starting_price - a.starting_price);
    } else if (sortOrder === 'duration') {
      list.sort((a, b) => (b.days || 0) - (a.days || 0));
    }

    return list;
  }, [packages, config.category, searchParam, durationFilter, maxPrice, sortOrder]);

  const whatsappInquiry = buildGeneralWhatsAppUrl(`Hello Noor-e-Jheel! I am browsing your ${config.title} and would like to request package recommendations and best quotes.`, settings);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SEOHead
        title={config.seoTitle}
        description={config.seoDesc}
        image={config.heroImage}
      />

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0d10]">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroImage} 
            alt={config.title}
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d10] via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c89f56]/20 border border-[#c89f56]/40 text-[#c89f56] text-xs font-bold uppercase tracking-wider">
            Verified Kashmiri Operator
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            {config.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-light">
            {config.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-[#c89f56] flex items-center gap-1.5 uppercase">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </span>

            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-black font-semibold rounded-lg px-3 py-2 focus:border-[#c89f56] focus:outline-none"
            >
              <option value="all">Any Duration</option>
              <option value="short">Short Trips (Up to 5 Days)</option>
              <option value="medium">Classic Trips (6 - 8 Days)</option>
              <option value="long">Long & Extended (9+ Days)</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-black font-semibold rounded-lg px-3 py-2 focus:border-[#c89f56] focus:outline-none"
            >
              <option value="popular">Recommended / Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration: Longest First</option>
            </select>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-black">
              Showing <strong className="text-black">{filteredList.length}</strong> available packages
            </span>

            <a
              href={whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e2a1e] hover:bg-[#153e2d] text-white font-medium text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredList.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} settings={settings} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900">No exact packages found with these filters</h3>
            <p className="text-black text-sm max-w-md mx-auto leading-relaxed">
              Noor-e-Jheel customizes any itinerary according to your exact requirements, budget and dates.
            </p>
            <a
              href={whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0e2a1e] text-white font-medium text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Tell Us What You Need on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
