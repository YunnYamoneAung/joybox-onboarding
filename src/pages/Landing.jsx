// src/pages/Landing.jsx
import React from 'react';
import { logout } from '../liff';

export default function Landing({ user }) {
  return (
    <div className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">Joy-Box</div>
        <nav className="tabs">
          <a className="active">Dashboard</a>
          <a href="/content">Content</a>
          <a href="/analytics">Analytics</a>
          <a href="/ai-tools">AI Tools</a>
        </nav>
        <div className="spacer" />
        <div className="user">
          <span>{user?.name || 'Creator'}</span>
          <button className="btn text" onClick={logout}>Log out</button>
        </div>
      </header>

      <main className="container gap">
        {/* Hero / Filters card */}
        <section className="card">
          <h2>Welcome, Creator!</h2>
          <p className="muted">Here’s what’s happening with your content today.</p>

          <div className="grid-2" style={{gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16}}>
            <label className="field">
              <span>Data Range</span>
              <select defaultValue="7d">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </label>

            <label className="field">
              <span>Content Types</span>
              <select defaultValue="all">
                <option value="all">All types</option>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="workshop">Workshop</option>
              </select>
            </label>

            <label className="field">
              <span>Status</span>
              <select defaultValue="submitted">
                <option value="submitted">Submitted</option>
                <option value="in-review">In review</option>
                <option value="approved">Approved</option>
              </select>
            </label>

            <label className="field">
              <span>Campaigns</span>
              <select defaultValue="all-camp">
                <option value="all-camp">All campaigns</option>
                <option value="summer">Summer</option>
                <option value="holiday">Holiday</option>
              </select>
            </label>
          </div>
        </section>

        {/* KPI cards */}
        <section className="grid-2" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
          <div className="card">
            <div className="header-row">
              <h3 style={{marginBottom:0}}>Total Views</h3>
            </div>
            <div style={{fontSize:32, fontWeight:700}}>12.5k</div>
            <div className="fine">+18% from last week</div>
          </div>

          <div className="card">
            <div className="header-row">
              <h3 style={{marginBottom:0}}>Engagement</h3>
            </div>
            <div style={{fontSize:32, fontWeight:700}}>89%</div>
            <div className="fine">+5% from last week</div>
          </div>

          <div className="card">
            <div className="header-row">
              <h3 style={{marginBottom:0}}>Growth Rate</h3>
            </div>
            <div style={{fontSize:32, fontWeight:700}}>+23%</div>
            <div className="fine">Monthly average</div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="card">
          <h3>Recent Activity</h3>
          <div className="table">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>When</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Video: Introduction to Digital Marketing</td>
                  <td>2 hours ago</td>
                  <td><span className="pill">approved</span></td>
                </tr>
                <tr>
                  <td>Article: 10 Tips for Better Content</td>
                  <td>5 hours ago</td>
                  <td><span className="pill warn">pending</span></td>
                </tr>
                <tr>
                  <td>Workshop: Advanced SEO Techniques</td>
                  <td>1 day ago</td>
                  <td><span className="pill warn">in-review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
