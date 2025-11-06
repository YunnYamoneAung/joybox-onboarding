import React from 'react';
import { logout } from '../liff';

export default function Landing({ user }) {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">Joy Box</div>
        <div className="spacer" />
        <div className="user">
          {user?.avatar && <img className="avatar xs" src={user.avatar} alt="" />}
          <span>{user?.name || 'Guest'}</span>
          <button className="btn text" onClick={logout}>Log out</button>
        </div>
      </header>

      <main className="container gap">
        <section className="card">
          <h3>Upload & AI Enhance</h3>
          <p className="muted">Drop files here or click to browse. We’ll apply your selected AI enhancements.</p>
          <div className="dropzone">Upload area</div>
          <div className="grid-2">
            <label className="field">
              <span>Enhancement</span>
              <select defaultValue="clean-up">
                <option value="clean-up">Clean-up</option>
                <option value="denoise">Denoise</option>
                <option value="sharpen">Sharpen</option>
              </select>
            </label>
            <label className="field">
              <span>Notes</span>
              <input placeholder="Optional brief"/>
            </label>
          </div>
          <div className="actions">
            <button className="btn primary">Process</button>
          </div>
        </section>

        <section className="card">
          <h3>Recent Jobs</h3>
          <table className="table">
            <thead>
              <tr><th>File</th><th>Enhancement</th><th>Status</th><th>Output</th></tr>
            </thead>
            <tbody>
              <tr><td>sample.png</td><td>Clean-up</td><td><span className="pill">Completed</span></td><td><button className="btn ghost">Download</button></td></tr>
              <tr><td>portrait.jpg</td><td>Sharpen</td><td><span className="pill warn">Queued</span></td><td>—</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
