import React, { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Confirm() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        const prof = await liff.getProfile();
        const idt = liff.getDecodedIDToken?.();
        setUser({
          name: prof.displayName,
          avatar: prof.pictureUrl,
          email: idt?.email || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    })();
  }, []);

  if (!user) return <div className="center-wrap"><div className="card">Loading profile…</div></div>;

  return (
    <div className="center-wrap">
      <div className="card narrow center">
        <img src={user.avatar} alt="" className="avatar" />
        <h3>Hi {user.name}!</h3>
        <p>{user.email}</p>
        <p className="muted">Your LINE account is connected.</p>
        <button className="btn primary" onClick={() => (window.location.href = "/landing")}>
          Continue
        </button>
      </div>
    </div>
  );
}
