import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-[0.9375rem] font-semibold transition-[background-color,color,border-color,transform] duration-[var(--dur-short)] ease-luxe disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-destructive active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-gold-deep text-paper hover:bg-ink",
        gold: "bg-gold text-ink hover:bg-on-dark",
        dark: "bg-ink text-on-dark hover:bg-gold-deep",
        wine: "bg-gold-deep text-paper hover:bg-ink",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        outlineLight: "border border-on-dark-muted bg-transparent text-on-dark hover:border-gold hover:bg-gold hover:text-ink",
        secondary: "bg-cream text-ink hover:bg-line-strong",
        ghost: "text-ink hover:bg-cream",
        link: "h-auto px-0 text-gold-deep underline decoration-line-strong underline-offset-4 hover:decoration-current",
        destructive: "bg-error text-paper hover:bg-ink",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-12 px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
