import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audioBase64 } = req.body as { audioBase64: string };

    if (!audioBase64) {
      return res.status(400).json({ transcript: "", error: "No audio provided" });
    }

    console.log("[API] Received audio, length:", audioBase64.length);

    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
      console.error("[API] Missing ASSEMBLYAI_API_KEY");
      return res.status(500).json({ transcript: "", error: "Service not configured" });
    }

    console.log("[API] Calling AssemblyAI...");
    const response = await fetch("https://api.assemblyai.com/v2/transcribe", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_data: audioBase64,
        encoding: "webm",
        language_code: "kn",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[API] AssemblyAI error:", response.status, error);
      return res.status(500).json({ transcript: "", error: `Service error: ${response.status}` });
    }

    const result = await response.json() as any;
    console.log("[API] Success, transcript length:", result.text?.length ?? 0);

    return res.status(200).json({ transcript: result.text || "" });
  } catch (error) {
    console.error("[API] Error:", error);
    return res.status(500).json({ transcript: "", error: String(error) });
  }
}
