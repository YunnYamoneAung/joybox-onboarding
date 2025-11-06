import liff from '@line/liff';

let booted = false;

export async function initLiff() {
  if (booted) return;
  const liffId = import.meta.env.VITE_LIFF_ID;
  if (!liffId) throw new Error('VITE_LIFF_ID is missing');
  await liff.init({ liffId });
  booted = true;
}

export async function loginWithConsent() {
  await initLiff();
  liff.login({
    scope: 'profile openid email',
    prompt: 'consent',
    redirectUri: `${window.location.origin}/confirm`,
  });
}

export async function fetchProfile() {
  await initLiff();
  const prof = await liff.getProfile();
  const idt  = liff.getDecodedIDToken?.();
  return {
    name: prof.displayName,
    avatar: prof.pictureUrl,
    email: idt?.email || '',
  };
}

/** <-- ADD THIS */
export async function logout() {
  await initLiff();
  if (liff.isLoggedIn && liff.isLoggedIn()) {
    liff.logout();
  }
  // send user to home after logout
  window.location.href = '/';
}
