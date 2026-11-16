'use client'
import { Check, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { useQuote } from '@/contexts/QuoteContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AddToQuoteButtonProps = {
  slug: string
  cases?: number
  compact?: boolean
  className?: string
}

export default function AddToQuoteButton({ slug, cases = 1, compact, className }: AddToQuoteButtonProps) {
  const { addItem, has, hydrated } = useQuote()
  const added = hydrated && has(slug)

  const onClick = () => {
    addItem(slug, cases)
    toast.success(added ? `Đã cập nhật số lượng trong danh sách báo giá` : 'Đã thêm vào danh sách báo giá')
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={added}
        className={cn(
          'inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-[var(--dur-short)] active:translate-y-px',
          added
            ? 'border-gold-deep bg-gold-deep text-paper hover:border-ink hover:bg-ink'
            : 'border-ink text-ink hover:bg-ink hover:text-paper',
          className,
        )}
      >
        {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        {added ? 'Đã thêm' : 'Thêm báo giá'}
      </button>
    )
  }

  return (
    <Button type="button" size="lg" onClick={onClick} className={className}>
      {added ? <Check /> : <Plus />}
      {added ? 'Thêm số lượng' : 'Thêm vào báo giá'}
    </Button>
  )
}
