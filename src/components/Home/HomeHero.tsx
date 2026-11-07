import { BadgeCheck, FlaskConical, ReceiptText, Wine } from 'lucide-react'
import BannerSlider, { BannerSlide } from '@/components/Home/BannerSlider'
import { ctaLinks } from '@/config/site'
import { images } from '@/lib/images'

const slides: BannerSlide[] = [
  {
    href: ctaLinks.quote,
    image: images.bannerVangDgold,
    imageAlt: "D'Gold – tinh hoa vang Đà Lạt, bộ sưu tập vang và vang nổ cao cấp",
    eyebrow: 'Vang Đà Lạt',
    title: "D'Gold – Tinh hoa vang Đà Lạt",
    text: 'Khám phá bộ sưu tập cao cấp.',
    cta: 'Yêu cầu báo giá',
  },
  {
    href: ctaLinks.dealer,
    image: images.bannerRum,
    imageAlt: 'Rượu Đức Minh Khánh Hoà – Rum Nha Trang, đẳng cấp vị rum, trọn vẹn hương trái cây',
    eyebrow: 'Phân phối độc quyền tại Khánh Hoà',
    title: 'Rượu Đức Minh Khánh Hoà – Tinh hoa Nha Trang',
    text: 'Đẳng cấp vị rum – trọn vẹn hương trái cây.',
    cta: 'Trở thành đại lý',
  },
]

const usps = [
  { icon: BadgeCheck, title: 'Nhập khẩu chính ngạch', text: 'Đầy đủ chứng từ, tem nhãn phụ' },
  { icon: ReceiptText, title: 'Hóa đơn VAT', text: 'Xuất hóa đơn cho mọi đơn hàng' },
  { icon: Wine, title: 'Tư vấn sommelier', text: 'Đồng hành xây dựng wine list' },
  { icon: FlaskConical, title: 'Mẫu thử cho đối tác', text: 'Thử vang trước khi đặt hàng' },
]

export default function HomeHero() {
  return (
    <section className="bg-paper">
      <h1 className="sr-only">Đức Minh Wine — phân phối rượu vang nhập khẩu cho doanh nghiệp</h1>
      <BannerSlider slides={slides} />

      <div className="container-site mt-4">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
          {usps.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 bg-paper p-3 sm:p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-soft text-wine">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-semibold text-ink">{title}</span>
                <span className="mt-0.5 block text-xs text-stone">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
