export default function ProgressSteps({ step }) {
  const items = ['Account', 'Verify', 'Profile', 'Done']
  const pct = ((step) / (items.length-1)) * 100
  return (
    <div className="card" style={{marginBottom:16}}>
      <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:10, flexWrap:'wrap'}}>
        {items.map((label, idx) => (
          <div key={label} className="pill" style={{borderColor: idx<=step ? 'var(--accent)' : undefined, color: idx<=step ? 'var(--text)' : undefined}}>
            <span style={{width:20, height:20, display:'inline-flex', alignItems:'center', justifyContent:'center', borderRadius:999, background: idx<=step ? 'var(--accent)' : '#1f2937', color: idx<=step ? '#0b2730' : '#9aa3af', fontWeight:800}}>{idx+1}</span>
            {label}
          </div>
        ))}
      </div>
      <div className="progress"><div style={{width: pct + '%'}}></div></div>
    </div>
  )
}
