const USERS_KEY = 'demo_users_v1'
const SESSION_KEY = 'demo_session_v1'

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [] } catch { return [] }
}
function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)) }

export async function signup({ email, password }) {
  await new Promise(r => setTimeout(r, 400))
  const users = loadUsers()
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered')
  }
  users.push({ email, password, verified: false, profile: {} })
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, email)
  return { email }
}

export async function login({ email, password }){
  await new Promise(r => setTimeout(r, 300))
  const users = loadUsers()
  const u = users.find(u => u.email === email && u.password === password)
  if (!u) throw new Error('Invalid email or password')
  localStorage.setItem(SESSION_KEY, email)
  return { email }
}

export async function verifyCode(code){
  await new Promise(r => setTimeout(r, 250))
  // Accept any 6-digit code for mock purposes
  if (!/^\d{6}$/.test(code)) throw new Error('Enter a 6-digit code')
  const email = localStorage.getItem(SESSION_KEY)
  const users = loadUsers()
  const u = users.find(u => u.email === email)
  if (u){ u.verified = true; saveUsers(users) }
  return true
}

export function saveProfile(profile){
  const email = localStorage.getItem(SESSION_KEY)
  const users = loadUsers()
  const u = users.find(u => u.email === email)
  if (u){ u.profile = profile; saveUsers(users) }
  return true
}
