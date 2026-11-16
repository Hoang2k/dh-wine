import * as React from 'react'

type RevealProps<T extends React.ElementType> = {
  as?: T
  /** Kept for call-site compatibility; the site no longer animates entrances. */
  delay?: number
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>

/** Plain wrapper. Content is visible at rest, with or without script. */
export default function Reveal<T extends React.ElementType = 'div'>({ as, delay: _delay, children, ...rest }: RevealProps<T>) {
  const Comp = (as ?? 'div') as React.ElementType
  return <Comp {...rest}>{children}</Comp>
}
