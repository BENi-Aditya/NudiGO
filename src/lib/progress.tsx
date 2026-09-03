/**
 * Progress engine - the app's state heart (PRD §12, §18, §27).
 *
 * - Works offline: everything persists to localStorage, so the full learning
 *   loop runs with no backend.
 * - Syncs to Supabase best-effort when the learner is signed in (profile
 *   aggregate + lesson/concept progress). Failures never block the UI.
 * - SSR-safe: initial state is deterministic; localStorage/Supabase are only
 *   touched in client effects.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  type Concept,
  type Lesson,
  getConcept,
  getLesson,
  lessonsForUnit,
  playableLessons,
} from "@/data/curriculum";
import { achievements } from "@/data/achievements";
import { missions, type Mission } from "@/data/missions";
import { useAuth } from "./auth";
import { loadRemote, pushConcept, pushLesson, pushProfile } from "./sync";

export type Profile = {
  displayName: string;
  goal: string;
  level: string;
  situations: string[];
  onboardingDone: boolean;
};

export type ConceptStat = {
  mastery: number; // 0..5
  correct: number;
  incorrect: number;
  dueAt: number; // epoch ms
  lastSeen: number;
};

export type LessonStat = {
  timesCompleted: number;
  bestAccuracy: number; // 0..1
  lastCompletedAt: number;
};

export type DayStat = { xp: number; lessons: number; exercises: number };

export type ExploredGem = {
  visitedAt: number; // timestamp
  favorite: boolean;
  rating?: number;
  notes?: string;
};

export type DynamicMission = {
  id: string;
  title: string;
  objective: string;
  conceptId: string;
  context: string;
  reward: number;
  unitId: number;
  unlockAfterLessons: number;
  /** Where this mission came from (e.g. "hidden-gems:koshy-bar-restaurant"). */
  source?: string;
  createdAt: number;
};

export type ProgressState = {
  profile: Profile;
  xp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD (local)
  conversations: number;
  lessons: Record<number, LessonStat>;
  conceptStats: Record<string, ConceptStat>;
  mistakes: Record<string, { times: number; resolved: boolean }>;
  missions: Record<string, number>; // missionId -> completedAt
  /** User-created missions, e.g. phrases from the Explore (hidden gems) page. */
  dynamicMissions: Record<string, DynamicMission>;
  achievements: Record<string, number>; // achievementId -> earnedAt
  daily: Record<string, DayStat>;
  exploredGems: Record<string, ExploredGem>; // gemId -> gem exploration data
};

const STORAGE_KEY = "namago:progress:v1";
const EXERCISE_XP = 2;
const LESSON_XP = 20;
const CONVERSATION_XP = 10;
const GEM_VISIT_XP = 15;
const MASTERED_AT = 4;

// Spaced-review intervals (ms), indexed by resulting mastery level.
const REVIEW_MS = [
  0,
  4 * 3600_000,
  24 * 3600_000,
  3 * 24 * 3600_000,
  7 * 24 * 3600_000,
  14 * 24 * 3600_000,
];

const emptyProfile: Profile = {
  displayName: "Learner",
  goal: "",
  level: "",
  situations: [],
  onboardingDone: false,
};

function createInitialState(): ProgressState {
  return {
    profile: { ...emptyProfile },
    xp: 0,
    streak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    conversations: 0,
    lessons: {},
    conceptStats: {},
    mistakes: {},
    missions: {},
    dynamicMissions: {},
    achievements: {},
    daily: {},
    exploredGems: {},
  };
}

function localDateKey(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function loadLocal(): ProgressState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...createInitialState(),
      ...parsed,
      profile: { ...emptyProfile, ...(parsed.profile ?? {}) },
    };
  } catch {
    return null;
  }
}

function generateMockHeatmap(): Record<string, DayStat> {
  const daily: Record<string, DayStat> = {};
  const today = new Date();

  // Generate mock data for 85 days (12 weeks) going backwards
  for (let i = 0; i < 85; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];

    // Create varied practice patterns
    const hasActivity = Math.random() > 0.3; // 70% of days have activity
    if (hasActivity) {
      const xp = Math.floor(Math.random() * 100) + 10; // 10-110 XP
      daily[key] = {
        xp,
        lessons: Math.floor(xp / 20),
        exercises: Math.floor(xp / 2),
      };
    }
  }

  return daily;
}

function saveLocal(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full / unavailable - non-fatal
  }
}

