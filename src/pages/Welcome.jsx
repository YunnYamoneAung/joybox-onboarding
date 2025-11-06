import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithConsent } from "../liff";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLineLogin = async () => {
    try {
      setLoading(true);
      await loginWithConsent(); // this opens the LINE consent page
    } catch (err) {
      console.error("LINE Login Error:", err);
      alert("Login error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="card narrow">
        <h2>Welcome</h2>
        <p className="muted">Choose a sign-in method.</p>

        <button className="btn line" onClick={handleLineLogin} disabled={loading}>
          {loading ? "Opening LINE…" : "Continue with LINE"}
        </button>

        <div className="sep"><span>or</span></div>

        <button className="btn ghost" onClick={() => navigate("/signup")}>
          Sign in with Email
        </button>
      </div>
    </div>
  );
}
