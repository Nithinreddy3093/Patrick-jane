import { useState, useEffect } from 'react';
import { UserProfile, CertificateData } from '../types';
import { getRankFromXp } from '../data/ranksData';

const INITIAL_PROFILE: UserProfile = {
  name: "Julian Vance",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  xp: 350,
  rank: "Observer",
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ["m0-l1"],
  completedModuleIds: [],
  practiceTimeMinutes: 45,
  solvedCaseIds: [],
  certificates: [],
  dailyChallengeHistory: [
    {
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      title: "Footwear & Wrist Audit",
      userNotes: "Noticed 3 people with polished leather shoes showing outer heel wear.",
      xpEarned: 100
    }
  ],
  skills: {
    observation: 45,
    memory: 40,
    logic: 50,
    behavioralAnalysis: 35,
    situationalAwareness: 60
  },
  playIntroOnEveryVisit: false
};

const STORAGE_KEY = "THE_JANE_METHOD_USER_PROFILE_V1";

export function useUserStore() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.rank = getRankFromXp(parsed.xp).title;
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse user profile from localStorage", e);
    }
    return INITIAL_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save user profile to localStorage", e);
    }
  }, [profile]);

  const addXp = (amount: number, reason?: string) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      const newRank = getRankFromXp(newXp).title;
      return {
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
    });
  };

  const completeLesson = (lessonId: string, xpReward: number, moduleId: number) => {
    setProfile(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const updatedLessons = [...prev.completedLessonIds, lessonId];
      const newXp = prev.xp + xpReward;
      const newRank = getRankFromXp(newXp).title;
      return {
        ...prev,
        completedLessonIds: updatedLessons,
        xp: newXp,
        rank: newRank,
        practiceTimeMinutes: prev.practiceTimeMinutes + 15
      };
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
      return {
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
      return {
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
    });
  };

  const updateName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
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
