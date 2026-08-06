export type NavigationTab = 
  | 'home' 
  | 'course' 
  | 'practice' 
  | 'detective-lab' 
  | 'daily-challenge' 
  | 'mentor' 
  | 'profile' 
  | 'final-exam'
  | 'settings';

export type RankTitle = 
  | 'Observer' 
  | 'Investigator' 
  | 'Analyst' 
  | 'Profiler' 
  | 'Mentalist' 
  | 'Master Observer';

export interface UserProfile {
  name: string;
  email?: string;
  googleUid?: string;
  avatarUrl?: string;
  xp: number;
  rank: RankTitle;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  completedModuleIds: number[];
  practiceTimeMinutes: number;
  solvedCaseIds: string[];
  certificates: CertificateData[];
  dailyChallengeHistory: {
    date: string;
    title: string;
    userNotes: string;
    xpEarned: number;
  }[];
  skills: {
    observation: number; // 0-100
    memory: number; // 0-100
    logic: number; // 0-100
    behavioralAnalysis: number; // 0-100
    situationalAwareness: number; // 0-100
  };
  playIntroOnEveryVisit?: boolean;
}

export interface CertificateData {
  id: string;
  userName: string;
  rankTitle: string;
  completionDate: string;
  scorePercent: number;
  verificationCode: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveExample {
  title: string;
  imageUrl: string;
  timerSeconds: number;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface RealLifePractice {
  title: string;
  location: string;
  durationMinutes: number;
  instructions: string[];
  checklist: string[];
}

export interface Lesson {
  id: string;
  moduleId: number;
  title: string;
  durationMinutes: number;
  xpReward: number;
  introduction: string;
  conceptExplanation: {
    heading: string;
    body: string;
    keyTakeaway: string;
  };
  visualIllustration: {
    title: string;
    type: 'infographic' | 'timeline' | 'comparison' | 'cards';
    items: { label: string; detail: string; iconName?: string }[];
  };
  interactiveExample: InteractiveExample;
  realLifePractice: RealLifePractice;
  reflection: {
    prompt: string;
    guidingQuestions: string[];
  };
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: number; // 0 to 10
  title: string;
  subtitle: string;
  description: string;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  iconName: string;
  xpValue: number;
  lessons: Lesson[];
}

export type PracticeType = 
  | 'observation'
  | 'memory'
  | 'deduction'
  | 'spot-difference'
  | 'hidden-object'
  | 'sequence-memory'
  | 'pattern-completion'
  | 'behavior-analysis';

export interface PracticeChallenge {
  id: string;
  type: PracticeType;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  xpReward: number;
  data: any; // specific per exercise type
}

export interface CaseClue {
  id: string;
  title: string;
  category: 'Physical' | 'Document' | 'Witness' | 'Digital' | 'Timeline';
  description: string;
  imageUrl?: string;
  locationFound: string;
  associatedSuspects?: string[];
  isKeyClue: boolean;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  motive: string;
  alibi: string;
  behaviorNotes: string;
  avatarUrl: string;
}

export interface DetectiveCase {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  difficulty: 'Novice' | 'Detective' | 'Chief Investigator' | 'Master Profiler';
  estimatedMinutes: number;
  xpReward: number;
  backgroundStory: string;
  sceneImage: string;
  suspects: Suspect[];
  clues: CaseClue[];
  timeline: { time: string; event: string; verified: boolean }[];
  correctCulpritId: string;
  deductionExplanation: string;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  timestamp: string;
}
