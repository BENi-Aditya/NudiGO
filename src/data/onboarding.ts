/** Onboarding options (PRD §9). Kept as data so the flow stays declarative. */

export type Option = {
  id: string;
  label: string;
  emoji: string;
  hint?: string;
};

export const goals: Option[] = [
  { id: "college", label: "College", emoji: "🎓" },
  { id: "work", label: "Work", emoji: "💼" },
  { id: "moved", label: "I just moved here", emoji: "📦" },
  { id: "travel", label: "Travel", emoji: "🧭" },
  { id: "friends", label: "Friends & community", emoji: "🫶" },
  { id: "curious", label: "Just curious", emoji: "✨" },
];

export const levels: Option[] = [
  {
    id: "nothing",
    label: "Nothing yet",
    emoji: "🌱",
    hint: "We'll start from zero.",
  },
  {
    id: "few_words",
    label: "A few words",
    emoji: "🌿",
    hint: "You know namaskara & a bit more.",
  },
  {
    id: "understand_some",
    label: "I understand some",
    emoji: "🌾",
    hint: "You catch words when spoken.",
  },
  {
    id: "speak_little",
    label: "I can speak a little",
    emoji: "🌳",
    hint: "You can form short phrases.",
  },
];

export const situations: Option[] = [
  { id: "food", label: "Food", emoji: "🍽️" },
  { id: "autos", label: "Autos", emoji: "🛺" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "college", label: "College", emoji: "🎓" },
  { id: "directions", label: "Directions", emoji: "🧭" },
  { id: "meeting", label: "Meeting people", emoji: "👋" },
  { id: "smalltalk", label: "Small talk", emoji: "💬" },
];

export const goalLabel = (id: string): string =>
  goals.find((g) => g.id === id)?.label ?? "Bangalore Beginner";
