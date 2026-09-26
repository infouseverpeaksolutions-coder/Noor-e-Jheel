import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Header({ settings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const whatsappUrl = buildGeneralWhatsAppUrl("Hello NOOR-E-JHEEL TOUR AND TRAVEL! I would like to enquire about tour packages.", settings);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Kashmir', path: '/kashmir-tour-packages' },
    { name: 'Ladakh', path: '/ladakh-tour-packages' },
    { name: 'Umrah', path: '/umrah-packages' },
    { name: 'Yatra', path: '/amarnath-yatra-packages' },
    { name: 'Honeymoon', path: '/honeymoon-packages' },
    { name: 'Destinations', path: '/destinations' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Noor-e-Jheel Tour & Travel" 
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c89f56] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c89f56]/70 hover:border-[#c89f56] bg-black/40 hover:bg-[#c89f56]/10 text-white text-xs font-medium transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#c89f56]" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#c89f56]/50 text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#c89f56]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1217] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                location.pathname === link.path ? 'text-[#c89f56] bg-white/5 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-[#c89f56] bg-[#0e2a1e] text-white text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-[#c89f56]" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
