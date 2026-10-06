import React, { useEffect, useState } from 'react';
import { CQAS_LOGO_SVG, CONTROLLER_PORTRAIT_SVG } from '../assets/assetLibrary';
import { ControllerConfig, OrganizationConfig } from '../types';
import { ActiveDateInfo } from '../engine/date-engine';

interface WelcomeSlideProps {
  organization: OrganizationConfig;
  controller: ControllerConfig;
  activeDate: ActiveDateInfo;
  duration: number;
}

export const WelcomeSlide: React.FC<WelcomeSlideProps> = ({
  organization,
  controller,
  activeDate,
  duration
}) => {
  // Staged subtle sequence internal to Screen 1
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage sequence triggers smoothly across the first 4-5 seconds, then holds complete composition
    const timeouts: NodeJS.Timeout[] = [
      setTimeout(() => setStage(1), 300),   // 1. Logo
      setTimeout(() => setStage(2), 1000),  // 2. Org Name
      setTimeout(() => setStage(3), 1800),  // 3. Hindi Slogan
      setTimeout(() => setStage(4), 2500),  // 4. Location & Ministry
      setTimeout(() => setStage(5), 3200),  // 5. Controller Photo
      setTimeout(() => setStage(6), 3900),  // 6. Controller Name & Designation
      setTimeout(() => setStage(7), 4600),  // 7. Welcome Message & Date
      setTimeout(() => setStage(8), 5200),  // 8. Full composition locked & held
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#FFFDF7] text-stone-900 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Ambience: Elegant Cream White with Saffron Orange and Emerald Green Soft Radiant Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#F1E8D6]" />
      
      {/* Soft Saffron Aura top-left */}
      <div className="absolute -top-40 -left-20 w-[800px] h-[600px] bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      {/* Soft Emerald Aura bottom-right */}
      <div className="absolute -bottom-40 -right-20 w-[800px] h-[600px] bg-gradient-to-tl from-emerald-600/15 to-teal-500/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Fine Geometric Textured Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#C2410C_0.8px,transparent_0.8px)] [background-size:36px_36px] opacity-10 pointer-events-none" />

      {/* Top Header Strip: Tricolor Ribbon Accent (Orange, Cream White, Green) */}
      <div className="relative z-10 w-full border-b border-stone-200/80 bg-white/70 backdrop-blur-md">
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-300 via-50% to-emerald-600" />
        <div className="flex items-center justify-between px-16 py-3.5">
          <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-bold text-stone-700 font-sans">
            <span className="text-orange-600">{organization.ministry || 'Ministry of Defence, Government of India'}</span>
            <span className="text-emerald-600 font-black">♦</span>
            <span className="text-emerald-800">{organization.subTitle || 'Department of Defence Production'}</span>
          </div>

          {/* Date Display */}
          <div className="flex items-center gap-4 text-xs tracking-wider font-sans">
            <span className="text-orange-700 font-bold">{activeDate.formattedDisplay}</span>
            <span className="text-stone-300">|</span>
            <span className="text-emerald-800 font-hindi font-bold">{activeDate.formattedHindiDate}</span>
            {activeDate.isTestDate && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-orange-700 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-300">
                TEST DATE MODE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Single Composition Canvas (16:9 Optimized) */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center px-16 py-6">
        
        {/* Left & Center Main Organization Column (Cols 1-8) */}
        <div className="col-span-8 flex flex-col justify-center space-y-6 pr-6">
          
          {/* Logo & Seal - Stage 1 */}
          <div 
            className={`transition-all duration-1000 transform ${
              stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-6 scale-95'
            } flex items-center gap-6`}
          >
            <div className="w-28 h-28 lg:w-32 lg:h-32 shrink-0 drop-shadow-[0_8px_20px_rgba(234,88,12,0.25)]">
              <img 
                src={organization.logo || CQAS_LOGO_SVG} 
                alt="CQAS Insignia" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-20 w-[2px] bg-gradient-to-b from-orange-400 via-amber-300 to-emerald-500 hidden sm:block" />
            <div className="text-left space-y-1">
              <div className="text-orange-600 text-xs tracking-[0.28em] uppercase font-bold">
                GOVERNMENT OF INDIA • QUALITY ASSURANCE ESTABLISHMENT
              </div>
              <div className="text-emerald-900 text-sm tracking-wide font-medium">
                Defence Systems Assurance • Precision Engineering • Standard Compliance
              </div>
            </div>
          </div>

          {/* Organization Name - Stage 2 */}
          <div 
            className={`transition-all duration-1000 delay-100 transform ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-black text-stone-900 tracking-tight leading-[1.12]">
              {organization.name}
            </h1>
          </div>

          {/* Hindi Slogan - Stage 3 */}
          <div 
            className={`transition-all duration-1000 delay-200 transform ${
              stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } flex items-center gap-4`}
          >
            <div className="h-[3px] w-14 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-800 font-hindi tracking-wide drop-shadow-sm">
              {organization.slogan}
            </div>
            <div className="h-[3px] w-14 bg-gradient-to-r from-amber-400 to-emerald-600 rounded-full" />
          </div>

          {/* Location - Stage 4 */}
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="inline-flex items-center gap-2.5 text-base lg:text-lg text-stone-700 font-sans tracking-[0.25em] uppercase font-bold">
              <span className="text-orange-500">★</span>
              <span>{organization.location}</span>
              <span className="text-emerald-600">★</span>
            </div>
          </div>

          {/* Welcome Greeting Banner - Stage 7 */}
          <div 
            className={`transition-all duration-1000 delay-500 transform ${
              stage >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } pt-2`}
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50/90 via-white to-emerald-50/90 border border-orange-200/80 shadow-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-orange-500 to-emerald-600" />
              <div className="pl-3">
                <span className="text-orange-600 text-xs uppercase tracking-[0.25em] font-bold block mb-1">
                  OFFICIAL WELCOME TO ALL ESTEEMED DIGNITARIES & VISITORS
                </span>
                <p className="text-xl lg:text-2xl font-serif text-stone-800 font-medium leading-relaxed">
                  Welcome to our organization. Delivering trust through uncompromising quality and technological excellence.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Controller Dignified Card (Cols 9-12) - Stage 5 & 6 */}
        <div 
          className={`col-span-4 transition-all duration-1000 transform ${
            stage >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          } flex justify-center`}
        >
          <div className="w-full max-w-[340px] bg-white border-2 border-orange-200/80 rounded-2xl p-6 shadow-xl relative group">
            {/* Elegant Corner Filigree in Orange & Emerald */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-3 border-l-3 border-orange-500 rounded-tl" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-3 border-r-3 border-orange-500 rounded-tr" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-3 border-l-3 border-emerald-600 rounded-bl" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-3 border-r-3 border-emerald-600 rounded-br" />

            {/* Controller Photo Frame */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-emerald-500/40 bg-stone-100 mb-5 shadow-inner">
              <img 
                src={controller.photo || CONTROLLER_PORTRAIT_SVG} 
                alt={controller.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = CONTROLLER_PORTRAIT_SVG;
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
            </div>

            {/* Controller Name & Designation - Stage 6 */}
            <div 
              className={`transition-all duration-700 delay-200 transform ${
                stage >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } text-center space-y-1.5`}
            >
              <h3 className="text-xl lg:text-2xl font-serif font-black text-stone-900 tracking-wide">
                {controller.name}
              </h3>
              <p className="text-sm font-bold tracking-[0.2em] text-orange-600 uppercase">
                {controller.designation}
              </p>
              <p className="text-xs text-emerald-800 font-sans font-semibold pt-1">
                Controllerate of Quality Assurance Systems
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Screen 1 Footer: Warm Cream & Emerald Continuous Loop Indicator */}
      <div className="relative z-10 px-16 py-3.5 bg-white/80 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-sans">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="tracking-wider uppercase font-bold text-stone-800">
            DIGITAL SIGNAGE • CQAS CORPORATE DISPLAY
          </span>
        </div>
        <div className="flex items-center gap-4 text-stone-600 font-medium">
          <span>Continuous Automated Presentation</span>
          <span>•</span>
          <span className="text-orange-700 font-semibold">Next: Introductory Video</span>
        </div>
      </div>
    </div>
  );
};
