import { useState } from 'react'
import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import CarImage from '@/components/ui/CarImage'
import { ArrowRight } from '@/components/ui/Icons'
import TestDriveForm from '@/components/forms/TestDriveForm'
import { testDriveModels } from '@/data/models'

export default function TestDrive() {
  const models = testDriveModels()
  const [selected, setSelected] = useState(models[0]?.slug ?? '')

  const selectedModel = models.find((m) => m.slug === selected)

  return (
    <>
      <Seo
        title="Test Drive"
        description="Audi avtomobilini sürməyi sınayın. Test yürüşünə onlayn qeydiyyat — modeli seçin və formu doldurun."
      />
      <BreadcrumbJsonLd items={[{ name: 'Test Drive', to: '/test-drive' }]} />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">
        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">Test Drive</h1>

        
        <h2 id="pick-model-title" className="mt-8 text-[21.6px] font-bold tracking-normal">
          Model Seçin
        </h2>

        <ul
          role="radiogroup"
          aria-labelledby="pick-model-title"
          className="m-0 mb-[60px] mt-6 list-none p-0 text-center"
        >
          {models.map((m) => {
            const isActive = m.slug === selected

            return (
              <li
                key={m.slug}
                className="relative inline-block w-[90%] align-top transition-transform
                           duration-200 hover:scale-105 card:w-1/3"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSelected(m.slug)}
                  className="block w-full cursor-pointer px-3 pb-3 text-left"
                >
                  <CarImage
                    model={m}
                    alt={`Audi ${m.name}`}
                    className="mx-auto h-[110px] w-full object-contain sm:h-[130px]"
                  />

                  
                  <span
                    className={`mt-2 flex items-center gap-1.5 text-left text-[14.4px] font-bold
                                transition-colors duration-200 ${
                                  isActive ? 'text-[#cc123d]' : 'text-ink'
                                }`}
                  >
                    Audi {m.name}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 border-b-4 border-[#900]
                              transition-all duration-[400ms] ${isActive ? 'w-[90%]' : 'w-0'}`}
                />
              </li>
            )
          })}
        </ul>

        
        <h2 id="td-form-title" className="text-[21.6px] font-bold tracking-normal">
          Test yürüşünə yazılmaq üçün qeydiyyatdan keçin
        </h2>

        <div className="mt-6">
          <TestDriveForm selectedModel={selectedModel ? `Audi ${selectedModel.name}` : ''} />
        </div>
      </div>
    </>
  )
}
