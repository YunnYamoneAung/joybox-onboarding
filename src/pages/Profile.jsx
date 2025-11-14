// src/pages/Profile.jsx
import React, { useMemo } from "react";

export default function Profile() {
  // Read saved profile from localStorage (from ProfileSetup)
  const stored = localStorage.getItem("profile");
  const base = { name: "", email: "", role: "", interests: "" };

  let profile = base;
  try {
    profile = { ...base, ...(stored ? JSON.parse(stored) : {}) };
  } catch {
    profile = base;
  }

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

  return (
    <div className="profile-layout">
      {/* Top row: avatar + title */}
      <div className="profile-header-row">
        <div className="profile-avatar">
          <span>{initials}</span>
        </div>
        <div>
          <h2 className="profile-title">
            {profile.name || "Your creator profile"}
          </h2>
          <p className="muted">
            This is the information Joy-Box uses to personalize your dashboard.
          </p>
        </div>
      </div>

      {/* Two-column info cards */}
      <div className="profile-grid">
        <section className="profile-card">
          <h3>Account</h3>
          <dl className="profile-list">
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
              <dd>
                {profile.role
                  ? profile.role.charAt(0).toUpperCase() +
                    profile.role.slice(1)
                  : "Not set"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="profile-card">
          <h3>Creator details</h3>
          <dl className="profile-list">
            <div>
              <dt>Interests</dt>
              <dd>{profile.interests || "Tell us what you create or care about."}</dd>
            </div>
          </dl>
          <p className="profile-hint">
            We use your interests and role to recommend tools, content
            opportunities, and analytics views that match your goals.
          </p>
        </section>
      </div>

      <div className="actions">
        <a href="/profile-setup" className="btn ghost">
          Edit profile
        </a>
      </div>
    </div>
  );
}
