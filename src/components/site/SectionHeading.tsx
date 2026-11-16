import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  /** Kept for call-site compatibility; section heads open without a label. */
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  action?: React.ReactNode
  className?: string
  as?: 'h1' | 'h2'
}

/** Head block: the head on the left columns, its one line beside or under it, an optional action at the far edge. */
export default function SectionHeading({
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
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', centered && 'mx-auto')}>
        <Tag className={cn('heading-display text-display-md max-w-[22ch]', centered && 'mx-auto', light ? 'text-on-dark' : 'text-ink')}>
          {title}
        </Tag>
        {description && (
          <p className={cn('mt-5 max-w-[52ch] text-lead', centered && 'mx-auto', light ? 'text-on-dark-muted' : 'text-stone')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Retired: section labels above heads. Renders nothing; kept so older imports still compile. */
export function Eyebrow(_props: { children?: React.ReactNode; tone?: 'dark' | 'light'; centered?: boolean; className?: string }) {
  return null
}
