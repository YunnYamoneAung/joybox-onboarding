// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { initLiff, ensureLogin, getUserProfile } from './liff';

// Your existing pages (keep these files)
import Welcome from './pages/Welcome.jsx';
import SignUp from './pages/SignUp.jsx';           // if you use email signup
import ProfileSetup from './pages/ProfileSetup.jsx';
import Landing from './pages/Landing.jsx';

function Loader() { return <div style={{ padding: 24 }}>Authorizing with LINE…</div>; }

function AppInner() {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await initLiff();
        const ok = ensureLogin();      // redirects to LINE if not logged in
        if (!ok) return;
        const u = await getUserProfile();
        setUser(u);
        // If user just returned from LINE authorization, send them to landing
        if (window.location.pathname === '/' || window.location.pathname === '/login') {
          navigate('/landing', { replace: true });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setBooted(true);
      }
    })();
  }, [navigate]);

  if (!booted) return <Loader />;

  return (
    <Routes>
      {/* Pre-login entry pages (kept for email path) */}
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<SignUp onSuccess={() => navigate('/landing')} />} />

      {/* After LINE auth (or after signup success) */}
      <Route path="/profile-setup" element={<ProfileSetup user={user} />} />
      <Route path="/landing" element={<Landing user={user} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppInner />;
}
