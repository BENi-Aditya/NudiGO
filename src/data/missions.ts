/**
 * Real-world missions — the bridge from screen to street (PRD §17).
 * Each mission unlocks when the learner finishes the linked unit's first
 * lesson, and points at a concept they just learned. Completion is
 * self-reported ("I did it"); missions never ask the learner to record or
 * surveil anyone.
 */

export type Mission = {
  id: string;
  unitId: number;
  /** Learner must complete this many lessons in the unit before it unlocks. */
  unlockAfterLessons: number;
  title: string;
  objective: string;
  conceptId: string;
  context: string;
  reward: number;
  safetyNote?: string;
};

export const missions: Mission[] = [
  {
    id: "greet-someone",
    unitId: 1,
    unlockAfterLessons: 1,
    title: "Say Namaskara to someone",
    objective: "Greet a neighbour, guard, or shopkeeper in Kannada.",
    conceptId: "namaskara",
    context: "A warm namaskara opens almost any interaction in Bangalore.",
    reward: 50,
  },
  {
    id: "introduce-yourself",
    unitId: 2,
    unlockAfterLessons: 1,
    title: "Introduce yourself in Kannada",
    objective: "Tell someone your name using “nanna hesaru …”.",
    conceptId: "nanna-hesaru",
    context: "Great with a new classmate, colleague, or flatmate.",
    reward: 50,
  },
  {
    id: "ask-to-slow-down",
    unitId: 3,
    unlockAfterLessons: 1,
    title: "Ask someone to speak slowly",
    objective: "When you get lost, try “nidhanavagi heli”.",
    conceptId: "nidhanavagi-heli",
    context: "This one phrase keeps a real conversation going.",
    reward: 50,
  },
  {
    id: "order-a-coffee",
    unitId: 4,
    unlockAfterLessons: 1,
    title: "Order one coffee in Kannada",
    objective: "At a darshini or cafe, say “ondu kafi kodi”.",
    conceptId: "ondu-kafi-kodi",
    context: "The classic first Bangalore order.",
    reward: 50,
  },
  {
    id: "coffee-no-sugar",
    unitId: 5,
    unlockAfterLessons: 1,
    title: "Order it your way",
    objective: "Add “sakkare beda” for no sugar.",
    conceptId: "sakkare-beda",
    context: "Small tweak, big confidence.",
    reward: 50,
  },
  {
    id: "ask-for-bill",
    unitId: 6,
    unlockAfterLessons: 1,
    title: "Ask for the bill",
    objective: "End a meal with “bill kodi”.",
    conceptId: "bill-kodi",
    context: "Works at any restaurant counter.",
    reward: 50,
  },
  {
    id: "do-you-take-card",
    unitId: 7,
    unlockAfterLessons: 1,
    title: "Ask if they take card",
    objective: "Try “card nadeyutta?” before you pay.",
    conceptId: "card-nadeyutta",
    context: "Handy when you are short on cash.",
    reward: 50,
  },
  {
    id: "auto-meter",
    unitId: 8,
    unlockAfterLessons: 1,
    title: "Win the auto conversation",
    objective: "Ask the driver to use the meter: “meter haki”.",
    conceptId: "meter-haki",
    context: "Confident and polite gets you a fair ride.",
    safetyNote: "Stay in public, well-lit places and trust your judgement.",
    reward: 50,
  },
];

export function missionForUnit(unitId: number): Mission | undefined {
  return missions.find((m) => m.unitId === unitId);
}

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}
