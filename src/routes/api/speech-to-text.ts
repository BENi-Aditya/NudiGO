/** Speech-to-text API endpoint using Google Cloud Speech-to-Text */

export const POST = async ({ request }) => {
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
    console.log("[API] Sending to Google Cloud Speech-to-Text...");

    // Call Google Cloud Speech-to-Text API
    const googleApiKey = process.env.GOOGLE_CLOUD_SPEECH_API_KEY;
    if (!googleApiKey) {
      console.error("[API] Missing GOOGLE_CLOUD_SPEECH_API_KEY environment variable");
      return new Response(
        JSON.stringify({ error: "Speech service not configured" }),
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${googleApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            encoding: "WEBM_OPUS",
            languageCode: "kn-IN",
            model: "default",
            enableAutomaticPunctuation: true,
          },
          audio: {
            content: base64,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[API] Google Cloud error:", error);
      return new Response(
        JSON.stringify({ error: `Speech service error: ${response.status}` }),
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("[API] Google Cloud response:", result);

    // Extract transcript from results
    let transcript = "";
    if (result.results && result.results.length > 0) {
      const alternatives = result.results[result.results.length - 1].alternatives;
      if (alternatives && alternatives.length > 0) {
        transcript = alternatives[0].transcript || "";
      }
    }

    return new Response(
      JSON.stringify({
        transcript: transcript,
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
};
