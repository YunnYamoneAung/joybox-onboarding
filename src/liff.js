import liff from '@line/liff';

let booted = false;
export async function initLiff() {
  if (booted) return;
  const id = import.meta.env.VITE_LIFF_ID;
  if (!id) throw new Error('VITE_LIFF_ID missing');
  await liff.init({ liffId: id });
  booted = true;
}
export async function getUserProfile() {
  const p = await liff.getProfile();
  const idt = liff.getDecodedIDToken?.();
  return { name: p.displayName, avatar: p.pictureUrl, email: idt?.email || '' };
}
