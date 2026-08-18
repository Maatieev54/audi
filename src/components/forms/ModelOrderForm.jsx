import Field from './Field'
import FormStatus from './FormStatus'
import Honeypot from './Honeypot'
import useSecureForm, { HONEYPOT_NAME } from '@/hooks/useSecureForm'
import { required, nameWord, sanitizeName } from '@/hooks/useForm'
import {
  nextPhoneValue,
  validateAzPhone,
  operatorOf,
  toE164,
  AZ_MOBILE_PREFIXES,
} from '@/lib/phone'

const LIMITS = { name: 40, surname: 40, phone: 20 }

export default function ModelOrderForm({ modelName }) {
  const f = useSecureForm({
    formName: 'model-order',
    initial: { name: '', surname: '', phone: '' },

    validate: (v) => ({
      name: required(v.name) ?? nameWord(v.name),
      surname: nameWord(v.surname),
      phone: required(v.phone) ?? validateAzPhone(v.phone),
    }),

    prepare: (v) => ({ ...v, phone: toE164(v.phone), modelname: modelName ?? '' }),
  })

  if (f.status === 'success') {
    return (
      <FormStatus
        status="success"
        successText={`${modelName} üçün sorğunuz qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.`}
        onReset={f.reset}
      />
    )
  }

  const onName = (k) => (e) => f.setField(k, sanitizeName(e.target.value))
  const onPhone = (e) => f.setField('phone', nextPhoneValue(f.values.phone, e.target.value))

  return (
    <form onSubmit={f.handleSubmit} noValidate className="max-w-[500px] space-y-5">
      <Honeypot value={f.values[HONEYPOT_NAME]} onChange={f.handleChange} />

      <Field
        variant="outlined"
        name="name"
        label="Adınız"
        required
        autoComplete="given-name"
        maxLength={LIMITS.name}
        value={f.values.name}
        onChange={onName('name')}
        onBlur={f.handleBlur}
        error={f.errors.name}
        touched={f.touched.name}
      />

      <Field
        variant="outlined"
        name="surname"
        label="Soyadınız"
        autoComplete="family-name"
        maxLength={LIMITS.surname}
        value={f.values.surname}
        onChange={onName('surname')}
        onBlur={f.handleBlur}
        error={f.errors.surname}
        touched={f.touched.surname}
      />

      <Field
        variant="outlined"
        name="phone"
        type="tel"
        label="Mobil nömrəniz"
        required
        autoComplete="tel"
        inputMode="tel"
        spellCheck={false}
        placeholder="+994 99 111 22 33"
        maxLength={LIMITS.phone}
        adornment={operatorOf(f.values.phone)}
        hint={`Operator kodları: ${AZ_MOBILE_PREFIXES.join(', ')}`}
        value={f.values.phone}
        onChange={onPhone}
        onBlur={f.handleBlur}
        error={f.errors.phone}
        touched={f.touched.phone}
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
