export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const audioBase64 = body?.audioBase64;

    if (!audioBase64) {
      setResponseStatus(event, 400);
      return { transcript: "", error: "No audio provided" };
    }

    console.log("[API] Received audio, length:", audioBase64.length);

    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
      console.error("[API] Missing ASSEMBLYAI_API_KEY");
      setResponseStatus(event, 500);
      return { transcript: "", error: "Service not configured" };
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
      setResponseStatus(event, 500);
      return { transcript: "", error: `Service error: ${response.status}` };
    }

    const result = await response.json() as any;
    console.log("[API] Success, transcript length:", result.text?.length ?? 0);

    return { transcript: result.text || "" };
  } catch (error) {
    console.error("[API] Error:", error);
    setResponseStatus(event, 500);
    return { transcript: "", error: String(error) };
  }
});
