import { HONEYPOT_NAME } from '@/hooks/useSecureForm'

export default function Honeypot({ value, onChange }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={HONEYPOT_NAME}>Bu sahəni boş buraxın</label>
      <input
        id={HONEYPOT_NAME}
        name={HONEYPOT_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value ?? ''}
        onChange={onChange}
      />
    </div>
  )
}
