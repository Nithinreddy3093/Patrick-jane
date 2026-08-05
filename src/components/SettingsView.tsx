import { useState } from 'react';
import { Settings, Trash2, RotateCcw, ShieldCheck, Sparkles, User, RefreshCw } from 'lucide-react';

interface SettingsViewProps {
  onResetProgress: () => void;
  playIntroOnEveryVisit?: boolean;
  onToggleAlwaysPlayIntro?: (val: boolean) => void;
}

export function SettingsView({ onResetProgress, playIntroOnEveryVisit = false, onToggleAlwaysPlayIntro }: SettingsViewProps) {
  const [resetConfirm, setResetConfirm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Header */}
      <div className="border-b border-[#262626] pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>PLATFORM CONFIGURATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Settings & <span className="gold-gradient-text">Preferences</span>
        </h1>
      </div>

      <div className="space-y-6">
        {/* Preference Controls */}
        <div className="glass-panel p-6 rounded-2xl border border-[#262626] space-y-4">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Cinematic & Ambient Experience</span>
          </h3>

          {/* Intro Video Setting */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#090909] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Play Intro on Every Visit</span>
              </p>
              <p className="text-xs text-zinc-400">
                Ignores saved session flag and always plays the full cinematic Prologue video when opening the app.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={playIntroOnEveryVisit}
                onChange={(e) => onToggleAlwaysPlayIntro?.(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#090909] border border-[#262626]">
            <div>
              <p className="text-sm font-semibold text-white">Ambient Particle Canvas</p>
              <p className="text-xs text-zinc-400">Renders floating particle network in background</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/30">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#090909] border border-[#262626]">
            <div>
              <p className="text-sm font-semibold text-white">Dark Luxury Theme (#090909)</p>
              <p className="text-xs text-zinc-400">High-contrast gold & charcoal palette</p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/30">
              Default
            </span>
          </div>
        </div>

        {/* Data Persistence Reset */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-950/10 space-y-4">
          <h3 className="font-serif text-lg font-bold text-rose-300 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Danger Zone: Reset Account Progress</span>
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Clears all saved XP, completed course lessons, detective cases, and observation streak data stored in your local browser cache.
          </p>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-900/60 border border-rose-500/50 text-rose-200 text-xs font-mono hover:bg-rose-900 cursor-pointer transition-all"
            >
              Reset All Progress Data
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-rose-950 border border-rose-500 space-y-3">
              <p className="text-xs font-bold text-white">
                Are you completely sure? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onResetProgress();
                    setResetConfirm(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs font-mono cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
