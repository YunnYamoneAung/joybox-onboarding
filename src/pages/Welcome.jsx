import React from 'react';
import { initLiff, ensureLogin } from '../liff';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const handleLine = async () => {
    await initLiff();
    const ok = ensureLogin();        // will redirect if not logged in
    if (ok) navigate('/landing');
  };

  return (
    <div style={{ maxWidth: 420, margin: '48px auto', textAlign: 'center' }}>
      <h2>Sign in</h2>
      <button onClick={handleLine}>Continue with LINE</button>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate('/signup')}>Use email instead</button>
      </div>
    </div>
  );
}
