/**
 * Exercise engine - turns curriculum concepts into a playable lesson sequence.
 *
 * Generation is DETERMINISTIC (seeded by lesson id) so the server-rendered
 * markup matches the client on hydration, and a given lesson always plays the
 * same way. No Math.random at module/render time.
 */

import {
  type Concept,
  type Lesson,
  concepts as allConcepts,
  lessonConcepts,
} from "./curriculum";

export type McqMode = "toEnglish" | "toKannada";

export type IntroExercise = {
  type: "intro";
  id: string;
  conceptId: string;
  concept: Concept;
};

export type McqExercise = {
  type: "mcq";
  id: string;
  conceptId: string;
  mode: McqMode;
  /** Shown to the learner. For toEnglish we show the Kannada; for toKannada the English. */
  promptKannada: string;
  promptTranslit: string;
  promptEnglish: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type ListeningExercise = {
  type: "listening";
  id: string;
  conceptId: string;
  /** Kannada text to synthesize. */
  audioText: string;
  transliteration: string;
  english: string;
  options: string[];
  answer: string;
};

export type WordBankExercise = {
  type: "wordbank";
  id: string;
  conceptId: string;
  kannada: string;
  english: string;
  transliteration: string;
  answerWords: string[];
  bankWords: string[];
};

export type SpeakExercise = {
  type: "speak";
  id: string;
  conceptId: string;
  kannada: string;
  transliteration: string;
  english: string;
};

export type Exercise =
  | IntroExercise
  | McqExercise
  | ListeningExercise
  | WordBankExercise
  | SpeakExercise;

// ---------- deterministic RNG ----------

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h = Math.imul(h ^ input.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values));
}

function pickDistractors(
  pool: string[],
  exclude: string,
  count: number,
  rng: () => number,
): string[] {
  const candidates = uniqueStrings(pool).filter(
    (v) => v.toLowerCase() !== exclude.toLowerCase(),
  );
  return shuffle(candidates, rng).slice(0, count);
}

const englishPool = uniqueStrings(allConcepts.map((c) => c.english));
const kannadaPool = uniqueStrings(allConcepts.map((c) => c.kannada));
const wordTokenPool = uniqueStrings(
  allConcepts.flatMap((c) =>
    c.transliteration.replace(/[?.,!]/g, "").split(/\s+/),
  ),
).filter((w) => w.length > 1);

// ---------- exercise builders ----------

function introFor(concept: Concept): IntroExercise {
  return {
    type: "intro",
    id: `intro-${concept.id}`,
    conceptId: concept.id,
    concept,
  };
}

function mcqToEnglish(concept: Concept, rng: () => number): McqExercise {
  const distractors = pickDistractors(englishPool, concept.english, 3, rng);
  const options = shuffle([concept.english, ...distractors], rng);
  return {
    type: "mcq",
    id: `mcq-en-${concept.id}`,
    conceptId: concept.id,
    mode: "toEnglish",
    promptKannada: concept.kannada,
    promptTranslit: concept.transliteration,
    promptEnglish: concept.english,
    options,
    answer: concept.english,
    explanation: `${concept.transliteration} - ${concept.english}. ${concept.note}`,
  };
}

function mcqToKannada(concept: Concept, rng: () => number): McqExercise {
  const distractors = pickDistractors(kannadaPool, concept.kannada, 3, rng);
  const options = shuffle([concept.kannada, ...distractors], rng);
  return {
    type: "mcq",
    id: `mcq-kn-${concept.id}`,
    conceptId: concept.id,
    mode: "toKannada",
    promptKannada: concept.kannada,
    promptTranslit: concept.transliteration,
    promptEnglish: concept.english,
    options,
    answer: concept.kannada,
    explanation: `${concept.english} is “${concept.transliteration}” (${concept.kannada}).`,
  };
}

