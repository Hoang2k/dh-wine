/**
 * Editorial photography. Swap any entry for another asset in
 * src/assets/image without touching the components that consume it.
 */
import bannerRumImg from '@/assets/image/bannners/rum.png'
import bannerVangDgoldImg from '@/assets/image/bannners/vang-dgold.png'

const bannerRum = bannerRumImg.src
const bannerVangDgold = bannerVangDgoldImg.src

export const images = {
  bannerRum,
  bannerVangDgold,
  heroPour: bannerVangDgold,
  vineyardGlass: bannerVangDgold,
  vineyardSunrise: bannerVangDgold,
  cellarTanks: bannerRum,
  tastingFlight: bannerVangDgold,
  restaurant: bannerVangDgold,
  hotel: bannerVangDgold,
  bar: bannerRum,
  retailShelf: bannerRum,
  wineWall: bannerVangDgold,
  corporateGifts: bannerVangDgold,
  cheesePairing: bannerVangDgold,
  grapesHands: bannerVangDgold,
  rosePour: bannerVangDgold,
  redGlassGrapes: bannerVangDgold,
  sunsetPour: bannerVangDgold,
  toast: bannerRum,
} as const
