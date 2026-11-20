/**
 * Shared source of truth for the two fixed checklists used across city
 * pages and the /whats-included-in-setup and /how-pricing-works explainer
 * pages. See CLAUDE.md's "What 'setup' actually includes" note — edit here,
 * not in individual page components, so every page that renders these
 * stays in sync.
 */

export const TURNKEY_ITEMS = [
  { title: 'Water', desc: 'Hookup to your existing line or well' },
  { title: 'Septic', desc: 'Full system install where needed' },
  { title: 'Electric', desc: 'Service run and connected' },
  { title: 'Base pad', desc: 'Level foundation pad, prepped and set' },
  { title: 'Block', desc: 'Home leveled and blocked in place' },
  { title: 'Tie Down', desc: 'Anchoring system installed per code' },
  { title: 'Underpinning', desc: 'Structural support beneath the home' },
  { title: 'Skirting', desc: 'Finished exterior enclosure around the base' },
  { title: 'Trim Out', desc: 'Interior and exterior finish work' },
  { title: 'AC', desc: 'Central air conditioning installed on-site' },
]

// The pricing rule (CLAUDE.md "Cash price covers the home"): the cash price
// covers the home; delivery and setup are quoted separately; if you finance,
// delivery and setup are included in the estimated monthly payment. Render
// this statement from here — never copy it into stored city copy.
export const PRICE_RULE_STATEMENT =
  'The cash price covers the home. Delivery and setup are quoted separately. If you finance, delivery and setup are included in your estimated monthly payment.'

export const CASH_PRICE_HEADING = 'Included in the Cash Price'

// Caption under the "We Handle It All" setup checklist.
export const SETUP_FINANCE_CAPTION =
  'If you finance, full setup is rolled into your loan instead of paid out of pocket.'

// Fixed list — the same 7 items in every home's cash price, regardless of
// city. Delivery and Setup are NOT on it (quoted separately for cash buyers,
// included in the estimated monthly payment when financing). Do not add
// "utility costs" here either: those are estimated by phone and then bid
// exactly by a contractor on the actual property. See CLAUDE.md.
export const CASH_PRICE_ITEMS = [
  { title: 'AC', desc: 'Central air conditioning included' },
  { title: 'Appliances', desc: 'Standard appliance package' },
  { title: 'Trim Out', desc: 'Interior and exterior finish work' },
  { title: 'Wood Steps', desc: 'Entry steps built and installed' },
  { title: 'Tax', desc: 'Sales tax included in the price' },
  { title: 'Title', desc: 'Title work handled for you' },
  { title: 'License', desc: 'Licensing and registration handled for you' },
]
