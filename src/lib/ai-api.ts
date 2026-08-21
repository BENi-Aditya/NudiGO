/** AI API configuration and conversation helpers for roleplay scenarios. */

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
  kannada?: string;
  translation?: string;
}

export interface ConversationContext {
  scenario: "restaurant" | "auto" | "meeting";
  difficulty: "beginner" | "intermediate" | "advanced";
  knownConcepts: string[];
  history: ConversationTurn[];
}

export interface AIResponse {
  kannada: string;
  english: string;
  correction?: string;
  encouragement?: string;
}

const apiProvider = import.meta.env.VITE_AI_API_PROVIDER || "mock";
const apiKey = import.meta.env.VITE_AI_API_KEY || "";
const apiUrl = import.meta.env.VITE_AI_API_URL || "http://localhost:3001/api/conversation";

export function isAIEnabled(): boolean {
  return Boolean(apiKey || import.meta.env.DEV);
}

/** Send a user message and get AI tutor response. */
export async function getAIResponse(
  userMessage: string,
  context: ConversationContext,
): Promise<AIResponse | null> {
  if (!isAIEnabled()) {
    console.warn("AI API not configured. Set VITE_AI_API_KEY in .env");
    return null;
  }

  if (apiProvider === "mock" || import.meta.env.DEV) {
    return getMockResponse(userMessage, context);
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: userMessage,
        scenario: context.scenario,
        difficulty: context.difficulty,
        knownConcepts: context.knownConcepts,
        history: context.history.slice(-5), // Last 5 turns for context
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("AI API call failed:", err);
    return null;
  }
}

/** Mock responses for development without API keys. */
function getMockResponse(
  _userMessage: string,
  context: ConversationContext,
): AIResponse {
  const scenarios = {
    restaurant: {
      kannada: "ಸರಿ! ಧನ್ಯವಾದ.",
      english: "Sure! Thank you.",
      encouragement: "Good order! You're speaking like a pro.",
    },
    auto: {
      kannada: "ಚಲು, ಸರಿ!",
      english: "Let's go, okay!",
      encouragement: "Nice! The auto driver understood you.",
    },
    meeting: {
      kannada: "ನೀವು ಹೇಗಿದ್ದೀರಾ?",
      english: "How are you?",
      encouragement: "Good introduction! Keep it going.",
    },
  };

  return scenarios[context.scenario];
}
