import { createServerFn } from '@tanstack/start';

export const transcribeAudio = createServerFn('POST /api/transcribe', async (audioBase64: string) => {
  try {
    console.log('[Server] Received audio for transcription');

    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
      console.error('[Server] Missing ASSEMBLYAI_API_KEY');
      return { transcript: '', error: 'Speech service not configured' };
    }

    console.log('[Server] Calling AssemblyAI...');
    const response = await fetch('https://api.assemblyai.com/v2/transcribe', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio_data: audioBase64,
        encoding: 'webm',
        language_code: 'kn',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Server] AssemblyAI error:', error);
      return { transcript: '', error: `AssemblyAI error: ${response.status}` };
    }

    const result = await response.json();
    console.log('[Server] Got transcript:', result.text);

    return {
      transcript: result.text || '',
    };
  } catch (error) {
    console.error('[Server] Error:', error);
    return { transcript: '', error: String(error) };
  }
});
