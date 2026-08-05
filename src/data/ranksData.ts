import { RankTitle } from '../types';

export interface RankInfo {
  title: RankTitle;
  minXp: number;
  maxXp: number;
  badgeSymbol: string;
  badgeColor: string;
  description: string;
  privileges: string[];
}

export const RANKS: RankInfo[] = [
  {
    title: 'Observer',
    minXp: 0,
    maxXp: 499,
    badgeSymbol: '👁️',
    badgeColor: 'from-amber-700 to-yellow-600',
    description: 'Beginning to notice sensory details that 90% of people overlook.',
    privileges: ['Access to Foundations', 'Daily Challenge Unlocked', 'Basic Detective Lab Cases']
  },
  {
    title: 'Investigator',
    minXp: 500,
    maxXp: 1499,
    badgeSymbol: '🔍',
    badgeColor: 'from-amber-600 to-amber-400',
    description: 'Skillfully connects observed cues to immediate logical probabilities.',
    privileges: ['Behavioral Micro-Expression Analysis', 'Practice Mode Hard Tier', 'Advanced AI Mentor Prompts']
  },
  {
    title: 'Analyst',
    minXp: 1500,
    maxXp: 2999,
    badgeSymbol: '⚡',
    badgeColor: 'from-yellow-500 to-amber-300',
    description: 'Systematically filters noise from signal in complex high-density environments.',
    privileges: ['Loci Memory Palace Architect', 'Complex Mystery Cases', 'Custom Practice Drills']
  },
  {
    title: 'Profiler',
    minXp: 3000,
    maxXp: 4999,
    badgeSymbol: '♟️',
    badgeColor: 'from-yellow-400 to-amber-200',
    description: 'Accurately predicts human action and spots behavioral incongruencies.',
    privileges: ['Ethical Influence Modules', 'Cold Reading Simulations', 'Profiler Masterclass Badge']
  },
  {
    title: 'Mentalist',
    minXp: 5000,
    maxXp: 7999,
    badgeSymbol: '🔮',
    badgeColor: 'from-amber-300 via-yellow-200 to-amber-400',
    description: 'Demonstrates near-instantaneous situational assessment and psychological synthesis.',
    privileges: ['Final Examination Unlocked', 'Live Simulated Interrogations', 'Gold Foil Certificate Access']
  },
  {
    title: 'Master Observer',
    minXp: 8000,
    maxXp: 99999,
    badgeSymbol: '👑',
    badgeColor: 'from-yellow-200 via-amber-400 to-yellow-500',
    description: 'The pinnacle of hyper-observation, pristine logic, and ethical psychological acuity.',
    privileges: ['Full Platform Mastery', 'Master Certificate Verification', 'Elite Mentor Circle']
  }
];

export function getRankFromXp(xp: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}
