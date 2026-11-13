/**
 * Cash price vs estimated monthly payment — see CLAUDE.md "Cash price".
 *
 * The visitor's choice lives in localStorage (never the URL, which would
 * create duplicate URLs) and on <html data-price-mode="…">. A tiny inline
 * script in app/layout.tsx copies the saved choice onto <html> before first
 * paint, and CSS shows the matching price on every card, so a visitor who
 * chose "payment" never sees the cash price flash first and nothing moves.
 * The server always renders the default, cash, so crawlers see real prices.
 */
export type PriceMode = 'cash' | 'payment'

export const PRICE_MODE_KEY = 'thd-price-mode'
export const DEFAULT_PRICE_MODE: PriceMode = 'cash'

/** Inline <head> script. Must stay tiny and must never throw. */
export const PRICE_MODE_BOOT_SCRIPT = `try{var m=localStorage.getItem('${PRICE_MODE_KEY}');if(m==='payment'||m==='cash')document.documentElement.setAttribute('data-price-mode',m)}catch(e){}`
