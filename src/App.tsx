import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
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
import { AuthModal } from './components/AuthModal';
import { ProfileSetupWizard } from './components/ProfileSetupWizard';

import { NavigationTab, Lesson } from './types';
import { useUserStore } from './lib/useUserStore';
import { COURSE_MODULES } from './data/modulesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: number; lesson: Lesson } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const {
    profile,
    authUser,
    needsProfileSetup,
    handleProfileSetupComplete,
    signOutUser,
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

  // Protected Routes enforcement: Redirect to Auth Modal if unauthenticated
  const handleSelectTab = (tab: NavigationTab) => {
    if (!authUser && tab !== 'home') {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tab);
    if (tab !== 'course') {
      setSelectedLesson(null);
    }
  };

  const handleSelectModule = (moduleId: number) => {
    if (!authUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      const firstUncompleted = mod.lessons.find(l => !profile.completedLessonIds.includes(l.id)) || mod.lessons[0];
      setSelectedLesson({ moduleId, lesson: firstUncompleted });
    }
  };

  const handleSelectLesson = (moduleId: number, lessonId: string) => {
    if (!authUser) {
      setIsAuthModalOpen(true);
      return;
    }
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

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        profile={profile}
        authUser={authUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={signOutUser}
      />

      {/* Auth Modal for Sign In / Sign Up / Forgot Password */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />

      {/* First Login Profile Setup Wizard */}
      {authUser && (
        <ProfileSetupWizard
          isOpen={needsProfileSetup}
          uid={authUser.uid}
          defaultEmail={authUser.email || ''}
          defaultName={authUser.displayName || ''}
          defaultPhotoURL={authUser.photoURL || ''}
          onComplete={handleProfileSetupComplete}
        />
      )}

      {/* Main Container Content */}
      <main className="min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          {selectedLesson && authUser ? (
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
                  onSelectTab={handleSelectTab}
                  onSelectModule={handleSelectModule}
                  profile={profile}
                />
              )}

              {activeTab === 'course' && authUser && (
                <CourseList
                  onSelectModule={handleSelectModule}
                  onSelectLesson={handleSelectLesson}
                  profile={profile}
                />
              )}

              {activeTab === 'practice' && authUser && (
                <PracticeMode
                  onAddXp={addXp}
                />
              )}

              {activeTab === 'detective-lab' && authUser && (
                <DetectiveLab
                  onSolveCase={solveCase}
                  solvedCaseIds={profile.solvedCaseIds}
                />
              )}

              {activeTab === 'daily-challenge' && authUser && (
                <DailyChallenge
                  onSubmitChallenge={submitDailyChallenge}
                  profile={profile}
                />
              )}

              {activeTab === 'mentor' && authUser && (
                <AIMentor />
              )}

              {activeTab === 'profile' && authUser && (
                <UserProfileView
                  profile={profile}
                  authUser={authUser}
                  onSignInGoogle={async () => {}}
                  onSignOutGoogle={signOutUser}
                  onUpdateName={updateName}
                  onOpenCertificate={() => setActiveTab('certificate')}
                  onToggleAlwaysPlayIntro={toggleAlwaysPlayIntro}
                />
              )}

              {activeTab === 'certificate' && authUser && (
                <CertificateView
                  profile={profile}
                  onBack={() => setActiveTab('profile')}
                />
              )}

              {activeTab === 'final-exam' && authUser && (
                <FinalExamView
                  profile={profile}
                  onPassExam={(xp) => addXp(xp, "Passed Master Observer Examination")}
                  onBack={() => setActiveTab('home')}
                />
              )}

              {activeTab === 'settings' && authUser && (
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
