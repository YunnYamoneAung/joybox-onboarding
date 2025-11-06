import React, { useState } from 'react';

export default function SignUp({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: your sign-up API call here
    // await api.signup(form)
    onSuccess?.(); // -> App routes to /landing
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h2>Create account</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <button type="submit">Sign up</button>
    </form>
  );
}
