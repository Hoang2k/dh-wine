'use client'
import * as React from 'react'
import Link from 'next/link'
import { Brand } from '@/data/brands'

function BrandLogo({ brand }: { brand: Brand }) {
  // The name is the default; the logo replaces it only once the file has actually loaded.
  const [loaded, setLoaded] = React.useState(false)
  return (
    <>
      {!loaded && (
        <span className="font-display text-display-sm text-ink transition-colors duration-[var(--dur-short)] group-hover:text-gold-deep">
          {brand.name}
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.logo}
        alt={loaded ? brand.name : ''}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'max-h-10 max-w-[10rem] object-contain' : 'hidden'}
      />
    </>
  )
}

/** Brand index: the head on the left columns, the brand names on a hairline list beside it. */
export default function HomeBrands({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null

  return (
    <section aria-labelledby="home-brands-title" className="section-y border-t border-line bg-washi">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="home-brands-title" className="heading-display text-display-md max-w-[12ch] text-ink">
            Thương hiệu phân phối
          </h2>
          <p className="mt-4 max-w-[36ch] text-stone">Chọn một thương hiệu để xem các nhãn đang có.</p>
        </div>

        <ul className="grid border-t border-ink sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
          {brands.map((brand) => (
            <li key={brand.slug} className="border-b border-line sm:odd:pr-6 xl:pr-6">
              <Link
                href={`/san-pham?thuong-hieu=${encodeURIComponent(brand.slug)}`}
                className="group flex min-h-20 items-center py-4"
              >
                <BrandLogo brand={brand} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
