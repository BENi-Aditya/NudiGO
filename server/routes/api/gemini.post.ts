export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const prompt = body?.prompt;

    if (!prompt) {
      setResponseStatus(event, 400);
      return { text: "", error: "No prompt provided" };
    }

    console.log("[Gemini Backend] Received prompt, length:", prompt.length);

    const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Gemini Backend] Missing VITE_GOOGLE_GEMINI_API_KEY");
      setResponseStatus(event, 500);
      return { text: "", error: "API key not configured" };
    }

    console.log("[Gemini Backend] Calling Gemini API...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
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
      console.error("[Gemini Backend] API error:", response.status, error);
      setResponseStatus(event, 500);
      return { text: "", error: `Gemini API error: ${response.status}` };
    }

    const result = await response.json() as any;
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("[Gemini Backend] Success, text length:", text.length);
    return { text };
  } catch (error) {
    console.error("[Gemini Backend] Error:", error);
    setResponseStatus(event, 500);
    return { text: "", error: String(error) };
  }
});
