import { useState } from 'react';
import { 
  Award, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';

interface FinalExamViewProps {
  profile: UserProfile;
  onPassExam: (xpReward: number) => void;
  onBack: () => void;
}

export function FinalExamView({ profile, onPassExam, onBack }: FinalExamViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const examQuestions = [
    {
      q: "You enter a coffee shop and observe a customer's hands: clean unblemished fingers, but dark calluses on the inside of the left thumb and index finger. What is the most probable physical explanation?",
      options: [
        "The customer is a professional classical string musician (guitar/violin/cello)",
        "The customer works in food service or barista operations",
        "The customer uses a fountain pen with heavy pressure",
        "The customer plays competitive tennis right-handed"
      ],
      correctIndex: 0,
      explanation: "Repetitive friction from pressing left-hand fingers against metal strings produces calluses specifically on the fingertips/edges of the non-dominant fret hand."
    },
    {
      q: "During an interrogation, a subject's lips tighten into a narrow horizontal line while listening to a question about a specific timeline hour. What does this micro-expression indicate?",
      options: [
        "A sudden state of relaxation and mental relief",
        "Lip compression indicating anger, disagreement, or suppression of negative emotion",
        "A sign of extreme fatigue or physical dehydration",
        "An indicator that the subject is about to laugh"
      ],
      correctIndex: 1,
      explanation: "Lip compression is a universal non-verbal distress signal reflecting emotional disagreement, anger, or conscious restraint of information."
    },
    {
      q: "When employing the Method of Loci (Memory Palace), why is it critical that images placed at loci are exaggerated, bizarre, or emotionally charged?",
      options: [
        "Because normal mundane images are rapidly discarded by the hippocampus during short-term memory consolidation",
        "Because weird images consume less mental storage space",
        "Because standard images require continuous repetition every 30 seconds",
        "Because emotional imagery bypasses logical reasoning entirely"
      ],
      correctIndex: 0,
      explanation: "The human brain prioritizes novel, vivid, and emotionally salient visual stimuli for long-term encoding while filtering out routine environmental noise."
    },
    {
      q: "In first-principles deduction, what is the key difference between an Observation and an Assumption?",
      options: [
        "An observation is an unverified theory; an assumption is a physical law",
        "An observation is a directly verifiable physical fact; an assumption is an unproven interpretation projected onto that fact",
        "Observations only apply to human behavior, while assumptions apply to inanimate evidence",
        "There is no functional difference in forensic deduction"
      ],
      correctIndex: 1,
      explanation: "Observations are objective physical realities (e.g., 'mud on right boot'). Assumptions are interpretations (e.g., 'he walked in the garden')."
    },
    {
      q: "What is 'Inattentional Blindness'?",
      options: [
        "A rare medical condition affecting ocular nerves",
        "The psychological failure to perceive an unexpected stimulus in plain sight when focus is directed elsewhere",
        "The inability to remember names of people met in crowded environments",
        "A visual distortion caused by bright artificial light"
      ],
      correctIndex: 1,
      explanation: "Inattentional blindness occurs when high cognitive focus on one element renders the brain blind to obvious surrounding details."
    }
  ];

  const handleSelect = (optionIndex: number) => {
    if (!isExamSubmitted) {
      setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    }
  };

  const submitExam = () => {
    let s = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        s += 1;
      }
    });
    setScore(s);
    setIsExamSubmitted(true);

    if (s >= 4) {
      onPassExam(500);
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#FFF7D6', '#AA7C11']
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const currentQ = examQuestions[currentQuestionIndex];
  const passed = score >= 4;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#262626] pb-4">
        <button
          onClick={onBack}
          className="px-3.5 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Exam</span>
        </button>

        <span className="text-xs font-mono text-[#D4AF37] font-bold">
          Passing Requirement: 80% (4/5 Correct)
        </span>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
          <Award className="w-3.5 h-3.5" />
          <span>FINAL COMPREHENSIVE EXAMINATION</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white">
          Master Observer Certification Exam
        </h1>
        <p className="text-sm text-zinc-400">
          Demonstrate mastery across all 11 core modules to earn +500 XP and unlock your official diploma.
        </p>
      </div>

      {!isExamSubmitted ? (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/40 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#262626] pb-4">
            <span>Question {currentQuestionIndex + 1} of {examQuestions.length}</span>
            <span className="text-[#D4AF37]">Progress: {Object.keys(selectedAnswers).length}/{examQuestions.length} Answered</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-white leading-relaxed">
            {currentQ.q}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                className={`w-full p-4 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  selectedAnswers[currentQuestionIndex] === optIdx
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-semibold'
                    : 'bg-[#090909] border-[#262626] text-zinc-300 hover:border-zinc-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-zinc-400 hover:text-white disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            {currentQuestionIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs font-mono cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                disabled={Object.keys(selectedAnswers).length < examQuestions.length}
                onClick={submitExam}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-bold text-xs font-mono shadow-xl cursor-pointer disabled:opacity-50"
              >
                Submit Examination
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37] text-center space-y-6">
          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto ${
            passed ? 'bg-emerald-950/40 border-emerald-400 text-emerald-400' : 'bg-rose-950/40 border-rose-400 text-rose-400'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-white">
            {passed ? "Examination Passed!" : "Certification Unsuccessful"}
          </h2>

          <p className="text-zinc-300 text-sm">
            Your Score: <strong className="text-[#D4AF37] font-bold">{score} / {examQuestions.length}</strong> ({Math.round((score/examQuestions.length)*100)}%)
          </p>

          {passed ? (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-1">
              <p className="font-bold">✓ Master Observer Criteria Met</p>
              <p>+500 XP added to profile. Official diploma unlocked.</p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 text-rose-300 text-xs font-mono space-y-1">
              <p className="font-bold">✗ Score Below 80% Threshold</p>
              <p>Review the course modules and retake the examination when ready.</p>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setIsExamSubmitted(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
              }}
              className="px-6 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-xs font-mono flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Examination</span>
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs font-mono cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
