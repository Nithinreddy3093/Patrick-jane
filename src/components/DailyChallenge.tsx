import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Clock, 
  Award, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  Eye, 
  Brain, 
  Sparkles, 
  FileText, 
  Compass, 
  Check, 
  FolderArchive,
  Layers,
  Search,
  Target,
  BarChart2,
  X,
  MapPin,
  Move
} from 'lucide-react';
import { UserProfile } from '../types';
import { getTodayChallenge, DAILY_CHALLENGES } from '../data/dailyChallengesData';
import { DraggableFolder } from './DraggableFolder';

interface DailyChallengeProps {
  onSubmitChallenge: (title: string, userNotes: string, xpEarned: number) => void;
  profile: UserProfile;
}

export function DailyChallenge({ onSubmitChallenge, profile }: DailyChallengeProps) {
  const todayChallenge = getTodayChallenge();
  const todayStr = new Date().toISOString().split('T')[0];
  const isAlreadyDoneToday = profile.dailyChallengeHistory.some(h => h.date === todayStr);

  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(isAlreadyDoneToday);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArchiveFolder, setSelectedArchiveFolder] = useState<string | null>(null);

  const missionSectionRef = useRef<HTMLDivElement>(null);
  const historySectionRef = useRef<HTMLDivElement>(null);

  const handleOpenMission = () => {
    setIsModalOpen(true);
  };

  const scrollToHistory = () => {
    if (historySectionRef.current) {
      historySectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = () => {
    if (!notes.trim() || submitted) return;
    onSubmitChallenge(todayChallenge.title, notes, todayChallenge.xpReward);
    setSubmitted(true);
  };

  const timelineSteps = [
    {
      num: '01',
      title: 'Observe',
      icon: Eye,
      description: 'Infiltrate your target environment and scan for non-verbal cues, micro-gestures, and spatial anomalies without drawing attention.',
      detail: 'Focus on posture, eye contact duration, baseline shifts, and physical tension.'
    },
    {
      num: '02',
      title: 'Analyze',
      icon: Brain,
      description: 'Filter observed behaviors against baseline environmental norms to separate natural variance from genuine psychological signals.',
      detail: 'Isolate anomalies from context—look for cluster behaviors (3+ signals).'
    },
    {
      num: '03',
      title: 'Deduce',
      icon: Compass,
      description: 'Synthesize your anomalies into testable hypotheses regarding hidden motives, emotional states, or environmental history.',
      detail: 'Cross-reference physical evidence with Patrick Jane’s observation principles.'
    },
    {
      num: '04',
      title: 'Submit',
      icon: FileText,
      description: 'Draft your field report in the official observer log below, detailing exact timestamps, physical cues, and your final deduction.',
      detail: 'Clear, objective notes earn higher observer prestige and daily streak XP.'
    },
    {
      num: '05',
      title: 'Review',
      icon: Award,
      description: 'Archive your findings in your personal detective ledger to lock in your streak bonus and unlock higher observer ranks.',
      detail: 'Your active streak fuels your Master Observer certification progress.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#090909] text-[#F5F5F5] overflow-x-hidden pt-20">
      
      {/* HERO SECTION WITH EXACT DETECTIVE DESK BACKGROUND */}
      <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pb-12 pt-8">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <img 
            src="/daily-challenge-bg.jpg" 
            alt="The Jane Method Daily Challenge Detective Desk"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.failed) {
                img.dataset.failed = 'true';
                img.src = '/daily-challenge-bg.png';
              } else {
                img.style.display = 'none';
              }
            }}
            className="w-full h-full object-cover object-center pointer-events-none scale-105"
          />
          {/* Subtle Dark Lighting Overlays for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-transparent to-[#090909] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/85 via-black/30 to-[#090909]/75 pointer-events-none" />
          <div className="absolute inset-0 film-grain opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 vignette-overlay opacity-80 pointer-events-none" />
        </div>

        {/* HERO TOP BAR CONTENT */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6">
          
          {/* Top Left Headline */}
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
                DAILY CHALLENGE
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Your Daily <span className="gold-gradient-text">Mission Awaits.</span>
            </h1>

            <div className="flex items-center gap-2 my-2">
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            </div>

            <p className="text-zinc-300 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
              Every day brings a new case. Sharpen your mind. Stay consistent.
            </p>
          </div>

          {/* Top Right Stats Box ("TODAY'S STATS") */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-[290px] bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#262626] pb-2.5">
                <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
                  TODAY'S STATS
                </span>
                <div className="w-8 h-0.5 bg-[#D4AF37]" />
              </div>

              <div className="space-y-3 text-xs font-sans">
                {/* Completed */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-zinc-400">Completed</span>
                  </div>
                  <span className="font-serif font-bold text-white text-sm">
                    {profile.dailyChallengeHistory.length + 12}
                  </span>
                </div>

                {/* Current Streak */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="text-zinc-400">Current Streak</span>
                  </div>
                  <span className="font-serif font-bold text-white text-sm">
                    {profile.streakDays} Days
                  </span>
                </div>

                {/* Accuracy */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-zinc-400">Accuracy</span>
                  </div>
                  <span className="font-serif font-bold text-white text-sm">
                    86%
                  </span>
                </div>
              </div>

              <button 
                onClick={scrollToHistory}
                className="w-full pt-2 flex items-center justify-between text-xs font-mono text-[#D4AF37] hover:text-white transition-colors border-t border-[#1f1f1f] cursor-pointer"
              >
                <span>View Progress</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* CENTER ACTION BUTTON ("Open Today's Mission") OVER ENVELOPE */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenMission}
            className="px-8 py-4 rounded-2xl bg-[#0f0e0c]/85 border-2 border-[#D4AF37] text-white font-serif font-bold text-base tracking-wider shadow-2xl shadow-black hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-3.5 group cursor-pointer backdrop-blur-md"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.25)'
            }}
          >
            <FolderArchive className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors" />
            <span>{submitted ? "Inspect Today's Mission Log" : "Open Today's Mission"}</span>
          </motion.button>
        </div>

        {/* HERO BOTTOM OVERLAY CARDS: CASE BRIEF & SKILLS IN FOCUS */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Left Card: TODAY'S CASE BRIEF */}
          <div 
            onClick={handleOpenMission}
            className="lg:col-span-7 bg-[#0c0c0e]/90 border border-[#D4AF37]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md hover:border-[#D4AF37] transition-all cursor-pointer group"
          >
            <div className="inline-block px-2.5 py-0.5 rounded bg-[#171512] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono tracking-widest font-bold uppercase mb-4">
              TODAY'S CASE BRIEF
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Photo Thumbnail with Red Pushpin */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-zinc-700 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
                    alt="Silent Witness Alley" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Red Pushpin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center">
                  <MapPin className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {todayChallenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 font-sans leading-relaxed">
                  {todayChallenge.objective}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Difficulty: <strong className="text-white">Medium</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Estimated Time: <strong className="text-white">10 - 15 min</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: SKILLS IN FOCUS */}
          <div className="lg:col-span-5 bg-[#0c0c0e]/90 border border-[#262626] rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
            <div className="text-center">
              <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
                SKILLS IN FOCUS
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Observation */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#171512] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all shadow-md">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans text-zinc-300 font-medium">Observation</span>
              </div>

              {/* Memory */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#171512] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all shadow-md">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans text-zinc-300 font-medium">Memory</span>
              </div>

              {/* Deduction */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#171512] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all shadow-md">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans text-zinc-300 font-medium">Deduction</span>
              </div>

              {/* Pattern */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#171512] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans text-zinc-300 font-medium">Pattern</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* DETECTIVE CASE FILE INVESTIGATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#121212] border-2 border-[#D4AF37] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#262626] text-zinc-400 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-[#262626] pb-4 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171512] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase">
                  CLASSIFIED DISPATCH #{todayChallenge.dayIndex}
                </div>
                <h2 className="font-serif text-3xl font-bold text-white">
                  {todayChallenge.title}
                </h2>
                <p className="text-xs font-mono text-zinc-400">
                  CATEGORY: {todayChallenge.category.toUpperCase()} • REWARD: +{todayChallenge.xpReward} XP
                </p>
              </div>

              {/* Case Objective */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase text-[#D4AF37] font-bold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                  <span>Primary Case Objective</span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans p-4 rounded-xl bg-[#090909] border border-[#262626]">
                  {todayChallenge.objective}
                </p>
              </div>

              {/* Tactics */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase text-[#D4AF37] font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Field Observation Tactics</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {todayChallenge.examples.map((ex, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#171717] border border-[#262626] space-y-1">
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold">TACTIC 0{idx + 1}</span>
                      <p className="text-xs text-zinc-300">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observation Field Notes Form */}
              {!submitted ? (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center justify-between">
                    <span>Observer Field Report Log:</span>
                    <span className="text-zinc-500 font-normal">{todayChallenge.reflectionPrompt}</span>
                  </label>

                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Record specific physical cues, micro-expressions, spatial anomalies, or behavioral timing observed today..."
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#D4AF37] rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  />

                  <button
                    disabled={!notes.trim()}
                    onClick={handleSubmit}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl ${
                      notes.trim()
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-black shadow-[#D4AF37]/20 hover:scale-[1.005]'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Today's Field Report (+{todayChallenge.xpReward} XP)</span>
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-emerald-300">
                    Case File Successfully Solved & Logged!
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto">
                    Your observations have been stored in your confidential ledger. Daily streak updated to <strong className="text-white font-serif">{profile.streakDays} Days</strong>.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOWER CONTENT SECTIONS: METHODOLOGY TIMELINE & PAST CHALLENGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24 border-t border-[#1a1a1a]">
        
        {/* SECTION 2: FIVE-STAGE METHODOLOGY TIMELINE */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>THE FIVE-STAGE METHODOLOGY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Mission <span className="gold-gradient-text">Timeline</span>
            </h2>
            <p className="text-zinc-400 text-sm font-sans">
              Follow the exact operational sequence developed by Patrick Jane to execute flawless observations.
            </p>
          </div>

          {/* Vertical Timeline Design */}
          <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#D4AF37]/40 before:to-transparent">
            {timelineSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Node Circle */}
                  <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#090909] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    <span className="text-[10px] font-mono font-bold">{step.num}</span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] group-hover:border-[#D4AF37]/50 transition-colors shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComp className="w-5 h-5 text-[#D4AF37]" />
                        <h3 className="font-serif text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">STAGE {step.num}</span>
                    </div>

                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-2 text-xs font-mono text-[#D4AF37] flex items-center gap-2">
                      <span>KEY PROTOCOL:</span>
                      <span className="text-zinc-400">{step.detail}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: PAST CHALLENGES (VINTAGE DETECTIVE FOLDERS) */}
        <div ref={historySectionRef} className="space-y-8 pt-8 border-t border-[#262626] scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] mb-2">
                <FolderArchive className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ARCHIVED CASE FILES</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">
                Past <span className="gold-gradient-text">Challenges</span>
              </h2>
              <p className="text-zinc-400 text-sm">
                Review your previous field logs and completed observational missions.
              </p>
            </div>

            <span className="text-xs font-mono text-zinc-500">
              Total Logged: {profile.dailyChallengeHistory.length} Cases
            </span>
          </div>

          {/* Grid of Vintage Detective Folder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAILY_CHALLENGES.map((challenge) => {
              const userHistoryMatch = profile.dailyChallengeHistory.find(h => h.title === challenge.title);
              const isDone = Boolean(userHistoryMatch);

              return (
                <DraggableFolder
                  key={challenge.id}
                  onClick={() => setSelectedArchiveFolder(selectedArchiveFolder === challenge.id ? null : challenge.id)}
                >
                  <div
                    className={`p-6 rounded-2xl bg-[#141210] border-2 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden group ${
                      isDone 
                        ? 'border-emerald-600/40 hover:border-emerald-500' 
                        : 'border-[#382f25] hover:border-[#D4AF37]/60'
                    }`}
                    style={{
                      backgroundImage: 'radial-gradient(circle at 100% 0%, #211c16 0%, #12100e 100%)'
                    }}
                  >
                    {/* Folder Drag Handle Badge */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                      <Move className="w-2.5 h-2.5" />
                      <span>DRAG FOLDER</span>
                    </div>

                    {/* Vintage Folder Stamped Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#090909] text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                        FOLDER #{challenge.dayIndex} • {challenge.category}
                      </span>

                      {isDone ? (
                        <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          COMPLETED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                          CLASSIFIED
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                      {challenge.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-sans leading-relaxed">
                      {challenge.objective}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#29221b] text-xs font-mono text-zinc-500">
                      <span>+{challenge.xpReward} XP REWARD</span>
                      <span className="text-[#D4AF37] flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                        <span>{selectedArchiveFolder === challenge.id ? 'Hide Details' : 'Inspect Folder'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Expandable Folder Notes Detail */}
                    <AnimatePresence>
                      {selectedArchiveFolder === challenge.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-[#382f25] space-y-3 text-xs text-zinc-300"
                        >
                          <div>
                            <span className="font-mono text-[#D4AF37] font-bold block mb-1">FIELD EXAMPLES:</span>
                            <ul className="list-disc list-inside space-y-1 text-zinc-400">
                              {challenge.examples.map((ex, i) => (
                                <li key={i}>{ex}</li>
                              ))}
                            </ul>
                          </div>

                          {userHistoryMatch && (
                            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                              <span className="font-mono text-emerald-400 font-bold block mb-1">YOUR ARCHIVED LOG ({userHistoryMatch.date}):</span>
                              <p className="text-zinc-200 italic font-sans">"{userHistoryMatch.userNotes}"</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </DraggableFolder>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
