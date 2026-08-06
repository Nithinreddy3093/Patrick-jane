import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 0,
    title: "Module 0: Introduction to Observational Mindset",
    subtitle: "Transitioning from Passive Sight to Active Perception",
    description: "Learn the foundational cognitive shift required to process 10x more environmental data without mental overload.",
    estimatedDuration: "25 mins",
    difficulty: "Beginner",
    iconName: "Compass",
    xpValue: 150,
    lessons: [
      {
        id: "m0-l1",
        moduleId: 0,
        title: "The Inattentional Blindness Trap",
        durationMinutes: 12,
        xpReward: 75,
        introduction: "Most human beings walk through life in a semi-trance, seeing only what their brain expects to see.",
        conceptExplanation: {
          heading: "Why You Miss 90% of Reality",
          body: "The human eye receives over 10 million bits of optical information per second, but the conscious mind filters it down to roughly 40 bits. Survival evolution optimized us to recognize danger and macro trends, discarding 'unnecessary' noise. However, in modern society, those discarded details hold the key to understanding human intent.",
          keyTakeaway: "Observation is not about looking harder; it is about changing what your brain deems worthy of attention."
        },
        visualIllustration: {
          title: "The Cognitive Attention Funnel",
          type: "infographic",
          items: [
            { label: "10,000,000 Bits", detail: "Raw visual input per second received by retinas." },
            { label: "Predictive Filter", detail: "Brain discards 99.99% based on expectation and habit." },
            { label: "40 Bits Conscious", detail: "What you actually notice without intentional observation training." }
          ]
        },
        interactiveExample: {
          title: "Timed Observation Challenge: The Executive Desk",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
          description: "Inspect this workspace scene for 15 seconds. Pay close attention to subtle items and arrangements.",
          questions: [
            {
              question: "What accessory was lying next to the fountain pen on the right side?",
              options: ["A silver wrist watch", "A gold wedding ring", "An brass paperweight", "A leather cardholder"],
              correctAnswer: "A silver wrist watch",
              explanation: "The silver watch was positioned immediately right of the pen casing."
            },
            {
              question: "Was the lapel pin on the dark jacket gold or silver?",
              options: ["Gold", "Silver", "There was no pin", "Bronze"],
              correctAnswer: "Gold",
              explanation: "A distinct gold lapel pin was visible on the left lapel."
            }
          ]
        },
        realLifePractice: {
          title: "Café Baseline Sweep",
          location: "Any coffee shop, park bench, or lobby",
          durationMinutes: 10,
          instructions: [
            "Sit comfortably without staring at your smartphone.",
            "Select 3 random individuals within your line of sight.",
            "Record 3 physical details for each person that would differentiate them in a crowd."
          ],
          checklist: [
            "Footwear condition & type",
            "Hand posture & accessory wear (rings, tan lines, watch wrist)",
            "Micro-movements (tapping, eye scan frequency)"
          ]
        },
        reflection: {
          prompt: "What was your biggest default assumption before active observation?",
          guidingQuestions: [
            "Did you assume people's occupations purely from clothing age?",
            "How many details did you misremember when tested after 2 minutes?"
          ]
        },
        quiz: [
          {
            id: "m0q1",
            question: "What primary mechanism causes people to miss surrounding details?",
            options: [
              "Poor eyesight",
              "Inattentional blindness & predictive filtering",
              "Lack of lighting",
              "Distraction by sounds"
            ],
            correctIndex: 1,
            explanation: "Inattentional blindness is the psychological phenomenon where the brain filters out unselected visual data."
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Module 1: High-Definition Observation",
    subtitle: "Sensory Calibration & Micro-Detail Scanning",
    description: "Train your peripheral vision, focal switching, and rapid environmental scanning to capture hidden physical clues.",
    estimatedDuration: "40 mins",
    difficulty: "Beginner",
    iconName: "Eye",
    xpValue: 200,
    lessons: [
      {
        id: "m1-l1",
        moduleId: 1,
        title: "Focal Switching & Peripheral Acuity",
        durationMinutes: 15,
        xpReward: 100,
        introduction: "Learn to toggle between macro scene mapping and sharp micro-detail inspection in milliseconds.",
        conceptExplanation: {
          heading: "The Dual-Focus Method",
          body: "Master observers alternate between 'Soft Focus' (panoramic awareness using peripheral vision) and 'Hard Focus' (pinpoint inspection of specific artifacts like friction wear, fabric stains, and tan lines).",
          keyTakeaway: "Soft focus gives you context; hard focus gives you proof."
        },
        visualIllustration: {
          title: "The Focal Matrix",
          type: "comparison",
          items: [
            { label: "Soft Focus (Peripheral)", detail: "Detects movement, group dynamics, exit paths, spatial distance." },
            { label: "Hard Focus (Foveal)", detail: "Reads brand wear, fabric friction, ink smudges, ring indentations." }
          ]
        },
        interactiveExample: {
          title: "Timed Memory Challenge: The Library Table",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
          description: "Study the open book, tea cup, glasses, and notebook for 15 seconds.",
          questions: [
            {
              question: "Which hand was the pair of reading glasses leaning toward?",
              options: ["Left side of the open book", "Right side near the mug", "On top of the notebook", "Underneath the cup holder"],
              correctAnswer: "Right side near the mug",
              explanation: "The glasses were positioned to the right near the steam cup."
            }
          ]
        },
        realLifePractice: {
          title: "The Footwear & Watch Audit",
          location: "Public transportation or office foyer",
          durationMinutes: 15,
          instructions: [
            "Observe 5 strangers' shoes and watches.",
            "Determine if footwear wear patterns match their stated or perceived activity level."
          ],
          checklist: [
            "Scuff location (inner toe vs outer heel)",
            "Watch face scratches vs strap wear",
            "Left or right wrist dominance"
          ]
        },
        reflection: {
          prompt: "How quickly did you notice friction wear versus obvious clothing color?",
          guidingQuestions: [
            "What subtle details did you notice only upon a second glance?"
          ]
        },
        quiz: [
          {
            id: "m1q1",
            question: "Why is peripheral vision essential for situational awareness?",
            options: [
              "It sees colors better",
              "It is optimized to detect motion and spatial changes without drawing attention",
              "It focuses on small text",
              "It works better in bright sunlight"
            ],
            correctIndex: 1,
            explanation: "Peripheral rods are highly sensitive to movement and ambient changes without revealing where you are looking."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Reading Human Behavior & Micro-Expressions",
    subtitle: "Decoding Non-Verbal Baselines & Stress Indicators",
    description: "Detect true emotional states behind polite smiles, facial micro-expressions, and body language incongruence.",
    estimatedDuration: "50 mins",
    difficulty: "Intermediate",
    iconName: "Smile",
    xpValue: 300,
    lessons: [
      {
        id: "m2-l1",
        moduleId: 2,
        title: "Establishing the Behavioral Baseline",
        durationMinutes: 20,
        xpReward: 150,
        introduction: "Never judge a gesture in isolation. You must first establish a subject's relaxed norm.",
        conceptExplanation: {
          heading: "The Baseline Rule",
          body: "A crossed arm can mean cold temperature, comfort, or defensive guarding. It only becomes meaningful if the subject crosses their arms immediately after a specific topic is introduced.",
          keyTakeaway: "Deviation from baseline equals emotional or cognitive shift."
        },
        visualIllustration: {
          title: "Non-Verbal Stress Hierarchy",
          type: "timeline",
          items: [
            { label: "Baseline Norm", detail: "Relaxed posture, natural blink rate (10-20/min), fluid speech." },
            { label: "Topic Trigger", detail: "A sensitive question or visual stimulus presented." },
            { label: "Adapter Response", detail: "Lip compression, neck touch, foot direction shift away from speaker." }
          ]
        },
        interactiveExample: {
          title: "Expression Analysis: The Interview Room",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
          description: "Observe the subject's facial tension, eye squint, and shoulder posture.",
          questions: [
            {
              question: "What micro-expression asymmetry indicates contempt or suppressed disagreement?",
              options: [
                "Unilateral lip corner pull (one side raised)",
                "Equal eyebrow contraction",
                "Wide open smile showing top teeth",
                "Direct eye contact with slow blinking"
              ],
              correctAnswer: "Unilateral lip corner pull (one side raised)",
              explanation: "Contempt is the only asymmetric universal micro-expression characterized by a single lip corner tightening."
            }
          ]
        },
        realLifePractice: {
          title: "Blink Rate & Adapter Tracking",
          location: "Video meeting or live conversation",
          durationMinutes: 10,
          instructions: [
            "Count blink frequency during neutral conversation vs when a difficult question arises."
          ],
          checklist: [
            "Neutral blink rate baseline",
            "Self-soothing touch (collar, neck, ring twist)",
            "Foot orientation direction"
          ]
        },
        reflection: {
          prompt: "Did you catch any subtle asymmetry in smiles today?",
          guidingQuestions: [
            "Did the eyes crinkle (crow's feet) during genuine joy?"
          ]
        },
        quiz: [
          {
            id: "m2q1",
            question: "What distinguishes a genuine Duchenne smile from a polite social smile?",
            options: [
              "Showing bottom teeth",
              "Involvement of Orbicularis Oculi muscle (crow's feet around eyes)",
              "Duration over 10 seconds",
              "Loud laughing sound"
            ],
            correctIndex: 1,
            explanation: "The Orbicularis Oculi contracts around the eyes during genuine spontaneous enjoyment."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Environmental & Pattern Recognition",
    subtitle: "Spatial Mapping & Anomaly Spotting",
    description: "Spot anomalies in crowds, room arrangements, personal items, and daily routines.",
    estimatedDuration: "45 mins",
    difficulty: "Intermediate",
    iconName: "LayoutGrid",
    xpValue: 250,
    lessons: [
      {
        id: "m3-l1",
        moduleId: 3,
        title: "Spotting Spatial Anomalies",
        durationMinutes: 18,
        xpReward: 125,
        introduction: "Anomalies are things that exist where they shouldn't, or are absent where they should be.",
        conceptExplanation: {
          heading: "The Signal-to-Noise Ratio",
          body: "Every environment has a natural baseline harmony. An anomaly stands out like a bad note in a symphony—a wet umbrella on a sunny day, an unseasonal heavy coat, or a key missing from a key ring.",
          keyTakeaway: "Look for what is missing just as intensely as what is present."
        },
        visualIllustration: {
          title: "Environmental Anomaly Checklist",
          type: "cards",
          items: [
            { label: "Season Incongruence", detail: "Heavy clothing or footwear unsuited for current weather." },
            { label: "Tool Misplacement", detail: "Objects out of place relative to their functional purpose." },
            { label: "Behavioral Disconnect", detail: "Someone standing stationary in a high-flow transit corridor." }
          ]
        },
        interactiveExample: {
          title: "Scene Audit: The Hotel Lobby",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          description: "Analyze the lounge area furniture, abandoned items, and posture.",
          questions: [
            {
              question: "What anomaly suggests an abrupt departure?",
              options: [
                "Half-filled coffee cup left beside an open laptop",
                "A neatly folded newspaper",
                "A closed briefcase on the floor",
                "A glowing table lamp"
              ],
              correctAnswer: "Half-filled coffee cup left beside an open laptop",
              explanation: "Leaving an unlocked open laptop unattended with fresh coffee indicates sudden disturbance or emergency departure."
            }
          ]
        },
        realLifePractice: {
          title: "The Anomaly Hunt",
          location: "Supermarket or busy street",
          durationMinutes: 15,
          instructions: [
            "Walk through a public area and spot 3 environmental anomalies."
          ],
          checklist: [
            "Items left behind",
            "Mismatched attire for current weather",
            "Out-of-sync group movement"
          ]
        },
        reflection: {
          prompt: "Which anomaly did you notice first: physical object or human behavior?",
          guidingQuestions: ["Did your brain try to rationalize the anomaly immediately?"]
        },
        quiz: [
          {
            id: "m3q1",
            question: "In pattern recognition, what is an 'absence anomaly'?",
            options: [
              "An item that is present in large quantities",
              "An expected item or habit that is noticeably missing from its usual baseline",
              "A noisy background sound",
              "A bright primary color"
            ],
            correctIndex: 1,
            explanation: "An absence anomaly occurs when something naturally expected (like a wedding ring line without a ring) is missing."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Module 4: Memory Techniques & Loci Systems",
    subtitle: "The Mind Palace & Rapid Visual Storage",
    description: "Store dozens of observed facts instantly using ancient spatial memory structures and association hooks.",
    estimatedDuration: "60 mins",
    difficulty: "Intermediate",
    iconName: "Brain",
    xpValue: 350,
    lessons: [
      {
        id: "m4-l1",
        moduleId: 4,
        title: "Building Your First Memory Palace",
        durationMinutes: 25,
        xpReward: 175,
        introduction: "Transform fragile short-term verbal memory into permanent visual spatial architecture.",
        conceptExplanation: {
          heading: "The Method of Loci",
          body: "The human brain evolved to navigate physical geography with extraordinary precision. By placing bizarre, vivid visual images along a familiar route (like your childhood home), you can recall lists of 50+ items in exact sequence.",
          keyTakeaway: "Make memory spatial, bizarre, and emotionally vivid."
        },
        visualIllustration: {
          title: "The Loci Encoding Pipeline",
          type: "timeline",
          items: [
            { label: "1. Select Route", detail: "Familiar path: Front door -> Foyer -> Living Room -> Kitchen." },
            { label: "2. Exaggerate Image", detail: "Convert 'license plate 7X9' into a giant glowing neon 7 crushing an X." },
            { label: "3. Anchor in Station", detail: "Place the vivid image prominently on the front door handle." },
            { label: "4. Mental Walkthrough", detail: "Walk the path in order to retrieve each anchor cleanly." }
          ]
        },
        interactiveExample: {
          title: "Grid Memory Recall Test",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
          description: "Memorize the 4 items displayed across the desk corners.",
          questions: [
            {
              question: "Which object was anchored in the top left station?",
              options: ["Brass compass", "Blue fountain pen", "Leather ledger", "Silver pocketwatch"],
              correctAnswer: "Brass compass",
              explanation: "The brass compass occupied the top-left station."
            }
          ]
        },
        realLifePractice: {
          title: "10-Item License Plate & Name Palace",
          location: "At home or during a commute",
          durationMinutes: 20,
          instructions: [
            "Construct a 5-station route in your living room.",
            "Store 5 observation points from today's commute."
          ],
          checklist: [
            "5 distinct station locations",
            "Bizarre exaggerated visual anchors",
            "Backward retrieval test"
          ]
        },
        reflection: {
          prompt: "Was it easier to recall items forward or backward using your spatial route?",
          guidingQuestions: ["Did exaggerating the visual anchor help retention?"]
        },
        quiz: [
          {
            id: "m4q1",
            question: "Why does the Method of Loci outperform rote repetition?",
            options: [
              "It uses auditory repetition",
              "It leverages spatial navigation neural pathways in the hippocampus",
              "It relies on mathematical formulas",
              "It reduces sleep requirements"
            ],
            correctIndex: 1,
            explanation: "Spatial memory engages evolutionary brain networks dedicated to physical navigation."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Module 5: First-Principles Logical Deduction",
    subtitle: "Deductive, Inductive & Abductive Reasoning",
    description: "Chain verified observations into undeniable logical conclusions while eliminating cognitive bias.",
    estimatedDuration: "50 mins",
    difficulty: "Advanced",
    iconName: "GitCommit",
    xpValue: 400,
    lessons: [
      {
        id: "m5-l1",
        moduleId: 5,
        title: "The Triad of Inference",
        durationMinutes: 22,
        xpReward: 200,
        introduction: "Learn the crucial differences between Deductive certainty, Inductive probability, and Abductive best explanation.",
        conceptExplanation: {
          heading: "Eliminating the False Jump",
          body: "Inference error happens when an observer mistakes an inductive guess ('He wears expensive suits, so he must be rich') for a deductive fact. Deductive logic requires that if the premises are true, the conclusion CANNOT be false.",
          keyTakeaway: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth."
        },
        visualIllustration: {
          title: "Inference Types Compared",
          type: "comparison",
          items: [
            { label: "Deduction", detail: "General rule + Specific premise = 100% Certain Conclusion." },
            { label: "Induction", detail: "Observed patterns -> Probable general rule (e.g. 85% probability)." },
            { label: "Abduction", detail: "Incomplete observation -> Most plausible hypothesis to test." }
          ]
        },
        interactiveExample: {
          title: "Deduction Puzzle: The Watch & Ring Case",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
          description: "Inspect the watch strap notch wear and wedding band mark on the left ring finger.",
          questions: [
            {
              question: "If a subject has a distinct un-tanned band mark on his left ring finger and fresh brass polish on his thumb, what is the most logical deduction?",
              options: [
                "He recently removed a ring and handles metallic or brass objects",
                "He was born with a pale finger mark",
                "He bought the watch today",
                "He never wears jewelry"
              ],
              correctAnswer: "He recently removed a ring and handles metallic or brass objects",
              explanation: "The pale skin band proves recent long-term ring wear, and fresh polish residue indicates hands-on metal craft or maintenance."
            }
          ]
        },
        realLifePractice: {
          title: "Bias Elimination Ledger",
          location: "Personal observation notes",
          durationMinutes: 15,
          instructions: [
            "Write down 3 deductions about someone you met today.",
            "Separate them into column A (Raw Fact) and column B (Assumed Hypothesis)."
          ],
          checklist: [
            "Raw visual evidence listed without adjectives",
            "Alternative explanations generated for each item",
            "Verification steps required"
          ]
        },
        reflection: {
          prompt: "How many times did your brain attempt to skip from observation straight to assumption?",
          guidingQuestions: ["What extra evidence would turn your hypothesis into certainty?"]
        },
        quiz: [
          {
            id: "m5q1",
            question: "Which statement represents true DEDUCTIVE reasoning?",
            options: [
              "Every dog I saw today barked, so all dogs bark constantly.",
              "All human beings require oxygen. Marcus is human. Therefore Marcus requires oxygen.",
              "He looks nervous, so he must have committed the crime.",
              "It rained yesterday, so it will rain every Tuesday."
            ],
            correctIndex: 1,
            explanation: "Deductive reasoning moves from universal premises to an logically indisputable specific conclusion."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Module 6: Applied Behavioral Psychology",
    subtitle: "Motivations, Heuristics & Cognitive Biases",
    description: "Understand the core subconscious drivers—fear, status, connection, and cognitive shortcuts—that govern human decisions.",
    estimatedDuration: "55 mins",
    difficulty: "Advanced",
    iconName: "Sparkles",
    xpValue: 400,
    lessons: [
      {
        id: "m6-l1",
        moduleId: 6,
        title: "Mapping Hidden Psychological Drivers",
        durationMinutes: 25,
        xpReward: 200,
        introduction: "Every word and purchase choice is an outer signal of an inner psychological drive.",
        conceptExplanation: {
          heading: "The Core Four Motivation Matrix",
          body: "Human actions stem primarily from four subconscious drives: Status Signaling, Risk Aversion, Belonging Assurance, and Autonomy Maintenance. By identifying which drive dominates a person, you can predict their choices.",
          keyTakeaway: "People rarely act for the reason they state publicly; they act for the subconscious emotional drive."
        },
        visualIllustration: {
          title: "Subconscious Drivers",
          type: "cards",
          items: [
            { label: "Status Signaling", detail: "Displaying rare objects, prestige vocabulary, authority stance." },
            { label: "Risk Aversion", detail: "Seeking guarantees, over-checking details, defensive posture." },
            { label: "Belonging", detail: "Mirroring group speech, seeking consensus, wearing uniform markers." }
          ]
        },
        interactiveExample: {
          title: "Behavioral Analysis: The Negotiation Table",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
          description: "Observe who commands the room space versus who leans in seeking approval.",
          questions: [
            {
              question: "Which physical behavior signals high felt authority and dominance?",
              options: [
                "Taking up spatial area, slow deliberate movements, relaxed shoulders",
                "Fidgeting with pen cap rapidly",
                "Covering the neck dimple with hand",
                "High pitched rapid vocal tone"
              ],
              correctAnswer: "Taking up spatial area, slow deliberate movements, relaxed shoulders",
              explanation: "High status and psychological confidence manifest as territorial expansion and low physiological urgency."
            }
          ]
        },
        realLifePractice: {
          title: "Heuristic Spotting in Conversations",
          location: "Social gathering or media interview",
          durationMinutes: 20,
          instructions: [
            "Listen for Confirmation Bias or Anchoring Effect in a discussion."
          ],
          checklist: [
            "Identify the initial anchor point raised",
            "Notice discarded counter-arguments",
            "Track emotional defensive triggers"
          ]
        },
        reflection: {
          prompt: "Which driver (Status, Risk, Belonging, Autonomy) governs your own primary default state?",
          guidingQuestions: ["How does that driver color your observations?"]
        },
        quiz: [
          {
            id: "m6q1",
            question: "What is 'Confirmation Bias'?",
            options: [
              "Confirming an appointment on time",
              "The tendency to search for, interpret, and recall information that confirms pre-existing beliefs",
              "Checking a map twice",
              "Agreeing with everyone in a room"
            ],
            correctIndex: 1,
            explanation: "Confirmation bias filters out evidence that contradicts an existing hypothesis."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Module 7: Strategic Conversation & Cold Reading Science",
    subtitle: "Calibrated Questions & Elicitation",
    description: "Extract truthful information effortlessly without raising suspicion or sounding interrogative.",
    estimatedDuration: "50 mins",
    difficulty: "Advanced",
    iconName: "MessageSquare",
    xpValue: 450,
    lessons: [
      {
        id: "m7-l1",
        moduleId: 7,
        title: "The Art of Elicitation & Barnum Statements",
        durationMinutes: 22,
        xpReward: 225,
        introduction: "Elicitation is the collection of intelligence through casual conversation without asking direct questions.",
        conceptExplanation: {
          heading: "The Provocation & Mirroring Protocol",
          body: "Direct questions trigger defensiveness. Instead, make an intentionally slightly incorrect statement ('You look like someone who grew up in a quiet rural town'). The human urge to correct wrong details will compel them to give you exact facts.",
          keyTakeaway: "To get the truth, offer a mild inaccuracy or mirror their last 3 words."
        },
        visualIllustration: {
          title: "Elicitation Sequence",
          type: "timeline",
          items: [
            { label: "1. Flattery / Validation", detail: "Establish warmth and lower conversational defenses." },
            { label: "2. Presupposition Statement", detail: "State a plausible assumption as if it were common knowledge." },
            { label: "3. The Correction Trap", detail: "Subject eagerly corrects the detail, exposing true context." }
          ]
        },
        interactiveExample: {
          title: "Conversation Flow Analysis",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
          description: "Evaluate the dialogue interaction dynamics between two professionals.",
          questions: [
            {
              question: "What is the primary benefit of 'Mirroring' (repeating the last 2-3 words someone spoke)?",
              options: [
                "It forces them to elaborate without feeling interrogated",
                "It confuses the listener",
                "It proves you have superior vocabulary",
                "It ends the conversation quickly"
              ],
              correctAnswer: "It forces them to elaborate without feeling interrogated",
              explanation: "Mirroring acts as a gentle, unconscious signal that prompts the speaker to expand and reveal deeper context."
            }
          ]
        },
        realLifePractice: {
          title: "The Correction Prompt Drill",
          location: "Casual conversation with acquaintance",
          durationMinutes: 15,
          instructions: [
            "Use one mild, polite false assumption during small talk.",
            "Observe how quickly and detailed their correction is."
          ],
          checklist: [
            "Keep tone warm and curious",
            "Note exact extra information volunteered",
            "Avoid arguing or defending your initial statement"
          ]
        },
        reflection: {
          prompt: "Did the subject realize you were seeking specific information?",
          guidingQuestions: ["Did the conversation remain smooth and natural?"]
        },
        quiz: [
          {
            id: "m7q1",
            question: "Why are open-ended calibrated questions beginning with 'How' or 'What' effective?",
            options: [
              "They demand a simple Yes or No answer",
              "They require cognitive effort and force the respondent to reveal their underlying perspective",
              "They make the speaker sound like a judge",
              "They take less time"
            ],
            correctIndex: 1,
            explanation: "'How' and 'What' questions eliminate simple binary deflection and encourage detailed narrative responses."
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Module 8: Ethical Influence & Deception Detection",
    subtitle: "Integrity, Persuasion & Identifying Misdirection",
    description: "Spot verbal deceit and misdirection while maintaining strict ethical integrity and empathy.",
    estimatedDuration: "55 mins",
    difficulty: "Master",
    iconName: "ShieldCheck",
    xpValue: 500,
    lessons: [
      {
        id: "m8-l1",
        moduleId: 8,
        title: "Verbal Statement Analysis & Deception Clues",
        durationMinutes: 25,
        xpReward: 250,
        introduction: "Deceit creates cognitive load. The liar must hold both the truth and the cover story in mind simultaneously.",
        conceptExplanation: {
          heading: "Verbal Indicators of Stress",
          body: "Lying requires high mental energy. Deceptive statements often feature: 1) Non-anaphoric pronoun drop ('Went to office, didn't see anyone'), 2) Hyper-specific time anchors, 3) Invoking divine or moral oaths ('To be completely honest with you'), and 4) Verbal tense slips.",
          keyTakeaway: "Truthful people give sensory details; deceptive people give convincing justifications."
        },
        visualIllustration: {
          title: "Deception Indicator Checklist",
          type: "cards",
          items: [
            { label: "Qualifiers", detail: "'To tell you the absolute truth...', 'As far as I recall...'" },
            { label: "Temporal Gaps", detail: "Skipping key time intervals ('Next thing I knew, it was 4 PM')." },
            { label: "Verbal/Gesture Lag", detail: "Nodding AFTER saying 'Yes' instead of simultaneously." }
          ]
        },
        interactiveExample: {
          title: "Statement Breakdown Audit",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
          description: "Analyze the written witness statement transcript for linguistic anomalies.",
          questions: [
            {
              question: "Statement: 'To be perfectly honest, I would never do that to a colleague.' What anomaly is present?",
              options: [
                "Unsolicited truth qualifier ('To be perfectly honest')",
                "Passive voice usage",
                "Foreign language syntax",
                "Spelling mistake"
              ],
              correctAnswer: "Unsolicited truth qualifier ('To be perfectly honest')",
              explanation: "Truthful people state facts directly without needing to bolster their credibility with oath-like qualifiers."
            }
          ]
        },
        realLifePractice: {
          title: "Reverse Chronology Query",
          location: "Practice scenario or story audit",
          durationMinutes: 20,
          instructions: [
            "Ask someone recounting an event to tell it backwards from the end to the beginning.",
            "Observe where pauses or cognitive friction occur."
          ],
          checklist: [
            "Note fluid transitions vs long pauses",
            "Check sensory detail consistency",
            "Watch facial micro-expressions"
          ]
        },
        reflection: {
          prompt: "Why is ethical responsibility paramount when applying observation skills?",
          guidingQuestions: ["How do you prevent using these tools for manipulation?"]
        },
        quiz: [
          {
            id: "m8q1",
            question: "Why does asking a subject to recount an event in reverse order increase cognitive load for deceptive stories?",
            options: [
              "Because reverse order requires translating languages",
              "Because fabricated stories are memorized chronologically; reversing forces the brain to process raw sensory memory which a liar lacks",
              "Because it causes eye fatigue",
              "Because it changes vocal pitch"
            ],
            correctIndex: 1,
            explanation: "Fabricated stories lack organic episodic spatial memory and crumble under reverse temporal processing."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Module 9: Tactical Situational Awareness",
    subtitle: "OODA Loop, Threat Scanning & Environmental Command",
    description: "Maintain calm 360-degree environmental control in high-density, unpredictable real-world spaces.",
    estimatedDuration: "45 mins",
    difficulty: "Master",
    iconName: "Compass",
    xpValue: 450,
    lessons: [
      {
        id: "m9-l1",
        moduleId: 9,
        title: "The OODA Loop & Cooper's Color Code",
        durationMinutes: 20,
        xpReward: 225,
        introduction: "Observe, Orient, Decide, Act. Master the combat aviator's framework for real-time situational control.",
        conceptExplanation: {
          heading: "Cooper's Color Code of Awareness",
          body: "Condition White = Unaware, vulnerable (phone scrolling). Condition Yellow = Relaxed alert (scanning environment, identifying exits). Condition Orange = Specific potential threat identified. Condition Red = Action state.",
          keyTakeaway: "Living in Condition Yellow keeps you safe, sharp, and perpetually observant."
        },
        visualIllustration: {
          title: "Cooper's Awareness Levels",
          type: "infographic",
          items: [
            { label: "White (Unaware)", detail: "Distracted, oblivious to surroundings, easy target." },
            { label: "Yellow (Relaxed Alert)", detail: "Scanning, 360° awareness, no specific threat, zero panic." },
            { label: "Orange (Specific Focus)", detail: "Evaluating a specific anomaly or incongruent person." },
            { label: "Red (Active Action)", detail: "Executing evasive or defensive protocol." }
          ]
        },
        interactiveExample: {
          title: "Crowd Transit Assessment",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
          description: "Locate exit routes, blind spots, and anomalous movement vectors.",
          questions: [
            {
              question: "When entering a new public space, what should be your immediate 5-second habit?",
              options: [
                "Locate 2 primary exit points and identify central focal points",
                "Check phone notifications",
                "Find a mirror to adjust collar",
                "Sit with back to the main door"
              ],
              correctAnswer: "Locate 2 primary exit points and identify central focal points",
              explanation: "Establishing exit awareness and positioning with a clear line of sight is the bedrock of Condition Yellow."
            }
          ]
        },
        realLifePractice: {
          title: "The Condition Yellow Commute",
          location: "Train station, airport, or busy mall",
          durationMinutes: 20,
          instructions: [
            "Maintain Condition Yellow for 20 continuous minutes without looking at your smartphone."
          ],
          checklist: [
            "Note all exits upon entering",
            "Position self facing main entrance",
            "Map flow velocity of crowd"
          ]
        },
        reflection: {
          prompt: "How tempting was it to pull out your smartphone during idle waiting periods?",
          guidingQuestions: ["What did you notice while others were staring at screens?"]
        },
        quiz: [
          {
            id: "m9q1",
            question: "What does the 'OODA' acronym stand for?",
            options: [
              "Observe, Orient, Decide, Act",
              "Option, Operation, Data, Analysis",
              "Order, Overcome, Direct, Adjust",
              "Overview, Object, Detail, Assessment"
            ],
            correctIndex: 0,
            explanation: "The OODA Loop was developed by Col. John Boyd for rapid decision-making in fluid environments."
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Module 10: Final Investigation Simulation",
    subtitle: "Synthesis of All Observational Disciplines",
    description: "Put all 10 modules together in a comprehensive, real-time detective case audit and comprehensive exam.",
    estimatedDuration: "75 mins",
    difficulty: "Master",
    iconName: "Award",
    xpValue: 1000,
    lessons: [
      {
        id: "m10-l1",
        moduleId: 10,
        title: "The Grand Capstone Investigation",
        durationMinutes: 45,
        xpReward: 500,
        introduction: "You are tasked with reviewing a multi-layered corporate espionage and theft case using pure deduction.",
        conceptExplanation: {
          heading: "Synthesizing the Disciplines",
          body: "In this final evaluation, you will analyze physical evidence photos, cross-examine witness statements, construct a timeline palace, detect verbal deceit, and deliver an airtight verdict.",
          keyTakeaway: "A Master Observer does not guess; every claim is anchored by hard, verifiable evidence."
        },
        visualIllustration: {
          title: "Capstone Process Flow",
          type: "timeline",
          items: [
            { label: "1. Scene Inspection", detail: "Examine physical crime scene artifacts and photo details." },
            { label: "2. Statement Audit", detail: "Run linguistic deception analysis on 3 suspect transcripts." },
            { label: "3. Timeline Matrix", detail: "Cross-reference physical movement logs with alibis." },
            { label: "4. Final Verdict", detail: "Submit formal deductive deduction report." }
          ]
        },
        interactiveExample: {
          title: "Final Case Scene Audit",
          timerSeconds: 20,
          imageUrl: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80",
          description: "Analyze the safe vault dials, dust disturbances, and keycard reader light.",
          questions: [
            {
              question: "The keycard reader light is steady blue (granted), but the internal mechanical bolt is engaged. Dust is wiped clean only on numbers 3, 7, and 9. What does this prove?",
              options: [
                "An inside party used a valid keycard, then entered code digits 3, 7, 9",
                "An external burglar blew up the door",
                "The system malfunctioned due to power loss",
                "The keycard was stolen 5 years ago"
              ],
              correctAnswer: "An inside party used a valid keycard, then entered code digits 3, 7, 9",
              explanation: "Valid keycard illumination combined with wiped dust on specific keypad digits proves internal authorized credential usage plus manual pin entry."
            }
          ]
        },
        realLifePractice: {
          title: "Full Capstone Case Execution",
          location: "Detective Lab Capstone",
          durationMinutes: 30,
          instructions: [
            "Complete the Final Investigation Exam in the Detective Lab tab.",
            "Score 90%+ to unlock the Master Observer Certificate."
          ],
          checklist: [
            "Collect all 8 clues",
            "Audit all suspect alibis",
            "Submit final verdict"
          ]
        },
        reflection: {
          prompt: "How has your perception of daily life changed since starting Module 0?",
          guidingQuestions: ["Are you noticing details naturally now without conscious strain?"]
        },
        quiz: [
          {
            id: "m10q1",
            question: "What is the hallmark quality of a Master Observer?",
            options: [
              "Claiming to read minds",
              "Relentless intellectual honesty, separating facts from assumptions, and verifying evidence before drawing conclusions",
              "Wearing fancy costumes",
              "Interrupting others during conversations"
            ],
            correctIndex: 1,
            explanation: "True observation is rooted in critical thinking, rigorous evidence evaluation, and ethical humility."
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Module 11: Profiling & Cold Reading Masterclass",
    subtitle: "Constructing Psychological Dossiers from Micro-Artifacts",
    description: "Master rapid psychological profiling. Deduce occupation, lifestyle, habits, and background from clothing wear, accessories, posture, and conversational micro-signals.",
    estimatedDuration: "50 mins",
    difficulty: "Master",
    iconName: "UserCheck",
    xpValue: 500,
    lessons: [
      {
        id: "m11-l1",
        moduleId: 11,
        title: "The Anatomic & Artifact Profiling Protocol",
        durationMinutes: 25,
        xpReward: 250,
        introduction: "Every person unconsciously wears their autobiography on their body, clothing, and everyday carry items.",
        conceptExplanation: {
          heading: "Deductive Profiling Matrices",
          body: "Clothing creases reveal daily posture and travel habits. Calluses on specific finger joints betray string instrument play, heavy lifting, or surgical instrument grips. Eyewear bridge wear indicates facial shape and optical prescription age. By correlating 3 or more independent physical artifacts, you can construct an accurate background profile without a single question.",
          keyTakeaway: "A single clue is a hint; three convergent clues constitute a proof."
        },
        visualIllustration: {
          title: "Micro-Artifact Triangulation Matrix",
          type: "cards",
          items: [
            { label: "Hand Calluses & Nails", detail: "Dominant hand friction, chemical stains, instrumental calluses." },
            { label: "Footwear Compression", detail: "Supination/pronation wear, driving heel scuffs, standing fatigue marks." },
            { label: "Everyday Carry Artifacts", detail: "Key ring weight, phone screen oil patterns, wallet thickness." }
          ]
        },
        interactiveExample: {
          title: "Profile Audit: The Executive Traveler",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
          description: "Inspect the watch, cufflink, passport holder, and cuff wear of the traveler.",
          questions: [
            {
              question: "A subject wears a watch set 10 minutes fast, has a distinct sleeve crease on the left elbow only, and a worn right shoe heel. What does this suggest?",
              options: [
                "Time-anxious personality, frequent desk writing/typing, and heavy vehicle accelerator usage",
                "He bought his shoes yesterday and never drives",
                "He is left-handed and sleeps on his stomach",
                "He works as a marine diver"
              ],
              correctAnswer: "Time-anxious personality, frequent desk writing/typing, and heavy vehicle accelerator usage",
              explanation: "Artificially advancing a clock shows time-anxieties, left elbow desk friction points to desk work, and right shoe heel scuff marks gas pedal pivoting."
            }
          ]
        },
        realLifePractice: {
          title: "The 3-Artifact Stranger Profile",
          location: "Transit station or coffee lounge",
          durationMinutes: 15,
          instructions: [
            "Observe a stranger for 60 seconds.",
            "Identify 3 distinct micro-artifacts (e.g. watch strap notch, shoe wear, ring mark).",
            "Formulate 2 verifiable hypotheses about their lifestyle."
          ],
          checklist: [
            "Hand & wrist inspection",
            "Posture & shoulder tilt",
            "Accessories & pocket bulge"
          ]
        },
        reflection: {
          prompt: "How did you separate observed facts from stereotypical prejudices?",
          guidingQuestions: [
            "Did you rely on clothing brand reputation or actual fabric condition?"
          ]
        },
        quiz: [
          {
            id: "m11q1",
            question: "In cold reading and psychological profiling, what is the 'Rainbow Ruse'?",
            options: [
              "A colorful umbrella display",
              "A statement that credits the subject with two contrasting personality traits simultaneously (e.g., 'You are generally introverted, yet in the right company you can be the life of the party')",
              "A magic trick involving light prisms",
              "A deception detection test using colored lights"
            ],
            correctIndex: 1,
            explanation: "The Rainbow Ruse covers both sides of a personality trait, ensuring the subject agrees with the statement regardless of their actual nature."
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Module 12: Advanced Memory Systems: The Major System",
    subtitle: "Encoding Numbers, Names, Serial Codes & Chronology",
    description: "Translate numerical data, license plates, timestamps, and card sequences into vivid permanent visual pegs using the centuries-old Major Memory System.",
    estimatedDuration: "60 mins",
    difficulty: "Master",
    iconName: "Brain",
    xpValue: 550,
    lessons: [
      {
        id: "m12-l1",
        moduleId: 12,
        title: "The Major System Phonetic Matrix",
        durationMinutes: 30,
        xpReward: 275,
        introduction: "Master the classic phonetic system that converts abstract numbers (0-9) into consonant sounds, turning any number into a mental picture.",
        conceptExplanation: {
          heading: "The Phonetic Code for Absolute Recall",
          body: "Abstract numbers are notoriously difficult for the brain to remember. The Major System maps digits to consonant sounds: 0=S/Z, 1=T/D, 2=N, 3=M, 4=R, 5=L, 6=J/Ch/Sh, 7=K/G, 8=F/V, 9=P/B. Vowels carry no numerical value. Thus, the number 32 becomes M-N ('Moon'), and 74 becomes K-R ('Car').",
          keyTakeaway: "When numbers become vivid physical objects, forgetting becomes nearly impossible."
        },
        visualIllustration: {
          title: "Major System Digit-to-Sound Mapping",
          type: "infographic",
          items: [
            { label: "1 = T / D", detail: "One downstroke (T)." },
            { label: "2 = N", detail: "Two downstrokes (N)." },
            { label: "3 = M", detail: "Three downstrokes (M)." },
            { label: "4 = R", detail: "Last letter of FOUR is R." },
            { label: "5 = L", detail: "5 fingers with thumb extended forms L." }
          ]
        },
        interactiveExample: {
          title: "Rapid Serial Code Memory Test",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          description: "Encode the 4-digit code '3274' using the Major System words 'Moon' + 'Car'.",
          questions: [
            {
              question: "Using the Major System code (3=M, 2=N, 7=K, 4=R), what mental image encodes '3274'?",
              options: [
                "A Moon crashing into a Car",
                "A Sun shining on a Boat",
                "A Fish swimming in a Cup",
                "A Dog chasing a Ball"
              ],
              correctAnswer: "A Moon crashing into a Car",
              explanation: "32 translates to M-N (Moon) and 74 translates to K-R (Car). Combining them into a crashing scene anchors 3274 permanently."
            }
          ]
        },
        realLifePractice: {
          title: "Phone Number & License Plate Pegging",
          location: "Any street or office",
          durationMinutes: 20,
          instructions: [
            "Select 3 license plates during your walk.",
            "Convert the numbers into Major System words and anchor them to the vehicle's color."
          ],
          checklist: [
            "Convert digits to consonant sounds",
            "Insert vowels to form concrete nouns",
            "Recall 3 hours later without notes"
          ]
        },
        reflection: {
          prompt: "Did converting numbers into physical images feel faster than repeating digits aloud?",
          guidingQuestions: [
            "How vivid were your visual interactions?"
          ]
        },
        quiz: [
          {
            id: "m12q1",
            question: "In the Major Memory System, which number is represented by the 'N' sound?",
            options: ["1", "2", "3", "4"],
            correctIndex: 1,
            explanation: "The digit 2 has two vertical downstrokes, making it the phonetic 'N'."
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Module 13: Statement Analysis & Forensic Linguistics",
    subtitle: "Deconstructing Spoken and Written Syntax for Truth",
    description: "Analyze grammatical syntax, pronoun drops, temporal gaps, and passive voice to identify hidden anxiety, deceit, or omission in emails, transcripts, and interviews.",
    estimatedDuration: "55 mins",
    difficulty: "Master",
    iconName: "FileText",
    xpValue: 500,
    lessons: [
      {
        id: "m13-l1",
        moduleId: 13,
        title: "Grammatical Clues & Pronoun Shift Analysis",
        durationMinutes: 25,
        xpReward: 250,
        introduction: "Grammar is governed by the subconscious. When people lie or withhold, their syntax shifts predictably.",
        conceptExplanation: {
          heading: "The Mechanics of Linguistic Deception",
          body: "Truthful statements feature direct ownership ('I took the laptop'). Deceptive statements often employ pronoun distancing ('The laptop was moved'), change in tense mid-sentence ('I was sitting there and suddenly he comes up'), or extraneous detail in the prelude with abrupt brevity during the core event.",
          keyTakeaway: "Pay attention to changes in pronoun usage; a shift from 'we' to 'I' signals psychological distance or conflict."
        },
        visualIllustration: {
          title: "Forensic Syntax Indicators",
          type: "comparison",
          items: [
            { label: "Truthful Statement", detail: "Direct pronouns ('I'), chronological balance (20% intro, 60% event, 20% aftermath), emotional sensory detail." },
            { label: "Deceptive Statement", detail: "Passive voice ('was moved'), disproportionate prelude (80% before event, 5% event), missing temporal transitions." }
          ]
        },
        interactiveExample: {
          title: "Transcript Analysis: The Alibi Audit",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
          description: "Read the suspect's statement: 'I arrived at 8:00. We talked for a while. Later the safe was opened and the document was missing.'",
          questions: [
            {
              question: "What major linguistic red flag is present in 'Later the safe was opened and the document was missing'?",
              options: [
                "Passive voice and pronoun removal ('was opened' instead of 'X opened it')",
                "Excessive use of exclamation marks",
                "Too many specific names",
                "Overuse of past perfect verbs"
              ],
              correctAnswer: "Passive voice and pronoun removal ('was opened' instead of 'X opened it')",
              explanation: "Removing the subject pronoun ('was opened') distances the speaker from the physical act of opening."
            }
          ]
        },
        realLifePractice: {
          title: "Email & Message Syntax Audit",
          location: "Inbox or case transcript",
          durationMinutes: 15,
          instructions: [
            "Select 3 written explanations or apology emails.",
            "Highlight all passive voice usages and pronoun drops."
          ],
          checklist: [
            "Track 'I' vs 'We' transitions",
            "Identify time jumps ('Next thing I knew')",
            "Note word count distribution"
          ]
        },
        reflection: {
          prompt: "Did you notice any passive voice distance in your own writing when making excuses?",
          guidingQuestions: ["Why does the brain instinctively avoid 'I' when uncomfortable?"]
        },
        quiz: [
          {
            id: "m13q1",
            question: "Why do deceptive statements often have an oversized prelude (background setup) compared to the actual event?",
            options: [
              "Because the speaker loves history",
              "Because the prelude contains true non-incriminating facts where the speaker feels safe, while delaying the fabricated core event",
              "Because it uses more adjectives",
              "Because truthful people never give background details"
            ],
            correctIndex: 1,
            explanation: "Liars stall in truthful setup details to build credibility before rushing past the fabricated event."
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Module 14: Subconscious Priming & Influence Dynamics",
    subtitle: "Ericksonian Metaphors, Verbal Anchoring & Strategic Framing",
    description: "Learn how subtle choice framing, sensory vocabulary, and psychological priming guide decision-making and build instant rapport without friction.",
    estimatedDuration: "50 mins",
    difficulty: "Master",
    iconName: "Zap",
    xpValue: 600,
    lessons: [
      {
        id: "m14-l1",
        moduleId: 14,
        title: "Sensory Language Mirroring & Anchoring",
        durationMinutes: 25,
        xpReward: 300,
        introduction: "Influence is not about forcing agreement; it is about pacing the other person's reality before leading them.",
        conceptExplanation: {
          heading: "Pacing & Leading Dynamics",
          body: "People process reality primarily through Visual ('I see what you mean'), Auditory ('That sounds right'), or Kinesthetic ('I feel we are on solid ground') language modalities. Matching a subject's dominant sensory vocabulary lowers critical defense filters and creates deep subconscious rapport.",
          keyTakeaway: "Match their linguistic modality first (Pacing), then steer the direction (Leading)."
        },
        visualIllustration: {
          title: "Sensory Modality Indicators",
          type: "cards",
          items: [
            { label: "Visual Processing", detail: "Keywords: see, look, picture, clear, bright. Rapid speech tone." },
            { label: "Auditory Processing", detail: "Keywords: hear, sound, listen, resonance, harmonious. Melodic tone." },
            { label: "Kinesthetic Processing", detail: "Keywords: feel, grasp, heavy, solid, warm, contact. Slower cadence." }
          ]
        },
        interactiveExample: {
          title: "Dialogue Analysis: The Rapport Test",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
          description: "Subject states: 'I just can't picture how this proposal fits into our strategy.'",
          questions: [
            {
              question: "What is the most effective response to pace their Visual modality?",
              options: [
                "'Let me show you a clear diagram so you can see the big picture.'",
                "'Let's listen to how the sound of this rings in your ears.'",
                "'I feel we should grasp the heavy details firmly.'",
                "'Why don't you understand?'"
              ],
              correctAnswer: "'Let me show you a clear diagram so you can see the big picture.'",
              explanation: "Using visual vocabulary ('show', 'clear', 'see', 'picture') directly aligns with the subject's internal processing style."
            }
          ]
        },
        realLifePractice: {
          title: "The Modality Matching Drill",
          location: "Next 2 conversations",
          durationMinutes: 15,
          instructions: [
            "Listen for sensory verbs in the first 2 minutes of a conversation.",
            "Reply using at least 2 words matching their dominant modality."
          ],
          checklist: [
            "Classify speaker: Visual / Auditory / Kinesthetic",
            "Mirror key sensory verbs",
            "Observe rapport acceleration"
          ]
        },
        reflection: {
          prompt: "Did the conversation feel noticeably smoother when you mirrored their sensory vocabulary?",
          guidingQuestions: ["Which modality is your own personal default?"]
        },
        quiz: [
          {
            id: "m14q1",
            question: "What does 'Pacing' mean in psychological influence?",
            options: [
              "Walking back and forth in a room",
              "Matching the subject's current state, language, or posture to establish rapport before introducing change",
              "Speaking as fast as possible",
              "Counting the seconds between questions"
            ],
            correctIndex: 1,
            explanation: "Pacing validates the subject's present reality, creating trust that allows leading them toward a conclusion."
          }
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Module 15: Cyber-Deduction & OSINT Digital Profiling",
    subtitle: "Applying Deductive Logic to Digital Footprints & Online Artifacts",
    description: "Extend observational deduction to the digital realm: image metadata analysis, writing style matching (stylometry), online schedule profiling, and open-source intelligence.",
    estimatedDuration: "45 mins",
    difficulty: "Master",
    iconName: "Globe",
    xpValue: 500,
    lessons: [
      {
        id: "m15-l1",
        moduleId: 15,
        title: "Digital Artifact Triangulation & Photo Intelligence",
        durationMinutes: 20,
        xpReward: 250,
        introduction: "A single digital photograph contains hundreds of environmental clues: sun angles, reflections, power outlets, and background signage.",
        conceptExplanation: {
          heading: "GEOINT & Environmental Digital Deduction",
          body: "Shadow length and direction reveal exact solar time and hemisphere location. Electrical socket types identify region/country. Reflections in sunglasses or glossy tabletop surfaces reveal what lies outside the frame. Stylometry (counting word frequency and punctuation habits) links anonymous text to known authors.",
          keyTakeaway: "The digital world is not virtual; it is a direct reflection of physical reality."
        },
        visualIllustration: {
          title: "Digital Photo Deduction Matrix",
          type: "timeline",
          items: [
            { label: "1. Solar & Shadow Angle", detail: "Calculate sun position -> determine time of day and latitude." },
            { label: "2. Infrastructure Clues", detail: "Power outlet shapes, street signs, license plate formats." },
            { label: "3. Reflection Audit", detail: "Analyze pupil reflections, glass panes, and metallic surfaces." }
          ]
        },
        interactiveExample: {
          title: "Digital Image Investigation",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
          description: "Analyze the window shadow angle, three-prong Type G socket, and coffee cup logo.",
          questions: [
            {
              question: "A photo shows a Type G three-pin socket, cars driving on the left side of the street outside, and a morning shadow pointing Northwest. What location & time is deduced?",
              options: [
                "United Kingdom / Ireland / Singapore in mid-morning",
                "United States / Canada in late afternoon",
                "Germany / France at noon",
                "Brazil / Argentina in early morning"
              ],
              correctAnswer: "United Kingdom / Ireland / Singapore in mid-morning",
              explanation: "Type G sockets combined with left-hand traffic pinpoints UK/Ireland/Singapore, and morning sun in the southeast casts shadows toward the northwest."
            }
          ]
        },
        realLifePractice: {
          title: "The Open Source Image Audit",
          location: "Any online photo or news image",
          durationMinutes: 15,
          instructions: [
            "Select an uncaptioned street photo.",
            "List 4 distinct physical clues that verify continent, season, and time of day."
          ],
          checklist: [
            "Power grid / socket infrastructure",
            "Vegetation & foliage season",
            "Traffic flow side & vehicle models"
          ]
        },
        reflection: {
          prompt: "How much location information do you accidentally broadcast in your own personal photos?",
          guidingQuestions: ["Did you check background reflections in your recent uploads?"]
        },
        quiz: [
          {
            id: "m15q1",
            question: "What is 'Stylometry' in digital forensic analysis?",
            options: [
              "Measuring fashion clothing styles",
              "The statistical study of linguistic style and word usage habits to identify anonymous authorship",
              "Designing websites",
              "Editing photo colors"
            ],
            correctIndex: 1,
            explanation: "Stylometry analyzes punctuation patterns, vocabulary frequency, and sentence length to match anonymous writing to specific authors."
          }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Module 16: Non-Verbal Deception & Kinesics Mastery",
    subtitle: "Evaluating Postural Shifts, Pacifying Behaviors & Eye Myths",
    description: "Separate real non-verbal science from popular myths. Learn to detect genuine autonomic nervous system stress, pacifying adapters, and spatial territory claims.",
    estimatedDuration: "50 mins",
    difficulty: "Master",
    iconName: "ShieldCheck",
    xpValue: 500,
    lessons: [
      {
        id: "m16-l1",
        moduleId: 16,
        title: "Autonomic Stress Indicators & Pacifying Touch",
        durationMinutes: 22,
        xpReward: 250,
        introduction: "When human beings experience psychological discomfort, the limbic system commands instant self-soothing behaviors.",
        conceptExplanation: {
          heading: "The Limbic Response & Pacifiers",
          body: "When threatened or anxious, humans revert to three limbic responses: Freeze, Flight, or Fight. To regulate spiking adrenaline, we perform pacifying behaviors: touching the suprasternal notch (neck dimple), adjusting shirt collars, ventilating hair, or rubbing thighs. These do NOT prove a lie—they prove felt stress.",
          keyTakeaway: "Pacifiers signal emotional discomfort; your job is to find the trigger that caused it."
        },
        visualIllustration: {
          title: "Limbic Stress Cascade",
          type: "infographic",
          items: [
            { label: "1. Stimulus Trigger", detail: "A direct question or unexpected photo is shown." },
            { label: "2. Limbic Spiking", detail: "Heart rate increases, pupil dilation, dry mouth." },
            { label: "3. Pacifying Touch", detail: "Neck touch, ring twisting, collar pulling, leg wiping." }
          ]
        },
        interactiveExample: {
          title: "Interrogation Posture Analysis",
          timerSeconds: 15,
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
          description: "Observe the subject's hand placement over the neck dimple immediately after a name is mentioned.",
          questions: [
            {
              question: "A suspect touches their neck dimple (suprasternal notch) right when a name is spoken. What does this indicate?",
              options: [
                "Instant limbic stress and a need to self-soothe",
                "They have a sore throat",
                "Proof that they are guilty of murder",
                "They are bored and sleepy"
              ],
              correctAnswer: "Instant limbic stress and a need to self-soothe",
              explanation: "Covering the neck dimple is a protective limbic response to sudden anxiety or felt vulnerability."
            }
          ]
        },
        realLifePractice: {
          title: "Pacifier Spotting in High-Stakes Situations",
          location: "News interview or debate broadcast",
          durationMinutes: 15,
          instructions: [
            "Watch a live interview.",
            "Count the number of pacifying behaviors (neck touch, collar pull, lip compression) during tough questions."
          ],
          checklist: [
            "Establish relaxed baseline first",
            "Note exact trigger question",
            "Identify pacifying gesture type"
          ]
        },
        reflection: {
          prompt: "What is your own personal go-to pacifying habit when nervous?",
          guidingQuestions: ["Do you touch your hair, adjust your watch, or tap your foot?"]
        },
        quiz: [
          {
            id: "m16q1",
            question: "Why is the popular belief that 'looking up and to the left means lying' scientifically inaccurate?",
            options: [
              "Because people only look down when lying",
              "Because peer-reviewed research shows eye direction does not reliably correlate with deception across individuals",
              "Because eyes never move during speech",
              "Because left-handed people have no eyes"
            ],
            correctIndex: 1,
            explanation: "Scientific studies consistently show that eye movement direction alone does not correlate with truth or lying; baseline deviation is required."
          }
        ]
      }
    ]
  }
];

