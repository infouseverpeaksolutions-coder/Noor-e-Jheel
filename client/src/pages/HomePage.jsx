import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  Headphones, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';

import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import TestimonialCard from '../components/TestimonialCard';
import TripSearchWidget from '../components/TripSearchWidget';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SEOHead from '../components/SEOHead';
import { buildGeneralWhatsAppUrl, buildPackageWhatsAppUrl } from '../utils/whatsapp';

export default function HomePage({ settings }) {
  const whatsappGeneralUrl = buildGeneralWhatsAppUrl("Hello NOOR-E-JHEEL TOUR AND TRAVEL! I would like to plan a tour to Kashmir/Ladakh/Umrah.", settings);

  const heroSlides = [
    {
      id: "slide-1",
      image: "/images/hero/hero-slide-1.jpg",
      location: "Dal Lake, Srinagar",
      alt: "Dal Lake Srinagar Houseboats, Kashmir"
    },
    {
      id: "slide-2",
      image: "/images/hero/hero-slide-2.jpg",
      location: "Pir Panjal Alpine Peaks",
      alt: "Pir Panjal Snow Summits & Pine Forest"
    },
    {
      id: "slide-3",
      image: "/images/hero/hero-slide-3.jpg",
      location: "Apharwat Peak, Gulmarg",
      alt: "Apharwat Peak High Altitude Sunset"
    },
    {
      id: "slide-4",
      image: "/images/hero/hero-slide-4.jpg",
      location: "Khardung La, Ladakh",
      alt: "Khardung La Golden Himalayan Ridge"
    },
    {
      id: "slide-5",
      image: "/images/hero/hero-slide-5.jpg",
      location: "Aru Valley, Pahalgam",
      alt: "Aru Valley Highland Meadow & Sunset"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const bestSellingPackages = [
    {
      id: "pkg-kashmir-family-tour-6d5n",
      title: "Kashmir Family Tour",
      slug: "kashmir-family-tour-6d5n",
      category: "family",
      duration: "6 Days / 5 Nights",
      starting_price: 16900,
      hero_image: "/images/packages/kashmir-family-tour.jpg",
      destinations: ["Srinagar", "Dal Lake", "Gulmarg", "Pahalgam"],
      badge: "Family Favorite",
      badgeColor: "bg-[#0e2a1e]"
    },
    {
      id: "pkg-kashmir-tour-package-6d5n",
      title: "Kashmir Tour Package",
      slug: "kashmir-tour-package-6d5n",
      category: "kashmir",
      duration: "6 Days / 5 Nights",
      starting_price: 18900,
      hero_image: "/images/packages/kashmir-tour-package.jpg",
      destinations: ["Srinagar", "Pahalgam", "Sonamarg", "Dal Lake"],
      badge: "Most Popular",
      badgeColor: "bg-[#0b3c37]"
    },
    {
      id: "pkg-kashmir-offbeat-7d6n",
      title: "Kashmir Offbeat Package",
      slug: "kashmir-offbeat-7d6n",
      category: "kashmir",
      duration: "7 Days / 6 Nights",
      starting_price: 32000,
      hero_image: "/images/packages/kashmir-offbeat-package.jpg",
      destinations: ["Srinagar", "Gurez", "Bungus", "Doodhpathri"],
      badge: "Offbeat",
      badgeColor: "bg-[#18392b]"
    },
    {
      id: "pkg-kashmir-vaishnodevi-8d7n",
      title: "Kashmir + Vaishno Devi",
      slug: "kashmir-vaishnodevi-8d7n",
      category: "vaishno-devi",
      duration: "8 Days / 7 Nights",
      starting_price: 24900,
      hero_image: "/images/packages/kashmir-vaishno-devi.jpg",
      destinations: ["Jammu", "Katra", "Vaishno Devi", "Srinagar"]
    }
  ];

  const homeDestinations = [
    { name: "Srinagar", slug: "srinagar", hero_image: "/images/destinations/srinagar.jpg" },
    { name: "Gulmarg", slug: "gulmarg", hero_image: "/images/destinations/gulmarg.webp" },
    { name: "Pahalgam", slug: "pahalgam", hero_image: "/images/destinations/pahalgam.jpg" },
    { name: "Gurez", slug: "gurez-valley", hero_image: "/images/destinations/gurez.jpg" },
    { name: "Doodhpathri", slug: "doodhpathri", hero_image: "/images/destinations/doodhpathri.jpg" },
    { name: "Sonamarg", slug: "sonamarg", hero_image: "/images/destinations/sonamarg.jpg" }
  ];

  const spiritualPackages = [
    {
      id: "pkg-amarnath-yatra-4d3n",
      title: "Amarnath Yatra",
      slug: "amarnath-yatra-4d3n",
      duration: "4 Days / 3 Nights",
      starting_price: 29900,
      hero_image: "/images/spiritual/amarnath-yatra.jpg",
      destinations: ["Srinagar", "Pahalgam", "Baltal", "Amarnath Cave"]
    },
    {
      id: "pkg-vaishno-devi",
      title: "Vaishno Devi",
      slug: "vaishno-devi-packages",
      duration: "8 Days / 7 Nights",
      starting_price: 24900,
      hero_image: "/images/spiritual/vaishno-devi.webp",
      destinations: ["Jammu", "Katra", "Vaishno Devi", "Srinagar"]
    },
    {
      id: "pkg-umrah-packages",
      title: "Umrah Packages",
      slug: "umrah-packages",
      duration: "20 Days / 1 Month",
      starting_price: 120000,
      hero_image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      destinations: ["Makkah & Madinah"]
    }
  ];

  const homeTestimonials = [
    {
      id: "rev-1",
      name: "Ayushi Khan",
      package: "Kashmir Family Tour",
      comment: "Noor-e-Jheel made our Kashmir trip absolutely unforgettable. The arrangements were perfect and the team was very supportive.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "rev-2",
      name: "Mohammed Raza",
      package: "Ladakh Tour Package",
      comment: "Excellent service and very professional team. Our Ladakh trip was a dream come true. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "rev-3",
      name: "Sara Fatima",
      package: "Honeymoon Package",
      comment: "The best travel experience we've had. From booking to the trip, everything was well planned and seamless.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SEOHead 
        title="Noor-e-Jheel Tour & Travel | Explore Kashmir. Experience Paradise."
        description="Customized Kashmir, Ladakh, Yatra & Umrah Packages for unforgettable journeys. Enquire directly on WhatsApp."
      />

      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-6 sm:pt-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {heroSlides.map((slide, idx) => {
            const isActive = currentSlide === idx;
            return (
              <div 
                key={slide.id} 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="relative z-20 max-w-7xl mx-auto w-full my-auto py-2 sm:py-4 flex justify-center">
          <div className="max-w-3xl space-y-4 sm:space-y-5 text-center">
            <div className="flex items-center justify-center gap-2.5 text-[#c89f56] text-xs font-semibold tracking-widest uppercase">
              <span className="w-6 h-[1.5px] bg-[#c89f56]" />
              <span>YOUR DREAM JOURNEY BEGINS HERE</span>
              <span className="w-6 h-[1.5px] bg-[#c89f56]" />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] text-center">
              Explore Kashmir.<br />
              <span className="text-[#c89f56]">Experience Paradise.</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed text-center">
              Customized Kashmir, Ladakh, Yatra & Umrah Packages for unforgettable journeys.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/kashmir-tour-packages"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#c89f56] hover:bg-[#b58e47] text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-md group"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0e2a1e] hover:bg-[#153e2d] border border-emerald-500/20 text-white font-medium text-xs tracking-wide transition-all shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto w-full mb-1.5 sm:mb-3 lg:mb-4">
          <div className="flex items-center justify-between gap-3 mb-2.5 px-1">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === idx 
                      ? 'w-6 h-1.5 bg-[#c89f56]' 
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#c89f56]" />
              <span className="font-medium tracking-wide">{heroSlides[currentSlide].location}</span>
            </div>
          </div>

          <TripSearchWidget settings={settings} />
        </div>
      </section>

      {/* Srinagar-based Kashmir Tour Operator & Who We Are Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c89f56]/15 border border-[#c89f56]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#c89f56]" />
              <span>Registered JK Tourism Travel Agent • Reg. No. JKEA00005105</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 leading-tight">
              A Srinagar-based Kashmir tour operator
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-3xl mx-auto">
              <strong className="text-slate-900 font-semibold">NoorEjheel Travel Kashmir</strong> is run from the valley — not a distant call centre. We plan private trips with local drivers, inspected stays, and day-by-day pacing that respects mountain roads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#c89f56] text-xs font-bold tracking-widest uppercase">
                  <span className="w-5 h-[2px] bg-[#c89f56]" />
                  <span>WHO WE ARE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug">
                  Founded by Abid Tariq — Ground Team Operating Directly in Srinagar
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Founded by Abid Tariq, Noor-e-Jheel travel kashmir started as a ground team in Srinagar and still operates from Srinagar. We are a registered JK Tourism travel agent (Reg. No. JKEA00005105). We build Kashmir tour packages around how the valley actually works: airport pickup at SXR, winter chain checks on the Gulmarg road, and hotel or houseboat nights we have walked through ourselves.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Travelers searching for a local agency often want one thing: someone who is here when the weather shifts. Our drivers know NH timings. Our hosts confirm Gondola slots and Shikara hours. If a pass closes, we rewrite the day — we do not read it off a brochure in another city.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="font-semibold text-slate-900 flex flex-wrap items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
                    <span>Call or WhatsApp:</span>
                    <a href="tel:+917889689811" className="text-slate-900 hover:text-[#c89f56] font-bold">+91 7889689811</a>
                    <span>/</span>
                    <a href="tel:+919070899749" className="text-slate-900 hover:text-[#c89f56] font-bold">+91 9070899749</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
                    <span>Email:</span>
                    <a href="mailto:enquiry@noorjheelkashmir.com" className="text-[#c89f56] hover:underline font-medium">
                      enquiry@noorjheelkashmir.com
                    </a>
                  </div>
                </div>

                <a
                  href={`https://wa.me/917889689811?text=${encodeURIComponent("Hello Noor-e-Jheel! I want to plan a trip with your local Srinagar team.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0e2a1e] hover:bg-[#153e2d] text-white font-semibold text-xs shadow-md transition-all shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0a0d10] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border border-white/10">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-[#c89f56] text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4 text-[#c89f56]" />
                  <span>WHY LOCAL MATTERS</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-[#c89f56]/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#c89f56]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">JK Tourism Registered</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">Govt Reg. No. JKEA00005105</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-[#c89f56]/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#c89f56]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Srinagar Ground Operations</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">Managed right from the valley, not distant call centres.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-[#c89f56]/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-[#c89f56]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Live On-Road Decisions</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">NH-44 timings, snow-chains, Gondola slots & instant rerouting.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-white/10">
                <span className="text-[11px] text-slate-400">
                  Direct founder access: <strong className="text-[#c89f56]">Abid Tariq & Srinagar Concierge</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase mb-1">
              <span className="w-5 h-[1.5px] bg-[#c89f56]" />
              <span>POPULAR PACKAGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Best Selling <span className="text-[#c89f56]">Kashmir</span> Packages
            </h2>
            <p className="text-xs sm:text-sm text-black font-normal mt-1">
              Handpicked experiences for every kind of traveler
            </p>
          </div>

          <Link
            to="/kashmir-tour-packages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:text-[#c89f56] transition-colors"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellingPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              settings={settings}
              badgeText={pkg.badge}
              badgeColor={pkg.badgeColor}
            />
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase mb-1">
              <span className="w-5 h-[1.5px] bg-[#c89f56]" />
              <span>EXPLORE DESTINATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Discover the Beauty of Kashmir
            </h2>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:text-[#c89f56] transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeDestinations.map((dest) => (
            <DestinationCard key={dest.name} destination={dest} />
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative bg-[#f8f3eb] rounded-3xl overflow-hidden border border-[#eadbc8] shadow-sm">
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-[46%] w-full h-64 sm:h-80 lg:h-full overflow-hidden">
            <img
              src="/images/banners/honeymoon-shikara.png"
              alt="Honeymoon Couple in Shikara on Dal Lake at Sunset"
              className="w-full h-full object-cover object-left"
              loading="lazy"
            />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#f8f3eb]/25 to-[#f8f3eb]" />
            <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f3eb]/40 to-[#f8f3eb]" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:py-12 lg:pr-10 lg:pl-[44%] grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
            <div className="xl:col-span-7 space-y-4 text-left relative">
              <Heart className="absolute -top-2 right-4 w-9 h-9 text-[#c89f56]/70 stroke-[1.2] fill-none" />

              <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase">
                <span className="w-5 h-[1.5px] bg-[#c89f56]" />
                <span>ROMANTIC GETAWAYS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Honeymoon <span className="italic text-[#c89f56] font-normal">in</span> Kashmir
              </h2>

              <p className="text-xs sm:text-sm text-black font-normal leading-relaxed max-w-md">
                Create beautiful memories with your loved one in the paradise on earth.
              </p>

              <div className="pt-2">
                <Link
                  to="/honeymoon-packages"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#dfba73] hover:bg-[#c89f56] text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-sm"
                >
                  <span>Explore Honeymoon Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="xl:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#eadbc8]/70 shadow-sm text-left">
              <h3 className="text-xs font-bold text-[#0e2a1e] tracking-wide uppercase">
                Popular Honeymoon Destinations
              </h3>
              <div className="w-full h-[1px] bg-[#eadbc8] mt-2 mb-3.5" />

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-black font-medium">
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Srinagar</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Drung</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Gulmarg</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Verinag</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" /> Pahalgam</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" /> Gurez</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" /> Sonamarg</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" /> Bungus Valley</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Doodhpathri</span>
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0e2a1e] shrink-0" /> Aharbal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase mb-1">
              <span className="w-5 h-[1.5px] bg-[#c89f56]" />
              <span>SPIRITUAL JOURNEYS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Faith Brings You Closer
            </h2>
          </div>

          <Link
            to="/amarnath-yatra-packages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:text-[#c89f56] transition-colors"
          >
            <span>View All Yatra Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spiritualPackages.map((pkg) => {
            const waUrl = buildPackageWhatsAppUrl(pkg, '', settings);
            return (
              <div 
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={pkg.hero_image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5 space-y-2.5 text-left">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {pkg.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-black font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-black font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#c89f56] shrink-0" />
                      <span className="truncate">{pkg.destinations.join(', ')}</span>
                    </div>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-slate-900">
                        ₹{Number(pkg.starting_price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-black font-normal">Starting from</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0e2a1e] hover:bg-[#153e2d] text-white font-medium text-xs transition-colors shadow-sm"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-[#faf7f2] border-y border-[#ede6da]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase mb-1">
              <span className="w-5 h-[1.5px] bg-[#c89f56]" />
              <span>WHY CHOOSE NOOR-E-JHEEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Your Trusted Travel Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f3ebd9] border border-[#dfd0b5] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#9e7627]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-slate-900">Trusted Service</h3>
                <p className="text-xs text-black font-normal leading-relaxed">
                  Safe, reliable and hassle-free travel experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f3ebd9] border border-[#dfd0b5] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#9e7627]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-slate-900">Local Expertise</h3>
                <p className="text-xs text-black font-normal leading-relaxed">
                  In-depth knowledge of Kashmir & beyond.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f3ebd9] border border-[#dfd0b5] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#9e7627]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-slate-900">Customized Itineraries</h3>
                <p className="text-xs text-black font-normal leading-relaxed">
                  Tailor-made trips as per your preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f3ebd9] border border-[#dfd0b5] flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-[#9e7627]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-slate-900">24/7 Assistance</h3>
                <p className="text-xs text-black font-normal leading-relaxed">
                  We're always here to help you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#c89f56] text-xs font-semibold tracking-widest uppercase mb-1">
            <span className="w-5 h-[1.5px] bg-[#c89f56]" />
            <span>TRAVELERS SPEAK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeTestimonials.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
}
