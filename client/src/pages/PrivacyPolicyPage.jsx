import React from 'react';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Privacy Policy | Noor-e-Jheel Tour & Travel"
        description="Privacy policy and data protection practices for visitors of Noor-e-Jheel Tour & Travel website."
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">Privacy Policy</h1>
        <p className="text-slate-300 text-xs mt-2">Effective Date: January 1, 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-xs sm:text-sm text-black leading-relaxed space-y-6 font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p className="text-black">
              Noor-e-Jheel Tour & Travel respects your personal privacy. Our website is primarily an informational catalog and lead generation platform. When you voluntarily use our "Customize Your Trip" form or "Contact Us" form, we collect the basic details you provide: your name, telephone/WhatsApp number, email address, travel dates, and travel preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
            <p className="text-black">
              We use your contact details solely to generate customized tour itineraries, answer your WhatsApp or phone inquiries, coordinate offline bookings with verified hotels, and provide on-ground concierge support in Kashmir, Ladakh, or Saudi Arabia during your trip.
            </p>
            <p className="text-black">
              We never sell, rent, or lease your personal contact information to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. WhatsApp Link Generation</h2>
            <p className="text-black">
              Our website uses direct client-side WhatsApp link generation (wa.me) for instant messaging. When you click an "Enquire on WhatsApp" button, your selected trip choices are formatted into a URL and opened inside your WhatsApp client under your control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Contact Information</h2>
            <p className="text-black">
              If you have any questions regarding our privacy practices, please contact us at <strong>noorjheel78@gmail.com</strong>, call/WhatsApp us at <strong>+91 78896 89811</strong> (Alt: <strong>+91 90708 99749</strong>), or visit our office at Parimpora, Qamarwari, Srinagar, Jammu & Kashmir 190017.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
