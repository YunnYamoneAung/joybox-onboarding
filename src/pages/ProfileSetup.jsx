import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps.jsx'
import Input from '../components/Input.jsx'
import { saveProfile } from '../api/mockAuth.js'

const topics = ['Design', 'Gaming', 'Beauty', 'Education', 'Travel', 'Lifestyle', 'Tech', 'Finance']

export default function ProfileSetup(){
  const nav = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [interestList, setInterestList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  try {
    const prefill = JSON.parse(localStorage.getItem('demo_profile_prefill') || 'null')
    if (prefill?.displayName) setDisplayName(prefill.displayName)
  } catch {}
}, [])


  function toggleTopic(t){
    setInterestList(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])
  }

  async function handleSave(e){
    e.preventDefault()
    setLoading(true)
    saveProfile({ displayName, bio, interests: interestList })
    setTimeout(()=>{
      setLoading(false)
      nav('/')
    }, 350)
  }

  return (
    <>
      <ProgressSteps step={2} />
      <form className="card" onSubmit={handleSave}>
        <h2 className="title">Set up your profile</h2>
        <div className="row">
          <Input label="Display name" value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Your name" />
          <label className="input">
            <span style={{fontWeight:600}}>Bio</span>
            <textarea rows={4} value={bio} onChange={e=>setBio(e.target.value)} placeholder="Tell us about yourself" />
            <span className="muted">Optional — you can change this later.</span>
          </label>
        </div>
        <div className="spacer"></div>
        <div>
          <div style={{fontWeight:600, marginBottom:8}}>Interests</div>
          <div className="chips">
            {topics.map(t => (
              <button type="button" key={t} className={"chip " + (interestList.includes(t) ? "active" : "")} onClick={()=>toggleTopic(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="spacer"></div>
        <button className="btn primary" disabled={loading}>{loading ? 'Saving...' : 'Finish'}</button>
      </form>
    </>
  )
}
