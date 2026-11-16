import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-xs border border-line-strong bg-paper px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-short)] outline-none placeholder:text-stone hover:border-stone focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
