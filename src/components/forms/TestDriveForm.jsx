import Field from './Field'
import FormStatus from './FormStatus'
import Honeypot from './Honeypot'
import useSecureForm, { HONEYPOT_NAME } from '@/hooks/useSecureForm'
import {
  required,
  email as emailRule,
  personName,
  sanitizeName,
  appointmentSlot,
  earliestSlot,
  latestSlot,
  maxLen,
  BUSINESS,
} from '@/hooks/useForm'
import {
  nextPhoneValue,
  validateAzPhone,
  operatorOf,
  toE164,
  AZ_MOBILE_PREFIXES,
} from '@/lib/phone'


const LIMITS = { name: 60, phone: 20, email: 100, note: 1000 }

export default function TestDriveForm({ selectedModel }) {
  const f = useSecureForm({
    formName: 'test-drive',
    initial: { name: '', phone: '', email: '', datetime: '', note: '' },

    validate: (v) => ({
      name: required(v.name) ?? personName(v.name),
      phone: required(v.phone) ?? validateAzPhone(v.phone),
      email: emailRule(v.email),
      datetime: required(v.datetime) ?? appointmentSlot(v.datetime),
      note: maxLen(LIMITS.note)(v.note),
    }),

    
    prepare: (v) => ({ ...v, phone: toE164(v.phone), model: selectedModel ?? '' }),
  })

  if (f.status === 'success') {
    return (
      <FormStatus
        status="success"
        successText="Test yürüşü müraciətiniz qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq."
        onReset={f.reset}
      />
    )
  }

  
  const onNameChange = (e) => f.setField('name', sanitizeName(e.target.value))
  const onPhoneChange = (e) => f.setField('phone', nextPhoneValue(f.values.phone, e.target.value))

  const operator = operatorOf(f.values.phone)

  const row = 'flex flex-col gap-[3px] card:flex-row'
  const cell = 'flex-1 min-w-0'

  return (
    <form onSubmit={f.handleSubmit} noValidate className="flex flex-col gap-[3px]">

      <Honeypot value={f.values[HONEYPOT_NAME]} onChange={f.handleChange} />
      <div className={row}>
        <Field
          className={cell}
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
          className={cell}
          name="phone"
          type="tel"
          label="Mobil nömrə"
          required
          autoComplete="tel"
          inputMode="tel"
          spellCheck={false}
          placeholder="+994 99 111 22 33"
          maxLength={LIMITS.phone}
          adornment={operator}
          hint={`Operator kodları: ${AZ_MOBILE_PREFIXES.join(', ')}`}
          value={f.values.phone}
          onChange={onPhoneChange}
          onBlur={f.handleBlur}
          error={f.errors.phone}
          touched={f.touched.phone}
        />
      </div>

      <div className={row}>
        <Field
          className={cell}
          name="email"
          type="email"
          label="E-poçt"
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
          className={cell}
          name="datetime"
          type="datetime-local"
          label="Gəlmək istədiyiniz vaxt"
          required
          min={earliestSlot()}
          max={latestSlot()}
          step={900 }
          hint={`Qəbul: ${BUSINESS.openHour}:00 – ${BUSINESS.closeHour}:00, bazar günü istisna.`}
          value={f.values.datetime}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          error={f.errors.datetime}
          touched={f.touched.datetime}
        />
      </div>
      <Field
        as="textarea"
        name="note"
        label="Əlavə məlumat"
        rows={4}
        maxLength={LIMITS.note}
        value={f.values.note}
        onChange={f.handleChange}
        onBlur={f.handleBlur}
        error={f.errors.note}
        touched={f.touched.note}
      />

      <div>
        <FormStatus status={f.status} />
        <button
          type="submit"
          disabled={f.status === 'sending' || !f.isValid}
          className="btn-form-submit"
        >
          {f.status === 'sending' ? 'Göndərilir…' : 'Göndər'}
        </button>
      </div>
    </form>
  )
}
