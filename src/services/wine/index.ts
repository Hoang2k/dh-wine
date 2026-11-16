import request from '@/axios'
import { brands } from '@/data/brands'
import { IResponseData } from '@/types/common'
import { IWine, IWineFilters } from '@/types/wine'

/**
 * Catalogue access layer — backed by the backend client API (`/client/wines`).
 * The API payload already matches `IWine` (nested `tasting`, `badge`, `segments`…),
 * so responses are returned as-is. Signatures are kept so pages need no changes.
 */

const BASE = '/client/wines'
const CACHE = 300 // 5 min
const STATIC_CACHE = 3600 // 1 hour

export const getWines = async (filters: IWineFilters = {}): Promise<IWine[]> => {
  try {
    const params: Record<string, string> = {}
    if (filters.brand) params.brand = filters.brand
    if (filters.type) params.type = filters.type
    if (filters.country) params.country = filters.country
    if (filters.segment) params.segment = filters.segment
    const res = await request.get<IResponseData<IWine[]>>({
      url: BASE,
      params,
      headers: { 'Cache-Control': `max-age=${CACHE}` },
    })
    const list = res?.data ?? []
    // Backend client list has no free-text param; narrow by search client-side.
    return filters.search ? filterWines(list, { search: filters.search }) : list
  } catch (error) {
    console.error('Error fetching wines:', error)
    return []
  }
}

export const getWineBySlug = async (slug: string): Promise<IWine | null> => {
  try {
    const res = await request.get<IWine>({
      url: `${BASE}/slug/${slug}`,
      headers: { 'Cache-Control': `max-age=${STATIC_CACHE}` },
    })
    return res ?? null
  } catch (error) {
    console.error('Error fetching wine detail:', error)
    return null
  }
}

export const getFeaturedWines = async (limit = 4): Promise<IWine[]> => {
  try {
    const res = await request.get<IWine[]>({
      url: `${BASE}/featured`,
      params: { limit },
      headers: { 'Cache-Control': `max-age=${CACHE}` },
    })
    return res ?? []
  } catch (error) {
    console.error('Error fetching featured wines:', error)
    return []
  }
}

export const getRelatedWines = async (wine: IWine, limit = 4): Promise<IWine[]> => {
  try {
    const res = await request.get<IWine[]>({
      url: `${BASE}/slug/${wine.slug}/related`,
      params: { limit },
      headers: { 'Cache-Control': `max-age=${CACHE}` },
    })
    return res ?? []
  } catch (error) {
    console.error('Error fetching related wines:', error)
    return []
  }
}

export const getWineCountries = async (): Promise<string[]> => {
  try {
    const res = await request.get<IResponseData<string[]>>({
      url: `${BASE}/countries`,
      headers: { 'Cache-Control': `max-age=${STATIC_CACHE}` },
    })
    return res?.data ?? []
  } catch (error) {
    console.error('Error fetching wine countries:', error)
    return []
  }
}

export const getAllWineSlugs = async (): Promise<string[]> => {
  try {
    const res = await request.get<IResponseData<string[]>>({
      url: `${BASE}/slugs`,
      headers: { 'Cache-Control': `max-age=${STATIC_CACHE}` },
    })
    return res?.data ?? []
  } catch (error) {
    console.error('Error fetching wine slugs:', error)
    return []
  }
}

/** Client-side filtering used by the catalogue page over an already-fetched list. */
export function filterWines(list: IWine[], { brand, type, country, segment, search }: IWineFilters): IWine[] {
  const q = search?.trim().toLowerCase()
  return list.filter(
    (w) =>
      (!brand || w.brand === brand) &&
      (!type || w.type === type) &&
      (!country || w.country === country) &&
      (!segment || w.segments.includes(segment)) &&
      (!q ||
        [w.name, w.producer, brandName(w.brand), w.region, w.country, ...w.grapes].some((v) =>
          v.toLowerCase().includes(q),
        )),
  )
}

const brandName = (slug?: string) => brands.find((b) => b.slug === slug)?.name ?? ''
