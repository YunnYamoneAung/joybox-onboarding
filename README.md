# React Onboarding (Creator Platform)

A minimal React (Vite) project that implements **onboarding flows** for a creator platform:
- Welcome page
- Sign up (with mock email verification)
- Log in
- Profile setup (display name, bio, interests)
- Progress stepper

## ⚙️ Tech
- React 18, React Router 6
- Vite build
- No backend: uses `localStorage` as a mock auth store

## ▶️ Run locally
```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev
```

Open the printed local URL from the terminal.

## 🧭 App structure
```
src/
  api/mockAuth.js
  components/
    Input.jsx
    ProgressSteps.jsx
  pages/
    Welcome.jsx
    SignUp.jsx
    Login.jsx
    ProfileSetup.jsx
  App.jsx
  main.jsx
  styles.css
index.html
vite.config.js
package.json
```

## 🔁 Onboarding flow
1. **Sign up** → create account (stored in localStorage).
2. **Verify** → enter any 6-digit code (mock) to continue.
3. **Profile setup** → display name, bio, interests.
4. **Done** → back to home.

### Notes
- This is front‑end only and safe to drop into your existing repo.
- Styling is vanilla CSS for portability; add Tailwind/MUI if you prefer.


---

## 🔗 LINE Login (LIFF) Setup

1) Create a **LINE Login** channel at [LINE Developers].  
   - Scopes: `openid profile` (and `email` if needed).  
2) Under the channel, add a **LIFF app**:  
   - Endpoint URL (dev): `http://localhost:5173/`  
   - Enable **OpenID Connect (web login)**.  
3) Copy the **LIFF ID** and create `.env` from `.env.example`:
```
cp .env.example .env
# put your actual LIFF ID
```
4) Install dependency and start dev:
```
npm i
npm i @line/liff
npm run dev
```
5) In the Login page, click **Continue with LINE**. After authorizing, you’ll return to the app and be sent to **Profile Setup**, prefilling your display name from LINE.
