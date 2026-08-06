import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Target, 
  Edit3, 
  Award, 
  Trophy, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  FileText, 
  User, 
  Sliders, 
  Lock, 
  ShoppingBag, 
  LogOut, 
  ChevronRight, 
  Check, 
  X,
  Sparkles,
  Flame
} from 'lucide-react';
import { UserProfile } from '../types';
import { BackgroundImage } from './BackgroundImage';
import { getRankFromXp } from '../data/ranksData';

interface UserProfileProps {
  profile: UserProfile;
  authUser?: any;
  onSignInGoogle?: () => Promise<any>;
  onSignOutGoogle?: () => Promise<void>;
  onUpdateName: (name: string) => void;
  onOpenCertificate: () => void;
  onToggleAlwaysPlayIntro?: (val: boolean) => void;
}

export function UserProfileView({ 
  profile, 
  authUser,
  onSignInGoogle,
  onSignOutGoogle,
  onUpdateName, 
  onOpenCertificate, 
  onToggleAlwaysPlayIntro 
}: UserProfileProps) {
  const currentRank = getRankFromXp(profile.xp);

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || 'Observer');
  const [locationInput, setLocationInput] = useState('Everywhere');
  const [quoteInput, setQuoteInput] = useState('"The truth is always in the details."');
  const [focusInput, setFocusInput] = useState('Observation • Deduction • Patterns');

  // Modals for Account Options
  const [activeAccountModal, setActiveAccountModal] = useState<string | null>(null);

  const saveProfile = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#070605] text-zinc-100 font-sans pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION WITH DETECTIVE DESK BACKGROUND & PROFILE BINDER  */}
      {/* ------------------------------------------------------------- */}
      <div className="relative rounded-3xl border border-[#2e261e] overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
        
        {/* Background Detective Desk Image */}
        <BackgroundImage 
          src="/practice-bg.jpg"
          fallbackSrc="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1920&q=80"
          alt="Detective Desk Background"
          className="w-full h-full object-cover object-center pointer-events-none opacity-90"
          gradientOverlayStyle={{
            background: 'linear-gradient(to right, rgba(7, 6, 5, 0.82) 0%, rgba(7, 6, 5, 0.4) 50%, rgba(7, 6, 5, 0.1) 100%)'
          }}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
          
          {/* LEFT: Leather Binder + Polaroid Detective Badge Photo */}
          <div className="relative shrink-0 group">
            {/* Fountain Pen Clip on side */}
            <div className="absolute -left-4 top-12 z-30 pointer-events-none drop-shadow-2xl hidden sm:block">
              <div className="w-3 h-28 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-950 rounded-full border border-[#D4AF37] relative shadow-2xl rotate-[-12deg]">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-12 bg-amber-200/80 rounded-full" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#D4AF37] rounded-t-full" />
              </div>
            </div>

            {/* Dark Leather Binder Card Container */}
            <div 
              className="w-72 sm:w-80 h-[380px] rounded-2xl border-2 border-[#3d3124] p-4 relative shadow-2xl flex flex-col justify-between"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 0%, #1e1812 0%, #0c0a08 100%)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              {/* Corner Metallic Accent Stitchings */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/40" />

              {/* Top Paperclip Metal Clip */}
              <div className="absolute top-1 left-8 z-20 w-5 h-8 border-2 border-amber-300/80 rounded-t-full shadow-md" />

              {/* Inner Cream Polaroid Photo Card */}
              <div className="bg-[#12100e] border border-[#2b2219] p-3 rounded-lg h-full flex flex-col justify-between relative overflow-hidden shadow-inner">
                
                {/* Photo Frame */}
                <div className="h-64 w-full rounded bg-black relative overflow-hidden border border-black/80 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                    alt="Detective Silhouette"
                    className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Card Footer: Signature & Official Stamp */}
                <div className="flex items-center justify-between pt-2 px-1 relative">
                  <div>
                    <span className="font-serif italic text-2xl font-bold text-white tracking-wide block">
                      {nameInput}
                    </span>
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block">
                      CONFIDENTIAL CASE ID #8094
                    </span>
                  </div>

                  {/* Circular Official Seal Wax Stamp */}
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/60 flex items-center justify-center text-center p-0.5 relative rotate-[-15deg]">
                    <div className="w-10 h-10 rounded-full border border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center text-[7px] font-mono text-[#D4AF37] leading-none uppercase font-bold">
                      <span>OBSERVER</span>
                      <span>DEDUCTOR</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Profile Info & Attributes */}
          <div className="flex-1 space-y-6 pt-2">
            
            {/* Header Badge & Name */}
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                DETECTIVE IN TRAINING
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                {nameInput}
              </h1>

              <p className="font-serif italic text-zinc-400 text-sm sm:text-base">
                {quoteInput}
              </p>
            </div>

            {/* Attribute List */}
            <div className="space-y-3 pt-2 max-w-xl">
              
              {/* Rank */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141210] border border-[#2b241c] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Rank</div>
                  <div className="text-sm font-semibold text-white">{currentRank.title}</div>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141210] border border-[#2b241c] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Member Since</div>
                  <div className="text-sm font-semibold text-white">May 24, 2024</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141210] border border-[#2b241c] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Location</div>
                  <div className="text-sm font-semibold text-white">{locationInput}</div>
                </div>
              </div>

              {/* Focus */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141210] border border-[#2b241c] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Focus</div>
                  <div className="text-sm font-semibold text-white">{focusInput}</div>
                </div>
              </div>

            </div>

            {/* Edit Profile Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg border border-[#D4AF37]/60 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Edit Profile</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GOOGLE AUTHENTICATION INTEGRATION CARD                        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-[#12100e] via-[#1a1510] to-[#12100e] border border-[#3d3124] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {/* Google Logo / User Photo Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl border-2 border-[#D4AF37]/80 bg-[#0a0908] overflow-hidden flex items-center justify-center p-0.5 shadow-lg shrink-0">
                {authUser?.photoURL ? (
                  <img src={authUser.photoURL} alt="Google Profile" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
              </div>
              {authUser && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full shadow-sm" title="Verified Google Account" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  DETECTIVE IDENTITY AUTHENTICATION
                </span>
                {authUser ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                    Google Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold uppercase">
                    Guest Mode
                  </span>
                )}
              </div>
              
              <h3 className="font-serif text-lg font-bold text-white">
                {authUser ? (authUser.displayName || 'Google Detective Account') : 'Google Account Login'}
              </h3>
              
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {authUser ? (authUser.email || 'Synchronized with Firebase Auth') : 'Sign in with Google to sync detective progress & verify certificates'}
              </p>
            </div>
          </div>

          <div>
            {authUser ? (
              <button
                onClick={async () => {
                  if (onSignOutGoogle) {
                    await onSignOutGoogle();
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Google</span>
              </button>
            ) : (
              <button
                onClick={async () => {
                  if (onSignInGoogle) {
                    try {
                      await onSignInGoogle();
                    } catch (e: any) {
                      if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
                        console.error('Google Sign-In Error:', e);
                      }
                    }
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F5F5F5] hover:bg-white text-zinc-900 font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shadow-xl hover:shadow-[#D4AF37]/20 border border-zinc-300"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MIDDLE STATS BANNER (5 EQUAL COLUMNS)                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#0e0c0a] border border-[#231d16] rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x divide-[#231d16]">
          
          {/* Stat 1: MISSIONS COMPLETED */}
          <div className="flex items-center gap-3 md:justify-center md:px-4">
            <div className="w-10 h-10 rounded-full bg-[#171410] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                MISSIONS COMPLETED
              </div>
              <div className="text-2xl font-serif font-bold text-white">
                {profile.completedModuleIds.length || 42}
              </div>
              <div className="text-[11px] text-zinc-400">Keep going.</div>
            </div>
          </div>

          {/* Stat 2: CURRENT STREAK */}
          <div className="flex items-center gap-3 md:justify-center md:px-4">
            <div className="w-10 h-10 rounded-full bg-[#171410] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                CURRENT STREAK
              </div>
              <div className="text-2xl font-serif font-bold text-white">
                {profile.streakDays || 7}
              </div>
              <div className="text-[11px] text-zinc-400">Days in a row</div>
            </div>
          </div>

          {/* Stat 3: ACCURACY */}
          <div className="flex items-center gap-3 md:justify-center md:px-4">
            <div className="w-10 h-10 rounded-full bg-[#171410] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                ACCURACY
              </div>
              <div className="text-2xl font-serif font-bold text-white">
                86%
              </div>
              <div className="text-[11px] text-zinc-400">Sharp mind</div>
            </div>
          </div>

          {/* Stat 4: RANK */}
          <div className="flex items-center gap-3 md:justify-center md:px-4">
            <div className="w-10 h-10 rounded-full bg-[#171410] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                RANK
              </div>
              <div className="text-lg font-serif font-bold text-white leading-tight">
                {currentRank.title}
              </div>
              <div className="text-[11px] text-zinc-400">Keep learning</div>
            </div>
          </div>

          {/* Stat 5: POINTS */}
          <div className="flex items-center gap-3 md:justify-center md:px-4 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#171410] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                POINTS
              </div>
              <div className="text-2xl font-serif font-bold text-white">
                {profile.xp.toLocaleString() || "1,350"}
              </div>
              <div className="text-[11px] text-zinc-400">Keep growing</div>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM SECTION (3 COLUMNS: ACHIEVEMENTS, RECENT ACTIVITY, ACCOUNT) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMN 1: ACHIEVEMENTS */}
        <div className="bg-[#0e0c0a] border border-[#231d16] rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#231d16] pb-4 mb-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                ACHIEVEMENTS
              </h3>
              <button 
                onClick={onOpenCertificate}
                className="text-[11px] font-mono text-[#D4AF37] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                { title: 'First Steps', desc: 'Complete your first mission', date: 'May 24, 2024' },
                { title: 'Observation Expert', desc: 'Score 90% in observation missions', date: 'Jun 02, 2024' },
                { title: '7 Day Streak', desc: 'Maintain a 7 day streak', date: 'Jun 05, 2024' },
                { title: 'Pattern Master', desc: 'Solve 20 pattern based cases', date: 'Jun 12, 2024' },
              ].map((ach, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#12100e]/80 border border-[#1e1812]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1611] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{ach.title}</div>
                      <div className="text-[11px] text-zinc-400">{ach.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-zinc-500">{ach.date}</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: RECENT ACTIVITY */}
        <div className="bg-[#0e0c0a] border border-[#231d16] rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#231d16] pb-4 mb-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                RECENT ACTIVITY
              </h3>
              <button className="text-[11px] font-mono text-[#D4AF37] hover:underline cursor-pointer">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                { icon: FileText, title: 'The Silent Witness', type: 'Completed Mission', score: '86%', time: '2h ago' },
                { icon: CheckCircle2, title: 'Daily Challenge', type: 'Completed', score: '92%', time: '1d ago' },
                { icon: FileText, title: 'The Disappearing Heir', type: 'Completed Mission', score: '78%', time: '2d ago' },
                { icon: CheckCircle2, title: 'Daily Challenge', type: 'Completed', score: '90%', time: '3d ago' },
              ].map((act, idx) => {
                const IconComponent = act.icon;
                return (
                  <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#12100e]/80 border border-[#1e1812]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1a1611] border border-[#2b2219] text-[#D4AF37] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{act.title}</div>
                        <div className="text-[11px] text-zinc-400">{act.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#1f1910] border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] font-bold">
                        {act.score}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMN 3: ACCOUNT */}
        <div className="bg-[#0e0c0a] border border-[#231d16] rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#231d16] pb-4 mb-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              ACCOUNT
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { id: 'info', icon: User, label: 'Personal Information', sub: 'Update your personal details' },
              { id: 'prefs', icon: Sliders, label: 'Preferences', sub: 'Notification, theme & more' },
              { id: 'security', icon: Lock, label: 'Security', sub: 'Password and security settings' },
              { id: 'sub', icon: ShoppingBag, label: 'Subscription', sub: 'Manage your plan' },
              { id: 'logout', icon: LogOut, label: 'Logout', sub: 'Sign out from your account' },
            ].map((opt) => {
              const OptIcon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (opt.id === 'sub') {
                      onOpenCertificate();
                    } else if (opt.id === 'logout') {
                      alert('Signed out successfully.');
                    } else {
                      setActiveAccountModal(opt.id);
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#12100e] hover:bg-[#1c1813] border border-[#1e1812] hover:border-[#D4AF37]/40 transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#171410] border border-[#2b2219] group-hover:border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <OptIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {opt.sub}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF37] transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12100e] border-2 border-[#D4AF37]/60 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#D4AF37]" />
              <span>Edit Investigator Dossier</span>
            </h3>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Detective Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#080706] border border-[#2b2219] focus:border-[#D4AF37] rounded-lg p-2.5 text-sm text-white focus:outline-none font-serif"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Personal Motto / Quote</label>
                <input
                  type="text"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  className="w-full bg-[#080706] border border-[#2b2219] focus:border-[#D4AF37] rounded-lg p-2.5 text-sm text-white focus:outline-none italic"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Location</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full bg-[#080706] border border-[#2b2219] focus:border-[#D4AF37] rounded-lg p-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Focus Areas</label>
                <input
                  type="text"
                  value={focusInput}
                  onChange={(e) => setFocusInput(e.target.value)}
                  className="w-full bg-[#080706] border border-[#2b2219] focus:border-[#D4AF37] rounded-lg p-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#231d16]">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-5 py-2 rounded-lg bg-[#D4AF37] text-black font-bold text-xs font-mono uppercase tracking-wider"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT MODAL SETTINGS */}
      {activeAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12100e] border-2 border-[#D4AF37]/60 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveAccountModal(null)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white capitalize">
              {activeAccountModal === 'info' && 'Personal Information'}
              {activeAccountModal === 'prefs' && 'Preferences & Settings'}
              {activeAccountModal === 'security' && 'Security Configuration'}
            </h3>

            {activeAccountModal === 'prefs' && (
              <div className="space-y-4 py-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#080706] border border-[#2b2219]">
                  <div>
                    <p className="text-xs font-bold text-white">Play Intro Video on Visit</p>
                    <p className="text-[10px] text-zinc-400">Launch prologue on every visit</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.playIntroOnEveryVisit || false}
                    onChange={(e) => onToggleAlwaysPlayIntro?.(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            {activeAccountModal !== 'prefs' && (
              <p className="text-xs text-zinc-300 leading-relaxed py-2">
                Your detective account is synchronized with local storage. All settings are active and secure.
              </p>
            )}

            <button
              onClick={() => setActiveAccountModal(null)}
              className="w-full py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs font-mono uppercase tracking-wider"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
