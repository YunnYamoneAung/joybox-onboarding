import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'

export default function App() {
  return (
    <div className="container">
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 16}}>
        <Link to="/" className="pill">
          <span style={{fontWeight:800}}>Creator</span>
          <span style={{opacity:.6}}>Platform</span>
        </Link>
        <nav style={{display:'flex', gap:12}}>
          <Link to="/login" className="pill">Log in</Link>
          <Link to="/signup" className="pill">Get started</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
