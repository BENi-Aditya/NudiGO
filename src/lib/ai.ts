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

/** Stream Claude API response with real-time updates. */
export async function* streamClaudeResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ConversationTurn[] = []
): AsyncGenerator<string, void, unknown> {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) {
    console.error("[AI] No API key found in VITE_AI_API_KEY");
    yield "Error: AI API key not configured.";
    return;
  }

  const messages: ConversationTurn[] = [
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[AI] API error:", error);
      yield `Error: ${response.statusText}`;
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      yield "Error: No response body";
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.delta?.text;
            if (delta) {
              yield delta;
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
    }
  } catch (err) {
    console.error("[AI] Stream error:", err);
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
