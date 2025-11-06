// src/liff.js
import liff from '@line/liff';

export async function initLiff() {
  const liffId = import.meta.env.VITE_LIFF_ID;
  if (!liffId) throw new Error('VITE_LIFF_ID is missing');
  if (!liff._init) { // prevent double init in HMR
    await liff.init({ liffId });
    liff._init = true;
  }
}

export function ensureLogin() {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
    return false;
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
    email: idToken?.email || '',
  };
}

export function logout() {
  liff.logout();
  window.location.replace('/');
}
