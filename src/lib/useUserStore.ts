import { useState, useEffect } from 'react';
import { UserProfile, CertificateData } from '../types';
import { getRankFromXp } from '../data/ranksData';
import { 
  subscribeToAuthChanges, 
  signOutUser, 
  getUserProfile, 
  updateUserProfileDoc 
} from './firebase';
import { User as FirebaseUser } from 'firebase/auth';

const INITIAL_PROFILE: UserProfile = {
  name: "Observer",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  xp: 0,
  rank: "Observer",
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  completedModuleIds: [],
  practiceTimeMinutes: 0,
  solvedCaseIds: [],
  certificates: [],
  dailyChallengeHistory: [],
  skills: {
    observation: 30,
    memory: 30,
    logic: 30,
    behavioralAnalysis: 30,
    situationalAwareness: 30
  },
  playIntroOnEveryVisit: false
};

const STORAGE_KEY = "THE_JANE_METHOD_USER_PROFILE_V1";

export function useUserStore() {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [needsProfileSetup, setNeedsProfileSetup] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.rank = getRankFromXp(parsed.xp || 0).title;
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse user profile from localStorage", e);
    }
    return INITIAL_PROFILE;
  });

  // Subscribe to Firebase Auth changes & sync Firestore profile
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setAuthUser(user);
      setIsAuthLoading(false);

      if (user) {
        // Fetch document from Firestore
        const userDoc = await getUserProfile(user.uid);
        if (!userDoc) {
          // First time user! Trigger Profile Setup Wizard
          setNeedsProfileSetup(true);
        } else {
          setNeedsProfileSetup(false);
          setProfile(prev => ({
            ...prev,
            googleUid: user.uid,
            email: user.email || userDoc.email || '',
            name: userDoc.name || user.displayName || 'Observer',
            avatarUrl: userDoc.photoURL || user.photoURL || prev.avatarUrl,
            xp: userDoc.xp ?? prev.xp,
            rank: getRankFromXp(userDoc.xp ?? prev.xp).title,
            streakDays: userDoc.streak ?? prev.streakDays,
            completedLessonIds: userDoc.completedLessons || prev.completedLessonIds
          }));
        }
      } else {
        setNeedsProfileSetup(false);
        setProfile(prev => {
          const { googleUid, email, ...rest } = prev;
          return rest as UserProfile;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save user profile to localStorage", e);
    }
  }, [profile]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setAuthUser(null);
      setNeedsProfileSetup(false);
      setProfile(INITIAL_PROFILE);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Sign out failed:', err);
      throw err;
    }
  };

  const handleProfileSetupComplete = (docData: any) => {
    setNeedsProfileSetup(false);
    if (docData) {
      setProfile(prev => ({
        ...prev,
        googleUid: docData.uid,
        email: docData.email || '',
        name: docData.name || 'Observer',
        avatarUrl: docData.photoURL || prev.avatarUrl,
        xp: docData.xp ?? 0,
        rank: getRankFromXp(docData.xp ?? 0).title,
        streakDays: docData.streak ?? 1
      }));
    }
  };

  const addXp = (amount: number, reason?: string) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      const newRank = getRankFromXp(newXp).title;
      const updated = {
        ...prev,
        xp: newXp,
        rank: newRank,
        skills: {
          ...prev.skills,
          observation: Math.min(100, prev.skills.observation + 2),
          memory: Math.min(100, prev.skills.memory + 2),
          logic: Math.min(100, prev.skills.logic + 2)
        }
      };

      if (authUser?.uid) {
        updateUserProfileDoc(authUser.uid, { xp: newXp }).catch(console.error);
      }
      return updated;
    });
  };

  const completeLesson = (lessonId: string, xpReward: number, moduleId: number) => {
    setProfile(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const updatedLessons = [...prev.completedLessonIds, lessonId];
      const newXp = prev.xp + xpReward;
      const newRank = getRankFromXp(newXp).title;
      const updated = {
        ...prev,
        completedLessonIds: updatedLessons,
        xp: newXp,
        rank: newRank,
        practiceTimeMinutes: prev.practiceTimeMinutes + 15
      };

      if (authUser?.uid) {
        updateUserProfileDoc(authUser.uid, { 
          xp: newXp, 
          completedLessons: updatedLessons 
        }).catch(console.error);
      }
      return updated;
    });
  };

  const completeModule = (moduleId: number) => {
    setProfile(prev => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModuleIds: [...prev.completedModuleIds, moduleId]
      };
    });
  };

  const solveCase = (caseId: string, xpReward: number) => {
    setProfile(prev => {
      if (prev.solvedCaseIds.includes(caseId)) return prev;
      const newXp = prev.xp + xpReward;
      const updated = {
        ...prev,
        solvedCaseIds: [...prev.solvedCaseIds, caseId],
        xp: newXp,
        rank: getRankFromXp(newXp).title,
        skills: {
          ...prev.skills,
          logic: Math.min(100, prev.skills.logic + 10),
          behavioralAnalysis: Math.min(100, prev.skills.behavioralAnalysis + 10)
        }
      };

      if (authUser?.uid) {
        updateUserProfileDoc(authUser.uid, { xp: newXp }).catch(console.error);
      }
      return updated;
    });
  };

  const addCertificate = (cert: CertificateData) => {
    setProfile(prev => ({
      ...prev,
      certificates: [...prev.certificates, cert]
    }));
  };

  const submitDailyChallenge = (title: string, userNotes: string, xpEarned: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setProfile(prev => {
      const alreadyDone = prev.dailyChallengeHistory.some(h => h.date === todayStr);
      if (alreadyDone) return prev;
      const newXp = prev.xp + xpEarned;
      const updated = {
        ...prev,
        xp: newXp,
        rank: getRankFromXp(newXp).title,
        streakDays: prev.streakDays + 1,
        lastActiveDate: todayStr,
        dailyChallengeHistory: [
          { date: todayStr, title, userNotes, xpEarned },
          ...prev.dailyChallengeHistory
        ]
      };

      if (authUser?.uid) {
        updateUserProfileDoc(authUser.uid, { 
          xp: newXp, 
          streak: prev.streakDays + 1 
        }).catch(console.error);
      }
      return updated;
    });
  };

  const updateName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
    if (authUser?.uid) {
      updateUserProfileDoc(authUser.uid, { name }).catch(console.error);
    }
  };

  const toggleAlwaysPlayIntro = (value: boolean) => {
    setProfile(prev => ({ ...prev, playIntroOnEveryVisit: value }));
    try {
      localStorage.setItem('THE_JANE_METHOD_ALWAYS_PLAY_INTRO', value ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const resetProgress = () => {
    setProfile(INITIAL_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    profile,
    authUser,
    isAuthLoading,
    needsProfileSetup,
    handleProfileSetupComplete,
    signOutUser: handleSignOut,
    addXp,
    completeLesson,
    completeModule,
    solveCase,
    addCertificate,
    submitDailyChallenge,
    updateName,
    toggleAlwaysPlayIntro,
    resetProgress
  };
}
