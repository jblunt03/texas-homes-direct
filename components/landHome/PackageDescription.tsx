import { CIRRUS_URL } from '@/components/SiteBlocks'
import { PACKAGE_HOME_LINE, includedItems, type LotFacts } from '@/lib/packages'

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

export default function PackageDescription({ facts, acres }: { facts: LotFacts; acres: string[] }) {
  const single = acres.length === 1
  const sentence = single
    ? `This ${acres[0]}-acre lot on ${facts.road} comes with a ${PACKAGE_HOME_LINE} that's move-in ready.`
    : `Each lot on ${facts.road}, at ${joinOr(acres)} acres, comes with a ${PACKAGE_HOME_LINE} that's move-in ready.`
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
        {includedItems(joinOr(acres)).map((line) => (
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
