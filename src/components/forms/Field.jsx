import { ChevronDown } from '@/components/ui/Icons'

export default function Field({
  as = 'input',
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required: isRequired = false,
  options = [],
  rows = 4,
  placeholder,
  autoComplete,
  className = '',
  
  hint,               
  adornment,          
  maxLength,          
  inputMode,          
  spellCheck,
  min,
  max,
  step,
  
  variant = 'filled',
}) {
  const showError = Boolean(error && touched)
  const errorId = `${name}-error`
  const hintId = `${name}-hint`

  const describedBy = showError ? errorId : hint ? hintId : undefined

  const base = variant === 'outlined' ? 'field-input-outlined' : 'field-input'

  const shared = {
    id: name,
    name,
    value: value ?? '',
    onChange,
    onBlur,
    placeholder,
    autoComplete,
    maxLength,
    inputMode,
    spellCheck,
    'aria-invalid': showError || undefined,
    'aria-describedby': describedBy,
    'aria-required': isRequired || undefined,
    className: `${base} ${showError ? 'border-accent' : ''}`,
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
        {isRequired && <span className="ml-0.5 text-accent">*</span>}
      </label>

      {as === 'textarea' && (
        <textarea {...shared} rows={rows} className={`${shared.className} resize-y`} />
      )}

      {as === 'select' && (
        <div className="relative">
          <select {...shared} className={`${shared.className} appearance-none pr-8`}>
            <option value="">Seçin…</option>
            {options.map((o) => (
              <option key={o.value ?? o} value={o.value ?? o}>
                {o.label ?? o}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
        </div>
      )}

      {as === 'input' && (
        <div className="relative">
          <input
            {...shared}
            type={type}
            min={min}
            max={max}
            step={step}
            
            className={`${shared.className} ${adornment ? 'pr-20' : ''}`}
          />
          {adornment && (
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[11px] text-steel-500">
              {adornment}
            </span>
          )}
        </div>
      )}

      
      {showError ? (
        <span id={errorId} role="alert" className="field-error">
          {error}
        </span>
      ) : (
        hint && (
          <span id={hintId} className="mt-1 block text-[11px] leading-snug text-steel-500">
            {hint}
          </span>
        )
      )}
    </div>
  )
}
