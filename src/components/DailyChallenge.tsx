import { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Award,
  Send
} from 'lucide-react';
import { UserProfile } from '../types';
import { getTodayChallenge } from '../data/dailyChallengesData';

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

  const handleSubmit = () => {
    if (!notes.trim() || submitted) return;
    onSubmitChallenge(todayChallenge.title, notes, todayChallenge.xpReward);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DAILY OBSERVATION PROTOCOL</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-white mb-2">
            Daily <span className="gold-gradient-text">Challenge</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            A new real-world observational drill every 24 hours. Log your findings to maintain your daily streak.
          </p>
        </div>

        {/* Streak counter */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141414] border border-[#D4AF37]/40">
          <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />
          <div>
            <span className="text-xl font-bold font-serif text-white">{profile.streakDays} Days</span>
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Active Streak</span>
          </div>
        </div>
      </div>

      {/* Today's Challenge Card */}
      <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/40 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
            {todayChallenge.category}
          </span>
          <span className="text-xs font-mono text-[#D4AF37] font-bold">
            +{todayChallenge.xpReward} XP
          </span>
        </div>

        <h2 className="font-serif text-3xl font-bold text-white">
          {todayChallenge.title}
        </h2>

        <p className="text-base text-zinc-200 leading-relaxed">
          {todayChallenge.objective}
        </p>

        <div className="p-5 rounded-xl bg-[#090909] border border-[#262626] space-y-3">
          <p className="text-xs font-mono uppercase text-[#D4AF37] font-bold">Suggested Real-World Tasks:</p>
          <ul className="list-disc list-inside text-xs text-zinc-300 space-y-2">
            {todayChallenge.examples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>

        {!submitted ? (
          <div className="space-y-4 pt-2">
            <label className="text-xs font-mono uppercase text-zinc-400 block">
              Log Your Field Observations & Findings:
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail the specific physical cues, non-verbal behaviors, or spatial anomalies you observed today..."
              className="w-full bg-[#090909] border border-[#262626] rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37]"
            />

            <button
              disabled={!notes.trim()}
              onClick={handleSubmit}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                notes.trim()
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black shadow-xl shadow-[#D4AF37]/20'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Submit Today's Field Observation (+100 XP)</span>
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-300">
              Today's Challenge Completed!
            </h3>
            <p className="text-xs text-zinc-300">
              Streak updated to {profile.streakDays} days. Return tomorrow at 00:00 for the next drill.
            </p>
          </div>
        )}
      </div>

      {/* History Log */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-white">
          Observation History Log
        </h3>

        <div className="space-y-3">
          {profile.dailyChallengeHistory.map((h, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl border border-[#262626] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
                  <span>{h.date}</span>
                  <span>•</span>
                  <span>{h.title}</span>
                </div>
                <p className="text-xs text-zinc-300 italic">
                  "{h.userNotes}"
                </p>
              </div>

              <span className="text-xs font-mono text-[#D4AF37] font-bold shrink-0">
                +{h.xpEarned} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
