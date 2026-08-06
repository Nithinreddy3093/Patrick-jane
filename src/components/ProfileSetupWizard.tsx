import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';
import { createUserProfileDoc } from '../lib/firebase';

interface ProfileSetupWizardProps {
  isOpen: boolean;
  uid: string;
  defaultEmail: string;
  defaultName?: string;
  defaultPhotoURL?: string;
  onComplete: (userDocData: any) => void;
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
];

const GOAL_OPTIONS = [
  { id: 'Master Observation', title: 'Master Observation', desc: 'Sharpen sensory perception and micro-expression detection.' },
  { id: 'Cognitive Deductions', title: 'Cognitive Deductions', desc: 'Connect subtle logical clues and solve complex scenarios.' },
  { id: 'Forensic Profiling', title: 'Forensic Profiling', desc: 'Understand behavioral patterns and psychological motives.' },
  { id: 'Mental Sharpness', title: 'Mental Sharpness', desc: 'Enhance daily focus, memory retention, and critical thinking.' }
];

const DIFFICULTY_OPTIONS = [
  { id: 'Apprentice Observer', title: 'Apprentice Observer', desc: 'Guided clues, introductory scenarios, and detailed hints.' },
  { id: 'Field Investigator', title: 'Field Investigator', desc: 'Balanced timer constraints and realistic detective cases.' },
  { id: 'Master Profiler', title: 'Master Profiler', desc: 'Unassisted logic puzzles, hidden evidence, and strict time limits.' }
];

export function ProfileSetupWizard({
  isOpen,
  uid,
  defaultEmail,
  defaultName = '',
  defaultPhotoURL = '',
  onComplete
}: ProfileSetupWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(defaultName || 'Investigator');
  const [selectedAvatar, setSelectedAvatar] = useState(defaultPhotoURL || AVATAR_PRESETS[0]);
  const [learningGoal, setLearningGoal] = useState(GOAL_OPTIONS[0].id);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_OPTIONS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const docData = await createUserProfileDoc(uid, {
        name,
        email: defaultEmail,
        photoURL: selectedAvatar,
        xp: 0,
        level: 1,
        streak: 1,
        completedLessons: [],
        preferences: {
          learningGoal,
          difficulty
        }
      });
      onComplete(docData);
    } catch (err) {
      console.error('Failed to complete setup wizard:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-[#0e0c0a] border border-[#3d3124] rounded-3xl shadow-2xl p-6 sm:p-10 text-zinc-100 overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Wizard Progress Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#231d16]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif text-lg font-bold text-white">Detective Onboarding</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  step === s 
                    ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 scale-105' 
                    : step > s 
                    ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400' 
                    : 'bg-[#181410] border border-[#33281e] text-zinc-600'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">STEP 1 OF 3</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Establish Your Dossier</h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Choose your official investigator alias and profile avatar.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Detective Name"
                  className="w-full pl-10 pr-4 py-3 bg-[#14100c] border border-[#2e2419] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] font-sans font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-3">
                Select Profile Avatar
              </label>
              <div className="grid grid-cols-4 gap-3">
                {AVATAR_PRESETS.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      selectedAvatar === url 
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105 shadow-xl' 
                        : 'border-[#231d16] opacity-60 hover:opacity-100 hover:border-[#3a2f22]'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                    {selectedAvatar === url && (
                      <div className="absolute top-1 right-1 bg-[#D4AF37] text-black rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 mt-4 rounded-xl bg-[#D4AF37] hover:bg-[#e2be4a] text-black font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/15 transition-all"
            >
              <span>Continue to Learning Goal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 2: LEARNING GOAL */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">STEP 2 OF 3</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Select Primary Objective</h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Customize your Jane Method curriculum focus.
              </p>
            </div>

            <div className="space-y-3">
              {GOAL_OPTIONS.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setLearningGoal(g.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    learningGoal === g.id
                      ? 'bg-[#1a1510] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#120e0b] border-[#261f18] hover:border-[#382d23]'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-0.5 ${learningGoal === g.id ? 'bg-[#D4AF37] text-black' : 'bg-[#1e1812] text-zinc-500'}`}>
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-serif text-sm font-bold text-white">{g.title}</div>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{g.desc}</p>
                  </div>
                  {learningGoal === g.id && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl bg-[#1a1612] border border-[#33281e] text-zinc-300 font-mono text-xs font-bold uppercase hover:bg-[#26201a] cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2be4a] text-black font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/15 transition-all"
              >
                <span>Continue to Difficulty</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: DIFFICULTY */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">STEP 3 OF 3</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Training Intensity</h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Choose your preferred challenge level for daily field cases.
              </p>
            </div>

            <div className="space-y-3">
              {DIFFICULTY_OPTIONS.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    difficulty === d.id
                      ? 'bg-[#1a1510] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#120e0b] border-[#261f18] hover:border-[#382d23]'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-0.5 ${difficulty === d.id ? 'bg-[#D4AF37] text-black' : 'bg-[#1e1812] text-zinc-500'}`}>
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-serif text-sm font-bold text-white">{d.title}</div>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{d.desc}</p>
                  </div>
                  {difficulty === d.id && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-xl bg-[#1a1612] border border-[#33281e] text-zinc-300 font-mono text-xs font-bold uppercase hover:bg-[#26201a] cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                disabled={isSubmitting}
                className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e2be4a] hover:to-[#be951a] text-black font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Initializing Dossier...</span>
                ) : (
                  <>
                    <span>Complete Dossier Setup</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
