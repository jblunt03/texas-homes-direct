/**
 * Ping IndexNow for the two batch-1 blog posts on a preview host.
 * Refuses the production host. Does not run during `next build`.
 *
 *   node scripts/indexnow-ping.mjs <preview-host>
 */
const key = '826393ccd47690b72ecccc5ec84cf238'
const host = process.argv[2]

if (!host || host.includes('/')) {
  console.error('Usage: node scripts/indexnow-ping.mjs <preview-host>')
  process.exit(1)
}

if (host === 'www.texashomesdirect.com' || host === 'texashomesdirect.com') {
  console.error('Refusing to ping production. Pass the preview host.')
  process.exit(1)
}

const paths = [
  '/blog/how-manufactured-home-delivery-is-priced-in-texas',
  '/blog/how-long-manufactured-home-delivery-and-setup-take-in-texas',
]

const body = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList: paths.map((path) => `https://${host}${path}`),
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})
const text = await res.text()
console.log(JSON.stringify({ status: res.status, body: text, request: body }, null, 2))
process.exit(res.ok || res.status === 202 ? 0 : 1)
