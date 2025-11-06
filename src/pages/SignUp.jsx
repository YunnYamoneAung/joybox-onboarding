import React, { useState } from 'react';

export default function SignUp({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: call your backend here; simulate success:
      await new Promise(r => setTimeout(r, 600));
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <form className="card narrow" onSubmit={submit}>
        <h2>Email sign in</h2>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required value={form.email} onChange={onChange}/>
        </label>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" required value={form.password} onChange={onChange}/>
        </label>
        <button className="btn primary" disabled={loading}>{loading ? 'Signing in…' : 'Continue'}</button>
      </form>
    </div>
  );
}
