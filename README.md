# NudiGO: Learn Kannada Like You Actually Speak It

A voice-first language learning app designed for Bengaluru. Stop pretending. Start speaking.

---

## 🚀 APP IS NOW LIVE

### Please visit: **https://nudigo.openbuilder.in**

The app is fully functional and ready to test. Try it out now:
- Use the Voice Translator to translate English to Kannada instantly
- Chat with the AI Tutor and learn conversationally
- Complete lessons and practice speaking
- Experience real-world missions in Kannada

**We would love your feedback and support. Please visit the link above and test the app!**

---

![NudiGO Logo](./docs/images/landing.png)

## The Problem

You moved to Bengaluru. Everyone speaks Kannada. But textbooks taught you formal grammar nobody uses. You need real phrases for real situations: ordering filter coffee, negotiating auto fares, actually fitting in.

## The Solution

NudiGO teaches you the Kannada that works. Voice-first. Conversational. Built for Bengaluru life.

---

## Features Overview

| Feature | Description | Purpose |
|---------|-------------|---------|
| **Voice Translator** | Speak English, get Kannada instantly. Switch directions anytime. | Quick translations with native pronunciation |
| **AI Tutor** | Conversational teacher that adapts to your level. Speaks back to you. | Structured learning with real-time feedback |
| **5-Min Lessons** | Bite-sized lessons on practical Kannada phrases. | Learn anytime, anywhere |
| **Speaking Practice** | Record yourself, get feedback from AI. | Build confidence through practice |
| **Real-World Missions** | Complete tasks in Kannada (order coffee, ask directions). | Apply what you learned to real situations |
| **Progress Tracking** | See what you've learned, where you excel, what needs work. | Stay motivated with visible progress |
| **Responsive Design** | Works perfectly on mobile and desktop. | Learn anywhere, anytime |
| **Level Adaptation** | Beginner, Intermediate, Advanced modes. | Perfect difficulty for your skill level |

---

## Feature Showcase

### 1. Landing Page: The Hook

![Landing Page](./docs/images/landing.png)

**What you see:**
- Bold headline: "Stop pretending. Start speaking."
- Animated yellow section with auto rickshaw driver mascot
- Floating Kannada text that reacts to interaction
- One-click entry: "Start free"

**Why it matters:**
- Immediate emotional connection to Bengaluru culture
- No sign-up friction
- Visual feedback builds engagement

---

### 2. Voice Translator: Instant Translation

![Translator](./docs/images/translator.png)

**How it works:**
1. Click "Speak" button
2. Mascot grows as you talk (real-time feedback)
3. Say something in English (e.g., "Give me one coffee")
4. Click "Stop"
5. Get instant Kannada with pronunciation

**Example:**
- You speak: "How much does this cost?"
- App shows:
  - Kannada: ಇದರ ಬೆಲೆ ಎಷ್ಟು?
  - Transliteration: Idara bele eshtu?
  - Meaning: How much is this?
  - Click speaker icon to hear native pronunciation

**Switch feature:**
- Click the "↔ Switch" button
- Now say something in Kannada
- Get English translation instantly

---

### 3. AI Tutor: Your Personal Teacher

![Tutor](./docs/images/tutor.png)

**How it works:**
1. Choose your level: Beginner, Intermediate, Advanced
2. Click "Speak" and ask anything
3. AI tutor responds in 2-3 sentences max
4. Response automatically spoken back to you
5. Continue conversation for deeper learning

**What makes it special:**
- Conversation history carried forward (context matters)
- Adapts explanations to your level
- Teaches real Bengaluru Kannada
- Asks follow-up questions to check understanding
- No markdown chaos, clean text output

**Example conversation:**
- You: "How do I ask for directions?"
- Tutor: "Say 'Rastey gotanage' (ರಸ್ತೆ ಗೊತ್ತಾಗೆ). Means 'show me the way.' Locals say 'muggu haki' too."
- You: "What if I'm in an auto?"
- Tutor: "Tell driver 'meter haki' (meter on) or just the location. 'Indiranagar police station' works fine."

---

### 4. Lessons: 5-Min Bites

![Lessons](./docs/images/learn.png)

**What's included:**
- Common phrases from daily Bengaluru life
- Auto conversations, coffee shop orders, local slang
- Audio pronunciations for each phrase
- Transliteration for easy reading
- Simple explanations of grammar (when needed)

