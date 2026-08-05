import { useState } from 'react';
import { 
  Compass, 
  Eye, 
  Brain, 
  Search, 
  Target, 
  Users, 
  Zap, 
  ChevronRight, 
  Clock, 
  Folder, 
  Shuffle, 
  X,
  CheckCircle2,
  Paperclip
} from 'lucide-react';
import { UserProfile } from '../types';

interface PracticeModeProps {
  onAddXp?: (amount: number, reason?: string) => void;
  profile?: UserProfile;
}

export function PracticeMode({ onAddXp }: PracticeModeProps) {
  const [selectedArea, setSelectedArea] = useState<string>('observation');
  const [activeDrill, setActiveDrill] = useState<any | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [drillSubmitted, setDrillSubmitted] = useState<boolean>(false);

  const practiceAreas = [
    {
      id: 'observation',
      title: 'OBSERVATION',
      desc: 'Notice every detail.',
      icon: Eye,
      bgImg: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'memory',
      title: 'MEMORY',
      desc: 'Remember with clarity.',
      icon: Brain,
      bgImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'deduction',
      title: 'DEDUCTION',
      desc: 'Connect the dots.',
      icon: Search,
      bgImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'pattern',
      title: 'PATTERN',
      desc: 'Find what repeats.',
      icon: Target,
      bgImg: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'people',
      title: 'PEOPLE',
      desc: 'Read beyond words.',
      icon: Users,
      bgImg: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'speed',
      title: 'SPEED',
      desc: 'React. Process. Solve.',
      icon: Zap,
      bgImg: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const caseDrills: Record<string, any> = {
    observation: {
      title: "Rainy Street Observation Drill",
      time: "5 min",
      difficulty: "Medium",
      question: "In the rainy alleyway scene, how many streetlights were flickering near the tavern entrance?",
      options: [
        "One flickering streetlight on the left side",
        "Two streetlights, both completely unlit",
        "Three streetlights glowing continuously",
        "None, only oil lanterns were present"
      ],
      correct: "One flickering streetlight on the left side",
      explanation: "Observing subtle flickering illumination provides key context regarding power fluctuations in 19th-century district quarters."
    },
    memory: {
      title: "Suspect Attire Grid Memory",
      time: "3 min",
      difficulty: "Hard",
      question: "Which pocket watch chain was fastened to the second suspect's lapel?",
      options: [
        "Double Albert gold chain with fob",
        "Single silver chain with compass motif",
        "Leather ribbon braid",
        "No watch chain visible"
      ],
      correct: "Double Albert gold chain with fob",
      explanation: "A Double Albert watch chain indicates formal attire and wealth, suggesting a suspect of high social standing."
    },
    deduction: {
      title: "The Muddy Footprint Origin",
      time: "6 min",
      difficulty: "Medium",
      question: "The red clay residue on the boot heel indicates recent presence in which part of London?",
      options: [
        "The brickworks near Southwark",
        "The gravel docks of Billingsgate",
        "The cobbles of Mayfair",
        "The coal yards of Limehouse"
      ],
      correct: "The brickworks near Southwark",
      explanation: "Southwark's heavy red clay soil is unique to construction brickwork sites along the river bend."
    }
  };

  const handleOpenDrill = (typeKey: string) => {
    const drillData = caseDrills[typeKey] || caseDrills['observation'];
    setActiveDrill(drillData);
    setUserAnswer(null);
    setDrillSubmitted(false);
  };

  const handleSubmitAnswer = (opt: string) => {
    setUserAnswer(opt);
    setDrillSubmitted(true);
    if (opt === activeDrill?.correct && onAddXp) {
      onAddXp(75, "Practice Challenge Solved");
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#09090b] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* 1. HERO BANNER: SHARPEN YOUR OBSERVATION */}
      <div className="relative rounded-2xl overflow-hidden border border-[#2a2a34] bg-[#0c0c0e] min-h-[380px] sm:min-h-[420px] p-6 sm:p-12 flex flex-col justify-between shadow-2xl group">
        
        {/* Background Detective Desk/Study Image */}
        <img 
          src="/course-bg.jpg" 
          alt="Detective Study Desk" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay Gradient for High Contrast Readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.85) 45%, rgba(9,9,11,0.25) 100%)'
          }}
        />

        {/* Hero Left Content Overlay */}
        <div className="relative z-10 max-w-md my-auto">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#D4AF37] font-bold uppercase block mb-2">
            PRACTICE
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] mb-3">
            <span className="text-white block">Sharpen Your</span>
            <span className="text-[#D4AF37] font-serif block">Observation.</span>
          </h1>

          {/* Gold Diamond Line Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
            <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-normal mb-8 max-w-sm">
            Master the art of noticing what others miss. Every challenge builds a sharper you.
          </p>

          {/* Gold CTA Button */}
          <button 
            onClick={() => handleOpenDrill('observation')}
            className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F5D982] text-black font-serif font-bold text-xs tracking-wider transition-all flex items-center gap-2.5 shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-black" />
            <span>Begin Training</span>
          </button>
        </div>

      </div>

      {/* 2. PRACTICE AREAS ROW (MANILA DOSSIER FOLDERS WITH RED PIN THREAD) */}
      <div className="space-y-4">
        
        {/* Header Title */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            PRACTICE AREAS
          </span>
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
        </div>

        {/* Dossier Cards Container */}
        <div className="relative py-2 overflow-x-auto no-scrollbar">
          
          {/* Red Connecting String across pushpins */}
          <div className="absolute top-[18px] left-8 right-16 h-[2px] bg-red-700/60 z-0" />

          <div className="flex items-center gap-4 min-w-[980px] relative z-10 px-2">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              const isSelected = selectedArea === area.id;

              return (
                <div key={area.id} className="relative group">
                  {/* Push pin on top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 border border-red-300 z-20 shadow-md" />

                  {/* Folder Tab Card */}
                  <div
                    onClick={() => {
                      setSelectedArea(area.id);
                      handleOpenDrill(area.id);
                    }}
                    className={`w-36 h-48 rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1.5 shadow-xl relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#d8c29d] text-zinc-900 border-[#D4AF37] ring-2 ring-[#D4AF37]/60 shadow-[#D4AF37]/20'
                        : 'bg-[#c2b08f]/90 hover:bg-[#cca26b] text-zinc-900 border-[#9a8563]'
                    }`}
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)`
                    }}
                  >
                    {/* Manila Folder Tab Lip cutout styling */}
                    <div className="absolute top-0 right-0 w-8 h-4 bg-[#09090b] rounded-bl-lg border-l border-b border-[#2a2a34]" />

                    {/* Top Pushpin circle guide */}
                    <div className="flex justify-center pt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-800" />
                    </div>

                    {/* Icon Circle */}
                    <div className="flex flex-col items-center text-center space-y-2 my-auto">
                      <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected 
                          ? 'bg-[#211f19] text-[#D4AF37] border-[#D4AF37]' 
                          : 'bg-[#332e25]/20 text-zinc-900 border-zinc-800/40'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-zinc-900">
                          {area.title}
                        </div>
                        <div className="text-[10px] font-sans font-medium text-zinc-700 leading-tight">
                          {area.desc}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Folder Corner Stitching Line */}
                    <div className="w-full h-[1px] bg-zinc-800/20" />
                  </div>
                </div>
              );
            })}

            {/* Slider Arrow Button */}
            <div className="shrink-0 pl-2">
              <button className="w-9 h-9 rounded-full bg-[#181820] border border-[#333342] text-zinc-300 hover:text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:border-[#D4AF37]">
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 3. BOTTOM ROW: TODAY'S CHALLENGE + RANDOM PRACTICE + YOUR PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* CARD 1: TODAY'S CHALLENGE (WIDE VINTAGE PAPER CASE) */}
        <div className="lg:col-span-6 relative rounded-2xl border border-[#9a8563]/40 bg-[#c2b08f] text-zinc-900 p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col justify-between">
          
          {/* Manila Paper Texture & Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(circle, #d0bc97 0%, #a4916e 100%)`
            }}
          />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            
            {/* Left Photo with Paperclip */}
            <div className="sm:col-span-5 relative">
              {/* Silver Paperclip */}
              <div className="absolute -top-3 left-3 z-30">
                <Paperclip className="w-7 h-7 text-zinc-400 rotate-45 filter drop-shadow" />
              </div>

              {/* B&W Photo Frame */}
              <div className="rounded-lg overflow-hidden border-2 border-white/80 bg-zinc-950 p-1 shadow-xl rotate-[-2deg]">
                <div className="h-36 sm:h-40 w-full overflow-hidden rounded relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" 
                    alt="Rainy Street Detective" 
                    className="w-full h-full object-cover filter contrast-125 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>

            {/* Right Case Information */}
            <div className="sm:col-span-7 space-y-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-red-900 uppercase block">
                TODAY'S CHALLENGE
              </span>

              <h3 className="font-serif text-xl font-bold text-zinc-950 leading-snug">
                Rainy Street Observation
              </h3>

              <p className="text-xs text-zinc-800 leading-relaxed font-sans font-medium">
                Observe the scene for 45 seconds and answer the questions that follow.
              </p>

              {/* Meta Tags & Action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs font-mono font-semibold text-zinc-900">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-700" />
                    5 min
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    📊 Medium
                  </span>
                </div>

                <button 
                  onClick={() => handleOpenDrill('observation')}
                  className="px-4 py-2 rounded-xl bg-[#1c1813] hover:bg-[#2d271f] text-[#F5D982] font-mono font-bold text-xs flex items-center gap-2 border border-[#D4AF37]/50 transition-all shadow-md cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open Case File</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* CARD 2: RANDOM PRACTICE */}
        <div className="lg:col-span-2 rounded-2xl border border-[#22222e] bg-[#0f0f14] p-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase block">
              RANDOM PRACTICE
            </span>

            {/* 3D Dice / Chance Icon */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-12 h-12 rounded-xl bg-[#1a1812] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg">
                <Shuffle className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-snug">
                Let chance decide your next challenge.
              </p>
            </div>
          </div>

          <button 
            onClick={() => handleOpenDrill(['observation', 'memory', 'deduction'][Math.floor(Math.random() * 3)])}
            className="w-full mt-6 py-2.5 rounded-xl bg-[#181820] hover:bg-[#222230] border border-[#333345] text-white font-mono font-semibold text-xs tracking-wider transition-all cursor-pointer"
          >
            Surprise Me
          </button>
        </div>

        {/* CARD 3: YOUR PROGRESS (SPIRAL NOTEBOOK WITH PAPERCLIPPED POLAROID) */}
        <div className="lg:col-span-4 relative rounded-2xl border border-[#22222e] bg-[#0c0c0e] p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Left Spiral Notebook Table */}
            <div className="sm:col-span-8 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase block">
                YOUR PROGRESS
              </span>

              {/* Stats List Table */}
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between items-center border-b border-[#1c1c28] pb-1.5">
                  <span className="text-zinc-400">Challenges Completed</span>
                  <span className="font-mono font-bold text-white">23</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1c1c28] pb-1.5">
                  <span className="text-zinc-400">Accuracy</span>
                  <span className="font-mono font-bold text-[#F5D982]">87%</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1c1c28] pb-1.5">
                  <span className="text-zinc-400">Current Streak</span>
                  <span className="font-mono font-bold text-amber-400">12 Days</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1c1c28] pb-1.5">
                  <span className="text-zinc-400">Skills Trained</span>
                  <span className="font-mono font-bold text-white">6/6</span>
                </div>
              </div>

              <button className="text-xs font-mono font-semibold text-[#D4AF37] hover:text-white inline-flex items-center gap-1 transition-colors pt-1 cursor-pointer">
                <span>View Progress</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>

            {/* Right Paperclipped Polaroid Photo */}
            <div className="sm:col-span-4 relative flex justify-center">
              {/* Paperclip */}
              <div className="absolute -top-3 right-4 z-20">
                <Paperclip className="w-6 h-6 text-zinc-400 rotate-12" />
              </div>

              {/* Polaroid Frame */}
              <div className="w-24 h-32 rounded bg-white p-1.5 shadow-2xl rotate-3 border border-zinc-300 flex flex-col justify-between">
                <div className="h-22 w-full bg-zinc-950 rounded-sm overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" 
                    alt="Detective Silhouette" 
                    className="w-full h-full object-cover filter contrast-125 grayscale"
                  />
                </div>
                <div className="text-[8px] font-mono text-zinc-800 text-center font-bold">
                  MASTER #01
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ACTIVE DRILL MODAL DIALOG */}
      {activeDrill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0f14] border border-[#D4AF37]/50 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setActiveDrill(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg bg-[#181820] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                ACTIVE PRACTICE DRILL
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                {activeDrill.title}
              </h2>
            </div>

            <p className="text-sm text-zinc-300 font-sans">
              {activeDrill.question}
            </p>

            <div className="space-y-2 pt-2">
              {activeDrill.options.map((opt: string, idx: number) => {
                const isSelected = userAnswer === opt;
                const isCorrect = opt === activeDrill.correct;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSubmitAnswer(opt)}
                    className={`w-full p-3 rounded-xl text-xs font-sans text-left border transition-all cursor-pointer ${
                      drillSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-[#14141c] border-[#222230] text-zinc-400'
                        : 'bg-[#14141c] border-[#222230] text-zinc-200 hover:border-[#D4AF37]/60'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {drillSubmitted && (
              <div className="p-4 rounded-xl bg-[#14141c] border border-[#D4AF37]/30 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{userAnswer === activeDrill.correct ? "Deduction Confirmed! (+75 XP)" : "Incorrect Observation"}</span>
                </div>
                <p className="leading-relaxed">
                  {activeDrill.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
