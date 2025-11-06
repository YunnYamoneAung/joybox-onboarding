import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { initLiff, ensureLogin, getUserProfile } from './liff';

import Welcome from './pages/Welcome.jsx';
import SignUp from './pages/SignUp.jsx';
import Confirm from './pages/Confirm.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import Landing from './pages/Landing.jsx';

function Loader() { return <div className="center-wrap"><div className="card"><h3>Authorizing with LINE…</h3></div></div>; }

function AppInner() {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Boot LIFF & read profile if returning from LINE
  useEffect(() => {
    (async () => {
      try {
        await initLiff();
        const ok = ensureLogin();       // if not logged in, it will redirect
        if (!ok) return;
        const u = await getUserProfile();
        setUser(u);
      } catch (e) {
        // If LIFF fails (e.g., using email path), ignore
        console.debug('LIFF not used or failed; continuing email path.', e?.message);
      } finally {
        setBooted(true);
      }
    })();
  }, []);

  if (!booted) return <Loader />;

  return (
    <Routes>
      {/* Entry */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/signup" element={<SignUp onSuccess={() => navigate('/landing', { replace: true })} />} />

      {/* After LINE auth */}
      <Route path="/confirm" element={user ? <Confirm user={user} /> : <Navigate to="/" replace />} />
      <Route path="/profile-setup" element={user ? <ProfileSetup user={user} onDone={() => navigate('/landing', { replace: true })}/> : <Navigate to="/" replace />} />

      {/* App home */}
      <Route path="/landing" element={<Landing user={user} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppInner/>;
}