function computeAchievements(
  state: ProgressState,
  now: number,
): Record<string, number> {
  const lessonsCompleted = Object.values(state.lessons).filter(
    (l) => l.timesCompleted > 0,
  ).length;
  const mastered = Object.values(state.conceptStats).filter(
    (c) => c.mastery >= MASTERED_AT,
  ).length;
  const speak = Object.keys(state.lessons).filter((id) => {
    const stat = state.lessons[Number(id)];
    return (
      (stat?.timesCompleted ?? 0) > 0 && getLesson(Number(id))?.kind === "speak"
    );
  }).length;

  const out = { ...state.achievements };
  for (const a of achievements) {
    const value =
      a.metric === "lessons"
        ? lessonsCompleted
        : a.metric === "streak"
          ? state.streak
          : a.metric === "xp"
            ? state.xp
            : a.metric === "mastered"
              ? mastered
              : speak;
    if (value >= a.threshold && !out[a.id]) out[a.id] = now;
  }
  return out;
}

function advanceStreak(
  prev: ProgressState,
): Pick<ProgressState, "streak" | "longestStreak" | "lastActiveDate"> {
  const today = localDateKey(0);
  if (prev.lastActiveDate === today) {
    const streak = Math.max(prev.streak, 1);
    return {
      streak,
      longestStreak: Math.max(prev.longestStreak, streak),
      lastActiveDate: today,
    };
  }
  const yesterday = localDateKey(-1);
  const streak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;
  return {
    streak,
    longestStreak: Math.max(prev.longestStreak, streak),
    lastActiveDate: today,
  };
}

function mergeMaxLessons(
  a: Record<number, LessonStat>,
  b: Record<number, LessonStat>,
): Record<number, LessonStat> {
  const out: Record<number, LessonStat> = { ...a };
  for (const [key, stat] of Object.entries(b)) {
    const id = Number(key);
    const existing = out[id];
    out[id] = existing
      ? {
          timesCompleted: Math.max(
            existing.timesCompleted,
            stat.timesCompleted,
          ),
          bestAccuracy: Math.max(existing.bestAccuracy, stat.bestAccuracy),
          lastCompletedAt: Math.max(
            existing.lastCompletedAt,
            stat.lastCompletedAt,
          ),
        }
      : stat;
  }
  return out;
}

function mergeMaxConcepts(
  a: Record<string, ConceptStat>,
  b: Record<string, ConceptStat>,
): Record<string, ConceptStat> {
  const out: Record<string, ConceptStat> = { ...a };
  for (const [id, stat] of Object.entries(b)) {
    const existing = out[id];
    out[id] = existing
      ? {
          mastery: Math.max(existing.mastery, stat.mastery),
          correct: Math.max(existing.correct, stat.correct),
          incorrect: Math.max(existing.incorrect, stat.incorrect),
          dueAt: Math.min(existing.dueAt, stat.dueAt),
          lastSeen: Math.max(existing.lastSeen, stat.lastSeen),
        }
      : stat;
  }
  return out;
}

export type Totals = {
  xp: number;
  streak: number;
  longestStreak: number;
  lessonsCompleted: number;
  totalLessons: number;
  missionsCompleted: number;
  conversations: number;
  mastered: number;
};

