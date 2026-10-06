import React, { useEffect, useRef, useState } from 'react';
import { OrganizationConfig } from '../types';
import { CQAS_LOGO_SVG } from '../assets/assetLibrary';

interface VideoSlideProps {
  videoSrc: string;
  organization: OrganizationConfig;
  fallbackDuration: number;
  onFinished: () => void;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({
  videoSrc,
  organization,
  fallbackDuration,
  onFinished
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(fallbackDuration || 12);

  // Fallback timer countdown if video file is missing or in simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinished();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinished]);

  // Video autoplay attempt with graceful error handling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Local video autoplay was prevented or video not yet placed:', err);
        setVideoError(true);
      });
    }
  }, []);

  // Generative Canvas Animation for Corporate Presentation Fallback (Saffron & Emerald)
  useEffect(() => {
    if (!videoError && videoRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Warm Cream to Deep Slate-Green Field
      ctx.fillStyle = '#1C1917';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines in subtle emerald
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated Radar / Quality Sweep
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 230;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Concentric circles in Saffron & Emerald
      [80, 150, 230].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(234, 88, 12, 0.45)' : 'rgba(5, 150, 105, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Rotating Radar Beam in Radiant Saffron Orange
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + 0.35);
      ctx.lineTo(0, 0);
      const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, radius);
      gradient.addColorStop(0, 'rgba(234, 88, 12, 0.65)');
      gradient.addColorStop(0.7, 'rgba(249, 115, 22, 0.3)');
      gradient.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();

      angle += 0.025;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoError]);

  return (
    <div className="relative w-full h-full bg-[#1C1917] text-white flex items-center justify-center overflow-hidden select-none">
      {/* If physical video file exists and plays */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          autoPlay
        
          playsInline
          onEnded={onFinished}
          onError={() => {
            console.info(`Local video file at ${videoSrc} not found. Seamlessly switching to generative digital signage overview.`);
            setVideoError(true);
          }}
        />
      ) : null}

      {/* Fallback Animated Signage Simulation with Orange, Green, and Cream White styling */}
      {videoError && (
        <div className="relative w-full h-full flex flex-col justify-between p-16 bg-gradient-to-br from-[#1C1917] via-[#064E3B] to-[#1C1917]">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
          />

          {/* Top Bar Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-orange-500/30 pb-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
            <div className="flex items-center gap-5">
              <img src={CQAS_LOGO_SVG} alt="CQAS" className="w-16 h-16 drop-shadow-md" />
              <div>
                <h2 className="text-2xl font-serif font-black text-amber-300">
                  {organization.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300 font-bold">
                  DEFENCE QUALITY ASSURANCE • CINEMATIC PRESENTATION
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FFFDF7] border-2 border-orange-400 px-4 py-2 rounded-xl text-xs font-mono text-stone-900 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
              <span className="font-bold text-orange-600">TRANSITIONING IN: {timeRemaining}s</span>
            </div>
          </div>

          {/* Center Showcase Statement */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-emerald-600 text-white text-xs font-bold tracking-widest uppercase shadow-md">
              ORGANIZATIONAL INTRODUCTORY OVERVIEW
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-black tracking-tight text-[#FFFDF7] leading-tight drop-shadow-md">
              Pioneering Rigorous Quality Standards in Defence Systems
            </h1>
            <p className="text-xl text-stone-200 font-sans leading-relaxed max-w-2xl mx-auto font-medium">
              Safeguarding the nation through uncompromising standard inspections, state-of-the-art metrology, and dedicated precision engineering.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-[#FFFDF7]/95 border-2 border-orange-300 text-center shadow-lg">
                <div className="text-3xl font-black font-serif text-orange-600">100%</div>
                <div className="text-xs uppercase tracking-wider text-stone-700 font-bold mt-1">Inspection Integrity</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFFDF7]/95 border-2 border-emerald-400 text-center shadow-lg">
                <div className="text-3xl font-black font-serif text-emerald-700">NABL</div>
                <div className="text-xs uppercase tracking-wider text-stone-700 font-bold mt-1">Accredited Testing</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFFDF7]/95 border-2 border-amber-400 text-center shadow-lg">
                <div className="text-3xl font-black font-serif text-amber-600">ISO 9001</div>
                <div className="text-xs uppercase tracking-wider text-stone-700 font-bold mt-1">System Certified</div>
              </div>
            </div>
          </div>

          {/* Bottom Video Note */}
          <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 border-t border-orange-500/20 pt-4 font-sans">
            <div>
              <span>Video Source: </span>
              <code className="text-amber-300 font-bold">src/assets/video/organization-intro.mp4</code>
              <span className="ml-2 text-stone-400">(Place custom MP4 to override anytime)</span>
            </div>
            <div>
              
              <span className="text-emerald-300 font-semibold">Advancing to today's events...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
