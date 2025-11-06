import React, { useState } from "react";

export default function SignUp({ onSuccess }) {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [saving,setSaving]=useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // fake delay for demo
    setTimeout(()=>{ setSaving(false); onSuccess?.(); }, 600);
  };

  return (
    <div className="center-wrap">
      <form className="card narrow" onSubmit={submit}>
        <h2>Create your account</h2>
        <p className="muted">Use email to continue.</p>

        <div className="grid-2">
          <label className="field">
            <span>Name</span>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/>
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" required/>
          </label>
        </div>

        <div className="actions">
          <button type="button" className="btn ghost" onClick={()=>history.back()}>Cancel</button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Creating…" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
