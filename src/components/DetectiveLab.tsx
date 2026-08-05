import { useState } from 'react';
import { 
  Search, 
  FileText, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Award, 
  ShieldAlert,
  ChevronRight,
  FolderOpen,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { DetectiveCase, Suspect, CaseClue } from '../types';
import { DETECTIVE_CASES } from '../data/casesData';

interface DetectiveLabProps {
  onSolveCase: (caseId: string, xpReward: number) => void;
  solvedCaseIds: string[];
}

export function DetectiveLab({ onSolveCase, solvedCaseIds }: DetectiveLabProps) {
  const [activeCase, setActiveCase] = useState<DetectiveCase | null>(null);
  const [activeTab, setActiveTab] = useState<'briefing' | 'evidence' | 'suspects' | 'timeline' | 'deduction'>('briefing');
  
  // Deduction board state
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);
  const [selectedClueIds, setSelectedClueIds] = useState<string[]>([]);
  const [caseSubmitted, setCaseSubmitted] = useState<boolean>(false);
  const [isCaseCorrect, setIsCaseCorrect] = useState<boolean>(false);

  const startCase = (c: DetectiveCase) => {
    setActiveCase(c);
    setActiveTab('briefing');
    setSelectedSuspectId(null);
    setSelectedClueIds([]);
    setCaseSubmitted(false);
    setIsCaseCorrect(false);
  };

  const toggleClueSelection = (clueId: string) => {
    if (selectedClueIds.includes(clueId)) {
      setSelectedClueIds(selectedClueIds.filter(id => id !== clueId));
    } else {
      setSelectedClueIds([...selectedClueIds, clueId]);
    }
  };

  const submitDeductionVerdict = () => {
    if (!activeCase || !selectedSuspectId) return;
    setCaseSubmitted(true);
    const correct = selectedSuspectId === activeCase.correctCulpritId;
    setIsCaseCorrect(correct);

    if (correct) {
      onSolveCase(activeCase.id, activeCase.xpReward);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] mb-3">
            <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>CRITICAL CASE DEDUCTION LAB</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-white mb-2">
            Detective <span className="gold-gradient-text">Lab</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Analyze physical evidence, audit witness statements, construct timeline loci, and deliver airtight verdicts.
          </p>
        </div>

        {activeCase && (
          <button
            onClick={() => setActiveCase(null)}
            className="px-4 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-zinc-300 hover:text-white cursor-pointer"
          >
            ← Exit Case Files
          </button>
        )}
      </div>

      {/* Case Viewer or Case Selection List */}
      {activeCase ? (
        <div className="space-y-6">
          {/* Active Case Header Banner */}
          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                  {activeCase.difficulty}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Est. {activeCase.estimatedMinutes} mins
                </span>
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  +{activeCase.xpReward} XP
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">
                {activeCase.title}
              </h2>
            </div>

            {/* Inner Nav Tabs */}
            <div className="flex items-center gap-1.5 bg-[#090909] p-1.5 rounded-xl border border-[#262626] overflow-x-auto w-full md:w-auto">
              {[
                { id: 'briefing', label: 'Briefing', icon: FileText },
                { id: 'evidence', label: `Clues (${activeCase.clues.length})`, icon: FolderOpen },
                { id: 'suspects', label: `Suspects (${activeCase.suspects.length})`, icon: Users },
                { id: 'timeline', label: 'Timeline', icon: Clock },
                { id: 'deduction', label: 'Deduction Board', icon: ShieldAlert },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#D4AF37] text-black font-bold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: BRIEFING */}
          {activeTab === 'briefing' && (
            <div className="glass-panel p-8 rounded-2xl border border-[#262626] space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 max-h-96">
                <img
                  src={activeCase.sceneImage}
                  alt="Crime scene"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Case Overview
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeCase.summary}
                </p>
                <div className="p-5 rounded-xl bg-[#090909] border border-[#262626] space-y-2 text-xs text-zinc-400 leading-relaxed">
                  <p className="font-bold text-white">Background Intelligence:</p>
                  <p>{activeCase.backgroundStory}</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setActiveTab('evidence')}
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Examine Clues</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCE GALLERY */}
          {activeTab === 'evidence' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCase.clues.map((clue) => {
                const isSelected = selectedClueIds.includes(clue.id);
                return (
                  <div
                    key={clue.id}
                    onClick={() => toggleClueSelection(clue.id)}
                    className={`glass-panel p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#262626] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                        {clue.category} Clue
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {clue.locationFound}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white">
                      {clue.title}
                    </h4>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {clue.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span>{isSelected ? "✓ Attached to Deduction Board" : "+ Click to Attach to Board"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: SUSPECTS */}
          {activeTab === 'suspects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCase.suspects.map((susp) => (
                <div key={susp.id} className="glass-panel p-6 rounded-2xl border border-[#262626] space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={susp.avatarUrl}
                      alt={susp.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#D4AF37]/30"
                    />
                    <div>
                      <h4 className="font-serif text-xl font-bold text-white">
                        {susp.name}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-mono">{susp.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300">
                    <p><strong className="text-white">Motive:</strong> {susp.motive}</p>
                    <p><strong className="text-white">Stated Alibi:</strong> {susp.alibi}</p>
                    <p><strong className="text-white">Behavioral Notes:</strong> {susp.behaviorNotes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="glass-panel p-8 rounded-2xl border border-[#262626] space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Verified Event Timeline
              </h3>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D4AF37]/30">
                {activeCase.timeline.map((evt, idx) => (
                  <div key={idx} className="relative pl-8 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-black" />
                    <span className="text-xs font-mono text-[#D4AF37] font-bold">
                      {evt.time}
                    </span>
                    <p className="text-sm text-zinc-200">
                      {evt.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DEDUCTION BOARD */}
          {activeTab === 'deduction' && (
            <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/40 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Deduction Board & Final Verdict
              </h3>
              <p className="text-xs text-zinc-400">
                Select your prime culprit based on verified evidence and attached clues.
              </p>

              {/* Suspect Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400">
                  Select Primary Prime Suspect:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCase.suspects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSuspectId(s.id)}
                      className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        selectedSuspectId === s.id
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-semibold'
                          : 'bg-[#090909] border-[#262626] text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      <img src={s.avatarUrl} alt={s.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm">{s.name}</p>
                        <p className="text-xs text-zinc-500 font-mono">{s.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {!caseSubmitted ? (
                <button
                  disabled={!selectedSuspectId}
                  onClick={submitDeductionVerdict}
                  className={`w-full py-4 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                    selectedSuspectId
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black shadow-xl'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Submit Formal Deduction Verdict
                </button>
              ) : (
                <div className={`p-6 rounded-2xl border text-left space-y-3 ${
                  isCaseCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500 text-rose-200'
                }`}>
                  <h4 className="font-serif text-xl font-bold">
                    {isCaseCorrect ? "✓ VERDICT ACCURATE: CASE SOLVED!" : "✗ VERDICT FLAWED: WRONG CULPRIT"}
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    {activeCase.deductionExplanation}
                  </p>
                  {isCaseCorrect && (
                    <p className="text-xs font-mono font-bold text-[#D4AF37]">
                      +{activeCase.xpReward} XP ADDED TO PROFILE
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Cases Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DETECTIVE_CASES.map((c) => {
            const isSolved = solvedCaseIds.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => startCase(c)}
                className={`glass-panel glass-panel-hover p-6 rounded-2xl border transition-all cursor-pointer space-y-4 group flex flex-col justify-between ${
                  isSolved ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-[#D4AF37]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                      {c.difficulty}
                    </span>
                    {isSolved && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Solved
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {c.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#D4AF37] font-semibold">+{c.xpReward} XP</span>
                  <span className="text-zinc-300 group-hover:text-white flex items-center gap-1">
                    Open Case File <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
