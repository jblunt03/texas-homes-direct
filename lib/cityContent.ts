/**
 * Rich per-city page content for the /mobile-homes-[slug]-tx pages.
 *
 * Every field below is hand-written per city in
 * scripts/write_city_content.py — NOT generated from a fixed pool of
 * template variants. Fixed pools don't scale (a handful of variants shared
 * across hundreds of cities eventually produces pages with identical
 * sentences, minus the place name — exactly what search engines penalize).
 * Edit the source script and regenerate; don't hand-edit this file directly.
 *
 * Before publishing a new batch, run scripts/check_duplication.py — it
 * flags any city whose intro/buying/localProof/FAQ text is too similar to
 * an already-published city's, after masking out city/county names.
 *
 * Content rules (see CLAUDE.md for the full ruleset):
 *   - No delivery times, timelines, or turnaround windows.
 *   - No invented customers, testimonials, or specific transactions.
 *   - No county-specific regulations, statistics, market claims, or soil
 *     conditions that weren't explicitly provided.
 *   - No competitor names or competitor pricing.
 *   - Never state or imply whether Texas Homes Direct has a physical
 *     location.
 *   - Always "Texas Homes Direct" — never "THD".
 *   - No land sales or land-home packages — homes only.
 *   - No Spanish-language content.
 *   - Land placement phrasing, when used, stays consistent: "family land,
 *     your own land, or a lot you're purchasing separately."
 *
 * See components/CityPageContentV2.tsx for how this is rendered, and
 * app/mobile-homes-<slug>-tx/page.tsx for the per-city route files.
 */

export interface FaqItem {
  q: string
  a: string
}

export interface CityContent {
  county: string
  tier: 'metro' | 'small-town'
  metaDescription: string
  intro: string
  buyingHeading: string
  buying: string[]
  // 2 paragraphs: [0] out-the-door pricing is firm/complete, [1] how utility
  // costs are estimated then bid exactly on-site. Optional so older city
  // entries render without this section until they're given a pass.
  pricingExplainer?: string[]
  localProof: string
  faq: FaqItem[]
  nearby: string[]
  heroImage: string
  heroAlt: string
  secondaryImage: string
  secondaryAlt: string
  popularHomes: string[]
  // ISO date (YYYY-MM-DD) this city's content was last substantively edited.
  // Feeds the page's dateModified schema — update it whenever copy changes.
  lastModified?: string
}

