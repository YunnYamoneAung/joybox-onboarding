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

  const roleLabel = profile.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Creator";

  const hasInterests = Boolean(profile.interests && profile.interests.trim());

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

  const goEdit = () => {
    window.location.href = "/profile-setup";
  };

  return (
    <div className="profile-page">
      {/* ── Top summary card ───────────────────── */}
      <section className="card profile-summary">
        <div className="profile-avatar-lg">
          <span>{initials}</span>
        </div>

        <div className="profile-summary-main">
          <h2 className="profile-summary-name">
            {profile.name || "Your creator profile"}
          </h2>
          <div className="profile-summary-row">
            <span className="profile-role-pill">{roleLabel}</span>
            {profile.email && (
              <span className="profile-summary-email">{profile.email}</span>
            )}
          </div>
          <p className="profile-summary-muted">
            Joy-Box uses this information to personalize your dashboard,
            recommendations, and analytics.
          </p>
        </div>
      </section>

      {/* ── Detail section card ────────────────── */}
      <section className="card profile-section">
        <div className="profile-section-header">
          <div>
            <h3 className="profile-section-title">Creator information</h3>
            <p className="profile-section-sub">
              Review your basic details. You can update them anytime.
            </p>
          </div>

          <button type="button" className="btn ghost small" onClick={goEdit}>
            Edit profile
          </button>
        </div>

        <div className="profile-fields-grid">
          <div className="profile-field">
            <span className="profile-field-label">Name</span>
            <span className="profile-field-value">
              {profile.name || "Not set"}
            </span>
          </div>

          <div className="profile-field">
            <span className="profile-field-label">Email</span>
            <span className="profile-field-value">
              {profile.email || "Not set"}
            </span>
          </div>

          <div className="profile-field">
            <span className="profile-field-label">Role</span>
            <span className="profile-field-value">{roleLabel || "Not set"}</span>
          </div>

          <div className="profile-field">
            <span className="profile-field-label">Interests</span>
            <span className="profile-field-value">
              {hasInterests
                ? profile.interests
                : "Tell us what you create or care about in your profile settings."}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
