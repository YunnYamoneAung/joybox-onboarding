import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../liff';
import '../styles.css';

export default function Landing({ user }) {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* ─── NAV BAR ───────────────────────────── */}
      <header className="dash-topbar">
        <div className="brand">Joy-Box</div>

        <nav className="nav">
          <NavLink
            to="/landing/dashboard"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/landing/content"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Content
          </NavLink>
          <NavLink
            to="/landing/analytics"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/landing/ai-tools"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            AI Tools
          </NavLink>
        </nav>

        <div className="spacer" />

        <div className="user">
          {/* Clickable creator name → profile setup */}
          <button
            type="button"
            className="btn text"
            onClick={() => navigate('/profile-setup')}
          >
            {user?.name || 'Creator'}
          </button>

          <button className="btn text" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      {/* ─── PAGE CONTENT ───────────────────────── */}
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
