'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react'
import {
  AERIAL_EMPTY,
  AERIAL_EMPTY_CAPTION,
  AERIAL_HOMES,
  AERIAL_HOMES_CAPTION,
  EXAMPLE_PHOTO_CAPTION,
  RENDER_CAPTION,
  type AerialImage,
  type PackageImage,
} from '@/lib/packages'

/**
 * Land-home photos (CLAUDE.md "Land-Home Packages"). The package gallery
 * follows the home page's gallery (large image plus thumbnail strip, same
 * .bmh-gallery-thumbs styles) and adds arrow keys, swipe and a lightbox.
 *
 * Rules every render follows (validator step 13j):
 * - a front render (a package's head image): a visible "Illustration" badge
 *   on the image and RENDER_CAPTION directly beneath;
 * - the empty-parcels aerial: object-fit contain, nothing overlaid, no
 *   rounded corners, AERIAL_EMPTY_CAPTION directly beneath;
 * - the homes-on-parcels aerial: a visible "Illustration" badge on the image
 *   and AERIAL_HOMES_CAPTION directly beneath;
 * - interiors and the floor plan: EXAMPLE_PHOTO_CAPTION beneath.
 * No image is ever drawn larger than its natural size (max-width/max-height
 * are its own pixels) or cropped (object-fit: contain).
 * Thumbnails are navigation buttons (alt=""), also object-fit contain.
 * Tapping an aerial opens it at native size in a lightbox (Esc or Close).
 */

type Item = PackageImage | AerialImage
/** data-lh-figure value: interiors and the floor plan share 'photo'. */
type Kind = 'render' | 'empty' | 'homes' | 'photo'

function kindOf(item: Item): Kind {
  if (item.kind === 'interior' || item.kind === 'floorplan') return 'photo'
  return item.kind
}

function captionFor(kind: Kind): string {
  if (kind === 'render') return RENDER_CAPTION
  if (kind === 'empty') return AERIAL_EMPTY_CAPTION
  if (kind === 'homes') return AERIAL_HOMES_CAPTION
  return EXAMPLE_PHOTO_CAPTION
}

function IllustrationBadge() {
  return <span className="bmh-lh-illustration-badge" data-lh-badge="">Illustration</span>
}

function isAerial(item: Item): item is AerialImage {
  return item.kind === 'empty' || item.kind === 'homes'
}

/** One full-size render: frame (image, plus the badge on a render or the
 *  homes aerial) and its caption directly beneath. */
function Figure({
  item,
  aspect,
  priority = false,
  sizes,
  onOpen,
}: {
  item: Item
  aspect: string
  priority?: boolean
  sizes: string
  onOpen?: () => void
}) {
  const kind = kindOf(item)
  const img = (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      priority={priority}
      sizes={sizes}
      className="bmh-lh-img"
      style={{ maxWidth: `${item.width}px`, maxHeight: `${item.height}px`, objectFit: 'contain' }}
      data-lh-render="full"
    />
  )
  const badge = kind === 'render' || kind === 'homes' ? <IllustrationBadge /> : null
  const frameStyle = { aspectRatio: aspect } as CSSProperties
  return (
    <figure className="bmh-lh-figure" data-lh-figure={kind}>
      {onOpen ? (
        <button
          type="button"
          className={`bmh-lh-frame bmh-lh-frame-${kind}`}
          data-lh-frame={kind}
          style={frameStyle}
          onClick={onOpen}
          aria-label="Open the aerial illustration at full size"
        >
          {img}
          {badge}
        </button>
      ) : (
        <div className={`bmh-lh-frame bmh-lh-frame-${kind}`} data-lh-frame={kind} style={frameStyle}>
          {img}
          {badge}
        </div>
      )}
      <figcaption className="bmh-lh-caption" data-lh-caption={kind}>
        {captionFor(kind)}
      </figcaption>
    </figure>
  )
}

