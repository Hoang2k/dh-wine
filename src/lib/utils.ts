import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom theme tokens from globals.css, otherwise it
// mistakes `text-display-*` for a colour and drops it next to `text-ink`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ['gold', 'gold-deep', 'gold-soft', 'ink', 'ink-soft', 'ivory', 'cream', 'paper', 'wine', 'wine-deep', 'wine-soft', 'stone', 'stone-light', 'line', 'line-strong'],
      text: ['display-xl', 'display-lg', 'display-md', 'display-sm', 'eyebrow'],
      radius: ['xs', 'card'],
      shadow: ['soft', 'lift'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
