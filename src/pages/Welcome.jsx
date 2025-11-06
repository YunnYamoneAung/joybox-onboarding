import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initLiff, ensureLogin } from '../liff';

export default function Welcome() {
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);

  const lineLogin = async () => {
    try {
      setBusy(true);
      await initLiff();
      // This will redirect to LINE; when we return,
      // App.jsx detects it and goes to /confirm.
      const ok = ensureLogin();
      if (ok) nav('/confirm');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="card narrow">
        <h2>Welcome</h2>
        <p className="muted">Choose a sign-in method.</p>

        <button className="btn line" onClick={lineLogin} disabled={busy}>
          {busy ? 'Opening LINE…' : 'Continue with LINE'}
        </button>

        <div className="sep"><span>or</span></div>

        <button className="btn ghost" onClick={() => nav('/signup')} disabled={busy}>
          Sign in with Email
        </button>
      </div>
    </div>
  );
}
