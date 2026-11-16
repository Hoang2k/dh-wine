/**
 * Đường dẫn và menu cố định của website.
 * Thương hiệu, liên hệ, khu vực, giao diện nằm trong Cài đặt website (admin), đọc qua lib/site.
 */
export type NavItem = { href: string; label: string }

/** Destinations of the three primary B2B calls to action. */
export const ctaLinks = {
  quote: '/bao-gia',
  dealer: `/bao-gia?loai-hinh=${encodeURIComponent('Nhà phân phối / Đại lý')}`,
  gift: `/bao-gia?loai-hinh=${encodeURIComponent('Quà tặng doanh nghiệp')}`,
  sales: '/lien-he',
} as const

/** Items of the horizontal nav bar, after the "Thương hiệu" mega menu. */
export const mainNav: NavItem[] = [
  { href: '/giai-phap#qua-tang', label: 'Quà tặng doanh nghiệp' },
  // { href: '/giai-phap', label: 'Giải pháp B2B' },
  { href: '/gioi-thieu', label: 'Về chúng tôi' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
]
