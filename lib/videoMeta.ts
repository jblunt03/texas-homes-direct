/**
 * VideoObject facts for listing videos, read from each video's own YouTube
 * page on 2026-11-12 (meta title, image_src thumbnail, itemprop uploadDate).
 * Never invent these: a video without an entry here gets no VideoObject
 * schema. Titles are YouTube's verbatim (The Rosenberg's video still says
 * "Rosenburg"). Thumbnail URLs only appear inside JSON-LD — nothing on the
 * site loads them as images.
 */
export const VIDEO_META: Record<string, { title: string; thumbnailUrl: string; uploadDate: string }> = {
  DmrE8Mzmazw: {
    title: '🚨 Tour The Lockhart by Texas Homes Direct! Inside a LUXURY 3-Bedroom Farmhouse',
    thumbnailUrl: 'https://i.ytimg.com/vi/DmrE8Mzmazw/maxresdefault.jpg',
    uploadDate: '2026-05-18T06:15:32-07:00',
  },
  '5P2ZzqKecr4': {
    title: '🚨 Tour THE ROSENBURG by Texas Homes Direct! Inside a MASSIVE 4-Bedroom Double Wide',
    thumbnailUrl: 'https://i.ytimg.com/vi/5P2ZzqKecr4/maxres2.jpg',
    uploadDate: '2026-09-17T22:00:06-07:00',
  },
  TGmZiohzt_8: {
    title: '🚨 Tour THE SAN SABA by Texas Homes Direct! | Massive 2400 SqFt Luxury Double Wide (4-5 Beds!)',
    thumbnailUrl: 'https://i.ytimg.com/vi/TGmZiohzt_8/maxresdefault.jpg',
    uploadDate: '2026-10-18T09:22:25-07:00',
  },
  G_yBtL7BCME: {
    title: '🚨 Tour The Sealy by Texas Homes Direct | 3 Bed Ranch Style - Heavy Duty Manufactured Home ‼️',
    thumbnailUrl: 'https://i.ytimg.com/vi/G_yBtL7BCME/maxresdefault.jpg',
    uploadDate: '2026-10-21T12:23:29-07:00',
  },
}
