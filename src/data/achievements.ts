/** Achievements — mirrors the seeded `achievements` table (PRD §18). */

export type AchievementMetric =
  "lessons" | "streak" | "xp" | "mastered" | "speak";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  metric: AchievementMetric;
  threshold: number;
  emoji: string;
};

export const achievements: Achievement[] = [
  {
    id: "first-words",
    title: "First Words",
    description: "Complete your first lesson",
    metric: "lessons",
    threshold: 1,
    emoji: "🌟",
  },
  {
    id: "ten-lessons",
    title: "Ten Down",
    description: "Complete 10 lessons",
    metric: "lessons",
    threshold: 10,
    emoji: "📚",
  },
  {
    id: "streak-3",
    title: "Three Day Streak",
    description: "Practice 3 days in a row",
    metric: "streak",
    threshold: 3,
    emoji: "🔥",
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Practice 7 days in a row",
    metric: "streak",
    threshold: 7,
    emoji: "⚡",
  },
  {
    id: "xp-500",
    title: "500 XP",
    description: "Earn 500 XP",
    metric: "xp",
    threshold: 500,
    emoji: "💎",
  },
  {
    id: "xp-2000",
    title: "2000 XP",
    description: "Earn 2000 XP",
    metric: "xp",
    threshold: 2000,
    emoji: "👑",
  },
  {
    id: "mastery-10",
    title: "Ten Mastered",
    description: "Master 10 concepts",
    metric: "mastered",
    threshold: 10,
    emoji: "🧠",
  },
  {
    id: "speaker",
    title: "Speaker",
    description: "Complete a speaking session",
    metric: "speak",
    threshold: 1,
    emoji: "🎤",
  },
];

export function getAchievement(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}
