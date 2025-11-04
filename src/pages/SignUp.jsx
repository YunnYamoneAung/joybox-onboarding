import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps.jsx'
import Input from '../components/Input.jsx'
import { signup, verifyCode } from '../api/mockAuth.js'

export default function SignUp(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup({ email, password })
      setStep(1)
    } catch(err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e){
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await verifyCode(code)
      setStep(2)
      nav('/setup')
    } catch(err){
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <>
      <ProgressSteps step={step} />
      {step === 0 && (
        <form className="card" onSubmit={handleCreate}>
          <h2 className="title">Create your account</h2>
          <div className="row">
            <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
            <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div className="spacer"></div>
          {error && <div style={{color:'var(--error)'}}>{error}</div>}
          <button className="btn primary" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>
      )}
      {step === 1 && (
        <form className="card" onSubmit={handleVerify}>
          <h2 className="title">Verify your email</h2>
          <p className="muted">We just “sent” a 6-digit code to your inbox (mock). Enter any 6 digits to continue.</p>
          <div className="row">
            <Input label="Verification code" value={code} onChange={e=>setCode(e.target.value)} placeholder="123456" maxLength={6} />
          </div>
          <div className="spacer"></div>
          {error && <div style={{color:'var(--error)'}}>{error}</div>}
          <div style={{display:'flex', gap:12}}>
            <button className="btn primary" disabled={loading}>{loading ? 'Verifying...' : 'Verify & continue'}</button>
            <button type="button" className="btn ghost" onClick={()=>setStep(0)}>Back</button>
          </div>
        </form>
      )}
    </>
  )
}
