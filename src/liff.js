import liff from '@line/liff';

let inited = false;

export async function initLiff() {
  if (inited) return;
  const liffId = import.meta.env.VITE_LIFF_ID;
  if (!liffId) throw new Error('VITE_LIFF_ID is missing (Vercel → Settings → Environment Variables)');
  await liff.init({ liffId });
  inited = true;
}

export function ensureLogin() {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
    return false; // it will redirect away
  }
  return true;
}

export async function getUserProfile() {
  const profile = await liff.getProfile();
  const idToken = liff.getDecodedIDToken?.();
  return {
    name: profile.displayName,
    avatar: profile.pictureUrl,
    userId: profile.userId,
    email: idToken?.email || ''
  };
}

export function logout() {
  liff.logout();
  window.location.replace('/');
}
