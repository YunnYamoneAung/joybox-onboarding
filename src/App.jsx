import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { initLiff, ensureLogin, getUserProfile } from './liff';

import Welcome from './pages/Welcome.jsx';
import SignUp from './pages/SignUp.jsx';
import Confirm from './pages/Confirm.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import Landing from './pages/Landing.jsx';

function Loader() {
  return (
    <div className="center-wrap">
      <div className="card"><h3>Loading…</h3></div>
    </div>
  );
}

function isReturningFromLine() {
  const qp = new URLSearchParams(window.location.search);
  // LIFF/LINE add these on return
  return qp.has('liff.state') || qp.has('code') || qp.has('state');
}

function AppInner() {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Do NOT auto login at boot. Just be ready.
        await initLiff().catch(() => {});
        // If we’re coming back from LINE, finish the flow and go to confirm.
        if (isReturningFromLine()) {
          const ok = ensureLogin();
          if (!ok) return; // will redirect to LINE if session is gone
          const u = await getUserProfile();
          setUser(u);
          // strip query params and show the confirm screen
          navigate('/confirm', { replace: true });
        }
      } finally {
        setBooted(true);
      }
    })();
  }, [navigate]);

  if (!booted) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/signup" element={<SignUp onSuccess={() => navigate('/landing', { replace: true })} />} />

      <Route path="/confirm" element={user ? <Confirm user={user} /> : <Navigate to="/" replace />} />
      <Route path="/profile-setup" element={user ? <ProfileSetup user={user} onDone={() => navigate('/landing', { replace: true })}/> : <Navigate to="/" replace />} />

      <Route path="/landing" element={<Landing user={user} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppInner />;
}
