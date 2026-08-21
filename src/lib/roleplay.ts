/**
 * Roleplay matcher. Scripted keyword matching stands in for an LLM so practice
 * works offline. A real model could replace `matchesStep` behind this interface
 * without touching the UI.
 */
import { normalizeAnswer } from "@/data/exercises";

export function matchesStep(input: string, keywords: string[]): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  return keywords.some((keyword) =>
    normalized.includes(normalizeAnswer(keyword)),
  );
}
