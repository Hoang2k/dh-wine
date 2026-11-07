import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xs border border-line-strong bg-paper px-4 text-[0.9375rem] text-ink transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-stone-light selection:bg-gold selection:text-ink file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-stone-light focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-gold/60",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
