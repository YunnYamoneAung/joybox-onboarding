import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../liff';

export default function Landing({ user }) {
  return (
    <div className="page">
      {/* ─── NAV BAR ───────────────────────────── */}
      <header className="dash-topbar">
        <div className="brand">Joy-Box</div>
        <nav className="tabs">
          <NavLink to="/landing/dashboard" end>Dashboard</NavLink>
          <NavLink to="/landing/content">Content</NavLink>
          <NavLink to="/landing/analytics">Analytics</NavLink>
          <NavLink to="/landing/ai-tools">AI Tools</NavLink>
        </nav>
        <div className="spacer" />
        <div className="user">
          <span>{user?.name || 'Creator'}</span>
          <button className="btn text" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* ─── PAGE CONTENT ───────────────────────── */}
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
