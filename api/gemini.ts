import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body as { prompt: string };

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Gemini API] Missing VITE_GOOGLE_GEMINI_API_KEY");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("[Gemini API] Calling Gemini with prompt length:", prompt.length);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: { text: prompt },
          safetySettings: [
            {
              category: "HARM_CATEGORY_UNSPECIFIED",
              threshold: "BLOCK_NONE",
            },
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[Gemini API] Error:", response.status, error);
      return res.status(500).json({ error: `Gemini API error: ${response.status}` });
    }

    const result = await response.json() as any;
    const text = result.candidates?.[0]?.output || "";

    console.log("[Gemini API] Got response, length:", text.length);
    return res.status(200).json({ text });
  } catch (error) {
    console.error("[Gemini API] Error:", error);
    return res.status(500).json({ error: String(error) });
  }
}
