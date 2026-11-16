'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IPost } from '@/types/post'
import { cn } from '@/lib/utils'
import { useSite } from '@/lib/site-context'

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
  const site = useSite()
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
            className="object-cover"
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center gap-1 bg-wine-deep text-center">
            <span className="font-display text-2xl text-on-dark">{site.shortName}</span>
            <span className="text-sm text-on-dark-muted">Tạp chí rượu vang</span>
          </div>
        )}
      </div>
      <div className={cn(row ? 'order-1' : 'pt-6')}>
        <h3 className={cn('heading-display !leading-[1.2] text-ink transition-colors group-hover:text-gold-deep', row ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-[1.625rem]')}>
          <Link href={`/tin-tuc/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {!row && post.summary && <p className="mt-3 line-clamp-2 text-ink-soft">{post.summary}</p>}
        <p className="mt-3 flex flex-wrap gap-x-3 text-sm text-stone">
          {post.category?.name && <span className="font-medium text-gold-deep">{post.category.name}</span>}
          {post.publishAt && <time dateTime={post.publishAt}>{formatPostDate(post.publishAt)}</time>}
        </p>
      </div>
    </article>
  )
}