**Topics covered:**
- Greetings and small talk
- Ordering food and drinks
- Asking for directions
- Shopping and bargaining
- Local Bengaluru slang
- Emergency phrases

---

### 5. Speaking Practice: Build Confidence

![Practice](./docs/images/practice.png)

**How it works:**
1. AI gives you a phrase to practice (in English)
2. You record yourself saying it in Kannada
3. AI evaluates pronunciation and gives feedback
4. Tips to improve next time

**What you practice:**
- Pronunciation of tricky Kannada sounds
- Sentence construction
- Conversational flow
- Confidence building

---

### 6. Missions: Real-World Application

![Missions](./docs/images/missions.png)

**Mission types:**
- Order a coffee at a local café
- Ask an auto driver for directions
- Buy something at a market (negotiate price)
- Strike up a conversation with a stranger
- Handle a small conflict politely

**How it works:**
1. Scenario is described
2. You speak in Kannada
3. AI simulates the other person's response
4. You continue the conversation
5. Feedback on your performance

**Why it matters:**
- Builds real-world conversation skills
- Reduces anxiety for actual use
- Tracks your progress through missions

---

### 7. User Profile: Track Progress

![Profile](./docs/images/profile.png)

**What's tracked:**
- Lessons completed
- Practice sessions done
- Missions accomplished
- Phrases learned
- Level progression
- Streak (days in a row)
- Overall proficiency score

**Gamification:**
- Badges for milestones (first lesson, 7-day streak, 50 phrases learned)
- Level progression (Beginner > Intermediate > Advanced)
- Stats dashboard showing your journey

---

### 8. Responsive Design: Mobile and Desktop

![Responsive](./docs/images/responsive.png)

**Mobile experience:**
- Touch-friendly buttons
- Bottom navigation bar (always accessible)
- Portrait and landscape modes both work
- Fast loading (optimized for 4G)

**Desktop experience:**
- Wider content area with sidebar nav
- Larger text for easier reading
- Mouse + keyboard support
- Full-featured interface

---

## How the App Actually Works

### User Journey: First Time Using NudiGO

```
1. Land on website
2. See hero section with mascot
3. Click "Start free"
4. Optional: Enter your name
5. Choose what you want to do:
   - Translator: Immediate translation needs
   - Tutor: Learn conversationally
   - Lessons: Structured learning
   - Practice: Build speaking skills
   - Missions: Real-world application
6. Use the feature
7. Track progress in Profile
```

### Feature Deep Dive: Translator

**Step by step:**

Step 1: User clicks "Speak" button
Step 2: Browser asks for microphone permission (one-time)
Step 3: Microphone activates, mascot shows recording state
Step 4: User speaks English (e.g., "How are you?")
Step 5: User clicks "Stop"
Step 6: Audio sent to Google Cloud Speech-to-Text API
Step 7: API returns Kannada transcript
Step 8: Kannada transcript sent to Groq LLM for polish
Step 9: LLM returns formatted response:
   KANNADA: ನೀವು ಹೇಗಿದ್ದೀರಿ?
   TRANSLITERATION: Neevu hegiddiri?
   MEANING: How are you?
Step 10: User sees results on screen
Step 11: User clicks speaker icon
Step 12: Browser's TTS reads Kannada aloud with Kannada voice
Step 13: User hears native pronunciation

**Key technologies:**
- MediaRecorder API (browser microphone access)
- Google Cloud Speech-to-Text (STT)
- Groq API (LLM for polishing)
- Web Speech Synthesis API (TTS)

---

### Feature Deep Dive: AI Tutor

**Conversation flow:**

Step 1: User selects level (Beginner, Intermediate, Advanced)
Step 2: User clicks "Speak"
Step 3: Microphone activates
Step 4: User asks question (e.g., "How do I introduce myself?")
Step 5: User clicks "Stop"
Step 6: Transcribed to text via Google Speech API
Step 7: Text + conversation history sent to Groq LLM
Step 8: System prompt tells AI:
   "You are a Kannada teacher for beginners in Bengaluru.
    Keep responses to 2-3 lines max.
    Use real Bengaluru context (autos, filter coffee, local phrases).
    Respond in Kannada when teaching Kannada."
Step 9: LLM generates response
Step 10: Response added to conversation history
Step 11: Response shown in chat bubble
Step 12: Response automatically read aloud via TTS
Step 13: User hears tutor's response
Step 14: User can click "Replay" to hear again
Step 15: Conversation continues (history carries forward)

