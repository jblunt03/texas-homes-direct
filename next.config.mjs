/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disabled: Vercel's Image Optimization API is metered per source image and
    // the account hit its plan quota (402 Payment Required on every image).
    // Serving originals as-is avoids that billing limit entirely.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'southtexashc.com' },
      // Notion S3 signed image URLs (expire after ~1 hour — use ISR revalidate: 3000)
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      // Notion CDN for externally-hosted images
      { protocol: 'https', hostname: '*.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
    ],
  },
}

export default nextConfig
