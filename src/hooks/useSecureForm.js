import { useRef } from 'react'
import useForm from './useForm'
import submitForm from '@/lib/submitForm'
export const HONEYPOT_NAME = '_trap'

const SUBMIT_COOLDOWN_MS = 2000

/**
 * @param {object}   o
 * @param {string}   o.formName  
 * @param {object}   o.initial   
 * @param {Function} o.validate  
 * @param {Function} [o.prepare]                        
 */
export default function useSecureForm({ formName, initial, validate, prepare }) {
  const lastSubmitRef = useRef(0)

  const f = useForm({
    initial: { ...initial, [HONEYPOT_NAME]: '' },
    validate,

    onSubmit: async (values) => {
      
      if (values[HONEYPOT_NAME]) return


      const now = Date.now()
      if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) return
      lastSubmitRef.current = now


      const { [HONEYPOT_NAME]: _ignored, ...rest } = values
      const clean = Object.fromEntries(
        Object.entries(rest).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]),
      )

      
      await submitForm(formName, prepare ? prepare(clean) : clean)
    },
  })

  return f
}
