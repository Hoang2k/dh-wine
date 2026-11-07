import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-ivory px-4 py-24 text-center">
      <div className="max-w-lg">
        <p className="heading-display text-[7rem] leading-none text-gold md:text-[10rem]">404</p>
        <h1 className="mt-4 heading-display text-display-sm text-ink">Trang này đã được “mở nắp” và không còn nữa.</h1>
        <p className="mt-4 text-stone">Đường dẫn có thể đã thay đổi. Hãy quay về trang chủ hoặc khám phá danh mục rượu vang.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/san-pham">Xem sản phẩm</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