function listeningFor(concept: Concept, rng: () => number): ListeningExercise {
  const distractors = pickDistractors(
    allConcepts.map((c) => c.transliteration),
    concept.transliteration,
    2,
    rng,
  );
  const options = shuffle([concept.transliteration, ...distractors], rng);
  return {
    type: "listening",
    id: `listen-${concept.id}`,
    conceptId: concept.id,
    audioText: concept.kannada,
    transliteration: concept.transliteration,
    english: concept.english,
    options,
    answer: concept.transliteration,
  };
}

function wordBankFor(concept: Concept, rng: () => number): WordBankExercise {
  const answerWords = concept.transliteration.replace(/[?.]/g, "").split(/\s+/);
  const distractors = pickDistractors(wordTokenPool, "", 3, rng).filter(
    (w) => !answerWords.map((a) => a.toLowerCase()).includes(w.toLowerCase()),
  );
  const bankWords = shuffle([...answerWords, ...distractors.slice(0, 2)], rng);
  return {
    type: "wordbank",
    id: `bank-${concept.id}`,
    conceptId: concept.id,
    kannada: concept.kannada,
    english: concept.english,
    transliteration: concept.transliteration,
    answerWords,
    bankWords,
  };
}

function speakFor(concept: Concept): SpeakExercise {
  return {
    type: "speak",
    id: `speak-${concept.id}`,
    conceptId: concept.id,
    kannada: concept.kannada,
    transliteration: concept.transliteration,
    english: concept.english,
  };
}

function isPhrase(concept: Concept): boolean {
  return concept.kind === "phrase" || /\s/.test(concept.transliteration.trim());
}

/**
 * Build the full exercise list for a lesson. Content lessons interleave
 * intro + retrieval; speak lessons are all speaking; review lessons are a
 * mixed retrieval quiz over the whole unit.
 */
export function generateExercises(lesson: Lesson): Exercise[] {
  const rng = mulberry32(hashSeed(`namago-lesson-${lesson.id}`));
  const conceptList = lessonConcepts(lesson);
  if (conceptList.length === 0) return [];

  if (lesson.kind === "speak") {
    return conceptList.map(speakFor);
  }

  if (lesson.kind === "review") {
    const out: Exercise[] = [];
    conceptList.forEach((concept, i) => {
      if (i % 3 === 2 && isPhrase(concept)) {
        out.push(wordBankFor(concept, rng));
      } else if (i % 2 === 0) {
        out.push(mcqToEnglish(concept, rng));
      } else {
        out.push(listeningFor(concept, rng));
      }
    });
    // one recall in the other direction to close it out
    const last = conceptList[conceptList.length - 1]!;
    out.push(mcqToKannada(last, rng));
    return out;
  }

  // Standard content lesson.
  const out: Exercise[] = [];
  conceptList.forEach((concept, i) => {
    out.push(introFor(concept));
    if (isPhrase(concept)) {
      out.push(wordBankFor(concept, rng));
    } else {
      out.push(mcqToEnglish(concept, rng));
    }
    // sprinkle one listening check mid-lesson
    if (i === Math.min(1, conceptList.length - 1)) {
      out.push(listeningFor(concept, rng));
    }
  });
  // final retrieval: recognise the Kannada for the first concept
  out.push(mcqToKannada(conceptList[0]!, rng));
  return out;
}

/** Exercises that count toward accuracy (everything except passive intros). */
export function isGraded(exercise: Exercise): boolean {
  return exercise.type !== "intro";
}

/** A mixed retrieval quiz over an arbitrary set of concepts (used by Review). */
export function reviewExercises(conceptList: Concept[]): Exercise[] {
  const rng = mulberry32(
    hashSeed(`review-${conceptList.map((c) => c.id).join(",")}`),
  );
  return conceptList.map((concept, i) => {
    if (i % 2 === 0) return mcqToEnglish(concept, rng);
    if (isPhrase(concept)) return wordBankFor(concept, rng);
    return mcqToKannada(concept, rng);
  });
}

/** A speaking drill over a set of concepts (used by Practice → Speaking). */
export function speakExercises(conceptList: Concept[]): Exercise[] {
  return conceptList.map(speakFor);
}

/** Normalise a spoken/typed answer for lenient comparison. */
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-zಀ-೿\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
