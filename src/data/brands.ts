export type Brand = { slug: string; name: string; logo: string }

/** Logos live in /public/images/brands/<slug>.png — swap or add entries here. */
const brand = (slug: string, name: string): Brand => ({ slug, name, logo: `/images/brands/${slug}.png` })

export const brands: Brand[] = [
  brand('chivas', 'Chivas'),
  brand('isc', 'Isc'),
  brand('macallan', 'HanViet'),
  brand('glenfiddich', "D'Gold"),
  brand('glenlivet', 'Chau Vet'),
  brand('singleton', 'Vodka'),
  brand('hennessy', 'Asia'),
]
