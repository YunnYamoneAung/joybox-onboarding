import { Link } from 'react-router-dom'

export default function Welcome(){
  return (
    <div className="card">
      <h1 className="title">Welcome to the Creator Platform</h1>
      <p className="muted">Start your journey: create an account, verify your email, set up your profile, and you’re in.</p>
      <div className="spacer"></div>
      <div style={{display:'flex', gap:12}}>
        <Link className="btn primary" to="/signup">Get Started</Link>
        <Link className="btn ghost" to="/login">I already have an account</Link>
      </div>
    </div>
  )
}
