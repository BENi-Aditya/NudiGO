# NudiGO API Setup Guide

## Quick Overview
Your app needs 3 things to work fully:
1. **Claude API** - for AI chat tutor
2. **Google OAuth** - for "Sign in with Google"
3. **Supabase** - for user accounts and cloud sync

---

## 1. CLAUDE API (AI Chat Tutor)

### What is it?
Powers the AI conversation feature where learners practice with an AI tutor.

### How to get your key:

**If you have a key from Agent Router or Anthropic:**
1. Find your API key (it starts with `sk-ant-`)
2. Open the `.env` file in your project root
3. Find this line:
   ```
   VITE_AI_API_KEY=sk-ant-PASTE_YOUR_ANTHROPIC_KEY_HERE
   ```
4. Replace `PASTE_YOUR_ANTHROPIC_KEY_HERE` with your actual key
5. Save the file

**If you need to get a free key:**
1. Go to: https://console.anthropic.com
2. Sign up or log in
3. Click on "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)
6. Paste it in your `.env` file as shown above

### Verify it works:
- Restart your dev server: `npm run dev`
- The app will use your Claude API for AI chat features

---

## 2. GOOGLE OAUTH (Sign in with Google)

### What is it?
Lets users click "Sign in with Google" instead of entering email/password.

### How to get credentials:

**Step 1: Create a Google Cloud Project**
1. Go to: https://console.cloud.google.com
2. At the top, click on the project dropdown
3. Click "New Project"
4. Enter name: "NudiGO" (or your app name)
5. Click "Create"
6. Wait 1-2 minutes for it to be created

**Step 2: Enable Google+ API**
1. In Google Cloud Console, search for "Google+ API"
2. Click on it
3. Click the "Enable" button (blue)
4. Wait for it to enable

**Step 3: Create OAuth Credentials**
1. Go to "APIs & Services" → "Credentials" (left sidebar)
2. Click "+ Create Credentials" (blue button at top)
3. Choose "OAuth 2.0 Client ID"
4. If asked, click "Configure OAuth consent screen" first
5. In OAuth consent screen:
   - User type: Select "External"
   - Click "Create"
   - App name: "NudiGO"
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
   - Skip optional scopes, click "Save and Continue"
   - Click "Back to Dashboard"

**Step 4: Get Your Client ID and Secret**
1. Back in "Credentials", click "+ Create Credentials" again
2. Choose "OAuth 2.0 Client ID"
3. Application type: "Web application"
4. Name: "NudiGO Web"
5. Scroll to "Authorized JavaScript origins" and click "Add URI"
   - Add: `http://localhost:5173`
6. Scroll to "Authorized redirect URIs" and click "Add URI"
   - Add: `http://localhost:5173/auth`
7. Click "Create"
8. A popup appears with your credentials:
   - Copy the **Client ID** (long string ending in `.apps.googleusercontent.com`)
   - Copy the **Client Secret** (short string)

**Step 5: Add to `.env` file**
1. Open `.env` in your project
2. Find these lines:
   ```
   VITE_GOOGLE_CLIENT_ID=PASTE_YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_SECRET=PASTE_YOUR_GOOGLE_CLIENT_SECRET_HERE
   ```
3. Replace with your actual Client ID and Secret
4. Save

**For Production:**
When you deploy to Vercel/Netlify, add your production URLs:
- In Google Cloud Console → Credentials
- Edit the OAuth 2.0 Client ID
- Add to "Authorized JavaScript origins": `https://yourdomain.com`
- Add to "Authorized redirect URIs": `https://yourdomain.com/auth`

---

## 3. SUPABASE (User Accounts & Cloud Sync)

### What is it?
A database service that stores user accounts and their progress across devices.

### How to set up:

**Step 1: Create Supabase Account**
1. Go to: https://supabase.com
2. Click "Sign In"
3. Sign in with GitHub (easiest) or create account
4. Click "New Project"
5. Organization: Create one or use existing
6. Project name: "NudiGO"
7. Database password: Create a strong password (save it somewhere)
8. Region: Choose closest to your location
9. Click "Create new project"
10. Wait 2-3 minutes for it to initialize

**Step 2: Get Your API Keys**
1. In Supabase dashboard, click "Project Settings" (gear icon)
2. Click "API" in left sidebar
3. You'll see:
   - **Project URL** - Copy this
   - **Project API Keys** section with two keys:
     - `anon` key (public, safe to expose)
     - `service_role` key (private, keep secret)

**Step 3: Add to `.env` file**
1. Open `.env` in your project
2. Find these lines:
   ```
   VITE_SUPABASE_URL=https://PASTE_YOUR_PROJECT_REF_HERE.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=PASTE_YOUR_SUPABASE_ANON_KEY_HERE
   SUPABASE_URL=https://PASTE_YOUR_PROJECT_REF_HERE.supabase.co
   SUPABASE_PUBLISHABLE_KEY=PASTE_YOUR_SUPABASE_ANON_KEY_HERE
   SUPABASE_SERVICE_ROLE_KEY=PASTE_YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
   ```
3. Replace:
   - `PASTE_YOUR_PROJECT_REF_HERE` with your project ref (from URL)
   - `PASTE_YOUR_SUPABASE_ANON_KEY_HERE` with the `anon` key
   - `PASTE_YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE` with the `service_role` key
4. Save

**Step 4: Create Database Tables (Optional for now)**
- The app works without this for now
- Full setup requires creating `users` and `progress` tables
- We can do this later when you're ready

---

## Final Checklist

After filling in all keys:

- [ ] Pasted Claude API key in `.env`
- [ ] Pasted Google Client ID in `.env`
- [ ] Pasted Google Client Secret in `.env`
- [ ] Pasted Supabase URL in `.env`
- [ ] Pasted Supabase anon key in `.env`
- [ ] Pasted Supabase service role key in `.env`
- [ ] Saved `.env` file
- [ ] Restarted dev server (`npm run dev`)

---

## Where to Find `.env` File

In VS Code or your editor:
- Open the project folder
- Look for `.env` at the root level (same level as `package.json`)
- All your keys go there

---

## Testing

After setting up:

1. **Claude API:** Try the AI chat feature (if implemented in UI)
2. **Google OAuth:** Look for "Sign in with Google" button on login page
3. **Supabase:** Create an account and verify your progress saves

---

## Troubleshooting

**"API key not found" error:**
- Make sure `.env` file is in the project root
- Restart dev server after saving `.env`
- Check spelling of variable names (must match exactly)

**Google OAuth button doesn't work:**
- Make sure you added `http://localhost:5173` to Google Cloud Console
- Check that Client ID and Secret are correct
- Restart dev server

**Supabase not saving progress:**
- Verify all three Supabase keys are filled in correctly
- Check that the keys match between `VITE_` and non-`VITE_` versions

---

## Questions?

All three services have free tiers that cover development and small apps. You can always upgrade later.
