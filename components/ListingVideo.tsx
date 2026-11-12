'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { sendGAEvent } from '@next/third-parties/google'
import { youtubeEmbedSrc, youtubeWatchUrl } from '@/lib/youtube'

/**
 * Listing videos (YouTube Shorts, vertical 9:16) — see CLAUDE.md "Listing
 * videos". Nothing from YouTube loads with the page: no iframe, no script,
 * no thumbnail. The iframe is created only after the visitor taps play.
 *
 * VideoChip: the "Video" button on inventory cards. Like the payment (i)
 * button it sits above the card's stretched title link and stops the click,
 * so it never opens the listing; it opens a dialog with the player instead.
 * ListingVideoPanel: the same player inline on the listing page, with its
 * 9:16 space reserved so nothing shifts when it loads.
 */

interface VideoHome {
  title: string
  slug: string
  id: string // Notion Listing ID (BMH-n) for the homes that have videos
  youtubeId: string
}

const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

function trackPlay(home: VideoHome, placement: 'card' | 'listing') {
  try {
    sendGAEvent('event', 'video_play', { listing_id: home.id, video_id: home.youtubeId, placement })
  } catch {
    /* analytics must never block playback */
  }
}

function VideoFrame({ home }: { home: VideoHome }) {
  return (
    <iframe
      className="bmh-video-frame"
      src={youtubeEmbedSrc(home.youtubeId)}
      title={`Video of ${home.title}`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  )
}

export function VideoChip({ home }: { home: VideoHome }) {
  const [open, setOpen] = useState(false)
  const chipRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogId = useId()
  const titleId = `${dialogId}-title`

  const close = useCallback(() => {
    setOpen(false)
    chipRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    // The third-party chat widget stacks above everything; hide it while the
    // player is open so it can't cover the video or the dialog's links.
    document.body.classList.add('bmh-video-open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('bmh-video-open')
    }
  }, [open, close])

  return (
    <>
      <button
        ref={chipRef}
        type="button"
        className="bmh-video-chip"
        data-video-chip=""
        aria-label={`Watch video of ${home.title}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
          trackPlay(home, 'card')
        }}
      >
        <span className="bmh-video-chip-pill">
          <PlayIcon size={14} />
          Video
        </span>
      </button>
      {open &&
        createPortal(
          <div
            className="bmh-video-backdrop"
            onMouseDown={(e) => {
              if (e.target !== e.currentTarget) return
              // Keep the browser from moving focus to <body> on this press,
              // so close() can return it to the chip.
              e.preventDefault()
              close()
            }}
          >
            <div id={dialogId} role="dialog" aria-modal="true" aria-labelledby={titleId} className="bmh-video-dialog">
              <div className="bmh-video-dialog-head">
                <h2 id={titleId} className="bmh-video-dialog-title">{home.title}</h2>
                <button ref={closeRef} type="button" className="bmh-btn bmh-btn-secondary bmh-video-close" onClick={close}>
                  Close
                </button>
              </div>
              <div className="bmh-video-box">
                <VideoFrame home={home} />
              </div>
              <div className="bmh-video-links">
                <a href={youtubeWatchUrl(home.youtubeId)} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
                <Link href={`/homes/${home.slug}`}>View this home →</Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export function ListingVideoPanel({ home }: { home: VideoHome }) {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="bmh-video-section" aria-labelledby="listing-video-heading">
      <div className="bmh-container">
        <h2 id="listing-video-heading" className="bmh-city-h2" style={{ textAlign: 'center' }}>
          Watch {home.title}
        </h2>
        <div className="bmh-spacer-md" />
        <div className="bmh-video-box bmh-video-box-inline">
          {playing ? (
            <VideoFrame home={home} />
          ) : (
            <button
              type="button"
              className="bmh-video-poster"
              aria-label={`Play video of ${home.title}`}
              onClick={() => {
                setPlaying(true)
                trackPlay(home, 'listing')
              }}
            >
              <span className="bmh-video-poster-play">
                <PlayIcon size={30} />
              </span>
              <span className="bmh-video-poster-label">Play the video tour</span>
            </button>
          )}
        </div>
        <p className="bmh-caption" style={{ textAlign: 'center', marginTop: 12 }}>
          <a href={youtubeWatchUrl(home.youtubeId)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
            Watch on YouTube
          </a>
        </p>
      </div>
    </section>
  )
}
