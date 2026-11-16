/**
 * Cài đặt website (thương hiệu, liên hệ, khu vực, giao diện, tính năng) lấy từ backend.
 * Mỗi khách hàng chạy một bản cài riêng, nên đây là cấu hình chung của cả bản cài, không phụ thuộc người xem.
 * Dùng `getSite()` trong server component, `useSite()` (lib/site-context) trong client component.
 */

export type ThemePreset = 'gold' | 'burgundy' | 'olive' | 'navy'
export type FeatureKey = 'ageGate' | 'news' | 'inventory' | 'orders' | 'invoices' | 'telegram'

export interface SiteSettings {
  brand: { name: string; shortName: string; tagline: string; logo: string | null; description: string; keywords: string[] }
  contact: { phone: string; zalo: string; facebook: string; email: string; address: string; hours: string }
  region: { province: string; city: string; serviceAreas: string[] }
  content: { aboutHeadline: string; aboutStory: string; responseTime: string }
  theme: { preset: ThemePreset }
  features: Record<FeatureKey, boolean>
}

/** Dự phòng khi chưa gọi được backend (lúc build image). Trùng giá trị mặc định ở backend. */
export const DEFAULT_SETTINGS: SiteSettings = {
  brand: {
    name: 'Hoàng Đinh Wine',
    shortName: 'Hoàng Đinh',
    tagline: 'Nhà phân phối rượu vang nhập khẩu tại Khánh Hòa',
    logo: null,
    description:
      'Hoàng Đinh Wine phân phối rượu vang nhập khẩu chính ngạch cho nhà hàng, khách sạn, nhà bán lẻ và doanh nghiệp tại Khánh Hòa. Danh mục tuyển chọn, giá sỉ minh bạch, giao hàng nhanh.',
    keywords: ['rượu vang nhập khẩu', 'phân phối rượu vang', 'rượu vang cho nhà hàng', 'rượu vang khách sạn', 'quà tặng rượu vang doanh nghiệp', 'giá sỉ rượu vang'],
  },
  contact: {
    phone: '0961 390 119',
    zalo: '0961 390 119',
    facebook: 'https://www.facebook.com/ducminhwine',
    email: 'ducminhkhanhhoa@gmail.com',
    address: 'Nha Trang, Khánh Hòa, Việt Nam',
    hours: 'Thứ 2 đến Chủ nhật, 8:00 đến 18:00',
  },
  region: { province: 'Khánh Hòa', city: 'Nha Trang', serviceAreas: ['Nha Trang', 'Cam Ranh', 'Ninh Hòa', 'Diên Khánh', 'Vạn Ninh', 'Cam Lâm'] },
  content: {
    aboutHeadline: 'Mang tinh hoa rượu vang thế giới đến Khánh Hòa.',
    aboutStory:
      'Khánh Hòa đang trở thành một trong những điểm đến du lịch và nghỉ dưỡng sôi động nhất Việt Nam. Cùng với đó là nhu cầu ngày càng cao về rượu vang chất lượng tại nhà hàng, khách sạn và các sự kiện doanh nghiệp.\n\nHoàng Đinh Wine ra đời để trở thành cầu nối giữa những nhà sản xuất rượu vang uy tín trên thế giới và các doanh nghiệp tại địa phương, với danh mục tuyển chọn, giá sỉ minh bạch và dịch vụ tận nơi.',
    responseTime: '24 giờ',
  },
  theme: { preset: 'gold' },
  features: { ageGate: true, news: true, inventory: true, orders: true, invoices: true, telegram: true },
}

const digits = (s: string) => s.replace(/[^0-9+]/g, '')

/** Cài đặt đã ghép sẵn những giá trị dẫn xuất mà giao diện cần (link gọi, link Zalo…), giữ hình dạng `siteConfig` cũ. */
export function toSite(s: SiteSettings) {
  return {
    ...s,
    name: s.brand.name,
    shortName: s.brand.shortName,
    tagline: s.brand.tagline,
    description: s.brand.description,
    logo: s.brand.logo,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ducminhwine.vn',
    locale: 'vi_VN',
    province: s.region.province,
    city: s.region.city,
    serviceAreas: s.region.serviceAreas,
    contact: {
      ...s.contact,
      phoneHref: `tel:${digits(s.contact.phone)}`,
      zalo: s.contact.zalo ? `https://zalo.me/${digits(s.contact.zalo).replace(/^\+84/, '0')}` : '',
    },
  }
}
export type Site = ReturnType<typeof toSite>

function merge(raw: Partial<SiteSettings> | null | undefined): SiteSettings {
  const r = raw ?? {}
  return {
    brand: { ...DEFAULT_SETTINGS.brand, ...r.brand },
    contact: { ...DEFAULT_SETTINGS.contact, ...r.contact },
    region: { ...DEFAULT_SETTINGS.region, ...r.region },
    content: { ...DEFAULT_SETTINGS.content, ...r.content },
    theme: { ...DEFAULT_SETTINGS.theme, ...r.theme },
    features: { ...DEFAULT_SETTINGS.features, ...r.features },
  }
}

/** Đọc cài đặt phía server; bộ đệm 5 phút, admin lưu thì được làm mới ngay qua /api/revalidate. */
export async function getSettings(): Promise<SiteSettings> {
  const base = process.env.NEXT_PUBLIC_API_URL_SSR
  if (!base) return DEFAULT_SETTINGS
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/site-settings`, { next: { revalidate: 300, tags: ['site'] } })
    if (!res.ok) return DEFAULT_SETTINGS
    return merge(await res.json())
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function getSite(): Promise<Site> {
  return toSite(await getSettings())
}

/** Thay {tinh}, {thanhpho}, {thuonghieu} trong nội dung mẫu bằng giá trị của bản cài. */
export function fill(text: string, site: Pick<Site, 'name' | 'province' | 'city'>) {
  return text.replace(/\{tinh\}/g, site.province).replace(/\{thanhpho\}/g, site.city).replace(/\{thuonghieu\}/g, site.name)
}
