import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Backend gọi sau khi lưu Cài đặt website để mọi trang dựng lại ngay.
 * Chỉ gọi nội bộ (http://fe:3000), proxy công khai chuyển /api sang backend nên không lộ ra ngoài; vẫn kiểm tra khóa bí mật.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  revalidateTag('site')
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
