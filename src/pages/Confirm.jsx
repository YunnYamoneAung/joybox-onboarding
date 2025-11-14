import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../liff";

export default function Confirm() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Ensure LIFF is ready and get user profile
        await fetchProfile();

        // Decide where to go
        const onboarded = localStorage.getItem("onboarded") === "true";
        if (onboarded) {
          navigate("/landing/dashboard", { replace: true });
        } else {
          navigate("/profile-setup", { replace: true });
        }
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Failed to load LINE profile");
      }
    })();
  }, [navigate]);

  if (err) {
    return (
      <div className="center-wrap">
        <div className="card narrow center">
          <h3>Couldn’t load your profile</h3>
          <p className="muted">{err}</p>
          <button className="btn" onClick={() => (window.location.href = "/")}>
            Back
          </button>
        </div>
      </div>
    );
  }

  // brief loading while we redirect
  return (
    <div className="center-wrap">
      <div className="card narrow center">
        <h3>Signing you in…</h3>
        <p className="muted">Preparing your workspace.</p>
      </div>
    </div>
  );
}
