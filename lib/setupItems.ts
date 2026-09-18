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

// Fixed list — same 9 items in every home's out-the-door price, regardless
// of city. Do not add "utility costs" here: those are estimated by phone
// and then bid exactly by a contractor on the actual property, since land
// conditions vary too much to quote sight unseen. See CLAUDE.md.
export const OUT_THE_DOOR_ITEMS = [
  { title: 'AC', desc: 'Central air conditioning included' },
  { title: 'Setup', desc: 'Full site setup, detailed above' },
  { title: 'Delivery', desc: 'Transport from the factory to your site' },
  { title: 'Appliances', desc: 'Standard appliance package' },
  { title: 'Trim Out', desc: 'Interior and exterior finish work' },
  { title: 'Wood Steps', desc: 'Entry steps built and installed' },
  { title: 'Tax', desc: 'Sales tax included in the price' },
  { title: 'Title', desc: 'Title work handled for you' },
  { title: 'License', desc: 'Licensing and registration handled for you' },
]
