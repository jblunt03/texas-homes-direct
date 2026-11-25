import { CIRRUS_URL } from '@/components/SiteBlocks'
import { homeLine, includedItems, type LotFacts, type PackageHome } from '@/lib/packages'

/**
 * The owner's description of a lot (owner, 2026-11-24), in the owner's order:
 * lead line, the road sentence, approximate location, the verified school
 * line, what's included, and the financing line. Owner's words only; see
 * lib/packages.ts for the facts and what stays unknown. Icons are inline SVG
 * with aria-hidden; no emoji.
 *
 * One acreage: a package page ("This 1.20-acre lot on FM 536 ...").
 * Several: the Floresville page, which describes all of its lots at once.
 */

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function SchoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

function joinOr(list: string[]): string {
  return list.length <= 1 ? list.join('') : `${list.slice(0, -1).join(', ')} or ${list[list.length - 1]}`
}

/** One lot: its acreage and its home (from lib/packages.ts). */
export interface DescribedLot {
  acres: string
  home: PackageHome
}

export default function PackageDescription({ facts, lots }: { facts: LotFacts; lots: DescribedLot[] }) {
  const acres = lots.map((l) => l.acres)
  const lines = lots.map((l) => homeLine(l.home))
  const sameHome = lines.every((x) => x === lines[0])
  const bedsBaths = lots.map((l) => `${l.home.beds} bed, ${l.home.baths} bath`)
  const sentence =
    lots.length === 1
      ? `This ${acres[0]}-acre lot on ${facts.road} comes with a brand new ${lines[0]} that's move-in ready.`
      : sameHome
        ? `Each lot on ${facts.road}, at ${joinOr(acres)} acres, comes with a brand new ${lines[0]} that's move-in ready.`
        : lots.map((l, i) => `This ${l.acres}-acre lot on ${facts.road} comes with a brand new ${lines[i]} that's move-in ready.`).join(' ')
  return (
    <div className="bmh-lh-desc" data-lh-description="">
      <p className="bmh-lead bmh-lh-desc-lead">{facts.lead}</p>
      <p className="bmh-lead" style={{ marginTop: 8 }}>{sentence}</p>

      <h3 className="bmh-city-h3 bmh-lh-desc-h3">Location</h3>
      <ul className="bmh-lh-icon-list">
        {facts.location.map((line) => (
          <li key={line}>
            <PinIcon />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <ul className="bmh-lh-icon-list bmh-lh-school">
        <li data-lh-school="">
          <SchoolIcon />
          <span>{facts.school}</span>
        </li>
      </ul>

      <h3 className="bmh-city-h3 bmh-lh-desc-h3">Included</h3>
      <ul className="bmh-lh-icon-list">
        {includedItems(joinOr(acres), bedsBaths.every((x) => x === bedsBaths[0]) ? bedsBaths[0] : joinOr(lots.slice().sort((a, b) => a.home.beds - b.home.beds || a.home.baths - b.home.baths).map((l) => `${l.home.beds} bed, ${l.home.baths} bath`).filter((x, i, all) => all.indexOf(x) === i))).map((line) => (
          <li key={line}>
            <CheckIcon />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="bmh-lead bmh-lh-financing">
        <a href={CIRRUS_URL} target="_blank" rel="noopener noreferrer">
          Financing available.
        </a>
      </p>
    </div>
  )
}
