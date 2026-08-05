import { useState } from 'react';
import { 
  User, 
  Award, 
  Flame, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Target,
  Edit2,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { RANKS, getRankFromXp } from '../data/ranksData';

interface UserProfileProps {
  profile: UserProfile;
  onUpdateName: (name: string) => void;
  onOpenCertificate: () => void;
  onToggleAlwaysPlayIntro?: (val: boolean) => void;
}

export function UserProfileView({ profile, onUpdateName, onOpenCertificate, onToggleAlwaysPlayIntro }: UserProfileProps) {
  const currentRank = getRankFromXp(profile.xp);
  const nextRankIndex = RANKS.findIndex(r => r.title === currentRank.title) + 1;
  const nextRank = RANKS[nextRankIndex] || currentRank;

  const xpInCurrentRank = profile.xp - currentRank.minXp;
  const xpSpan = Math.max(1, nextRank.minXp - currentRank.minXp);
  const rankProgressPercent = Math.min(100, Math.round((xpInCurrentRank / xpSpan) * 100));

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const saveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20 space-y-10">
      {/* Profile Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-[#D4AF37]/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <img
              src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-[#D4AF37] shadow-2xl"
            />
            <span className="absolute -bottom-2 -right-2 text-3xl">
              {currentRank.badgeSymbol}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-[#090909] border border-[#D4AF37] rounded-xl px-3 py-1 text-xl font-bold font-serif text-white focus:outline-none"
                  />
                  <button
                    onClick={saveName}
                    className="p-1.5 rounded-lg bg-[#D4AF37] text-black cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white flex items-center gap-2">
                  <span>{profile.name}</span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-zinc-500 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </h1>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                {currentRank.title} Rank
              </span>
              <span className="text-zinc-400">•</span>
              <span className="text-white font-bold">{profile.xp} Total XP</span>
            </div>

            <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
              {currentRank.description}
            </p>
          </div>
        </div>

        {/* Rank XP Progress Bar */}
        <div className="mt-8 pt-6 border-t border-[#262626] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Current Rank: <strong className="text-white">{currentRank.title}</strong></span>
            <span className="text-[#D4AF37]">Next Rank: <strong className="text-white">{nextRank.title}</strong> ({profile.xp}/{nextRank.minXp} XP)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#090909] overflow-hidden border border-[#262626]">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFF7D6] transition-all duration-500"
              style={{ width: `${rankProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completed Modules', val: `${profile.completedModuleIds.length} / 11`, icon: BookOpen },
          { label: 'Practice Time', val: `${profile.practiceTimeMinutes} mins`, icon: Clock },
          { label: 'Daily Streak', val: `${profile.streakDays} Days`, icon: Flame },
          { label: 'Solved Mystery Cases', val: `${profile.solvedCaseIds.length} Cases`, icon: Target },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-[#262626] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-zinc-400 block">{s.label}</span>
              <span className="text-xl font-bold font-serif text-white block">{s.val}</span>
            </div>
          );
        })}
      </div>

      {/* Skills Assessment Radar Bars */}
      <div className="glass-panel p-8 rounded-3xl border border-[#262626] space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">
          Observational Skill Matrix
        </h3>

        <div className="space-y-4">
          {[
            { label: "Visual Observation & Scanning", val: profile.skills.observation },
            { label: "Memory Loci Retention", val: profile.skills.memory },
            { label: "First-Principles Logic", val: profile.skills.logic },
            { label: "Behavioral Micro-Expression Reading", val: profile.skills.behavioralAnalysis },
            { label: "Situational Awareness (OODA)", val: profile.skills.situationalAwareness },
          ].map((skill, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">{skill.label}</span>
                <span className="text-[#D4AF37] font-bold">{skill.val} / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#090909] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]"
                  style={{ width: `${skill.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Ladder Badges Grid */}
      <div className="glass-panel p-8 rounded-3xl border border-[#262626] space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">
          The Rank System Hierarchy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RANKS.map((r) => {
            const isReached = profile.xp >= r.minXp;
            return (
              <div
                key={r.title}
                className={`p-5 rounded-2xl border transition-all ${
                  isReached
                    ? 'bg-[#141414] border-[#D4AF37]/50 shadow-lg'
                    : 'bg-[#090909] border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{r.badgeSymbol}</span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      {r.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      {r.minXp}+ XP
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academy Preferences */}
      <div className="glass-panel p-8 rounded-3xl border border-[#262626] space-y-4">
        <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>Academy Preferences</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090909] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">
              Play Intro on Every Visit
            </p>
            <p className="text-xs text-zinc-400">
              Always play the full cinematic prologue video when launching The Jane Method.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={profile.playIntroOnEveryVisit || false}
              onChange={(e) => onToggleAlwaysPlayIntro?.(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
          </label>
        </div>
      </div>

      {/* Certificate Button */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-[#141414] to-[#090909] border border-[#D4AF37]/40 space-y-4">
        <Award className="w-10 h-10 text-[#D4AF37] mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-white">
          Master Observer Certificate
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Generate your official, verified "The Jane Method" Master Observer completion diploma.
        </p>
        <button
          onClick={onOpenCertificate}
          className="px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-bold text-sm cursor-pointer shadow-xl shadow-[#D4AF37]/10"
        >
          View / Print Master Certificate
        </button>
      </div>
    </div>
  );
}
