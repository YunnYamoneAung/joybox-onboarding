import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 If already logged in, skip the welcome screen
  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (liff.isLoggedIn()) {
          window.location.replace("/confirm");
        }
      } catch (e) {
        console.error("LIFF init error:", e);
      }
    })();
  }, []);

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
      <div className="card narrow welcome-card">
        <h2>Welcome</h2>
        <p className="muted">Choose a sign-in method to continue.</p>

        <div className="btn-group">
          <button className="btn line" onClick={handleLineLogin} disabled={loading}>
            {loading ? "Opening LINE..." : "Continue with LINE"}
          </button>

          <div className="sep"><span>or</span></div>

          <button className="btn ghost" onClick={() => navigate("/signup")}>
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  );
}
