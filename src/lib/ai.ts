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

/** Stream Groq API response (completely free, no billing required). */
export async function* streamClaudeResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ConversationTurn[] = []
): AsyncGenerator<string, void, unknown> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("[AI] No API key found");
    yield "Error: AI API key not configured.";
    return;
  }

  try {
    console.log("[AI] Calling Groq...");
    const response = await fetch(
      `https://api.groq.com/openai/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory.map(turn => ({
              role: turn.role,
              content: turn.content
            })),
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 300,
          stream: false,
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
    const text = result.choices?.[0]?.message?.content || "";

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
IMPORTANT: Keep response VERY SHORT - maximum 2-3 lines.
Format EXACTLY as:
KANNADA: [Kannada script only, no English letters]
TRANSLITERATION: [Roman transliteration only]
MEANING: [One line English meaning]`
      : `You are a Kannada language translator. Translate the given Kannada text to English.
IMPORTANT: Keep response VERY SHORT - maximum 2-3 lines.
Format EXACTLY as:
KANNADA: [Original Kannada script only]
TRANSLITERATION: [Roman transliteration only]
ENGLISH: [One line English translation]`;

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
  const systemPrompt = `You are a Kannada language teacher for ${request.currentLevel} learners in Bengaluru.

RESPONSE RULES (CRITICAL):
- Maximum 2-3 lines per response
- Keep explanations simple and direct
- For Kannada text, use format: Kannada: [script], Transliteration: [roman], Meaning: [English]
- No markdown, no special formatting
- When responding with Kannada, ensure pure Kannada script (no English letters mixed in)
- When responding with English, keep it clear and concise

Teaching style:
- Encourage and motivate
- Use real Bengaluru contexts (autos, filter coffee, local phrases)
- Ask follow-up questions to check understanding
- Adapt to learner level`;

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

/** Translate text between Kashmiri and English. */
export async function* translateKashmiri(
  request: TranslationRequest & { targetLanguage: "kashmiri" | "english" }
): AsyncGenerator<string, void, unknown> {
  const systemPrompt =
    request.targetLanguage === "kashmiri"
      ? `You are a Kashmiri language translator. Translate the given English text to Kashmiri.
IMPORTANT: Keep response VERY SHORT - maximum 2-3 lines.
Format EXACTLY as:
KASHMIRI: [Kashmiri script only, no English letters]
TRANSLITERATION: [Roman transliteration only]
MEANING: [One line English meaning]`
      : `You are a Kashmiri language translator. Translate the given Kashmiri text to English.
IMPORTANT: Keep response VERY SHORT - maximum 2-3 lines.
Format EXACTLY as:
KASHMIRI: [Original Kashmiri script only]
TRANSLITERATION: [Roman transliteration only]
ENGLISH: [One line English translation]`;

  const userMessage =
    request.targetLanguage === "kashmiri"
      ? `Translate to Kashmiri: "${request.text}"`
      : `Translate to English: "${request.text}"`;

  yield* streamClaudeResponse(systemPrompt, userMessage);
}

/** Conversational Kashmiri tutor. */
export async function* tutorKashmiri(
  request: TutorRequest
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = `You are a Kashmiri language teacher for ${request.currentLevel} learners who want to connect with Kashmiri culture and family.

RESPONSE RULES (CRITICAL):
- Maximum 2-3 lines per response
- Keep explanations simple and direct
- For Kashmiri text, use format: Kashmiri: [script], Transliteration: [roman], Meaning: [English]
- No markdown, no special formatting
- When responding with Kashmiri, ensure proper Kashmiri script (no English letters mixed in)
- When responding with English, keep it clear and concise

Teaching style:
- Encourage and motivate
- Use real Kashmir context (Wazwan feasts, family gatherings, bazaars, traditions)
- Ask follow-up questions to check understanding
- Adapt to learner level
- Focus on cultural integration and family connection`;

  yield* streamClaudeResponse(
    systemPrompt,
    request.message,
    request.conversationHistory
  );
}
