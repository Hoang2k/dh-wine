'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSite } from '@/lib/site-context'
import logoImg from '@/assets/image/logo.jpg'

export const AGE_KEY = 'dh_age_ok'

/**
 * Runs in <head> before first paint: a visitor who already confirmed never sees the gate flash.
 * The gate itself is server-rendered and hidden by CSS once html[data-age-ok] is set.
 */
export const ageGateScript = `try{if(localStorage.getItem('${AGE_KEY}')==='1')document.documentElement.setAttribute('data-age-ok','1')}catch(e){}`

/** Age confirmation for an alcohol site: blocks the page until the visitor confirms they are 18 or older. */
export default function AgeGate() {
  const siteConfig = useSite()
  const [denied, setDenied] = useState(false)
  const [ok, setOk] = useState(false)
  const yesRef = useRef<HTMLButtonElement>(null)
  const gateRef = useRef<HTMLDivElement>(null)

  // While the gate is open, nothing behind it can be focused, clicked or read out, including nodes added later (toasts, menus).
  useEffect(() => {
    const root = document.documentElement
    if (ok || root.hasAttribute('data-age-ok')) return
    const lock = (el: Element) => {
      if (el !== gateRef.current && el.tagName !== 'SCRIPT') el.setAttribute('inert', '')
    }
    ;[...document.body.children].forEach(lock)
    const obs = new MutationObserver((records) => records.forEach((r) => r.addedNodes.forEach((n) => n instanceof Element && lock(n))))
    obs.observe(document.body, { childList: true })
    // Touch scrolling on iOS ignores overflow:hidden; swallow moves that don't start inside the dialog.
    const stopTouch = (e: TouchEvent) => {
      if (!(e.target instanceof Node) || !gateRef.current?.querySelector('[role=dialog]')?.contains(e.target)) e.preventDefault()
    }
    document.addEventListener('touchmove', stopTouch, { passive: false })
    yesRef.current?.focus()
    return () => {
      obs.disconnect()
      document.removeEventListener('touchmove', stopTouch)
      document.querySelectorAll('[inert]').forEach((el) => el.removeAttribute('inert'))
    }
  }, [ok])

  const confirm = () => {
    try {
      localStorage.setItem(AGE_KEY, '1')
    } catch {
      // storage blocked (private mode): the confirmation still holds for this page view
    }
    document.documentElement.setAttribute('data-age-ok', '1')
    setOk(true)
  }

  if (ok) return null

  return (
    <div ref={gateRef} className="age-gate fixed inset-0 z-[300] place-items-center overflow-y-auto bg-ink/95 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-desc"
        className="w-full max-w-[30rem] rounded-[var(--radius-panel)] bg-paper px-6 py-10 text-center shadow-lift sm:px-10"
      >
        {siteConfig.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={siteConfig.logo} alt="" aria-hidden className="mx-auto size-16 rounded-full border border-line object-cover" />
        ) : (
          <Image src={logoImg} alt="" aria-hidden priority className="mx-auto size-16 rounded-full border border-line object-cover" />
        )}
        <p className="mt-4 font-display text-lg text-stone">{siteConfig.name}</p>

        {!denied ? (
          <>
            <h2 id="age-gate-title" className="heading-display mt-6 text-display-sm text-ink">
              Bạn đã đủ 18 tuổi?
            </h2>
            <p id="age-gate-desc" className="mx-auto mt-3 max-w-[34ch] text-ink-soft">
              Website giới thiệu và báo giá rượu vang, chỉ dành cho người từ 18 tuổi trở lên.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button ref={yesRef} size="lg" onClick={confirm} data-testid="age-yes">
                Tôi đã đủ 18 tuổi
              </Button>
              <Button size="lg" variant="outline" onClick={() => setDenied(true)} data-testid="age-no">
                Tôi chưa đủ 18 tuổi
              </Button>
            </div>
            <p className="mt-6 text-sm text-stone">
              Theo Luật Phòng, chống tác hại của rượu, bia, không bán rượu cho người dưới 18 tuổi. Uống có trách nhiệm, đã uống rượu bia không lái xe.
            </p>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="heading-display mt-6 text-display-sm text-ink">
              Rất tiếc, bạn chưa thể vào trang
            </h2>
            <p id="age-gate-desc" className="mx-auto mt-3 max-w-[34ch] text-ink-soft">
              Nội dung về rượu chỉ dành cho người từ 18 tuổi trở lên. Hẹn gặp lại bạn khi đủ tuổi.
            </p>
            <Button className="mt-8" variant="link" onClick={() => setDenied(false)}>
              Tôi đã chọn nhầm
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
