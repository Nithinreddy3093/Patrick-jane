import { useState } from 'react';
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
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';

interface CourseListProps {
  onSelectModule: (moduleId: number) => void;
  onSelectLesson: (moduleId: number, lessonId: string) => void;
  profile: UserProfile;
}

export function CourseList({ onSelectModule, profile }: CourseListProps) {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const learningPathModules = [
    {
      id: 1,
      num: "01",
      title: "OBSERVATION",
      icon: Eye,
      status: "completed",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      num: "02",
      title: "READING PEOPLE",
      icon: Brain,
      status: "locked",
      bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      num: "03",
      title: "PATTERN RECOGNITION",
      icon: Search,
      status: "locked",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      num: "04",
      title: "PATTERN RECOGNITION",
      icon: Brain,
      status: "locked",
      bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      num: "05",
      title: "MEMORY DEDUCTION",
      icon: Search,
      status: "locked",
      bgImage: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      num: "06",
      title: "PSYCHOLOGY",
      icon: Crown,
      status: "locked",
      bgImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen text-white bg-[#09090b] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* SECTION 1: TOP MAIN GRID (HERO BANNER + RIGHT SIDEBAR STACK) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* HERO BANNER USING THE DOWNLOADED /course-bg.jpg IMAGE */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#2a2a34] bg-[#0c0c0e] min-h-[420px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl group">
          
          {/* Main Background Image */}
          <img 
            src="/course-bg.jpg" 
            alt="The Academy Study Desk" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Gradient Overlay for Maximum Text Contrast */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.6) 45%, rgba(9,9,11,0.2) 100%)'
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
                <div key={m.id} className="relative group">
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />

                  {/* Card Container */}
                  <div 
                    onClick={() => onSelectModule(m.id)}
                    className={`w-32 h-44 rounded-xl border p-2.5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1.5 shadow-xl relative overflow-hidden ${
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
              );
            })}

            {/* Vintage Detective Photo Card */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />
              <div className="w-32 h-44 rounded-xl border border-[#38384a] bg-[#121218] p-2 flex flex-col justify-between shadow-xl rotate-[2deg] hover:rotate-0 transition-transform">
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

            {/* Leather Book FINAL INVESTIGATION Card */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />
              <div 
                onClick={() => onSelectModule(12)}
                className="w-36 h-44 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-b from-[#1c1810] to-[#121218] p-3 flex flex-col items-center justify-between text-center shadow-2xl cursor-pointer hover:border-[#D4AF37] transition-all"
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

    </div>
  );
}