export const CITY_CONTENT: Record<string, CityContent> = {
  austin: {
    county: 'Travis',
    tier: 'metro',
    metaDescription:
      "Looking for mobile homes for sale in Austin, TX? Texas Homes Direct offers new manufactured homes and honest, no-pressure financing. Get your free quote today.",
    intro:
      "Austin-area families looking at manufactured homes usually want the same thing: a real price, a clear financing picture, and someone who won't disappear once the paperwork starts. Texas Homes Direct works with buyers throughout Travis County on new single wide and double wide homes, with financing built around what you can actually afford.",
    buyingHeading: 'Buying a Mobile Home in Travis County',
    buying: [
      "A manufactured home costs meaningfully less than a comparable site-built house in the Austin area, without giving up HUD-code construction quality. Texas Homes Direct prices every home clearly upfront, so you're comparing real numbers instead of guessing.",
      "Travis County has room for a manufactured home whether you're placing it on family land, your own land, or a lot you're purchasing separately. We'll walk you through what your specific site needs before you commit to anything.",
    ],
    localProof:
      "We've worked with Travis County families on both single wide and double wide homes, matching floor plans to lot size and budget rather than pushing one option.",
    faq: [
      {
        q: "How much does a manufactured home cost in Austin?",
        a: "It depends on the floor plan, size, and features you choose, but manufactured homes consistently run below the cost of a comparable site-built home. Run our free mortgage analysis to see real numbers for your budget.",
      },
      {
        q: "Do I need to already own land in Travis County?",
        a: "No. Some buyers already have land, some are purchasing a lot separately, and some are building on family property. Texas Homes Direct works with buyers at any of those starting points.",
      },
      {
        q: "What's the difference between a single wide and a double wide?",
        a: "A single wide is one continuous section and typically costs less; a double wide is built from two sections joined on-site and gives you more square footage. Which one makes sense depends on your lot and your family's needs.",
      },
    ],
    nearby: ['round-rock', 'georgetown', 'san-marcos'],
    heroImage: '/homes/the-katy/Katy-Hero.png',
    heroAlt: 'Single wide manufactured home exterior near Austin, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home exterior available near Austin, TX',
    popularHomes: [
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  seguin: {
    county: 'Guadalupe',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Seguin, TX and Guadalupe County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
    intro:
      "A Guadalupe County buyer working with Texas Homes Direct deals with the same person from the first phone call through delivery — not a rotating cast of sales reps and a separate service department for setup.",
    buyingHeading: 'Buying a Mobile Home in Guadalupe County',
    buying: [
      "That continuity matters most when something needs clarifying halfway through: a Seguin-area buyer isn't stuck explaining their situation over again to someone new every time they call.",
      "Guadalupe County land conditions differ enough — some lots already have utilities, some don't — that we walk each site individually rather than quoting a standard package sight unseen.",
    ],
    pricingExplainer: [
      "One quote, one number, no revisions — a Seguin-area buyer sees the complete out-the-door price before deciding anything, itemized above.",
      "Utility hookup costs are the exception, simply because no two Guadalupe County properties sit the same way. We give a phone estimate to start and follow it with a contractor's exact bid once they've walked the land.",
    ],
    localProof:
      "Guadalupe County families we've worked with have stayed in touch with the same point of contact from their first call through the day their home was set.",
    faq: [
      {
        q: "Will I be working with different people at different stages of the process?",
        a: "No — one point of contact handles your Seguin-area purchase from the first conversation through setup, rather than passing you between departments.",
      },
      {
        q: "Do I need to already own land in Guadalupe County?",
        a: "No. Some buyers already have a site, some are still shopping for one, and some are working with family property — we work with any of those starting points.",
      },
      {
        q: "What's the difference between a single wide and a double wide?",
        a: "A single wide is one section and costs less upfront; a double wide is built from two joined sections and gives you meaningfully more space.",
      },
    ],
    nearby: ['new-braunfels', 'luling', 'gonzales', 'san-marcos'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'Compact single wide mobile home exterior near Seguin, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Mobile home exterior available for delivery near Seguin, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-18',
  },

  waco: {
    county: 'McLennan',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Waco, TX and McLennan County. New manufactured homes, honest financing, and no dealership pressure. Get your free quote today.",
    intro:
      "If you're pricing out a manufactured home in the Waco area, the numbers usually make more sense than you'd expect compared to a traditional build. Texas Homes Direct works with McLennan County families on single wide and double wide homes with financing that's explained upfront, not buried in fine print.",
    buyingHeading: 'Buying a Mobile Home in McLennan County',
    buying: [
      "McLennan County permitting and setup requirements aren't identical to every other county in Texas, and that's fine — it's our job to sort out, not yours. We coordinate the paperwork so you're not stuck chasing offices on your own.",
      "A double wide gives a Waco-area family more bedrooms and living space than a single wide, built from two sections joined on-site. A single wide costs less and sets up more simply. We'll help you weigh which one actually fits your household.",
    ],
    localProof:
      "We've delivered manufactured homes across McLennan County to families choosing both single wide and double wide floor plans, depending on their lot and budget.",
    faq: [
      {
        q: "What size home fits my property?",
        a: "That comes down to your lot's access, setback requirements, and layout more than raw acreage. We'll go over your specific site before recommending a single wide or double wide.",
      },
      {
        q: "Do I need a permit for a manufactured home in McLennan County?",
        a: "Permitting requirements vary by county and by property, so it's worth confirming with McLennan County directly. We can help point you to the right office.",
      },
    ],
    nearby: ['hewitt', 'woodway', 'bellmead', 'robinson'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Waco, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    secondaryAlt: 'Single wide mobile home exterior available near Waco, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  tyler: {
    county: 'Smith',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Tyler, TX and Smith County. HUD-certified manufactured homes with turnkey setup and honest, no-pressure financing. Free quote.",
    intro:
      "Tyler-area buyers looking at manufactured homes often start with the same question: what's this actually going to cost each month? Texas Homes Direct gives Smith County families a real answer early, along with financing options that don't require guesswork.",
    buyingHeading: 'Buying a Mobile Home in Smith County',
    buying: [
      "Smith County families looking at the numbers usually find a manufactured home comes in well under what a comparable site-built house would cost, while still meeting the same HUD construction standards.",
      "Some buyers already have utilities in place on their land; others are starting from scratch. Texas Homes Direct scopes the actual setup work your property needs rather than quoting a generic package that may not apply.",
    ],
    localProof:
      "We've set up both single wide and double wide homes for Smith County families, sized to fit each buyer's lot and budget rather than a one-size-fits-all approach.",
    faq: [
      {
        q: "Do I need to already own land?",
        a: "No. Whether it's family land, land you already own, or a lot you're purchasing separately, Texas Homes Direct can work with your situation.",
      },
      {
        q: "Can I see photos of available homes before deciding?",
        a: "Yes — reach out and we'll go over photos and floor plans for homes that fit what you're looking for, so you know what you're getting before you commit.",
      },
      {
        q: "Do you sell used homes, or only new ones?",
        a: "Our focus is new, HUD-certified manufactured homes. Contact us for current availability.",
      },
    ],
    nearby: ['whitehouse', 'lindale', 'bullard'],
    heroImage: '/homes/the-chapman/Chapman-Hero.png',
    heroAlt: 'Manufactured home exterior on wooded land near Tyler, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Compact single wide mobile home available near Tyler, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
  },

  'el-paso': {
    county: 'El Paso',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in El Paso, TX and El Paso County. New manufactured homes with in-house financing and turnkey setup — get your free quote from us today.",
    intro:
      "El Paso families exploring manufactured homes deal with a market that works a little differently than the rest of Texas, but the basics of getting a fair price and honest financing don't change. Texas Homes Direct works directly with El Paso County buyers on both single wide and double wide homes.",
    buyingHeading: 'Buying a Mobile Home in El Paso County',
    buying: [
      "Texas Homes Direct finances directly, and also works with a mix of public and private lenders — so buyers with less-than-perfect credit still typically have a path forward. The mortgage analysis tool won't pull your credit, so it's a low-risk way to see real numbers.",
      "Some El Paso County buyers already know exactly where their home will go — family land, land they already own, or a lot they're purchasing separately — and some are still deciding. Either way, we'll go over what the specific site requires.",
    ],
    localProof:
      "We've worked with El Paso County families across a range of lot sizes and site conditions, matching each one to a floor plan that actually fits.",
    faq: [
      {
        q: "What size home actually fits my lot?",
        a: "That's mostly about lot access, setback rules, and layout — not just total acreage. We'll walk through your site with you before recommending a floor plan.",
      },
      {
        q: "Do you deliver throughout El Paso County?",
        a: "Yes — delivery throughout El Paso County is something we handle regularly. Give us your address and we can walk through what it looks like for your particular site.",
      },
      {
        q: "Can I get financing with less-than-perfect credit?",
        a: "Usually, yes. Between in-house financing and outside public and private lending partners, most buyers find something workable even without perfect credit.",
      },
    ],
    nearby: ['socorro', 'horizon-city', 'canutillo', 'anthony'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'Manufactured home exterior available near El Paso, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near El Paso, TX',
    popularHomes: [
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
    ],
  },

  'san-antonio': {
    county: 'Bexar',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in San Antonio, TX and Bexar County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Buying a manufactured home in San Antonio shouldn't feel like a negotiation game. Texas Homes Direct gives Bexar County buyers a real price upfront and financing that's explained plainly, whether you're looking at a single wide or a double wide.",
    buyingHeading: 'Buying a Mobile Home in Bexar County',
    buying: [
      "A manufactured home built to current HUD code gets a Bexar County family into a new home for meaningfully less than comparable site-built construction, without sacrificing quality standards.",
      "Double wide homes arrive in two sections that are joined and finished on-site — a bigger undertaking than a single wide, but one our crews manage as part of your purchase. Either option is financed the same way.",
    ],
    localProof:
      "We've worked with Bexar County families on a mix of single wide and double wide homes, sized around each buyer's lot and monthly budget.",
    faq: [
      {
        q: "Do you deliver to all of Bexar County?",
        a: "Yes, we deliver throughout Bexar County and the surrounding area. Share your address and we'll confirm the details specific to your property.",
      },
    ],
    nearby: ['new-braunfels', 'boerne', 'floresville', 'castroville'],
    heroImage: '/homes/the-katy/Katy-Hero.png',
    heroAlt: 'Single wide manufactured home exterior near San Antonio, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near San Antonio, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
    ],
  },

  laredo: {
    county: 'Webb',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Laredo, TX and Webb County. Family-owned manufactured home dealer with honest, no-pressure financing. Free delivery quote today.",
    intro:
      "Webb County families looking at manufactured homes want two things upfront: an honest price and financing that makes sense for their budget. That's the whole approach at Texas Homes Direct — no runaround, no pressure, just real numbers for Laredo-area buyers.",
    buyingHeading: 'Buying a Mobile Home in Webb County',
    buying: [
      "Permitting and setup work differently from one Texas county to the next, and most buyers don't have the time to learn Webb County's specific process. Texas Homes Direct handles that coordination so you're not tracking down paperwork on your own.",
      "A single wide keeps your entry cost lower and your setup simpler; a double wide gives a growing Laredo family more bedrooms and square footage. Both are financed the same way, and we'll help you figure out which one fits.",
    ],
    localProof:
      "Families across Webb County have worked with us on both single wide and double wide homes, matched to their lot size and monthly budget.",
    faq: [
      {
        q: "Can I get approved with less-than-perfect credit?",
        a: "Often, yes. Texas Homes Direct finances directly and also works with several outside lenders, which opens up options for buyers who wouldn't qualify through a single bank.",
      },
      {
        q: "Do I have to own land already?",
        a: "No — some buyers already have land, some are buying a lot separately, and some are working with family property. Let us know where things stand and we'll go from there.",
      },
      {
        q: "Do you deliver throughout Webb County?",
        a: "Yes. Give us your address and we'll walk through exactly what delivery and setup involve for your property.",
      },
    ],
    nearby: ['rio-bravo'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    heroAlt: 'Manufactured home exterior near Laredo, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Laredo, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
  },

  mcallen: {
    county: 'Hidalgo',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in McAllen, TX and Hidalgo County. New manufactured homes for Rio Grande Valley families with honest financing. Free quote today.",
    intro:
      "Manufactured homes give a lot of Rio Grande Valley families a realistic path to ownership that a traditional build often can't match on price. Texas Homes Direct works with Hidalgo County buyers directly, with financing explained in plain terms from the start.",
    buyingHeading: 'Buying a Mobile Home in Hidalgo County',
    buying: [
      "We quote setup as part of your home's price, not as a separate bill after delivery. Utility connections, the pad, underpinning, and skirting are all included and financed together for McAllen-area buyers.",
      "Whether you're working with land you already own in Hidalgo County, a lot you're buying separately, or family property, Texas Homes Direct can walk you through what your specific site will need.",
    ],
    localProof:
      "We've worked with Hidalgo County families on single wide and double wide homes alike, sizing each one to the buyer's lot and budget.",
    faq: [
      {
        q: "What size home makes sense for my property?",
        a: "It depends more on your lot's access and layout than on total acreage. We'll go over your site before recommending a single wide or double wide.",
      },
      {
        q: "Do you sell only new homes, or used ones too?",
        a: "We primarily carry new, HUD-certified manufactured homes. Reach out for current availability.",
      },
    ],
    nearby: ['edinburg', 'mission', 'pharr', 'hidalgo'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near McAllen, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Single wide mobile home available for delivery near McAllen, TX',
    popularHomes: [
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
  },

  victoria: {
    county: 'Victoria',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Victoria, TX and Victoria County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Victoria County has plenty of families deciding between a manufactured home and a traditional build, and cost is usually the deciding factor. Texas Homes Direct lays out real numbers early so you're not guessing at what a home in Victoria will actually run.",
    buyingHeading: 'Buying a Mobile Home in Victoria County',
    buying: [
      "A manufactured home built to current HUD code costs noticeably less than comparable site-built construction, without giving up on quality. Texas Homes Direct prices every home clearly so you can compare it honestly against other options.",
      "Some Victoria-area buyers already have a well, septic, and electric on their land; others are starting from raw ground. Either way, we scope the actual setup work your property needs rather than a one-size-fits-all package.",
    ],
    localProof:
      "Victoria County families we've worked with have used a mix of family land, land they already owned, and newly purchased lots — there's no single required path.",
    faq: [
      {
        q: "Do I need a permit for a manufactured home in Victoria County?",
        a: "Requirements vary by county and by property, so it's worth checking with Victoria County directly before you buy. We can help point you toward the right office.",
      },
      {
        q: "What happens once I've picked a home?",
        a: "Our team takes care of coordinating the build, getting the home to your site, and completing the setup, keeping you in the loop the whole way.",
      },
    ],
    nearby: ['cuero', 'goliad', 'port-lavaca', 'edna'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Manufactured home exterior near Victoria, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Victoria, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
  },

  alice: {
    county: 'Jim Wells',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Alice, TX and Jim Wells County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Alice-area families weighing a manufactured home against a traditional build usually start with one question: what's the real monthly cost? Texas Homes Direct answers that directly for Jim Wells County buyers, without a sales pitch attached.",
    buyingHeading: 'Buying a Mobile Home in Jim Wells County',
    buying: [
      "There's more than one way to approach the land question in Jim Wells County — family property, land already owned, or a lot purchased separately all work with Texas Homes Direct. What matters is knowing what the specific site needs, which we'll cover once we know where things stand.",
      "A single wide is a practical starting point for a smaller lot or tighter budget; a double wide suits a family that needs more room. Financing and setup work the same either way — it comes down to what fits your situation.",
    ],
    localProof:
      "We've worked with Jim Wells County buyers across a range of budgets, from single-section starter homes to larger double wide floor plans.",
    faq: [
      {
        q: "Do I need to already have land lined up?",
        a: "Not at all. Some buyers already have land, some are purchasing a lot on their own, and some are working with family property — we'll sort out the details once we know your starting point.",
      },
      {
        q: "Can I see photos before deciding on a home?",
        a: "Yes. Contact us and we'll go over photos and floor plans for options that match your budget.",
      },
      {
        q: "Do you deliver throughout Jim Wells County?",
        a: "Yes, Jim Wells County is part of our regular delivery area. Reach out with your address and we'll go over the specifics for your property.",
      },
    ],
    nearby: ['orange-grove', 'premont'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'Compact mobile home exterior near Alice, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.png',
    secondaryAlt: 'Manufactured home available for delivery near Alice, TX',
    popularHomes: [
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
    ],
  },

  pleasanton: {
    county: 'Atascosa',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Pleasanton, TX and Atascosa County. Family-owned manufactured home dealer with honest financing. Get a free quote, no pressure.",
    intro:
      "You don't have to commit to anything to see what's available near Pleasanton. Texas Homes Direct will send real photos and floor plans for any model you're curious about, no pressure to decide on the spot.",
    buyingHeading: 'Buying a Mobile Home in Atascosa County',
    buying: [
      "Browsing at your own pace matters more with a purchase this size. An Atascosa County buyer can compare floor plans over a few days rather than a single conversation.",
      "For an Atascosa County family, going the HUD-code manufactured route instead of site-built construction usually means a noticeably smaller number at closing.",
    ],
    pricingExplainer: [
      "Once you've picked a floor plan, the number Texas Homes Direct quotes a Pleasanton-area buyer is complete — everything itemized above is already in it.",
      "We won't pretend to know your exact utility cost from a phone call — Atascosa County lots vary too much for that. What we can do is give a starting estimate right away, then send a contractor out to turn that into a firm bid follows from a contractor who's actually walked the land.",
    ],
    localProof:
      "We've sent photos and floor plans to Atascosa County buyers who were still deciding, with no expectation they'd commit on the spot.",
    faq: [
      {
        q: "Can I see photos of homes before talking to anyone?",
        a: "Reach out and we'll send over images and floor plans — there's no obligation attached to asking.",
      },
      {
        q: "Do I need a permit for a manufactured home in Atascosa County?",
        a: "That's property-specific, not something we can answer with a blanket county rule — Atascosa County's office is the right place to confirm what applies to your lot.",
      },
      {
        q: "What happens once I've picked a home?",
        a: "From there, it's on us — lining up the build schedule, getting the home moving toward your site, and seeing the setup through to the end.",
      },
    ],
    nearby: ['floresville', 'devine', 'pearsall', 'jourdanton'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Single wide mobile home exterior near Pleasanton, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Manufactured home available for delivery near Pleasanton, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-18',
  },

  amarillo: {
    county: 'Potter',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Amarillo, TX and Potter County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "A manufactured home is one of the more realistic paths to ownership for Amarillo-area families, especially compared to the cost of building from scratch. Texas Homes Direct works directly with Potter County buyers on financing that's explained clearly from day one.",
    buyingHeading: 'Buying a Mobile Home in Potter County',
    buying: [
      "Some Potter County buyers already have land ready to go; others are still working that part out. Texas Homes Direct works with buyers at either stage and is upfront about what each path involves.",
      "We finance directly, and we also work with outside public and private lenders — so most Amarillo-area buyers find a workable path regardless of their credit situation.",
    ],
    localProof:
      "We've delivered manufactured homes to Potter County families choosing single wide and double wide floor plans based on lot size and household needs.",
    faq: [
      {
        q: "How much does a manufactured home cost in Amarillo?",
        a: "It depends on the floor plan and features, but manufactured homes are consistently more affordable than comparable site-built construction. The free mortgage analysis tool will give you a number specific to your budget.",
      },
      {
        q: "Do you sell used homes, or only new inventory?",
        a: "Our focus is new, HUD-certified manufactured homes. Reach out for what's currently available.",
      },
    ],
    nearby: ['canyon'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    heroAlt: 'Manufactured home exterior near Amarillo, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.png',
    secondaryAlt: 'Single wide manufactured home available for delivery near Amarillo, TX',
    popularHomes: [
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  lubbock: {
    county: 'Lubbock',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Lubbock, TX and Lubbock County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Lubbock County families comparing a manufactured home to a traditional build usually find the numbers make the decision easier than expected. Texas Homes Direct gives straight answers on both cost and financing before you commit to anything.",
    buyingHeading: 'Buying a Mobile Home in Lubbock County',
    buying: [
      "Whether a home ends up on family land, land already owned, or a newly purchased lot, Lubbock County buyers get the same thing from Texas Homes Direct: a clear walkthrough of what that specific site will need.",
      "Permitting and setup requirements aren't identical everywhere in Texas, and most buyers have no reason to already know Lubbock County's process. That's what Texas Homes Direct handles, so you're not chasing down paperwork.",
    ],
    localProof:
      "We've set up manufactured homes across Lubbock County for families choosing both single wide and double wide floor plans.",
    faq: [
      {
        q: "Do I need a permit for a manufactured home in Lubbock County?",
        a: "Requirements vary by county and property, so it's worth checking directly with Lubbock County. We can help point you to the right office.",
      },
      {
        q: "What happens after I choose a home?",
        a: "Our team takes over coordinating the build, delivery to your site, and the full setup, keeping you updated along the way.",
      },
    ],
    nearby: ['wolfforth', 'shallowater', 'idalou'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Lubbock, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Manufactured home available for delivery near Lubbock, TX',
    popularHomes: [
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  'corpus-christi': {
    county: 'Nueces',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Corpus Christi, TX and Nueces County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Corpus Christi-area families exploring manufactured homes want a price they can actually trust and financing that's explained plainly. That's the entire approach at Texas Homes Direct for Nueces County buyers — no games, no pressure.",
    buyingHeading: 'Buying a Mobile Home in Nueces County',
    buying: [
      "For a lot of Nueces County families, the appeal starts with the price gap between a manufactured home and building from the ground up — often a significant difference, without stepping down in construction quality since every home meets current HUD code.",
      "You can review photos and floor plans for available homes before committing to anything. We'd rather you know exactly what you're choosing than decide based on a sales pitch.",
    ],
    localProof:
      "Nueces County buyers we've worked with have chosen everything from compact single-section homes to larger double wide layouts, depending on the lot and the budget.",
    faq: [
      {
        q: "Do I need to already own land?",
        a: "No — land ownership isn't a requirement to get started. Whether you're using family property, land you already hold, or a lot you plan to buy separately, Texas Homes Direct can work with it.",
      },
      {
        q: "Can I get financing with less-than-perfect credit?",
        a: "Usually, yes. Between financing directly and working with outside public and private lenders, most buyers find a workable path.",
      },
      {
        q: "Do you deliver throughout Nueces County?",
        a: "Yes. Once we have your address, we can tell you exactly what delivery and setup will involve for your particular lot.",
      },
    ],
    nearby: ['portland', 'ingleside', 'robstown', 'aransas-pass'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Manufactured home exterior near Corpus Christi, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Corpus Christi, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  dallas: {
    county: 'Dallas',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Dallas, TX and the DFW metro. New manufactured homes with honest financing and zero dealership pressure. Get a free quote today.",
    intro:
      "DFW-area families pricing out a manufactured home often find it's a more realistic path to ownership than they assumed. Texas Homes Direct works directly with Dallas County buyers, with financing explained in plain terms from the first conversation.",
    buyingHeading: 'Buying a Mobile Home in Dallas County',
    buying: [
      "Every home we sell is built to current HUD code and inspected at the factory before it ever ships — the same baseline standard no matter where in Texas it ends up, Dallas County included.",
      "Some Dallas-area buyers already have utilities in place; others are starting from raw land. Either way, Texas Homes Direct scopes the setup work your property actually needs instead of a generic package.",
    ],
    localProof:
      "We've delivered manufactured homes throughout Dallas County to families across a range of budgets and lot sizes.",
    faq: [
      {
        q: "What size home fits my lot?",
        a: "That comes down to lot access, setback rules, and layout more than raw square footage. We'll go over your site before recommending a floor plan.",
      },
      {
        q: "Do I need a permit for a manufactured home in Dallas County?",
        a: "Requirements vary by county and even by city within DFW, so it's worth checking for your specific address. We can help you figure out where to start.",
      },
      {
        q: "Can I see homes before deciding?",
        a: "Contact us and we can send over photos and floor plan details for whatever catches your eye — no need to decide on the spot.",
      },
    ],
    nearby: ['mesquite', 'garland', 'irving', 'richardson'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Dallas, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near the DFW metro',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
  },

  houston: {
    county: 'Harris',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Houston, TX and Harris County. New manufactured homes with honest financing and zero dealership pressure. Get a free quote today.",
    intro:
      "Houston-area families looking into manufactured homes usually want the same two things: a real price and financing they can actually follow. Texas Homes Direct gives Harris County buyers both, without pressure to decide before you're ready.",
    buyingHeading: 'Buying a Mobile Home in Harris County',
    buying: [
      "A single wide can be a practical choice for a smaller lot or tighter budget, while a double wide suits a Houston-area family that needs more room. Financing and setup work the same either way.",
      "Some Harris County buyers already have a well, septic, and electric in place; others are starting from raw land. Texas Homes Direct scopes the setup work your property actually needs rather than a generic package.",
    ],
    localProof:
      "Harris County families we've worked with span a wide range of lot sizes and budgets, choosing everything from compact single wides to larger double wide layouts.",
    faq: [
      {
        q: "Do I need to already own land in Harris County?",
        a: "Land ownership isn't a prerequisite here. Texas Homes Direct works with buyers who already have a site, buyers still shopping for one, and buyers planning to use family property.",
      },
      {
        q: "What happens after I pick a home?",
        a: "From there, we take over — coordinating the build, getting it delivered to your site, and finishing the full setup — and you'll hear from us along the way instead of being left to wonder.",
      },
    ],
    nearby: ['pasadena', 'bellaire', 'katy', 'spring'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Houston, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Single wide manufactured home available for delivery near Houston, TX',
    popularHomes: [
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
  },

  'san-saba': {
    county: 'San Saba',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in San Saba, TX and San Saba County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "There's no reason to rush a decision this size. San Saba County buyers looking at a manufactured home get time to compare floor plans, ask questions, and see real financing numbers from Texas Homes Direct before committing to anything.",
    buyingHeading: 'Buying a Mobile Home in San Saba County',
    buying: [
      "Single wide and double wide options both come standard with current HUD-code construction — the difference is mostly about square footage and where your budget lands. We'll walk through both with you.",
      "Placing a home on family property, land you've already purchased, or a lot you're buying separately are all workable paths in San Saba County. Texas Homes Direct scopes what your particular site calls for.",
    ],
    pricingExplainer: [
      "Ask ten different manufactured home dealers what's included in their price and you'll get ten different answers. At Texas Homes Direct, the number we quote for a San Saba-area home already accounts for everything above — it's not a starting point for negotiation.",
      "Utility costs are the one piece that can't be pinned down over the phone, because every San Saba County lot is different. We'll give a solid estimate first, then send our own contractor out to your property for an exact bid — one you see and approve before anything moves forward.",
    ],
    localProof:
      "San Saba County has seen us deliver everything from compact starter homes to larger four-bedroom double wides, depending on what each family needed.",
    faq: [
      {
        q: "Is bad credit a dealbreaker for financing?",
        a: "Not usually. We finance in-house and also work alongside outside lenders, which tends to open up options that a single bank wouldn't offer.",
      },
      {
        q: "Is owning land a prerequisite before I can buy?",
        a: "No — plenty of our San Saba County buyers are still deciding on land when they first reach out. We can talk through your options either way.",
      },
      {
        q: "How do single wide and double wide homes actually compare?",
        a: "Single wides are narrower and typically cheaper to buy and set up; double wides are built in two joined sections and give you meaningfully more interior space. Your lot and your family size usually settle which one makes sense.",
      },
    ],
    nearby: ['lampasas', 'goldthwaite', 'llano', 'brady'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near San Saba, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near San Saba, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-10',
  },

  lampasas: {
    county: 'Lampasas',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Lampasas, TX and Lampasas County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Every dollar in a Texas Homes Direct quote for a Lampasas County buyer is itemized upfront — the home, the setup, the financing terms. Nothing shows up as a surprise once you've already committed.",
    buyingHeading: 'Buying a Mobile Home in Lampasas County',
    buying: [
      "Site work is one of the most misunderstood parts of buying a manufactured home. In Lampasas County, that means coordinating utility connections, the foundation pad, and permitting — work Texas Homes Direct manages so you don't have to learn it yourself.",
      "Down payment amounts shift depending on the lender and loan type, so there isn't one number that applies to every Lampasas-area buyer. We'll go over what actually applies to your situation.",
    ],
    pricingExplainer: [
      "A lot of buyers assume a home price is just the beginning of the real cost. For Lampasas County buyers, it isn't — the number above already reflects the complete list, and that's the number you'll actually pay.",
      "No two properties near Lampasas sit the same way, which is exactly why we won't quote an exact utility number sight unseen. A phone estimate gets you in the ballpark, and our own contractor follows up on-site with a firm figure before you're asked to commit.",
    ],
    localProof:
      "Buyers in Lampasas County have worked with us across a mix of financing paths — some through in-house terms, others through outside lenders.",
    faq: [
      {
        q: "Is the site prep bundled into the sale price?",
        a: "It is. Rather than treating utilities, the pad, and skirting as a separate project, we quote and finance them together with the home itself.",
      },
      {
        q: "Can I get pre-approved without hurting my credit?",
        a: "Yes — our mortgage analysis tool gives you real numbers without a hard credit pull, so you can see where you stand before deciding anything.",
      },
      {
        q: "Does Lampasas County fall within your delivery area?",
        a: "It does. Once we have your address, we'll map out exactly what delivery looks like for your property.",
      },
      {
        q: "After I choose a floor plan, what's next?",
        a: "We take the build and delivery logistics off your plate from there, checking in as your home moves through production and out to your site.",
      },
    ],
    nearby: ['copperas-cove', 'burnet', 'san-saba', 'gatesville'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Lampasas, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Single wide manufactured home available for delivery near Lampasas, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-10',
  },

  llano: {
    county: 'Llano',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Llano, TX and Llano County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Some Llano County families already have land that's been in the family for years; others are starting from a blank slate. Texas Homes Direct works with both, walking through real costs before any decision gets made.",
    buyingHeading: 'Buying a Mobile Home in Llano County',
    buying: [
      "The main tradeoff between a single wide and a double wide comes down to lot size and household needs — one keeps your upfront cost lower, the other gives a growing family more room to spread out.",
      "Every Texas county handles manufactured home permitting a little differently, and that includes Llano County. Rather than leaving you to figure out the paperwork, our team manages that piece directly.",
    ],
    pricingExplainer: [
      "Comparison shopping only works if the numbers mean the same thing. When Texas Homes Direct quotes a Llano County buyer, that number already includes everything listed above, so there's nothing hidden to compare against later.",
      "Soil, well depth, distance to power — all of it varies lot to lot around Llano, so a phone-only utility number would just be a guess dressed up as a fact. We start with an estimate, then have a contractor inspect the property and hand you a number you can actually rely on.",
    ],
    localProof:
      "Homes we've delivered in Llano County have ranged from single-section layouts to larger four-bedroom double wides.",
    faq: [
      {
        q: "What permitting steps apply in Llano County specifically?",
        a: "That's worth confirming directly with Llano County, since requirements shift from one county to the next. We're glad to point you toward the right office to ask.",
      },
      {
        q: "Do I need land squared away before reaching out?",
        a: "Not at all — some buyers already have a site, others are still looking, and some are working with property that's been in the family. We meet you wherever you're starting.",
      },
      {
        q: "Before I commit, can I look at photos of actual homes?",
        a: "Sure — get in touch and we'll send over images and floor plans for whichever models interest you.",
      },
    ],
    nearby: ['burnet', 'fredericksburg', 'san-saba', 'johnson-city'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near Llano, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Llano, TX',
    popularHomes: [
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  goldthwaite: {
    county: 'Mills',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Goldthwaite, TX and Mills County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Building a house from scratch in Mills County costs more than most families expect, which is part of why manufactured homes keep coming up in the conversation. Texas Homes Direct gives Goldthwaite-area buyers the real cost comparison, not a sales pitch.",
    buyingHeading: 'Buying a Mobile Home in Mills County',
    buying: [
      "New HUD-code construction doesn't mean a lower standard — it means the same modern building code applied at a lower price point than a comparable site-built home in Mills County.",
      "Whatever stage you're at with land — already own it, still shopping, or working through family property — Texas Homes Direct can map out what your specific site will require before you commit to a floor plan.",
    ],
    pricingExplainer: [
      "Some dealerships quote a base price and let the extras pile up afterward. Texas Homes Direct doesn't work that way for Goldthwaite-area buyers — the number above is the complete number, full stop.",
      "Utilities work differently than the rest of the price, because they genuinely can't be set from a phone call alone. We give Mills County buyers a solid phone estimate to start, then send a contractor to the actual property for an exact bid before anything is final.",
    ],
    localProof:
      "Mills County buyers we've worked with have picked everything from a one-bedroom starter layout up to a spacious double wide.",
    faq: [
      {
        q: "What's a realistic price range for a home in Goldthwaite?",
        a: "It shifts based on floor plan and finish level, but manufactured homes consistently land below site-built pricing for comparable square footage. The mortgage analysis tool will give you a number tailored to your budget.",
      },
      {
        q: "My credit isn't great — is financing still realistic?",
        a: "Often, yes. Between our in-house financing and outside lending partners, there's usually a path forward even for buyers who wouldn't qualify through a single traditional bank.",
      },
      {
        q: "Is your inventory limited to new homes?",
        a: "Primarily, yes — our focus is new, HUD-certified manufactured homes. Reach out and we'll walk you through what's currently available.",
      },
    ],
    nearby: ['san-saba', 'brownwood', 'hamilton', 'comanche'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Single wide manufactured home exterior near Goldthwaite, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Goldthwaite, TX',
    popularHomes: [
      'marathon-pearland-3bed-2bath-single-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  brady: {
    county: 'McCulloch',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Brady, TX and McCulloch County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "McCulloch County buyers aren't limited to one lending path with Texas Homes Direct. In-house financing, public loan programs, and private lenders are all on the table for a Brady-area purchase, which opens up more room for different credit situations.",
    buyingHeading: 'Buying a Mobile Home in McCulloch County',
    buying: [
      "Whether your land already has a well, septic, and electric in place or you're starting from bare ground, Texas Homes Direct scopes the actual work your site needs rather than quoting a one-size package.",
      "In-house financing is only one option — we also connect Brady-area buyers with a range of public and private lenders, which widens the path forward for buyers with varying credit profiles.",
    ],
    pricingExplainer: [
      "It's fair to be skeptical of a \"final\" price in this industry. For McCulloch County buyers, the number Texas Homes Direct quotes already has everything above folded in — there's no revised total waiting at closing.",
      "We won't tell a McCulloch County buyer we know their exact utility cost without ever seeing the land — that's not a real number, it's a guess. Instead, a phone estimate comes first, followed by an on-site contractor bid you review before it's locked in.",
    ],
    localProof:
      "McCulloch County has seen us deliver both single wide and double wide homes, matched to each family's lot size and budget.",
    faq: [
      {
        q: "How do I figure out what size home actually fits my lot?",
        a: "It comes down to access for delivery and any setback requirements more than the total acreage you own. We'll walk your specific site with you before recommending anything.",
      },
      {
        q: "Does McCulloch County fall inside your delivery range?",
        a: "Yes — share your address and we'll spell out exactly what delivery and setup will look like for your property.",
      },
      {
        q: "Once I've picked a home, what happens on your end?",
        a: "We take over from there — coordinating the factory build, arranging delivery, and managing the on-site setup — and keep you posted at each stage.",
      },
      {
        q: "What's actually covered in your quoted home price?",
        a: "The list above is exhaustive, not a starting point. What's quoted is what's owed.",
      },
    ],
    nearby: ['san-saba', 'mason', 'coleman', 'brownwood'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Brady, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.png',
    secondaryAlt: 'Manufactured home available for delivery near Brady, TX',
    popularHomes: [
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-chapman-1bed-1bath-park-model',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  mason: {
    county: 'Mason',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Mason, TX and Mason County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Every home Texas Homes Direct sells passes factory inspection before it ever leaves the plant, built to the same HUD standard whether it's headed to Mason County or anywhere else in Texas. That consistency is part of what buyers are paying for.",
    buyingHeading: 'Buying a Mobile Home in Mason County',
    buying: [
      "A smaller lot or a tighter budget often points a Mason-area buyer toward a single wide; a larger household usually leans toward a double wide for the extra bedrooms. Financing works the same regardless of which one you choose.",
      "We're not limited to a single lending option — in-house financing, public loan programs, and private lenders are all on the table, which gives Mason County buyers more than one path to approval.",
    ],
    pricingExplainer: [
      "You shouldn't have to do mental math to figure out your real cost. The price quoted to a Mason County buyer already includes everything listed above, calculated once and not revisited later.",
      "What we won't do is invent a utility figure before anyone's seen your land. A phone estimate gets the conversation started, and a contractor visits the property afterward to produce an exact bid, confirmed before you commit to it.",
    ],
    localProof:
      "We've matched Mason County families to floor plans based on their actual lot and household size, not a fixed package.",
    faq: [
      {
        q: "Do I need land in hand before I start this process?",
        a: "No. We work with buyers who already own land, buyers still shopping for a lot, and buyers using property that's been in the family.",
      },
      {
        q: "Can setup expenses be wrapped into my monthly payment?",
        a: "Yes — instead of a separate bill for the pad and utilities, that cost gets built directly into your financing.",
      },
      {
        q: "Do you serve all of Mason County, or just the town itself?",
        a: "All of Mason County. Send your address our way and we'll confirm what delivery looks like for your specific location.",
      },
    ],
    nearby: ['brady', 'llano', 'junction', 'fredericksburg'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    heroAlt: 'Manufactured home exterior near Mason, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Mason, TX',
    popularHomes: [
      'marathon-spoonbill-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-10',
  },

  junction: {
    county: 'Kimble',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Junction, TX and Kimble County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Ask what's actually included in a manufactured home purchase near Junction, and the answer from Texas Homes Direct is everything: the base pad, utility hookups, underpinning, and skirting — not just the home itself showing up on a truck.",
    buyingHeading: 'Buying a Mobile Home in Kimble County',
    buying: [
      "A manufactured home meeting current HUD code typically runs well under the cost of an equivalent site-built house near Junction — construction quality doesn't drop, but the price does.",
      "Kimble County land comes in all shapes — family property, a lot already purchased, or one you're still shopping for. Texas Homes Direct adjusts the setup plan to whichever applies to you.",
    ],
    pricingExplainer: [
      "There's a reason \"out-the-door\" matters to a Kimble County buyer: the price above is the complete price, not a partial number that grows as you go.",
      "Utility pricing has to wait for an actual look at the land, since no two Junction-area properties are the same. We start with a phone estimate, then send a contractor out to produce an exact figure you review before anything is finalized.",
    ],
    localProof:
      "Kimble County buyers we've worked with span a wide range of budgets and lot sizes, from modest single-section homes to larger family layouts.",
    faq: [
      {
        q: "What's a sensible way to figure out which floor plan fits my land?",
        a: "Focus on delivery access and setback rules more than raw square footage of your lot. We'll go over your site in detail before recommending anything.",
      },
      {
        q: "Will less-than-great credit rule me out?",
        a: "Not necessarily. Between financing directly and partnering with outside lenders, most buyers land on an option that works.",
      },
      {
        q: "Can I look over photos before making a decision?",
        a: "Absolutely — reach out and we'll send along images and floor plans for any model that interests you.",
      },
      {
        q: "Will extra costs show up after I've committed to a home?",
        a: "It stays put. The items above are the complete quote, not a partial figure that grows later.",
      },
    ],
    nearby: ['mason', 'sonora', 'kerrville', 'rocksprings'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Junction, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Junction, TX',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-terra-2bed-1bath-park-model',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  burnet: {
    county: 'Burnet',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Burnet, TX and Burnet County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Burnet County buyers deserve a price they can actually verify, not a number that changes after the fact. That's the whole premise behind how Texas Homes Direct operates — no games, no pressure to sign quickly.",
    buyingHeading: 'Buying a Mobile Home in Burnet County',
    buying: [
      "The base pad, underpinning, and skirting are fixed costs we quote right alongside the home. Utility connections are the one variable — Burnet County land differs enough that those get an exact bid from our own contractor before anything is final.",
      "Double wides arrive in two sections that get joined and finished once they're on your property — more moving parts than a single wide, but work our crews manage as part of the sale either way.",
    ],
    pricingExplainer: [
      "A price that changes after you've committed isn't really a price. For Burnet County buyers, what's quoted above is what's owed — nothing more.",
      "The honest answer on utilities is that we can't know the exact cost until we've seen your land — soil, distance to lines, and well depth all vary too much for a phone guess. You'll get an estimate early, then a contractor-verified number before committing.",
    ],
    localProof:
      "We've delivered homes across Burnet County ranging from compact single-section layouts to larger multi-bedroom double wides.",
    faq: [
      {
        q: "Is owning land already a requirement?",
        a: "No — we work with buyers who own land outright, buyers purchasing a lot separately, and buyers using property that's stayed in the family.",
      },
      {
        q: "How should I think about single wide versus double wide?",
        a: "Think budget and lot size for a single wide, and household size and future space needs for a double wide. We'll help you weigh the tradeoff against your actual situation.",
      },
      {
        q: "Is Burnet County within your service area?",
        a: "Yes, all of it. Pass along your address and we'll map out delivery specifics for your property.",
      },
    ],
    nearby: ['lampasas', 'llano', 'georgetown', 'johnson-city'],
    heroImage: '/homes/the-katy/Katy-Hero.png',
    heroAlt: 'Single wide manufactured home exterior near Burnet, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Burnet, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-10',
  },

  blanco: {
    county: 'Blanco',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Blanco, TX and Blanco County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "What does a manufactured home actually run per month? That's usually the first question a Blanco County buyer asks, and Texas Homes Direct answers it directly instead of steering the conversation elsewhere.",
    buyingHeading: 'Buying a Mobile Home in Blanco County',
    buying: [
      "A HUD-code manufactured home puts a Blanco family into a new house for noticeably less than an equivalent site-built project, without any compromise on the construction standard.",
      "Some Blanco County land already has a well, septic system, and electric service ready to go; other lots are a blank canvas. We size up the actual site work required rather than assuming a default package.",
    ],
    pricingExplainer: [
      "Budgeting for a home only works if the number holds. Blanco County buyers get a quote from Texas Homes Direct that already includes everything above, so the number they plan around is the number they pay.",
      "Where we're careful not to overpromise is utility costs. Every property is different, so a phone estimate comes first, and an exact bid follows from a contractor who's actually walked the land — a number you approve before it's locked in.",
    ],
    localProof:
      "Families across Blanco County have worked with us on both single wide and double wide floor plans, chosen around their specific lot and household.",
    faq: [
      {
        q: "What are Blanco County's permitting requirements for a manufactured home?",
        a: "Those vary by county, so it's worth confirming with Blanco County directly before you buy. We can steer you to the right office to ask.",
      },
      {
        q: "What's the process after I've decided on a floor plan?",
        a: "From that point, our team manages the build schedule, coordinates delivery, and oversees the on-site setup, keeping you in the loop the entire time.",
      },
      {
        q: "What does the out-the-door price for a Blanco-area home actually cover?",
        a: "That's the whole price. Everything above is already folded into the number you're given.",
      },
    ],
    nearby: ['johnson-city', 'fredericksburg', 'boerne', 'dripping-springs'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Manufactured home exterior near Blanco, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Blanco, TX',
    popularHomes: [
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  'johnson-city': {
    county: 'Blanco',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Johnson City, TX and Blanco County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Deciding between a single wide and a double wide is usually the first real choice a Johnson City buyer has to make, and it comes down to lot size and household needs more than anything else. Texas Homes Direct walks through both before you commit to either.",
    buyingHeading: 'Buying a Mobile Home in Blanco County',
    buying: [
      "A single wide keeps costs down for a smaller lot or tighter budget, while a double wide suits a Johnson City family that needs more bedrooms and living space. Either way, the financing process looks the same.",
      "Every home in our lineup meets current HUD construction code and goes through factory inspection before delivery — the same baseline standard no matter where in Blanco County it's headed.",
    ],
    pricingExplainer: [
      "Nobody wants a surprise bill after they've already committed to a home. For Johnson City buyers, the price above is locked — everything listed is already part of it.",
      "Utilities are handled differently, because Blanco County land varies too much for a phone-only number. An estimate starts the conversation, then a contractor visits your specific property for an exact bid you actually approve, not a guess revised later.",
    ],
    localProof:
      "Blanco County buyers near Johnson City have chosen a mix of single wide and double wide homes, based on what actually fit their property.",
    faq: [
      {
        q: "Is prior land ownership required in Blanco County?",
        a: "It isn't. We regularly work with buyers who already have land, buyers still searching for a lot, and buyers using property passed down in the family.",
      },
      {
        q: "Will I be charged more than the quoted price once I've committed?",
        a: "The quoted number holds. Everything above is already part of it, with nothing added afterward.",
      },
    ],
    nearby: ['blanco', 'fredericksburg', 'dripping-springs', 'burnet'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Johnson City, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Single wide manufactured home available for delivery near Johnson City, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-10',
  },

  comfort: {
    county: 'Kendall',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Comfort, TX and Kendall County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Manufactured home permitting works differently from one Texas county to the next, and most Comfort-area buyers have no reason to already know Kendall County's specific process. Texas Homes Direct handles that paperwork directly instead of leaving you to sort it out.",
    buyingHeading: 'Buying a Mobile Home in Kendall County',
    buying: [
      "Kendall County land works in several configurations for a manufactured home — property already in the family, a lot you own outright, or one you're purchasing on your own. We'll scope your specific site once we know which applies.",
      "Not every Texas county handles manufactured home permitting the same way, and Kendall County has its own process. Texas Homes Direct manages that coordination so a Comfort-area buyer isn't tracking down paperwork solo.",
    ],
    pricingExplainer: [
      "Some quotes look attractive because they're missing pieces. Comfort-area buyers get the opposite from Texas Homes Direct: a number that already has everything above built in.",
      "Kendall County land conditions vary enough that pretending to know utility costs without seeing the property wouldn't be honest. A phone estimate gets things started, and a contractor visit produces the exact bid, reviewed by you before it's final.",
    ],
    localProof:
      "We've set up both single wide and double wide homes for families throughout Kendall County, sized to each buyer's actual needs.",
    faq: [
      {
        q: "What permitting steps should I expect in Kendall County?",
        a: "Those depend on the specific property and current county rules, so it's best to check directly with Kendall County. We can point you toward the right office.",
      },
      {
        q: "My credit has some dings — can I still get approved?",
        a: "In most cases, yes. Between in-house financing and a network of outside lenders, buyers with credit challenges typically still have workable options.",
      },
      {
        q: "After I settle on a home, what does Texas Homes Direct handle next?",
        a: "We take over coordinating the build schedule, arranging delivery, and managing the on-site setup, checking in with you as things progress.",
      },
    ],
    nearby: ['boerne', 'kerrville', 'fredericksburg', 'bandera'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Comfort, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Comfort, TX',
    popularHomes: [
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  bandera: {
    county: 'Bandera',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Bandera, TX and Bandera County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Texas Homes Direct doesn't stop at getting a home onto your Bandera County property. The base pad, utility connections, underpinning, and skirting are all handled by our own crews and rolled into the same financing as the home.",
    buyingHeading: 'Buying a Mobile Home in Bandera County',
    buying: [
      "A manufactured home meeting current HUD code costs meaningfully less than comparable site-built construction around Bandera, without any compromise on how the home is actually built.",
      "Some Bandera County properties already have utilities run; others are starting from raw land. Texas Homes Direct scopes exactly what your site needs instead of assuming a standard package applies.",
    ],
    pricingExplainer: [
      "The whole point of an out-the-door price is that it doesn't move. For a Bandera County buyer, everything listed above is already factored into the quote, not added as a follow-up.",
      "We're upfront that utility costs can't be nailed down over the phone alone. Every lot near Bandera has its own conditions, so an estimate comes first, followed by an exact bid from a contractor who's actually been to the property.",
    ],
    localProof:
      "Bandera County buyers have come to us with land already in the family, land they'd just bought, and lots they were still deciding on.",
    faq: [
      {
        q: "What's the practical difference in living space between a single wide and a double wide?",
        a: "A single wide is one continuous section with a smaller footprint and lower cost; a double wide is two joined sections offering substantially more room. Your lot and household size usually make the choice clear.",
      },
      {
        q: "Is Bandera County part of your regular delivery territory?",
        a: "It is — pass along your address and we'll walk through the delivery specifics for your property.",
      },
      {
        q: "Before committing, can I look at real floor plans and photos?",
        a: "Of course. Get in touch and we'll send over the details for whatever models fit what you're looking for.",
      },
    ],
    nearby: ['boerne', 'kerrville', 'hondo', 'castroville'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Bandera, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Bandera, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  hondo: {
    county: 'Medina',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Hondo, TX and Medina County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "A less-than-perfect credit history doesn't automatically rule out financing for a Hondo-area buyer. Between in-house terms and outside lending partners, Texas Homes Direct typically finds a workable path even when a single bank wouldn't approve it.",
    buyingHeading: 'Buying a Mobile Home in Medina County',
    buying: [
      "Between financing directly and partnering with outside public and private lenders, Texas Homes Direct typically has a path forward even for buyers whose credit isn't perfect.",
      "A Medina County property can work whether it's family land, a lot already owned, or one being purchased separately. We'll cover what a specific site calls for once we know which situation applies.",
    ],
    pricingExplainer: [
      "A quote that leaves things out isn't really a quote — it's an opening offer. Hondo-area buyers get a complete number from Texas Homes Direct, with everything above already included.",
      "Medina County properties vary enough that utility costs genuinely can't be known from a phone call alone. A solid estimate comes first, then our own contractor visits the land for an exact bid you see and approve before anything is finalized.",
    ],
    localProof:
      "Hondo-area families we've worked with have landed on floor plans ranging from compact single-section homes to larger double wides.",
    faq: [
      {
        q: "What determines which floor plan actually fits my land?",
        a: "Mostly delivery access and setback requirements rather than raw acreage. We'll go over your specific property before recommending a size.",
      },
      {
        q: "Does your delivery area cover all of Medina County?",
        a: "Yes. Once we have your address, we'll confirm exactly what delivery and setup will look like for your property.",
      },
      {
        q: "Is approval realistic if my credit history isn't spotless?",
        a: "Usually, yes. Between our own financing and outside lending partners, most buyers find a workable path regardless of credit history.",
      },
    ],
    nearby: ['castroville', 'devine', 'uvalde', 'bandera'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'Manufactured home exterior near Hondo, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Hondo, TX',
    popularHomes: [
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  devine: {
    county: 'Medina',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Devine, TX and Medina County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Texas Homes Direct delivers throughout Medina County, not just to Devine itself, with the same pricing and setup process no matter where in the county your property sits.",
    buyingHeading: 'Buying a Mobile Home in Medina County',
    buying: [
      "Meeting current HUD code doesn't mean a lower-quality home — it means the same modern construction standard, priced well below an equivalent site-built house near Devine.",
      "Some Medina County buyers near Devine already have a site picked out; others are still deciding between options. Texas Homes Direct works with buyers at either stage of that process.",
    ],
    pricingExplainer: [
      "The price you see should be the price you owe. For Devine-area buyers, that's exactly how Texas Homes Direct works — everything listed above is already part of the number.",
      "Every property in Medina County is different, so we won't claim to know your exact utility cost sight unseen. A phone estimate comes first, then a contractor visits the land to build a precise bid — the real number, seen before you commit.",
    ],
    localProof:
      "Families near Devine in Medina County have worked with us on floor plans sized to fit their specific lot and household.",
    faq: [
      {
        q: "Do I need land secured before reaching out?",
        a: "No — some buyers already have a site lined up, some are still shopping, and some are working with family property. We meet you at whichever stage applies.",
      },
      {
        q: "Can setup expenses be folded into my monthly payment?",
        a: "Yes — that's actually the more common path for our Devine-area buyers, rather than writing a second check once the home is on the ground.",
      },
      {
        q: "Does Texas Homes Direct serve all of Medina County?",
        a: "It does. Share your address and we'll confirm the specifics of delivery for your property.",
      },
      {
        q: "Is the price you quote for a home near Devine the full cost?",
        a: "That's correct. Once the number above is quoted, it stays the number — no revisions later.",
      },
    ],
    nearby: ['hondo', 'castroville', 'pleasanton', 'pearsall'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Manufactured home exterior near Devine, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Devine, TX',
    popularHomes: [
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-terra-2bed-1bath-park-model',
      'marathon-dove-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  castroville: {
    county: 'Medina',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Castroville, TX and Medina County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Texas Homes Direct is a family-owned, faith-based business, and that shapes how we work with Castroville-area buyers: straightforward pricing, no inflated numbers, and no pressure to sign before you're ready.",
    buyingHeading: 'Buying a Mobile Home in Medina County',
    buying: [
      "A double wide near Castroville gives a family more bedrooms and square footage than a single wide, built from two sections joined once on-site. A single wide costs less and goes up with a simpler process.",
      "The pad, underpinning, and skirting are quoted right alongside the home, no waiting required. Utility connections are the exception — Medina County land varies enough that those get an exact, contractor-verified bid before that cost is added to your financing.",
    ],
    pricingExplainer: [
      "Trust in a price starts with what it actually includes. Castroville-area buyers get a number from Texas Homes Direct that already accounts for everything above, with nothing added after the fact.",
      "Utility costs are the exception we're upfront about: they depend on the property, not a phone call. Castroville-area buyers get a starting estimate, then a contractor visit to the actual land for an exact bid reviewed before anything is finalized.",
    ],
    localProof:
      "Medina County families near Castroville have worked with us across a range of budgets, from modest single-section homes to larger double wides.",
    faq: [
      {
        q: "Is prior land ownership necessary before I can buy?",
        a: "No. We work with buyers who already own land, buyers purchasing a lot on their own, and buyers using family property.",
      },
      {
        q: "What actually separates a single wide from a double wide?",
        a: "A single wide is one continuous section, more compact and budget-friendly. A double wide is assembled from two joined sections and offers meaningfully more square footage.",
      },
      {
        q: "Can I see photos before making a final decision?",
        a: "Yes — reach out and we'll share photos and floor plan details for any home that catches your interest.",
      },
    ],
    nearby: ['hondo', 'devine', 'boerne', 'san-antonio'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    heroAlt: 'Manufactured home exterior near Castroville, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Castroville, TX',
    popularHomes: [
      'marathon-spoonbill-3bed-2bath-single-wide',
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-10',
  },

  'new-braunfels': {
    county: 'Comal',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in New Braunfels, TX and Comal County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Comal County buyers aren't choosing from three floor plans and calling it a day. Texas Homes Direct carries a range of layouts, from compact single-section homes to larger four-bedroom double wides, so the decision is about fit, not what happens to be on the lot.",
    buyingHeading: 'Buying a Mobile Home in Comal County',
    buying: [
      "A smaller floor plan keeps cost and setup simple for a New Braunfels-area buyer with a tighter lot; a larger double wide suits a family that needs the extra bedrooms. Both are financed the same way.",
      "Every floor plan we offer meets current HUD code and passes factory inspection before it ships — the range in size doesn't mean a range in construction standard.",
    ],
    pricingExplainer: [
      "Whichever floor plan a New Braunfels-area buyer lands on, the price works the same way: everything itemized above is already built into the number you're quoted.",
      "Comal County land varies enough in soil and access that utility costs can't be quoted sight unseen. A phone estimate starts the conversation, and our contractor bids the actual property before you commit.",
    ],
    localProof:
      "Comal County buyers we've worked with have picked from a genuine range of floor plans — not just whatever happened to be available.",
    faq: [
      {
        q: "How many floor plans are actually available near New Braunfels?",
        a: "More than a handful — reach out and we'll walk through current options sized and priced for what you're looking for.",
      },
      {
        q: "Can I get approved with less-than-perfect credit?",
        a: "Often, yes. Between financing directly and working with outside lenders, most buyers find a path even with credit challenges.",
      },
      {
        q: "Do you deliver throughout Comal County?",
        a: "Yes. Share your address and we'll confirm exactly what delivery and setup look like for your property.",
      },
    ],
    nearby: ['seguin', 'san-marcos', 'boerne', 'schertz'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near New Braunfels, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.png',
    secondaryAlt: 'Single wide manufactured home available for delivery near New Braunfels, TX',
    popularHomes: [
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-mallard-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-18',
  },

  lockhart: {
    county: 'Caldwell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Lockhart, TX and Caldwell County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Buying a manufactured home involves more paperwork than most Lockhart-area buyers expect — permits, utility applications, title work. Texas Homes Direct manages all of it, not just the permit piece.",
    buyingHeading: 'Buying a Mobile Home in Caldwell County',
    buying: [
      "A Caldwell County buyer doesn't need to learn the county's process to buy from us; we file what needs filing and coordinate what needs coordinating.",
      "Compared to site-built construction, a HUD-code manufactured home puts Caldwell County buyers into a new home at a noticeably lower price point, same quality standard.",
    ],
    pricingExplainer: [
      "The paperwork gets handled, and so does the price — a Lockhart-area quote is complete the moment you see it, with everything itemized above already in it.",
      "Utility costs are the one thing that requires an actual site visit rather than a form. A phone estimate starts it, and our contractor's exact bid finishes it before anything is final.",
    ],
    localProof:
      "We've walked Caldwell County families through permitting, utility applications, and title paperwork alongside their home purchase, not as a separate hassle.",
    faq: [
      {
        q: "What paperwork does Texas Homes Direct actually handle for a Lockhart purchase?",
        a: "Permitting, utility coordination, and the documentation tied to setup — we manage the filing so you're not tracking down forms yourself.",
      },
      {
        q: "What size home actually fits my lot?",
        a: "That's mostly about delivery access and setback rules, not just total acreage. We'll go over your specific site before recommending a floor plan.",
      },
      {
        q: "Do I need a permit for a manufactured home in Caldwell County?",
        a: "Yes, and we file it as part of the process — you won't need to visit the county office yourself.",
      },
      {
        q: "What happens after I choose a home?",
        a: "Once you're set on a home, our team runs point on everything else — scheduling the build, coordinating delivery, and handling setup.",
      },
    ],
    nearby: ['luling', 'san-marcos', 'bastrop', 'seguin'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Lockhart, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Lockhart, TX',
    popularHomes: [
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  luling: {
    county: 'Caldwell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Luling, TX and Caldwell County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "If you're comparing quotes from more than one manufactured home dealer near Luling, ask each one the same question: does this number include setup, or just the home? Texas Homes Direct's answer is always both.",
    buyingHeading: 'Buying a Mobile Home in Caldwell County',
    buying: [
      "A quote that leaves out setup, delivery, or utilities isn't actually cheaper — it's incomplete. We'd rather a Luling-area buyer see the full number upfront than get surprised comparing it to someone else's partial one.",
      "Permitting requirements aren't identical from one Texas county to the next, and Caldwell County is no exception. Texas Homes Direct manages that coordination directly.",
    ],
    pricingExplainer: [
      "When you compare our quote to anyone else's, compare the whole thing — everything itemized above is already folded into the number, not billed separately later.",
      "What we won't do is invent a utility number before anyone's seen your land. A phone estimate comes first, and our own contractor follows up on-site with an exact figure.",
    ],
    localProof:
      "Luling-area families we've worked with have told us they appreciated seeing a complete number instead of piecing one together from several quotes.",
    faq: [
      {
        q: "What should I ask other dealers to make sure I'm comparing quotes fairly?",
        a: "Whether setup, delivery, and permitting are included in the number — a lot of quotes leave those out and add them back in later.",
      },
      {
        q: "How much does a manufactured home cost near Luling?",
        a: "It varies by floor plan and features, but the free mortgage analysis tool gives you a number specific to your budget and situation.",
      },
      {
        q: "Do I need to already own land?",
        a: "No. Family property, land you already own, or a lot you're purchasing separately all work with Texas Homes Direct.",
      },
      {
        q: "Can I see the home before deciding?",
        a: "Absolutely — just tell us which models caught your eye and we'll send over photos and floor plans before you commit to anything.",
      },
    ],
    nearby: ['lockhart', 'seguin', 'gonzales', 'san-marcos'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Luling, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Luling, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  gonzales: {
    county: 'Gonzales',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Gonzales, TX and Gonzales County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "A big down payment isn't always the barrier Gonzales County buyers assume it is. Down payment requirements shift depending on the loan program and your financial profile — there isn't one fixed number everyone has to hit.",
    buyingHeading: 'Buying a Mobile Home in Gonzales County',
    buying: [
      "Texas Homes Direct works through several loan programs precisely because a single down payment threshold doesn't fit every Gonzales-area buyer's situation.",
      "A manufactured home built to current HUD code gets a Gonzales County family into a new home for meaningfully less than an equivalent site-built house.",
    ],
    pricingExplainer: [
      "The price Texas Homes Direct quotes for a Gonzales-area home is complete from the start — everything itemized above is already in that number, regardless of which financing path you take.",
      "We don't quote utilities off a phone call alone — Gonzales County land is too inconsistent for that to be honest. The number you get upfront is a placeholder, until our own contractor for an exact bid.",
    ],
    localProof:
      "We've worked with Gonzales County buyers on a range of down payment structures, matched to what actually fit their financial situation.",
    faq: [
      {
        q: "Is there a minimum down payment for a Gonzales-area purchase?",
        a: "It depends on the loan program — there isn't one number that applies to every buyer. We'll go over what actually applies to your situation.",
      },
      {
        q: "Do I need to already own land in Gonzales County?",
        a: "It's not required. We've worked with buyers who already owned their land, others who bought a lot specifically for this, and some building on property that's been passed down.",
      },
      {
        q: "What happens once I've picked a home?",
        a: "After that, the logistics become our problem, not yours: build timeline, delivery, and setup, all managed by our team.",
      },
      {
        q: "Will costs get added after I've committed?",
        a: "No. The quoted number already includes everything itemized above.",
      },
    ],
    nearby: ['luling', 'seguin', 'cuero', 'yoakum'],
    heroImage: '/homes/the-chapman/Chapman-Hero.png',
    heroAlt: 'Manufactured home exterior near Gonzales, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Gonzales, TX',
    popularHomes: [
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  floresville: {
    county: 'Wilson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Floresville, TX and Wilson County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Texas Homes Direct sells factory-direct, which means a Floresville-area buyer isn't paying for an extra layer of dealership markup stacked on top of the manufacturer's price.",
    buyingHeading: 'Buying a Mobile Home in Wilson County',
    buying: [
      "That direct relationship is part of why a manufactured home costs a Wilson County family less than comparable site-built construction — there's one fewer hand in the pricing.",
      "Tighter budget or a smaller lot near Floresville? A single wide often makes more sense. Need more square footage for a growing household? That's where a double wide earns its keep.",
    ],
    pricingExplainer: [
      "Factory-direct doesn't mean bare-bones — it means the price you see already includes everything itemized above, without a markup layer inflating it first.",
      "Wilson County properties vary enough in soil and access that we won't guess at utility costs sight unseen. A phone estimate comes first, then an exact bid from our contractor.",
    ],
    localProof:
      "Wilson County buyers we've worked with have asked directly about markup, and the honest answer is the price reflects the factory number plus setup, not an added margin on top.",
    faq: [
      {
        q: "What does 'factory-direct' actually mean for pricing?",
        a: "It means Texas Homes Direct works directly with the manufacturer rather than through a separate dealership markup layer, which keeps the quoted price lower.",
      },
      {
        q: "What permitting steps should I expect in Wilson County?",
        a: "Permitting steps track the property and current Wilson County requirements, not a fixed checklist — best confirmed with the county directly.",
      },
      {
        q: "Do you deliver throughout Wilson County?",
        a: "We cover all of Wilson County. Send your address over and we'll lay out exactly what delivery and setup will look like at your location.",
      },
    ],
    nearby: ['pleasanton', 'seguin', 'karnes-city', 'san-antonio'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.png',
    heroAlt: 'Manufactured home exterior near Floresville, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Floresville, TX',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-terra-2bed-1bath-park-model',
    ],
    lastModified: '2026-09-18',
  },

  smithville: {
    county: 'Bastrop',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Smithville, TX and Bastrop County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Texas Homes Direct doesn't deal in used or salvage manufactured homes near Smithville — every home in our inventory is new and HUD-certified, built to the current construction code.",
    buyingHeading: 'Buying a Mobile Home in Bastrop County',
    buying: [
      "That matters for financing as much as peace of mind: new HUD-certified homes qualify for loan programs that older or used units often can't.",
      "Site-built construction runs meaningfully higher than a comparable HUD-code manufactured home near Smithville — same construction standard, lower price tag.",
    ],
    pricingExplainer: [
      "A Smithville-area quote for a new, HUD-certified home holds from the moment you get it — everything itemized above is already part of that number.",
      "Bastrop County land varies enough that a phone-only utility number would just be a guess. We start with an estimate, then send a contractor to the actual property for an exact bid.",
    ],
    localProof:
      "Smithville-area families we've worked with have specifically asked about new-versus-used inventory, and every home we've delivered has been new and current-code.",
    faq: [
      {
        q: "Do you sell used or refurbished homes near Smithville?",
        a: "Everything we carry is brand new and HUD-certified — nothing used or refurbished. Get in touch and we'll walk you through what's currently in stock.",
      },
      {
        q: "What permitting steps apply in Bastrop County?",
        a: "That's worth confirming directly with Bastrop County, since requirements shift from one county to the next.",
      },
      {
        q: "Do I need land squared away before reaching out?",
        a: "It's not a prerequisite — we hear from Smithville-area buyers at every stage, whether they've already got a spot picked out or are still figuring that part out.",
      },
    ],
    nearby: ['bastrop', 'la-grange', 'elgin', 'giddings'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Smithville, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Smithville, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  elgin: {
    county: 'Bastrop',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Elgin, TX and Bastrop County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "No two Elgin-area properties set up exactly the same way. Texas Homes Direct scopes each site individually rather than applying one generic setup plan across every Bastrop County lot.",
    buyingHeading: 'Buying a Mobile Home in Bastrop County',
    buying: [
      "Some lots need more prep work than others — clearing, grading, longer utility runs. We account for the specific site rather than assuming a standard package covers it.",
      "A single wide can be a practical starting point for an Elgin-area buyer on a smaller lot or tighter budget, while a double wide suits a family that needs more room.",
    ],
    pricingExplainer: [
      "Even though every site is different, the home price itself doesn't move once it's quoted — everything itemized above is already in the number Texas Homes Direct gives an Elgin-area buyer.",
      "Guessing at a utility number before we've walked the property wouldn't be fair to an Elgin-area buyer. We open with a phone estimate, and the contractor's on-site figure is what actually counts.",
    ],
    localProof:
      "We've adapted setup plans for Bastrop County properties ranging from cleared, level lots to more wooded sites near Elgin.",
    faq: [
      {
        q: "Does my lot need to be cleared before Texas Homes Direct can set up near Elgin?",
        a: "Not necessarily — we assess the site first and scope what work is actually needed rather than assuming a fixed requirement.",
      },
      {
        q: "Am I required to have land before contacting you?",
        a: "You're not. Elgin-area buyers come to us with family land, purchased lots, and land they're still looking for — we adjust to whichever applies.",
      },
      {
        q: "Is Bastrop County entirely within your delivery range?",
        a: "It is. Pass along your address and we'll confirm what setup looks like at your specific location.",
      },
    ],
    nearby: ['bastrop', 'taylor', 'giddings', 'smithville'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near Elgin, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Elgin, TX',
    popularHomes: [
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-18',
  },

  bastrop: {
    county: 'Bastrop',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Bastrop, TX and Bastrop County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Call Texas Homes Direct about a Bastrop-area property and you'll talk to someone who actually knows the answer, not a call center reading from a script.",
    buyingHeading: 'Buying a Mobile Home in Bastrop County',
    buying: [
      "That direct access matters when a Bastrop County buyer has a specific question about their lot, their financing, or their timeline for deciding — a scripted answer doesn't help much.",
      "A double wide arrives in two sections joined and finished on your property — a bigger project than a single wide, but one our crews handle as part of the purchase.",
    ],
    pricingExplainer: [
      "When you ask what's included in a Bastrop-area quote, you get a straight answer, not a transfer — everything itemized above is already in the number.",
      "Bastrop County land differs enough lot to lot that a contractor has to actually walk it before we'll commit to a utility figure. A phone estimate opens the conversation, and the real bid follows the site visit.",
    ],
    localProof:
      "Bastrop County buyers we've worked with have reached the same team member on follow-up calls instead of starting over with someone new.",
    faq: [
      {
        q: "If I call with a question, will I reach someone who actually knows my situation?",
        a: "Yes — Bastrop-area buyers work with the same point of contact rather than a general call queue.",
      },
      {
        q: "Do I need to already own land to start this process?",
        a: "No. Bastrop County buyers reach out with family land, land they've bought, and land they're still shopping for — all three work.",
      },
      {
        q: "How far out does your delivery area extend from Bastrop?",
        a: "Across the whole county — tell us your address and we'll go over what that means for your specific property.",
      },
    ],
    nearby: ['elgin', 'smithville', 'lockhart', 'giddings'],
    heroImage: '/homes/the-katy/Katy-Hero.png',
    heroAlt: 'Single wide manufactured home exterior near Bastrop, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Bastrop, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-18',
  },

  giddings: {
    county: 'Lee',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Giddings, TX and Lee County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "A lot of Giddings-area buyers are looking at a manufactured home for the first time and aren't sure what to ask. Texas Homes Direct walks through the process step by step, not assuming you already know the terminology.",
    buyingHeading: 'Buying a Mobile Home in Lee County',
    buying: [
      "There's no bad question for a Lee County first-time buyer — financing terms, site prep, permitting all get explained plainly before you're asked to decide anything.",
      "Lee County has room for a manufactured home whether it's going on family land, land already owned, or a lot purchased separately.",
    ],
    pricingExplainer: [
      "First-time buyers especially benefit from a number that doesn't require translation — a Giddings-area quote already includes everything itemized above, plainly.",
      "We won't hand a first-time Lee County buyer a made-up utility figure just to sound decisive. A phone estimate is the honest starting point, and the contractor's site visit produces the number that actually counts.",
    ],
    localProof:
      "We've walked first-time buyers in Lee County through the entire process, from financing basics to what happens on delivery day.",
    faq: [
      {
        q: "I've never done this before — where do I even start?",
        a: "With a phone call. We'll walk through land status, budget, and floor plan options before anything gets formal.",
      },
      {
        q: "Do you deliver throughout Lee County?",
        a: "Yes. Send us your address and we'll confirm what delivery and setup look like for your specific property.",
      },
      {
        q: "What's the difference between a single wide and a double wide?",
        a: "Square footage and price, mainly — a single wide is one section and the more budget-friendly option, while a double wide combines two sections on-site for a noticeably bigger home.",
      },
    ],
    nearby: ['elgin', 'brenham', 'la-grange', 'caldwell'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Manufactured home exterior near Giddings, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Giddings, TX',
    popularHomes: [
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  'la-grange': {
    county: 'Fayette',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in La Grange, TX and Fayette County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "Every home Texas Homes Direct sells near La Grange goes through two separate inspections — one at the factory before it ships, and one on-site once it's set. Neither step gets skipped.",
    buyingHeading: 'Buying a Mobile Home in Fayette County',
    buying: [
      "The factory inspection confirms the build meets HUD code; the on-site inspection confirms the setup itself was done correctly on your Fayette County property.",
      "A manufactured home can get a Fayette County family into a new home for a lot less than site-built construction, without cutting corners on quality.",
    ],
    pricingExplainer: [
      "Both inspections are part of the same quoted price for a La Grange-area home — everything itemized above is already included, inspections and all.",
      "Fayette County soil and access vary enough property to property that a real utility figure has to wait for a contractor's visit. We'll give you a phone estimate in the meantime, but the site-verified number is what goes into your financing.",
    ],
    localProof:
      "Fayette County homes we've delivered near La Grange have each passed both the factory build inspection and a final on-site check.",
    faq: [
      {
        q: "What if I haven't settled on a piece of land yet?",
        a: "That's fine — plenty of La Grange-area buyers start the process before their land situation is finalized.",
      },
      {
        q: "Which parts of Fayette County can you actually reach?",
        a: "All of it. Give us your address and we'll lay out exactly what delivery involves for that location.",
      },
    ],
    nearby: ['schulenburg', 'giddings', 'columbus', 'flatonia'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near La Grange, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.png',
    secondaryAlt: 'Manufactured home available for delivery near La Grange, TX',
    popularHomes: [
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-chapman-1bed-1bath-park-model',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  schulenburg: {
    county: 'Fayette',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Schulenburg, TX and Fayette County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
    intro:
      "Texas Homes Direct doesn't sell land, and we don't bundle land-and-home packages near Schulenburg — just homes, priced and financed on their own.",
    buyingHeading: 'Buying a Mobile Home in Fayette County',
    buying: [
      "That's a deliberate line: a Fayette County buyer working with land they already have, or buying a lot on their own, gets the same straightforward home purchase either way.",
      "Site-built construction costs add up fast around Fayette County — a HUD-code manufactured home gets you the same quality build for meaningfully less.",
    ],
    pricingExplainer: [
      "Since we're not bundling land into the deal, a Schulenburg-area quote stays simple — everything itemized above covers the home and setup, nothing else mixed in.",
      "A Fayette County lot's soil and access aren't things we can judge over the phone, so we hold off on a firm utility number until a contractor has actually stood on the property.",
    ],
    localProof:
      "We've worked with Schulenburg-area buyers at every stage of the land question — some already owned it, some had just closed on a lot, some were still weighing options. Either way, our part is the home, never the land.",
    faq: [
      {
        q: "Does Texas Homes Direct sell land along with the home?",
        a: "No — we sell manufactured homes only. Whatever land situation you're working with, family property, your own lot, or one you're buying separately, we work with it.",
      },
      {
        q: "How do I find out if you deliver to my specific address near Schulenburg?",
        a: "Just send it over. We'll confirm coverage and walk through what delivery looks like for that property.",
      },
      {
        q: "Is it possible to review floor plans and photos before deciding anything?",
        a: "Yes — contact us and we'll pull together images and details for models that fit what you're after.",
      },
    ],
    nearby: ['la-grange', 'flatonia', 'columbus', 'hallettsville'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Schulenburg, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Schulenburg, TX',
    popularHomes: [
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  flatonia: {
    county: 'Fayette',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Flatonia, TX and Fayette County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
    intro:
      "The process for a Flatonia-area buyer breaks down into three parts: pick a floor plan, work out financing, and get it set up on your land. Texas Homes Direct manages the second and third parts so the first is the only real decision.",
    buyingHeading: 'Buying a Mobile Home in Fayette County',
    buying: [
      "Permitting rules for a manufactured home shift from one Texas county to another, and Fayette County has its own version. A Flatonia-area buyer doesn't have to learn it — we file what's required.",
      "Household size tends to settle the single-wide-versus-double-wide question more than anything else: more bedrooms needed usually means a double wide makes sense, while a smaller household can do well with a single wide's lower cost.",
    ],
    pricingExplainer: [
      "Simple doesn't mean vague — a Flatonia-area quote spells out everything itemized above in one clear number, not a rough estimate that changes later.",
      "A phone call alone can't account for what a specific Fayette County lot needs, so we treat the initial utility figure as a placeholder until our contractor has actually inspected the site.",
    ],
    localProof:
      "Homes we've delivered near Flatonia have moved through the same three-part process regardless of floor plan or lot size.",
    faq: [
      {
        q: "What are the actual steps in buying from Texas Homes Direct?",
        a: "Pick a floor plan, work through financing, and let us handle delivery and setup — three parts, and we manage two of them.",
      },
      {
        q: "Where do Fayette County's permitting rules come into play?",
        a: "Before your home is set — we handle the filing so a Flatonia-area buyer doesn't have to navigate the county office directly.",
      },
      {
        q: "What if I don't have land lined up yet?",
        a: "That's common — some buyers reach out before their land situation is settled, and we work with wherever things stand.",
      },
      {
        q: "Is there a way to review specific models before committing?",
        a: "Sure — get in touch and we'll send photos and floor plan specs for anything that catches your eye.",
      },
    ],
    nearby: ['schulenburg', 'la-grange', 'gonzales', 'hallettsville'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Flatonia, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Flatonia, TX',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-terra-2bed-1bath-park-model',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  cuero: {
    county: 'DeWitt',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Cuero, TX and DeWitt County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Renting and owning run on different math, and a lot of DeWitt County families haven't actually run the comparison for a manufactured home near Cuero. Texas Homes Direct will walk through what ownership actually looks like for your budget.",
    buyingHeading: 'Buying a Mobile Home in DeWitt County',
    buying: [
      "A monthly payment on a manufactured home works differently than rent — it goes toward something you keep, on land that's yours.",
      "Some DeWitt County buyers already have a well, septic, and electric in place on their land; others are starting from bare ground. We scope the actual site work needed.",
    ],
    pricingExplainer: [
      "Whatever the comparison to renting looks like for your situation, the home price itself is fixed — a Cuero-area quote already includes everything itemized above.",
      "DeWitt County land varies enough in soil and access that we won't guess at utility costs over the phone. A solid estimate comes first, then our contractor bids the actual property.",
    ],
    localProof:
      "We've run the ownership-versus-renting comparison with DeWitt County families more than once, using their actual numbers rather than a generic example.",
    faq: [
      {
        q: "Is buying really more cost-effective than renting long-term?",
        a: "It depends on your specific numbers, but a mortgage-style payment builds toward ownership where rent doesn't. Run the free mortgage analysis tool for a comparison based on your budget.",
      },
      {
        q: "Do you deliver throughout DeWitt County?",
        a: "Yes. Share your address and we'll confirm what delivery and setup involve for your property.",
      },
      {
        q: "What happens once I've picked a home?",
        a: "From there, we take over coordinating the build, getting it to your site, and finishing the setup.",
      },
    ],
    nearby: ['yorktown', 'gonzales', 'victoria', 'yoakum'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'Manufactured home exterior near Cuero, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Cuero, TX',
    popularHomes: [
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-katy-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

}