/** Native-size view of an aerial. Scrolls when the image is wider than the screen. */
function Lightbox({ item, onClose }: { item: AerialImage; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // The site's chat widget would sit over the caption; hide it while open.
    document.body.classList.add('bmh-lh-lightbox-open')
    closeRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.classList.remove('bmh-lh-lightbox-open')
      opener?.focus?.()
    }
  }, [onClose])
  const kind = item.kind
  return (
    <div
      className="bmh-lh-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Aerial illustration at full size"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="bmh-lh-lightbox-close" onClick={onClose}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
        Close
      </button>
      <div className="bmh-lh-lightbox-scroll" onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}>
        <figure className="bmh-lh-lightbox-figure" data-lh-figure={kind}>
          <div className={`bmh-lh-lightbox-frame bmh-lh-frame-${kind}`} data-lh-frame={kind}>
            {/* Plain <img> on purpose: native size, no resizing. */}
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              style={{ width: item.width, height: item.height, maxWidth: 'none', objectFit: 'contain', display: 'block' }}
              data-lh-render="full"
            />
            {kind === 'homes' && <IllustrationBadge />}
          </div>
          <figcaption className="bmh-lh-caption bmh-lh-lightbox-caption" data-lh-caption={kind}>
            {captionFor(kind)}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

function useLightbox() {
  const [open, setOpen] = useState<AerialImage | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const box = open ? <Lightbox item={open} onClose={close} /> : null
  return { setOpen, box }
}

const GALLERY_ASPECT = `${AERIAL_EMPTY.width} / ${AERIAL_EMPTY.height}`

/** A package page's gallery. The frame's aspect is the empty aerial's, so that
 *  aerial always fills it exactly; other images are contained, never cropped. */
export function PackageGallery({ items }: { items: Item[] }) {
  const [i, setI] = useState(0)
  const { setOpen, box } = useLightbox()
  const touchX = useRef<number | null>(null)
  const n = items.length
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])
  const current = items[i]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    else if (e.key === 'Home') { e.preventDefault(); setI(0) }
    else if (e.key === 'End') { e.preventDefault(); setI(n - 1) }
  }
  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0]?.clientX ?? null }
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current
    touchX.current = null
    const end = e.changedTouches[0]?.clientX
    if (start == null || end == null) return
    const dx = end - start
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  return (
    <div className="bmh-lh-gallery" data-lh-gallery="">
      <div
        className="bmh-lh-gallery-main"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`Photo ${i + 1} of ${n}. Use the left and right arrow keys to change photos.`}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Figure
          key={current.src}
          item={current}
          aspect={GALLERY_ASPECT}
          priority={i === 0}
          sizes="(max-width: 1240px) 100vw, 1200px"
          onOpen={isAerial(current) ? () => setOpen(current) : undefined}
        />
      </div>
      <div className="bmh-lh-gallery-nav">
        <button type="button" className="bmh-pill bmh-pill-static" onClick={() => go(-1)} aria-label="Previous photo">
          ← Prev
        </button>
        <span className="bmh-lh-gallery-count" aria-hidden="true">{i + 1} / {n}</span>
        <button type="button" className="bmh-pill bmh-pill-static" onClick={() => go(1)} aria-label="Next photo">
          Next →
        </button>
      </div>
      <div className="bmh-gallery-thumbs">
        {items.map((item, k) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setI(k)}
            aria-label={`View photo ${k + 1} of ${n}`}
            aria-current={k === i ? 'true' : undefined}
            className={`bmh-gallery-thumb bmh-lh-thumb${k === i ? ' bmh-is-active' : ''}`}
          >
            <Image src={item.src} alt="" fill sizes="112px" style={{ objectFit: 'contain' }} data-lh-render="thumb" />
            {(item.kind === 'render' || item.kind === 'homes') && (
              <span className="bmh-lh-illustration-badge bmh-lh-illustration-badge-thumb" data-lh-badge="">Illustration</span>
            )}
          </button>
        ))}
      </div>
      {box}
    </div>
  )
}

/** The Floresville page's "The Parcels" section: both aerials, two-up on
 *  desktop and stacked on phones, each with its caption and a lightbox. */
export function ParcelAerials() {
  const { setOpen, box } = useLightbox()
  return (
    <div className="bmh-lh-parcels" data-lh-parcels="">
      {[AERIAL_EMPTY, AERIAL_HOMES].map((a) => (
        <Figure
          key={a.src}
          item={a}
          aspect={`${a.width} / ${a.height}`}
          sizes="(max-width: 960px) 100vw, 600px"
          onOpen={() => setOpen(a)}
        />
      ))}
      {box}
    </div>
  )
}
