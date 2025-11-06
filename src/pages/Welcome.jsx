import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initLiff, ensureLogin } from '../liff';

export default function Welcome() {
  const nav = useNavigate();

  const lineLogin = async () => {
    await initLiff();
    const ok = ensureLogin();
    // After LINE returns, App will have a user → you can show confirm
    if (ok) nav('/confirm');
  };

  return (
    <div className="center-wrap">
      <div className="card narrow">
        <h2>Welcome back</h2>
        <p className="muted">Sign in quickly via LINE or email.</p>

        <button className="btn line" onClick={lineLogin}>
          Continue with LINE
        </button>

        <div className="sep"><span>or</span></div>

        <button className="btn ghost" onClick={() => nav('/signup')}>
          Sign in with Email
        </button>

        <p className="fine">By continuing, you agree to our Terms & Privacy Policy.</p>
      </div>
    </div>
  );
}
