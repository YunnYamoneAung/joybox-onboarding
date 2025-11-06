import liff from '@line/liff';

let booted = false;

export async function initLiff() {
  if (booted) return;
  const liffId = import.meta.env.VITE_LIFF_ID; // make sure this is set in Vercel
  if (!liffId) throw new Error('VITE_LIFF_ID is missing (set it in Vercel → Project → Settings → Environment Variables)');
  await liff.init({ liffId });
  booted = true;
}

/**
 * Opens LINE consent screen and returns back to /confirm
 */
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
