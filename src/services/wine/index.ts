import { brands } from '@/data/brands'
import { wines } from '@/data/wines'
import { IWine, IWineFilters } from '@/types/wine'

/**
 * Catalogue access layer. Backed by local data for now; keep the async
 * signatures so pages need no changes once the product API is wired in.
 */
export const getWines = async (filters: IWineFilters = {}): Promise<IWine[]> => {
  return filterWines(wines, filters)
}

export const getWineBySlug = async (slug: string): Promise<IWine | null> => {
  return wines.find((w) => w.slug === slug) ?? null
}

export const getFeaturedWines = async (limit = 4): Promise<IWine[]> => {
  return wines.filter((w) => w.badge).slice(0, limit)
}

export const getRelatedWines = async (wine: IWine, limit = 4): Promise<IWine[]> => {
  return wines
    .filter((w) => w.slug !== wine.slug)
    .sort((a, b) => score(b, wine) - score(a, wine))
    .slice(0, limit)
}

export const getWineCountries = (): string[] =>
  Array.from(new Set(wines.map((w) => w.country))).sort((a, b) => a.localeCompare(b, 'vi'))

export const getAllWineSlugs = (): string[] => wines.map((w) => w.slug)

export function filterWines(list: IWine[], { brand, type, country, segment, search }: IWineFilters): IWine[] {
  const q = search?.trim().toLowerCase()
  return list.filter(
    (w) =>
      (!brand || w.brand === brand) &&
      (!type || w.type === type) &&
      (!country || w.country === country) &&
      (!segment || w.segments.includes(segment)) &&
      (!q ||
        [w.name, w.producer, brandName(w.brand), w.region, w.country, ...w.grapes].some((v) => v.toLowerCase().includes(q))),
  )
}

const brandName = (slug?: string) => brands.find((b) => b.slug === slug)?.name ?? ''

const score = (candidate: IWine, base: IWine) =>
  (candidate.type === base.type ? 2 : 0) +
  (candidate.country === base.country ? 1 : 0) +
  candidate.segments.filter((s) => base.segments.includes(s)).length * 0.5
