import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../liff';

export default function Confirm({ user }) {
  const nav = useNavigate();
  return (
    <div className="center-wrap">
      <div className="card narrow center">
        {user?.avatar && <img className="avatar" src={user.avatar} alt="avatar" />}
        <h3>Hi {user?.name}!</h3>
        <p className="muted">Your LINE account is connected.</p>
        <button className="btn primary" onClick={() => nav('/profile-setup')}>Continue</button>
        <button className="btn text" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
