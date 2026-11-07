/**
 * Central brand & business configuration.
 * TODO(business): replace contact details and stats with verified figures before launch.
 */
export const siteConfig = {
  name: 'Đức Minh Wine',
  shortName: 'Đức Minh',
  tagline: 'Nhà phân phối rượu vang nhập khẩu tại Khánh Hòa',
  description:
    'Đức Minh Wine phân phối rượu vang nhập khẩu chính ngạch cho nhà hàng, khách sạn, nhà bán lẻ và doanh nghiệp tại Khánh Hòa. Danh mục tuyển chọn, giá sỉ minh bạch, giao hàng nhanh.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ducminhwine.vn',
  locale: 'vi_VN',
  contact: {
    phone: '0961 390 119',
    phoneHref: 'tel:0900000000',
    zalo: 'https://zalo.me/0900000000',
    facebook: 'https://www.facebook.com/ducminhwine',
    email: 'ducminhkhanhhoa@gmail.com',
    address: 'Nha Trang, Khánh Hòa, Việt Nam',
    hours: 'Thứ 2 – Chủ nhật · 8:00 – 18:00',
  },
  serviceAreas: ['Nha Trang', 'Cam Ranh', 'Ninh Hòa', 'Diên Khánh', 'Vạn Ninh', 'Cam Lâm'],
  stats: [
    { value: '120+', label: 'Nhãn vang tuyển chọn' },
    { value: '8', label: 'Quốc gia sản xuất' },
    { value: '24h', label: 'Giao hàng nội thành' },
    { value: '16°C', label: 'Kho bảo quản ổn định' },
  ],
} as const

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
