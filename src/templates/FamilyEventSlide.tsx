import React from 'react';
import { CQAS_LOGO_SVG, PLACEHOLDER_AVATAR_SVG, getEmployeeAvatarSvg } from '../assets/assetLibrary';
import { FamilyRelation, OrganizationConfig } from '../types';

interface FamilyEventSlideProps {
  relation: FamilyRelation;
  quote: string;
  showPhoto?: boolean;
  organization: OrganizationConfig;
}

export const FamilyEventSlide: React.FC<FamilyEventSlideProps> = ({
  relation,
  quote,
  showPhoto = true,
  organization
}) => {
  const isBirthday = relation.eventType === 'birthday';
  const isFemale = relation.relation === 'Mother' || relation.relation === 'Daughter';

  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between p-14 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#E8F5EE]" />
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-emerald-600/10 to-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-orange-500/10 to-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-emerald-200 pb-5">
        <div className="flex items-center gap-4">
          <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-14 h-14 object-contain drop-shadow" />
          <div>
            <div className="text-orange-600 text-xs uppercase tracking-[0.28em] font-bold">
              Controllerate of Quality Assurance Systems
            </div>
            <div className="text-emerald-800 text-sm font-sans tracking-wide font-semibold">
              EXTENDED CQAS FAMILY CELEBRATION
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-sans text-xs tracking-widest uppercase font-bold shadow-md">
          <span>★</span>
          <span>FAMILY FELICITATIONS</span>
          <span>★</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full my-4">
        {/* Left: Photo Frame or Dignified Family Emblem */}
        <div className="col-span-5 flex justify-center">
          <div className="relative w-80 aspect-[4/5] rounded-2xl overflow-hidden border-3 border-emerald-500 shadow-2xl p-1 bg-gradient-to-b from-emerald-400 via-amber-200 to-orange-400">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-inner">
              {showPhoto ? (
                <img
                  src={getEmployeeAvatarSvg(relation.personName, relation.relation, isFemale ? 'F' : 'M')}
                  alt={relation.personName}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img
                  src={PLACEHOLDER_AVATAR_SVG}
                  alt={relation.personName}
                  className="w-full h-full object-contain p-4 opacity-80"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            {/* Extended Family Badge */}
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg border-2 border-white shadow-md">
              CQAS Family
            </div>
          </div>
        </div>

        {/* Right: Unambiguous Family Relationship Identification */}
        <div className="col-span-7 space-y-6">
          <div>
            <span className="text-emerald-700 uppercase tracking-[0.3em] text-xs font-bold block mb-2">
              WARM FAMILY WISHES
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-none mb-2">
              {isBirthday ? 'Happy Birthday' : 'Happy Anniversary'}
            </h1>
            <h2 className="text-3xl lg:text-4xl font-serif font-black text-orange-600">
              {relation.personName}
            </h2>
          </div>

          {/* Explicit Relationship Callout */}
          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-md">
            <div className="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-1">
              RELATIONSHIP IDENTIFICATION
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {relation.relation} of <span className="text-orange-600 font-black">{relation.employeeName}</span>
            </div>
            <div className="text-xs text-stone-500 font-sans mt-1 font-medium">
              (Quality Assurance Department Staff Family Member)
            </div>
          </div>

          {/* Quote */}
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
