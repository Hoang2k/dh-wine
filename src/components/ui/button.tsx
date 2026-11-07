import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xs font-sans text-[0.9375rem] font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-luxe disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-ink shadow-[inset_0_-2px_0_rgb(0_0_0/0.08)] hover:bg-gold-deep hover:shadow-soft active:translate-y-px",
        dark: "bg-ink text-ivory hover:bg-wine",
        wine: "bg-wine text-ivory hover:bg-wine-deep",
        outline:
          "border border-line-strong bg-paper text-ink hover:border-ink hover:bg-ink hover:text-ivory",
        outlineLight:
          "border border-ivory/50 bg-transparent text-ivory hover:border-gold hover:bg-gold hover:text-ink",
        secondary: "bg-cream text-ink hover:bg-line",
        ghost: "text-ink hover:bg-cream",
        link: "h-auto px-0 text-wine hover:text-wine-deep hover:underline underline-offset-4",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.8125rem]",
        lg: "h-12 px-7 text-base",
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
