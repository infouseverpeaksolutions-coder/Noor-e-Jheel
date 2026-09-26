import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialCard({ review }) {
  const { name, comment, avatar, package: packageName } = review;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 text-left">
      <div className="flex items-start gap-3.5">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"
          loading="lazy"
        />
        <div className="space-y-1">
          <p className="text-sm text-black leading-relaxed font-normal">
            "{comment}"
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">{name}</h4>
          {packageName && (
            <span className="text-xs text-black font-medium block">{packageName}</span>
          )}
        </div>

        <div className="flex items-center gap-0.5 text-[#c89f56]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#c89f56] text-[#c89f56]" />
          ))}
        </div>
      </div>
    </div>
  );
}
