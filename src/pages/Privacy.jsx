import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import { PRIVACY_TITLE, PRIVACY_BLOCKS } from '@/data/privacy'

const cell = (v) => (/^-+$/.test(v) ? '—' : v)

function Block({ b }) {
  switch (b.t) {
    case 'h1':
      return (
        <h2 className="mt-14 flex gap-3 text-[19.2px] font-bold leading-snug first:mt-0">
          <span className="text-steel-400">{b.no}.</span>
          {b.text}
        </h2>
      )

    case 'h2':
      return <h3 className="mt-10 text-[16.85px] font-bold leading-snug">{b.text}</h3>

    case 'h3':
      return <h4 className="mt-8 text-[14.4px] font-bold leading-snug">{b.text}</h4>

    case 'ul':
      return (
        <ul className="mt-3 space-y-2">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.9em] h-px w-3 shrink-0 bg-steel-400" />
              <span className="flex-1">{it}</span>
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left align-top">
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-b border-steel-200 align-top">
                  {row.map((c, i) => (
                    <td
                      key={i}
                      className={`py-3 pr-6 leading-relaxed last:pr-0 ${
                        r === 0 ? 'font-bold' : ''
                      } ${i === 0 ? 'w-[30%]' : ''}`}
                    >
                      {cell(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return <p className="mt-4">{b.text}</p>
  }
}

export default function Privacy() {
  return (
    <>
      <Seo
        title={PRIVACY_TITLE}
        description="AUDI AG nəqliyyat vasitələrinin alışı və istifadəsinə tətbiq olunan məxfilik bildirişi."
      />
      <BreadcrumbJsonLd items={[{ name: PRIVACY_TITLE, to: '/privacy' }]} />

      
      <article className="mx-auto max-w-[1200px] px-5 py-[60px] text-[14.4px] leading-[2] card:py-[100px]">
        
        <h1 className="mb-10 text-[28.8px] font-bold leading-tight">{PRIVACY_TITLE}</h1>

        {PRIVACY_BLOCKS.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </article>
    </>
  )
}
