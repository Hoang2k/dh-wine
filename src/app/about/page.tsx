import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/site/PageHero'
import CtaBand from '@/components/site/CtaBand'
import Reveal from '@/components/site/Reveal'
import SectionHeading from '@/components/site/SectionHeading'
import { fill, getSite } from '@/lib/site'
import { images } from '@/lib/images'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    title: 'Về chúng tôi',
    description: `${site.name}, nhà phân phối rượu vang nhập khẩu tại ${site.province}, đồng hành cùng nhà hàng, khách sạn và doanh nghiệp với danh mục tuyển chọn và dịch vụ chuyên nghiệp.`,
    alternates: { canonical: '/gioi-thieu' },
  }
}

const values = [
  {
    title: 'Tuyển chọn khắt khe',
    text: 'Mỗi nhãn vang được nếm thử, đánh giá về chất lượng, độ ổn định và sự phù hợp với khí hậu, ẩm thực miền biển trước khi vào danh mục.',
  },
  {
    title: 'Minh bạch nguồn gốc',
    text: 'Nhập khẩu chính ngạch, đầy đủ chứng từ, tem nhãn phụ và hóa đơn VAT. Không hàng xách tay, không hàng trôi nổi.',
  },
  {
    title: 'Bảo quản chuẩn mực',
    text: 'Kho lưu trữ ổn định nhiệt độ, độ ẩm; vận chuyển bằng xe chuyên dụng để mỗi chai vang giữ trọn hương vị khi đến tay khách hàng.',
  },
  {
    title: 'Đồng hành dài hạn',
    text: 'Chúng tôi không chỉ bán rượu, mà cùng đối tác xây dựng wine list, đào tạo nhân sự và phát triển doanh thu đồ uống.',
  },
]

export default async function AboutPage() {
  const siteConfig = await getSite()
  return (
    <>
      <PageHero
        title={
          <>
            {fill(siteConfig.content.aboutHeadline, siteConfig)}
          </>
        }
        description={siteConfig.description}
        image={images.vineyardSunrise}
        imageAlt="Vườn nho lúc bình minh"
        breadcrumbs={[{ label: 'Về chúng tôi' }]}
      />

      <section className="section-y bg-washi">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="heading-display text-display-md max-w-[18ch] text-ink">
              Mỗi bàn tiệc xứng đáng một chai vang đúng nghĩa
            </h2>
          </div>
          <Reveal className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7">
            {siteConfig.content.aboutStory
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((para, k) => (
                <p key={k}>{fill(para, siteConfig)}</p>
              ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-washi">
        <div className="container-site grid gap-4 md:grid-cols-[7fr_5fr]">
          {[images.cellarTanks, images.tastingFlight].map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-card md:aspect-auto md:min-h-[520px]">
              <Image src={src} alt={['Hầm ủ rượu vang', 'Các loại vang trên thùng gỗ sồi', 'Nâng ly rượu vang'][i]} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-washi">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading title="Những điều chúng tôi cam kết" className="lg:col-span-4" />
          <ul className="border-t border-ink lg:col-span-8">
            {values.map((v) => (
              <li key={v.title} className="grid gap-2 border-b border-line py-8 md:grid-cols-[5fr_7fr] md:gap-8">
                <h3 className="heading-display text-display-sm text-ink">{v.title}</h3>
                <p className="text-ink-soft">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y relative bg-ink text-on-dark">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            tone="light"
            title={`Phủ sóng toàn tỉnh ${siteConfig.province}`}
            description={`Đội xe giao hàng riêng, giao trong 24 giờ tại nội thành ${siteConfig.city} và 24 đến 48 giờ tại các huyện, thị xã.`}
          />
          <ul className="grid grid-cols-2 border-t border-ink-rule sm:grid-cols-3">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area} className="border-b border-ink-rule py-6 pr-4">
                <span className="block font-display text-2xl text-on-dark">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
