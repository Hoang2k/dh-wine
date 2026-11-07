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
          'inline-flex h-9 items-center justify-center gap-1.5 rounded-xs border text-[0.8125rem] font-semibold transition-colors duration-300',
          added
            ? 'border-wine bg-wine-soft text-wine hover:bg-wine hover:text-ivory'
            : 'border-gold bg-gold text-ink hover:border-gold-deep hover:bg-gold-deep',
          className,
        )}
      >
        {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        {added ? 'Đã thêm · thêm nữa' : 'Thêm vào báo giá'}
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
