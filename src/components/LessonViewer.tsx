import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Eye, 
  Brain, 
  HelpCircle, 
  Sparkles, 
  Award, 
  ChevronRight,
  AlertCircle,
  RotateCcw,
  BookOpen,
  Check,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, UserProfile } from '../types';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onCompleteLesson: (lessonId: string, xpReward: number, moduleId: number) => void;
  profile: UserProfile;
}

export function LessonViewer({ lesson, onBack, onCompleteLesson, profile }: LessonViewerProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Interactive Example state
  const [timerLeft, setTimerLeft] = useState<number>(lesson.interactiveExample.timerSeconds);
  const [imageHidden, setImageHidden] = useState<boolean>(false);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [exampleAnswers, setExampleAnswers] = useState<{ [qIndex: number]: string }>({});
  const [exampleSubmitted, setExampleSubmitted] = useState<boolean>(false);

  // Real Life Practice state
  const [practiceNotes, setPracticeNotes] = useState<{ [key: string]: string }>({});
  const [practiceChecked, setPracticeChecked] = useState<{ [index: number]: boolean }>({});

  // Reflection state
  const [reflectionText, setReflectionText] = useState<string>('');
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(false);

  // Mini Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Lesson Finished
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Timer effect for interactive image memory test
  useEffect(() => {
    let interval: any;
    if (testStarted && !imageHidden && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            setImageHidden(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, imageHidden, timerLeft]);

  const startMemoryTest = () => {
    setTestStarted(true);
    setTimerLeft(lesson.interactiveExample.timerSeconds);
    setImageHidden(false);
  };

  const submitExampleTest = () => {
    setExampleSubmitted(true);
  };

  const toggleChecklist = (idx: number) => {
    setPracticeChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const submitQuiz = () => {
    let score = 0;
    lesson.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const triggerLessonCompletion = () => {
    setIsFinished(true);
    onCompleteLesson(lesson.id, lesson.xpReward, lesson.moduleId);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF7D6', '#AA7C11']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isAlreadyCompleted = profile.completedLessonIds.includes(lesson.id);

  const steps = [
    { num: 1, label: "Introduction" },
    { num: 2, label: "Concept Explanation" },
    { num: 3, label: "Visual Illustration" },
    { num: 4, label: "Interactive Memory Test" },
    { num: 5, label: "Real Life Practice" },
    { num: 6, label: "Reflection" },
    { num: 7, label: "Mini Quiz" },
    { num: 8, label: "XP Reward & Claim" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-[#262626] pb-4">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-mono cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Modules</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            Module {lesson.moduleId}
          </span>
          <span className="text-xs font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
            +{lesson.xpReward} XP
          </span>
        </div>
      </div>

      {/* Lesson Title Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          {lesson.title}
        </h1>
        <p className="text-sm text-zinc-400">
          Step {activeStep} of 8 • Complete all interactive components to claim your observation badge.
        </p>
      </div>

      {/* Horizontal Step Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#262626]">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 cursor-pointer transition-all ${
              activeStep === s.num
                ? 'bg-[#D4AF37] text-black font-bold shadow'
                : 'bg-[#141414] text-zinc-400 hover:text-white border border-[#262626]'
            }`}
          >
            {s.num}. {s.label}
          </button>
        ))}
      </div>

      {/* STEP 1: Introduction */}
      {activeStep === 1 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STEP 1: INTRODUCTION</span>
          </div>

          <p className="text-xl font-serif text-zinc-200 leading-relaxed italic">
            "{lesson.introduction}"
          </p>

          <div className="p-4 rounded-xl bg-[#090909] border border-[#262626] text-xs text-zinc-400 leading-relaxed space-y-2">
            <p className="font-semibold text-white">Lesson Objective:</p>
            <p>
              By the end of this lesson, you will recognize specific non-verbal and environmental cues that most people overlook, and verify them through objective deduction.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Proceed to Concept Explanation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Concept Explanation */}
      {activeStep === 2 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>STEP 2: CONCEPT EXPLANATION</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            {lesson.conceptExplanation.heading}
          </h2>

          <div className="text-zinc-300 text-base leading-relaxed space-y-4">
            <p>{lesson.conceptExplanation.body}</p>
          </div>

          <div className="p-5 rounded-xl bg-amber-950/20 border border-[#D4AF37]/40 text-sm text-[#D4AF37] font-medium space-y-1">
            <p className="font-mono text-xs uppercase tracking-wider text-amber-300">Key Takeaway:</p>
            <p className="font-serif text-base italic text-zinc-200">
              "{lesson.conceptExplanation.keyTakeaway}"
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>View Visual Illustration</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Visual Illustration */}
      {activeStep === 3 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <Eye className="w-3.5 h-3.5" />
            <span>STEP 3: VISUAL ILLUSTRATION</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            {lesson.visualIllustration.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lesson.visualIllustration.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#090909] border border-[#262626] space-y-2 hover:border-[#D4AF37]/40 transition-all"
              >
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  0{idx + 1}.
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  {item.label}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Start Interactive Memory Test</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Interactive Example */}
      {activeStep === 4 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <Brain className="w-3.5 h-3.5" />
            <span>STEP 4: INTERACTIVE EXAMPLE</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            {lesson.interactiveExample.title}
          </h2>

          <p className="text-sm text-zinc-300">
            {lesson.interactiveExample.description}
          </p>

          {!testStarted ? (
            <div className="text-center p-8 rounded-xl bg-[#090909] border border-[#262626] space-y-4">
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Click start to reveal the high-resolution scene for exactly {lesson.interactiveExample.timerSeconds} seconds. The image will hide automatically, after which you will answer specific observational questions.
              </p>
              <button
                onClick={startMemoryTest}
                className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Start {lesson.interactiveExample.timerSeconds}s Observation Phase</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Timer Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                <span className="text-xs font-mono text-zinc-300">Observation Phase</span>
                <span className={`text-sm font-mono font-bold ${imageHidden ? 'text-rose-400' : 'text-[#D4AF37]'}`}>
                  {imageHidden ? "IMAGE HIDDEN - ANSWER QUESTIONS" : `Time Remaining: ${timerLeft}s`}
                </span>
              </div>

              {/* Image Container */}
              {!imageHidden ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl max-h-96">
                  <img
                    src={lesson.interactiveExample.imageUrl}
                    alt="Observation scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                    Focus Mode
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#090909] border border-[#262626] text-center space-y-6">
                  <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Image Hidden! Answer From Memory
                  </h3>

                  <div className="space-y-6 text-left max-w-2xl mx-auto">
                    {lesson.interactiveExample.questions.map((q, qIdx) => (
                      <div key={qIdx} className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-3">
                        <p className="text-sm font-semibold text-white">
                          Q{qIdx + 1}: {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => {
                                if (!exampleSubmitted) {
                                  setExampleAnswers(prev => ({ ...prev, [qIdx]: opt }));
                                }
                              }}
                              className={`p-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                                exampleAnswers[qIdx] === opt
                                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                                  : 'bg-[#090909] border-[#262626] text-zinc-300 hover:border-zinc-500'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {exampleSubmitted && (
                          <div className={`p-3 rounded-lg text-xs font-mono space-y-1 ${
                            exampleAnswers[qIdx] === q.correctAnswer
                              ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                              : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
                          }`}>
                            <p className="font-bold">
                              {exampleAnswers[qIdx] === q.correctAnswer ? "✓ Correct!" : `✗ Expected: ${q.correctAnswer}`}
                            </p>
                            <p className="text-zinc-300">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {!exampleSubmitted ? (
                    <button
                      onClick={submitExampleTest}
                      className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm cursor-pointer"
                    >
                      Submit Memory Test Answers
                    </button>
                  ) : (
                    <button
                      onClick={startMemoryTest}
                      className="px-4 py-2 rounded-xl bg-[#141414] text-zinc-300 border border-[#262626] text-xs font-mono inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Memory Test</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(3)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Proceed to Real Life Practice</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Real Life Practice */}
      {activeStep === 5 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <Eye className="w-3.5 h-3.5" />
            <span>STEP 5: REAL LIFE PRACTICE</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            {lesson.realLifePractice.title}
          </h2>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Location: <strong className="text-white">{lesson.realLifePractice.location}</strong></span>
            <span>•</span>
            <span>Duration: <strong className="text-[#D4AF37]">{lesson.realLifePractice.durationMinutes} mins</strong></span>
          </div>

          <div className="p-5 rounded-xl bg-[#090909] border border-[#262626] space-y-3">
            <h4 className="font-serif text-base font-bold text-white">
              Instructions:
            </h4>
            <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1.5">
              {lesson.realLifePractice.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white">
              Interactive Field Checklist:
            </h4>
            <div className="space-y-2">
              {lesson.realLifePractice.checklist.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleChecklist(idx)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    practiceChecked[idx]
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#141414] border-[#262626] text-zinc-300 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <span className="text-sm font-medium">{item}</span>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                    practiceChecked[idx] ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-600'
                  }`}>
                    {practiceChecked[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(4)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(6)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Go to Reflection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Reflection */}
      {activeStep === 6 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STEP 6: REFLECTION</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            {lesson.reflection.prompt}
          </h2>

          <div className="p-4 rounded-xl bg-[#090909] border border-[#262626] space-y-2 text-xs text-zinc-400">
            <p className="font-semibold text-white">Guiding Questions:</p>
            <ul className="list-disc list-inside space-y-1">
              {lesson.reflection.guidingQuestions.map((g, gi) => (
                <li key={gi}>{g}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-zinc-400">
              Your Personal Observation Notebook:
            </label>
            <textarea
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Record your findings, false assumptions, and verified evidence..."
              className="w-full bg-[#090909] border border-[#262626] rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            onClick={() => setReflectionSaved(true)}
            className="px-4 py-2 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-mono hover:bg-[#D4AF37]/10 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{reflectionSaved ? "Saved To Field Journal ✓" : "Save Journal Notes"}</span>
          </button>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(5)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(7)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Take Mini Quiz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Mini Quiz */}
      {activeStep === 7 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>STEP 7: MINI QUIZ</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white">
            Lesson Knowledge Evaluation
          </h2>

          <div className="space-y-6">
            {lesson.quiz.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-xl bg-[#090909] border border-[#262626] space-y-3">
                <p className="text-sm font-semibold text-white">
                  Q{idx + 1}: {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        if (!quizSubmitted) {
                          setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                        }
                      }}
                      className={`w-full p-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                        quizAnswers[q.id] === optIdx
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-[#141414] border-[#262626] text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <div className={`p-3 rounded-lg text-xs font-mono space-y-1 ${
                    quizAnswers[q.id] === q.correctIndex
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
                  }`}>
                    <p className="font-bold">
                      {quizAnswers[q.id] === q.correctIndex ? "✓ Correct!" : `✗ Correct Answer: ${q.options[q.correctIndex]}`}
                    </p>
                    <p className="text-zinc-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={submitQuiz}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm cursor-pointer"
            >
              Submit Mini Quiz Answers
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/40 text-center space-y-2">
              <p className="font-serif text-lg text-white">
                Quiz Result: <span className="text-[#D4AF37] font-bold">{quizScore} / {lesson.quiz.length}</span>
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveStep(6)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] text-zinc-400 hover:text-white border border-[#262626] text-xs font-mono cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(8)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <span>Claim XP & Finish</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: XP Reward & Completion */}
      {activeStep === 8 && (
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-white">
            Lesson Completed!
          </h2>

          <p className="text-zinc-300 text-sm max-w-md mx-auto">
            You have successfully completed <strong className="text-white">{lesson.title}</strong> and earned your observational badge.
          </p>

          <div className="inline-block px-6 py-3 rounded-2xl bg-[#090909] border border-[#D4AF37]/40">
            <span className="text-2xl font-bold font-serif gold-gradient-text">
              +{lesson.xpReward} XP EARNED
            </span>
          </div>

          {!isFinished ? (
            <div className="pt-4">
              <button
                onClick={triggerLessonCompletion}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-bold text-base shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
              >
                Claim XP & Mark Lesson Completed
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <p className="text-xs font-mono text-emerald-400">
                ✓ XP Added to Profile • Progress Saved
              </p>
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-[#141414] text-white border border-[#262626] hover:border-[#D4AF37] text-sm font-semibold cursor-pointer"
              >
                Return to Course List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
