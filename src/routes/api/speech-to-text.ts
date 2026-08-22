import { json } from '@tanstack/start';

export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio") as Blob;

    if (!audioBlob) {
      return json({ error: "No audio provided" }, { status: 400 });
    }

    // Convert blob to base64
    const buffer = await audioBlob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    console.log("[API] Received audio blob:", audioBlob.size, "bytes");
    console.log("[API] Sending to AssemblyAI...");

    // Get API key from environment
    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
      console.error("[API] Missing ASSEMBLYAI_API_KEY environment variable");
      return json({ error: "Speech service not configured" }, { status: 500 });
    }

    // Call AssemblyAI API
    const response = await fetch("https://api.assemblyai.com/v2/transcribe", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_data: base64,
        encoding: "webm",
        language_code: "kn",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[API] AssemblyAI error:", error);
      return json({ error: `Speech service error: ${response.status}` }, { status: 500 });
    }

    const result = await response.json();
    console.log("[API] AssemblyAI response:", result);

    return json({
      transcript: result.text || "",
    });
  } catch (error) {
    console.error("[API] Error:", error);
    return json({ error: String(error) }, { status: 500 });
  }
}
