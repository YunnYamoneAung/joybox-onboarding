import liff from '@line/liff';

let initPromise;

export function initLiff() {
  if (!initPromise) {
    const liffId = import.meta.env.VITE_LIFF_ID;
    if (!liffId) {
      console.warn('VITE_LIFF_ID is not set. Create a .env file with VITE_LIFF_ID=your_id');
    }
    initPromise = liff.init({ liffId });
  }
  return initPromise;
}

export async function ensureLogin() {
  await initLiff();
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
    return false; // will redirect
  }
  return true;
}

export async function getLineSession() {
  await initLiff();
  const profile = await liff.getProfile();
  const idToken = liff.getIDToken();
  const accessToken = liff.getAccessToken();
  return { profile, idToken, accessToken };
}

export function logoutLiff() {
  if (liff.isLoggedIn()) liff.logout();
}
