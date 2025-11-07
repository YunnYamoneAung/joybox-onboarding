import React from "react";

export default function Dashboard() {
  return (
    <div className="dash-container">
      <div className="dash-hero">
        <h1>Welcome, Creator!</h1>
        <p className="muted">Here’s what’s happening with your content today.</p>
      </div>

      <section className="dash-filters">
        <label className="field">
          <span>Data Range</span>
          <select><option>Last 7 days</option></select>
        </label>
        <label className="field">
          <span>Content Types</span>
          <select><option>All types</option></select>
        </label>
        <label className="field">
          <span>Status</span>
          <select><option>Submitted</option></select>
        </label>
        <label className="field">
          <span>Campaigns</span>
          <select><option>All campaigns</option></select>
        </label>
      </section>

      <section className="dash-kpis">
        <div className="dash-card">
          <div className="dash-card-head"><span>Total Views</span><span>👁️</span></div>
          <div className="dash-card-value">12.5k</div>
          <div className="dash-card-sub">+18% from last week</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-head"><span>Engagement</span><span>👍</span></div>
          <div className="dash-card-value">89%</div>
          <div className="dash-card-sub">+5% from last week</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-head"><span>Growth Rate</span><span>📈</span></div>
          <div className="dash-card-value">+23%</div>
          <div className="dash-card-sub">Monthly average</div>
        </div>
      </section>

      <section className="dash-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-title">Video: Introduction to Digital Marketing</div>
            <div className="activity-meta">2 hours ago</div>
            <span className="pill success">approved</span>
          </div>
          <div className="activity-item">
            <div className="activity-title">Article: 10 Tips for Better Content</div>
            <div className="activity-meta">5 hours ago</div>
            <span className="pill warn">pending</span>
          </div>
          <div className="activity-item">
            <div className="activity-title">Workshop: Advanced SEO Techniques</div>
            <div className="activity-meta">1 day ago</div>
            <span className="pill neutral">in-review</span>
          </div>
        </div>
      </section>
    </div>
  );
}