type ProgressContextValue = {
  hydrated: boolean;
  state: ProgressState;
  // actions
  completeOnboarding: (answers: {
    displayName: string;
    goal: string;
    level: string;
    situations: string[];
  }) => void;
  updatePreferences: (answers: {
    goal: string;
    level: string;
    situations: string[];
  }) => void;
  recordExercise: (conceptId: string, correct: boolean) => void;
  completeLesson: (lessonId: number, accuracy: number) => void;
  completeMission: (missionId: string, reward: number) => void;
  /**
    Create a user-sourced mission tied to a gem phrase + curriculum concept.
    No-op if a mission already exists for the same gem/concept pair.
    Returns the new mission id, or null if nothing was created.
  */
  addPhraseAsMission: (input: {
    gemId: string;
    conceptId: string;
    title: string;
    objective: string;
    context: string;
    reward?: number;
  }) => string | null;
  recordConversation: () => void;
  setDisplayName: (name: string) => void;
  resetProgress: () => void;
  // selectors
  isLessonUnlocked: (lessonId: number) => boolean;
  isLessonCompleted: (lessonId: number) => boolean;
  nextLesson: () => Lesson | undefined;
  unitCompletedCount: (unitId: number) => number;
  dueConcepts: (limit?: number) => Concept[];
  /** All user-created (dynamic) missions. */
  dynamicMissions: () => DynamicMission[];
  availableMissions: () => Mission[];
  activeMission: () => Mission | undefined;
  totals: Totals;
  levelName: string;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

const LEVELS: Array<{ min: number; name: string }> = [
  { min: 1500, name: "Conversation Ready" },
  { min: 700, name: "Confident Speaker" },
  { min: 300, name: "Local-ish" },
  { min: 100, name: "Bengaluru Beginner" },
  { min: 0, name: "First Words" },
];

export function levelNameForXp(xp: number): string {
  return LEVELS.find((l) => xp >= l.min)?.name ?? "First Words";
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<ProgressState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const userRef = useRef<string | null>(null);

  // Hydrate from localStorage once, on the client.
  useEffect(() => {
    const loaded = loadLocal();
    if (loaded) setState(loaded);
    setHydrated(true);
  }, []);

  // Persist after every change (once hydrated so we don't clobber storage).
  useEffect(() => {
    if (hydrated) saveLocal(state);
  }, [state, hydrated]);

  // Pull + reconcile with Supabase when the signed-in user changes.
  useEffect(() => {
    const uid = user?.id ?? null;
    const email = user?.email ?? null;
    userRef.current = uid;
    if (!uid || !hydrated) return;
    let active = true;
    (async () => {
      const remote = await loadRemote(uid);
      if (!active) return;
      setState((prev) => {
        let next = prev;
        if (remote) {
          const profile = remote.profile?.onboardingDone
            ? { ...prev.profile, ...remote.profile }
            : prev.profile;
          next = {
            ...prev,
            profile,
            xp: Math.max(prev.xp, remote.xp),
            streak: Math.max(prev.streak, remote.streak),
            longestStreak: Math.max(prev.longestStreak, remote.longestStreak),
            lastActiveDate: remote.lastActiveDate ?? prev.lastActiveDate,
            lessons: mergeMaxLessons(prev.lessons, remote.lessons),
            conceptStats: mergeMaxConcepts(
              prev.conceptStats,
              remote.conceptStats,
            ),
            achievements: { ...prev.achievements, ...remote.achievements },
          };
        }

        // Seed mock data for demo account
        if (
          email === "aditya.tripathi.beni@gmail.com" &&
          Object.keys(next.daily).length === 0
        ) {
          next = {
            ...next,
            daily: generateMockHeatmap(),
            xp: Math.max(next.xp, 500),
            streak: 12,
            longestStreak: 25,
          };
        }

        // Seed / reconcile the account with the merged state.
        void pushProfile(uid, next);
        for (const [id, stat] of Object.entries(next.lessons)) {
          void pushLesson(uid, Number(id), stat);
        }
        for (const [id, stat] of Object.entries(next.conceptStats)) {
          void pushConcept(uid, id, stat);
        }
        return next;
      });
    })();
    return () => {
      active = false;
    };
  }, [user?.id, hydrated]);

  const completeOnboarding = useCallback<
    ProgressContextValue["completeOnboarding"]
  >((answers) => {
    setState((prev) => {
      const next: ProgressState = {
        ...prev,
        profile: {
          displayName: answers.displayName || "Learner",
          goal: answers.goal,
          level: answers.level,
          situations: answers.situations,
          onboardingDone: true,
        },
      };
      if (userRef.current) void pushProfile(userRef.current, next);
      return next;
    });
  }, []);

  const updatePreferences = useCallback<
    ProgressContextValue["updatePreferences"]
  >((answers) => {
    setState((prev) => {
      const next: ProgressState = {
        ...prev,
        profile: {
          ...prev.profile,
          goal: answers.goal,
          level: answers.level,
          situations: answers.situations,
        },
      };
      if (userRef.current) void pushProfile(userRef.current, next);
      return next;
    });
  }, []);

  const recordExercise = useCallback<ProgressContextValue["recordExercise"]>(
    (conceptId, correct) => {
      setState((prev) => {
        const now = Date.now();
        const c = prev.conceptStats[conceptId] ?? {
          mastery: 0,
          correct: 0,
          incorrect: 0,
          dueAt: now,
          lastSeen: now,
        };
        const mastery = correct
          ? Math.min(5, c.mastery + 1)
          : Math.max(0, c.mastery - 1);
        const stat: ConceptStat = {
          mastery,
          correct: c.correct + (correct ? 1 : 0),
          incorrect: c.incorrect + (correct ? 0 : 1),
          dueAt: correct ? now + (REVIEW_MS[mastery] ?? 0) : now,
          lastSeen: now,
        };
        const dayKey = localDateKey(0);
        const day = prev.daily[dayKey] ?? { xp: 0, lessons: 0, exercises: 0 };
        const gained = correct ? EXERCISE_XP : 0;

        const mistakes = { ...prev.mistakes };
        if (!correct) {
          const m = mistakes[conceptId] ?? { times: 0, resolved: false };
          mistakes[conceptId] = { times: m.times + 1, resolved: false };
        } else if (mistakes[conceptId] && mastery >= MASTERED_AT) {
          mistakes[conceptId] = {
            times: mistakes[conceptId]!.times,
            resolved: true,
          };
        }

        const base: ProgressState = {
          ...prev,
          xp: prev.xp + gained,
          conceptStats: { ...prev.conceptStats, [conceptId]: stat },
          mistakes,
          daily: {
            ...prev.daily,
            [dayKey]: {
              xp: day.xp + gained,
              lessons: day.lessons,
              exercises: day.exercises + 1,
            },
          },
        };
        const next: ProgressState = {
          ...base,
          achievements: computeAchievements(base, now),
        };
        if (userRef.current) void pushConcept(userRef.current, conceptId, stat);
        return next;
      });
    },
    [],
  );

  const completeLesson = useCallback<ProgressContextValue["completeLesson"]>(
    (lessonId, accuracy) => {
      setState((prev) => {
        const now = Date.now();
        const streakBits = advanceStreak(prev);
        const lp = prev.lessons[lessonId] ?? {
          timesCompleted: 0,
          bestAccuracy: 0,
          lastCompletedAt: now,
        };
        const stat: LessonStat = {
          timesCompleted: lp.timesCompleted + 1,
          bestAccuracy: Math.max(lp.bestAccuracy, accuracy),
          lastCompletedAt: now,
        };
        const dayKey = localDateKey(0);
        const day = prev.daily[dayKey] ?? { xp: 0, lessons: 0, exercises: 0 };
        const base: ProgressState = {
          ...prev,
          ...streakBits,
          xp: prev.xp + LESSON_XP,
          lessons: { ...prev.lessons, [lessonId]: stat },
          daily: {
            ...prev.daily,
            [dayKey]: {
              xp: day.xp + LESSON_XP,
              lessons: day.lessons + 1,
              exercises: day.exercises,
            },
          },
        };
        const next: ProgressState = {
          ...base,
          achievements: computeAchievements(base, now),
        };
        const uid = userRef.current;
        if (uid) {
          void pushLesson(uid, lessonId, stat);
          void pushProfile(uid, next);
        }
        return next;
      });
    },
    [],
  );

  const completeMission = useCallback<ProgressContextValue["completeMission"]>(
    (missionId, reward) => {
      setState((prev) => {
        if (prev.missions[missionId]) return prev;
        const now = Date.now();
        const dayKey = localDateKey(0);
        const day = prev.daily[dayKey] ?? { xp: 0, lessons: 0, exercises: 0 };
        const base: ProgressState = {
          ...prev,
          xp: prev.xp + reward,
          missions: { ...prev.missions, [missionId]: now },
          daily: { ...prev.daily, [dayKey]: { ...day, xp: day.xp + reward } },
        };
        const next: ProgressState = {
          ...base,
          achievements: computeAchievements(base, now),
        };
        if (userRef.current) void pushProfile(userRef.current, next);
        return next;
      });
    },
    [],
  );

  const addPhraseAsMission = useCallback<
    ProgressContextValue["addPhraseAsMission"]
  >(({ gemId, conceptId, title, objective, context, reward = 30 }) => {
    const id = `gem:${gemId}:${conceptId}`;
    let created: string | null = null;
    setState((prev) => {
      if (prev.dynamicMissions[id]) return prev;
      const concept = getConcept(conceptId);
      const unitId = concept?.unitId ?? 1;
      const dynamicMission: DynamicMission = {
        id,
        title,
        objective,
        conceptId,
        context,
        reward,
        unitId,
        // 0 = immediately available, even before finishing any lesson
        unlockAfterLessons: 0,
        source: `hidden-gems:${gemId}`,
        createdAt: Date.now(),
      };
      created = id;
      return {
        ...prev,
        dynamicMissions: { ...prev.dynamicMissions, [id]: dynamicMission },
      };
    });
    return created;
  }, []);

  const recordConversation = useCallback<
    ProgressContextValue["recordConversation"]
  >(() => {
    setState((prev) => {
      const now = Date.now();
      const dayKey = localDateKey(0);
      const day = prev.daily[dayKey] ?? { xp: 0, lessons: 0, exercises: 0 };
      const next: ProgressState = {
        ...prev,
        xp: prev.xp + CONVERSATION_XP,
        conversations: prev.conversations + 1,
        daily: {
          ...prev.daily,
          [dayKey]: { ...day, xp: day.xp + CONVERSATION_XP },
        },
      };
      if (userRef.current) void pushProfile(userRef.current, next);
      return next;
    });
  }, []);

  const setDisplayName = useCallback<ProgressContextValue["setDisplayName"]>(
    (name) => {
      setState((prev) => {
        const next: ProgressState = {
          ...prev,
          profile: { ...prev.profile, displayName: name || "Learner" },
        };
        if (userRef.current) void pushProfile(userRef.current, next);
        return next;
      });
    },
    [],
  );

  const resetProgress = useCallback(() => {
    setState(createInitialState());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // ---- selectors ----
  const playable = useMemo(() => playableLessons(), []);

  const isLessonCompleted = useCallback(
    (lessonId: number) => (state.lessons[lessonId]?.timesCompleted ?? 0) > 0,
    [state.lessons],
  );

  const isLessonUnlocked = useCallback(
    (lessonId: number) => {
      const idx = playable.findIndex((l) => l.id === lessonId);
      if (idx < 0) return false;
      if (idx === 0) return true;
      const prevLesson = playable[idx - 1]!;
      return isLessonCompleted(prevLesson.id);
    },
    [playable, isLessonCompleted],
  );

  const nextLesson = useCallback(
    () => playable.find((l) => !isLessonCompleted(l.id)),
    [playable, isLessonCompleted],
  );

  const unitCompletedCount = useCallback(
    (unitId: number) =>
      lessonsForUnit(unitId).filter((l) => isLessonCompleted(l.id)).length,
    [isLessonCompleted],
  );

  const dueConcepts = useCallback(
    (limit = 12) => {
      const now = Date.now();
      return Object.entries(state.conceptStats)
        .filter(([, c]) => c.mastery > 0 && c.mastery < 5 && c.dueAt <= now)
        .sort((a, b) => a[1].dueAt - b[1].dueAt)
        .map(([id]) => getConcept(id))
        .filter((c): c is Concept => Boolean(c))
        .slice(0, limit);
    },
    [state.conceptStats],
  );

  const availableMissions = useCallback(
    () =>
      missions.filter(
        (m) => unitCompletedCount(m.unitId) >= m.unlockAfterLessons,
      ),
    [unitCompletedCount],
  );

  const dynamicMissions = useCallback<ProgressContextValue["dynamicMissions"]>(
    () => Object.values(state.dynamicMissions),
    [state.dynamicMissions],
  );

  const activeMission = useCallback(
    () => availableMissions().find((m) => !state.missions[m.id]),
    [availableMissions, state.missions],
  );

  const totals = useMemo<Totals>(
    () => ({
      xp: state.xp,
      streak: state.streak,
      longestStreak: state.longestStreak,
      lessonsCompleted: Object.values(state.lessons).filter(
        (l) => l.timesCompleted > 0,
      ).length,
      totalLessons: playable.length,
      missionsCompleted: Object.keys(state.missions).length,
      conversations: state.conversations,
      mastered: Object.values(state.conceptStats).filter(
        (c) => c.mastery >= MASTERED_AT,
      ).length,
    }),
    [state, playable.length],
  );

  const value: ProgressContextValue = {
    hydrated,
    state,
    completeOnboarding,
    updatePreferences,
    recordExercise,
    completeLesson,
    completeMission,
    addPhraseAsMission,
    recordConversation,
    setDisplayName,
    resetProgress,
    isLessonUnlocked,
    isLessonCompleted,
    nextLesson,
    unitCompletedCount,
    dueConcepts,
    dynamicMissions,
    availableMissions,
    activeMission,
    totals,
    levelName: levelNameForXp(state.xp),
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
