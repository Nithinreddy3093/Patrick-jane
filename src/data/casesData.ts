import { DetectiveCase } from '../types';

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: "case-01",
    title: "Case #1: The Vanishing Cipher at Grand Hotel",
    subtitle: "A high-security encryption drive disappears from a locked penthouse suite.",
    summary: "At 10:15 PM, tech pioneer Julian Vance discovered his master encryption drive missing from the floor safe in Penthouse 802. No door locks were picked, and the balcony window was locked from the inside.",
    difficulty: "Detective",
    estimatedMinutes: 20,
    xpReward: 300,
    backgroundStory: "Julian Vance hosted an intimate dinner party for 3 close associates to celebrate a $50M takeover. At 9:45 PM, a champagne toast was made. By 10:15 PM, Vance went to retrieve the drive for a demonstration and found the safe door unlatched and empty.",
    sceneImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    suspects: [
      {
        id: "susp-1",
        name: "Evelyn Thorne",
        role: "Chief Software Architect",
        motive: "Disagreed with the takeover valuation and wanted her proprietary algorithm back.",
        alibi: "Claims she was in the powder room from 9:50 PM to 10:05 PM due to wine spillage.",
        behaviorNotes: "Repeatedly twists her left cuff bracelet. Smells strongly of floral lavender perfume.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "susp-2",
        name: "Marcus Vance",
        role: "Julian's Younger Brother & Financial Officer",
        motive: "In heavy personal debt from offshore trading losses.",
        alibi: "Claims he was talking on the balcony from 9:50 PM to 10:10 PM.",
        behaviorNotes: "Sweating around collar; right shoe heel has fresh white drywall dust.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "susp-3",
        name: "Dr. Alistair Finch",
        role: "Venture Capital Partner",
        motive: "Seeking leverage to force Julian into accepting his fund's board seat.",
        alibi: "Claims he stayed seated at the dining table sipping cognac.",
        behaviorNotes: "Calm demeanor, but his fountain pen ink is smeared on his right index finger.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
      }
    ],
    clues: [
      {
        id: "clue-1",
        title: "Lavender Scented Hand Towel",
        category: "Physical",
        description: "A dampened silk handkerchief smelling of lavender perfume was found shoved behind the safe pedestal.",
        locationFound: "Penthouse 802 Safe Cabinet",
        isKeyClue: true,
        associatedSuspects: ["susp-1"]
      },
      {
        id: "clue-2",
        title: "Drywall Dust Traces",
        category: "Physical",
        description: "A faint streak of white gypsum drywall dust on the lower border of the hidden safe access panel.",
        locationFound: "Lower Wall Recess",
        isKeyClue: true,
        associatedSuspects: ["susp-2"]
      },
      {
        id: "clue-3",
        title: "Digital Keypad Access Log",
        category: "Digital",
        description: "Safe unlocked at 9:58 PM using Master PIN 7492. Only Julian and Marcus knew the PIN.",
        locationFound: "Penthouse Server Room",
        isKeyClue: true,
        associatedSuspects: ["susp-2"]
      },
      {
        id: "clue-4",
        title: "Balcony Door Latch Inspection",
        category: "Physical",
        description: "The interior balcony latch shows no scrape marks; the glass was clean with no smudges.",
        locationFound: "Balcony Doors",
        isKeyClue: false
      }
    ],
    timeline: [
      { time: "9:00 PM", event: "Guests arrive at Penthouse 802.", verified: true },
      { time: "9:45 PM", event: "Champagne toast in main dining lounge.", verified: true },
      { time: "9:50 PM", event: "Evelyn leaves for powder room; Marcus steps outside.", verified: true },
      { time: "9:58 PM", event: "Safe unlocked with valid PIN 7492.", verified: true },
      { time: "10:15 PM", event: "Julian discovers missing encryption drive.", verified: true }
    ],
    correctCulpritId: "susp-2",
    deductionExplanation: "Marcus Vance is the culprit. Marcus possessed the Master PIN (7492), which unlocked the safe at 9:58 PM according to digital logs. Furthermore, Marcus claimed he was on the outdoor balcony, yet the white drywall dust on his right shoe matches the gypsum dust on the safe access panel. He planted Evelyn's lavender handkerchief to frame her."
  },
  {
    id: "case-02",
    title: "Case #2: The Art Curator's Alibi",
    subtitle: "A Renaissance masterpiece is swapped for a flawless fake during a gala.",
    summary: "At 11:00 PM during the Grand Gala at the Metropolitan Wing, the famous 'Portrait of Beatrice' canvas was revealed to be a high-grade 21st century forgery.",
    difficulty: "Chief Investigator",
    estimatedMinutes: 25,
    xpReward: 450,
    backgroundStory: "The museum curator, senior conservator, and lead benefactor had exclusive access to the vault keys. The alarm system was momentarily bypassed for 90 seconds during the light show at 10:20 PM.",
    sceneImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    suspects: [
      {
        id: "susp-201",
        name: "Helena Rostova",
        role: "Head Curator",
        motive: "Facilitated private black-market sales to save the museum from bankruptcy.",
        alibi: "Gave an opening speech on the main stage from 10:15 PM to 10:30 PM.",
        behaviorNotes: "Speaks with immaculate grace; left ear earring missing its pearl drop.",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "susp-202",
        name: "Dimitri Vance",
        role: "Senior Conservator",
        motive: "Skilled painter who created the replica; bitter about lack of recognition.",
        alibi: "Claims he was in the basement climate control lab monitoring humidity.",
        behaviorNotes: "Ultraviolet reactive varnish residue under left fingernails.",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    clues: [
      {
        id: "clue-201",
        title: "UV Reactive Varnish Stains",
        category: "Physical",
        description: "Fresh synthetic varnish under fingernails that glows bright blue under 365nm UV light.",
        locationFound: "Conservator Lab Workbench",
        isKeyClue: true,
        associatedSuspects: ["susp-202"]
      },
      {
        id: "clue-202",
        title: "Bypassed Security Relay",
        category: "Digital",
        description: "Physical jumper wire installed on Vault Relay #4, requiring expert conservator keycard access.",
        locationFound: "Vault Junction Box",
        isKeyClue: true,
        associatedSuspects: ["susp-202"]
      }
    ],
    timeline: [
      { time: "10:15 PM", event: "Helena Rostova begins gala speech on main stage.", verified: true },
      { time: "10:20 PM", event: "Vault Relay #4 manually bypassed for 90 seconds.", verified: true },
      { time: "11:00 PM", event: "Forgery discovered under gallery spotlights.", verified: true }
    ],
    correctCulpritId: "susp-202",
    deductionExplanation: "Dimitri Vance executed the swap. Helena Rostova was on the main stage giving a speech verified by 200 guests. Dimitri possessed both the conservator technical access to install the physical jumper wire on Vault Relay #4 and had fresh UV-reactive varnish under his fingernails from finishing the forgery earlier that evening."
  }
];
