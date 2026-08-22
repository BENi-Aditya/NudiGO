import { createServerFn } from '@tanstack/start';

export const transcribeAudio = createServerFn(
  { method: 'POST' },
  async (audioBase64: string) => {
    try {
      console.log('[Server] Transcribing audio...');

      const apiKey = process.env.ASSEMBLYAI_API_KEY;
      if (!apiKey) {
        return { transcript: '', error: 'API key not configured' };
      }

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
        return { transcript: '', error: `Error: ${response.status}` };
      }

      const result = await response.json();
      console.log('[Server] Transcript:', result.text);

      return { transcript: result.text || '' };
    } catch (error) {
      console.error('[Server] Error:', error);
      return { transcript: '', error: String(error) };
    }
  }
);
