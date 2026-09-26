import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

import HomePage from './pages/HomePage';
import PackagesListPage from './pages/PackagesListPage';
import PackageDetailPage from './pages/PackageDetailPage';
import DestinationsListPage from './pages/DestinationsListPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import CustomizeTripPage from './pages/CustomizeTripPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

import { api } from './services/api';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [settings, setSettings] = useState(null);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isPackageDetail = location.pathname.startsWith('/packages/');

  useEffect(() => {
    Promise.all([
      api.getSettings(),
      api.getPackages(),
      api.getDestinations(),
      api.getTestimonials(),
      api.getBlogs()
    ]).then(([settData, pkgData, destData, testData, blogData]) => {
      if (settData) setSettings(settData);
      if (pkgData) setPackages(pkgData);
      if (destData) setDestinations(destData);
      if (testData) setTestimonials(testData);
      if (blogData) setBlogs(blogData);
      setLoading(false);
    }).catch(err => {
      console.error('Initialization error:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800 selection:bg-[#c89f56] selection:text-black">
      <ScrollToTop />
      <Header settings={settings} />

      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                packages={packages} 
                destinations={destinations} 
                testimonials={testimonials} 
                blogs={blogs} 
                settings={settings} 
              />
            } 
          />

          <Route path="/kashmir-tour-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/ladakh-tour-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/umrah-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/amarnath-yatra-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/vaishno-devi-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/honeymoon-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/family-packages" element={<PackagesListPage packages={packages} settings={settings} />} />
          <Route path="/group-tours" element={<PackagesListPage packages={packages} settings={settings} />} />

          <Route path="/packages/:slug" element={<PackageDetailPage settings={settings} />} />
          <Route path="/destinations" element={<DestinationsListPage destinations={destinations} />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage packages={packages} settings={settings} />} />

          <Route path="/customize-trip" element={<CustomizeTripPage settings={settings} />} />

          <Route path="/about-us" element={<AboutPage settings={settings} />} />
          <Route path="/contact-us" element={<ContactPage settings={settings} />} />
          <Route path="/testimonials" element={<TestimonialsPage testimonials={testimonials} settings={settings} />} />
          <Route path="/blog" element={<BlogListPage blogs={blogs} />} />
          <Route path="/blog/:slug" element={<BlogDetailPage settings={settings} />} />
          <Route path="/faqs" element={<FAQPage settings={settings} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsPage />} />

          <Route path="*" element={<HomePage packages={packages} destinations={destinations} testimonials={testimonials} blogs={blogs} settings={settings} />} />
        </Routes>
      </main>

      <Footer settings={settings} />

      {/* Package detail has its own fixed bottom bar */}
      {!isPackageDetail && <MobileStickyBar settings={settings} />}
    </div>
  );
}
