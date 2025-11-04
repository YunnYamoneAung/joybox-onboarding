import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps.jsx'
import Input from '../components/Input.jsx'
import { login } from '../api/mockAuth.js'
import { ensureLogin, getLineSession } from '../liff.js'

export default function Login(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      nav('/setup')
    } catch(err){
      setError(err.message)
    } finally { setLoading(false) }
  }

  async function handleLineLogin(){
    setError('')
    setLoading(true)
    try {
      const ok = await ensureLogin()
      if (!ok) return
      const { profile, idToken } = await getLineSession()

      const socialUser = {
        email: (profile?.userId || '') + '@line.local',
        displayName: profile?.displayName,
        pictureUrl: profile?.pictureUrl,
        idToken
      }
      localStorage.setItem('demo_session_v1', socialUser.email)
      localStorage.setItem('demo_profile_prefill', JSON.stringify({
        displayName: socialUser.displayName,
        avatar: socialUser.pictureUrl
      }))
      nav('/setup')
    } catch (err) {
      console.error(err)
      setError('LINE sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ProgressSteps step={0} />
      <form className="card" onSubmit={handleLogin}>
        <h2 className="title">Log in</h2>
        <div className="row">
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        <div className="spacer"></div>
        {error && <div style={{color:'var(--error)'}}>{error}</div>}
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <button className="btn primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
          <Link className="btn ghost" to="/signup">Create account</Link>
          <button type="button" className="btn" onClick={handleLineLogin} disabled={loading}>
            Continue with LINE
          </button>
        </div>
      </form>
    </>
  )
}
