import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="bg-washi">
      <div className="container-site grid min-h-[70svh] content-center gap-6 py-24 lg:grid-cols-12 lg:items-end lg:gap-8">
        <p aria-hidden className="font-display text-[clamp(6rem,16vw,14rem)] leading-none text-wine lg:col-span-5">404</p>
        <div className="lg:col-span-7">
        <h1 className="heading-display text-display-md max-w-[16ch] text-ink">Trang này đã được “mở nắp”</h1>
        <p className="mt-5 max-w-[44ch] text-lead text-stone">Đường dẫn có thể đã thay đổi. Hãy xem danh mục rượu vang.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/san-pham">Xem sản phẩm</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  )
}
