// src/pages/Profile.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // --- Read saved profile from localStorage (from ProfileSetup) ---
  const stored = localStorage.getItem("profile");
  const base = { name: "", email: "", role: "", interests: "" };

  let profile = base;
  try {
    profile = { ...base, ...(stored ? JSON.parse(stored) : {}) };
  } catch {
    profile = base;
  }

  // --- Initials for avatar + topbar (if you want) ---
  const initials = useMemo(() => {
    if (!profile.name) return "JB";
    return profile.name
      .split(" ")
      .filter(Boolean)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name]);

  const roleLabel = profile.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Creator";

  // For “Joined” meta, just fake a date for now
  const joinedText = "Joined 2025";

  // Tabs: About / Social Links / Interests
  const [tab, setTab] = useState("about");

  const goEditProfile = () => {
    navigate("/profile-setup");
  };

  return (
    <div className="profile-page">
      <div className="profile-shell">
        {/* ───── Header card ───── */}
        <header className="profile-header-card">
          {/* Avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-circle">{initials}</div>
          </div>

          {/* Main text */}
          <div className="profile-header-main">
            <h1 className="profile-name">
              {profile.name || "Creator Name"}
            </h1>

            <div className="profile-pill-row">
              <span className="pill profile-pill-primary">
                {roleLabel}
              </span>
              {/* Extra example pills – you can remove or change */}
              <span className="pill profile-pill-muted">
                Content Creator
              </span>
              <span className="pill profile-pill-muted">
                Mentor
              </span>
            </div>

            <div className="profile-meta-row">
              <span className="profile-meta-item">
                <span className="profile-meta-label">Institution</span>
                <span className="profile-meta-value">
                  {/* Placeholder for now */}
                  Not set
                </span>
              </span>
              <span className="profile-meta-item">
                <span className="profile-meta-label">Location</span>
                <span className="profile-meta-value">Not set</span>
              </span>
              <span className="profile-meta-item">
                <span className="profile-meta-label">Joined</span>
                <span className="profile-meta-value">{joinedText}</span>
              </span>
            </div>

            <p className="profile-bio">
              {profile.interests
                ? `Creator focusing on ${profile.interests}. Using Joy-Box to grow and manage content projects.`
                : "Passionate creator using Joy-Box to manage content, track performance, and grow their audience."}
            </p>
          </div>

          {/* Edit button on the right */}
          <div className="profile-header-actions">
            <button className="btn primary" onClick={goEditProfile}>
              Edit Profile
            </button>
          </div>
        </header>

        {/* ───── Tabs card ───── */}
        <section className="profile-tabs-card">
          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={
                "profile-tab" + (tab === "about" ? " is-active" : "")
              }
              onClick={() => setTab("about")}
            >
              About
            </button>
            <button
              className={
                "profile-tab" + (tab === "social" ? " is-active" : "")
              }
              onClick={() => setTab("social")}
            >
              Social Links
            </button>
            <button
              className={
                "profile-tab" + (tab === "interests" ? " is-active" : "")
              }
              onClick={() => setTab("interests")}
            >
              Interests
            </button>
          </div>

          {/* Tab panels */}
          <div className="profile-tab-panel">
            {tab === "about" && (
              <div className="profile-two-column">
                <section className="profile-section-card">
                  <h3 className="profile-section-title">
                    Professional Details
                  </h3>
                  <p className="profile-section-sub">
                    Your expertise and experience
                  </p>
                  <dl className="profile-details-grid">
                    <div>
                      <dt>Area of Expertise</dt>
                      <dd>
                        {profile.interests || "Not set"}
                      </dd>
                    </div>
                    <div>
                      <dt>Experience Level</dt>
                      <dd>Not set</dd>
                    </div>
                    <div>
                      <dt>Goals</dt>
                      <dd>
                        Not set – for example: “Grow a community of
                        engaged followers and launch new content
                        series.”
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="profile-section-card">
                  <h3 className="profile-section-title">
                    Account Information
                  </h3>
                  <dl className="profile-details-grid">
                    <div>
                      <dt>Name</dt>
                      <dd>{profile.name || "Not set"}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{profile.email || "Not set"}</dd>
                    </div>
                    <div>
                      <dt>Role</dt>
                      <dd>{profile.role || "Not set"}</dd>
                    </div>
                  </dl>
                </section>
              </div>
            )}

            {tab === "social" && (
              <div className="profile-section-card">
                <h3 className="profile-section-title">Social Links</h3>
                <p className="profile-section-sub">
                  Connect your channels so Joy-Box can help you monitor
                  and recommend content opportunities.
                </p>
                <ul className="profile-social-list">
                  <li>
                    <span className="profile-social-label">TikTok</span>
                    <span className="profile-social-value">Not connected</span>
                  </li>
                  <li>
                    <span className="profile-social-label">Instagram</span>
                    <span className="profile-social-value">Not connected</span>
                  </li>
                  <li>
                    <span className="profile-social-label">YouTube</span>
                    <span className="profile-social-value">Not connected</span>
                  </li>
                </ul>
                <button className="btn ghost" onClick={goEditProfile}>
                  Edit social links
                </button>
              </div>
            )}

            {tab === "interests" && (
              <div className="profile-section-card">
                <h3 className="profile-section-title">Interests</h3>
                <p className="profile-section-sub">
                  We’ll use these to personalize your dashboard,
                  recommendations, and AI tools.
                </p>
                {profile.interests ? (
                  <div className="profile-interests-pill-row">
                    {profile.interests
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span key={tag} className="pill profile-pill-tag">
                          {tag}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="muted">No interests set yet.</p>
                )}
                <button className="btn ghost" onClick={goEditProfile}>
                  Update interests
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
