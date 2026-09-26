// fallback number if settings endpoint isn't loaded yet
const DEFAULT_WHATSAPP_NUMBER = "917889689811";

export function getWhatsAppNumber(settings) {
  if (settings && settings.whatsapp_number) {
    return settings.whatsapp_number.replace(/\D/g, '');
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function buildPackageWhatsAppUrl(pkg, customNotes = '', settings = null) {
  const number = getWhatsAppNumber(settings);
  const destString = (pkg.destinations || []).join(' → ') || 'Kashmir';
  const priceFormatted = Number(pkg.starting_price || 0).toLocaleString('en-IN');

  let text = `🌟 *INQUIRY: NOOR-E-JHEEL TOUR & TRAVEL*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📦 *Package:* ${pkg.title}\n`;
  text += `⏱ *Duration:* ${pkg.duration || `${pkg.days}D / ${pkg.nights}N`}\n`;
  text += `💰 *Starting Price:* ₹${priceFormatted} / person*\n`;
  text += `📍 *Destinations:* ${destString}\n`;
  
  if (customNotes && customNotes.trim()) {
    text += `📝 *Guest Notes:* ${customNotes.trim()}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Hello Noor-e-Jheel team! I am interested in this package. Please share the detailed itinerary, available hotel categories, current season discount, and a customized quote.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildCustomTripWhatsAppUrl(formData, settings = null) {
  const number = getWhatsAppNumber(settings);
  const dests = Array.isArray(formData.destinations) && formData.destinations.length > 0 
    ? formData.destinations.join(', ') 
    : (formData.destination || 'Kashmir Highlights');

  let text = `✨ *CUSTOMIZED TRIP INQUIRY — NOOR-E-JHEEL*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📍 *Places to Visit:* ${dests}\n`;
  text += `📅 *Tentative Travel Date:* ${formData.travel_date || 'Flexible / Upcoming'}\n`;
  text += `⏳ *Duration:* ${formData.duration || '6 Days / 5 Nights'}\n`;
  text += `👥 *Travelers:* ${formData.adults || 2} Adults, ${formData.children || 0} Children\n`;
  text += `🏨 *Hotel Category:* ${formData.hotel_category || '3 Star / Deluxe'}\n`;
  text += `🚗 *Cab Preference:* ${formData.cab_type || 'Private Sedan / Innova'}\n`;
  text += `💵 *Estimated Budget:* ${formData.budget || 'Standard / Flexible'}\n`;
  
  if (formData.notes && formData.notes.trim()) {
    text += `📝 *Special Requests:* ${formData.notes.trim()}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *Guest Name:* ${formData.name || 'Traveler'}\n`;
  if (formData.phone) text += `📞 *Phone:* ${formData.phone}\n`;
  if (formData.email) text += `✉️ *Email:* ${formData.email}\n`;
  text += `\nPlease plan an ideal customized itinerary and share the best package quote with us.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralWhatsAppUrl(message = '', settings = null) {
  const number = getWhatsAppNumber(settings);
  const defaultMsg = "Hello Noor-e-Jheel Tour & Travel! I would like to plan a trip to Kashmir/Ladakh/Umrah. Please assist me with package options and pricing.";
  const text = message && message.trim() ? message.trim() : defaultMsg;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
