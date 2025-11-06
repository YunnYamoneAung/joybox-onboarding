import React, { useState } from 'react';

export default function ProfileSetup({ user, onDone }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: '',
    interests: ''
  });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async e => {
    e.preventDefault();
    // TODO: send to API
    await new Promise(r => setTimeout(r, 600));
    onDone?.();
  };

  return (
    <div className="center-wrap">
      <form className="card" onSubmit={save}>
        <div className="header-row">
          {user?.avatar && <img className="avatar sm" src={user.avatar} alt="avatar" />}
          <div>
            <h2>Complete your profile</h2>
            <p className="muted">So we can tailor your dashboard.</p>
          </div>
        </div>

        <div className="grid-2">
          <label className="field">
            <span>Name</span>
            <input name="name" value={form.name} onChange={onChange} required/>
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={onChange}/>
          </label>
          <label className="field">
            <span>Role</span>
            <select name="role" value={form.role} onChange={onChange} required>
              <option value="">Select…</option>
              <option value="creator">Creator</option>
              <option value="student">Student</option>
              <option value="brand">Brand</option>
            </select>
          </label>
          <label className="field">
            <span>Interests</span>
            <input name="interests" placeholder="e.g. design, music, coding" value={form.interests} onChange={onChange}/>
          </label>
        </div>

        <div className="actions">
          <button className="btn primary" type="submit">Save & Continue</button>
        </div>
      </form>
    </div>
  );
}