**What makes it smart:**
- Tracks conversation history (context matters)
- Adapts difficulty to your level
- Detects language of response (Kannada vs English)
- Uses appropriate voice for TTS
- Keeps responses concise (2-3 lines max)

---

## Technical Architecture

### Technology Stack

**Frontend:**
- React (UI components)
- TanStack Start (routing + backend)
- TypeScript (type safety)
- Tailwind CSS (styling)

**APIs Used:**
- Google Cloud Speech-to-Text (speech recognition)
- Groq API (AI language model, free tier)
- Supabase (authentication, database)

**Browser APIs:**
- MediaRecorder API (audio recording)
- Web Speech Synthesis API (text-to-speech)
- getUserMedia() (microphone access)

### Data Flow

```
User Input (Voice)
       |
       v
Browser MediaRecorder
       |
       v (Audio Blob -> Base64)
Google Cloud Speech-to-Text API
       |
       v (Transcript)
Groq LLM (with system prompt + context)
       |
       v (Response)
Language Detection (Kannada or English?)
       |
       v
Web Speech Synthesis (TTS)
       |
       v
User Output (Audio)
```

### Key Components

**Speech Module (src/lib/speech.ts)**
- Records audio from microphone
- Converts to Base64
- Sends to Google Cloud Speech API
- Detects language in response
- Uses correct voice for TTS

**AI Module (src/lib/ai.ts)**
- System prompts for translator and tutor
- Handles conversation history
- Calls Groq API with formatted messages
- Streams responses character by character

**Translator Component (src/components/ai-teacher-translator.tsx)**
- UI for speaking and translation
- Shows Kannada script + transliteration
- Handles start/stop recording
- Displays results

**Tutor Component (src/components/ai-teacher-tutor.tsx)**
- Conversation interface
- Level selector
- Message history display
- Auto-speaking responses

### File Structure

```
NudiGO/
├── src/
│   ├── routes/
│   │   ├── __root.tsx (app root)
│   │   ├── index.tsx (landing)
│   │   ├── ai-teacher.tsx (translator + tutor)
│   │   ├── learn.tsx (lessons)
│   │   ├── practice.tsx (speaking practice)
│   │   ├── missions.tsx (real-world tasks)
│   │   └── profile.tsx (user profile)
│   ├── components/
│   │   ├── app-shell.tsx (persistent nav)
│   │   ├── ai-teacher-translator.tsx
│   │   ├── ai-teacher-tutor.tsx
│   │   └── brand.tsx
│   ├── lib/
│   │   ├── speech.ts (STT + TTS)
│   │   ├── ai.ts (LLM functions)
│   │   ├── auth.ts (authentication)
│   │   └── nb.ts (UI components)
│   └── styles.css
├── public/
│   ├── logo.jpg (mascot)
│   └── manifest.json (PWA config)
├── docs/
│   └── images/ (feature screenshots)
└── README.md (this file)
```

### Environment Variables

```
VITE_GOOGLE_SPEECH_API_KEY=your_google_api_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## How Speech Recognition Works

### Step 1: Recording

When user clicks "Speak":
- Browser requests microphone permission
- MediaRecorder API starts capturing audio
- Audio settings:
  - Echo cancellation: ON
  - Noise suppression: ON
  - Auto gain control: ON

### Step 2: Audio Processing

When user clicks "Stop":
- Audio chunks combined into single blob
- Format: WebM with Opus codec
- Converted to Base64 encoding
- Minimum size validation (500 bytes)

### Step 3: API Call to Google Cloud

```
POST https://speech.googleapis.com/v1/speech:recognize

{
  config: {
    encoding: "WEBM_OPUS",
    languageCode: "kn-IN",  // or en-US
    model: "default"
  },
  audio: {
    content: "base64_encoded_audio"
  }
}
```

### Step 4: Response

```
{
  results: [{
    alternatives: [{
      transcript: "ನಮಸ್ಕಾರ",
      confidence: 0.95
    }]
  }]
}
```

### Why Google Cloud Speech?

- Supports Kannada language (kn-IN)
- High accuracy for Indian accents
- Handles background noise well
- Pay-as-you-go pricing (low cost per request)

---

## How AI Language Model Works

### System Prompts

**For Translator:**
```
You are a Kannada language translator. Translate the given English text 
to Kannada. Keep response VERY SHORT (maximum 2-3 lines).

