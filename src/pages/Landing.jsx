import React from "react";
import { logout } from "../liff";

function StatCard({ title, value, sub, icon }) {
  return (
    <div className="dash-card">
      <div className="dash-card-head">
        <span>{title}</span>
        <span className="dash-card-icon">{icon}</span>
      </div>
      <div className="dash-card-value">{value}</div>
      <div className="dash-card-sub">{sub}</div>
    </div>
  );
}

function ActivityItem({ title, when, status }) {
  return (
    <div className="activity-item">
      <div className="activity-title">{title}</div>
      <div className="activity-meta">
        <span className="clock">⏱</span> {when}
      </div>
      <span
        className={`pill ${status === "approved" ? "success" : status === "pending" ? "warn" : "neutral"}`}
      >
        {status}
      </span>
    </div>
  );
}

export default function Landing({ user }) {
  // Fallback to session (so it still works after redirect)
  if (!user) {
    try {
      user = JSON.parse(sessionStorage.getItem("user") || "null");
    } catch {}
  }

  const name = user?.name || "Creator";

  return (
    <div className="dash-page">
      {/* Top nav */}
      <header className="dash-topbar">
        <div className="brand">Joy-Box</div>
        <nav className="tabs">
          <a className="active">Dashboard</a>
          <a>Content</a>
          <a>Analytics</a>
          <a>AI Tools</a>
        </nav>
        <div className="grow" />
        <button className="icon-btn" title="Notifications">🔔</button>
        <div className="user-chip">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="avatar xs" />
          ) : (
            <div className="avatar xs">{name.charAt(0)}</div>
          )}
        </div>
        <button className="btn text" onClick={logout}>Log out</button>
      </header>

      {/* Content wrapper */}
      <main className="dash-container">
        <section className="dash-hero">
          <h1>Welcome, {name}!</h1>
          <p className="muted">Here’s what’s happening with your content today.</p>
        </section>

        {/* Filters */}
        <section className="dash-filters">
          <label className="field">
            <span>Data Range</span>
            <select defaultValue="7"> 
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
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
              <option value="approved">Approved</option>
              <option value="in-review">In review</option>
              <option value="pending">Pending</option>
            </select>
          </label>

          <label className="field">
            <span>Campaigns</span>
            <select defaultValue="all">
              <option value="all">All campaigns</option>
              <option value="spring">Spring Launch</option>
              <option value="summer">Summer Growth</option>
            </select>
          </label>
        </section>

        {/* KPI cards */}
        <section className="dash-kpis">
          <StatCard title="Total Views" value="12.5k" sub="+18% from last week" icon="👁️" />
          <StatCard title="Engagement" value="89%" sub="+5% from last week" icon="👍" />
          <StatCard title="Growth Rate" value="+23%" sub="Monthly average" icon="↗️" />
        </section>

        {/* Recent Activity */}
        <section className="dash-section">
          <h3>Recent Activity</h3>
          <p className="muted">Your latest content submissions and updates</p>

          <div className="activity-list">
            <ActivityItem
              title="Video: Introduction to Digital Marketing"
              when="2 hours ago"
              status="approved"
            />
            <ActivityItem
              title="Article: 10 Tips for Better Content"
              when="5 hours ago"
              status="pending"
            />
            <ActivityItem
              title="Workshop: Advanced SEO Techniques"
              when="1 day ago"
              status="in-review"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
