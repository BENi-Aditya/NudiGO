# Complete Google OAuth + Supabase Setup Guide for NudiGO

## Overview

You now have real Google OAuth + Supabase integration. Here's exactly what to do to make it work.

---

## STEP 1: Set Up Google OAuth in Supabase (Not Google Cloud Console)

**Why?** Supabase handles Google OAuth for you - no need to manage it separately.

### In Supabase Dashboard:

1. Go to your Supabase project → **Authentication** (left sidebar)
2. Click **Providers**
3. Find **Google** in the list and click it
4. You'll see two fields:
   - **Client ID**
   - **Client Secret**
5. **Leave these BLANK** - Supabase has its own Google OAuth setup
6. Scroll down and make sure "Enabled" toggle is **ON** (blue)
7. Click **Save**

### That's it! Supabase handles Google OAuth for you.

---

## STEP 2: Configure Redirect URLs in Supabase

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Under "Redirect URLs", add:
   ```
   http://localhost:5173/auth/callback
   https://yourdomain.com/auth/callback
   ```
3. Click **Save**

---

## STEP 3: Remove Google OAuth Keys from .env (Not Needed!)

Since Supabase handles Google OAuth, you **don't need** these keys:
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_SECRET`

**Your `.env` should only have Supabase keys:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
VITE_AI_API_KEY=sk-ant-your-key
```

---

## STEP 4: How Google OAuth Now Works

1. User clicks "Sign in with Google" button
2. App calls `supabase.auth.signInWithOAuth({ provider: "google" })`
3. Redirects to Google login
4. After login, Google redirects to `http://localhost:5173/auth/callback`
5. Our callback route handles it automatically
6. User is logged in and redirected to `/learn`

---

## STEP 5: Test It Works

1. Restart your dev server: `npm run dev`
2. Go to the login page
3. Click "Sign in with Google"
4. You should be redirected to Google login
5. After signing in, you should be redirected back to the app and logged in

**If you see errors:**
- Check browser console (F12) for error messages
- Verify Supabase URL and keys are correct in `.env`
- Make sure Google provider is enabled in Supabase
- Verify redirect URL matches exactly: `http://localhost:5173/auth/callback`

---

## STEP 6: User Data Storage in Supabase

Your user data is now automatically stored! Here's where:

### Automatic Storage
- Email
- Display name
- User ID
- Created at / Last signed in
- Profile picture (from Google)

All stored in Supabase `auth.users` table (built-in).

### Lesson Progress Storage
We'll sync progress to Supabase. This is already set up in `src/lib/progress.tsx`:
- Lessons completed
- Concepts mastered
- XP earned
- Streak count
- All synced to Supabase automatically

---

## STEP 7: Verify User Data is Stored

1. In Supabase dashboard, go to **Authentication** → **Users**
2. You should see your user account with:
   - Email
   - Sign-up date
   - Last sign-in
   - Google profile info

---

## STEP 8: Production Setup (When Ready to Deploy)

### Update Redirect URLs
1. In Supabase, go to **Authentication** → **URL Configuration**
2. Add your production domain:
   ```
   https://yourdomain.com/auth/callback
   ```

### Update .env for Production
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Deploy
```bash
npm run build
# Then deploy to Vercel/Netlify
```

---

## COMMON ISSUES & FIXES

### "Google OAuth not configured"
- Make sure Google provider is **enabled** in Supabase Authentication → Providers
- Restart dev server

### "Invalid redirect_uri"
- Check Supabase → Authentication → URL Configuration
- Make sure your redirect URL is listed exactly: `http://localhost:5173/auth/callback`

### "User not found after callback"
- Check browser console for errors
- Verify Supabase keys in `.env` are correct
- Make sure Google provider is enabled

### User data not showing in Supabase
- Go to **Authentication** → **Users** in Supabase
- Try signing up/in again
- Data should appear within seconds

---

## Architecture Overview

```
Login Page (auth.tsx)
       ↓
[Sign in with Google button]
       ↓
Supabase Auth (signInWithOAuth)
       ↓
Google Login Page
       ↓
Redirect to /auth/callback
       ↓
Callback Route (auth/callback.tsx)
       ↓
Check Supabase session
       ↓
Redirect to /learn (logged in)
       ↓
User data synced to Supabase
```

---

## What's Stored Where

| Data | Location | Synced | Notes |
|------|----------|--------|-------|
| Email | Supabase auth.users | Auto | From Google |
| Name | Supabase auth.users | Auto | From Google |
| Profile Pic | Supabase auth.users | Auto | From Google |
| Lessons Done | Supabase progress table | Auto | From app |
| XP/Streak | Supabase progress table | Auto | From app |
| Mastered Concepts | Supabase progress table | Auto | From app |

---

## Next: Test Everything

1. **Login with Google**
   - Click sign-in button
   - Go through Google login
   - Should end up in /learn

2. **Check Supabase Dashboard**
   - Go to Authentication → Users
   - You should see your account

3. **Complete a Lesson**
   - Progress should sync automatically
   - Check Supabase for progress records

4. **Ask Doubts with AI**
   - During lessons, use AI doubt assistant
   - It will work with your session

---

## You're All Set! 🎉

Google OAuth + Supabase are now fully connected. Users can:
- Sign in with Google
- Have accounts synced across devices
- Progress saved in cloud
- Use AI features as authenticated users
- All data secure in Supabase
