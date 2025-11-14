import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ If user already logged in, skip this page
  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (liff.isLoggedIn()) {
          navigate("/confirm", { replace: true });
        }
      } catch (e) {
        console.error("LIFF init error", e);
      }
    })();
  }, [navigate]);

  const handleLineLogin = async () => {
    try {
      setLoading(true);
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      if (!liff.isLoggedIn()) {
        liff.login({
          scope: "profile openid email",
          prompt: "consent",
          redirectUri: `${window.location.origin}/confirm`,
        });
      } else {
        navigate("/confirm", { replace: true });
      }
    } catch (e) {
      alert(`Login error: ${e?.message || e}`);
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="card narrow">
        <h2>Welcome</h2>
        <p>Start your journey by logging in with LINE.</p>
        <button
          className="btn primary"
          onClick={handleLineLogin}
          disabled={loading}
        >
          {loading ? "Connecting…" : "Login with LINE"}
        </button>
      </div>
    </div>
  );
}
