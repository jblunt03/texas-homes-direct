/**
 * Text-only "Photos coming soon" placeholder for Land-Home Packages: no image
 * file, no SVG, no background image (validator step 13h). Never swap in
 * another home's photos, and don't promise a date.
 */
export default function PhotosComingSoon({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bmh-photos-soon${compact ? ' bmh-photos-soon-compact' : ''}`} data-photos-placeholder="">
      <p className="bmh-photos-soon-title">Photos coming soon</p>
      {!compact && <p className="bmh-photos-soon-note">We&rsquo;ll add photos of this package here.</p>}
    </div>
  )
}
