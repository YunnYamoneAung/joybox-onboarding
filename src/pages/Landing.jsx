import React from "react";
import { logout } from "../liff";

export default function Landing({ user }) {
  const displayName = user?.name || "Creator";
  const avatar = user?.avatar;

  return (
    <div className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">Joy-Box</div>
        <nav className="nav">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Content</a>
          <a href="#">Analytics</a>
          <a href="#">AI Tools</a>
        </nav>
        <div className="spacer" />
        <div className="user">
          {avatar && <img className="avatar xs" src={avatar} alt="" />}
          <span>{displayName}</span>
          <button className="btn text" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* Main */}
      <main className="container gap">
        {/* Greeting */}
        <section className="card">
          <h2>Welcome, {displayName}!</h2>
          <p className="muted">Here’s what’s happening with your content today.</p>

          {/* Filters row */}
          <div className="filters">
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
              <select defaultValue="all">
                <option value="all">All campaigns</option>
                <option value="summer">Summer 2025</option>
                <option value="fall">Fall 2025</option>
              </select>
            </label>
          </div>
        </section>

        {/* KPIs */}
        <section className="kpi-grid">
          <div className="kpi">
            <div className="meta"><span>Total Views</span><span>👁️</span></div>
            <div className="value">12.5k</div>
            <div className="muted fine">+18% from last week</div>
          </div>

          <div className="kpi">
            <div className="meta"><span>Engagement</span><span>👍</span></div>
            <div className="value">89%</div>
            <div className="muted fine">+5% from last week</div>
          </div>

          <div className="kpi">
            <div className="meta"><span>Growth Rate</span><span>↗</span></div>
            <div className="value">+23%</div>
            <div className="muted fine">Monthly average</div>
          </div>
        </section>

        {/* Upload + Jobs */}
        <section className="grid-2">
          <div className="card">
            <h3>Upload & AI Enhance</h3>
            <p className="muted">Drop files here or click to browse. We’ll apply your selected AI enhancements.</p>
            <div className="dropzone">Upload area</div>

            <div className="grid-2">
              <label className="field">
                <span>Enhancement</span>
                <select defaultValue="clean-up">
                  <option value="clean-up">Clean-up</option>
                  <option value="denoise">Denoise</option>
                  <option value="sharpen">Sharpen</option>
                </select>
              </label>
              <label className="field">
                <span>Notes</span>
                <input placeholder="Optional brief" />
              </label>
            </div>

            <div className="actions">
              <button className="btn primary">Process</button>
            </div>
          </div>

          <div className="card">
            <h3>Recent Activity</h3>
            <div className="list">
              <div className="row">
                <div>
                  <div className="row-title">Video: Introduction to Digital Marketing</div>
                  <div className="muted fine">2 hours ago</div>
                </div>
                <span className="pill">approved</span>
              </div>

              <div className="row">
                <div>
                  <div className="row-title">Article: 10 Tips for Better Content</div>
                  <div className="muted fine">5 hours ago</div>
                </div>
                <span className="pill warn">pending</span>
              </div>

              <div className="row">
                <div>
                  <div className="row-title">Workshop: Advanced SEO Techniques</div>
                  <div className="muted fine">1 day ago</div>
                </div>
                <span className="pill neutral">in-review</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
