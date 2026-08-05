import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingHero } from './components/LandingHero';
import { CourseList } from './components/CourseList';
import { LessonViewer } from './components/LessonViewer';
import { PracticeMode } from './components/PracticeMode';
import { DetectiveLab } from './components/DetectiveLab';
import { AIMentor } from './components/AIMentor';
import { DailyChallenge } from './components/DailyChallenge';
import { UserProfileView } from './components/UserProfile';
import { CertificateView } from './components/CertificateView';
import { FinalExamView } from './components/FinalExamView';
import { SettingsView } from './components/SettingsView';
import { CinematicIntro } from './components/CinematicIntro';

import { NavigationTab, Lesson } from './types';
import { useUserStore } from './lib/useUserStore';
import { COURSE_MODULES } from './data/modulesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: number; lesson: Lesson } | null>(null);

  const {
    profile,
    addXp,
    completeLesson,
    completeModule,
    solveCase,
    submitDailyChallenge,
    updateName,
    toggleAlwaysPlayIntro,
    resetProgress
  } = useUserStore();

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const alwaysPlay = profile?.playIntroOnEveryVisit || localStorage.getItem('THE_JANE_METHOD_ALWAYS_PLAY_INTRO') === 'true';
      if (alwaysPlay) return true;
      const played = localStorage.getItem('THE_JANE_METHOD_INTRO_PLAYED') === 'true';
      return !played;
    } catch {
      return true;
    }
  });

  const handleSelectModule = (moduleId: number) => {
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      const firstUncompleted = mod.lessons.find(l => !profile.completedLessonIds.includes(l.id)) || mod.lessons[0];
      setSelectedLesson({ moduleId, lesson: firstUncompleted });
    }
  };

  const handleSelectLesson = (moduleId: number, lessonId: string) => {
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (mod) {
      const lesson = mod.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setSelectedLesson({ moduleId, lesson });
      }
    }
  };

  const handleCompleteLessonAndCheckModule = (lessonId: string, xpReward: number, moduleId: number) => {
    completeLesson(lessonId, xpReward, moduleId);
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (mod) {
      const allLessonsDone = mod.lessons.every(
        l => l.id === lessonId || profile.completedLessonIds.includes(l.id)
      );
      if (allLessonsDone && !profile.completedModuleIds.includes(moduleId)) {
        completeModule(moduleId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative font-sans">
      {/* Full Screen Cinematic Intro Overlay */}
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Dynamic Canvas Particle Overlay */}
      <ParticleBackground />

      {/* Main Top Navigation on all pages */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'course') {
            setSelectedLesson(null);
          }
        }}
        profile={profile}
      />

      {/* Main Container Content with Cinematic AnimatePresence Scene Changes */}
      <main className="min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          {selectedLesson ? (
            <motion.div
              key={`lesson-${selectedLesson.lesson.id}`}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <LessonViewer
                lesson={selectedLesson.lesson}
                onBack={() => setSelectedLesson(null)}
                onCompleteLesson={handleCompleteLessonAndCheckModule}
                profile={profile}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'home' && (
                <LandingHero
                  onSelectTab={setActiveTab}
                  onSelectModule={handleSelectModule}
                  profile={profile}
                />
              )}

              {activeTab === 'course' && (
                <CourseList
                  onSelectModule={handleSelectModule}
                  onSelectLesson={handleSelectLesson}
                  profile={profile}
                />
              )}

              {activeTab === 'practice' && (
                <PracticeMode
                  onAddXp={addXp}
                />
              )}

              {activeTab === 'detective-lab' && (
                <DetectiveLab
                  onSolveCase={solveCase}
                  solvedCaseIds={profile.solvedCaseIds}
                />
              )}

              {activeTab === 'daily-challenge' && (
                <DailyChallenge
                  onSubmitChallenge={submitDailyChallenge}
                  profile={profile}
                />
              )}

              {activeTab === 'mentor' && (
                <AIMentor />
              )}

              {activeTab === 'profile' && (
                <UserProfileView
                  profile={profile}
                  onUpdateName={updateName}
                  onOpenCertificate={() => setActiveTab('certificate')}
                  onToggleAlwaysPlayIntro={toggleAlwaysPlayIntro}
                />
              )}

              {activeTab === 'certificate' && (
                <CertificateView
                  profile={profile}
                  onBack={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'final-exam' && (
                <FinalExamView
                  profile={profile}
                  onPassExam={(xp) => addXp(xp, "Passed Master Observer Examination")}
                  onBack={() => setActiveTab('home')}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  onResetProgress={resetProgress}
                  playIntroOnEveryVisit={profile.playIntroOnEveryVisit}
                  onToggleAlwaysPlayIntro={toggleAlwaysPlayIntro}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
