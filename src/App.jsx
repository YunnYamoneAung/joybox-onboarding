import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { initLiff, getUserProfile } from './liff'; // removed ensureLogin (we'll handle login manually)
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

// Detect whether we just came back from LINE
function isReturningFromLine() {
  const qp = new URLSearchParams(window.location.search);
  return qp.has('code') || qp.has('liff.state') || qp.has('state');
}

function AppInner() {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Initialize LIFF (no auto-login)
        await initLiff();

        // 2️⃣ If returning from LINE consent page
        if (isReturningFromLine()) {
          // 3️⃣ Fetch user profile + ID token
          const u = await getUserProfile();
          setUser(u);

          // 4️⃣ Clean up URL and go to /confirm
          navigate('/confirm', { replace: true });
        }
      } catch (e) {
        console.error('LIFF init or profile failed:', e);
      } finally {
        setBooted(true);
      }
    })();
  }, [navigate]);

  if (!booted) return <Loader />;

  return (
    <Routes>
      {/* entry */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/signup" element={<SignUp onSuccess={() => navigate('/landing', { replace: true })} />} />

      {/* after LINE login */}
      <Route path="/confirm" element={user ? <Confirm user={user} /> : <Navigate to="/" replace />} />
      <Route path="/profile-setup" element={user ? <ProfileSetup user={user} onDone={() => navigate('/landing', { replace: true })}/> : <Navigate to="/" replace />} />

      {/* app landing */}
      <Route path="/landing" element={<Landing user={user} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppInner />;
}
