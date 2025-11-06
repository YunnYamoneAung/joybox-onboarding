import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLineLogin = async () => {
    try {
      setLoading(true);
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      // LINE will only show the consent UI the first time.
      liff.login({
        scope: "profile openid email",
        prompt: "consent",
        redirectUri: `${window.location.origin}/confirm`,
      });
    } catch (e) {
      alert(`Login error: ${e?.message || e}`);
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="card narrow">
        <h2>Welcome</h2>
        <p className="muted">Choose a sign-in method to continue.</p>

        <button className="btn line" onClick={handleLineLogin} disabled={loading}>
          {loading ? "Opening LINE..." : "Continue with LINE"}
        </button>

        <div className="sep"><span>or</span></div>

        <button className="btn ghost" onClick={() => navigate("/signup")}>
          Sign in with Email
        </button>
      </div>
    </div>
  );
}
