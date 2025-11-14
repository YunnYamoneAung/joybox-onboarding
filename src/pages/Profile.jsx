// src/pages/Profile.jsx
import React, { useMemo } from "react";

export default function Profile() {
  // Read saved profile from localStorage (set in ProfileSetup.jsx)
  const stored = localStorage.getItem("profile");
  const base = { name: "", email: "", role: "", interests: "" };

  let profile = base;
  try {
    profile = { ...base, ...(stored ? JSON.parse(stored) : {}) };
  } catch {
    profile = base;
  }

  // Initials for avatar (e.g. "Y" or "YA")
  const initials = useMemo(() => {
    if (!profile.name) return "JB"; // Joy-Box default
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

  const hasInterests = Boolean(profile.interests && profile.interests.trim());

  return (
    <div className="profile-layout">
      {/* Top row: avatar + title */}
      <div className="profile-header-row">
        <div className="profile-avatar">{initials}</div>
        <div>
          <h1 className="profile-title">Your creator profile</h1>
          <p className="profile-sub">
            This is the information Joy-Box uses to personalize your dashboard.
          </p>
        </div>
      </div>

      {/* Two cards layout */}
      <div className="profile-grid">
        {/* Account card */}
        <section className="profile-card">
          <h3 className="section-title">Account</h3>

          <div className="profile-row">
            <span className="profile-label">Name</span>
            <span className="profile-value">{profile.name || "Not set"}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{profile.email || "Not set"}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Role</span>
            <span className="profile-value">{roleLabel || "Not set"}</span>
          </div>
        </section>

        {/* Creator details card */}
        <section className="profile-card">
          <h3 className="section-title">Creator details</h3>

          <div className="creator-interests-block">
            <span className="creator-label">Interests</span>
            <p className="creator-interests-value">
              {hasInterests
                ? profile.interests
                : "Tell us what you create or care about so we can recommend the right tools, content opportunities, and analytics views for you."}
            </p>
          </div>

          <button
            type="button"
            className="btn ghost"
            style={{ marginTop: "16px" }}
            onClick={() => (window.location.href = "/profile-setup")}
          >
            Edit profile
          </button>
        </section>
      </div>
    </div>
  );
}
