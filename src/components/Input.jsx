export default function Input({label, hint, error, ...props}){
  return (
    <label className="input">
      <span style={{fontWeight:600}}>{label}</span>
      <input {...props} aria-invalid={!!error} />
      <span className="muted">{error ? error : hint}</span>
    </label>
  )
}
