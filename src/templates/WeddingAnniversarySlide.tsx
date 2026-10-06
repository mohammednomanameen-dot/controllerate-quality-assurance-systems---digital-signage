import React from 'react';
import { CQAS_LOGO_SVG, getEmployeeAvatarSvg } from '../assets/assetLibrary';
import { Employee, OrganizationConfig } from '../types';

interface WeddingAnniversarySlideProps {
  employee: Employee;
  years: number;
  quote: string;
  organization: OrganizationConfig;
}

export const WeddingAnniversarySlide: React.FC<WeddingAnniversarySlideProps> = ({
  employee,
  years,
  quote,
  organization
}) => {
  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#FFF0E8]" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-600/15 to-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-orange-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              Controllerate of Quality Assurance Systems
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              MARITAL MILESTONE CELEBRATION
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>WEDDING ANNIVERSARY</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full my-4">
        {/* Left: Photo Frame */}
        <div className="col-span-5 flex justify-center">
          <div className="relative w-80 aspect-[4/5] rounded-2xl overflow-hidden border-3 border-orange-400 shadow-2xl p-1 bg-gradient-to-b from-orange-400 via-amber-200 to-emerald-500">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
              <img
                src={getEmployeeAvatarSvg(employee.name, employee.designation)}
                alt={employee.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div className="col-span-7 space-y-6">
          <div>
            <span className="text-orange-600 uppercase tracking-[0.3em] text-xs font-bold block mb-2">
              CELEBRATING LIFELONG COMPANIONSHIP
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight mb-2">
              Happy Wedding Anniversary
            </h1>
            <h2 className="text-3xl lg:text-4xl font-serif font-black text-emerald-800">
              {employee.name}
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-between shadow-md">
            <div>
              <div className="text-lg font-bold text-stone-800">{employee.designation}</div>
              <div className="text-xs text-stone-600 font-sans font-medium">{employee.department}</div>
            </div>
            {years > 0 && (
              <div className="text-right border-l-2 border-stone-200 pl-6">
                <div className="text-2xl font-serif font-black text-orange-600">{years} Years</div>
                <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Of Joyful Marriage</div>
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border-2 border-orange-100 shadow-md">
            <blockquote className="text-lg font-serif text-stone-800 italic leading-relaxed font-medium">
              "{quote}"
            </blockquote>
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
