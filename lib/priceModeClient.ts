import { useSyncExternalStore } from 'react'
import { DEFAULT_PRICE_MODE, PRICE_MODE_KEY, type PriceMode } from '@/lib/priceMode'

/** Client-only half of lib/priceMode.ts (it imports a React hook, so server components must not import it). */
const listeners = new Set<() => void>()

function read(): PriceMode {
  if (typeof document === 'undefined') return DEFAULT_PRICE_MODE
  return document.documentElement.getAttribute('data-price-mode') === 'payment' ? 'payment' : 'cash'
}

function apply(mode: PriceMode) {
  document.documentElement.setAttribute('data-price-mode', mode)
  listeners.forEach((l) => l())
}

export function setPriceMode(mode: PriceMode) {
  try {
    localStorage.setItem(PRICE_MODE_KEY, mode)
  } catch {
    /* private mode / blocked storage: the choice just won't persist */
  }
  apply(mode)
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  // Keep other open tabs in step with the saved choice.
  const onStorage = (e: StorageEvent) => {
    if (e.key === PRICE_MODE_KEY && (e.newValue === 'cash' || e.newValue === 'payment')) apply(e.newValue)
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

/** Current mode in client components. The server (and hydration) always sees 'cash'. */
export function usePriceMode(): PriceMode {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_PRICE_MODE)
}
