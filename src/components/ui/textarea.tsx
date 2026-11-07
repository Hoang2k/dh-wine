import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-xs border border-line-strong bg-paper px-4 py-3 text-[0.9375rem] text-ink transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-stone-light hover:border-stone-light focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-gold/60 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
