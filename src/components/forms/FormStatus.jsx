import { Check } from '@/components/ui/Icons'

export default function FormStatus({ status, successText, onReset }) {
  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex items-start gap-3 border border-ink bg-steel-50 p-5 animate-fadeIn"
      >
        <Check className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-medium">{successText}</p>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="link-underline mt-2 text-xs text-steel-600"
            >
              Yeni müraciət göndər
            </button>
          )}
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert" className="border border-accent bg-accent/5 p-5 animate-fadeIn">
        <p className="text-sm text-accent">
          Göndərilmə zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
        </p>
      </div>
    )
  }

  return null
}
