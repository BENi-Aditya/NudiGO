import type { RequestHandler } from '@tanstack/start';

export const POST: RequestHandler = async (request: Request) => {
  try {
    const { audioBase64 } = await request.json() as { audioBase64: string };

    if (!audioBase64) {
      return new Response(JSON.stringify({ transcript: "", error: "No audio provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("[API] Received audio, length:", audioBase64.length);

    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
      console.error("[API] Missing ASSEMBLYAI_API_KEY");
      return new Response(JSON.stringify({ transcript: "", error: "Service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
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
      return new Response(JSON.stringify({ transcript: "", error: `Service error: ${response.status}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await response.json() as any;
    console.log("[API] Success, transcript length:", result.text?.length ?? 0);

    return new Response(JSON.stringify({ transcript: result.text || "" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[API] Error:", error);
    return new Response(JSON.stringify({ transcript: "", error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
