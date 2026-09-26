import React from 'react';
import SEOHead from '../components/SEOHead';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <SEOHead
        title="Terms & Conditions | Noor-e-Jheel Tour & Travel"
        description="Terms and conditions for tour bookings, quotes, itineraries, and cancellations with Noor-e-Jheel Tour & Travel."
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-center">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">Terms & Conditions</h1>
        <p className="text-slate-300 text-xs mt-2">Last Updated: January 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-xs sm:text-sm text-black leading-relaxed space-y-6 font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Nature of the Website</h2>
            <p className="text-black">
              This website serves as an informational and lead-generation portal for Noor-e-Jheel Tour & Travel. No online financial transactions, automated hotel reservations, or customer account creation take place on this platform. All bookings and finalized quotes are conducted offline between the traveler and our authorized Srinagar sales team via WhatsApp, phone, or official company email.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Pricing & Quotations</h2>
            <p className="text-black">
              All prices displayed across this website are indicative <em>"Starting from ₹X / person*"</em> estimates based on seasonal averages and twin/triple sharing occupancy. Exact package costs depend on your final travel dates, hotel category (3★ Deluxe, 4★ Premium, 5★ Luxury, or Houseboat), number of travelers, and cab selection. A binding quote is provided only in the customized offline booking voucher.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Weather & Road Conditions (Force Majeure)</h2>
            <p className="text-black">
              Mountain travel in Jammu & Kashmir and Ladakh is subject to dynamic high-altitude weather and seasonal road clearances (e.g. Zoji La, Razdan Pass, Mughal Road). In case of unexpected pass closures, heavy snowfall, or landslides, Noor-e-Jheel's local tour managers will assist in rerouting or rescheduling itineraries in the best interest of guest safety.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Gulmarg Gondola & Yatra Permits</h2>
            <p className="text-black">
              Tickets for the Gulmarg Gondola Cable Car and SASB Amarnath Yatra helicopter passes are governed by Jammu & Kashmir state authorities and subject to statutory availability and weather safety clearances.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
