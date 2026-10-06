import React from 'react';
import { CQAS_LOGO_SVG, getEmployeeAvatarSvg } from '../assets/assetLibrary';
import { Employee, OrganizationConfig } from '../types';

interface PromotionSlideProps {
  employee: Employee;
  quote: string;
  organization: OrganizationConfig;
}

export const PromotionSlide: React.FC<PromotionSlideProps> = ({
  employee,
  quote,
  organization
}) => {
  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#FFF0E6]" />
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-emerald-600/15 to-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-orange-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              Controllerate of Quality Assurance Systems
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              CAREER ADVANCEMENT & LEADERSHIP ELEVATION
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>PROMOTION FELICITATION</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full my-4">
        {/* Left: Photo Frame with Saffron & Emerald Border */}
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

        {/* Right: Promotion Transition Details */}
        <div className="col-span-7 space-y-6">
          <div>
            <span className="text-orange-600 uppercase tracking-[0.3em] text-xs font-bold block mb-2">
              EXECUTIVE ELEVATION ANNOUNCEMENT
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-none mb-2">
              Congratulations on Promotion
            </h1>
            <h2 className="text-3xl lg:text-4xl font-serif font-black text-emerald-800">
              {employee.name}
            </h2>
          </div>

          {/* Promotion Transition Ladder in Cream White with Orange & Green borders */}
          <div className="p-5 rounded-2xl bg-white border-2 border-orange-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest font-sans font-bold border-b border-stone-200 pb-2">
              <span>Department: {employee.department}</span>
              <span className="text-orange-700">Effective Date: {employee.promotionDate || 'Today'}</span>
            </div>

            <div className="flex items-center gap-4 py-2">
              {/* Previous Designation */}
              <div className="flex-1 p-3.5 rounded-xl bg-stone-50 border-2 border-stone-200 text-center">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Previous Role</div>
                <div className="text-base font-serif font-medium text-stone-700 mt-1">
                  {employee.previousDesignation || 'Quality Officer'}
                </div>
              </div>

              {/* Transition Arrow */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-md">
                ➔
              </div>

              {/* New Designation */}
              <div className="flex-1 p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-center shadow-md">
                <div className="text-[11px] uppercase tracking-wider text-emerald-800 font-bold">Elevated To</div>
                <div className="text-lg font-serif font-black text-emerald-950 mt-1">
                  {employee.newDesignation || employee.designation}
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="p-5 rounded-2xl bg-white/90 border-2 border-orange-100 shadow-md">
            <blockquote className="text-base lg:text-lg font-serif text-stone-800 italic leading-relaxed font-medium">
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
