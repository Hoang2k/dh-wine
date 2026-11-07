import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/site/PageHero'
import CtaBand from '@/components/site/CtaBand'
import Reveal from '@/components/site/Reveal'
import SectionHeading, { Eyebrow } from '@/components/site/SectionHeading'
import { siteConfig } from '@/config/site'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Về chúng tôi',
  description:
    'Đức Minh Wine — nhà phân phối rượu vang nhập khẩu tại Khánh Hòa, đồng hành cùng nhà hàng, khách sạn và doanh nghiệp với danh mục tuyển chọn và dịch vụ chuyên nghiệp.',
  alternates: { canonical: '/gioi-thieu' },
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
    text: 'Chúng tôi không chỉ bán rượu — mà cùng đối tác xây dựng wine list, đào tạo nhân sự và phát triển doanh thu đồ uống.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title={
          <>
            Mang tinh hoa rượu vang thế giới đến <em className="text-gold">Khánh Hòa</em>.
          </>
        }
        description={siteConfig.description}
        image={images.vineyardSunrise}
        imageAlt="Vườn nho lúc bình minh"
        breadcrumbs={[{ label: 'Về chúng tôi' }]}
      />

      <section className="section-y bg-ivory">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow>Câu chuyện</Eyebrow>
            <h2 className="heading-display text-display-md text-ink">
              Bắt đầu từ niềm tin rằng mỗi bàn tiệc xứng đáng có một chai vang <em className="text-wine">đúng nghĩa</em>.
            </h2>
          </div>
          <Reveal className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-soft lg:col-span-7 lg:pt-16">
            <p>
              Khánh Hòa đang trở thành một trong những điểm đến du lịch và nghỉ dưỡng sôi động nhất Việt Nam. Cùng với đó là nhu
              cầu ngày càng cao về trải nghiệm ẩm thực và đồ uống đạt chuẩn quốc tế tại nhà hàng, khách sạn và resort.
            </p>
            <p>
              Đức Minh Wine ra đời để trở thành cầu nối giữa những nhà sản xuất rượu vang uy tín trên thế giới và các doanh nghiệp
              tại địa phương — với danh mục được tuyển chọn kỹ lưỡng, giá cả cạnh tranh và dịch vụ tận tâm của một đối tác am hiểu
              thị trường.
            </p>
            <p>
              Chúng tôi tin rằng một danh sách vang tốt không cần dài, mà cần <strong className="font-semibold text-ink">đúng</strong>: đúng
              với concept, đúng với thực đơn và đúng với khách hàng của bạn.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="grid md:grid-cols-3">
          {[images.cellarTanks, images.tastingFlight, images.toast].map((src, i) => (
            <div key={src} className="relative aspect-[4/3] md:aspect-[3/4]">
              <Image src={src} alt={['Hầm ủ rượu vang', 'Các loại vang trên thùng gỗ sồi', 'Nâng ly rượu vang'][i]} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Giá trị cốt lõi" title="Những điều chúng tôi cam kết." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 100} className="bg-paper p-8 md:p-12">
                <span className="heading-display text-5xl text-gold">0{i + 1}</span>
                <h3 className="mt-6 heading-display text-[1.875rem] text-ink">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain section-y relative bg-ink text-ivory">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            tone="light"
            eyebrow="Mạng lưới phục vụ"
            title="Phủ sóng toàn tỉnh Khánh Hòa."
            description="Đội xe giao hàng riêng, giao trong 24 giờ tại nội thành Nha Trang và 24–48 giờ tại các huyện, thị xã."
          />
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ivory/10 bg-ivory/10 sm:grid-cols-3">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area} className="bg-ink p-6">
                <span aria-hidden className="block h-px w-6 bg-gold" />
                <span className="mt-4 block heading-display text-2xl">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
