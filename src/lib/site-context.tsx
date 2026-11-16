'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { DEFAULT_SETTINGS, toSite, type Site } from './site'

const SiteContext = createContext<Site>(toSite(DEFAULT_SETTINGS))

/** Đưa cài đặt website (đọc ở layout phía server) xuống các client component. */
export function SiteProvider({ site, children }: { site: Site; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

export function useSite() {
  return useContext(SiteContext)
}