Format EXACTLY as:
KANNADA: [Kannada script only, no English letters]
TRANSLITERATION: [Roman transliteration only]
MEANING: [One line English meaning]
```

**For Tutor:**
```
You are a Kannada language teacher for beginner learners in Bengaluru.

RESPONSE RULES:
- Maximum 2-3 lines per response
- Keep explanations simple and direct
- For Kannada text, use: Kannada: [script], Transliteration: [roman], Meaning: [English]
- When responding with Kannada, ensure pure Kannada script (no English letters mixed in)
- Use real Bengaluru context (autos, filter coffee, local phrases)
```

### Why Groq API?

- Completely FREE tier (no billing required)
- Fast responses (optimized for low latency)
- Model: openai/gpt-oss-120b (powerful open-source)
- Perfect for educational use case

### Context Management

Translator keeps last response in memory. Tutor maintains full conversation history:

```
messages = [
  { role: "user", content: "How do I say hello?" },
  { role: "assistant", content: "Say Namaskara..." },
  { role: "user", content: "How do I respond?" },
  { role: "assistant", content: "They'll say Namaskara back..." }
]
```

This history is sent with each new request so AI understands context.

---

## How Text-to-Speech Works

### Language Detection

When AI responds, we check for Kannada characters:

```javascript
const hasKannada = /[ಀ-೿]/.test(text);

if (hasKannada) {
  // Use Kannada voice
  utterance.lang = "kn-IN";
} else {
  // Use English voice
  utterance.lang = "en-IN";
}
```

### Voice Selection

```
If Kannada detected:
  - Search system voices for "kn-*" language
  - Use Kannada voice if available
  - Fallback to first available voice

If English detected:
  - Search for "en-IN" (India English)
  - Fallback to "en-*" (any English)
  - Last resort: any available voice
```

### Why This Matters

- Pure Kannada script requires Kannada voice
- English text requires English voice
- Mixing them without detection causes audio to sound broken
- Different voices have different quality levels

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with microphone access
- Google Cloud Speech API key
- Groq API key (free signup)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/nudigo.git
cd nudigo

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your API keys to .env.local
VITE_GOOGLE_SPEECH_API_KEY=your_key_here
VITE_GROQ_API_KEY=your_key_here

# Start development server
npm run dev

# Open http://localhost:8080
```

### Building for Production

```bash
# Build optimized version
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel (or your host)
npm run deploy
```

---

## API Keys Setup

### Google Cloud Speech-to-Text

1. Go to console.cloud.google.com
2. Create new project
3. Enable Speech-to-Text API
4. Create API key (unrestricted)
5. Add to .env.local as VITE_GOOGLE_SPEECH_API_KEY

Cost: ~$0.04 per 15 seconds of audio

### Groq API

1. Go to console.groq.com/keys
2. Sign up (free account)
3. Copy API key
4. Add to .env.local as VITE_GROQ_API_KEY

Cost: Completely FREE (no billing required)

---

## Performance Optimizations

- Speech recognition happens client-side (fast)
- LLM responses streamed character-by-character (feels instant)
- Images optimized and lazy-loaded
- CSS minified and tree-shaken
- Zero unnecessary API calls

---

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14.5+)
- Opera: Full support

Speech APIs require:
- HTTPS (or localhost)
- Microphone permissions
- Modern browser (2020+)

---

## Roadmap

Coming soon:
- Offline mode (cached lessons)
- Social learning (community challenges)
- Progress analytics dashboard
- Video lessons with real speakers
- Spaced repetition system
- Integration with Kannada cinema

---

## Contributing

Contributions welcome! Areas needing help:
- More lesson content
- Kannada transliteration improvements
- UX design refinements
- Performance optimizations

See CONTRIBUTING.md for details.

---

## License

MIT License - feel free to use for educational purposes

---

## Support

Having issues?

Check common problems:
- Microphone not working: Check browser permissions
- API errors: Verify your API keys in .env.local
- Audio sounds broken: Ensure your browser supports Web Speech API
- Slow responses: Check your internet connection

Need help? Open an issue on GitHub.

---

## Meet the Team

Built with passion for Bengaluru by developers who understand the struggle of learning local languages.

---

## The Story

We moved to Bengaluru. We wanted to fit in. But learning Kannada felt impossible with traditional textbooks. So we built NudiGO: a language app that teaches you the Kannada that actually works in real life.

No grammar torture. No cringe. Just real conversations.

**NudiGO: Stop pretending. Start speaking.**

---

Last updated: August 2026
