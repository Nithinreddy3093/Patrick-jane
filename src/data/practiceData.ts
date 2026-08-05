import { PracticeChallenge } from '../types';

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  // 1. Observation Exercise
  {
    id: "prac-obs-1",
    type: "observation",
    title: "The Executive Office Sweep",
    description: "Scan the executive workspace for 10 seconds. Memory test will follow.",
    difficulty: "Easy",
    xpReward: 50,
    data: {
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      displaySeconds: 10,
      questions: [
        {
          question: "How many computer monitors were turned on?",
          options: ["1", "2", "3", "None"],
          correctAnswer: "2",
          explanation: "There were 2 dual screens lit up on the main mahogany desk."
        },
        {
          question: "What color was the ergonomic chair?",
          options: ["Black leather", "Cognac brown leather", "White mesh", "Grey fabric"],
          correctAnswer: "Cognac brown leather",
          explanation: "A high-back cognac brown leather chair was centered behind the desk."
        }
      ]
    }
  },

  // 2. Memory Exercise
  {
    id: "prac-mem-1",
    type: "memory",
    title: "Symbol & Number Grid Palace",
    description: "Memorize a 3x3 matrix of symbols and 2-digit numbers in 8 seconds.",
    difficulty: "Medium",
    xpReward: 75,
    data: {
      displaySeconds: 8,
      grid: [
        { position: 0, symbol: "👑", code: "74", name: "Crown" },
        { position: 1, symbol: "⚡", code: "19", name: "Lightning" },
        { position: 2, symbol: "🔑", code: "88", name: "Key" },
        { position: 3, symbol: "⚖️", code: "35", name: "Scales" },
        { position: 4, symbol: "🧭", code: "92", name: "Compass" },
        { position: 5, symbol: "💎", code: "61", name: "Diamond" },
        { position: 6, symbol: "📜", code: "43", name: "Scroll" },
        { position: 7, symbol: "⏳", code: "27", name: "Hourglass" },
        { position: 8, symbol: "🛡️", code: "50", name: "Shield" }
      ],
      testPrompt: "Which symbol and code was in the CENTER position (position 4)?",
      options: ["🧭 Compass - 92", "🔑 Key - 88", "💎 Diamond - 61", "⚡ Lightning - 19"],
      correctAnswer: "🧭 Compass - 92",
      explanation: "Position 4 (center) held the Compass icon with code 92."
    }
  },

  // 3. Deduction Challenge
  {
    id: "prac-ded-1",
    type: "deduction",
    title: "The Raincoat & Mud Paradox",
    description: "Analyze 3 conflicting statements to identify the single logical truth.",
    difficulty: "Medium",
    xpReward: 80,
    data: {
      scenario: "Four suspects (Arthur, Beatrice, Charles, Diana) arrived at a rural manor. It started raining heavily at 3:00 PM. The mud outside was pristine until 3:15 PM.",
      clues: [
        "Arthur's boots are bone dry and clean.",
        "Beatrice has damp shoulders and wet umbrella tips.",
        "Charles claims he walked through the garden at 2:30 PM, but his trousers are covered in fresh wet mud.",
        "Diana arrived at 3:30 PM in a taxi."
      ],
      question: "Who lied about their arrival time or path?",
      options: ["Charles", "Arthur", "Beatrice", "Diana"],
      correctAnswer: "Charles",
      explanation: "Charles claimed he walked the garden at 2:30 PM (before the 3:00 PM rain), yet his trousers carry wet mud, which only existed after 3:15 PM."
    }
  },

  // 4. Spot The Difference
  {
    id: "prac-spot-1",
    type: "spot-difference",
    title: "The Art Gallery Anomaly",
    description: "Compare these two nearly identical gallery scene images. Find the 3 subtle differences.",
    difficulty: "Hard",
    xpReward: 100,
    data: {
      imageA: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      differencesCount: 3,
      targetZones: [
        { id: "diff1", xPercent: 25, yPercent: 30, radiusPercent: 12, label: "Sculpture pedestal shadow direction" },
        { id: "diff2", xPercent: 70, yPercent: 45, radiusPercent: 12, label: "Framed painting color tint" },
        { id: "diff3", xPercent: 50, yPercent: 80, radiusPercent: 12, label: "Floor reflections pattern" }
      ]
    }
  },

  // 5. Find Hidden Objects
  {
    id: "prac-hid-1",
    type: "hidden-object",
    title: "The Architect's Blueprint Vault",
    description: "Locate the hidden brass key, pocket knife, and leather notebook hidden in the workshop.",
    difficulty: "Medium",
    xpReward: 90,
    data: {
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      targets: [
        { id: "t1", name: "Brass Key", xPercent: 32, yPercent: 64, description: "Hanging near the desk lamp base" },
        { id: "t2", name: "Pocket Knife", xPercent: 78, yPercent: 42, description: "Tucked beside the wooden ruler" },
        { id: "t3", name: "Leather Notebook", xPercent: 18, yPercent: 28, description: "Resting under the rolled blueprint" }
      ]
    }
  },

  // 6. Sequence Memory
  {
    id: "prac-seq-1",
    type: "sequence-memory",
    title: "Neural Pattern Recall",
    description: "Watch the lighting pattern sequence and repeat it accurately.",
    difficulty: "Easy",
    xpReward: 60,
    data: {
      sequenceLength: 5,
      colors: ["gold", "cyan", "crimson", "emerald"]
    }
  },

  // 7. Pattern Completion
  {
    id: "prac-pat-1",
    type: "pattern-completion",
    title: "Matrix Logic Progression",
    description: "Identify the missing geometric rule in the 3x3 matrix.",
    difficulty: "Hard",
    xpReward: 100,
    data: {
      matrixDescription: "Row 1: Circle with 1 line, Circle with 2 lines, Circle with 3 lines.\nRow 2: Square with 2 lines, Square with 3 lines, Square with 4 lines.\nRow 3: Triangle with 3 lines, Triangle with 4 lines, [ ? ]",
      question: "Which shape completes the bottom-right cell?",
      options: [
        "Triangle with 5 lines",
        "Triangle with 2 lines",
        "Square with 5 lines",
        "Circle with 4 lines"
      ],
      correctAnswer: "Triangle with 5 lines",
      explanation: "Each row preserves its base polygon (Circle, Square, Triangle) while incrementing line count by +1 left to right."
    }
  },

  // 8. Behavior Analysis
  {
    id: "prac-beh-1",
    type: "behavior-analysis",
    title: "Micro-Expression Breakdown",
    description: "Deconstruct non-verbal indicators during a high-stakes press statement.",
    difficulty: "Expert",
    xpReward: 120,
    data: {
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      cues: [
        "Tightened lip margin (Lip compression)",
        "Frequent supraguttular collar touching (Suprasternal notch touch)",
        "Asymmetric left eyebrow elevation"
      ],
      question: "What primary psychological state is indicated by combining suprasternal notch touching with lip compression?",
      options: [
        "High acute anxiety & stress self-soothing",
        "Extreme boredom",
        "Uncontrollable joy",
        "Sleepiness"
      ],
      correctAnswer: "High acute anxiety & stress self-soothing",
      explanation: "Touching the neck (suprasternal notch) calms the vagus nerve under high stress, while lip compression signals suppressed speech or distress."
    }
  }
];
