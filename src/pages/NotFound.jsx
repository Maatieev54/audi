import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import { ArrowRight } from '@/components/ui/Icons'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Səhifə tapılmadı"
        description="Axtardığınız səhifə mövcud deyil."
        noindex
      />

      <div className="shell flex min-h-[60vh] flex-col justify-center py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-steel-400">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Səhifə tapılmadı</h1>
        <p className="mt-4 max-w-md text-base text-steel-600">
          Axtardığınız səhifə silinmiş, adı dəyişdirilmiş ya da müvəqqəti əlçatmaz ola bilər.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-solid">
            Ana səhifəyə qayıt
            <ArrowRight />
          </Link>
          <Link to="/models" className="btn-outline">
            Modellərə bax
          </Link>
        </div>
      </div>
    </>
  )
}
