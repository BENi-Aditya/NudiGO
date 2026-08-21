/**
 * Best-effort Supabase sync for signed-in users. Everything here is optional:
 * if a call fails (offline, RLS, missing keys) we log and fall back to the
 * local store. Curriculum, missions, situations and achievements stay local;
 * this syncs the durable cross-device bits: profile aggregate, lesson progress,
 * and concept mastery.
 */
import type {
  ConceptStat,
  LessonStat,
  ProgressState,
  Profile,
} from "./progress";

export type RemoteSnapshot = {
  profile: Profile | null;
  xp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  lessons: Record<number, LessonStat>;
  conceptStats: Record<string, ConceptStat>;
  achievements: Record<string, number>;
};

async function client() {
  const { supabase } = await import("@/integrations/supabase/client");
  return supabase;
}

const ms = (value: string | null | undefined): number =>
  value ? Date.parse(value) : Date.now();

/** Load a user's saved progress from Supabase (null if the read fails). */
export async function loadRemote(
  userId: string,
): Promise<RemoteSnapshot | null> {
  try {
    const supabase = await client();
    const [profileRes, lessonRes, conceptRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_lesson_progress").select("*").eq("user_id", userId),
      supabase.from("user_concept_progress").select("*").eq("user_id", userId),
    ]);

    const p = profileRes.data;
    const profile: Profile | null = p
      ? {
          displayName: p.display_name,
          goal: p.goal,
          level: p.level,
          situations: [],
          onboardingDone: p.onboarding_done,
        }
      : null;

    const lessons: Record<number, LessonStat> = {};
    for (const row of lessonRes.data ?? []) {
      lessons[row.lesson_id] = {
        timesCompleted: row.times_completed,
        bestAccuracy: Number(row.best_accuracy),
        lastCompletedAt: ms(row.last_completed_at),
      };
    }

    const conceptStats: Record<string, ConceptStat> = {};
    for (const row of conceptRes.data ?? []) {
      conceptStats[row.concept_id] = {
        mastery: Number(row.mastery),
        correct: row.correct_count,
        incorrect: row.incorrect_count,
        dueAt: ms(row.due_at),
        lastSeen: ms(row.last_seen_at),
      };
    }

    const achievements: Record<string, number> = {};
    if (p?.achievements) {
      for (const [id, timestamp] of Object.entries(p.achievements)) {
        achievements[id] = typeof timestamp === 'number' ? timestamp : ms(timestamp as string);
      }
    }

    return {
      profile,
      xp: p?.xp ?? 0,
      streak: p?.streak ?? 0,
      longestStreak: p?.longest_streak ?? 0,
      lastActiveDate: p?.last_active_date ?? null,
      lessons,
      conceptStats,
      achievements,
    };
  } catch (error) {
    console.error("[sync] loadRemote failed", error);
    return null;
  }
}

export async function pushProfile(
  userId: string,
  state: ProgressState,
): Promise<void> {
  try {
    const supabase = await client();
    await supabase.from("profiles").upsert({
      id: userId,
      display_name: state.profile.displayName || "Learner",
      goal: state.profile.goal || "daily_life",
      level: state.profile.level || "beginner",
      onboarding_done: state.profile.onboardingDone,
      xp: state.xp,
      streak: state.streak,
      longest_streak: state.longestStreak,
      last_active_date: state.lastActiveDate,
      achievements: state.achievements,
    });
  } catch (error) {
    console.error("[sync] pushProfile failed", error);
  }
}

export async function pushLesson(
  userId: string,
  lessonId: number,
  stat: LessonStat,
): Promise<void> {
  try {
    const supabase = await client();
    await supabase.from("user_lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        times_completed: stat.timesCompleted,
        best_accuracy: stat.bestAccuracy,
        last_completed_at: new Date(stat.lastCompletedAt).toISOString(),
      },
      { onConflict: "user_id,lesson_id" },
    );
  } catch (error) {
    console.error("[sync] pushLesson failed", error);
  }
}

export async function pushConcept(
  userId: string,
  conceptId: string,
  stat: ConceptStat,
): Promise<void> {
  try {
    const supabase = await client();
    await supabase.from("user_concept_progress").upsert(
      {
        user_id: userId,
        concept_id: conceptId,
        mastery: stat.mastery,
        correct_count: stat.correct,
        incorrect_count: stat.incorrect,
        due_at: new Date(stat.dueAt).toISOString(),
        last_seen_at: new Date(stat.lastSeen).toISOString(),
      },
      { onConflict: "user_id,concept_id" },
    );
  } catch (error) {
    console.error("[sync] pushConcept failed", error);
  }
}

export async function pushAvatarUrl(userId: string, avatarUrl: string): Promise<void> {
  try {
    const supabase = await client();
    await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", userId);
  } catch (error) {
    console.error("[sync] pushAvatarUrl failed", error);
  }
}
