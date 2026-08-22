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

/** Stream Gemini API response directly. */
export async function* streamClaudeResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ConversationTurn[] = []
): AsyncGenerator<string, void, unknown> {
  const fullPrompt = systemPrompt + "\n\n" + userMessage;
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("[AI] No API key found");
    yield "Error: AI API key not configured.";
    return;
  }

  try {
    console.log("[AI] Calling Gemini v1beta...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-sonnet:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[AI] API error:", response.status, error);
      yield "Error: Failed to generate response. Try again.";
      return;
    }

    const result = await response.json() as any;
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (text) {
      console.log("[AI] Got response, length:", text.length);
      for (const char of text) {
        yield char;
      }
    } else {
      console.error("[AI] No text in response:", result);
      yield "Error: No response text received.";
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
