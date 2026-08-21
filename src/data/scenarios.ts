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
    success: "Your first Kannada coffee order - nicely done!",
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
  {
    id: "shop-greeting",
    title: "Greet at a shop",
    role: "Shop owner",
    emoji: "🏪",
    context: "You walk into a local shop. Greet the owner warmly.",
    requiresUnit: 1,
    opening: {
      kannada: "ಸುಸ್ವಾಗತ!",
      translit: "Suswagat!",
      english: "Welcome!",
    },
    steps: [
      {
        npc: {
          kannada: "ನಮಸ್ಕಾರ! ಹೇಗಿದ್ದಿಯ?",
          translit: "Namaskara! Hegiddiyi?",
          english: "Hello! How are you?",
        },
        keywords: ["namaskara", "hegiddiyi", "fine", "nodi"],
        hint: {
          kannada: "ನಮಸ್ಕಾರ! ನನ್ನ ಚಿಕ್ಕದಿಲ್ಲ",
          translit: "Namaskara! Nanna chikkadilla",
          english: "Hello! I'm fine",
        },
        ack: {
          kannada: "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!",
          translit: "Tumba chennaagide!",
          english: "That's great!",
        },
      },
    ],
    success: "Perfect greeting! You're making friends already.",
  },
  {
    id: "restaurant-bill",
    title: "Ask for the bill",
    role: "Restaurant server",
    emoji: "🍽️",
    context: "You've finished eating. Ask for the bill politely.",
    requiresUnit: 6,
    opening: {
      kannada: "ಹೋಗಿತ್ತೀನ? ಇನ್ನೂ ಬೇಕಾ?",
      translit: "Hogitte? Innu beka?",
      english: "How was it? Do you need anything else?",
    },
    steps: [
      {
        npc: {
          kannada: "ಇನ್ನೂ ಬೇಕಾ?",
          translit: "Innu beka?",
          english: "Anything else?",
        },
        keywords: ["bill", "kodi", "bill kodi", "illa"],
        hint: {
          kannada: "ಬಿಲ್‌ ಕೊಡಿ",
          translit: "Bill kodi",
          english: "Please give me the bill",
        },
        ack: {
          kannada: "ಐತು. ಒಂದು ನಿಮಿಷ.",
          translit: "Aitu. Ondu nimisha.",
          english: "Sure. One moment.",
        },
      },
    ],
    success: "You handled it professionally. Jai Kannada!",
  },
  {
    id: "ask-direction",
    title: "Ask for directions",
    role: "Friendly local",
    emoji: "🗺️",
    context: "You're lost. Ask a friendly person for directions.",
    requiresUnit: 3,
    opening: {
      kannada: "ಹೇ, ನಿನಗೆ ಸಹಾಯ ಬೇಕಾ?",
      translit: "Hey, ninagé sahaya beka?",
      english: "Hey, do you need help?",
    },
    steps: [
      {
        npc: {
          kannada: "ಎಲ್ಲಿ ಹೊಗೋದಾ?",
          translit: "Elli hogoda?",
          english: "Where are you going?",
        },
        keywords: ["koramangala", "indiranagar", "whitefield"],
        hint: {
          kannada: "ಕೋರಮಂಗಳಕ್ಕೆ ಹೊಗೋದಾ",
          translit: "Koramangala-kke hogoda",
          english: "I'm going to Koramangala",
        },
        ack: {
          kannada: "ಆ ರೀತಿ! ಇದು ಲೆಕ್ಕ ಹೊಗೀದೀರಾ.",
          translit: "A reeti! Idu lekka hogida!",
          english: "Oh! You'll find it that way.",
        },
      },
    ],
    success: "Great job asking for help! Locals love that.",
  },
  {
    id: "payment-decline",
    title: "Decline and offer cash",
    role: "Vendor",
    emoji: "💳",
    context: "You don't have a card. Politely decline card payment and offer cash.",
    requiresUnit: 7,
    opening: {
      kannada: "ಕಾರ್ಡ್ ಇಲ್ಲಾ? ಕ್ರೆಡಿಟ್ ಬೇಕೇ?",
      translit: "Card illa? Credit beke?",
      english: "No card? Want credit?",
    },
    steps: [
      {
        npc: {
          kannada: "ಕಾರ್ಡ್ ನಡೆಯುತ್ತೆ?",
          translit: "Card nadeyutte?",
          english: "Does your card work?",
        },
        keywords: ["illa", "paise", "ಅಡುಕೇ", "cash", "naaku"],
        hint: {
          kannada: "ಇಲ್ಲ, ನನಗೆ ಅಡುಕೇ ಸಾಲ್ತೆ",
          translit: "Illa, nanagé aduké salte",
          english: "No, cash is fine for me",
        },
        ack: {
          kannada: "ಆಯಿತು!",
          translit: "Ayitu!",
          english: "Okay!",
        },
      },
    ],
    success: "Perfect! You're a natural at navigating Bengaluru.",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
