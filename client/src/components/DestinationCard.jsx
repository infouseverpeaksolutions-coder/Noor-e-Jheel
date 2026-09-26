import React from 'react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  return (
    <Link 
      to={`/destinations/${destination.slug}`}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
    >
      <img 
        src={destination.hero_image} 
        alt={destination.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-0 right-0 text-center px-2">
        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#c89f56] transition-colors">
          {destination.name}
        </h3>
      </div>
    </Link>
  );
};

export default DestinationCard;
