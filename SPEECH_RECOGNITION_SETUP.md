# Speech Recognition Setup Guide

## The Problem
The Web Speech API requires **HTTPS** to work in modern browsers. Your dev server is running on HTTP (http://localhost:5173), which causes the "Network error" when trying to use the microphone.

## Solution: Use ngrok for HTTPS Tunnel

### Step 1: Install ngrok
```bash
# macOS with Homebrew
brew install ngrok

# Or download from: https://ngrok.com/download
```

### Step 2: Start your dev server (in one terminal)
```bash
cd /Users/tripathd/Downloads/Manual\ Library/Projects/NudiGO
npm run dev
```

### Step 3: Create HTTPS tunnel (in another terminal)
```bash
ngrok http 5173
```

This will output something like:
```
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:5173
```

### Step 4: Test Speech Recognition
1. Open the ngrok URL in your browser: **https://abc123def456.ngrok.io**
2. Go to a speaking exercise
3. Click the microphone button - it should now work!

## Why This Works
- ngrok creates a secure HTTPS tunnel to your local dev server
- The browser sees a real HTTPS URL and allows Web Speech API access
- Your microphone will work properly now

## Alternative: Local HTTPS with mkcert (Advanced)
If you want persistent local HTTPS without ngrok:
```bash
# Install mkcert
brew install mkcert nss

# Create local CA
mkcert -install

# Generate certificate
mkcert localhost 127.0.0.1

# This creates localhost.pem and localhost-key.pem
# Then configure Vite to use HTTPS (see vite.config.ts)
```

## Notes
- The ngrok URL changes each time you restart ngrok
- Free ngrok accounts have session limits (~2 hours)
- For production, deploy to a real HTTPS server (Vercel, Netlify, etc.)
