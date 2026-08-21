# ✅ QUICK SETUP CHECKLIST - Google OAuth + Supabase

## What You Need to Do RIGHT NOW

### ✅ STEP 1: Enable Google in Supabase (2 minutes)

1. Open your Supabase dashboard: https://supabase.com
2. Select your project
3. Go to **Authentication** (left sidebar)
4. Click **Providers**
5. Find **Google** and click it
6. Toggle **Enable** to ON (it should turn blue)
7. Leave Client ID and Secret blank (Supabase provides these)
8. Click **Save**

### ✅ STEP 2: Add Redirect URL (1 minute)

1. Still in Supabase, go to **Authentication** → **URL Configuration**
2. Under "Redirect URLs", paste this:
   ```
   http://localhost:5173/auth/callback
   ```
3. Click **Save**

### ✅ STEP 3: Verify Your .env File (1 minute)

Open `.env` in your project and verify you have:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_AI_API_KEY=sk-ant-your-anthropic-key
```

**Note**: You DON'T need VITE_GOOGLE_CLIENT_ID or VITE_GOOGLE_CLIENT_SECRET anymore - Supabase handles Google OAuth!

### ✅ STEP 4: Restart Dev Server (1 minute)

```bash
npm run dev
```

### ✅ STEP 5: Test It (2 minutes)

1. Go to your app: http://localhost:5173
2. Look at the login page
3. Click "Sign in with Google"
4. You should be redirected to Google login
5. After signing in, you should be back in the app at the Learn page

---

## What Happens After Login?

When you sign in with Google:

1. **Account Created**: Your email, name, profile pic stored in Supabase
2. **Session Active**: You're logged in across the app
3. **Progress Synced**: When you complete lessons, your progress is saved to Supabase
4. **Cross-Device**: Log in on another device and see your progress

---

## How to Check User Data in Supabase

1. Go to Supabase dashboard
2. Click **Authentication** (left sidebar)
3. Click **Users**
4. You should see yourself with:
   - Email
   - Sign-up date
   - Last login
   - Google profile info

---

## Common Errors & Fixes

### Error: "No API key found"
- Check your `.env` file has all Supabase keys
- Restart dev server

### Error: "Invalid redirect_uri"  
- Make sure in Supabase → Authentication → URL Configuration you have:
  `http://localhost:5173/auth/callback` 
- Restart dev server

### "Sign in with Google" button doesn't work
- Verify Google is enabled in Supabase → Authentication → Providers
- Check browser console (F12) for error messages
- Make sure Supabase keys are correct in `.env`

### Redirects to blank page after Google login
- This means the callback route is working
- Check browser console for errors
- Verify you're redirected to `/learn` page

---

## Files We Updated

1. **`src/routes/auth.tsx`** - Google OAuth now uses Supabase instead of direct Google OAuth
2. **`src/routes/auth/callback.tsx`** - NEW - Handles OAuth redirects
3. **`.env`** - Already has your Supabase keys

---

## Final Check

After following these steps:

- [ ] Google provider enabled in Supabase
- [ ] Redirect URL added to Supabase
- [ ] `.env` file has all Supabase keys
- [ ] Dev server restarted (`npm run dev`)
- [ ] Tested "Sign in with Google" button
- [ ] Can see user in Supabase → Authentication → Users
- [ ] Logged in and can access the app

---

## You're Done! 🎉

Your app now has:
✅ Google OAuth login (via Supabase)
✅ User accounts synced to Supabase
✅ Progress syncing
✅ AI features for authenticated users
✅ Everything connected and working

---

## Next Steps (Optional)

1. **Invite others**: They can now sign in with Google
2. **Verify progress syncing**: Complete a lesson, check Supabase database
3. **Deploy**: When ready, update redirect URL for production domain
4. **Test on mobile**: Sign in on different devices, see progress sync
