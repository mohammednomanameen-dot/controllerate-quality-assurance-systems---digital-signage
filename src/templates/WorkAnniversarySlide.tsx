import React from 'react';
import { CQAS_LOGO_SVG, getEmployeeAvatarSvg } from '../assets/assetLibrary';
import { Employee, OrganizationConfig } from '../types';

interface WorkAnniversarySlideProps {
  employee: Employee;
  years: number;
  ordinalYears: string;
  quote: string;
  organization: OrganizationConfig;
}

export const WorkAnniversarySlide: React.FC<WorkAnniversarySlideProps> = ({
  employee,
  years,
  ordinalYears,
  quote,
  organization
}) => {
  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      {/* Background Ambience with Cream White, Emerald Green & Saffron Orange Radiance */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#EBF5EF]" />
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-emerald-600/10 to-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-orange-500/10 to-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-emerald-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              Controllerate of Quality Assurance Systems
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              SERVICE MILESTONE & INSTITUTIONAL DEDICATION
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>WORK ANNIVERSARY HONOUR</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full my-4">
        {/* Left: Large Photo with Milestone Ring */}
        <div className="col-span-5 flex justify-center">
          <div className="relative w-80 aspect-[4/5] rounded-2xl overflow-hidden border-3 border-emerald-500 shadow-2xl p-1 bg-gradient-to-b from-emerald-400 via-amber-200 to-orange-400">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
              <img
                src={getEmployeeAvatarSvg(employee.name, employee.designation)}
                alt={employee.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Milestone Badge in corner in Saffron Orange */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl border-2 border-white text-center">
              <div className="text-2xl font-serif leading-none">{years}</div>
              <div className="text-[10px] uppercase tracking-wider font-sans font-bold">YEARS</div>
            </div>
          </div>
        </div>

        {/* Right: Milestone Title, Person, Service Statement */}
        <div className="col-span-7 space-y-6">
          <div>
            <div className="inline-block text-emerald-800 uppercase tracking-[0.3em] text-xs font-bold mb-2 px-3.5 py-1 bg-emerald-100 rounded-full border border-emerald-300">
              {ordinalYears.toUpperCase()} WORK ANNIVERSARY
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight mb-2">
              Celebrating Your Work Anniversary
            </h1>
            <h2 className="text-3xl lg:text-4xl font-serif font-black text-orange-600">
              {employee.name}
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-orange-50 border-2 border-emerald-200/80 shadow-md">
            <div className="text-2xl font-serif text-emerald-900 font-bold mb-1">
              {years} Years of Dedicated Service
            </div>
            <div className="text-sm text-stone-700 font-sans font-medium">
              {employee.designation} • {employee.department}
            </div>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-2xl bg-white/90 border-2 border-orange-100 shadow-md">
            <blockquote className="text-lg lg:text-xl font-serif text-stone-800 italic leading-relaxed font-medium">
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
