import { useState, useMemo } from 'react';
import { 
  Flame, 
  Star, 
  CheckCircle2, 
  Lock, 
  Compass,
  ChevronRight,
  Eye, 
  Brain, 
  Search, 
  Crown,
  Pin,
  BookOpen,
  Filter,
  UserCheck,
  Zap,
  Globe,
  FileText,
  ShieldCheck,
  Sparkles,
  Clock,
  Award
} from 'lucide-react';
import { UserProfile } from '../types';
import { DraggableFolder } from './DraggableFolder';
import { BackgroundImage } from './BackgroundImage';
import { COURSE_MODULES } from '../data/modulesData';

interface CourseListProps {
  onSelectModule: (moduleId: number) => void;
  onSelectLesson: (moduleId: number, lessonId: string) => void;
  profile: UserProfile;
}

export function CourseList({ onSelectModule, profile }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Master'>('All');

  const filteredModules = useMemo(() => {
    return COURSE_MODULES.filter((module) => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = 
        difficultyFilter === 'All' || module.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  const learningPathModules = [
    {
      id: 0,
      num: "00",
      title: "INTRODUCTION",
      icon: Eye,
      status: profile.completedModuleIds?.includes(0) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 1,
      num: "01",
      title: "OBSERVATION",
      icon: Eye,
      status: profile.completedModuleIds?.includes(1) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      num: "02",
      title: "READING PEOPLE",
      icon: Brain,
      status: profile.completedModuleIds?.includes(2) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      num: "03",
      title: "PATTERNS",
      icon: Search,
      status: profile.completedModuleIds?.includes(3) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      num: "04",
      title: "MEMORY LOCI",
      icon: Brain,
      status: profile.completedModuleIds?.includes(4) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      num: "05",
      title: "LOGICAL DEDUCTION",
      icon: Search,
      status: profile.completedModuleIds?.includes(5) ? "completed" : "unlocked",
      bgImage: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return Eye;
      case 'Brain': return Brain;
      case 'Search': return Search;
      case 'Crown': return Crown;
      case 'UserCheck': return UserCheck;
      case 'Zap': return Zap;
      case 'Globe': return Globe;
      case 'FileText': return FileText;
      case 'ShieldCheck': return ShieldCheck;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#09090b] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* SECTION 1: TOP MAIN GRID (HERO BANNER + RIGHT SIDEBAR STACK) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* HERO BANNER USING THE DOWNLOADED /course-bg.jpg IMAGE */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#2a2a34] bg-[#0c0c0e] min-h-[420px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl group">
          
          {/* Main Background Image */}
          <BackgroundImage 
            src="/course-bg.jpg"
            fallbackSrc="/course-bg.png"
            alt="The Academy Study Desk"
            className="w-full h-full object-cover object-center pointer-events-none opacity-95 transition-transform duration-700 group-hover:scale-105"
            gradientOverlayStyle={{
              background: 'linear-gradient(to right, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.35) 50%, rgba(9,9,11,0.05) 100%)'
            }}
          />

          {/* Top Header Badge */}
          <div className="relative z-10">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#D4AF37] font-bold uppercase block">
              WELCOME TO THE ACADEMY
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08] max-w-md my-3.5">
              YOUR TRAINING BEGINS NOW.
            </h1>

            {/* Gold Diamond Line Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed font-sans font-normal mb-8">
              This is not just a course. It's a transformation. Every lesson, every mission, every observation brings you one step closer to mastery.
            </p>
          </div>

          {/* Bottom CTA Button */}
          <div className="relative z-10 pt-4">
            <button 
              onClick={() => onSelectModule(1)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5D982] hover:bg-[#D4AF37]/30 font-serif font-semibold text-xs tracking-wider transition-all flex items-center gap-2.5 shadow-lg shadow-[#D4AF37]/10 cursor-pointer group-hover:border-[#F5D982]"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Enter The Academy</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 STACKED WIDGET CARDS */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          
          {/* CARD 1: TODAY'S MISSION */}
          <div className="relative rounded-2xl bg-[#0f0f14] border border-[#22222e] p-5 overflow-hidden shadow-lg group">
            {/* Background detective silhouette overlay on right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-[#0f0f14] pointer-events-none" />

            <div className="relative z-10 space-y-2 max-w-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
                  TODAY'S MISSION
                </span>
                <Pin className="w-3.5 h-3.5 text-[#D4AF37] rotate-45" />
              </div>

              <p className="text-xs text-zinc-200 leading-snug font-sans">
                Go outside. Observe one person. Write down everything you notice.
              </p>

              <button className="text-[11px] font-mono font-semibold text-white hover:text-[#D4AF37] inline-flex items-center gap-1 transition-colors pt-1 cursor-pointer">
                <span>View Mission</span>
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {/* CARD 2: YOUR PROGRESS */}
          <div className="rounded-2xl bg-[#0f0f14] border border-[#22222e] p-5 shadow-lg space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase block">
              YOUR PROGRESS
            </span>

            <div className="flex items-center justify-between">
              {/* Donut Chart Gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-800"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#D4AF37]"
                    strokeDasharray="52, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-serif text-lg font-bold text-white">52%</span>
              </div>

              <div className="text-right space-y-2">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400">Lessons Completed</div>
                  <div className="font-serif text-base font-bold text-white">26 / 50</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-400">Time Spent</div>
                  <div className="font-serif text-base font-bold text-white">18h 45m</div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: CURRENT STREAK */}
          <div className="rounded-2xl bg-[#0f0f14] border border-[#22222e] p-4 shadow-lg space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase block">
              CURRENT STREAK
            </span>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-mono font-bold text-white">18 Days</span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-xs font-mono font-bold text-[#F5D982]">{(profile.xp || 2450).toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* CARD 4: YOUR NOTEBOOK */}
          <div className="relative rounded-2xl bg-[#0f0f14] border border-[#22222e] p-5 overflow-hidden shadow-lg">
            {/* Background leather notebook graphic */}
            <div className="absolute right-2 top-2 bottom-2 w-24 rounded-lg bg-[url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity border border-[#333342] pointer-events-none" />

            <div className="relative z-10 space-y-2 max-w-[200px]">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase block">
                YOUR NOTEBOOK
              </span>

              <p className="text-xs text-zinc-300 font-sans leading-snug">
                Your observations, notes, and insights all in one place.
              </p>

              <button className="text-[11px] font-mono font-semibold text-white hover:text-[#D4AF37] inline-flex items-center gap-1 transition-colors pt-1 cursor-pointer">
                <span>Open Notebook</span>
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: THE LEARNING PATH BOARD */}
      <div className="rounded-2xl border border-[#262633] bg-[#0c0c0e] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#1f1f2a] pb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg font-bold text-[#F5D982] tracking-wider uppercase">
              THE LEARNING PATH
            </h2>
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
          </div>

          <button className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
            <span>View Full Path</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>

        {/* Board Container with Red Connecting Thread */}
        <div className="relative py-6 overflow-x-auto no-scrollbar">
          
          {/* Red string line spanning across cards */}
          <div className="absolute top-[45%] left-8 right-8 h-[2px] bg-red-700/60 z-0" />

          {/* Horizontal Flex Cards Row */}
          <div className="flex items-center justify-between gap-4 min-w-[900px] relative z-10 px-2">
            {learningPathModules.map((m) => {
              const Icon = m.icon;
              const isDone = m.status === 'completed';

              return (
                <DraggableFolder key={m.id} onClick={() => onSelectModule(m.id)}>
                  <div className="relative group">
                    {/* Push Pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />

                    {/* Card Container */}
                    <div 
                      className={`w-32 h-44 rounded-xl border p-2.5 flex flex-col justify-between transition-all duration-300 cursor-grab active:cursor-grabbing hover:-translate-y-1.5 shadow-xl relative overflow-hidden ${
                        isDone 
                          ? 'bg-[#12141a] border-emerald-500/50 hover:border-emerald-400' 
                          : 'bg-[#101014] border-[#2a2a38] hover:border-[#D4AF37]'
                      }`}
                    >
                      {/* Thumbnail Image inside card */}
                      <div className="h-20 w-full rounded-lg overflow-hidden relative bg-zinc-900 border border-black/50">
                        <img 
                          src={m.bgImage} 
                          alt={m.title} 
                          className={`w-full h-full object-cover ${!isDone ? 'filter grayscale brightness-75' : ''}`}
                        />
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Icon Badge Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Card Label */}
                      <div className="text-center space-y-0.5">
                        <div className="text-[10px] font-mono text-zinc-400 font-bold">{m.num}</div>
                        <div className="text-[10px] font-serif font-bold text-white leading-tight line-clamp-2">
                          {m.title}
                        </div>
                      </div>

                      {/* Bottom Status Tag */}
                      <div className="flex justify-center pt-1 border-t border-white/5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </DraggableFolder>
              );
            })}

            {/* Vintage Detective Photo Card */}
            <DraggableFolder>
              <div className="relative group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />
                <div className="w-32 h-44 rounded-xl border border-[#38384a] bg-[#121218] p-2 flex flex-col justify-between shadow-xl rotate-[2deg] hover:rotate-0 transition-transform cursor-grab active:cursor-grabbing">
                  <div className="h-full w-full rounded-lg overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" 
                      alt="Detective Scene" 
                      className="w-full h-full object-cover filter contrast-125 sepia-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-[#D4AF37] font-bold">
                      EVIDENCE #07
                    </span>
                  </div>
                </div>
              </div>
            </DraggableFolder>

            {/* Leather Book FINAL INVESTIGATION Card */}
            <DraggableFolder onClick={() => onSelectModule(12)}>
              <div className="relative group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />
                <div 
                  className="w-36 h-44 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-b from-[#1c1810] to-[#121218] p-3 flex flex-col items-center justify-between text-center shadow-2xl cursor-grab active:cursor-grabbing hover:border-[#D4AF37] transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[#262012] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mt-2">
                    <BookOpen className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-serif font-bold text-[#F5D982] tracking-wider uppercase">
                      FINAL INVESTIGATION
                    </div>
                    <div className="flex justify-center text-[#D4AF37] text-[10px]">
                      <span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>

                  <div className="p-1">
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              </div>
            </DraggableFolder>

          </div>

        </div>

      </div>

      {/* SECTION 3: BOTTOM QUOTE & 4 PILLARS BANNER */}
      <div className="rounded-2xl border border-[#262633] bg-[#0c0c0e] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
        
        {/* Left Quote Card */}
        <div className="lg:col-span-4 flex items-center gap-4 p-4 rounded-xl bg-[#121218] border border-[#22222e]">
          <div className="w-16 h-20 rounded-lg overflow-hidden border border-[#333342] shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" 
              alt="The Guide" 
              className="w-full h-full object-cover filter contrast-125 grayscale"
            />
          </div>

          <div className="space-y-1.5">
            <p className="font-serif italic text-xs text-zinc-200 leading-relaxed">
              "The details are not the details. They make the design."
            </p>
            <p className="text-[10px] font-mono text-[#D4AF37]">
              — The Guide
            </p>
          </div>
        </div>

        {/* Right 4 Pillars Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "OBSERVE", desc: "Train your senses to see what others miss.", icon: Eye },
            { label: "ANALYZE", desc: "Understand patterns, behavior and context.", icon: Brain },
            { label: "DEDUCE", desc: "Connect clues and reach logical conclusions.", icon: Search },
            { label: "MASTER", desc: "Apply your skills. Master your mind.", icon: Crown }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="space-y-2 p-3 rounded-xl bg-[#111116] border border-[#1f1f2b] hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1a1812] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-serif text-xs font-bold text-white tracking-wider">
                    {pillar.label}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* SECTION 4: ALL ACADEMY CURRICULUM GRID */}
      <div className="rounded-2xl border border-[#262633] bg-[#0c0c0e] p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f1f2a] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
                COMPLETE MENTALIST CURRICULUM
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-1">
              Explore All Training Modules ({COURSE_MODULES.length})
            </h2>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#14141c] border border-[#282838] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            {/* Difficulty Filter Pills */}
            <div className="flex items-center gap-1 bg-[#14141c] p-1 rounded-xl border border-[#282838]">
              {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Master'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    difficultyFilter === diff
                      ? 'bg-[#D4AF37] text-[#09090b] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        {filteredModules.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Search className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-sm text-zinc-400">No training modules found matching your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setDifficultyFilter('All'); }}
              className="text-xs text-[#D4AF37] font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => {
              const ModuleIcon = getModuleIcon(module.iconName);
              const isCompleted = profile.completedModuleIds?.includes(module.id);
              
              const difficultyColors = {
                Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                Intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                Advanced: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                Master: 'bg-[#D4AF37]/15 text-[#F5D982] border-[#D4AF37]/40'
              };

              return (
                <div
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className={`group relative rounded-2xl bg-[#0e0e12] border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${
                    isCompleted 
                      ? 'border-emerald-500/40 hover:border-emerald-400' 
                      : 'border-[#22222e] hover:border-[#D4AF37]'
                  }`}
                >
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase bg-[#181822] px-2.5 py-1 rounded-md border border-[#2a2a3a]">
                      MODULE {module.id < 10 ? `0${module.id}` : module.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${difficultyColors[module.difficulty]}`}>
                        {module.difficulty}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      )}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#181824] border border-[#333348] group-hover:border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 transition-colors shadow-inner">
                        <ModuleIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-white group-hover:text-[#F5D982] transition-colors leading-snug">
                          {module.title}
                        </h3>
                        <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                          {module.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed pt-2">
                      {module.description}
                    </p>
                  </div>

                  {/* Module Footer Stats */}
                  <div className="border-t border-[#1a1a24] pt-4 mt-auto space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {module.lessons.length} Lesson{module.lessons.length !== 1 ? 's' : ''}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {module.estimatedDuration}
                      </span>

                      <span className="flex items-center gap-1 text-[#F5D982] font-semibold">
                        <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                        +{module.xpValue} XP
                      </span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectModule(module.id);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                          : 'bg-[#181822] border border-[#2a2a3a] group-hover:border-[#D4AF37] text-white group-hover:text-[#F5D982] group-hover:bg-[#D4AF37]/15'
                      }`}
                    >
                      <span>{isCompleted ? 'Review Module' : 'Start Training'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}

