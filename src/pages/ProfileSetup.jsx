import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup({ user }) {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  // --- form state -----------------------------------------------------------
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "",
    interests: [],         // chips
    university: "",
    tiktok: "",
    instagram: "",
    youtube: "",
    bio: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  const universities = useMemo(
    () => [
      "Assumption University",
      "Chulalongkorn University",
      "Kasetsart University",
      "Thammasat University",
      "Mahidol University",
    ],
    []
  );

  // --- handlers -------------------------------------------------------------
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const addInterest = (value) => {
    const v = value.trim();
    if (!v) return;
    setForm((f) =>
      f.interests.includes(v) ? f : { ...f, interests: [...f.interests, v] }
    );
  };

  const removeInterest = (v) =>
    setForm((f) => ({ ...f, interests: f.interests.filter((x) => x !== v) }));

  const onInterestsKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addInterest(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  const pickAvatar = () => fileRef.current?.click();
  const onAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    // TODO: upload to your storage and keep the returned URL
  };

  const save = async (e) => {
    e.preventDefault();

    // TODO: send to backend
    await new Promise((r) => setTimeout(r, 600));

    localStorage.setItem("onboarded", "true");
    navigate("/landing/dashboard", { replace: true });
  };

  // --- UI -------------------------------------------------------------------
  return (
    <div className="center-wrap">
      <form className="pro-card" onSubmit={save}>
        {/* header */}
        <div className="pro-header">
            <h1 className="pro-title">Complete your profile</h1>
            <p className="pro-sub">We’ll use this to personalize your dashboard.</p>
          </div>
        

        {/* grid */}
        <div className="pro-grid">
          {/* left column */}
          <section className="pro-col">
            <div className="pro-uploader" onClick={pickAvatar} role="button" tabIndex={0}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar preview" />
              ) : (
                <div className="pro-uploader-empty">
                  <span>Upload</span>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={onAvatarFile} hidden />
            </div>

            <div className="field">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@domain.com"
              />
              <small className="hint">Used for account recovery and notifications.</small>
            </div>

            <div className="field">
              <label>Institution / University</label>
              <select
                name="university"
                value={form.university}
                onChange={onChange}
              >
                <option value="">Select…</option>
                {universities.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Role</label>
              <div className="segmented">
                {["Creator", "Student", "Educator", "Brand"].map((r) => {
                  const v = r.toLowerCase();
                  const active = form.role === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      className={active ? "seg active" : "seg"}
                      onClick={() => setForm((f) => ({ ...f, role: v }))}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
              <small className="hint">You can change this later in settings.</small>
            </div>
          </section>

          {/* right column */}
          <section className="pro-col">
            <div className="field">
              <label>Interests</label>
              <div className="chips">
                {form.interests.map((t) => (
                  <span className="chip" key={t} onClick={() => removeInterest(t)}>
                    {t} <em>×</em>
                  </span>
                ))}
                <input
                  className="chip-input"
                  placeholder="Type and press Enter"
                  onKeyDown={onInterestsKey}
                />
              </div>
              <small className="hint">Examples: design, marketing, video, UI/UX</small>
            </div>

            <div className="field-row">
              <div className="field">
                <label>TikTok</label>
                <input
                  name="tiktok"
                  value={form.tiktok}
                  onChange={onChange}
                  placeholder="@username"
                />
              </div>
              <div className="field">
                <label>Instagram</label>
                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={onChange}
                  placeholder="@username"
                />
              </div>
            </div>

            <div className="field">
              <label>YouTube</label>
              <input
                name="youtube"
                value={form.youtube}
                onChange={onChange}
                placeholder="channel URL"
              />
            </div>

            <div className="field">
              <label>Short bio</label>
              <textarea
                name="bio"
                rows={4}
                value={form.bio}
                onChange={onChange}
                placeholder="Tell us a little about what you do and what you want to learn."
              />
            </div>
          </section>
        </div>

        {/* actions */}
        <div className="pro-actions">
          <button type="submit" className="btn primary">Save & Continue</button>
        </div>
      </form>
    </div>
  );
}
