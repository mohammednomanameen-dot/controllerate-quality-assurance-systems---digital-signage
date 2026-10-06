import { useEffect, useRef, useState } from 'react';
import { SlideData } from '../types';

interface UseSlideshowOptions {
  slides: SlideData[];
  loop?: boolean;
  onLoopCompleted?: () => void;
}

export function useSlideshow({ slides, loop = true, onLoopCompleted }: UseSlideshowOptions) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentIndex] || null;

  // Handle slide transitions and timer
  useEffect(() => {
    if (!currentSlide || !isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    // Reset progress
    setProgress(0);

    const durationMs = (currentSlide.duration || 10) * 1000;
    const updateFrequencyMs = 100;
    let elapsed = 0;

    // Progress bar ticker
    progressIntervalRef.current = setInterval(() => {
      elapsed += updateFrequencyMs;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);
    }, updateFrequencyMs);

    // Auto-advance timer (only if not a video slide which controls its own completion or fallback)
    if (currentSlide.type !== 'video') {
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, durationMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying, currentSlide?.id]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= slides.length - 1) {
        if (loop) {
          if (onLoopCompleted) onLoopCompleted();
          return 0;
        }
        return prev;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    currentIndex,
    currentSlide,
    isPlaying,
    progress,
    nextSlide,
    prevSlide,
    goToSlide,
    togglePlay,
    setIsPlaying
  };
}
