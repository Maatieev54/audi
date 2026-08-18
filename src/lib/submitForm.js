const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const TIMEOUT_MS = 15000

/**
 * @param {string} formName  
 * @param {object} values    
 */
export default async function submitForm(formName, values) {
  const payload = { form: formName, ...values, submittedAt: new Date().toISOString() }

  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info(`[submitForm] "${formName}" (simulyasiya, backend qosulmayib):`, payload)
    } else {
      console.info(`[submitForm] "${formName}" qeydə alındı (simulyasiya).`)
    }
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, simulated: true }
  }

  if (!/^https:\/\//i.test(ENDPOINT)) {
    throw new Error('Form endpoint-i HTTPS olmalıdır.')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      mode: 'cors',
    })

    if (!res.ok) {
      throw new Error(`Form göndərilmədi (HTTP ${res.status})`)
    }

    return { ok: true, simulated: false }
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Sorğu çox uzun sürdü. Bir az sonra yenidən yoxlayın.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
