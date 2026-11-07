'use client'
import * as React from 'react'

type RevealProps<T extends React.ElementType> = {
  as?: T
  delay?: number
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>

/** Fades content up once it scrolls into view. Styles live in globals.css ([data-reveal]). */
export default function Reveal<T extends React.ElementType = 'div'>({
  as,
  delay = 0,
  children,
  style,
  ...rest
}: RevealProps<T>) {
  const Comp = (as ?? 'div') as React.ElementType
  const ref = React.useRef<HTMLElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Comp
      ref={ref}
      data-reveal={visible ? 'visible' : 'hidden'}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  )
}
