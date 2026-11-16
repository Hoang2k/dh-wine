"use client";
import * as React from "react";

/** A wine the buyer wants priced, quantity expressed in cases. */
export type TQuoteItem = { slug: string; cases: number };

interface QuoteContextType {
  items: TQuoteItem[];
  count: number;
  hydrated: boolean;
  addItem: (slug: string, cases: number) => void;
  updateItem: (slug: string, cases: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const STORAGE_KEY = "dmw-quote-items";
const MAX_CASES = 999;

const QuoteContext = React.createContext<QuoteContextType | undefined>(undefined);

const clampCases = (n: number) => Math.min(MAX_CASES, Math.max(1, Math.round(n) || 1));

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<TQuoteItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  // Read persisted list after mount so server and client markup match.
  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setItems(saved.filter((i) => typeof i?.slug === "string").map((i) => ({ slug: i.slug, cases: clampCases(i.cases) })));
      }
    } catch {
      /* storage unavailable — start empty */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items, hydrated]);

  const addItem = React.useCallback((slug: string, cases: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) => (i.slug === slug ? { ...i, cases: clampCases(i.cases + cases) } : i));
      }
      return [...prev, { slug, cases: clampCases(cases) }];
    });
  }, []);

  const updateItem = React.useCallback((slug: string, cases: number) => {
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, cases: clampCases(cases) } : i)));
  }, []);

  const removeItem = React.useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const value = React.useMemo<QuoteContextType>(
    () => ({
      items,
      count: items.length,
      hydrated,
      addItem,
      updateItem,
      removeItem,
      clear,
      has: (slug) => items.some((i) => i.slug === slug),
    }),
    [items, hydrated, addItem, updateItem, removeItem, clear],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = React.useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used within a QuoteProvider");
  return context;
}
