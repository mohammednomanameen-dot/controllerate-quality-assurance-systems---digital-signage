import React from 'react';
import { CQAS_LOGO_SVG, getEmployeeAvatarSvg } from '../assets/assetLibrary';
import { Employee, OrganizationConfig } from '../types';

interface BirthdaySlideProps {
  employees: Employee[];
  quote: string;
  organization: OrganizationConfig;
  isMultiple?: boolean;
}

export const BirthdaySlide: React.FC<BirthdaySlideProps> = ({
  employees,
  quote,
  organization,
  isMultiple = false
}) => {
  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      {/* Background with warm celebratory Saffron Orange & Emerald Green radiant glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#F3EDE0]" />
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-600/15 to-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Strip with Saffron & Emerald Accent */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-orange-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              Controllerate of Quality Assurance Systems
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              EMPLOYEE RECOGNITION & CELEBRATION
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>TODAY'S BIRTHDAY CELEBRATION</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-4">
        {/* If Single Employee Birthday */}
        {!isMultiple && employees.length === 1 && (
          <div className="grid grid-cols-12 gap-10 items-center max-w-6xl mx-auto w-full">
            {/* Left: Large Photo */}
            <div className="col-span-5 flex justify-center">
              <div className="relative w-80 aspect-[4/5] rounded-2xl overflow-hidden border-3 border-orange-400 shadow-2xl p-1 bg-gradient-to-b from-orange-400 via-amber-200 to-emerald-500">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
                  <img
                    src={getEmployeeAvatarSvg(employees[0].name, employees[0].designation)}
                    alt={employees[0].name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Title, Name, Designation & Quote */}
            <div className="col-span-7 space-y-6">
              <div>
                <span className="text-orange-600 uppercase tracking-[0.3em] text-sm font-bold block mb-2">
                  WARMEST BIRTHDAY FELICITATIONS
                </span>
                <h1 className="text-5xl lg:text-6xl font-serif font-black text-stone-900 tracking-tight leading-none mb-3">
                  Happy Birthday
                </h1>
                <h2 className="text-3xl lg:text-4xl font-serif font-black text-emerald-800">
                  {employees[0].name}
                </h2>
              </div>

              <div className="space-y-1.5 border-l-4 border-orange-500 pl-5">
                <p className="text-xl font-bold text-stone-800">
                  {employees[0].designation}
                </p>
                <p className="text-base text-stone-600 font-sans font-medium">
                  {employees[0].department} • {employees[0].section}
                </p>
              </div>

              {/* Quote */}
              <div className="p-6 rounded-2xl bg-white/90 border-2 border-orange-100 shadow-md">
                <blockquote className="text-lg lg:text-xl font-serif text-stone-800 italic leading-relaxed font-medium">
                  "{quote}"
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* If Multiple Employees Birthday Grouping */}
        {(isMultiple || employees.length > 1) && (
          <div className="space-y-6 max-w-6xl mx-auto w-full">
            <div className="text-center space-y-2">
              <h1 className="text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight">
                Today's Birthday Celebrations
              </h1>
              <p className="text-base text-emerald-800 font-sans tracking-wide font-semibold">
                Extending warmest felicitations from the Controller and all officers & staff
              </p>
            </div>

            {/* Grid of Birthday Colleagues */}
            <div className={`grid grid-cols-${Math.min(employees.length, 3)} gap-8 justify-center`}>
              {employees.map((emp) => (
                <div
                  key={emp.employeeId}
                  className="bg-white border-2 border-orange-200/80 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4 relative"
                >
                  <div className="w-48 aspect-[4/5] rounded-xl overflow-hidden border-2 border-emerald-500/50 shadow-md bg-stone-50">
                    <img
                      src={getEmployeeAvatarSvg(emp.name, emp.designation)}
                      alt={emp.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-black text-stone-900">
                      {emp.name}
                    </h3>
                    <p className="text-sm font-bold text-orange-600 mt-1">
                      {emp.designation}
                    </p>
                    <p className="text-xs text-stone-600 font-sans mt-0.5 font-medium">
                      {emp.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Quote */}
            <div className="max-w-2xl mx-auto text-center pt-2">
              <blockquote className="text-base lg:text-lg font-serif text-stone-700 italic font-medium">
                "{quote}"
              </blockquote>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 flex items-center justify-between text-xs text-stone-600 font-sans border-t border-stone-200 pt-4">
        <span className="font-semibold">{organization.name} • {organization.location}</span>
        <span className="text-emerald-800 font-hindi font-bold text-sm">गुणवत्ता से विश्वास</span>
      </div>
    </div>
  );
};
