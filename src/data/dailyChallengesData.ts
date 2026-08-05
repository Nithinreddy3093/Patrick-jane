export interface DailyChallengeItem {
  id: string;
  dayIndex: number;
  title: string;
  category: 'Human Behavior' | 'Environmental Pattern' | 'Spatial Mapping' | 'Verbal Elicitation';
  objective: string;
  examples: string[];
  xpReward: number;
  reflectionPrompt: string;
}

export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: "dc-1",
    dayIndex: 1,
    title: "Non-Verbal Footwear & Wrist Audit",
    category: "Human Behavior",
    objective: "Observe five people in a public venue today. Notice repeated non-verbal behaviors, footwear condition, and wrist accessories.",
    examples: [
      "Find 1 person with heel-wear incongruence relative to their outfit.",
      "Identify 1 person who twists or checks their watch when a specific announcement occurs.",
      "Guess 3 occupations based on footwear, hands, and stance before verifying."
    ],
    xpReward: 100,
    reflectionPrompt: "What physical clue made you most confident in your occupational guess?"
  },
  {
    id: "dc-2",
    dayIndex: 2,
    title: "Supermarket & Transit Flow Anomaly Scan",
    category: "Environmental Pattern",
    objective: "Visit a busy grocery store or transit hub and map 3 spatial anomalies.",
    examples: [
      "Locate 1 abandoned item left outside its natural section.",
      "Find 1 person standing completely still in a high-velocity walking aisle.",
      "Notice which aisle shelf height receives the highest visual eye-tracking time."
    ],
    xpReward: 100,
    reflectionPrompt: "Why was the static individual standing in the high-velocity flow corridor?"
  },
  {
    id: "dc-3",
    dayIndex: 3,
    title: "The Subtle Mirroring Challenge",
    category: "Verbal Elicitation",
    objective: "During 2 conversations today, repeat the last 2-3 words spoken by your partner in a calm, curious tone.",
    examples: [
      "Speaker: 'I was really stressed about the client timeline.' You: 'Client timeline?'",
      "Speaker: 'We decided to change our weekend plans.' You: 'Weekend plans?'"
    ],
    xpReward: 120,
    reflectionPrompt: "How much extra context did the speaker volunteer after you mirrored them?"
  },
  {
    id: "dc-4",
    dayIndex: 4,
    title: "Condition Yellow Exit Mapping",
    category: "Spatial Mapping",
    objective: "Every time you enter a new room or building today, locate 2 exits and identify 1 blind spot within 5 seconds.",
    examples: [
      "Entrance door + service kitchen exit.",
      "Position yourself with back against a solid wall facing the entrance."
    ],
    xpReward: 100,
    reflectionPrompt: "Did you feel an increase in calm situational command when seated with a clear line of sight?"
  }
];

export function getTodayChallenge(): DailyChallengeItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}
