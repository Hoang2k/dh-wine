'use client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { createFeedback } from '@/services/feedback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { BUSINESS_TYPES } from '@/data/solutions'

const schema = z.object({
  name: z.string().trim().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự).').max(256),
  company: z.string().trim().max(256).optional().or(z.literal('')),
  businessType: z.string().min(1, 'Vui lòng chọn loại hình kinh doanh.'),
  phone: z
    .string()
    .trim()
    .min(9, 'Số điện thoại chưa hợp lệ.')
    .max(15, 'Số điện thoại chưa hợp lệ.')
    .regex(/^\+?[0-9\s.]+$/, 'Số điện thoại chỉ gồm chữ số.'),
  email: z.string().trim().email('Email chưa hợp lệ.').max(256).optional().or(z.literal('')),
  message: z.string().trim().max(2000, 'Nội dung tối đa 2000 ký tự.').optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export type QuoteLine = { label: string; cases: number }

type QuoteFormProps = {
  /** Wines attached to the request (quote page). */
  lines?: QuoteLine[]
  /** Pre-selects the business type, e.g. from a solutions page. */
  defaultBusinessType?: string
  subjectPrefix?: string
  tone?: 'light' | 'dark'
  submitLabel?: string
  onSubmitted?: () => void
  className?: string
}

export default function QuoteForm({
  lines = [],
  defaultBusinessType = '',
  subjectPrefix = 'Yêu cầu báo giá',
  tone = 'light',
  submitLabel = 'Gửi yêu cầu báo giá',
  onSubmitted,
  className,
}: QuoteFormProps) {
  const [sent, setSent] = React.useState(false)
  const dark = tone === 'dark'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', company: '', businessType: defaultBusinessType, phone: '', email: '', message: '' },
  })

  const onSubmit = async (values: FormValues) => {
    const content = [
      `Loại hình: ${values.businessType}`,
      values.company && `Doanh nghiệp: ${values.company}`,
      lines.length > 0 && `Sản phẩm quan tâm:\n${lines.map((l) => `- ${l.label}: ${l.cases} thùng`).join('\n')}`,
      values.message && `Ghi chú: ${values.message}`,
    ]
      .filter(Boolean)
      .join('\n\n')

    try {
      await createFeedback({
        name: values.name,
        phone: values.phone.replace(/[\s.]/g, ''),
        email: values.email || undefined,
        subject: `${subjectPrefix} – ${values.company || values.name}`.slice(0, 256),
        content: content.slice(0, 2000),
      })
      setSent(true)
      reset()
      onSubmitted?.()
    } catch {
      toast.error('Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi hotline.')
    }
  }

  if (sent) {
    return (
      <div className={cn('flex flex-col items-start gap-5 py-6', className)} role="status">
        <CheckCircle2 className="size-10 text-gold" strokeWidth={1.5} />
        <h3 className={cn('heading-display text-display-sm', dark ? 'text-ivory' : 'text-ink')}>
          Cảm ơn quý khách đã liên hệ.
        </h3>
        <p className={cn('max-w-md', dark ? 'text-ivory/70' : 'text-stone')}>
          Chuyên viên kinh doanh của Đức Minh Wine sẽ phản hồi kèm bảng giá sỉ trong vòng 24 giờ làm việc.
        </p>
        <Button variant={dark ? 'outlineLight' : 'outline'} size="sm" onClick={() => setSent(false)}>
          Gửi yêu cầu khác
        </Button>
      </div>
    )
  }

  const labelCls = cn('mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em]', dark ? 'text-ivory/70' : 'text-stone')
  const fieldCls = dark ? 'border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/35 hover:border-ivory/40 focus-visible:border-gold' : ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('grid gap-5 sm:grid-cols-2', className)}>
      <Field label="Họ và tên *" error={errors.name?.message} labelCls={labelCls} htmlFor="q-name">
        <Input id="q-name" autoComplete="name" aria-invalid={!!errors.name} className={fieldCls} placeholder="Nguyễn Văn A" {...register('name')} />
      </Field>
      <Field label="Doanh nghiệp" error={errors.company?.message} labelCls={labelCls} htmlFor="q-company">
        <Input id="q-company" autoComplete="organization" className={fieldCls} placeholder="Tên nhà hàng, khách sạn…" {...register('company')} />
      </Field>
      <Field label="Số điện thoại *" error={errors.phone?.message} labelCls={labelCls} htmlFor="q-phone">
        <Input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} className={fieldCls} placeholder="09xx xxx xxx" {...register('phone')} />
      </Field>
      <Field label="Email" error={errors.email?.message} labelCls={labelCls} htmlFor="q-email">
        <Input id="q-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={fieldCls} placeholder="ban@congty.vn" {...register('email')} />
      </Field>
      <Field label="Loại hình kinh doanh *" error={errors.businessType?.message} labelCls={labelCls} htmlFor="q-type" full>
        <div className="relative">
          <select
            id="q-type"
            aria-invalid={!!errors.businessType}
            className={cn(
              'h-12 w-full appearance-none rounded-xs border border-line-strong bg-paper px-4 pr-10 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] hover:border-stone-light focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-gold/60 aria-invalid:border-destructive',
              dark && 'border-ivory/20 bg-ink text-ivory hover:border-ivory/40 focus-visible:border-gold',
            )}
            {...register('businessType')}
          >
            <option value="">Chọn loại hình</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden className={cn('pointer-events-none absolute right-4 top-1/2 size-2 -translate-y-3/4 rotate-45 border-b border-r', dark ? 'border-ivory/70' : 'border-ink')} />
        </div>
      </Field>
      <Field label="Nhu cầu của quý khách" error={errors.message?.message} labelCls={labelCls} htmlFor="q-message" full>
        <Textarea
          id="q-message"
          rows={4}
          className={cn('min-h-28', fieldCls)}
          placeholder="Dòng vang quan tâm, sản lượng dự kiến hàng tháng, thời gian cần hàng…"
          {...register('message')}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={cn('text-xs leading-relaxed', dark ? 'text-ivory/50' : 'text-stone-light')}>
          Thông tin chỉ dùng để tư vấn & báo giá. Chỉ bán cho khách hàng từ 18 tuổi trở lên.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Đang gửi…' : submitLabel}
          <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  labelCls,
  htmlFor,
  full,
  children,
}: {
  label: string
  error?: string
  labelCls: string
  htmlFor: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={cn(full && 'sm:col-span-2')}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-[#e0605a]">
          {error}
        </p>
      )}
    </div>
  )
}
