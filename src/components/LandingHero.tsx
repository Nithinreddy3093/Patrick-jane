import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Eye, 
  Brain, 
  Search, 
  Target, 
  Crown, 
  Star,
  CheckCircle,
  Lock,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  User,
  Puzzle,
  UserCheck,
  Award,
  Trophy,
  Users
} from 'lucide-react';
import { CourseModule, NavigationTab, UserProfile } from '../types';
import { COURSE_MODULES } from '../data/modulesData';
import { BackgroundImage } from './BackgroundImage';

interface LandingHeroProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectModule: (moduleId: number) => void;
  profile: UserProfile;
}

export function LandingHero({ onSelectTab, onSelectModule, profile }: LandingHeroProps) {
  const [previewModule, setPreviewModule] = useState<CourseModule | null>(null);

  const studentAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen bg-[#090909] text-[#F5F5F5] overflow-x-hidden"
    >
      
      {/* SECTION 1: HERO CONTAINER WITH BACKGROUND IMAGE */}
      <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <BackgroundImage 
            src="/hero-bg.jpg"
            fallbackSrc="/hero-bg.png"
            alt="The Jane Method - Detective Observation Background"
            className="w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
            gradientOverlayStyle={{
              background: 'linear-gradient(to right, rgba(9,9,9,0.78) 0%, rgba(9,9,9,0.3) 50%, rgba(9,9,9,0.05) 100%)'
            }}
          >
            {/* Overlays */}
            <div className="absolute top-0 right-0 w-2/3 h-full light-rays pointer-events-none opacity-50" />
            <div className="absolute inset-0 film-grain pointer-events-none opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 vignette-overlay pointer-events-none" />
          </BackgroundImage>
        </motion.div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full flex-1 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl space-y-6"
          >
            {/* Small Gold Header */}
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              WELCOME TO
            </p>

            {/* Main Luxury Serif Title */}
            <div>
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92]">
                THE JANE <br />
                METHOD
              </h1>
              {/* Diamond Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>

            {/* Subtitle */}
            <div className="font-serif text-2xl sm:text-3xl text-[#D4AF37] leading-tight space-y-1">
              <p>Master Observation.</p>
              <p>Read People Better.</p>
              <p>Think Before Others.</p>
            </div>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed font-sans max-w-lg">
              Train your observation, memory, logical reasoning, psychology, and deduction through immersive real-world exercises inspired by the methods of great investigators.
            </p>

            {/* Action Buttons with upward motion */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => onSelectTab('course')}
                className="btn-primary-gold px-7 py-3.5 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Target className="w-4 h-4 text-[#090909]" />
                <span>Start Learning</span>
              </button>

              <button
                onClick={() => setPreviewModule(COURSE_MODULES[0])}
                className="btn-secondary-gold px-7 py-3.5 text-xs font-semibold flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>Preview Course</span>
              </button>
            </motion.div>

            {/* Social Proof & Live User Progress */}
            {profile && profile.name ? (
              <div className="pt-4 border-t border-[#262626]/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    ACTIVE DOSSIER: {profile.name} ({profile.rank})
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {profile.xp} XP
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#121216] border border-[#262636] p-3 rounded-xl text-center">
                  <div>
                    <span className="font-serif font-bold text-base text-[#F5D982] block">
                      {profile.completedLessonIds?.length || 0}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Lessons Done
                    </span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base text-[#F5D982] block">
                      {profile.solvedCaseIds?.length || 0}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Cases Solved
                    </span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base text-[#F5D982] block">
                      {profile.streakDays || 1}d
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Active Streak
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 flex items-center gap-4 border-t border-[#262626]/80">
                <div className="flex -space-x-2">
                  {studentAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Learner avatar"
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#090909]"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#B8B8B8] font-medium mt-0.5">
                    Trusted by thousands of learners.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>

      {/* SECTION 2: WHY OBSERVATION MATTERS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              WHY OBSERVATION MATTERS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Most People See. <br />
              Few People Observe.
            </h2>
            <p className="text-sm text-[#B8B8B8] leading-relaxed pt-2">
              Observation is a superpower that can be learned. It improves your decisions, relationships, career, safety, and understanding of the world.
            </p>
          </div>

          {/* Right Column Grid (8 cols, 4 cards) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-3 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Eye className="w-6 h-6" />
              </div>
              <span className="font-serif text-4xl font-bold text-[#D4AF37]">90%</span>
              <p className="text-xs text-[#B8B8B8] leading-relaxed">
                Of what happens around us goes unnoticed.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-3 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Brain className="w-6 h-6" />
              </div>
              <span className="font-serif text-4xl font-bold text-[#D4AF37]">7x</span>
              <p className="text-xs text-[#B8B8B8] leading-relaxed">
                Better decision making when you observe before reacting.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-3 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-serif text-4xl font-bold text-[#D4AF37]">85%</span>
              <p className="text-xs text-[#B8B8B8] leading-relaxed">
                More accurate people reading with behavioral awareness.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-3 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="font-serif text-4xl font-bold text-[#D4AF37]">10x</span>
              <p className="text-xs text-[#B8B8B8] leading-relaxed">
                Improvement in memory and detail retention with practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW THIS COURSE WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/60">
        <div className="text-center mb-12">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
            HOW THIS COURSE WORKS
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* 5 Connected Step Pipeline */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Background Connecting Dotted Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[1px] border-b border-dashed border-[#D4AF37]/40 z-0 pointer-events-none" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#090909] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-4">Observe</h3>
            <p className="text-xs text-[#B8B8B8] mt-1.5 max-w-[180px] leading-relaxed">
              Train your senses to notice real details.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#090909] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
              <Brain className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-4">Analyze</h3>
            <p className="text-xs text-[#B8B8B8] mt-1.5 max-w-[180px] leading-relaxed">
              Understand patterns, behavior and context.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#090909] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-4">Deduce</h3>
            <p className="text-xs text-[#B8B8B8] mt-1.5 max-w-[180px] leading-relaxed">
              Connect clues and form logical conclusions.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#090909] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-4">Verify</h3>
            <p className="text-xs text-[#B8B8B8] mt-1.5 max-w-[180px] leading-relaxed">
              Test your hypothesis with evidence, not guesses.
            </p>
          </div>

          {/* Step 5 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#090909] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-4">Master</h3>
            <p className="text-xs text-[#B8B8B8] mt-1.5 max-w-[180px] leading-relaxed">
              Apply your skills in real-world situations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COURSE MODULES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/60">
        <div className="text-center mb-12">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
            COURSE MODULES
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* 6 Module Cards Container */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            
            {/* Module 0 */}
            <div 
              onClick={() => onSelectModule(1)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/30 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37] transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">0</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Introduction
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">The Beginner's Mind</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">25 min</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Beginner</span>
                  <span className="text-[#D4AF37] font-semibold">100%</span>
                </div>
                <div className="w-full h-1 bg-[#262626] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] w-full" />
                </div>
              </div>
            </div>

            {/* Module 1 */}
            <div 
              onClick={() => onSelectModule(2)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/60 transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">1</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Observation
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">See What Others Miss</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">3 hrs</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Beginner</span>
                  <span className="text-[#B8B8B8]">0%</span>
                </div>
                <div className="flex justify-end">
                  <Lock className="w-3.5 h-3.5 text-[#B8B8B8]" />
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div 
              onClick={() => onSelectModule(3)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/60 transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">2</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Reading Human Behavior
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">Understand People</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">4 hrs</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Beginner</span>
                  <Lock className="w-3.5 h-3.5 text-[#B8B8B8]" />
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div 
              onClick={() => onSelectModule(4)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/60 transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">3</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Puzzle className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Pattern Recognition
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">Find Hidden Patterns</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">3.5 hrs</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Intermediate</span>
                  <Lock className="w-3.5 h-3.5 text-[#B8B8B8]" />
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div 
              onClick={() => onSelectModule(5)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/60 transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">4</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Brain className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Memory Techniques
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">Remember Everything</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">3 hrs</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Intermediate</span>
                  <Lock className="w-3.5 h-3.5 text-[#B8B8B8]" />
                </div>
              </div>
            </div>

            {/* Module 5 */}
            <div 
              onClick={() => onSelectModule(6)}
              className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/60 transition-all group relative min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#B8B8B8]">5</span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <div className="my-auto space-y-1 py-3 text-center">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Logical Deduction
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">Think Like a Detective</p>
              </div>
              <div className="space-y-2 border-t border-[#262626] pt-3">
                <p className="text-[10px] text-[#B8B8B8]">4 hrs</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#D4AF37]">★ Intermediate</span>
                  <Lock className="w-3.5 h-3.5 text-[#B8B8B8]" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Chevron Arrow */}
          <button 
            onClick={() => onSelectTab('course')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090909] transition-all hidden xl:flex shadow-2xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Modules Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => onSelectTab('course')}
            className="px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/15 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[#D4AF37]/20"
          >
            View All Modules
          </button>
        </div>
      </section>

      {/* SECTION 5: YOUR JOURNEY. YOUR TRANSFORMATION. */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/60">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-center text-white uppercase tracking-widest mb-10">
          YOUR JOURNEY. YOUR TRANSFORMATION.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-2.5 hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5]">120+</span>
            <p className="text-xs text-[#B8B8B8]">Lessons</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-2.5 hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Target className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5]">500+</span>
            <p className="text-xs text-[#B8B8B8]">Exercises</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-2.5 hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5]">50+</span>
            <p className="text-xs text-[#B8B8B8]">Detective Cases</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-2.5 hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5]">10,000+</span>
            <p className="text-xs text-[#B8B8B8]">Active Learners</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-2.5 hover:border-[#D4AF37]/50 transition-all col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Star className="w-6 h-6 fill-current text-[#D4AF37]" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5]">4.9/5</span>
            <p className="text-xs text-[#B8B8B8]">Learner Rating</p>
          </div>

        </div>
      </section>

      {/* Course Preview Modal */}
      {previewModule && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full bg-[#141414] border border-[#D4AF37]/40 p-6 sm:p-8 rounded-3xl text-left space-y-5 relative shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#262626] pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Course Overview
              </span>
              <button
                onClick={() => setPreviewModule(null)}
                className="text-[#B8B8B8] hover:text-white text-xs font-mono uppercase cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              {previewModule.title}
            </h3>

            <p className="text-sm text-[#B8B8B8] leading-relaxed">
              {previewModule.description}
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-mono uppercase text-[#D4AF37] font-semibold">Included Lessons:</p>
              <div className="space-y-1.5">
                {previewModule.lessons.slice(0, 4).map((lesson, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F5F5] bg-[#090909] p-2.5 rounded-xl border border-[#262626]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
              <button
                onClick={() => setPreviewModule(null)}
                className="px-5 py-2.5 text-xs text-[#B8B8B8] hover:text-white font-medium cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setPreviewModule(null);
                  onSelectModule(previewModule.id);
                }}
                className="btn-primary-gold px-6 py-2.5 text-xs uppercase font-bold cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
