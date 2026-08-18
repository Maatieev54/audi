import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icons'
import Media from '@/components/ui/Media'
import { formatEur, formatAzn } from '@/data/stock'

export default function CarCard({ car }) {
  return (
    <article>
      <Link to={`/stock/${car.id}`} className="group block">
     
        <Media
          src={car.image}
          label={`Audi ${car.title}`}
          alt={`Audi ${car.title}`}
          ratio="3/2"
          fit="contain"
          className="bg-[#f2f2f2]"
          imgClassName="transition-transform duration-700 ease-audi group-hover:scale-[1.03]"
        />

        <div className="mt-4">
          <h3 className="text-lg">{car.title}</h3>

          <p className="mt-1.5 text-base font-medium">
            {formatEur(car.priceEur)}
            {typeof car.priceAzn === 'number' && (
              <span className="ml-2 text-sm font-normal text-steel-500">
                {formatAzn(car.priceAzn)}
              </span>
            )}
          </p>

          <dl className="mt-3 space-y-1 text-sm text-steel-600">
            <div className="flex gap-1.5">
              <dt className="text-steel-500">Mühərrik:</dt>
              <dd>{car.engine}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="text-steel-500">Güc:</dt>
              <dd>{car.power}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="text-steel-500">Buraxılış ili:</dt>
              <dd>{car.year}</dd>
            </div>
            {car.mileage > 0 && (
              <div className="flex gap-1.5">
                <dt className="text-steel-500">Yürüş:</dt>
                <dd>{car.mileage.toLocaleString('az-AZ').replace(/,/g, ' ')} km</dd>
              </div>
            )}
          </dl>

          <span className="link-underline mt-3 inline-flex text-ink">
            Daha ətraflı
            <ArrowRight />
          </span>
        </div>
      </Link>
    </article>
  )
}
