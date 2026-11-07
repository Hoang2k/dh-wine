import Image from 'next/image'
import Link from 'next/link'
import { IPost } from '@/types/post'
import { cn } from '@/lib/utils'

export const formatPostDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : ''

type PostCardProps = {
  post: IPost
  layout?: 'stack' | 'row'
  priority?: boolean
  className?: string
}

/** Editorial article card shared by the home page and the journal. */
export default function PostCard({ post, layout = 'stack', priority, className }: PostCardProps) {
  const row = layout === 'row'
  return (
    <article className={cn('group relative', row ? 'grid grid-cols-[1fr_7rem] gap-5 sm:grid-cols-[1fr_11rem]' : 'flex flex-col', className)}>
      <div className={cn('relative overflow-hidden rounded-card bg-cream', row ? 'order-2 aspect-[4/3]' : 'aspect-[3/2]')}>
        {post.thumbnailImage?.path ? (
          <Image
            src={post.thumbnailImage.path}
            alt={post.thumbnailImage.altText || post.title}
            fill
            priority={priority}
            sizes={row ? '180px' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center heading-display text-4xl text-line-strong">Đ</div>
        )}
      </div>
      <div className={cn(row ? 'order-1' : 'pt-6')}>
        <p className="eyebrow text-[0.6875rem] text-wine">
          {post.category?.name}
          {post.category?.name && post.publishAt ? <span className="mx-2 text-line-strong">/</span> : null}
          <span className="text-stone">{formatPostDate(post.publishAt)}</span>
        </p>
        <h3 className={cn('mt-3 heading-display leading-snug text-ink transition-colors group-hover:text-wine', row ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-[1.625rem]')}>
          <Link href={`/tin-tuc/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {!row && post.summary && <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-stone">{post.summary}</p>}
      </div>
    </article>
  )
}
