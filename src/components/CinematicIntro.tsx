import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FastForward, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Reveal "Skip Intro" button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Safety fallback timer if YT API event is missed (e.g. ~45s)
    const endFallbackTimer = setTimeout(() => {
      handleFinish();
    }, 45000);

    // Disable keyboard shortcuts during intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Escape' || e.code === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Listen to messages from YouTube iframe API
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange' && data.info === 0) {
            // State 0 = ENDED
            handleFinish();
          }
        }
      } catch (err) {
        // Ignore non-JSON messages
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(endFallbackTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
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

    // Fade to black for 800ms before removing intro
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func }),
        '*'
      );
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
        {/* YouTube Background Video Container */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
          <div className="relative w-[180vw] h-[180vh] min-w-[100vw] min-h-[100vh] flex items-center justify-center">
            <iframe
              ref={iframeRef}
              src="https://www.youtube-nocookie.com/embed/9AHBarwEIwk?autoplay=1&mute=1&controls=0&loop=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
              title="The Jane Method Academy Cinematic Intro"
              className="w-full h-full object-cover scale-125 opacity-90 transition-opacity duration-1000"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Dark Luxury Overlays */}
        {/* Subtle 25% black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/30 to-[#090909]/80 pointer-events-none" />
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
                <span className="hidden sm:inline">Unmute Audio</span>
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
