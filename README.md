# NudiGO — Learn Kannada. One conversation at a time.

A responsive, gamified app for learning practical Kannada — the kind you actually
use ordering coffee, taking an auto, or meeting people in Bangalore. Guided path →
lessons → speaking → AI roleplay → real-world missions, with XP, streaks and levels.

Works beautifully on mobile and desktop. Built with **TanStack Start** (React 19, SSR), 
**Tailwind CSS v4**, a neo-brutalist design system, and **Supabase** (optional) for 
accounts and cloud sync.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL the dev server prints (typically `http://localhost:8080`).
If that port is busy, run `npm run dev -- --port 3000`.

The app is **local-first**: the full learning loop works with no backend and no
keys — your progress is saved in the browser. Supabase is only needed for accounts
and syncing progress across devices (see below).

## Environment variables (optional — enables accounts, cloud sync & AI features)

Copy `.env.example` to `.env` and fill in your keys:

**Supabase** (for accounts and cloud sync):
- `VITE_SUPABASE_URL` — public URL (find in Supabase → Project Settings → API)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public anon key
- `SUPABASE_URL` — server-side URL
- `SUPABASE_PUBLISHABLE_KEY` — server-side anon key
- `SUPABASE_SERVICE_ROLE_KEY` — **secret** — never expose or commit

**AI Conversation API** (for roleplay scenarios with an AI tutor):
- `VITE_AI_API_PROVIDER` — `openai` or `anthropic` (or omit for mock responses)
- `VITE_AI_API_KEY` — your API key
- `VITE_AI_API_URL` — optional backend proxy (e.g., `http://localhost:3001/api/conversation`)

Without these, the app still has full lesson functionality. Cloud sync shows a setup reminder,
and AI conversation uses mock responses in development.

The database schema lives in [`supabase/migrations`](supabase/migrations) and is
already seeded with the curriculum (7 sections, 30 units, 32 lessons, 48 concepts,
8 achievements).

## Deploy to Vercel

The Nitro deploy preset is set to `vercel` in [`vite.config.ts`](vite.config.ts),
so `npm run build` emits Vercel's Build Output API (`.vercel/output`), and
[`vercel.json`](vercel.json) tells Vercel to serve it.

1. Import the repo in Vercel (Framework preset: **Other**).
2. Add the environment variables above under **Settings → Environment Variables**
   (add the `VITE_*` ones to *Build*, all of them to *Production*/*Preview*).
3. Deploy. Build command `npm run build`, no output directory override needed.

To build for a different host: `NITRO_PRESET=node-server npm run build` (or any
[Nitro preset](https://nitro.build/deploy)).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (Vercel output by default) |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-format with Prettier |

## How it's built

**Content is data, logic is separate from UI** (PRD rule 6):

- `src/data/` — curriculum, generated exercises, missions, scenarios, achievements,
  onboarding options. Mirrors the Supabase schema so screens render offline.
- `src/lib/progress.tsx` — the state engine: XP, streaks, spaced-review mastery,
  missions, achievements. Persists to localStorage and syncs to Supabase when
  signed in.
- `src/lib/auth.tsx` — Supabase Auth wrapper (no-op when unconfigured).
- `src/lib/sync.ts` — best-effort Supabase reads/writes (profile + progress).
- `src/components/exercise-views.tsx` — the exercise renderers (intro, multiple
  choice, listening, word bank, speaking).

**Routes** (`src/routes/`): `/` landing · `/onboarding` (5 steps) · `/learn`
(path + home) · `/lesson/$lessonId` (engine + completion + mission) · `/practice`
(review, speaking, AI roleplay) · `/roleplay/$scenarioId` · `/missions` ·
`/profile` · `/auth`.

Speaking uses the browser's Web Speech API; AI roleplay is a scripted, offline
conversation engine (`src/lib/roleplay.ts`) that a real LLM can slot into later.

---

Originally scaffolded with [Lovable](https://lovable.dev) — see
[`AGENTS.md`](AGENTS.md) for the git/sync guidance.
