import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  loadAppConfig,
  loadEmployees,
  loadFestivals,
  loadQuotes,
  loadRelations
} from './engine/data-loader';
import { getActiveDate } from './engine/date-engine';
import { buildSlideshowQueue } from './engine/event-engine';
import { useSlideshow } from './engine/useSlideshow';
import { AppConfig, Employee, FamilyRelation, Festival, QuoteCollection, SlideData, SlideType } from './types';
import { WelcomeSlide } from './templates/WelcomeSlide';
import { VideoSlide } from './templates/VideoSlide';
import { BirthdaySlide } from './templates/BirthdaySlide';
import { WorkAnniversarySlide } from './templates/WorkAnniversarySlide';
import { JoiningAnniversarySlide } from './templates/JoiningAnniversarySlide';
import { PromotionSlide } from './templates/PromotionSlide';
import { RetirementSlide } from './templates/RetirementSlide';
import { WeddingAnniversarySlide } from './templates/WeddingAnniversarySlide';
import { FamilyEventSlide } from './templates/FamilyEventSlide';
import { FestivalSlide } from './templates/FestivalSlide';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // Application Data States
  const [config, setConfig] = useState<AppConfig>(loadAppConfig);
  const [employees, setEmployees] = useState<Employee[]>(loadEmployees);
  const [relations, setRelations] = useState<FamilyRelation[]>(loadRelations);
  const [festivals, setFestivals] = useState<Festival[]>(loadFestivals);
  const [quotes, setQuotes] = useState<QuoteCollection>(loadQuotes);

  // Admin Modal Visibility
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Active Date Resolution (system date or configured test date)
  const activeDate = useMemo(() => {
    return getActiveDate(config.testing?.testDate);
  }, [config.testing?.testDate, refreshTrigger]);

  // Build the presentation queue
  const slidesQueue = useMemo(() => {
    return buildSlideshowQueue(config, employees, relations, festivals, quotes, activeDate);
  }, [config, employees, relations, festivals, quotes, activeDate, refreshTrigger]);

  // Slideshow controller hook
  const {
    currentIndex,
    currentSlide,
    isPlaying,
    progress,
    nextSlide,
    prevSlide,
    goToSlide,
    togglePlay,
    setIsPlaying
  } = useSlideshow({
    slides: slidesQueue,
    loop: config.display.loop ?? true,
    onLoopCompleted: () => {
      // Periodic refresh check on loop completion
      console.log('Slideshow loop completed. Re-checking schedule.');
    }
  });

  // Previewing a specific template
  const handlePreviewTemplate = useCallback((type: SlideType) => {
    const targetIdx = slidesQueue.findIndex((s) => s.type === type);
    if (targetIdx !== -1) {
      goToSlide(targetIdx);
    } else {
      // If today has no event of this type, create a transient preview slide
      alert(`No events for "${type}" scheduled for today's active date (${activeDate.isoDateString}). You can change the test date in Admin settings or view available events.`);
    }
  }, [slidesQueue, goToSlide, activeDate.isoDateString]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A -> Open Admin
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
        return;
      }

      // If admin modal is open, let modal handle input
      if (isAdminOpen) return;

      // Spacebar: Pause / Play
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }

      // ArrowRight / PageDown: Next
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      }

      // ArrowLeft / PageUp: Previous
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }

      // 'F' key: Toggle Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, togglePlay, nextSlide, prevSlide]);

  // Render the current slide template based on its type
  const renderCurrentSlide = () => {
    if (!currentSlide) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white font-serif text-2xl">
          Loading Presentation Queue...
        </div>
      );
    }

    switch (currentSlide.type) {
      case 'welcome':
        return (
          <WelcomeSlide
            organization={currentSlide.payload.organization}
            controller={currentSlide.payload.controller}
            activeDate={currentSlide.payload.activeDate}
            duration={currentSlide.duration}
          />
        );

      case 'video':
        return (
          <VideoSlide
            videoSrc={currentSlide.payload.videoSrc}
            organization={currentSlide.payload.organization}
            fallbackDuration={currentSlide.payload.fallbackDuration}
            onFinished={() => nextSlide()}
          />
        );

      case 'birthday':
        return (
          <BirthdaySlide
            employees={currentSlide.payload.employees}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
            isMultiple={currentSlide.payload.isMultiple}
          />
        );

      case 'work-anniversary':
        return (
          <WorkAnniversarySlide
            employee={currentSlide.payload.employee}
            years={currentSlide.payload.years}
            ordinalYears={currentSlide.payload.ordinalYears}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
          />
        );

      case 'joining-anniversary':
        return (
          <JoiningAnniversarySlide
            employee={currentSlide.payload.employee}
            years={currentSlide.payload.years}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
          />
        );

      case 'promotion':
        return (
          <PromotionSlide
            employee={currentSlide.payload.employee}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
          />
        );

      case 'retirement':
        return (
          <RetirementSlide
            employee={currentSlide.payload.employee}
            years={currentSlide.payload.years}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
          />
        );

      case 'wedding-anniversary':
        return (
          <WeddingAnniversarySlide
            employee={currentSlide.payload.employee}
            years={currentSlide.payload.years}
            quote={currentSlide.payload.quote}
            organization={currentSlide.payload.organization}
          />
        );

      case 'family-event':
        return (
          <FamilyEventSlide
            relation={currentSlide.payload.relation}
            quote={currentSlide.payload.quote}
            showPhoto={currentSlide.payload.showPhoto}
            organization={currentSlide.payload.organization}
          />
        );

      case 'festival':
        return (
          <FestivalSlide
            festival={currentSlide.payload.festival}
            organization={currentSlide.payload.organization}
          />
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#FFFDF7] text-stone-800 font-serif text-2xl">
            Slide Type Not Found
          </div>
        );
    }
  };

  return (
    <div className="w-screen h-screen bg-[#FAF7F0] overflow-hidden relative font-sans select-none">
      {/* 16:9 Presentation Frame Container */}
      <main className="w-full h-full relative overflow-hidden">
        {renderCurrentSlide()}
      </main>

      {/* Top Hairline Progress Bar: Orange to Green */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-stone-200/80 z-30 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600 transition-all duration-100 ease-linear shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Discreet Pause Indicator if user paused presentation */}
      {!isPlaying && (
        <div className="absolute top-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-emerald-700 text-white px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 border border-white">
          <span>⏸</span>
          <span>PRESENTATION PAUSED</span>
        </div>
      )}

      {/* Discreet Touch / Mouse Corner Hotspot for Admin & Quick Control */}
      <div className="absolute bottom-2 right-2 z-40 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          title="Previous Slide (Left Arrow)"
          className="w-8 h-8 rounded-full bg-white/90 border border-stone-300 text-stone-700 hover:text-orange-600 hover:border-orange-400 flex items-center justify-center text-xs shadow-md"
        >
          ◀
        </button>
        <button
          onClick={togglePlay}
          title="Play / Pause (Space)"
          className="w-8 h-8 rounded-full bg-white/90 border border-stone-300 text-stone-700 hover:text-emerald-700 hover:border-emerald-500 flex items-center justify-center text-xs shadow-md"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          onClick={nextSlide}
          title="Next Slide (Right Arrow)"
          className="w-8 h-8 rounded-full bg-white/90 border border-stone-300 text-stone-700 hover:text-orange-600 hover:border-orange-400 flex items-center justify-center text-xs shadow-md"
        >
          ▶
        </button>
        <button
          onClick={() => setIsAdminOpen(true)}
          title="Admin Console (Ctrl+Shift+A)"
          className="px-3 h-8 rounded-full bg-white/95 border-2 border-orange-400 text-orange-600 hover:bg-orange-50 flex items-center gap-1.5 text-xs font-mono font-bold shadow-md"
        >
          <span>⚙</span>
          <span>ADMIN</span>
        </button>
      </div>

      {/* Slide Navigation Dots / Quick Jump (Appears on hover at bottom) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200 shadow-lg backdrop-blur-sm">
        {slidesQueue.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => goToSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex
                ? 'w-7 bg-gradient-to-r from-orange-500 to-emerald-600'
                : 'bg-stone-300 hover:bg-stone-500'
            }`}
            title={`${idx + 1}. ${s.title}`}
          />
        ))}
      </div>

      {/* Admin Console Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        employees={employees}
        onUpdateEmployees={setEmployees}
        relations={relations}
        onUpdateRelations={setRelations}
        festivals={festivals}
        quotes={quotes}
        onPreviewTemplate={handlePreviewTemplate}
        onRefreshData={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
}
