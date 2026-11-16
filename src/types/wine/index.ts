export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'sweet'

export type BottleShape = 'bordeaux' | 'burgundy' | 'champagne'

export type WineSegment = 'horeca' | 'retail' | 'gift' | 'event'

export type WineBadge = 'bestseller' | 'new' | 'sommelier'

export type WineTier = 'Phổ thông' | 'Cao cấp' | 'Thượng hạng'

export interface IWine {
  slug: string
  name: string
  producer: string
  /** Slug of the brand in `@/data/brands`, used by the "Thương hiệu" filter. */
  brand?: string
  vintage: number | 'NV'
  type: WineType
  country: string
  region: string
  grapes: string[]
  abv: number
  volumeMl: number
  bottle: BottleShape
  servingTemp: string
  tier: WineTier
  caseSize: number
  moqCases: number
  segments: WineSegment[]
  badge?: WineBadge
  /** Optional packshot; falls back to the generated bottle render when absent. */
  image?: string
  summary: string
  description: string
  tasting: { nose: string; palate: string; finish: string }
  pairing: string[]
}

export interface IWineFilters {
  brand?: string
  type?: WineType
  country?: string
  segment?: WineSegment
  search?: string
}
