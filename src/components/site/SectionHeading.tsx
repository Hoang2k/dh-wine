import { cn } from '@/lib/utils'
import Reveal from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  action?: React.ReactNode
  className?: string
  as?: 'h1' | 'h2'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  action,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const light = tone === 'light'
  const centered = align === 'center'

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && <Eyebrow tone={tone} centered={centered}>{eyebrow}</Eyebrow>}
        <Tag className={cn('heading-display text-display-md', light ? 'text-ivory' : 'text-ink')}>{title}</Tag>
        {description && (
          <p className={cn('mt-5 text-base leading-relaxed md:text-lg', light ? 'text-ivory/70' : 'text-stone')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  )
}

export function Eyebrow({
  children,
  tone = 'dark',
  centered,
  className,
}: {
  children: React.ReactNode
  tone?: 'dark' | 'light'
  centered?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'eyebrow mb-5 flex items-center gap-3',
        tone === 'light' ? 'text-gold' : 'text-wine',
        centered && 'justify-center',
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  )
}
