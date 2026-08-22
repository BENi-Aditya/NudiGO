/** Claude API integration for AI Teacher features (translator, tutor, doubt assistant). */

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

export interface TranslationRequest {
  text: string;
  targetLanguage: "kannada" | "english";
  context?: string;
}

export interface TranslationResponse {
  kannada: string;
  transliteration: string;
  english: string;
}

export interface TutorRequest {
  message: string;
  conversationHistory: ConversationTurn[];
  currentLevel: "beginner" | "intermediate" | "advanced";
}

export interface DoubtRequest {
  doubt: string;
  currentLessonTitle: string;
  concepts: string[];
  masteredConcepts?: string[];
}

/** Stream Gemini API response via Vercel API route. */
export async function* streamClaudeResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ConversationTurn[] = []
): AsyncGenerator<string, void, unknown> {
  const fullPrompt = systemPrompt + "\n\n" + userMessage;

  try {
    console.log("[AI] Calling /api/ai...");
    const endpoint = typeof window === 'undefined'
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/ai`
        : 'http://localhost:3000/api/ai'
      : '/api/ai';

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[AI] API error:", error);
      yield `Error: Failed to generate response`;
      return;
    }

    const result = await response.json() as any;
    const text = result.text || "";

    if (text) {
      console.log("[AI] Got response");
      for (const char of text) {
        yield char;
      }
    } else if (result.error) {
      yield `Error: ${result.error}`;
    }
  } catch (err) {
    console.error("[AI] Error:", err);
    yield "Error: Failed to connect to AI service.";
  }
}

/** Translate text between Kannada and English. */
export async function* translateKannada(
  request: TranslationRequest
): AsyncGenerator<string, void, unknown> {
  const systemPrompt =
    request.targetLanguage === "kannada"
      ? `You are a Kannada language translator. Translate the given English text to Kannada.
         Provide the response in this format:
         KANNADA: <Kannada script>
         TRANSLITERATION: <Roman transliteration>
         MEANING: <Precise English meaning>`
      : `You are a Kannada language translator. Translate the given Kannada text to English.
         Provide the response in this format:
         KANNADA: <Original Kannada script>
         TRANSLITERATION: <Roman transliteration>
         ENGLISH: <Clear English translation>`;

  const userMessage =
    request.targetLanguage === "kannada"
      ? `Translate to Kannada: "${request.text}"`
      : `Translate to English: "${request.text}"`;

  yield* streamClaudeResponse(systemPrompt, userMessage);
}

/** Conversational Kannada tutor. */
export async function* tutorKannada(
  request: TutorRequest
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = `You are a patient and encouraging Kannada language teacher. You teach learners at ${request.currentLevel} level.

Guidelines:
- Use simple, clear language in both English and Kannada
- Always provide Kannada text with Roman transliteration
- Use examples relevant to daily life in Bengaluru
- Encourage the learner and celebrate progress
- Explain grammar and pronunciation naturally
- If explaining Kannada, use this format:
  KANNADA: <script>
  TRANSLITERATION: <roman>
  ENGLISH: <meaning>`;

  yield* streamClaudeResponse(
    systemPrompt,
    request.message,
    request.conversationHistory
  );
}

/** Answer doubts about the current lesson. */
export async function* answerDoubt(
  request: DoubtRequest
): AsyncGenerator<string, void, unknown> {
  const masteredList =
    request.masteredConcepts && request.masteredConcepts.length > 0
      ? `\nLearner has already mastered: ${request.masteredConcepts.join(", ")}`
      : "";

  const systemPrompt = `You are a helpful tutor for the Kannada language lesson "${request.currentLessonTitle}".

In this lesson, the learner is studying these concepts: ${request.concepts.join(", ")}${masteredList}

When answering questions:
- Focus on the lesson concepts
- Use examples from the lesson
- Provide Kannada text with transliteration: KANNADA: <script>, TRANSLITERATION: <roman>, ENGLISH: <meaning>
- Keep answers concise and focused
- Encourage the learner`;

  yield* streamClaudeResponse(systemPrompt, request.doubt);
}

/** Get a complete (non-streamed) response from Claude. */
export async function getClaudeResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ConversationTurn[] = []
): Promise<string> {
  let fullResponse = "";
  for await (const chunk of streamClaudeResponse(
    systemPrompt,
    userMessage,
    conversationHistory
  )) {
    fullResponse += chunk;
  }
  return fullResponse;
}
