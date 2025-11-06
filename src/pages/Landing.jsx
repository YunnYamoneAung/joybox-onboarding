// src/pages/Landing.jsx
import React from 'react';
import { logout } from '../liff';

export default function Landing({ user }) {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto' }}>
      <h2>Welcome to Joy Box</h2>
      {user && (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', margin: '16px 0' }}>
          {user.avatar && <img src={user.avatar} alt="" width="64" height="64" style={{ borderRadius: '50%' }} />}
          <div>
            <div><b>Name:</b> {user.name}</div>
            {user.email && <div><b>Email:</b> {user.email}</div>}
          </div>
        </div>
      )}
      <button onClick={logout}>Log out</button>
    </div>
  );
}
