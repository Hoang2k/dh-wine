'use client'
import * as React from 'react'
import Link from 'next/link'
import { Brand } from '@/data/brands'

function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = React.useState(false)
  if (failed) {
    return <span className="heading-display text-center text-2xl text-ink">{brand.name}</span>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logo}
      alt={brand.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  )
}

/** Brand logo grid with centred heading, the "Thương hiệu" block on the homepage. */
export default function HomeBrands({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null

  return (
    <section aria-labelledby="home-brands-title" className="py-10 md:py-14">
      <div className="container-site">
        <div className="flex items-center gap-6">
          <span aria-hidden className="h-px flex-1 bg-line" />
          <h2 id="home-brands-title" className="heading-display text-display-sm uppercase tracking-tight text-ink">
            Thương hiệu
          </h2>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <span aria-hidden className="mx-auto mt-3 block h-0.5 w-12 bg-wine" />

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-6">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/san-pham?thuong-hieu=${encodeURIComponent(brand.slug)}`}
                title={brand.name}
                className="group block text-center"
              >
                <span className="flex aspect-[4/3] items-center justify-center rounded-card border border-line bg-paper p-6 transition-colors group-hover:border-wine">
                  <BrandLogo brand={brand} />
                </span>
                <span className="mt-4 block text-sm font-medium uppercase tracking-wider text-ink transition-colors group-hover:text-wine">
                  {brand.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
