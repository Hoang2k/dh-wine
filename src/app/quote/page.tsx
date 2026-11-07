import type { Metadata } from 'next'
import PageHero from '@/components/site/PageHero'
import QuoteClient from '@/components/Quote/QuoteClient'
import { BUSINESS_TYPES } from '@/data/solutions'

export const metadata: Metadata = {
  title: 'Yêu cầu báo giá sỉ',
  description: 'Gửi danh sách rượu vang quan tâm và nhận bảng giá sỉ, chính sách chiết khấu từ Đức Minh Wine trong 24 giờ.',
  alternates: { canonical: '/bao-gia' },
}

type QuotePageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const requested = (await searchParams)['loai-hinh']
  const businessType =
    typeof requested === 'string' && (BUSINESS_TYPES as readonly string[]).includes(requested) ? requested : ''

  return (
    <>
      <PageHero
        eyebrow="Báo giá B2B"
        title="Yêu cầu báo giá sỉ"
        description="Chọn các nhãn vang quan tâm, điền thông tin doanh nghiệp — chuyên viên của chúng tôi sẽ gửi bảng giá sỉ và chính sách chiết khấu trong vòng 24 giờ làm việc."
        breadcrumbs={[{ label: 'Báo giá' }]}
      />
      <QuoteClient defaultBusinessType={businessType} />
    </>
  )
}
