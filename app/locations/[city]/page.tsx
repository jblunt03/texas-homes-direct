import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import LocationContent from './LocationContent'

const cityMap: Record<
  string,
  { name: string; region: string; intro: string }
> = {
  'san-antonio': {
    name: 'San Antonio',
    region: 'South TX',
    intro:
      'San Antonio and the surrounding Bexar, Atascosa, and Wilson County areas are one of the strongest markets in Texas for manufactured homes. The mix of available rural acreage, friendly county permitting (compared to Travis or Williamson), and lots of HUD-certified inventory make this an ideal spot for both first-time buyers and folks scaling up to a double-wide.',
  },
  houston: {
    name: 'Houston',
    region: 'East TX',
    intro:
      'Greater Houston covers a massive footprint — Harris, Fort Bend, Liberty, Montgomery, and Waller counties all have meaningful manufactured home inventory. Land outside the 1960 / Beltway 8 ring stays affordable, and East Texas soil conditions usually keep septic and well costs manageable.',
  },
  dallas: {
    name: 'Dallas',
    region: 'North TX',
    intro:
      'The DFW metro and surrounding counties (Kaufman, Ellis, Johnson, Parker) are seeing strong demand for manufactured homes on family land. Buyers here often have decent credit, which opens up FHA Title II and conventional MH Advantage loans at much better rates.',
  },
  austin: {
    name: 'Austin',
    region: 'Central TX',
    intro:
      'Austin metro has gotten tough for traditional housing, which is exactly why manufactured homes on Hill Country acreage are gaining momentum. Travis, Hays, Bastrop, and Caldwell county all permit manufactured homes — though aerobic septic is required almost everywhere here.',
  },
  laredo: {
    name: 'Laredo',
    region: 'South TX',
    intro:
      'Laredo and the Webb County area have a long history of manufactured housing — both new and pre-owned homes come through here regularly. Bilingual service is standard. Many families here own family land already and want straightforward, no-pressure financing options.',
  },
  mcallen: {
    name: 'McAllen',
    region: 'South TX',
    intro:
      'The Rio Grande Valley — McAllen, Edinburg, Mission, Pharr — is one of the most active manufactured home markets in Texas. Lots of buyers here are buying their forever home, often on family land. We serve all of Hidalgo County in English and Spanish.',
  },
  'corpus-christi': {
    name: 'Corpus Christi',
    region: 'South TX',
    intro:
      'Corpus, Portland, Rockport, and the coastal bend are Wind Zone II construction territory — meaning homes here are built to handle Gulf weather. All our coastal listings come with proper hurricane tie-downs and stronger sidewall construction.',
  },
  'el-paso': {
    name: 'El Paso',
    region: 'West TX',
    intro:
      'El Paso and the surrounding desert communities are an underserved manufactured home market. Wells run deeper here, but property is affordable. We work with several West Texas-specific lenders and know which home models hold up best in this climate.',
  },
  lubbock: {
    name: 'Lubbock',
    region: 'West TX',
    intro:
      'The South Plains around Lubbock are great for manufactured homes — wide lots, friendly permitting in most surrounding counties (Lubbock, Hockley, Lynn), and reliable utility infrastructure. We always recommend homes built for Wind Zone I cold conditions here.',
  },
  amarillo: {
    name: 'Amarillo',
    region: 'West TX',
    intro:
      'Amarillo and the Panhandle need manufactured homes built for serious weather — both hot summers and below-freezing winters. We only stock Panhandle-rated inventory with proper insulation and storm tie-downs for this region.',
  },
  tyler: {
    name: 'Tyler',
    region: 'East TX',
    intro:
      'East Texas is one of the easier markets to put a manufactured home in — sandy soil means cheaper septic, shallow water tables mean cheaper wells. Tyler, Longview, and surrounding Smith / Gregg counties all have steady inventory of both new and quality pre-owned homes.',
  },
  waco: {
    name: 'Waco',
    region: 'Central TX',
    intro:
      'Waco and McLennan County sit in a sweet spot — close to Austin and Dallas markets but with much more affordable land. Manufactured home permitting here is straightforward, and we see strong demand for double-wide homes on 1-5 acre lots.',
  },
  victoria: {
    name: 'Victoria',
    region: 'South TX',
    intro:
      'Victoria, Goliad, and the surrounding South Texas counties are a great fit for manufactured homes on rural land. Coastal influence means we often recommend Wind Zone II construction even slightly inland.',
  },
  alice: {
    name: 'Alice',
    region: 'South TX',
    intro:
      'Alice, Kingsville, and the Jim Wells / Kleberg County area have an active manufactured home market. We service this whole region in both English and Spanish, with delivery and setup typically completed within 6-10 weeks.',
  },
  pleasanton: {
    name: 'Pleasanton',
    region: 'South TX',
    intro:
      'Pleasanton and the Atascosa County area are perfect for buyers who want San Antonio access without San Antonio prices. Manufactured home installation is common here and county permitting is friendly to rural builds.',
  },
  seguin: {
    name: 'Seguin',
    region: 'Central TX',
    intro:
      'Seguin, New Braunfels, and the Guadalupe County region are growing fast. Manufactured homes on 1-3 acre lots are the most affordable path to homeownership in this corridor between San Antonio and Austin.',
  },
}

export async function generateStaticParams() {
  return Object.keys(cityMap).map((city) => ({ city }))
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const info = cityMap[params.city]
  if (!info) return { title: 'Location Not Found' }
  return {
    title: `Manufactured Homes for Sale in ${info.name}, Texas`,
    description: `Browse manufactured homes for sale near ${info.name}, Texas. New and pre-owned inventory, real financing numbers, no dealership pressure. Talk to Justin directly.`,
    alternates: {
      canonical: `https://texashomesdirect.com/locations/${params.city}`,
    },
  }
}

export default function LocationPage({
  params,
}: {
  params: { city: string }
}) {
  const info = cityMap[params.city]
  if (!info) notFound()
  return <LocationContent slug={params.city} city={info.name} region={info.region} intro={info.intro} />
}
