import React from 'react';
import { CQAS_LOGO_SVG, getFestivalArtworkSvg } from '../assets/assetLibrary';
import { Festival, OrganizationConfig } from '../types';

interface FestivalSlideProps {
  festival: Festival;
  organization: OrganizationConfig;
}

export const FestivalSlide: React.FC<FestivalSlideProps> = ({
  festival,
  organization
}) => {
  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#FFF0E2]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-orange-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              {organization.name}
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              {organization.location} • {organization.slogan}
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>FESTIVAL GREETINGS</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full my-4">
        {/* Left: Festival Artwork Canvas */}
        <div className="col-span-5 flex justify-center">
          <div className="relative w-96 aspect-[4/3] rounded-2xl overflow-hidden border-3 border-orange-400 shadow-2xl p-1 bg-gradient-to-b from-orange-400 via-amber-200 to-emerald-500">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
              <img
                src={getFestivalArtworkSvg(festival.name)}
                alt={festival.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Right: Festival Name, Hindi Blessing, Institutional Signature */}
        <div className="col-span-7 space-y-6">
          <div>
            <span className="text-orange-600 uppercase tracking-[0.3em] text-xs font-bold block mb-2">
              AUSPICIOUS CELEBRATION
            </span>
            <h1 className="text-5xl lg:text-6xl font-serif font-black text-stone-900 tracking-tight leading-none mb-3">
              Happy {festival.name}
            </h1>
            {festival.subtext && (
              <div className="text-2xl lg:text-3xl font-hindi font-extrabold text-emerald-800">
                {festival.subtext}
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-orange-200 shadow-lg">
            <blockquote className="text-xl lg:text-2xl font-serif text-stone-800 italic leading-relaxed font-medium">
              "{festival.greeting}"
            </blockquote>
          </div>

          <div className="border-l-4 border-emerald-600 pl-5 text-sm font-sans text-stone-700">
            <p className="font-bold text-stone-900">From:</p>
            <p className="text-orange-600 font-serif font-black text-lg">{organization.name}</p>
            <p className="text-xs text-stone-500 font-medium">The Controller, Officers & Staff Members</p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 flex items-center justify-between text-xs text-stone-600 font-sans border-t border-stone-200 pt-4">
        <span className="font-semibold">{organization.name} • {organization.location}</span>
        <span className="text-emerald-800 font-hindi font-bold text-sm">गुणवत्ता से विश्वास</span>
      </div>
    </div>
  );
};
