import React from 'react';

export default function WhatsAppIcon({ className = "w-4 h-4 object-contain shrink-0 inline-block" }) {
  return (
    <img 
      src="/whatsapp.webp" 
      alt="WhatsApp" 
      className={className}
      loading="lazy"
    />
  );
}
