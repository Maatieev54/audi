import Field from './Field'
import FormStatus from './FormStatus'
import Honeypot from './Honeypot'
import useSecureForm, { HONEYPOT_NAME } from '@/hooks/useSecureForm'
import {
  required,
  email as emailRule,
  personName,
  sanitizeName,
  minLen,
  maxLen,
} from '@/hooks/useForm'

const LIMITS = { name: 60, email: 100, message: 2000 }

export default function ContactForm() {

  const V = 'outlined'

  const f = useSecureForm({
    formName: 'contact',
    initial: { name: '', email: '', message: '' },

    validate: (v) => ({
      name: required(v.name) ?? personName(v.name),
      email: required(v.email) ?? emailRule(v.email),
      message:
        required(v.message) ?? minLen(10)(v.message) ?? maxLen(LIMITS.message)(v.message),
    }),
  })

  if (f.status === 'success') {
    return (
      <FormStatus
        status="success"
        successText="Mesajınız göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq."
        onReset={f.reset}
      />
    )
  }

  const onNameChange = (e) => f.setField('name', sanitizeName(e.target.value))

  return (
    <form onSubmit={f.handleSubmit} noValidate className="space-y-6">
      <Honeypot value={f.values[HONEYPOT_NAME]} onChange={f.handleChange} />

      <Field
        variant={V}
        name="name"
        label="Ad, Soyad"
        required
        autoComplete="name"
        placeholder="Ad Soyad"
        maxLength={LIMITS.name}
        hint="Yalnız hərflər — rəqəm və işarə yazıla bilməz."
        value={f.values.name}
        onChange={onNameChange}
        onBlur={f.handleBlur}
        error={f.errors.name}
        touched={f.touched.name}
      />

      <Field
        variant={V}
        name="email"
        type="email"
        label="E-poçt ünvanı"
        required
        autoComplete="email"
        inputMode="email"
        spellCheck={false}
        placeholder="ad@domen.az"
        maxLength={LIMITS.email}
        value={f.values.email}
        onChange={f.handleChange}
        onBlur={f.handleBlur}
        error={f.errors.email}
        touched={f.touched.email}
      />

      <Field
        as="textarea"
        variant={V}
        name="message"
        label="Mesaj"
        required
        rows={5}
        maxLength={LIMITS.message}
        hint="Ən azı 10 simvol."
        value={f.values.message}
        onChange={f.handleChange}
        onBlur={f.handleBlur}
        error={f.errors.message}
        touched={f.touched.message}
      />

      <FormStatus status={f.status} />

      <button
        type="submit"
        disabled={f.status === 'sending' || !f.isValid}
        className="btn-form-submit"
      >
        {f.status === 'sending' ? 'Göndərilir…' : 'Göndər'}
      </button>
    </form>
  )
}
