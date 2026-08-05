import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reveal "Skip Intro" button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Disable keyboard shortcuts during intro (except Esc / Enter / Space to skip/toggle)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Escape' || e.code === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Attempt video play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay with sound
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(console.error);
        }
      });
    }

    return () => {
      clearTimeout(skipTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Store in localStorage
    try {
      localStorage.setItem('THE_JANE_METHOD_INTRO_PLAYED', 'true');
    } catch (e) {
      console.error(e);
    }

    // Fade to black for 800ms before removing intro component & popping home page
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-[#090909] flex items-center justify-center overflow-hidden select-none"
      >
        {/* HTML5 Cinematic Video Element from Google Drive */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/intro-video.mp4"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleFinish}
            className="w-full h-full object-cover scale-105 opacity-95 transition-opacity duration-1000"
          />
        </div>

        {/* Dark Luxury Overlays */}
        {/* Subtle 25% black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/25 to-[#090909]/70 pointer-events-none" />
        <div className="absolute inset-0 vignette-overlay pointer-events-none opacity-80" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-30 mix-blend-overlay" />

        {/* Academy Emblem Overlay at top-left */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-[#090909]/80 backdrop-blur-md flex items-center justify-center text-[#D4AF37] shadow-xl">
            <span className="font-serif font-bold text-lg tracking-wider">J</span>
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-[0.2em] text-white uppercase block">
              THE JANE METHOD
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#D4AF37] block">
              ACADEMY DISPATCH • PROLOGUE
            </span>
          </div>
        </div>

        {/* Top-Right Controls: Sound & Skip Button */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="px-3.5 py-2 rounded-full bg-[#121218]/80 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Unmute Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            )}
          </button>

          {/* Skip Intro Button */}
          {showSkipButton && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleFinish}
              className="group px-5 py-2 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-mono uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-2xl flex items-center gap-2"
            >
              <span>Skip Intro</span>
              <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          )}
        </div>

        {/* Bottom Ambient Subtitle overlay */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center max-w-xl px-4 pointer-events-none space-y-2">
          <p className="font-serif text-lg sm:text-xl text-[#F5F5F5] font-light tracking-wide italic drop-shadow-md">
            "Every detail carries a confession."
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#D4AF37]/40" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              ENTERING DETECTIVE ACADEMY
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]/40" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
