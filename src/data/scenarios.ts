/**
 * Scripted AI roleplay scenarios (PRD §16).
 *
 * These run fully offline with a lightweight keyword matcher, so roleplay works
 * in the demo without any API key. The system is designed so a real LLM can be
 * dropped in later behind the same interface (see src/lib/roleplay.ts); this
 * scripted path is the required AI-unavailable fallback.
 */

export type Line = { kannada: string; translit: string; english: string };

export type ScenarioStep = {
  npc: Line;
  /** Learner input matches if it contains any of these (normalised) keywords. */
  keywords: string[];
  hint: Line;
  /** NPC's reaction once the learner answers acceptably. */
  ack: Line;
};

export type Scenario = {
  id: string;
  title: string;
  role: string;
  emoji: string;
  context: string;
  /** Unlocks once this unit's first lesson is done. */
  requiresUnit: number;
  opening: Line;
  steps: ScenarioStep[];
  success: string;
};

export const scenarios: Scenario[] = [
  {
    id: "waiter",
    title: "Order coffee",
    role: "Cafe server",
    emoji: "☕",
    context: "You walk up to a darshini counter. Order a coffee, no sugar.",
    requiresUnit: 4,
    opening: {
      kannada: "ಬನ್ನಿ! ಏನು ಬೇಕು?",
      translit: "Banni! Enu beku?",
      english: "Welcome! What would you like?",
    },
    steps: [
      {
        npc: {
          kannada: "ಏನು ಬೇಕು?",
          translit: "Enu beku?",
          english: "What would you like?",
        },
        keywords: ["kafi", "coffee", "ondu kafi", "ondu"],
        hint: {
          kannada: "ಒಂದು ಕಾಫಿ ಕೊಡಿ",
          translit: "Ondu kafi kodi",
          english: "Give me one coffee",
        },
        ack: {
          kannada: "ಸರಿ, ಒಂದು ಕಾಫಿ.",
          translit: "Sari, ondu kafi.",
          english: "Okay, one coffee.",
        },
      },
      {
        npc: {
          kannada: "ಸಕ್ಕರೆ ಬೇಕಾ?",
          translit: "Sakkare beka?",
          english: "Do you want sugar?",
        },
        keywords: ["beda", "illa", "sakkare beda"],
        hint: {
          kannada: "ಸಕ್ಕರೆ ಬೇಡ",
          translit: "Sakkare beda",
          english: "No sugar",
        },
        ack: { kannada: "ಆಯಿತು!", translit: "Ayitu!", english: "Done!" },
      },
    ],
    success: "Your first Kannada coffee order — nicely done!",
  },
  {
    id: "auto",
    title: "Take an auto",
    role: "Auto driver",
    emoji: "🛺",
    context:
      "An auto pulls up. Tell the driver where you're going and ask for the meter.",
    requiresUnit: 8,
    opening: { kannada: "ಎಲ್ಲಿಗೆ?", translit: "Ellige?", english: "Where to?" },
    steps: [
      {
        npc: {
          kannada: "ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?",
          translit: "Ellige hogabeku?",
          english: "Where do you need to go?",
        },
        keywords: ["hogabeku", "beku", "ge"],
        hint: {
          kannada: "ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗಬೇಕು",
          translit: "Majestic-ge hogabeku",
          english: "I need to go to Majestic",
        },
        ack: { kannada: "ಸರಿ.", translit: "Sari.", english: "Okay." },
      },
      {
        npc: {
          kannada: "ನೂರು ರೂಪಾಯಿ.",
          translit: "Nooru rupayi.",
          english: "One hundred rupees.",
        },
        keywords: ["meter", "haki", "meter haki"],
        hint: {
          kannada: "ಮೀಟರ್ ಹಾಕಿ",
          translit: "Meter haki",
          english: "Please put the meter on",
        },
        ack: {
          kannada: "ಆಯಿತು, ಮೀಟರ್ ಹಾಕ್ತೀನಿ.",
          translit: "Ayitu, meter hakteeni.",
          english: "Fine, I'll use the meter.",
        },
      },
    ],
    success: "You handled the auto like a local. Hoodi!",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
