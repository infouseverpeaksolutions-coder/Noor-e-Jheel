# Noor-e-Jheel Tour & Travel — Lead-Generation Travel Platform

A travel lead-generation web platform built for **Noor-e-Jheel Tour & Travel** (Srinagar, Jammu & Kashmir) — specializing in Kashmir, Ladakh, Mata Vaishno Devi, Amarnath Yatra, and Holy Umrah tour packages.

---

## 🎯 Business Model
- **Pure Lead Generation:** Website → Package → "Enquire on WhatsApp" → Local Srinagar Sales Team → Offline Quote/Booking.
- **Zero Online Booking/Payments:** No database, no checkout, no payment gateways, no customer accounts.

---

## 💻 Tech Stack — MERN, No Database
- **Frontend:** React 18 + Vite + React Router v6 + Tailwind CSS + Lucide Icons.
- **Backend:** Node.js + Express REST API.
- **Persistence:** 100% Flat JSON files on disk (`/server/data/`), with safe atomic writes (`fileStorage.js` with temp-file rename & promise-queue mutex to prevent concurrency issues).
  - `packages.json`: 11 seeded tour packages with itineraries, highlights, inclusions, FAQs
  - `destinations.json`: 20 destinations across Kashmir, Ladakh, and Jammu
  - `testimonials.json`: Verified customer reviews
  - `blog.json`: Kashmir travel guides & pilgrimage preparation
  - `settings.json`: WhatsApp number, phone, email, office address, announcement bar
  - `enquiries.json`: Non-blocking disk log of customer inquiries

---

## 📱 WhatsApp Integration
Every package card, package detail page, destination page, and the **Customize Your Trip** multi-step planner compiles selections client-side into a rich, formatted, URL-encoded `wa.me` link:
- Package Title, Duration, Starting Price
- Selected Destinations route
- Tentative travel date & number of travelers (Adults & Children)
- Hotel category & private cab preferences
- Guest notes and contact info

---

## 🚀 How to Run

### 1. Start the Backend API (Port 5001)
```bash
cd server
npm install
npm start
```

### 2. Start the Frontend Dev Server (Port 3000)
```bash
cd client
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧭 Core Routes & Pages
- **Homepage (`/`)**: 12 sections including full-bleed hero, search planner, featured packages with category tabs, destinations showcase, honeymoon luxury section, spiritual journeys, why travel with us, testimonials, blog preview, FAQ accordion, and mobile sticky bar.
- **Category Landing Pages**:
  - `/kashmir-tour-packages`
  - `/ladakh-tour-packages`
  - `/umrah-packages`
  - `/amarnath-yatra-packages`
  - `/vaishno-devi-packages`
  - `/honeymoon-packages`
  - `/family-packages`
  - `/group-tours`
- **Package Detail (`/packages/:slug`)**: Highlights, day-by-day itinerary with meals & stay, inclusions (✓) / exclusions (×), gallery, FAQs, and sticky WhatsApp enquiry block.
- **All Destinations (`/destinations`)** and **Destination Detail (`/destinations/:slug`)**: Detailed guides for 20 locations across Kashmir, Ladakh, and Jammu.
- **Customize Your Trip (`/customize-trip`)**: Multi-step interactive custom trip builder.
- **About Us (`/about-us`)**, **Contact Us (`/contact-us`)**, **Testimonials (`/testimonials`)**, **Travel Guides (`/blog`)**, **FAQs (`/faqs`)**, **Privacy Policy (`/privacy-policy`)**, **Terms & Conditions (`/terms-conditions`)**.
