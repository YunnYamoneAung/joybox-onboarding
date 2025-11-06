import React, { useEffect, useState } from "react";
import { fetchProfile } from "../liff";

export default function Confirm() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const u = await fetchProfile();
        setUser(u);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Failed to load LINE profile");
      }
    })();
  }, []);

  if (err) {
    return (
      <div className="center-wrap">
        <div className="card narrow center">
          <h3>Couldn’t load your profile</h3>
          <p className="muted">{err}</p>
          <button className="btn" onClick={() => (window.location.href = "/")}>Back</button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="center-wrap">
        <div className="card">Loading profile…</div>
      </div>
    );
  }

  return (
    <div className="center-wrap">
      <div className="card narrow center">
        {user.avatar && <img src={user.avatar} alt="" className="avatar" />}
        <h3>Hi {user.name}!</h3>
        {user.email && <p>{user.email}</p>}
        <p className="muted">Your LINE account is connected.</p>
        <button className="btn primary" onClick={() => (window.location.href = "/landing")}>
          Continue
        </button>
      </div>
    </div>
  );
}
