/** Speech-to-text API endpoint using AssemblyAI */

export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio") as Blob;

    if (!audioBlob) {
      return new Response(
        JSON.stringify({ error: "No audio provided" }),
        { status: 400 }
      );
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
      return new Response(
        JSON.stringify({ error: "Speech service not configured" }),
        { status: 500 }
      );
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
      return new Response(
        JSON.stringify({ error: `Speech service error: ${response.status}` }),
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("[API] AssemblyAI response:", result);

    return new Response(
      JSON.stringify({
        transcript: result.text || "",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500 }
    );
  }
}
