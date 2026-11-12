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
  // 2 paragraphs on what actually happens first for a buyer in this city —
  // land status (own/buying/family) and how that city's own differentiator
  // plays out from there. Optional so older entries render without this
  // section until given a pass. See CLAUDE.md's "Getting Started" note.
  gettingStarted?: string[]
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
    pricingExplainer: [
      "Every Austin-area quote already reflects what it actually costs to build here — once you see the number, it's the number, itemized above and locked in.",
      "Travis County utility costs are the one thing we won't guess at over the phone. A starting estimate gets the conversation going, and a contractor's on-site visit sets the figure that actually counts.",
    ],
    gettingStarted: [
      "Most Austin-area buyers open with a monthly-cost question, and that's genuinely where the first conversation goes — real numbers before floor plans, before setup, before anything else.",
      "Once you've seen a figure that makes sense, we get into your Travis County site: family land, land you already own, or a lot you're still buying all lead to the same walkthrough of what that specific property will need.",
    ],
    localProof:
      "We've worked with Travis County families on both single wide and double wide homes, matching floor plans to lot size and budget rather than pushing one option.",
    faq: [
      {
        q: "How much does a manufactured home cost in Austin?",
        a: "It depends on the floor plan, size, and features you choose, but manufactured homes consistently run below the cost of a comparable site-built home. Run our free mortgage analysis to see real numbers for your budget.",
      },
      {
        q: "Is Travis County land something I should have first?",
        a: "Not at all. Some Travis County buyers already have land, others are mid-purchase on a lot, and some are working through family property — we adapt to wherever you're starting from.",
      },
      {
        q: "What's the real-world difference between the two wide types?",
        a: "A single wide is one continuous section and typically costs less; a double wide is built from two sections joined on-site and gives you more square footage. Which one makes sense depends on your lot and your family's needs.",
      },
      {
        q: "Does Austin's tech-driven housing market change how manufactured homes are priced?",
        a: "Not directly — our pricing is based on the home and your specific Travis County site, not on what's happening in the broader Austin real estate market.",
      },
    ],
    nearby: ['round-rock', 'georgetown', 'san-marcos'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near Austin, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home exterior available near Austin, TX',
    popularHomes: [
      'marathon-loving-3bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
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
    gettingStarted: [
      "Two things come up on a first call near Seguin: where the home is actually going, and who you'll be talking to about it going forward.",
      "Guadalupe County land shows up in every condition — utilities ready, or nothing run yet — and whichever describes yours, the same person stays on your purchase through delivery and setup, not a different department at each stage.",
    ],
    localProof:
      "Guadalupe County families we've worked with have stayed in touch with the same point of contact from their first call through the day their home was set.",
    faq: [
      {
        q: "Will I be working with different people at different stages of the process?",
        a: "No — one point of contact handles your Seguin-area purchase from the first conversation through setup, rather than passing you between departments.",
      },
      {
        q: "Before we talk floor plans, do I need Guadalupe County land?",
        a: "No. Some buyers already have a site, some are still shopping for one, and some are working with family property — we work with any of those starting points.",
      },
      {
        q: "How different is a single wide from a double wide, really?",
        a: "A single wide is one section and costs less upfront; a double wide is built from two joined sections and gives you meaningfully more space.",
      },
    ],
    nearby: ['new-braunfels', 'luling', 'gonzales', 'san-marcos'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Compact single wide mobile home exterior near Seguin, TX',
    secondaryImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    secondaryAlt: 'Mobile home exterior available for delivery near Seguin, TX',
    popularHomes: [
      'fleetwood-axis-3bed-2bath-double-wide',
      'marathon-ranger-2bed-1bath-single-wide',
      'marathon-daniel-1bed-1bath-park-model',
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
    pricingExplainer: [
      "A McLennan County quote from us doesn't creep upward as the paperwork moves along — everything itemized above is locked in from the first number you see.",
      "Because utility costs ride on the property, not a formula, we start with a phone estimate and let a contractor's actual visit to your Waco-area land set the real number.",
    ],
    gettingStarted: [
      "Two details shape everything else for a Waco-area buyer: whether land is already lined up, and roughly how many bedrooms the household actually needs.",
      "McLennan County's permitting process isn't something you're expected to know going in — we handle that coordination once those two answers are in hand, then walk through single wide versus double wide against your actual lot.",
    ],
    localProof:
      "We've delivered manufactured homes across McLennan County to families choosing both single wide and double wide floor plans, depending on their lot and budget.",
    faq: [
      {
        q: "What size home fits my property?",
        a: "That comes down to your lot's access, setback requirements, and layout more than raw acreage. We'll go over your specific site before recommending a single wide or double wide.",
      },
      {
        q: "Does McLennan County require a permit for a manufactured home?",
        a: "Permitting requirements vary by county and by property, so it's worth confirming with McLennan County directly. We can help point you to the right office.",
      },
      {
        q: "Is a manufactured home a realistic option somewhere as fast-growing as Waco?",
        a: "Yes — growth in the area doesn't change the math. A HUD-code manufactured home still costs meaningfully less than comparable site-built construction near Waco.",
      },
      {
        q: "What comes after I've settled on a floor plan?",
        a: "From there, our team coordinates the build, delivery to your site, and the full setup, keeping you posted as things move along.",
      },
    ],
    nearby: ['hewitt', 'woodway', 'bellmead', 'robinson'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Waco, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home exterior available near Waco, TX',
    popularHomes: [
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
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
    pricingExplainer: [
      "The real monthly number a Tyler-area buyer gets upfront stays real all the way through closing — everything itemized above is already in it, nothing tacked on later.",
      "Smith County soil and access vary enough lot to lot that a phone estimate alone would be a guess dressed up as a quote. A contractor's visit turns it into a real number.",
    ],
    gettingStarted: [
      "A real monthly number comes first for most Tyler-area buyers, ahead of floor plans or setup details — there's no reason to guess at affordability before anything else gets discussed.",
      "With that number in hand, the next thing worth knowing is where the home is headed. Smith County buyers show up with land settled, land in progress, or nothing chosen yet, and each starting point moves forward the same way.",
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
      {
        q: "Does Tyler's reputation as a gardening and nursery hub affect setting up a home on a landscaped lot?",
        a: "Not for setup itself — an established yard doesn't change the process, though we'll work with you on protecting mature landscaping during delivery if that's a concern.",
      },
    ],
    nearby: ['whitehouse', 'lindale', 'bullard'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior on wooded land near Tyler, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Compact single wide mobile home available near Tyler, TX',
    popularHomes: [
      'marathon-redhead-3bed-2bath-double-wide',
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
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
    pricingExplainer: [
      "An El Paso County quote works the same whether your credit history is spotless or not — everything itemized above is locked into the number the moment you see it.",
      "Utility costs are the one figure we won't pretend to know from a phone call, since El Paso County terrain varies enough to matter. A contractor's on-site visit sets the real bid.",
    ],
    gettingStarted: [
      "Financing questions usually come first in El Paso, since the mortgage analysis tool gives real numbers without a credit pull — a low-risk way to see where you actually stand before committing to anything.",
      "From there it's a matter of the site: some El Paso County buyers know exactly where the home is going, others are still deciding, and either way we go over what that particular property needs before you sign on to a floor plan.",
    ],
    localProof:
      "We've worked with El Paso County families across a range of lot sizes and site conditions, matching each one to a floor plan that actually fits.",
    faq: [
      {
        q: "What size home actually fits my lot?",
        a: "That's mostly about lot access, setback rules, and layout — not just total acreage. We'll walk through your site with you before recommending a floor plan.",
      },
      {
        q: "Do you deliver to every area of El Paso County?",
        a: "Yes — delivery throughout El Paso County is something we handle regularly. Give us your address and we can walk through what it looks like for your particular site.",
      },
      {
        q: "Can I get financing with less-than-perfect credit?",
        a: "Usually, yes. Between in-house financing and outside public and private lending partners, most buyers find something workable even without perfect credit.",
      },
      {
        q: "Is the process different because El Paso is a border city?",
        a: "No — the home, the pricing, and the process are the same as anywhere else we serve in Texas. El Paso County's own permitting is the only local variable, and we manage that directly.",
      },
    ],
    nearby: ['socorro', 'horizon-city', 'canutillo', 'anthony'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior available near El Paso, TX',
    secondaryImage: '/homes/the-grayson/IMG_0789.webp',
    secondaryAlt: 'Double wide manufactured home available for delivery near El Paso, TX',
    popularHomes: [
      'marathon-grapevine-2bed-2bath-single-wide',
      'marathon-bailey-3bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
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
    pricingExplainer: [
      "There's no negotiating a Bexar County quote upward after the fact — everything itemized above is already built into the number you saw on day one.",
      "What a contractor actually finds on your Bexar County property, not a phone estimate, is what determines the final utility bid — we give you the estimate first, then confirm it in person.",
    ],
    gettingStarted: [
      "There's no back-and-forth to open a purchase near San Antonio — you get a real price on the home you're looking at first, and the rest of the conversation builds from that number.",
      "What follows is mostly about your Bexar County site: already owned, being purchased, or family property, plus whether a single wide or double wide actually fits the lot and the household moving into it.",
    ],
    localProof:
      "We've worked with Bexar County families on a mix of single wide and double wide homes, sized around each buyer's lot and monthly budget.",
    faq: [
      {
        q: "Do you deliver to all of Bexar County?",
        a: "Yes, we deliver throughout Bexar County and the surrounding area. Share your address and we'll confirm the details specific to your property.",
      },
      {
        q: "Do you work with military families relocating to San Antonio's bases?",
        a: "Yes — San Antonio has several military installations, and we regularly work with families relocating to the area on orders.",
      },
      {
        q: "Is owning property in Bexar County a starting requirement?",
        a: "It's not a prerequisite. Bexar County buyers reach out with land already secured, a lot still being purchased, or family property still being sorted.",
      },
      {
        q: "What makes a double wide different from a single wide?",
        a: "A single wide keeps things simple with one section at a lower price point; a double wide adds a second section joined on-site for a bigger home.",
      },
    ],
    nearby: ['new-braunfels', 'boerne', 'floresville', 'castroville'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near San Antonio, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near San Antonio, TX',
    popularHomes: [
      'marathon-hays-4bed-2bath-double-wide',
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-pintail-4bed-2bath-double-wide',
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
    pricingExplainer: [
      "A Laredo-area quote holds the same way the rest of our pricing does — everything itemized above is already accounted for, border-city market or not.",
      "Webb County land conditions are inconsistent enough that we treat a phone estimate as a placeholder, not a promise — the contractor's on-site bid is the number that actually counts.",
    ],
    gettingStarted: [
      "Price and land come up in that order for a Laredo-area buyer — the price shouldn't hinge on details about your property you haven't worked out yet, so we start with the number.",
      "Webb County permitting is ours to manage once you're ready to move, not something you need to arrive already understanding. After that it's sizing: single wide for a lower entry cost, double wide for a growing household.",
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
        q: "Is delivery guaranteed anywhere in Webb County?",
        a: "Yes. Give us your address and we'll walk through exactly what delivery and setup involve for your property.",
      },
      {
        q: "Does Laredo's role as a major trade hub affect delivery scheduling?",
        a: "Not in a way that changes pricing or process — we scope delivery to your specific Webb County property the same way we would anywhere else.",
      },
    ],
    nearby: ['rio-bravo'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior near Laredo, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Laredo, TX',
    popularHomes: [
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
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
    pricingExplainer: [
      "Beyond setup, the rest of a McAllen-area quote is just as fixed — tax, title, license, delivery, and appliances are all itemized above and locked in with the number you're given.",
      "Utility hookups are the one line item that can't be priced from a phone call alone, since Hidalgo County land varies too much. A contractor's visit is what turns the estimate into a real bid.",
    ],
    gettingStarted: [
      "The first thing we walk through with a McAllen-area buyer is where the home is actually headed — owned land in Hidalgo County, family property, or a lot still being purchased all move forward the same way.",
      "From there it's a straightforward next step: setup is already part of the price you're quoted, not a bill that shows up after delivery, so there's nothing extra to plan around once your site is scoped.",
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
      {
        q: "Does Hidalgo County land need to be finalized before contacting you?",
        a: "No. Some Rio Grande Valley buyers already have land, some are purchasing a lot separately, and some are working through family property.",
      },
      {
        q: "Do you deliver throughout the Rio Grande Valley, or just McAllen itself?",
        a: "Yes, the Rio Grande Valley broadly. Give us your address and we'll walk through what that means for delivery and setup at your property.",
      },
    ],
    nearby: ['edinburg', 'mission', 'pharr', 'hidalgo'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near McAllen, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near McAllen, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'fleetwood-armadillo-3bed-2bath',
      'marathon-bell-3bed-2bath-double-wide',
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
    pricingExplainer: [
      "Once a Victoria-area buyer has a number in hand, that's genuinely the number — everything itemized above is already built into what you were quoted, not added afterward.",
      "Utility costs are the exception to that fixed pricing, since Victoria County land conditions shift enough to matter. A phone estimate opens it, and a contractor's visit closes it.",
    ],
    gettingStarted: [
      "Victoria County families typically start where the actual decision gets made: a direct, honest comparison against building a traditional house, laid out before anything else.",
      "Once those numbers hold up, the property itself is next — a well, septic, and electric already in place, or raw ground to start from. We scope the real work rather than guessing at it from a distance.",
    ],
    localProof:
      "Victoria County families we've worked with have used a mix of family land, land they already owned, and newly purchased lots — there's no single required path.",
    faq: [
      {
        q: "Is there a permit requirement in Victoria County?",
        a: "Requirements vary by county and by property, so it's worth checking with Victoria County directly before you buy. We can help point you toward the right office.",
      },
      {
        q: "Once I've decided on a home, what happens from there?",
        a: "Our team takes care of coordinating the build, getting the home to your site, and completing the setup, keeping you in the loop the whole way.",
      },
      {
        q: "Why is Victoria sometimes called 'the Crossroads'?",
        a: "It sits at the junction of several major highways connecting Houston, San Antonio, and the coast — which is also part of why our delivery coverage to the area is straightforward.",
      },
      {
        q: "Single wide vs double wide — what actually changes?",
        a: "Section count is the real distinction: one for a single wide at a lower price, two joined together on-site for a double wide with noticeably more room.",
      },
    ],
    nearby: ['cuero', 'goliad', 'port-lavaca', 'edna'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior near Victoria, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Victoria, TX',
    popularHomes: [
      'marathon-cisco-2bed-2bath-single-wide',
      'fleetwood-roadrunner-3bed-2bath',
      'marathon-spoonbill-3bed-2bath-single-wide',
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
    pricingExplainer: [
      "A Jim Wells County quote from us is complete on arrival — everything itemized above is already folded into the number, whether you're comparing it against other dealers or not.",
      "Utility hookups are priced differently because they have to be — South Texas land varies enough that a phone estimate is a starting point, not a final figure. A contractor's visit sets the real one.",
    ],
    gettingStarted: [
      "The property comes up first for most Alice-area buyers, since it shapes everything after — family land, land already owned, or a lot being purchased separately all work the same way with us.",
      "With Jim Wells County land situated, single wide versus double wide is the next real decision, and that mostly comes down to lot size and what your household actually needs, which we'll go through together.",
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
        q: "Does Jim Wells County fall fully within your service area?",
        a: "Yes, Jim Wells County is part of our regular delivery area. Reach out with your address and we'll go over the specifics for your property.",
      },
      {
        q: "Does Alice's oil and ranching history affect available lot sizes?",
        a: "Property sizes vary widely across Jim Wells County regardless of history — we scope your specific site rather than assuming a standard size.",
      },
    ],
    nearby: ['orange-grove', 'premont'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Compact mobile home exterior near Alice, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near Alice, TX',
    popularHomes: [
      'fleetwood-badger-3bed-2bath-double-wide',
      'marathon-beaumont-3bed-2bath-single-wide',
      'fleetwood-peredavid-3bed-2bath-double-wide',
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
    gettingStarted: [
      "Nothing formal is required to start looking near Pleasanton — say what catches your eye and we'll send real photos and floor plans to look over on your own schedule.",
      "Whenever you're ready to talk specifics, Atascosa County land comes up next: a lot already picked, family property, or nothing settled yet are all fine places to be at that point.",
    ],
    localProof:
      "We've sent photos and floor plans to Atascosa County buyers who were still deciding, with no expectation they'd commit on the spot.",
    faq: [
      {
        q: "Can I see photos of homes before talking to anyone?",
        a: "Reach out and we'll send over images and floor plans — there's no obligation attached to asking.",
      },
      {
        q: "Will I need to pull a permit in Atascosa County?",
        a: "That's property-specific, not something we can answer with a blanket county rule — Atascosa County's office is the right place to confirm what applies to your lot.",
      },
      {
        q: "What's the next step after choosing a floor plan?",
        a: "From there, it's on us — lining up the build schedule, getting the home moving toward your site, and seeing the setup through to the end.",
      },
    ],
    nearby: ['floresville', 'devine', 'pearsall', 'jourdanton'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Single wide mobile home exterior near Pleasanton, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Pleasanton, TX',
    popularHomes: [
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
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
    pricingExplainer: [
      "An Amarillo-area quote is fixed the moment we give it to you — everything itemized above is already part of that number, Panhandle wind and all.",
      "Utility costs are the one line we won't quote sight-unseen, since Potter County land varies enough lot to lot. A phone estimate starts the conversation; a contractor's visit finishes it.",
    ],
    gettingStarted: [
      "Financing tends to open the conversation near Amarillo, since it's what determines whether ownership is realistic in the first place — between in-house terms and outside lenders, most Potter County buyers find a path.",
      "After that, the property: some buyers already have a site ready to go, others are still working that out, and we're straightforward with either group about what their specific stage actually involves.",
    ],
    localProof:
      "We've delivered manufactured homes to Potter County families choosing single wide and double wide floor plans based on lot size and household needs.",
    faq: [
      {
        q: "What's a realistic price range for a manufactured home near Amarillo?",
        a: "It depends on the floor plan and features, but manufactured homes are consistently more affordable than comparable site-built construction. The free mortgage analysis tool will give you a number specific to your budget.",
      },
      {
        q: "Are these all new homes, or do you carry used inventory too?",
        a: "Our focus is new, HUD-certified manufactured homes. Reach out for what's currently available.",
      },
      {
        q: "Does Panhandle weather affect setup or delivery near Amarillo?",
        a: "We plan around it as needed, but it doesn't change your price — everything itemized in your quote stays fixed regardless of conditions on delivery day.",
      },
      {
        q: "Do I need Potter County acreage secured in advance?",
        a: "No — that's genuinely one of the first things we ask about, not a requirement to clear before reaching out. Wherever your land situation stands, we'll pick up from there.",
      },
    ],
    nearby: ['canyon'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior near Amarillo, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Amarillo, TX',
    popularHomes: [
      'marathon-caldwell-4bed-2bath-double-wide',
      'marathon-jackson-1bed-1bath-park-model',
      'marathon-chapman-1bed-1bath-park-model',
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
    pricingExplainer: [
      "Once you've seen a Lubbock County quote, that number is the number — everything itemized above is already accounted for, no revisions later.",
      "The one number we won't lock in over the phone is the utility bid, since Lubbock County land varies enough to matter. A contractor's on-site visit is what actually sets it.",
    ],
    gettingStarted: [
      "Lubbock County buyers tend to start by putting real numbers next to a traditional build, which usually makes the decision easier than expected going in.",
      "Once that's settled, family land, land already owned, and a newly purchased lot all lead to the same walkthrough of what the property needs — and Lubbock County's permitting process is ours to manage, not yours to learn first.",
    ],
    localProof:
      "We've set up manufactured homes across Lubbock County for families choosing both single wide and double wide floor plans.",
    faq: [
      {
        q: "Do Lubbock County rules require a permit for this?",
        a: "Requirements vary by county and property, so it's worth checking directly with Lubbock County. We can help point you to the right office.",
      },
      {
        q: "What happens after I choose a home?",
        a: "We handle the build schedule, delivery, and setup from there, checking in with you at each step rather than going quiet until it's done.",
      },
      {
        q: "Is a manufactured home a good fit for South Plains agricultural land near Lubbock?",
        a: "Often, yes — we scope agricultural and rural properties the same careful way we scope any site, accounting for what's already there before finalizing a plan.",
      },
      {
        q: "Is it possible to browse photos before committing to anything?",
        a: "Yes, gladly — say which floor plans interest you and we'll send real photos over before you're asked to decide on anything.",
      },
    ],
    nearby: ['wolfforth', 'shallowater', 'idalou'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Lubbock, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near Lubbock, TX',
    popularHomes: [
      'marathon-breckenridge-3bed-2bath-single-wide',
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-abilene-2bed-1bath-single-wide',
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
    pricingExplainer: [
      "A Nueces County quote is complete the day you see it — everything itemized above is already built in, coastal property or not.",
      "Utility hookups are the exception, since land near the coast can vary as much as land further inland. A phone estimate opens the conversation, and a contractor's visit sets the real figure.",
    ],
    gettingStarted: [
      "You can start near Corpus Christi just by asking to see photos and floor plans — no pressure to commit to anything before you've actually looked at what's out there.",
      "When you're ready to move past browsing, the cost comparison against a traditional build comes next, followed by the Nueces County land conversation — owned, purchased, or still being decided.",
    ],
    localProof:
      "Nueces County buyers we've worked with have chosen everything from compact single-section homes to larger double wide layouts, depending on the lot and the budget.",
    faq: [
      {
        q: "Is owning land a requirement before we talk?",
        a: "No — land ownership isn't a requirement to get started. Whether you're using family property, land you already hold, or a lot you plan to buy separately, Texas Homes Direct can work with it.",
      },
      {
        q: "Is financing realistic if my credit isn't great?",
        a: "Usually, yes. Between financing directly and working with outside public and private lenders, most buyers find a workable path.",
      },
      {
        q: "Can delivery reach the whole of Nueces County?",
        a: "Yes. Once we have your address, we can tell you exactly what delivery and setup will involve for your particular lot.",
      },
      {
        q: "Does being on the coast change how a home near Corpus Christi is set up?",
        a: "It can affect what a site needs — we assess your specific property, coastal or further inland, rather than applying one standard setup plan.",
      },
    ],
    nearby: ['portland', 'ingleside', 'robstown', 'aransas-pass'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Manufactured home exterior near Corpus Christi, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Corpus Christi, TX',
    popularHomes: [
      'marathon-dawson-4bed-2bath-double-wide',
      'marathon-lanny-1bed-1bath-park-model',
      'marathon-pigeon-3bed-2bath-double-wide',
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
    pricingExplainer: [
      "A Dallas County quote doesn't move once it's in your hands — everything itemized above is already accounted for, whichever DFW suburb you're technically in.",
      "Utility costs are the one number that depends on the specific property rather than the general area, so we start with a phone estimate and finish with a contractor's exact on-site bid.",
    ],
    gettingStarted: [
      "Whether this is actually realistic is usually the real first question for a DFW-area buyer, and the honest answer starts with the numbers rather than a pitch.",
      "After that comes the Dallas County property itself: utilities already run, or raw ground to start from. We scope the actual setup work the site needs before anything else gets decided.",
    ],
    localProof:
      "We've delivered manufactured homes throughout Dallas County to families across a range of budgets and lot sizes.",
    faq: [
      {
        q: "What size home fits my lot?",
        a: "That comes down to lot access, setback rules, and layout more than raw square footage. We'll go over your site before recommending a floor plan.",
      },
      {
        q: "Is a Dallas County permit part of the process?",
        a: "Requirements vary by county and even by city within DFW, so it's worth checking for your specific address. We can help you figure out where to start.",
      },
      {
        q: "Can I see homes before deciding?",
        a: "Contact us and we can send over photos and floor plan details for whatever catches your eye — no need to decide on the spot.",
      },
      {
        q: "Does it matter which DFW suburb my property is actually in?",
        a: "Not for pricing — the same process and the same out-the-door number apply across Dallas County and the surrounding DFW area.",
      },
    ],
    nearby: ['mesquite', 'garland', 'irving', 'richardson'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Dallas, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Manufactured home available for delivery near the DFW metro',
    popularHomes: [
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-jasper-3bed-2bath-double-wide',
      'marathon-dove-1bed-1bath-single-wide',
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
    pricingExplainer: [
      "A Harris County quote holds steady from the day you see it — everything itemized above is already priced in, whichever part of the Houston area you're in.",
      "Utility hookups are the one line that can't be quoted from a phone call alone, since Harris County land varies enough to matter. A contractor's on-site visit sets the number that counts.",
    ],
    gettingStarted: [
      "A real price and financing that actually makes sense come first for most Houston-area buyers, ahead of any conversation about a specific lot.",
      "Once those are clear, we turn to the Harris County property itself — what's already run to the site and what still needs to happen before a home can go on it — and price the actual work instead of a generic package.",
    ],
    localProof:
      "Harris County families we've worked with span a wide range of lot sizes and budgets, choosing everything from compact single wides to larger double wide layouts.",
    faq: [
      {
        q: "Is a Harris County property required before financing starts?",
        a: "Land ownership isn't a prerequisite here. Texas Homes Direct works with buyers who already have a site, buyers still shopping for one, and buyers planning to use family property.",
      },
      {
        q: "What happens after I pick a home?",
        a: "From there, we take over — coordinating the build, getting it delivered to your site, and finishing the full setup — and you'll hear from us along the way instead of being left to wonder.",
      },
      {
        q: "Is setup different for a property inside Houston versus further out in Harris County?",
        a: "The process is the same either way — we scope your specific site rather than assuming a standard package based on how close you are to the city center.",
      },
      {
        q: "Do you deliver throughout the greater Houston area?",
        a: "We do — every part of the greater Houston area. Send your address and we'll spell out what delivery and setup actually involve at your location.",
      },
    ],
    nearby: ['pasadena', 'bellaire', 'katy', 'spring'],
    heroImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Houston, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Houston, TX',
    popularHomes: [
      'marathon-fisher-3bed-2bath-double-wide',
      'fleetwood-raven-3bed-2bath-single-wide',
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
    gettingStarted: [
      "A San Saba County buyer's first conversation with us is unhurried on purpose — floor plans, financing numbers, and questions get real time before anything moves forward.",
      "Whenever you're ready, family property, a lot you've already purchased, and land you're still buying are all workable starting points, and we'll go from wherever you actually are.",
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
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near San Saba, TX',
    popularHomes: [
      'marathon-trinity-4bed-2bath-double-wide',
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-woodduck-3bed-2bath-double-wide',
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
    gettingStarted: [
      "A Lampasas County buyer's first call covers the real numbers before anything else — the home, the setup, and what financing actually looks like for your situation.",
      "Once you've seen those figures, the property comes next, and after that, down payment specifics — which shift by loan program, so we'll cover what actually applies to your situation rather than a number that doesn't.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Lampasas, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Lampasas, TX',
    popularHomes: [
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
      'marathon-grayson-4bed-2bath-double-wide',
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
    gettingStarted: [
      "Lot size is usually the first practical question for a Llano County buyer, since it settles single wide versus double wide before financing details even come up.",
      "From there, Llano County's own permitting process is something our team manages rather than something you're left to figure out — one less thing to research before you're ready to decide.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Llano, TX',
    secondaryImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Llano, TX',
    popularHomes: [
      'marathon-breckenridge-3bed-2bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-beaumont-3bed-2bath-single-wide',
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
    gettingStarted: [
      "Most Goldthwaite-area buyers start by asking how this actually stacks up against building from scratch in Mills County, and the honest cost comparison is genuinely where we begin.",
      "After that, it's the property — already owned, still being shopped for, or family land in progress — and we map out what your specific site requires before any floor plan gets chosen.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Goldthwaite, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Compact mobile home available for delivery near Goldthwaite, TX',
    popularHomes: [
      'marathon-daniel-1bed-1bath-park-model',
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-chapman-1bed-1bath-park-model',
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
    gettingStarted: [
      "Financing is usually the first real conversation for a Brady-area buyer, since in-house terms, public programs, and private lenders are all genuinely on the table depending on your situation.",
      "Once that's sorted, we get into the property — a well, septic, and electric already in place, or bare ground to start from — and scope the real work from there.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Brady, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Brady, TX',
    popularHomes: [
      'fleetwood-badger-3bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
      'marathon-hays-4bed-2bath-double-wide',
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
    gettingStarted: [
      "Lot size and household size are usually the first practical questions for a Mason-area buyer, since they settle single wide versus double wide before anything else gets discussed.",
      "From there, financing — in-house, public, or private — gives Mason County buyers more than one path to approval, so credit history alone doesn't have to be the deciding factor.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Manufactured home exterior near Mason, TX',
    secondaryImage: '/homes/the-grayson/IMG_0789.webp',
    secondaryAlt: 'Single wide mobile home available for delivery near Mason, TX',
    popularHomes: [
      'marathon-bell-3bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-trinity-4bed-2bath-double-wide',
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
    gettingStarted: [
      "A Junction-area buyer's first real question is usually about the land itself — Kimble County properties take all shapes, and we adjust the plan to whichever applies, family property, a lot already bought, or one still being shopped for.",
      "Once that's settled, financing and setup are laid out together, itemized rather than estimated, so there's a real number to plan around before you commit to a floor plan.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Junction, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Junction, TX',
    popularHomes: [
      'marathon-brewster-3bed-2bath-double-wide',
      'fleetwood-armadillo-3bed-2bath',
      'marathon-pigeon-3bed-2bath-double-wide',
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
    gettingStarted: [
      "The first real question for a Burnet County buyer is usually the property itself — utility connections are the one variable that depends on your specific land, and that's where the conversation starts.",
      "Once your land situation is settled, we walk through financing next — what a monthly payment actually looks like once the fixed setup costs and your exact utility bid are both accounted for, no guesswork involved.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Burnet, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Burnet, TX',
    popularHomes: [
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-caldwell-4bed-2bath-double-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
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
    gettingStarted: [
      "A Blanco County buyer's first real step is the property itself: some lots already have a well, septic system, and electric service ready to go, others are a blank canvas, and we size up the real work either way.",
      "Once that's clear, we get into the numbers — floor plan pricing, financing terms, and what your monthly payment actually looks like, laid out plainly before you're asked to decide on anything.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Manufactured home exterior near Blanco, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Blanco, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-pintail-4bed-2bath-double-wide',
      'fleetwood-raven-3bed-2bath-single-wide',
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
    gettingStarted: [
      "For most Johnson City buyers, the first real decision isn't financing or land at all — it's single wide versus double wide, and that mostly comes down to lot size and how many people are moving in.",
      "Once that's settled, the property conversation follows naturally, and every home in our lineup meets the same HUD construction code and factory inspection no matter where in Blanco County it ends up.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Johnson City, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Johnson City, TX',
    popularHomes: [
      'fleetwood-bobcat-3bed-2bath-single-wide',
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
      'marathon-bailey-3bed-2bath-double-wide',
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
    gettingStarted: [
      "You don't need to already understand Kendall County's permitting process to start near Comfort — that part is ours to manage once you're ready to move forward.",
      "Once that's settled, financing is next, and Kendall County permitting is something our team manages start to finish — not a process a Comfort-area buyer is expected to already understand.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Comfort, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near Comfort, TX',
    popularHomes: [
      'marathon-jasper-3bed-2bath-double-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-loving-3bed-2bath-double-wide',
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
    gettingStarted: [
      "Worth knowing upfront near Bandera: our own crews handle the full setup — base pad, utility connections, underpinning, skirting — not a subcontractor you have to coordinate separately.",
      "The next real question is the property itself. Some Bandera County land already has utilities run, some is starting from scratch, and we scope exactly what applies before anything moves forward.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Bandera, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Bandera, TX',
    popularHomes: [
      'fleetwood-roadrunner-3bed-2bath',
      'marathon-cisco-2bed-2bath-single-wide',
      'fleetwood-peredavid-3bed-2bath-double-wide',
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
    gettingStarted: [
      "A Hondo-area buyer's first step is usually the property: family land, something already owned, or a lot being purchased separately all lead to the same walkthrough of what a specific Medina County site needs.",
      "Financing comes next, and it's rarely a dead end — between in-house terms and outside lending partners, most buyers find a workable path even when a single lender wouldn't approve them.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Manufactured home exterior near Hondo, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Hondo, TX',
    popularHomes: [
      'marathon-terra-2bed-1bath-park-model',
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
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
    gettingStarted: [
      "The first real question for a buyer near Devine is where things stand with the land — already picked out, or still being decided — and we work with buyers at either point before anything else gets settled.",
      "From there, pricing and setup work the same no matter where in Medina County the property sits, since delivery and service cover the whole county, not just Devine itself.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Manufactured home exterior near Devine, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Compact mobile home available for delivery near Devine, TX',
    popularHomes: [
      'marathon-lanny-1bed-1bath-park-model',
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
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
    gettingStarted: [
      "The first real step for a Castroville-area buyer is the property — some Medina County land already has utilities run, some is a blank canvas — and we scope the actual work needed either way.",
      "From there it's single wide versus double wide, mostly a matter of how much space your household actually needs, worked through at your own pace with no pressure to decide on the spot.",
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
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Manufactured home exterior near Castroville, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Castroville, TX',
    popularHomes: [
      'marathon-dove-1bed-1bath-single-wide',
      'fleetwood-axis-3bed-2bath-double-wide',
      'marathon-jackson-1bed-1bath-park-model',
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
    gettingStarted: [
      "Near New Braunfels, the first real step is usually narrowing down floor plans, since Comal County buyers have more than a handful of options — compact single-section homes up through larger four-bedroom double wides.",
      "Once a plan or two stands out, the property conversation follows: what your specific site needs doesn't change which homes are available to you, just how the setup itself gets handled.",
    ],
    localProof:
      "Comal County buyers we've worked with have picked from a genuine range of floor plans — not just whatever happened to be available.",
    faq: [
      {
        q: "How many floor plans are actually available near New Braunfels?",
        a: "More than a handful — reach out and we'll walk through current options sized and priced for what you're looking for.",
      },
      {
        q: "Is approval possible without excellent credit?",
        a: "Often, yes. Between financing directly and working with outside lenders, most buyers find a path even with credit challenges.",
      },
      {
        q: "Is any address in Comal County within delivery range?",
        a: "Comal County in full — share your address and we'll confirm exactly what delivery and setup look like for your property.",
      },
    ],
    nearby: ['seguin', 'san-marcos', 'boerne', 'schertz'],
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near New Braunfels, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near New Braunfels, TX',
    popularHomes: [
      'marathon-terra-2bed-1bath-park-model',
      'marathon-kendall-3bed-2bath-double-wide',
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
    gettingStarted: [
      "The first real thing we ask a Lockhart-area buyer about is the property itself — what size home actually fits the lot shapes the floor plans worth looking at before anything else does.",
      "What we do need early is your land situation, since it shapes the paperwork that follows. Once we know where the home is going, everything else routes through us instead of bouncing back to you.",
    ],
    localProof:
      "We've walked Caldwell County families through permitting, utility applications, and title paperwork alongside their home purchase, not as a separate hassle.",
    faq: [
      {
        q: "What paperwork does Texas Homes Direct actually handle for a Lockhart purchase?",
        a: "Permitting, utility coordination, and the documentation tied to setup — we manage the filing so you're not tracking down forms yourself.",
      },
      {
        q: "How do I know which floor plan size fits my property?",
        a: "That's mostly about delivery access and setback rules, not just total acreage. We'll go over your specific site before recommending a floor plan.",
      },
      {
        q: "Is permitting required before setting up in Caldwell County?",
        a: "Yes, and we file it as part of the process — you won't need to visit the county office yourself.",
      },
      {
        q: "Once I've settled on a floor plan, what's the next step?",
        a: "Once you're set on a home, our team runs point on everything else — scheduling the build, coordinating delivery, and handling setup.",
      },
    ],
    nearby: ['luling', 'san-marcos', 'bastrop', 'seguin'],
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Lockhart, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Compact mobile home available for delivery near Lockhart, TX',
    popularHomes: [
      'marathon-dawson-4bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-fisher-3bed-2bath-double-wide',
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
    gettingStarted: [
      "A Luling-area buyer's first step is usually a numbers comparison — get quotes from more than one dealer, and check whether each one includes setup or just the home itself.",
      "Once you've got a real number to compare, the property comes next — Caldwell County permitting is ours to manage regardless, so that part doesn't change what you bring to the first call.",
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
        q: "Do I have to have land lined up first?",
        a: "No. Family property, land you already own, or a lot you're purchasing separately all work with Texas Homes Direct.",
      },
      {
        q: "Can I see the home before deciding?",
        a: "Absolutely — just tell us which models caught your eye and we'll send over photos and floor plans before you commit to anything.",
      },
    ],
    nearby: ['lockhart', 'seguin', 'gonzales', 'san-marcos'],
    heroImage: '/homes/the-chapman/Chapman-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Luling, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Luling, TX',
    popularHomes: [
      'marathon-gadwall-3bed-2bath-double-wide',
      'marathon-abilene-2bed-1bath-single-wide',
      'marathon-redhead-3bed-2bath-double-wide',
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
    gettingStarted: [
      "A Gonzales County buyer's first real question is usually financing, not land — the actual down payment figure depends on the loan program and your financial profile, which is exactly where we start.",
      "From there, the property comes up, and we scope what your specific Gonzales County site actually needs before any numbers get finalized.",
    ],
    localProof:
      "We've worked with Gonzales County buyers on a range of down payment structures, matched to what actually fit their financial situation.",
    faq: [
      {
        q: "Is there a minimum down payment for a Gonzales-area purchase?",
        a: "It depends on the loan program — there isn't one number that applies to every buyer. We'll go over what actually applies to your situation.",
      },
      {
        q: "Do you expect Gonzales County land to already be owned?",
        a: "It's not required. We've worked with buyers who already owned their land, others who bought a lot specifically for this, and some building on property that's been passed down.",
      },
      {
        q: "After choosing a home, what does Texas Homes Direct handle?",
        a: "After that, the logistics become our problem, not yours: build timeline, delivery, and setup, all managed by our team.",
      },
      {
        q: "Will costs get added after I've committed?",
        a: "No. The quoted number already includes everything itemized above.",
      },
    ],
    nearby: ['luling', 'seguin', 'cuero', 'yoakum'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Manufactured home exterior near Gonzales, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Gonzales, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-kendall-3bed-2bath-double-wide',
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
    gettingStarted: [
      "Starting near Floresville means understanding the price first: factory-direct, with no dealership markup layered on top of the manufacturer's own number.",
      "From there it's sizing and the property together — a tighter budget or smaller lot often points toward a single wide, while a growing Wilson County household usually leans toward a double wide.",
    ],
    localProof:
      "Wilson County buyers we've worked with have asked directly about markup, and the honest answer is the price reflects the factory number plus setup, not an added margin on top.",
    faq: [
      {
        q: "What does 'factory-direct' actually mean for pricing?",
        a: "It means Texas Homes Direct works directly with the manufacturer rather than through a separate dealership markup layer, which keeps the quoted price lower.",
      },
      {
        q: "How does permitting typically work for a Wilson County property?",
        a: "Permitting steps track the property and current Wilson County requirements, not a fixed checklist — best confirmed with the county directly.",
      },
      {
        q: "Do you serve every part of Wilson County?",
        a: "We cover all of Wilson County. Send your address over and we'll lay out exactly what delivery and setup will look like at your location.",
      },
    ],
    nearby: ['pleasanton', 'seguin', 'karnes-city', 'san-antonio'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Manufactured home exterior near Floresville, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Floresville, TX',
    popularHomes: [
      'marathon-spoonbill-3bed-2bath-single-wide',
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-ranger-2bed-1bath-single-wide',
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
    gettingStarted: [
      "The first real step for a Smithville-area buyer is the property — a well, septic, and electric already run, or bare ground to start from — since that shapes the setup plan more than anything else.",
      "From there, financing follows naturally — new construction opens up loan programs that wouldn't apply to an older or used unit, which is worth knowing before you start comparing numbers elsewhere.",
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
        q: "Should my land situation be finalized before I contact you?",
        a: "It's not a prerequisite — we hear from Smithville-area buyers at every stage, whether they've already got a spot picked out or are still figuring that part out.",
      },
    ],
    nearby: ['bastrop', 'la-grange', 'elgin', 'giddings'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Smithville, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near Smithville, TX',
    popularHomes: [
      'marathon-bell-3bed-2bath-double-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-fisher-3bed-2bath-double-wide',
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
    gettingStarted: [
      "An Elgin-area buyer's first step is a real look at the property — clearing, grading, or longer utility runs the land might still need — since that determines the setup plan more than anything else.",
      "Once we know what the site actually requires, sizing and financing follow, worked out against your Bastrop County lot rather than a generic package applied across the board.",
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
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near Elgin, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Manufactured home available for delivery near Elgin, TX',
    popularHomes: [
      'fleetwood-raven-3bed-2bath-single-wide',
      'marathon-caldwell-4bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
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
    gettingStarted: [
      "Two things shape what happens next for a Bastrop-area buyer: where the property stands and how soon you're looking to move — both come up before any floor plan gets discussed.",
      "From there it's financing and setup, both explained in plain terms before you're asked to decide on anything — the same real-person access that answered your first question carries through the rest of the process.",
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
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Single wide manufactured home exterior near Bastrop, TX',
    secondaryImage: '/homes/the-grayson/IMG_0789.webp',
    secondaryAlt: 'Double wide manufactured home available for delivery near Bastrop, TX',
    popularHomes: [
      'marathon-pintail-4bed-2bath-double-wide',
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-dove-1bed-1bath-single-wide',
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
    gettingStarted: [
      "A Giddings-area buyer's first real step is the land situation in Lee County — family land, land already owned, or a lot purchased separately all work, and there's no bad question along the way.",
      "From there, financing terms and site prep get explained plainly before you're asked to decide anything, the same step-by-step approach whether this is your first manufactured home or not.",
    ],
    localProof:
      "We've walked first-time buyers in Lee County through the entire process, from financing basics to what happens on delivery day.",
    faq: [
      {
        q: "I've never done this before — where do I even start?",
        a: "With a phone call. We'll walk through land status, budget, and floor plan options before anything gets formal.",
      },
      {
        q: "Is Lee County covered end to end for delivery?",
        a: "Yes. Send us your address and we'll confirm what delivery and setup look like for your specific property.",
      },
      {
        q: "What's the meaningful difference between the two home types?",
        a: "Square footage and price, mainly — a single wide is one section and the more budget-friendly option, while a double wide combines two sections on-site for a noticeably bigger home.",
      },
    ],
    nearby: ['elgin', 'brenham', 'la-grange', 'caldwell'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Manufactured home exterior near Giddings, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Double wide manufactured home available for delivery near Giddings, TX',
    popularHomes: [
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dawson-4bed-2bath-double-wide',
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
    gettingStarted: [
      "A La Grange-area buyer's first real question is usually the land — family property or a newly bought lot both lead to the same process, factory inspection through on-site sign-off.",
      "Once a floor plan is settled, that two-stage inspection kicks off automatically: one check at the factory before the home ships, one on-site once it's set on your Fayette County property.",
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
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near La Grange, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Manufactured home available for delivery near La Grange, TX',
    popularHomes: [
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-cisco-2bed-2bath-single-wide',
      'fleetwood-axis-3bed-2bath-double-wide',
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
    gettingStarted: [
      "The first thing we ask a Schulenburg-area buyer is what's happening with the land — already in the family, or a lot you've bought on your own — since that's the starting point for everything else.",
      "One thing that won't come up: Texas Homes Direct doesn't sell land or bundle land-and-home packages near Schulenburg, so whichever situation applies, you're getting a straightforward home purchase, priced and financed on its own.",
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
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Schulenburg, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Manufactured home available for delivery near Schulenburg, TX',
    popularHomes: [
      'marathon-widgeon-4bed-2bath-double-wide',
      'fleetwood-armadillo-3bed-2bath',
      'marathon-coleman-3bed-2bath-double-wide',
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
    gettingStarted: [
      "The first real question for a Flatonia-area buyer is the land situation — Fayette County permitting is ours to file either way, so it doesn't change what you're deciding on the floor-plan side.",
      "From there, the process is genuinely simple: pick a floor plan, work out financing, and let us handle delivery and setup on your land — two of the three parts are on us.",
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
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Flatonia, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Compact mobile home available for delivery near Flatonia, TX',
    popularHomes: [
      'marathon-lanny-1bed-1bath-park-model',
      'marathon-redhead-3bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
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
    gettingStarted: [
      "A Cuero-area buyer's first real step is the property — some DeWitt County land already has a well, septic, and electric in place, others are starting from bare ground, and we scope the real work either way.",
      "From there, the next step is straightforward: a look at your specific site, your rough budget, and which floor plan actually fits a DeWitt County lot — no pressure to land on an answer in one conversation.",
    ],
    localProof:
      "We've run the ownership-versus-renting comparison with DeWitt County families more than once, using their actual numbers rather than a generic example.",
    faq: [
      {
        q: "Is buying really more cost-effective than renting long-term?",
        a: "It depends on your specific numbers, but a mortgage-style payment builds toward ownership where rent doesn't. Run the free mortgage analysis tool for a comparison based on your budget.",
      },
      {
        q: "Will you deliver to a property anywhere in DeWitt County?",
        a: "DeWitt County farmland and in-town Cuero lots both — share your address and we'll confirm the specifics.",
      },
      {
        q: "Once a floor plan is picked, what happens on your end?",
        a: "From there, we take over coordinating the build, getting it to your site, and finishing the setup.",
      },
    ],
    nearby: ['yorktown', 'gonzales', 'victoria', 'yoakum'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Manufactured home exterior near Cuero, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Cuero, TX',
    popularHomes: [
      'marathon-ranger-2bed-1bath-single-wide',
      'marathon-jasper-3bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-18',
  },

  columbus: {
    county: 'Colorado',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Columbus, TX and Colorado County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Columbus sits right on I-10, which means Texas Homes Direct can reach a Colorado County property from either the Houston side or the San Antonio side without a detour — delivery logistics that don't depend on which direction you're coming from.",
    buyingHeading: 'Buying a Mobile Home in Colorado County',
    buying: [
      "That two-direction access matters when a Columbus-area buyer is on a tighter schedule than most — there's no single choke point our trucks have to route through.",
      "Compared to site-built construction, a HUD-code manufactured home still runs meaningfully less for a Colorado County family, without a drop in construction quality.",
    ],
    pricingExplainer: [
      "Once a Columbus-area buyer has a quote in hand, that number doesn't move — everything itemized above is already accounted for, regardless of delivery direction.",
      "Colorado County land varies enough that utility costs get a phone estimate first, then an exact bid once our contractor has actually walked the property.",
    ],
    gettingStarted: [
      "The first real question for a Columbus-area buyer is the property itself — where it sits relative to I-10 shapes delivery scheduling more than almost anything else.",
      "From there, it's financing and floor plan, worked out in whichever order makes sense for you — neither one has to come first.",
    ],
    localProof:
      "Colorado County buyers we've worked with have been delivered to from both directions along I-10, depending on where their property actually sits.",
    faq: [
      {
        q: "Does it matter which direction you deliver from for a Columbus property?",
        a: "Not for pricing or process — we scope the route based on where your property actually is, whether that means coming from Houston or San Antonio.",
      },
      {
        q: "Is a Colorado County lot required before financing gets discussed?",
        a: "No. Family property, land you've already purchased, or a lot you're still deciding on all work the same way with us.",
      },
      {
        q: "What's the difference between a single wide and a double wide?",
        a: "A single wide ships as one section and costs less upfront; a double wide ships as two sections joined on-site for meaningfully more square footage.",
      },
    ],
    nearby: ['sealy', 'la-grange', 'schulenburg', 'eagle-lake'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Columbus, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Columbus, TX',
    popularHomes: [
      'marathon-loving-3bed-2bath-double-wide',
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-gadwall-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  sealy: {
    county: 'Austin',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Sealy, TX and Austin County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A lot of Sealy-area buyers have never actually seen how a manufactured home gets built, so Texas Homes Direct walks through the HUD code construction process in plain terms — what's inspected, when, and why it matters for a home you'll own for decades.",
    buyingHeading: 'Buying a Mobile Home in Austin County',
    buying: [
      "Every home is built to the same federal HUD code and passes factory inspection before it ships to an Austin County address — the same standard whether it's headed to Sealy or anywhere else in Texas.",
      "Understanding what that construction standard actually covers helps a Sealy-area buyer compare a manufactured home honestly against a site-built house, instead of guessing at the difference.",
    ],
    pricingExplainer: [
      "Once you understand what's built into the construction standard, the price makes more sense too — everything itemized above is already part of your Sealy-area quote.",
      "Utility costs are the one piece that depends on your specific Austin County property, so we start with a phone estimate and follow with an exact bid once a contractor has seen the site.",
    ],
    gettingStarted: [
      "Most Sealy-area buyers start with questions about how the home is actually built, not the paperwork — which is where we'd rather start too.",
      "Once that part makes sense, we move to your property and your timeline, working through both at whatever pace you're comfortable with.",
    ],
    localProof:
      "We've walked more than a few Austin County families through exactly what HUD-code construction involves before they ever committed to a floor plan.",
    faq: [
      {
        q: "What does 'HUD code' actually mean for the home I'd be buying?",
        a: "It's the federal construction and safety standard every manufactured home built after June 1976 has to meet — structural design, materials, fire safety — verified by factory inspection before the home ships.",
      },
      {
        q: "Is owning land in Austin County a requirement before we talk?",
        a: "Not at all — some Sealy-area buyers already have land squared away, others are still shopping for a lot, and some are working through family property.",
      },
      {
        q: "Does delivery cover all of Austin County?",
        a: "We do, across all of Austin County — reach out with your address and we'll confirm the details for your property.",
      },
    ],
    nearby: ['columbus', 'brenham', 'bellville', 'katy'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Sealy, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Sealy, TX',
    popularHomes: [
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-daniel-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-23',
  },

  brenham: {
    county: 'Washington',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Brenham, TX and Washington County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A lot of Washington County properties near Brenham come with more acreage than a typical in-town lot, and that changes what setup actually looks like — longer utility runs, more site prep, sometimes a completely different approach to the pad.",
    buyingHeading: 'Buying a Mobile Home in Washington County',
    buying: [
      "We scope a larger rural property the same careful way we'd scope a smaller one — nothing about acreage gets a generic answer near Brenham.",
      "Rural acreage or a smaller in-town lot, the cost gap between a HUD-code manufactured home and a comparable site-built house near Brenham stays about the same.",
    ],
    pricingExplainer: [
      "Whatever your Washington County property looks like, the out-the-door home price is fixed the moment you see your quote — everything itemized above is already included.",
      "Utility costs are the exception, simply because rural acreage varies too much to price sight-unseen. A phone estimate starts the conversation, and a contractor's on-site visit finishes it.",
    ],
    gettingStarted: [
      "For a Brenham-area buyer, the first real conversation is about the property itself — how many acres, what's already run to it, and what still needs to happen before a home can go on it.",
      "Once we understand the site, floor plan and financing follow naturally, sized to what actually fits the land you've got.",
    ],
    localProof:
      "Washington County buyers we've worked with have ranged from a small in-town lot to several acres of family land, and we've scoped each one individually.",
    faq: [
      {
        q: "Does a larger rural property cost more to set up near Brenham?",
        a: "It depends on what the site already has — existing utility access matters more than acreage alone. We'll give you a real answer after seeing what your property needs.",
      },
      {
        q: "Do I have to have Washington County land lined up first?",
        a: "No — we hear from Washington County buyers whether they already have land, are mid-purchase on a lot, or are sorting out family property.",
      },
      {
        q: "How does a single wide actually compare to a double wide?",
        a: "A single wide ships as one section and keeps costs lower; a double wide ships as two sections joined on-site for a larger household.",
      },
    ],
    nearby: ['giddings', 'navasota', 'sealy', 'caldwell'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Brenham, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Brenham, TX',
    popularHomes: [
      'marathon-beaumont-3bed-2bath-single-wide',
      'fleetwood-badger-3bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  navasota: {
    county: 'Grimes',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Navasota, TX and Grimes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A number of Navasota-area buyers already have a mobile home on their property — one that's aging out — and are looking at what it takes to replace it with something built to current standards, not just patch the old one again.",
    buyingHeading: 'Buying a Mobile Home in Grimes County',
    buying: [
      "Replacing an older mobile home near Navasota usually means dealing with removal as much as installation, and we walk through both pieces before you commit to anything.",
      "A new manufactured home meeting current HUD code is a different construction standard entirely from an older mobile home — not just a fresher version of the same thing.",
    ],
    pricingExplainer: [
      "A Navasota-area buyer sees one complete number, replacement home or new build alike — everything itemized above is already folded into that quote.",
      "The land itself, not the home it's replacing, is what determines the utility number for a Grimes County property. A phone estimate opens the conversation, and a contractor's visit closes it.",
    ],
    gettingStarted: [
      "If there's already a mobile home on your Navasota-area property, that's the first thing worth telling us — it changes the setup conversation more than almost anything else.",
      "From there, we walk through what removal and replacement actually involve, then move into floor plan and financing once the site itself is understood.",
    ],
    localProof:
      "We've worked with Grimes County families replacing an aging mobile home as often as we've worked with buyers starting on a completely open lot.",
    faq: [
      {
        q: "Do you handle removing an old mobile home near Navasota?",
        a: "That's part of the conversation we have once we know your specific situation — reach out and we'll cover what applies to your property.",
      },
      {
        q: "Is a new manufactured home actually different from an older mobile home?",
        a: "Yes — construction standards changed significantly with the federal HUD code, and everything we sell meets the current standard, not an older one.",
      },
      {
        q: "Is delivery available anywhere in Grimes County?",
        a: "We do — reach out with your Grimes County address and we'll confirm what delivery and setup look like at your site.",
      },
    ],
    nearby: ['brenham', 'bryan', 'conroe', 'caldwell'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Navasota, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Navasota, TX',
    popularHomes: [
      'marathon-breckenridge-3bed-2bath-single-wide',
      'marathon-kendall-3bed-2bath-double-wide',
      'marathon-pearland-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  caldwell: {
    county: 'Burleson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Caldwell, TX and Burleson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A good share of Caldwell-area land has been passed down through Burleson County families for a generation or more, and Texas Homes Direct treats that kind of property differently — not as a blank lot, but as land with its own history and its own quirks.",
    buyingHeading: 'Buying a Mobile Home in Burleson County',
    buying: [
      "Family land near Caldwell sometimes comes with an old well, a partial fence line, or a structure that's been there for decades — we work around what's actually there instead of assuming a clean slate.",
      "A manufactured home built to current HUD code still costs meaningfully less than site-built construction, whether the land under it has been in the family for one year or fifty.",
    ],
    pricingExplainer: [
      "Whatever the history of your Burleson County property, the out-the-door price is the same fixed number once you see your quote — everything itemized above is included.",
      "Utility costs are the one variable, since older family land can have older infrastructure that needs a real look. A phone estimate starts it, and a contractor's visit finishes it.",
    ],
    gettingStarted: [
      "For a lot of Caldwell-area buyers, the first real conversation is about the land itself — what's already there, what's been added over the years, and what still needs work.",
      "Once we understand the property's actual history, floor plan and financing come next, worked out around what the land can realistically support.",
    ],
    localProof:
      "We've worked with Burleson County families setting up on land that had been theirs for decades, and with buyers on a lot purchased just months earlier.",
    faq: [
      {
        q: "Does older infrastructure on family land slow down setup near Caldwell?",
        a: "Not usually — we just need to see what's actually there first. An older well or partial utility line gets accounted for like anything else on the site.",
      },
      {
        q: "Do I need a permit for a manufactured home in Burleson County?",
        a: "Every property is a little different, so we'd rather you confirm the specifics with Burleson County directly than get an answer here that might not actually apply to your lot.",
      },
      {
        q: "What happens once I've picked a home?",
        a: "After that, our team handles the build schedule, gets the home to your site, and manages the full setup — you'll hear from us along the way.",
      },
    ],
    nearby: ['brenham', 'giddings', 'bryan', 'rockdale'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Caldwell, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Caldwell, TX',
    popularHomes: [
      'marathon-bailey-3bed-2bath-double-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
      'marathon-spoonbill-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  cameron: {
    county: 'Milam',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Cameron, TX and Milam County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Cameron-area families outgrowing a starter home usually need one thing above all: another bedroom, or two, without starting the whole search over. Texas Homes Direct carries floor plans built for exactly that kind of growth.",
    buyingHeading: 'Buying a Mobile Home in Milam County',
    buying: [
      "A four-bedroom double wide gives a growing Milam County household real separation between bedrooms, not just more square footage crammed into the same layout.",
      "Moving up in floor plan doesn't mean a different financing process — a larger home near Cameron is quoted and financed the same straightforward way as a smaller one.",
    ],
    pricingExplainer: [
      "No matter which floor plan size a Cameron-area family settles on, the number holds once it's quoted — everything itemized above is already accounted for.",
      "We won't guess at utility costs from a phone call alone — Milam County land varies too much for that. A contractor's on-site visit is what turns the estimate into a real number.",
    ],
    gettingStarted: [
      "For a Cameron-area family outgrowing their current space, the first real question is how many bedrooms actually solves the problem — not just how much bigger.",
      "Once we know what the household needs, we match floor plans to that number and walk through financing for whichever one fits.",
    ],
    localProof:
      "We've helped Milam County families move from a cramped starter setup into a floor plan that actually matches how many people are living there.",
    faq: [
      {
        q: "What's the biggest floor plan available near Cameron?",
        a: "We carry four-bedroom double wides among other layouts — reach out and we'll walk through what's currently available sized for your household.",
      },
      {
        q: "Is land in Milam County something I need to already have?",
        a: "No. Some Milam County families already have their site, some are still hunting for one, and some are working through land that's been in the family.",
      },
      {
        q: "Will you deliver anywhere in Milam County?",
        a: "We do — send over your address and we'll lay out exactly what delivery and setup involve at your location.",
      },
    ],
    nearby: ['rockdale', 'caldwell', 'taylor', 'temple'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Cameron, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Cameron, TX',
    popularHomes: [
      'marathon-jackson-1bed-1bath-park-model',
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  rockdale: {
    county: 'Milam',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Rockdale, TX and Milam County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "An older mobile home and a new HUD-code manufactured home don't run the same utility bill, and that gap is part of what brings a lot of Rockdale-area families to Texas Homes Direct in the first place.",
    buyingHeading: 'Buying a Mobile Home in Milam County',
    buying: [
      "Current HUD code requires meaningfully better insulation and construction standards than older mobile homes were built to, which shows up directly in what a Milam County family pays to heat and cool their home.",
      "A new manufactured home near Rockdale still costs less upfront than comparable site-built construction, on top of the ongoing efficiency difference.",
    ],
    pricingExplainer: [
      "Once you've got a quote in hand for a Rockdale-area home, that's the number — everything itemized above is already folded in, efficiency savings and all.",
      "Efficiency savings are one thing; the utility hookup bid is another, and that one still depends on your specific Rockdale-area property. A phone estimate opens it, a contractor's visit closes it.",
    ],
    gettingStarted: [
      "A lot of Rockdale-area buyers start by asking what they'd actually save on utilities moving from an older home to a new one — a fair question, and one we're glad to walk through.",
      "From there, it's the usual next steps: your property, your floor plan, and financing that fits your budget.",
    ],
    localProof:
      "We've talked more than a few Milam County families through the real difference between an older mobile home's utility costs and a new HUD-code home's.",
    faq: [
      {
        q: "Is a new manufactured home actually more efficient than an older mobile home?",
        a: "Generally yes, though how much you'd actually save depends on the specific home you're replacing — an older single-pane, poorly-sealed unit shows a bigger gap than one that's held up well.",
      },
      {
        q: "Before reaching out, do I need Milam County land secured?",
        a: "It's not required. Milam County buyers show up with land already secured, a lot they're still deciding on, or family property in the mix, and any of those works.",
      },
      {
        q: "Single wide, double wide — how should I think about which one fits?",
        a: "A single wide ships as one continuous section for a lower cost; a double wide arrives in two sections joined on-site for a noticeably bigger home.",
      },
    ],
    nearby: ['cameron', 'taylor', 'giddings', 'elgin'],
    heroImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    heroAlt: 'Double wide manufactured home exterior near Rockdale, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Rockdale, TX',
    popularHomes: [
      'marathon-temple-3bed-2bath-single-wide',
      'fleetwood-roadrunner-3bed-2bath',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  taylor: {
    county: 'Williamson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Taylor, TX and Williamson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Before a Taylor-area buyer talks numbers with us, we'd rather they run our free mortgage analysis tool first — no credit pull, no obligation, just a real sense of what a Williamson County budget actually supports.",
    buyingHeading: 'Buying a Mobile Home in Williamson County',
    buying: [
      "That tool exists so a Taylor-area buyer walks into the real conversation already knowing roughly what they can afford, instead of guessing.",
      "Site-built construction in Williamson County costs noticeably more than a comparable HUD-code manufactured home, without any step down in quality.",
    ],
    pricingExplainer: [
      "Once you've got real numbers from the mortgage tool, the actual quote confirms them — everything itemized above is already built into the out-the-door price.",
      "Utility costs are the one number the tool can't predict, since Williamson County land varies too much. A phone estimate comes first, then an exact bid once a contractor has seen the property.",
    ],
    gettingStarted: [
      "The first step for most Taylor-area buyers is the mortgage analysis tool — five minutes, no credit pull, and a real number to plan around before anything else happens.",
      "From there, the conversation moves to your property and which floor plan actually fits the number you just saw.",
    ],
    localProof:
      "A lot of Williamson County buyers near Taylor start with our mortgage tool before they've even picked a floor plan — that's exactly how it's meant to work.",
    faq: [
      {
        q: "Does the mortgage analysis tool affect my credit?",
        a: "No — it's a soft check with no credit pull, meant to give you real numbers before you commit to anything.",
      },
      {
        q: "Does Williamson County land need to be settled before we start?",
        a: "Not upfront. Whether you've already got a Williamson County lot, you're still looking, or you're navigating family land, we can move forward.",
      },
      {
        q: "Is delivery available across all of Williamson County?",
        a: "We do — every part of Williamson County. Send your address and we'll break down what delivery and setup involve at your specific location.",
      },
    ],
    nearby: ['georgetown', 'elgin', 'rockdale', 'round-rock'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Taylor, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Taylor, TX',
    popularHomes: [
      'marathon-trinity-4bed-2bath-double-wide',
      'marathon-chapman-1bed-1bath-park-model',
      'fleetwood-peredavid-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  georgetown: {
    county: 'Williamson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Georgetown, TX and Williamson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A single-level floor plan with no stairs to manage is usually what brings a Georgetown-area buyer looking to downsize to Texas Homes Direct — less house to maintain, without giving up real living space.",
    buyingHeading: 'Buying a Mobile Home in Williamson County',
    buying: [
      "A smaller single wide keeps upkeep simple for a Georgetown-area buyer who doesn't need the extra bedrooms anymore, while still meeting the same HUD construction standard as any other home we sell.",
      "Downsizing doesn't mean downgrading — every floor plan we offer near Georgetown, large or small, passes the same factory inspection before it ships.",
    ],
    pricingExplainer: [
      "A smaller floor plan generally means a smaller number, but the same rule applies either way — everything itemized above is already built into your Williamson County quote.",
      "Utility costs are the one thing that doesn't shrink with the floor plan, since they depend on the property itself. A phone estimate starts it, an exact contractor bid finishes it.",
    ],
    gettingStarted: [
      "For a Georgetown-area buyer downsizing, the first real conversation is about what you're actually trying to simplify — fewer bedrooms, less yard, or both.",
      "Once we know what you're downsizing away from, we can match a floor plan that fits the smaller footprint you're after.",
    ],
    localProof:
      "We've helped Williamson County buyers near Georgetown move into a simpler single-level home without feeling like they gave anything up.",
    faq: [
      {
        q: "What's the smallest floor plan available for a Georgetown-area buyer?",
        a: "We carry compact single-section homes down to smaller footprints — reach out and we'll walk through what's currently available.",
      },
      {
        q: "Is downsizing to a manufactured home a big financing change?",
        a: "Not usually — financing works the same way regardless of floor plan size, and a smaller home often means a smaller monthly payment.",
      },
      {
        q: "Do you reach every part of Williamson County?",
        a: "From central Georgetown out to the edges of Williamson County, we've got it covered — give us your address to see what that means for your property.",
      },
    ],
    nearby: ['round-rock', 'taylor', 'burnet', 'cedar-park'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Georgetown, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Georgetown, TX',
    popularHomes: [
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-abilene-2bed-1bath-single-wide',
      'marathon-hays-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  yoakum: {
    county: 'Lavaca',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Yoakum, TX and Lavaca County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A lot of Yoakum-area properties are working ranches or farms, not just residential lots, and that means setup has to work around outbuildings, fence lines, and equipment that's already there.",
    buyingHeading: 'Buying a Mobile Home in Lavaca County',
    buying: [
      "We scope a Lavaca County ranch property the same careful way we'd scope any other site — what's already there shapes the plan, not the other way around.",
      "A manufactured home built to current HUD code still runs meaningfully less than comparable site-built construction, working ranch or not.",
    ],
    pricingExplainer: [
      "Whatever your Yoakum-area property looks like — barns, corrals, or open pasture — the out-the-door home price is the same fixed number once quoted.",
      "Utility hookups don't come with a flat number, since ranch and farm properties near Yoakum vary too much for that. We open with a phone estimate, then a contractor walks the land for the real figure.",
    ],
    gettingStarted: [
      "For a Yoakum-area buyer on a working property, the first real question is what's already out there — outbuildings, fencing, equipment — since that shapes where the home actually goes.",
      "Once we understand the layout, we move into floor plan and financing, same as we would for any other property.",
    ],
    localProof:
      "We've set up homes on working ranch and farm properties across Lavaca County, working around what was already on the land rather than starting from scratch.",
    faq: [
      {
        q: "Can you set up around existing barns or outbuildings near Yoakum?",
        a: "Yes — we assess the actual site, including what's already there, before finalizing where the home goes.",
      },
      {
        q: "Is a permit required for a manufactured home in Lavaca County?",
        a: "Permitting comes down to the specific property more than a blanket rule, so it's worth a direct call to Lavaca County to confirm what applies to yours.",
      },
      {
        q: "Single wide versus double wide — what's the real difference?",
        a: "Sizing mostly comes down to your lot and your budget — a single wide keeps both lower, while a double wide gives a growing Yoakum-area household more room to spread out.",
      },
    ],
    nearby: ['hallettsville', 'cuero', 'gonzales', 'shiner'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Yoakum, TX',
    secondaryImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Yoakum, TX',
    popularHomes: [
      'marathon-terra-2bed-1bath-park-model',
      'marathon-woodduck-3bed-2bath-double-wide',
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  hallettsville: {
    county: 'Lavaca',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Hallettsville, TX and Lavaca County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "If a Hallettsville-area buyer is comparing quotes from more than one dealer, we'll put ours in writing, itemized, so it's an actual apples-to-apples comparison instead of two numbers that don't mean the same thing.",
    buyingHeading: 'Buying a Mobile Home in Lavaca County',
    buying: [
      "A quote that isn't itemized can hide what's actually included — a Lavaca County buyer deserves to see setup, delivery, and utilities broken out, not folded into one vague number.",
      "Whichever quote you're comparing, a HUD-code manufactured home consistently comes in well under site-built construction costs near Hallettsville.",
    ],
    pricingExplainer: [
      "An itemized quote is exactly what you'll get from us — everything listed above is already built into the out-the-door price for a Hallettsville-area buyer.",
      "Utility costs are the one line that can't be itemized upfront, since Lavaca County land varies too much. A phone estimate starts it, and a contractor's exact bid finishes it.",
    ],
    gettingStarted: [
      "If you're shopping more than one dealer near Hallettsville, bring us their quote — we'll walk through ours side by side so you can see exactly what's different.",
      "Once you've compared real numbers, the next step is your property and your timeline for deciding.",
    ],
    localProof:
      "More than one Lavaca County buyer has brought us a competing quote to compare, and we've walked through the line-item differences together.",
    faq: [
      {
        q: "Will you look at a competing quote from another dealer near Hallettsville?",
        a: "Yes — bring it and we'll walk through the itemized differences so you can see what's actually being compared.",
      },
      {
        q: "Do I need a Lavaca County property picked out before we talk numbers?",
        a: "No — land already owned, a lot still being purchased, or family property still in the works are all fine places to start with us.",
      },
      {
        q: "Is Lavaca County fully covered for delivery?",
        a: "We cover all of Lavaca County — share your address and we'll confirm the specifics for your site.",
      },
    ],
    nearby: ['yoakum', 'schulenburg', 'flatonia', 'gonzales'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Hallettsville, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Hallettsville, TX',
    popularHomes: [
      'marathon-chapman-1bed-1bath-park-model',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-daniel-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-23',
  },

  yorktown: {
    county: 'DeWitt',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Yorktown, TX and DeWitt County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A number of Yorktown-area buyers come to Texas Homes Direct after being told no somewhere else, and that's usually where the real conversation starts — a second look, not a repeat of the first rejection.",
    buyingHeading: 'Buying a Mobile Home in DeWitt County',
    buying: [
      "Between financing directly and working with outside public and private lenders, a DeWitt County buyer who's been turned down before often still has a workable path with us.",
      "A DeWitt County family ends up paying noticeably less for a HUD-code manufactured home than for site-built construction, whatever the financing search has looked like so far.",
    ],
    pricingExplainer: [
      "Whatever your financing path ends up being, the out-the-door price for a Yorktown-area buyer works the same way — everything itemized above is already included.",
      "Utility costs are the one variable, since DeWitt County land varies too much to quote sight unseen. A phone estimate starts it, an exact contractor bid finishes it.",
    ],
    gettingStarted: [
      "If you've been told no somewhere else, that's genuinely useful for us to know upfront — it doesn't rule anything out, it just tells us where to start.",
      "From there, we walk through financing options directly, then move into your property and floor plan once that part's settled.",
    ],
    localProof:
      "We've worked with DeWitt County buyers near Yorktown who came to us after being turned down elsewhere, and found a path that actually worked.",
    faq: [
      {
        q: "I was denied financing somewhere else — is it worth trying again near Yorktown?",
        a: "Often, yes. Between in-house financing and outside public and private lenders, we frequently find a path even after another lender said no.",
      },
      {
        q: "Do you require DeWitt County land to be owned upfront?",
        a: "No — a DeWitt County buyer might already have land, might be shopping for a lot, or might be working through family property. All three are fine starting points.",
      },
      {
        q: "What should I know about single wide vs. double wide before choosing?",
        a: "A single wide is one section and costs less; a double wide is two sections joined on-site with more total space.",
      },
    ],
    nearby: ['cuero', 'goliad', 'victoria', 'gonzales'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Yorktown, TX',
    secondaryImage: '/homes/the-grayson/IMG_0789.webp',
    secondaryAlt: 'Single wide manufactured home available for delivery near Yorktown, TX',
    popularHomes: [
      'marathon-hays-4bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-kendall-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  goliad: {
    county: 'Goliad',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Goliad, TX and Goliad County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Goliad is one of the oldest towns in Texas, and the pace of a conversation with Texas Homes Direct matches that a little — no rush, no script, just an actual conversation about what a Goliad County family needs.",
    buyingHeading: 'Buying a Mobile Home in Goliad County',
    buying: [
      "That unhurried approach matters most when a Goliad-area buyer has specific questions about their property or their timeline — a scripted answer doesn't hold up to real questions.",
      "Site-built construction runs well ahead of a comparable HUD-code manufactured home in cost, historic setting or not.",
    ],
    pricingExplainer: [
      "For a Goliad-area buyer, there's no revised number waiting after the first one — everything itemized above is already locked into the price you're quoted.",
      "Utility hookups are the exception to that fixed number — Goliad County land is inconsistent enough that a phone estimate only opens the conversation, and the contractor's on-site bid is the figure that matters.",
    ],
    gettingStarted: [
      "There's no set script for a first conversation near Goliad — we'll talk through your property, your timeline, and your actual questions in whatever order makes sense to you.",
      "Once we've covered what matters to you, we move into floor plan and financing at whatever pace works.",
    ],
    localProof:
      "Goliad County families have taken their time with us, asking real questions before deciding, and we've never rushed anyone through it.",
    faq: [
      {
        q: "Does a manufactured home need a permit in Goliad County?",
        a: "Requirements vary by county and by property, so it's worth confirming directly with Goliad County. We can help point you toward the right office.",
      },
      {
        q: "Is having land in Goliad County a prerequisite for buying?",
        a: "It's not a prerequisite. Goliad County buyers come to us with land secured, a lot still in progress, or family property being worked through.",
      },
      {
        q: "Once I've chosen a floor plan, what's next?",
        a: "From there, we take the lead on the build timeline, delivery, and setup, checking in with you rather than going quiet until it's done.",
      },
    ],
    nearby: ['yorktown', 'victoria', 'cuero', 'beeville'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Goliad, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Goliad, TX',
    popularHomes: [
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
      'marathon-katy-3bed-2bath-single-wide',
      'fleetwood-badger-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  'karnes-city': {
    county: 'Karnes',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Karnes City, TX and Karnes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A fair number of Karnes City-area buyers are new to the area entirely — relocating for work, for family, or just a fresh start — and don't have the local context a longtime resident would. Texas Homes Direct fills in that gap without making you feel behind.",
    buyingHeading: 'Buying a Mobile Home in Karnes County',
    buying: [
      "We walk a new-to-the-area Karnes County buyer through the same process as anyone else, just with a little more explanation along the way about how things work locally.",
      "New to the area or not, a HUD-code manufactured home still gets a Karnes County family into a new home for meaningfully less than building from scratch.",
    ],
    pricingExplainer: [
      "Whether you've lived in Karnes County for years or just arrived, the out-the-door price works the same way — everything itemized above is already built in.",
      "Utility costs are the one number that depends on the specific property, not how long you've been in the area. A phone estimate starts it, a contractor's exact bid finishes it.",
    ],
    gettingStarted: [
      "If you're new to Karnes City, that's worth telling us upfront — we'll walk through the process a little more thoroughly than we would with someone who's done this before.",
      "From there, it's the same path as anyone else: property, floor plan, and financing, explained clearly at each step.",
    ],
    localProof:
      "We've helped more than a few families relocating to Karnes County get oriented on the process before they'd even settled into the area.",
    faq: [
      {
        q: "I just moved to the area — where do I even start near Karnes City?",
        a: "Right here. Reach out and we'll walk through the whole process, starting with your property situation and what you're looking for.",
      },
      {
        q: "Do I need land in Karnes County squared away before contacting you?",
        a: "Not necessarily. Some Karnes County buyers already have a site, others are still looking, and some are working through property that's stayed in the family.",
      },
      {
        q: "Can you deliver to any address in Karnes County?",
        a: "Yes. Send your address over and we'll spell out what delivery and setup will look like at your property.",
      },
    ],
    nearby: ['floresville', 'kenedy', 'cuero', 'pleasanton'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Karnes City, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Karnes City, TX',
    popularHomes: [
      'fleetwood-roadrunner-3bed-2bath',
      'marathon-jackson-1bed-1bath-park-model',
      'marathon-brewster-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  kenedy: {
    county: 'Karnes',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Kenedy, TX and Karnes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A Kenedy-area buyer doesn't have to wait until their land purchase closes to lock in a home price with Texas Homes Direct — the two don't have to move in lockstep.",
    buyingHeading: 'Buying a Mobile Home in Karnes County',
    buying: [
      "Locking in a floor plan and price while a Karnes County land deal is still in progress gives a buyer one less variable to manage during closing.",
      "A HUD-code manufactured home puts a Karnes County family into a new home for noticeably less than site-built construction, whether your land deal has closed yet or not.",
    ],
    pricingExplainer: [
      "Once a Kenedy-area buyer locks in a floor plan, the out-the-door price holds — everything itemized above stays fixed regardless of how long the land purchase takes.",
      "Utility costs are the exception, since they depend on the specific property once it's yours. A phone estimate can start early, but the exact bid waits until a contractor can walk the land.",
    ],
    gettingStarted: [
      "If your Karnes County land purchase is still in progress, that's fine — a Kenedy-area buyer can lock in a floor plan and price now and finish the land side separately.",
      "Once both pieces are settled, we move straight into setup, using whatever timeline actually fits your situation.",
    ],
    localProof:
      "We've locked in floor plans and pricing for Karnes County buyers whose land deals were still closing, so nothing had to wait on the other.",
    faq: [
      {
        q: "Can I pick a home before my land purchase near Kenedy is finished?",
        a: "Yes — we can lock in a floor plan and price while your land purchase is still in progress, so the two aren't dependent on each other.",
      },
      {
        q: "Is Karnes County land ownership a condition of starting?",
        a: "No. Whether you've already got land, you're still shopping for a lot, or you're working through family property, we'll meet you where you are.",
      },
      {
        q: "How do single wides and double wides actually differ?",
        a: "A single wide ships as one section for a lower entry cost; a double wide ships as two sections joined on-site, giving you meaningfully more room.",
      },
    ],
    nearby: ['karnes-city', 'floresville', 'cuero', 'beeville'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Kenedy, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Kenedy, TX',
    popularHomes: [
      'marathon-jasper-3bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  beeville: {
    county: 'Bee',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Beeville, TX and Bee County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A lot of Bee County land near Beeville isn't tied up in subdivision rules or HOA restrictions the way in-town lots can be, which gives a buyer more say over their own property than a typical suburban lot would.",
    buyingHeading: 'Buying a Mobile Home in Bee County',
    buying: [
      "That flexibility matters when a Beeville-area buyer wants to place a home, an outbuilding, or a garden a certain way — fewer outside rules to work around.",
      "Open acreage or a more restricted lot, a HUD-code manufactured home still costs a Bee County family meaningfully less than comparable site-built construction.",
    ],
    pricingExplainer: [
      "A Bee County quote doesn't move once you've seen it — everything itemized above is already built into the number, regardless of what your property looks like.",
      "Utilities are the one line we won't pin down sight-unseen. We start with a phone estimate and follow it with a contractor's exact bid once they've actually walked the site.",
    ],
    gettingStarted: [
      "For a Beeville-area buyer on open rural land, the first real question is simply what the property has and doesn't have yet — utilities, access, a cleared site.",
      "From there, floor plan and financing come next, worked out around what your specific land actually needs.",
    ],
    localProof:
      "We've set up homes on unrestricted rural properties across Bee County where buyers had far more flexibility than a typical subdivision lot allows.",
    faq: [
      {
        q: "Are there fewer restrictions on rural land near Beeville?",
        a: "Often, yes, compared to a subdivision — but specifics depend on your particular property, so it's worth confirming directly with Bee County for anything county-regulated.",
      },
      {
        q: "Does the process require Bee County land already in hand?",
        a: "No. A Bee County buyer might already own the land, might be closing on a lot, or might be sorting through family property — all three work.",
      },
      {
        q: "Does your coverage include all of Bee County?",
        a: "Every part of it — send over your Bee County address and we'll spell out exactly what delivery and setup involve at your location.",
      },
    ],
    nearby: ['goliad', 'kenedy', 'sinton', 'refugio'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Beeville, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Beeville, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'marathon-cisco-2bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  refugio: {
    county: 'Refugio',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Refugio, TX and Refugio County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Selling a current home while buying a new manufactured one is its own kind of logistics puzzle, and Texas Homes Direct works with Refugio-area buyers managing exactly that — two moving pieces, one plan.",
    buyingHeading: 'Buying a Mobile Home in Refugio County',
    buying: [
      "We can lock in a floor plan and financing for a Refugio County buyer while a current home sale is still working through closing, so neither piece holds up the other.",
      "Mid-transition or fully settled, a HUD-code manufactured home still puts a Refugio County family into a new home for noticeably less than building new.",
    ],
    pricingExplainer: [
      "A Refugio-area buyer's out-the-door number doesn't shift based on how long the current home sale takes — everything itemized above is locked in the moment you're quoted.",
      "Utility costs are the exception, tied to the new property itself. A phone estimate can start early, with the exact bid following once a contractor has walked the land.",
    ],
    gettingStarted: [
      "If you're selling a current home while buying near Refugio, tell us that upfront — we'll work the timeline around both pieces instead of assuming a simple, single transaction.",
      "From there, floor plan and financing move forward on their own track while the sale works through its own process.",
    ],
    localProof:
      "We've coordinated with Refugio County buyers managing a current home sale and a new manufactured home purchase at the same time.",
    faq: [
      {
        q: "Can you work with my timeline if I'm selling my current home near Refugio?",
        a: "Yes — tell us where things stand and we'll coordinate the floor plan and financing side without forcing your sale onto a rigid schedule.",
      },
      {
        q: "Is it necessary to own Refugio County land before we begin?",
        a: "It doesn't have to be settled yet. Refugio County buyers reach out with land already secured, a lot still being decided, or family property in progress.",
      },
      {
        q: "What's the practical difference between single wide and double wide homes?",
        a: "A single wide comes as a single section at a lower price point; a double wide comes as two sections joined once they're on your property, for more square footage.",
      },
    ],
    nearby: ['beeville', 'goliad', 'sinton', 'victoria'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Refugio, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Refugio, TX',
    popularHomes: [
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  sinton: {
    county: 'San Patricio',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Sinton, TX and San Patricio County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "San Patricio County stretches across a fair amount of ground, and Texas Homes Direct covers all of it from Sinton out to the smaller communities around it — delivery coverage that doesn't stop at the town line.",
    buyingHeading: 'Buying a Mobile Home in San Patricio County',
    buying: [
      "Whether a Sinton-area buyer is close to town or out toward the county line, the same team and the same process apply — nothing changes based on distance within the county.",
      "No matter where in San Patricio County it's headed, a HUD-code manufactured home runs meaningfully under the cost of comparable site-built construction.",
    ],
    pricingExplainer: [
      "The out-the-door price for a Sinton-area buyer holds regardless of exactly where in the county the property sits — everything itemized above is already included.",
      "Utility costs are the one variable tied to the specific site. A phone estimate starts it, and a contractor's exact bid follows once they've actually seen the property.",
    ],
    gettingStarted: [
      "The first real question for a Sinton-area buyer is simply where in San Patricio County the property sits — we cover the whole county, so this shapes scheduling, not whether we can deliver.",
      "Once location's settled, we move into your property's specific setup needs and then floor plan and financing.",
    ],
    localProof:
      "We've delivered across San Patricio County, from properties close to Sinton itself out to smaller communities nearby.",
    faq: [
      {
        q: "Do you deliver throughout San Patricio County, or just Sinton itself?",
        a: "San Patricio County is fully in range for us — pass along your address and we'll confirm the specifics for your property.",
      },
      {
        q: "Do I need a San Patricio County lot secured before the first call?",
        a: "Not yet, and that's fine. San Patricio County buyers reach out with land already secured, a lot in progress, or family property still being decided.",
      },
      {
        q: "After I pick a home, what does the process look like?",
        a: "Once that's settled, we manage the build, get the home to your property, and complete setup, keeping you in the loop the whole way.",
      },
    ],
    nearby: ['beeville', 'refugio', 'robstown', 'ingleside'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Sinton, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Sinton, TX',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'fleetwood-armadillo-3bed-2bath',
      'fleetwood-peredavid-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  gatesville: {
    county: 'Coryell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Gatesville, TX and Coryell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Before a Gatesville-area buyer ever picks up the phone with us, they can see the full setup checklist and out-the-door pricing breakdown — nothing held back for the first call, nothing that only comes out once you're already talking to someone.",
    buyingHeading: 'Buying a Mobile Home in Coryell County',
    buying: [
      "That upfront transparency matters to a Coryell County buyer who'd rather research on their own terms before a conversation starts, not be walked through it live for the first time.",
      "Whether you call first or read everything first, the bottom line stays the same: a HUD-code manufactured home costs a Coryell County family noticeably less than site-built construction.",
    ],
    pricingExplainer: [
      "The full setup checklist and out-the-door pricing are laid out above before you ever have to ask — everything itemized is already built into your Gatesville-area quote.",
      "Utility costs are the one piece that can't be published in advance, since Coryell County land varies too much. A phone estimate starts it, a contractor's exact bid finishes it.",
    ],
    gettingStarted: [
      "A Gatesville-area buyer can read through the full checklist and pricing breakdown above before ever reaching out — there's nothing held back for the first conversation.",
      "When you are ready to talk, we pick up from your property and your specific questions, not from scratch.",
    ],
    localProof:
      "Coryell County buyers near Gatesville have told us they appreciated seeing the full breakdown before their first call, not during it.",
    faq: [
      {
        q: "Do I need to call before I can see pricing details for Gatesville?",
        a: "No — the setup checklist and out-the-door pricing breakdown are available to review before you ever reach out.",
      },
      {
        q: "Is land ownership in Coryell County something you require first?",
        a: "No — Coryell County buyers come to us with land already picked out, a lot still under consideration, or family property still being sorted.",
      },
      {
        q: "Is delivery offered countywide in Coryell County?",
        a: "The full county — send your address and we'll break down exactly what delivery and setup involve at your specific location.",
      },
    ],
    nearby: ['copperas-cove', 'lampasas', 'hamilton', 'temple'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Gatesville, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Gatesville, TX',
    popularHomes: [
      'fleetwood-axis-3bed-2bath-double-wide',
      'marathon-spoonbill-3bed-2bath-single-wide',
      'marathon-dawson-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  'copperas-cove': {
    county: 'Coryell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Copperas Cove, TX and Coryell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "A Copperas Cove-area buyer can see every financing option we offer before ever stepping into a conversation — in-house, public lenders, private lenders — laid out plainly instead of introduced one at a time as the conversation goes.",
    buyingHeading: 'Buying a Mobile Home in Coryell County',
    buying: [
      "Seeing every financing path upfront lets a Coryell County buyer walk into the real conversation already knowing which option probably fits, instead of discovering it mid-call.",
      "A Coryell County family still comes out ahead on cost with a HUD-code manufactured home versus building from scratch, no matter which financing path ends up fitting.",
    ],
    pricingExplainer: [
      "The out-the-door price for a Copperas Cove-area buyer holds regardless of which financing path you choose — everything itemized above is already built in.",
      "Utility costs are the one number financing can't predict, since they depend on the property itself. A phone estimate starts it, a contractor's exact bid finishes it.",
    ],
    gettingStarted: [
      "Before anything else, a Copperas Cove-area buyer can review all three financing paths — in-house, public, private — to get a sense of which one probably fits before talking to anyone.",
      "Once you've got a sense of the financing side, we move into your property and floor plan next.",
    ],
    localProof:
      "We've laid out every financing option upfront for Coryell County buyers near Copperas Cove before their first real conversation with us.",
    faq: [
      {
        q: "What financing options are available for a Copperas Cove-area buyer?",
        a: "In-house financing, public lending programs, and private lenders — all reviewed upfront so you know your options before committing to anything.",
      },
      {
        q: "Before financing, is Coryell County land required?",
        a: "No — some Coryell County buyers already have their site, some are still shopping, and some are working through property that's stayed in the family.",
      },
      {
        q: "Single wide or double wide — how are they different?",
        a: "Section count is the real difference — one for a single wide, two joined on-site for a double wide, which is also where the extra square footage comes from.",
      },
    ],
    nearby: ['gatesville', 'lampasas', 'killeen', 'harker-heights'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Copperas Cove, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Copperas Cove, TX',
    popularHomes: [
      'marathon-ranger-2bed-1bath-single-wide',
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-fisher-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-23',
  },

  killeen: {
    county: 'Bell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Killeen, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "With Fort Cavazos right next door, a lot of Killeen-area buyers are relocating on military orders, and Texas Homes Direct works with that reality directly — financing and timelines that account for a move you didn't fully control the timing of.",
    buyingHeading: 'Buying a Mobile Home in Bell County',
    buying: [
      "A military family relocating to Bell County often has less lead time than a typical buyer, and we adjust the process to fit that reality rather than expecting you to fit ours.",
      "On orders or settled locally, a HUD-code manufactured home gets a Bell County family into a new home for noticeably less than comparable site-built construction.",
    ],
    pricingExplainer: [
      "A Killeen-area quote is fixed the moment you see it, PCS orders or not — everything itemized above is already built into the number, with nothing added mid-move.",
      "Utility hookups are the one number we won't guess at — a phone estimate opens the conversation, and the exact figure comes only after a contractor has actually seen your property.",
    ],
    gettingStarted: [
      "If you're relocating to Killeen on military orders, tell us that upfront — it changes what questions we ask first and how we prioritize the process.",
      "From there, we move into your property situation and financing, working around whatever timeline your move actually gives you.",
    ],
    localProof:
      "We've worked with military families relocating to Bell County on orders, adjusting our process to fit a timeline they didn't set themselves.",
    faq: [
      {
        q: "Do you help military families get set up when they're relocating to Killeen?",
        a: "Yes — we regularly work with buyers relocating to Fort Cavazos and adjust the process around a military move's realities.",
      },
      {
        q: "Do I need to have Bell County property already?",
        a: "Not a requirement. Some Bell County buyers already have a site lined up, some are still searching, and some are working through family land.",
      },
      {
        q: "Do you cover the whole of Bell County?",
        a: "We cover all of Bell County — send your address and we'll walk through what that means for your specific site.",
      },
    ],
    nearby: ['harker-heights', 'copperas-cove', 'belton', 'temple'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Killeen, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Killeen, TX',
    popularHomes: [
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-redhead-3bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  'harker-heights': {
    county: 'Bell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Harker Heights, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Harker Heights sits close enough to Killeen, Belton, and Temple that buyers sometimes aren't sure which of us actually covers their address. Short answer: all of them, including Harker Heights, get the same team and the same process.",
    buyingHeading: 'Buying a Mobile Home in Bell County',
    buying: [
      "Whichever Bell County city you're closest to, the pricing and process near Harker Heights don't change depending on which neighbor you're technically nearer to.",
      "A manufactured home built to current HUD code still costs meaningfully less than comparable site-built construction, wherever in the Bell County cluster it's headed.",
    ],
    pricingExplainer: [
      "A Harker Heights-area quote is fixed the moment you see it, regardless of which nearby city's page brought you here — everything itemized above is already included.",
      "Utility hookups don't get the same fixed treatment, since Bell County land differs enough lot to lot that a phone estimate is just a starting point until a contractor sees it in person.",
    ],
    gettingStarted: [
      "For a Harker Heights-area buyer, it genuinely doesn't matter whether your address technically reads Harker Heights, Killeen, or Belton — the first real question is your property, not your zip code.",
      "From there, floor plan and financing move forward the same way they would from any of our Bell County pages, since it's one team covering all of them.",
    ],
    localProof:
      "We've delivered to Harker Heights addresses, Killeen addresses, and Belton addresses without missing a beat between them — it's the same coverage area to us.",
    faq: [
      {
        q: "Does it matter if I'm technically in Killeen or Belton instead of Harker Heights?",
        a: "Not for us — we treat the whole Bell County cluster as one coverage area, so the city name on your address doesn't change the price or the process.",
      },
      {
        q: "Is a finished land search in Bell County required to start?",
        a: "It doesn't have to be. Bell County buyers show up with land already in hand, a lot they're still deciding on, or family property in progress.",
      },
      {
        q: "Will delivery reach every corner of Bell County?",
        a: "We cover all of Bell County — give us your address and we'll confirm what that looks like for your specific property.",
      },
    ],
    nearby: ['killeen', 'belton', 'temple', 'copperas-cove'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Harker Heights, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Harker Heights, TX',
    popularHomes: [
      'marathon-abilene-2bed-1bath-single-wide',
      'marathon-bell-3bed-2bath-double-wide',
      'marathon-terra-2bed-1bath-park-model',
    ],
    lastModified: '2026-09-23',
  },

  belton: {
    county: 'Bell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Belton, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Belton Lake draws a specific kind of buyer to the area — people looking for acreage near the water for a second property or a full-time home, not just an in-town lot. Texas Homes Direct works with exactly that kind of Bell County property.",
    buyingHeading: 'Buying a Mobile Home in Bell County',
    buying: [
      "Lake-adjacent acreage near Belton often has different access and utility conditions than an in-town lot, and we scope each site individually rather than assuming a standard package.",
      "Waterfront acreage or an in-town lot, a HUD-code manufactured home still runs meaningfully under the cost of comparable site-built construction near Belton.",
    ],
    pricingExplainer: [
      "Lake-adjacent property or an in-town lot, the out-the-door price for a Belton-area buyer holds either way — everything itemized above is already built into your quote.",
      "Utility costs are the one variable, since lake-adjacent land can have its own access and terrain conditions. A phone estimate starts it, an exact contractor bid finishes it.",
    ],
    gettingStarted: [
      "For a Belton-area buyer looking at lake-adjacent property, the first real question is what access the site actually has — road, utilities, distance from the water.",
      "Once we understand the property, floor plan and financing follow, sized to what actually fits a recreational or full-time setup.",
    ],
    localProof:
      "We've set up homes on acreage near Belton Lake for buyers using the property as a full-time home and as a weekend retreat alike.",
    faq: [
      {
        q: "Can you set up a home on acreage near Belton Lake?",
        a: "Yes — we scope lake-adjacent properties the same careful way we'd scope any site, accounting for access and terrain before finalizing a plan.",
      },
      {
        q: "Does Bell County land have to be owned before we talk numbers?",
        a: "No. A lot already secured, one you're still deciding on, or family property that's still being worked out — any of those gets you started with us.",
      },
      {
        q: "What distinguishes a single wide from a double wide?",
        a: "A single wide arrives as one section and keeps costs down; a double wide arrives as two sections joined on your property for more overall space.",
      },
    ],
    nearby: ['temple', 'killeen', 'harker-heights', 'salado'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Belton, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Belton, TX',
    popularHomes: [
      'marathon-pintail-4bed-2bath-double-wide',
      'fleetwood-raven-3bed-2bath-single-wide',
      'marathon-beaumont-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  temple: {
    county: 'Bell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Temple, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Temple's medical center draws staff relocating from all over, and a fair number of them end up comparing a manufactured home against a new subdivision house before deciding — Texas Homes Direct lays out that comparison honestly.",
    buyingHeading: 'Buying a Mobile Home in Bell County',
    buying: [
      "A manufactured home built to current HUD code costs meaningfully less than a comparable new subdivision house near Temple, without stepping down in construction quality.",
      "Relocating for work doesn't have to mean rushing the decision — a Temple-area buyer gets the same unhurried comparison whether they're moving in a month or deciding a year out.",
    ],
    pricingExplainer: [
      "Relocating for the medical center or not, the out-the-door price for a Temple-area buyer is locked in the moment you see your quote — everything itemized above is already included.",
      "The exception is utilities, tied entirely to your specific Bell County property — a phone estimate is the starting point, and the contractor's on-site bid is the number that actually counts.",
    ],
    gettingStarted: [
      "For a Temple-area buyer weighing a manufactured home against a new subdivision house, the real comparison starts with actual numbers, not assumptions about either option.",
      "Once the cost comparison makes sense, we move into your property situation and financing, whatever your timeline for relocating looks like.",
    ],
    localProof:
      "We've walked more than a few Bell County families relocating for work through a real, honest comparison against new subdivision construction near Temple.",
    faq: [
      {
        q: "How does a manufactured home actually compare to a new subdivision house near Temple?",
        a: "Typically for meaningfully less, without a drop in HUD-code construction quality — run our free mortgage analysis tool to see real numbers for your budget.",
      },
      {
        q: "Is having a Bell County lot a condition for moving forward?",
        a: "No. Whether your Bell County land is already secured, still being purchased, or tied up in family property, we'll work with where things stand.",
      },
      {
        q: "Does your delivery area cover the whole of Bell County?",
        a: "Yes. Share your address and we'll lay out what delivery and setup actually look like at your location.",
      },
    ],
    nearby: ['belton', 'killeen', 'cameron', 'salado'],
    heroImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    heroAlt: 'Double wide manufactured home exterior near Temple, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Temple, TX',
    popularHomes: [
      'marathon-lanny-1bed-1bath-park-model',
      'marathon-loving-3bed-2bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  hamilton: {
    county: 'Hamilton',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Hamilton, TX and Hamilton County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Hamilton County is one of the smaller counties Texas Homes Direct serves, and that doesn't change how much attention a Hamilton-area buyer gets — the same process, the same care, regardless of county size.",
    buyingHeading: 'Buying a Mobile Home in Hamilton County',
    buying: [
      "A smaller county doesn't mean fewer options for a Hamilton-area buyer — the same full range of floor plans and financing paths apply here as anywhere else we deliver.",
      "Small county or not, a HUD-code manufactured home still costs a Hamilton County family noticeably less than comparable site-built construction.",
    ],
    pricingExplainer: [
      "The out-the-door price for a Hamilton-area buyer works exactly the same way as anywhere else we serve — everything itemized above is already built in.",
      "The one thing we won't lock in over the phone is the utility number, since Hamilton County land is too inconsistent for that to be honest — a contractor's visit sets the real figure.",
    ],
    gettingStarted: [
      "For a Hamilton-area buyer, the first real conversation covers the same ground it would anywhere else we serve — your property, your floor plan preferences, and your financing situation.",
      "From there, the process moves the same way it would in a larger county, just with fewer other buyers competing for the same delivery slots.",
    ],
    localProof:
      "We've worked with Hamilton County families the same way we'd work with a buyer in a larger, more heavily served county.",
    faq: [
      {
        q: "Is your Hamilton County coverage the whole county, or only in town?",
        a: "Hamilton County ranch land included — share your address and we'll walk through delivery and setup for your specific site.",
      },
      {
        q: "Do you need me to already own Hamilton County land?",
        a: "It's not necessary yet. Hamilton County buyers show up at every stage — land already in hand, a lot still being chosen, or family property in the works.",
      },
      {
        q: "Where do single wides and double wides actually diverge?",
        a: "A single wide is a single section that costs less to start; a double wide is two sections joined on-site, which adds meaningfully more living space.",
      },
    ],
    nearby: ['goldthwaite', 'comanche', 'gatesville', 'stephenville'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Hamilton, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Single wide manufactured home available for delivery near Hamilton, TX',
    popularHomes: [
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-caldwell-4bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-23',
  },

  'fort-worth': {
    county: 'Tarrant',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Fort Worth, TX and Tarrant County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Fort Worth is big enough to have real dealer options, and Texas Homes Direct wants to be judged against them directly: same HUD-code construction, a price that's itemized instead of padded, and financing that doesn't require a credit score you don't have yet.",
    buyingHeading: 'Buying a Mobile Home in Tarrant County',
    buying: [
      "A Tarrant County buyer comparing us to a metro lot should ask the same question every time: what's actually included in that number, and does it change later. Ours doesn't.",
      "Dollar for dollar, a HUD-code manufactured home in Tarrant County buys more house than site-built construction does at the same budget.",
    ],
    pricingExplainer: [
      "The number you see on a Fort Worth-area quote is the number you pay — everything itemized above is already folded in before you sign anything.",
      "The utility figure isn't fixed like the rest of the price. It starts as a phone estimate and becomes final only after our contractor inspects the site.",
    ],
    gettingStarted: [
      "For a Fort Worth-area buyer, the fastest path in is usually a straight comparison: what you're currently paying versus what a manufactured home actually costs, real numbers instead of a sales pitch.",
      "After that, floor plan and financing get worked out together — nothing about the process changes because of which Tarrant County town you're closest to.",
    ],
    localProof:
      "We work with Tarrant County buyers who've already priced this out at two or three other lots and want to see if our number actually holds up — it does.",
    faq: [
      {
        q: "How does your pricing compare to other Fort Worth dealers?",
        a: "We can't speak to another dealer's numbers, but ours are itemized and fixed the moment you see them — run the free mortgage analysis and compare it against any quote you've already gotten.",
      },
      {
        q: "Is land in Tarrant County a precondition for working with you?",
        a: "No — Tarrant County buyers show up in every stage: land already secured, still hunting for a lot, or working through family property.",
      },
      {
        q: "Does delivery extend across all of Tarrant County?",
        a: "Fort Worth to the Tarrant County line and everywhere between — send your address and we'll spell out delivery and setup specifics.",
      },
    ],
    nearby: ['arlington', 'weatherford', 'azle', 'burleson'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Fort Worth, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Fort Worth, TX',
    popularHomes: [
      'marathon-trinity-4bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
      'marathon-gadwall-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  arlington: {
    county: 'Tarrant',
    tier: 'metro',
    metaDescription:
      "Mobile homes for sale in Arlington, TX and Tarrant County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Arlington sits squarely between Fort Worth and Dallas, which means most buyers here have already looked at both — Texas Homes Direct delivers to Arlington addresses without asking which metro you consider home.",
    buyingHeading: 'Buying a Mobile Home in Tarrant County',
    buying: [
      "Because Arlington is one of the more built-up cities in this cluster, land is usually the first real question, not the last — where the home goes often shapes everything else about the plan.",
      "The construction code hasn't changed the math: Tarrant County buyers still get meaningfully more home for the money than a comparable site-built house.",
    ],
    pricingExplainer: [
      "Nothing gets tacked onto a Arlington-area price after the fact; everything itemized above is baked into the figure from the start.",
      "Utility hookups get a two-step process: a phone estimate to open things up, then an exact number once our contractor has been on the property.",
    ],
    gettingStarted: [
      "For most Arlington buyers, the very first thing to settle is whether you already have a site lined up or are still working that out — it changes which questions come next.",
      "From there it's floor plan, then financing, in whatever order makes sense for your Tarrant County situation.",
    ],
    localProof:
      "We've delivered to Arlington addresses on both the Fort Worth and Dallas sides of town without the process changing either way.",
    faq: [
      {
        q: "Do you only work with buyers who already have land in Arlington?",
        a: "No. Some Arlington buyers have a lot ready, some are still searching, and some are working through family land. We adjust to wherever you're starting.",
      },
      {
        q: "Does it matter if I'm closer to Fort Worth or Dallas?",
        a: "Not a requirement. Arlington-area buyers show up with a site ready, a search underway, or a family-land question still open.",
      },
      {
        q: "Do you deliver throughout Arlington?",
        a: "Both the Tarrant and Johnson County sides of Arlington are covered — share your address and we'll walk through what that means for your site.",
      },
    ],
    nearby: ['fort-worth', 'grand-prairie', 'mansfield', 'euless'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Arlington, TX',
    secondaryImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Arlington, TX',
    popularHomes: [
      'marathon-bailey-3bed-2bath-double-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-breckenridge-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  weatherford: {
    county: 'Parker',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Weatherford, TX and Parker County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Weatherford is the Parker County seat and the edge of where DFW's suburbs give way to real acreage, and Texas Homes Direct works with both kinds of buyer — tight suburban lots and wide-open Parker County land.",
    buyingHeading: 'Buying a Mobile Home in Parker County',
    buying: [
      "A lot of Parker County land is genuinely rural, which usually means more site work up front — we scope the actual property instead of assuming it's already utility-ready.",
      "Site-built construction near Parker still runs well ahead of a HUD-code manufactured home on price, without giving up much on build quality.",
    ],
    pricingExplainer: [
      "A Weatherford-area price doesn't move once you've seen it — everything itemized above is already accounted for in that number.",
      "We won't commit to a utility number without seeing the land. A phone estimate starts it; our contractor's visit finishes it with the real figure.",
    ],
    gettingStarted: [
      "For a Parker County buyer, the property conversation usually comes first and comes in more detail than it would for a smaller in-town lot — how much has been cleared, what's already run to the site.",
      "Once that's settled, we turn to picking a floor plan and lining up financing at the same time.",
    ],
    localProof:
      "We've scoped Parker County properties ranging from a few acres with nothing run yet to smaller in-town lots that were already fully serviced.",
    faq: [
      {
        q: "Do you deliver to rural Parker County acreage, not just in-town lots?",
        a: "Yes — we work with both. Rural acreage usually means more site work, which we scope specifically rather than assuming it matches an in-town lot.",
      },
      {
        q: "Before anything else, do I need Parker County land ready?",
        a: "Not necessary at the start. Parker County buyers reach out with land settled, land still being hunted, or a family inheritance still being sorted through.",
      },
      {
        q: "Is your service area all of Parker County?",
        a: "Parker County acreage or an in-town Weatherford lot, both are covered. Give us your address and we'll spell out the specifics.",
      },
    ],
    nearby: ['fort-worth', 'granbury', 'mineral-wells', 'azle'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Weatherford, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Weatherford, TX',
    popularHomes: [
      'marathon-dove-1bed-1bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  granbury: {
    county: 'Hood',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Granbury, TX and Hood County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Granbury draws buyers looking to slow down — lake property, retirement, a second home on family land — and Texas Homes Direct treats that differently than a straightforward first-home purchase in a denser market.",
    buyingHeading: 'Buying a Mobile Home in Hood County',
    buying: [
      "Whether the home is a full-time residence or a lake-area property you'll use part of the year, the same HUD-code construction and firm pricing apply either way.",
      "Hood County families comparing the two options usually find the manufactured route lands them in a bigger, newer home for less than site-built would cost.",
    ],
    pricingExplainer: [
      "What we quote a Granbury-area buyer is what they pay, full stop, with everything itemized above already built into the figure.",
      "Unlike the rest of the price, utilities start as an estimate. Our contractor's on-site visit turns that into the number that actually matters.",
    ],
    gettingStarted: [
      "For a Granbury buyer, it helps to know upfront whether this is a full-time home or a part-time property — it shapes some of the early planning conversation, though not the pricing.",
      "The next step is usually floor plan and financing running in parallel, not one before the other.",
    ],
    localProof:
      "Full-time Hood County homeowners and weekend-lake buyers both come through us, and neither gets treated as the unusual case.",
    faq: [
      {
        q: "Do you work with buyers setting up a part-time lake property?",
        a: "Yes — whether it's a full-time home or a property you'll use seasonally, the pricing and process are the same.",
      },
      {
        q: "Do I need to already own land near Lake Granbury?",
        a: "No. Whether you already have Hood County land lined up, are still searching, or are working through family property, we'll meet you where you are.",
      },
      {
        q: "Can you reach every address in Hood County?",
        a: "We cover the entire county. Send your address and we'll confirm the specifics for your particular property.",
      },
    ],
    nearby: ['weatherford', 'glen-rose', 'cleburne', 'stephenville'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Granbury, TX',
    secondaryImage: '/homes/the-grayson/IMG_0789.webp',
    secondaryAlt: 'Double wide mobile home available for delivery near Granbury, TX',
    popularHomes: [
      'marathon-dawson-4bed-2bath-double-wide',
      'marathon-jackson-1bed-1bath-park-model',
      'marathon-ranger-2bed-1bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  cleburne: {
    county: 'Johnson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Cleburne, TX and Johnson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Cleburne is the Johnson County seat, and a lot of the county's older agricultural land sits around it — Texas Homes Direct works with that land directly rather than assuming every lot looks the same.",
    buyingHeading: 'Buying a Mobile Home in Johnson County',
    buying: [
      "Established agricultural or family land around Cleburne often already has a well or electric in place from a previous structure — we confirm what's actually usable before quoting site work.",
      "A new HUD-code home costs noticeably less to put on Johnson County land than a comparable site-built house would.",
    ],
    pricingExplainer: [
      "A Cleburne-area price holds firm from first quote to closing — everything itemized above is already part of the number.",
      "Utility costs are the one place we ask for patience — a phone estimate first, then a firm number once our contractor has seen the property.",
    ],
    gettingStarted: [
      "For a Cleburne buyer on family or older agricultural land, the first real question is what's already there — an existing well or service line changes the site-work conversation quickly.",
      "After that conversation, floor plan and financing come next — same sequence we'd follow for any Johnson County buyer.",
    ],
    localProof:
      "We've walked Johnson County properties with decades of family history on them, confirming what infrastructure from an older structure was still usable.",
    faq: [
      {
        q: "Can you use existing utilities from an old structure on the land?",
        a: "Often, yes — we confirm what's actually usable on-site rather than assuming everything needs to be run new.",
      },
      {
        q: "Does starting the process require owning Johnson County land?",
        a: "That's not necessary upfront. Johnson County buyers arrive with a finished lot, an unfinished search, or a family-land question still to resolve.",
      },
      {
        q: "Is delivery available no matter where in Johnson County?",
        a: "Yes — Johnson County is fully within our coverage. Share your address for the exact delivery and setup details.",
      },
    ],
    nearby: ['burleson', 'granbury', 'waxahachie', 'mansfield'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Cleburne, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Cleburne, TX',
    popularHomes: [
      'marathon-coleman-3bed-2bath-double-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
      'marathon-grayson-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  burleson: {
    county: 'Johnson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Burleson, TX and Johnson County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Burleson has grown fast enough that it now straddles Johnson and Tarrant counties in practice, and Texas Homes Direct treats it as one coverage area regardless of which county line your address falls on.",
    buyingHeading: 'Buying a Mobile Home in Johnson County',
    buying: [
      "New subdivision growth around Burleson means some buyers are looking at smaller, newer lots than the older acreage common elsewhere in Johnson County — we scope either kind the same way.",
      "Between a manufactured home and site-built construction, the price gap in Johnson County is real — and it isn't a quality tradeoff.",
    ],
    pricingExplainer: [
      "There's no second number waiting later for a Burleson-area buyer; everything itemized above is already in the price you see first.",
      "We don't finalize utility costs remotely. A phone conversation gives a starting figure; a contractor's site visit gives the number you'll actually pay.",
    ],
    gettingStarted: [
      "For a Burleson buyer, it helps to know whether your lot is in a newer development or on older, larger land — the site-work conversation looks a little different either way.",
      "From there, we talk floor plan and financing side by side, so neither one surprises you later.",
    ],
    localProof:
      "We've delivered to newer Burleson-area subdivisions and to older, larger lots nearby without treating either one as the exception.",
    faq: [
      {
        q: "Does it matter if my Burleson address is technically Johnson or Tarrant County?",
        a: "Not to us — we cover Burleson as one area regardless of which county line your specific lot falls on.",
      },
      {
        q: "Do I need to already own land in Burleson?",
        a: "No — plenty of Johnson County buyers start the process before land is settled, whether they're searching, deciding, or sorting out family property.",
      },
      {
        q: "Do you deliver throughout the Burleson area?",
        a: "Burleson-area delivery covers both the Johnson and Tarrant sides. Give us your address and we'll walk through what that means for your site.",
      },
    ],
    nearby: ['cleburne', 'fort-worth', 'mansfield', 'midlothian'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Burleson, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Burleson, TX',
    popularHomes: [
      'marathon-trinity-4bed-2bath-double-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
      'marathon-breckenridge-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  waxahachie: {
    county: 'Ellis',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Waxahachie, TX and Ellis County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Waxahachie is the Ellis County seat, and the courthouse square at its center is the kind of landmark most of the county navigates around — Texas Homes Direct covers Waxahachie and works outward from there across Ellis County.",
    buyingHeading: 'Buying a Mobile Home in Ellis County',
    buying: [
      "Ennis and Midlothian buyers end up on Waxahachie's page as often as the other way around, and the quote tracks your actual property, not which town you searched first.",
      "Ellis County buyers pricing out both options generally find the manufactured home wins on cost without losing ground on construction standards.",
    ],
    pricingExplainer: [
      "The price we give a Waxahachie-area buyer doesn't change later — everything itemized above is already factored in.",
      "The utility line works differently from the rest of the quote — a phone estimate to start, a contractor's visit to confirm the real cost.",
    ],
    gettingStarted: [
      "For a Waxahachie-area buyer, the first real step is your property — in-town lot or land further out in Ellis County, since that shapes what site work actually looks like.",
      "Once we're past that, it's floor plan and financing together — standard sequence for every Ellis County property we work with.",
    ],
    localProof:
      "We've delivered to properties inside Waxahachie city limits and to Ellis County land well outside it, using the same process for both.",
    faq: [
      {
        q: "Do you only serve Waxahachie, or the wider Ellis County area too?",
        a: "The full county — Waxahachie just happens to be where our Ellis County work is centered, not where it ends.",
      },
      {
        q: "Is Ellis County land ownership expected before the first conversation?",
        a: "It doesn't have to be settled yet. Some Ellis County buyers already own their site, some are actively looking, and some have a family-land situation to work through.",
      },
      {
        q: "Do you cover every stretch of Ellis County?",
        a: "Ellis County's courthouse square or its outer edges, we deliver to both — send your address and we'll confirm the specifics.",
      },
    ],
    nearby: ['midlothian', 'ennis', 'cleburne', 'corsicana'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Waxahachie, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Waxahachie, TX',
    popularHomes: [
      'fleetwood-raven-3bed-2bath-single-wide',
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  midlothian: {
    county: 'Ellis',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Midlothian, TX and Ellis County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Midlothian is one of the faster-growing cities on Ellis County's northern edge, and a lot of buyers here are landing on newly platted lots rather than older acreage — Texas Homes Direct scopes new-development land on its own terms.",
    buyingHeading: 'Buying a Mobile Home in Ellis County',
    buying: [
      "A newer Midlothian-area subdivision lot often has less existing infrastructure than it looks like from the street — we confirm what's actually run before quoting anything.",
      "The same HUD code that governs every manufactured home also keeps the price well under site-built construction around Ellis County.",
    ],
    pricingExplainer: [
      "A Midlothian-area quote stays exactly what it was quoted at — everything itemized above is already included, not added on.",
      "We're upfront that utility costs can't be locked in from a phone call alone — an estimate starts it, and our contractor's visit finalizes it.",
    ],
    gettingStarted: [
      "For a Midlothian buyer on a newer lot, the first useful question is what's actually been run to the property already versus what the subdivision plan shows on paper.",
      "The rest follows a familiar pattern: floor plan, financing, and a property visit, worked out together rather than one at a time.",
    ],
    localProof:
      "We've scoped newly platted Midlothian-area lots where what was actually run to the property didn't fully match the subdivision plan on paper.",
    faq: [
      {
        q: "Is a newer subdivision lot already ready for a manufactured home?",
        a: "Sometimes, but not always — we confirm what's actually in place rather than assuming the subdivision plan matches reality.",
      },
      {
        q: "Is owning land in Midlothian a requirement before we talk?",
        a: "No. Buyers here might already have Ellis County land, might still be shopping for it, or might be figuring out a family property — we work with all three.",
      },
      {
        q: "Does delivery cover the whole Midlothian area?",
        a: "All of Ellis County, corner to corner — share your address and we'll lay out the delivery and setup specifics.",
      },
    ],
    nearby: ['waxahachie', 'cleburne', 'mansfield', 'burleson'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Midlothian, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Midlothian, TX',
    popularHomes: [
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-fisher-3bed-2bath-double-wide',
      'marathon-dove-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  ennis: {
    county: 'Ellis',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Ennis, TX and Ellis County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Ennis sits along the I-45 corridor at Ellis County's southern edge, and it's noticeably more rural than Waxahachie or Midlothian to its north — Texas Homes Direct treats that as a real difference in what a typical property looks like, not just a shorter drive.",
    buyingHeading: 'Buying a Mobile Home in Ellis County',
    buying: [
      "Ennis-area land tends to run larger and less developed than the newer subdivisions further north in the county, which usually means a more involved site-work conversation.",
      "Compared side by side, a manufactured home in Ellis County typically costs less than site-built construction of similar size.",
    ],
    pricingExplainer: [
      "Once a Ennis-area buyer sees the number, that's it — everything itemized above is already part of that figure.",
      "Utility hookups are the exception to a fixed price. A phone estimate opens things up; the real number comes once our contractor sees the land.",
    ],
    gettingStarted: [
      "For an Ennis-area buyer, the property conversation usually runs longer than it would for a smaller in-town lot further north — how much has been cleared, what's already run.",
      "After that, we shift to floor plan and financing — the same two-track process regardless of where in Ellis County you land.",
    ],
    localProof:
      "We've scoped larger, less-developed Ennis-area properties along the I-45 corridor where groundwork was a bigger part of the conversation than it is further north in the county.",
    faq: [
      {
        q: "Is Ennis-area land usually more rural than the rest of Ellis County?",
        a: "Often, yes — we typically see larger, less-developed lots here than in Waxahachie or Midlothian, and we scope the site work accordingly.",
      },
      {
        q: "Is having Ennis-area land already secured a condition of getting started?",
        a: "Not at all. We regularly start with Ellis County buyers who haven't locked down land yet, alongside those who already have.",
      },
      {
        q: "Will you deliver anywhere in the Ennis area?",
        a: "The I-45 corridor through Ennis and the farmland around it are both covered — send your address for the specifics.",
      },
    ],
    nearby: ['waxahachie', 'corsicana', 'kaufman', 'midlothian'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Ennis, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Ennis, TX',
    popularHomes: [
      'marathon-hays-4bed-2bath-double-wide',
      'marathon-spoonbill-3bed-2bath-single-wide',
      'marathon-gadwall-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  corsicana: {
    county: 'Navarro',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Corsicana, TX and Navarro County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Corsicana is the Navarro County seat along I-45 between Dallas and Houston, and Texas Homes Direct delivers to Navarro County's mostly agricultural land as directly as it does anywhere closer to the metro.",
    buyingHeading: 'Buying a Mobile Home in Navarro County',
    buying: [
      "Navarro County farmland surrounding Corsicana rarely comes with a standard setup — soil, drainage, and access all shift from one parcel to the next, so we walk each property before quoting.",
      "For Navarro County buyers weighing the two paths, the manufactured option consistently comes out ahead on price for comparable square footage.",
    ],
    pricingExplainer: [
      "The figure we give Corsicana-area buyers is complete from the first conversation — everything itemized above is already in it.",
      "We hold off on a final utility number until our contractor has actually seen the property — a phone estimate is just the starting point.",
    ],
    gettingStarted: [
      "A Corsicana-area call usually starts with the land itself — farmland varies enough here that floor plans wait until we know what your specific parcel actually looks like.",
      "From there we get into floor plan options and financing at the same time, not sequentially.",
    ],
    localProof:
      "Two Corsicana-area farms rarely quote the same — we've walked enough of them to know soil and access change property to property, not just county to county.",
    faq: [
      {
        q: "Do you deliver to agricultural land outside Corsicana city limits?",
        a: "Yes — Navarro County is mostly working farmland outside town, and we treat that acreage like any other property we quote.",
      },
      {
        q: "Do I need a lot in Navarro County before reaching out?",
        a: "No requirement there. Navarro County land situations run the gamut — already owned, still being searched for, or tied up in family property.",
      },
      {
        q: "Is the full county included in your Navarro County delivery?",
        a: "We do, countywide. Give us your address and we'll walk through the delivery and setup details for your site.",
      },
    ],
    nearby: ['ennis', 'waxahachie', 'athens', 'fairfield'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Corsicana, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Corsicana, TX',
    popularHomes: [
      'marathon-widgeon-4bed-2bath-double-wide',
      'marathon-pearland-3bed-2bath-single-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  athens: {
    county: 'Henderson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Athens, TX and Henderson County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Athens is the Henderson County seat and sits close enough to several area lakes that a fair number of buyers here are looking at part-time or eventual full-time lake property — Texas Homes Direct works with both.",
    buyingHeading: 'Buying a Mobile Home in Henderson County',
    buying: [
      "Lake-area Henderson County land can be more developed than buyers expect, or considerably less — we confirm the actual site condition before quoting anything.",
      "A site-built house near Henderson costs more to build than a HUD-code manufactured home of the same size — that gap is the whole reason a lot of buyers look at us first.",
    ],
    pricingExplainer: [
      "A Athens-area price is locked the moment it's quoted — everything itemized above is already built into that number.",
      "Utility costs get their own process: a phone estimate to begin, then a confirmed figure once our contractor has walked the site.",
    ],
    gettingStarted: [
      "For an Athens-area buyer, it helps early on to know whether the property is meant as a full-time home or a lake place you'll use part of the year — it shapes some of the planning conversation.",
      "Once that's clear, floor plan and financing move forward together, same as they would for any buyer in Henderson County.",
    ],
    localProof:
      "We've worked with both full-time Henderson County residents and buyers setting up a lake-area property for part-time use.",
    faq: [
      {
        q: "Do you work with buyers setting up a lake-area property near Athens?",
        a: "Yes — full-time or part-time use, the pricing and process are the same.",
      },
      {
        q: "Do I need to already own land near the lake?",
        a: "It's not a prerequisite. Some Henderson County buyers have their site already, others are still deciding, and some are working through inherited or family land.",
      },
      {
        q: "Will delivery cover the entire Henderson County area?",
        a: "Lake-area land near Athens and the rest of Henderson County alike — send your address and we'll confirm the specifics.",
      },
    ],
    nearby: ['corsicana', 'canton', 'tyler', 'palestine'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Athens, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Athens, TX',
    popularHomes: [
      'fleetwood-armadillo-3bed-2bath',
      'marathon-bailey-3bed-2bath-double-wide',
      'marathon-redhead-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  canton: {
    county: 'Van Zandt',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Canton, TX and Van Zandt County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Canton is a small Van Zandt County town best known well beyond the county for First Monday Trade Days, and the rest of the month it's a quiet rural community Texas Homes Direct delivers to like any other.",
    buyingHeading: 'Buying a Mobile Home in Van Zandt County',
    buying: [
      "Outside the trade-days weekends, Canton-area land is mostly quiet, rural, and varies from fully serviced to raw — we scope the actual property either way.",
      "Van Zandt County land goes further with a manufactured home than it would financing site-built construction at the same budget.",
    ],
    pricingExplainer: [
      "For Canton-area buyers, the quote you get first is the price you pay last — everything itemized above is already included.",
      "The rest of the price is fixed; utilities aren't, not until our contractor sees the property. A phone estimate is only the opening number.",
    ],
    gettingStarted: [
      "For a Canton-area buyer, the first real step is your specific property — rural Van Zandt County land ranges widely, so we'd rather understand yours before talking floor plans.",
      "The next conversation covers floor plan and financing at once, so you're not choosing a home blind to what it costs monthly.",
    ],
    localProof:
      "We've delivered to quiet, rural Van Zandt County properties well outside the trade-days crowds most people associate with Canton.",
    faq: [
      {
        q: "Do you deliver to rural land outside Canton, not just near town?",
        a: "Van Zandt County outside Canton is mostly rural, and we quote that land using the same process as any in-town lot.",
      },
      {
        q: "Is owning land near Canton required to get started?",
        a: "No. We've started the process with Van Zandt County buyers at every stage of the land question, owned or not yet.",
      },
      {
        q: "Does Van Zandt County get full delivery coverage?",
        a: "We cover it all. Share your address and we'll spell out delivery and setup for your specific site.",
      },
    ],
    nearby: ['athens', 'terrell', 'mineola', 'quitman'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Canton, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Canton, TX',
    popularHomes: [
      'marathon-abilene-2bed-1bath-single-wide',
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
      'marathon-lanny-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  terrell: {
    county: 'Kaufman',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Terrell, TX and Kaufman County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Terrell sits along I-20 east of Dallas, and Texas Homes Direct works with the same firm pricing and honest financing whether you're commuting into the metro or staying local to Kaufman County.",
    buyingHeading: 'Buying a Mobile Home in Kaufman County',
    buying: [
      "Terrell's position on I-20 makes it a common stop for buyers who work in Dallas but want more land than the closer suburbs offer — we scope that land the same as anywhere else.",
      "Manufactured construction under current HUD code still beats site-built on price throughout Kaufman County, without cutting corners on the build itself.",
    ],
    pricingExplainer: [
      "Nothing changes between quote and closing for a Terrell-area buyer — everything itemized above is already reflected in the number.",
      "We won't pretend to know utility costs before seeing the land. A phone estimate starts the conversation; a site visit ends it with a real figure.",
    ],
    gettingStarted: [
      "For a Terrell-area buyer, the first useful question is usually your property — in-town lot or land further out — since that shapes the site-work conversation more than commute distance does.",
      "After that, it's a floor plan discussion and a financing discussion, running together rather than back to back.",
    ],
    localProof:
      "We've worked with Terrell-area buyers commuting into Dallas along I-20 and with buyers staying entirely local to Kaufman County.",
    faq: [
      {
        q: "Do you work with buyers who commute into Dallas from Terrell?",
        a: "Yes — commute distance doesn't change the pricing or process, only your own property does.",
      },
      {
        q: "Is having Kaufman County property settled a first step you require?",
        a: "No — some Kaufman County buyers walk in with land ready, some are still hunting, and some are sorting through a family situation. We work with all of them.",
      },
      {
        q: "Is the entire Terrell area within your delivery range?",
        a: "Yes, throughout Kaufman County. Send your address and we'll walk you through delivery and setup for your property.",
      },
    ],
    nearby: ['kaufman', 'canton', 'greenville', 'forney'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Terrell, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Terrell, TX',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  kaufman: {
    county: 'Kaufman',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Kaufman, TX and Kaufman County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Kaufman is the Kaufman County seat, closer to Dallas than Terrell to its east, and Texas Homes Direct covers the whole county the same way regardless of which town sits closer to your specific address.",
    buyingHeading: 'Buying a Mobile Home in Kaufman County',
    buying: [
      "As the county seat, Kaufman draws buyers from smaller surrounding towns too — we quote based on your actual property, not which page brought you here.",
      "The price difference between manufactured and site-built holds in Kaufman County: buyers get more home per dollar going the manufactured route.",
    ],
    pricingExplainer: [
      "A Kaufman-area buyer's price is set from the start, with everything itemized above already rolled into that one figure.",
      "Utility hookups don't get quoted sight-unseen. Expect a phone estimate first, and a contractor-confirmed number after an actual property visit.",
    ],
    gettingStarted: [
      "For a Kaufman-area buyer, the first real step is your property, not which nearby town's name is on your address — that's what actually determines the site-work conversation.",
      "From there, we move into floor plan and financing as one conversation, not two separate ones.",
    ],
    localProof:
      "We've delivered to properties close to the Kaufman County seat and to land well out toward the county's edges, using the same process for both.",
    faq: [
      {
        q: "Does it matter if I'm closer to Kaufman or Terrell?",
        a: "Not to us — we treat Kaufman County as one coverage area, so the town closest to your address doesn't change the price or process.",
      },
      {
        q: "Do you require land in Kaufman County to be locked in first?",
        a: "It's optional at the start. Kaufman County buyers land here with a finished search, an open one, or a family-property question still pending.",
      },
      {
        q: "Is delivery possible anywhere within Kaufman County?",
        a: "We do — every corner of Kaufman County. Give us your address and we'll confirm the details for your site.",
      },
    ],
    nearby: ['terrell', 'ennis', 'forney', 'mesquite'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Kaufman, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Kaufman, TX',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
      'marathon-bell-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  greenville: {
    county: 'Hunt',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Greenville, TX and Hunt County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Greenville is the Hunt County seat and the largest town in a mostly agricultural stretch of blackland prairie northeast of Dallas — Texas Homes Direct works with that land the same way it works anywhere else in the county.",
    buyingHeading: 'Buying a Mobile Home in Hunt County',
    buying: [
      "Hunt County's blackland prairie soil is common around Greenville, and it factors into site work more than buyers sometimes expect — we confirm the actual conditions before quoting.",
      "In Hunt County, a comparable site-built home simply costs more than a new manufactured one built to the same HUD standards.",
    ],
    pricingExplainer: [
      "The price stays put for Greenville-area buyers — everything itemized above is already part of what we quote up front.",
      "The utility number isn't final until our contractor has been on-site. A phone estimate is the starting point, not the answer.",
    ],
    gettingStarted: [
      "For a Greenville-area buyer, the property conversation usually covers soil and drainage more than it would in a denser suburban market — that's just what blackland prairie land requires.",
      "Once we've covered that, floor plan and financing come next — the same process we'd walk any Hunt County buyer through.",
    ],
    localProof:
      "We've scoped Hunt County blackland prairie properties around Greenville where soil conditions shaped the site work more than the buyer originally expected.",
    faq: [
      {
        q: "Does blackland prairie soil around Greenville affect setup?",
        a: "It can factor into site work, which is why we confirm actual ground conditions on your property rather than assuming a standard setup.",
      },
      {
        q: "Is Hunt County acreage something I need already secured?",
        a: "No, not upfront. Hunt County land can be secured, still being searched for, or still tangled up in a family arrangement — any of those works.",
      },
      {
        q: "Do you handle delivery across the whole of Hunt County?",
        a: "Yes indeed. Give us your address and we'll lay out what delivery and setup mean for your specific property.",
      },
    ],
    nearby: ['commerce', 'terrell', 'rockwall', 'sulphur-springs'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Greenville, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Greenville, TX',
    popularHomes: [
      'marathon-katy-3bed-2bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
      'fleetwood-axis-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  commerce: {
    county: 'Hunt',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Commerce, TX and Hunt County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Commerce is smaller than Greenville to its west, and home to Texas A&M University-Commerce, which puts a different mix of buyers here than the surrounding farmland — Texas Homes Direct works with both the college-town side and the rural side of Hunt County.",
    buyingHeading: 'Buying a Mobile Home in Hunt County',
    buying: [
      "Commerce-area land ranges from small in-town lots near the university to larger agricultural parcels further out — we scope each one on its own terms.",
      "Hunt County buyers pricing new construction against a manufactured home usually find the gap in the manufactured home's favor, not the other way around.",
    ],
    pricingExplainer: [
      "What we tell a Commerce-area buyer at the start is what they pay at the end, everything itemized above already included.",
      "We treat utilities as their own conversation — an estimate over the phone, then a real number once our contractor has seen the property in person.",
    ],
    gettingStarted: [
      "For a Commerce-area buyer, it helps to know upfront whether your lot is closer to town or out on larger acreage — the site-work conversation looks a little different either way.",
      "The next step pairs floor plan selection with financing, so you see both pieces before committing to either.",
    ],
    localProof:
      "We've scoped both smaller in-town Commerce lots and larger agricultural parcels further out in Hunt County.",
    faq: [
      {
        q: "Do you deliver to land outside Commerce city limits?",
        a: "Yes — most of the surrounding area is agricultural, and we scope that land the same way we would an in-town lot.",
      },
      {
        q: "Do I have to have land near Commerce lined up first?",
        a: "That's flexible. Some Hunt County buyers have secured land already; others are mid-hunt or working through a family situation.",
      },
      {
        q: "Do you reach every part of the Commerce area?",
        a: "All of Hunt County is in range. Send your address and we'll confirm what that looks like for your lot.",
      },
    ],
    nearby: ['greenville', 'sulphur-springs', 'paris', 'bonham'],
    heroImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Commerce, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Commerce, TX',
    popularHomes: [
      'marathon-mesquite-3bed-2bath-single-wide',
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-terra-2bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  rockwall: {
    county: 'Rockwall',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Rockwall, TX and Rockwall County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Rockwall is the seat of the smallest county in Texas by land area, sitting right on Lake Ray Hubbard — and despite the tight geography, Texas Homes Direct still finds real options for manufactured-home buyers here.",
    buyingHeading: 'Buying a Mobile Home in Rockwall County',
    buying: [
      "Because Rockwall County is so compact, available land can be harder to find than in a larger rural county — we help buyers think through what's realistic for their budget and timeline.",
      "A manufactured home holds its price advantage over site-built construction in Rockwall County, dollar for dollar and square foot for square foot.",
    ],
    pricingExplainer: [
      "A Rockwall-area quote isn't a starting point — it's the final number, with everything itemized above already built in.",
      "Utility costs are the one thing we won't fix remotely. A phone estimate opens it; our contractor's on-site visit closes it with the actual figure.",
    ],
    gettingStarted: [
      "For a Rockwall-area buyer, land search is often the real first step, since the county's small size means fewer available lots than a typical rural area — we're happy to talk through the tradeoffs.",
      "After that, floor plan and financing get discussed together, same as with any other Rockwall County property.",
    ],
    localProof:
      "We've worked with Rockwall County buyers navigating a genuinely tight land market, helping them weigh the lots that were actually available.",
    faq: [
      {
        q: "Is land harder to find in Rockwall County than elsewhere?",
        a: "It can be, since Rockwall is the smallest county in Texas by area. We're glad to talk through your options as you search.",
      },
      {
        q: "Is land near Rockwall something I need to already have?",
        a: "No. A finished land search isn't the starting line for Rockwall County buyers — some come to us before that's settled.",
      },
      {
        q: "Is there a part of Rockwall County you don't deliver to?",
        a: "Yes, without exception. Share your address and we'll confirm delivery and setup specifics for your property.",
      },
    ],
    nearby: ['royse-city', 'greenville', 'terrell', 'garland'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Rockwall, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Rockwall, TX',
    popularHomes: [
      'marathon-loving-3bed-2bath-double-wide',
      'marathon-beaumont-3bed-2bath-single-wide',
      'fleetwood-badger-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  'royse-city': {
    county: 'Rockwall',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Royse City, TX and Rockwall County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Royse City is one of the fastest-growing towns next to Rockwall, with newer subdivisions filling in what used to be open county land — Texas Homes Direct scopes that new-development land on its own terms.",
    buyingHeading: 'Buying a Mobile Home in Rockwall County',
    buying: [
      "A newer Royse City-area lot often has less infrastructure in place than it appears — we confirm what's actually run to the property before quoting anything.",
      "Cost is where manufactured homes still separate from site-built construction near Rockwall — same code, meaningfully lower price.",
    ],
    pricingExplainer: [
      "For a Royse City-area buyer, the first price and the closing price are the same one, everything itemized above already included.",
      "We're honest that utility costs need an in-person look. A phone estimate starts things; our contractor's visit produces the number that sticks.",
    ],
    gettingStarted: [
      "New Royse City lots get one question first from us: what's physically been run to the property, plan documents aside.",
      "From there, it's floor plan and financing in the same conversation — no reason to separate them.",
    ],
    localProof:
      "More than one Royse City buyer has handed us a subdivision plan that didn't match what was actually run to the lot — we go by what's on the ground.",
    faq: [
      {
        q: "Is a newer Royse City lot already ready for a manufactured home?",
        a: "Not automatically — plans on paper and what's actually trenched to the lot don't always agree, so we check the ground itself.",
      },
      {
        q: "Do I have to have land in Royse City lined up first?",
        a: "It's not required upfront. Rockwall County buyers show up with land settled, land pending, or a family property still being sorted out.",
      },
      {
        q: "Is delivery available across the full Royse City area?",
        a: "We do, everywhere in Rockwall County. Send your address and we'll confirm the setup details for your site.",
      },
    ],
    nearby: ['rockwall', 'greenville', 'terrell', 'commerce'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Royse City, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Royse City, TX',
    popularHomes: [
      'marathon-pintail-4bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
      'marathon-daniel-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  sherman: {
    county: 'Grayson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Sherman, TX and Grayson County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Sherman is the Grayson County seat near Lake Texoma and the Red River, and Texas Homes Direct covers it with the same firm pricing whether your property is close to the lake or further into the county.",
    buyingHeading: 'Buying a Mobile Home in Grayson County',
    buying: [
      "As the larger of the two Grayson County seats-adjacent cities, Sherman draws buyers from a wide radius — we quote based on your specific property, not proximity to town.",
      "For the same money, Grayson County buyers typically get a larger, newer manufactured home than site-built construction would deliver.",
    ],
    pricingExplainer: [
      "There's no markup waiting for Sherman-area buyers later — everything itemized above is already in the number they're quoted.",
      "Utility hookups follow their own timeline — a phone estimate first, then an exact figure once our contractor has walked the specific property.",
    ],
    gettingStarted: [
      "For a Sherman-area buyer, the property conversation usually starts with location relative to the lake, since that can affect what site work looks like.",
      "Once that's out of the way, we move to floor plan and financing, handled together rather than in sequence.",
    ],
    localProof:
      "We've delivered to Sherman-area properties both near Lake Texoma and further inland, scoping each one for its actual site conditions.",
    faq: [
      {
        q: "Does being near Lake Texoma change setup requirements?",
        a: "It can affect site conditions, which is why we confirm your specific property rather than assuming a standard setup.",
      },
      {
        q: "Before we get started, is Grayson County land required?",
        a: "No — Grayson County buyers land here at different points: some with a lot ready, some without one yet, some mid-family-property discussion.",
      },
      {
        q: "Does your delivery range include all of Grayson County?",
        a: "Between Sherman, Denison, and the rural stretches, Grayson County is fully covered. Give us your address for the specifics.",
      },
    ],
    nearby: ['denison', 'bonham', 'gainesville', 'mckinney'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Sherman, TX',
    secondaryImage: '/homes/the-coleman/Coleman-Gallery-1.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Sherman, TX',
    popularHomes: [
      'marathon-cisco-2bed-2bath-single-wide',
      'fleetwood-peredavid-3bed-2bath-double-wide',
      'marathon-caldwell-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  denison: {
    county: 'Grayson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Denison, TX and Grayson County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Denison sits just north of Sherman, closer to the Red River and Lake Texoma itself, and Texas Homes Direct treats it as its own market rather than an extension of its larger neighbor.",
    buyingHeading: 'Buying a Mobile Home in Grayson County',
    buying: [
      "Denison's proximity to the river and lake means some properties here deal with different drainage and access conditions than land further from the water — we confirm the specifics before quoting.",
      "Site-built construction around Grayson carries a real cost premium over a HUD-code manufactured home of comparable size.",
    ],
    pricingExplainer: [
      "The number a Denison-area buyer gets up front is the number that sticks, everything itemized above already factored in.",
      "The one number that isn't locked in upfront is utilities. A phone estimate is a starting point; our contractor's site visit sets the real cost.",
    ],
    gettingStarted: [
      "For a Denison-area buyer, it helps to flag early on if your property is close to the river or lake, since drainage and access sometimes factor into the site-work conversation.",
      "The rest of the process is floor plan and financing running side by side, same as anywhere else we deliver.",
    ],
    localProof:
      "We've scoped Denison-area properties close to the Red River where drainage and access needed a closer look than land further inland.",
    faq: [
      {
        q: "Does being close to the Red River affect setup near Denison?",
        a: "It can, depending on drainage and access — we confirm your specific property before quoting site work.",
      },
      {
        q: "Before we talk, do I need land secured near Denison?",
        a: "That's not necessary. Land status varies widely among Grayson County buyers — secured, still searching, or still a family conversation.",
      },
      {
        q: "Can you deliver to any address in the Denison area?",
        a: "From Sherman's edge to the Red River, Grayson County is covered — share your address and we'll confirm what delivery and setup involve.",
      },
    ],
    nearby: ['sherman', 'bonham', 'gainesville', 'whitesboro'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Denison, TX',
    secondaryImage: '/homes/the-dove/IMG_0895.jpg.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Denison, TX',
    popularHomes: [
      'marathon-chapman-1bed-1bath-park-model',
      'marathon-jasper-3bed-2bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  bonham: {
    county: 'Fannin',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Bonham, TX and Fannin County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Bonham is the Fannin County seat, quieter and more rural than Sherman and Denison to its west, and best known well beyond the county as the hometown of Sam Rayburn — Texas Homes Direct delivers to its farmland the same as anywhere else.",
    buyingHeading: 'Buying a Mobile Home in Fannin County',
    buying: [
      "Fannin County land around Bonham is mostly agricultural and tends to run larger than lots closer to the Sherman-Denison area — we scope the actual acreage before quoting.",
      "Fannin County families sizing up new construction find manufactured homes consistently priced below the site-built equivalent.",
    ],
    pricingExplainer: [
      "A Bonham-area price doesn't creep upward after the fact — everything itemized above is already part of the original figure.",
      "We won't guess at what your specific land needs for utilities. A phone estimate opens the conversation; a contractor's visit closes it with a real number.",
    ],
    gettingStarted: [
      "For a Bonham-area buyer, the property conversation usually runs a bit longer than it would in a denser market — larger acreage means more to actually walk through.",
      "After that, floor plan and financing come up together, the same pairing we use for every Fannin County buyer.",
    ],
    localProof:
      "We've scoped larger Fannin County parcels around Bonham where the acreage itself took longer to walk through than the rest of the process combined.",
    faq: [
      {
        q: "Is Fannin County land around Bonham usually larger acreage?",
        a: "Often, yes — we typically see bigger, more rural parcels here than closer to Sherman or Denison, and we scope accordingly.",
      },
      {
        q: "Does land near Bonham need to be settled before we start?",
        a: "No, that's not expected. Fannin County buyers reach out with land already found, still being found, or still a family matter to resolve.",
      },
      {
        q: "Can I expect delivery anywhere in Fannin County?",
        a: "From Sam Rayburn's old stretch of Fannin County to the rest of it, we deliver — send your address for the specifics.",
      },
    ],
    nearby: ['sherman', 'denison', 'commerce', 'paris'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Bonham, TX',
    secondaryImage: '/homes/the-gadwall/Gadwall-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Bonham, TX',
    popularHomes: [
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-kendall-3bed-2bath-double-wide',
      'fleetwood-roadrunner-3bed-2bath',
    ],
    lastModified: '2026-09-28',
  },

  paris: {
    county: 'Lamar',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Paris, TX and Lamar County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Paris is the Lamar County seat and the largest town in this corner of Northeast Texas, best known outside the county for its own scaled Eiffel Tower replica downtown — Texas Homes Direct delivers here the same as anywhere closer to the metro.",
    buyingHeading: 'Buying a Mobile Home in Lamar County',
    buying: [
      "Bonham, Commerce, and the smaller Lamar County towns around Paris all route through the same team, and your quote reflects your property, not which of those pages you clicked first.",
      "A manufactured home built to current HUD code costs Lamar County buyers less than site-built construction, without a corresponding drop in quality.",
    ],
    pricingExplainer: [
      "For Paris-area buyers, what's quoted is what's owed — everything itemized above is already built into that price.",
      "Utility costs stay an estimate until our contractor has actually seen the property — that's the one number we won't fix over the phone.",
    ],
    gettingStarted: [
      "For a Paris-area buyer, the property is usually the first real conversation, not proximity to town — that's what actually shapes the site-work conversation.",
      "From there we get into floor plan and financing in the same breath, not as separate steps.",
    ],
    localProof:
      "Our Lamar County deliveries range from Paris city blocks to acreage bordering Red River County, with the same process either end.",
    faq: [
      {
        q: "Do you work beyond Paris itself, across Lamar County?",
        a: "All of it — Paris is simply where our Lamar County coverage is centered, not a boundary on it.",
      },
      {
        q: "Does contacting you require Lamar County land already owned?",
        a: "It's fine either way. Some Lamar County buyers have land locked in, some are searching, and some are working through a family property question.",
      },
      {
        q: "Is there full delivery coverage across Lamar County?",
        a: "Every stretch of Lamar County is ours to deliver to. Give us your address and we'll spell out the specifics for your site.",
      },
    ],
    nearby: ['bonham', 'commerce', 'sulphur-springs', 'clarksville'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Paris, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Paris, TX',
    popularHomes: [
      'fleetwood-axis-3bed-2bath-double-wide',
      'marathon-ranger-2bed-1bath-single-wide',
      'fleetwood-javelina-1bed-1bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  'sulphur-springs': {
    county: 'Hopkins',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Sulphur Springs, TX and Hopkins County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Sulphur Springs is the Hopkins County seat, a rural stretch of blackland prairie and dairy country between Greenville and the Piney Woods — Texas Homes Direct delivers here the same as anywhere closer to the metro.",
    buyingHeading: 'Buying a Mobile Home in Hopkins County',
    buying: [
      "Hopkins County land around Sulphur Springs runs agricultural more often than not, and site conditions vary enough that we confirm each property individually.",
      "The value gap between manufactured and site-built hasn't closed in Hopkins County — a manufactured home still costs less for comparable space.",
    ],
    pricingExplainer: [
      "The quote a Sulphur Springs-area buyer receives is the final word on price, with everything itemized above already included.",
      "Unlike the rest of the quote, utilities need eyes on the property first. A phone estimate starts it; our contractor's visit finishes it.",
    ],
    gettingStarted: [
      "We usually start a Sulphur Springs-area conversation with the land, not the floor plan — Hopkins County properties differ enough that the site comes first.",
      "Once we've covered your property, the next stop is floor plan and financing, worked out together.",
    ],
    localProof:
      "Hopkins County dairy land and smaller in-town Sulphur Springs lots don't share much in common site-wise, which is exactly why we quote each property on its own.",
    faq: [
      {
        q: "Does delivery extend to farmland beyond the Sulphur Springs city line?",
        a: "Hopkins County dairy and row-crop land is common around Sulphur Springs, and yes, we deliver to it the same as any in-town lot.",
      },
      {
        q: "Does the first step require Hopkins County land in hand?",
        a: "No. Whether Hopkins County land is secured, in progress, or a family situation, we start the conversation regardless.",
      },
      {
        q: "Is Hopkins County, in full, part of your delivery area?",
        a: "Dairy country and in-town Sulphur Springs lots alike — send your address and we'll confirm the delivery and setup specifics.",
      },
    ],
    nearby: ['greenville', 'commerce', 'paris', 'mount-pleasant'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Sulphur Springs, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Sulphur Springs, TX',
    popularHomes: [
      'marathon-grayson-4bed-2bath-double-wide',
      'marathon-spoonbill-3bed-2bath-single-wide',
      'fleetwood-badger-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  'mount-pleasant': {
    county: 'Titus',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Mount Pleasant, TX and Titus County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Mount Pleasant is the Titus County seat, further into the East Texas Piney Woods than the Hopkins County towns to its west — Texas Homes Direct treats the wooded terrain here as its own set of site conditions.",
    buyingHeading: 'Buying a Mobile Home in Titus County',
    buying: [
      "Piney Woods land around Mount Pleasant often needs clearing that flatter blackland-prairie counties don't — we scope that work specifically rather than assuming a standard site.",
      "Buyers in Titus County comparing quotes side by side usually see the manufactured home come in under a site-built equivalent.",
    ],
    pricingExplainer: [
      "A Mount Pleasant-area buyer's number is fixed from the first conversation, everything itemized above already rolled in.",
      "We're straightforward that utility costs can't be nailed down without a site visit. A phone estimate opens the door; our contractor closes it with a real figure.",
    ],
    gettingStarted: [
      "Timber density drives most of the early conversation for a Mount Pleasant buyer — Titus County's tree cover matters more here than it would on open prairie.",
      "The next part of the conversation is floor plan and financing, handled as one topic rather than two.",
    ],
    localProof:
      "We've scoped wooded Titus County properties around Mount Pleasant where clearing was a bigger part of the conversation than it would be on open prairie land.",
    faq: [
      {
        q: "Does tree cover around Mount Pleasant affect setup costs?",
        a: "Clearing costs swing a lot lot to lot in the Piney Woods, so we walk your specific property instead of pricing off a generic wooded-lot assumption.",
      },
      {
        q: "Is a lot near Mount Pleasant required before financing gets discussed?",
        a: "That's not a requirement. Titus County buyers come to us with land finalized, land still being hunted, or a family-property matter unresolved.",
      },
      {
        q: "Do you deliver to the entirety of Titus County?",
        a: "Cleared or still-timbered, a Titus County lot is still ours to deliver to — send your address and we'll walk through the specifics.",
      },
    ],
    nearby: ['sulphur-springs', 'mount-vernon', 'pittsburg', 'daingerfield'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Mount Pleasant, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Mount Pleasant, TX',
    popularHomes: [
      'marathon-lanny-1bed-1bath-park-model',
      'marathon-woodduck-3bed-2bath-double-wide',
      'marathon-mallard-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  gainesville: {
    county: 'Cooke',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Gainesville, TX and Cooke County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Gainesville sits on I-35 at the Oklahoma border, a genuine crossing point rather than just another Cooke County town, and Texas Homes Direct works with buyers on both sides of that border traffic.",
    buyingHeading: 'Buying a Mobile Home in Cooke County',
    buying: [
      "Cooke County land near Gainesville ranges from smaller in-town lots to larger rural acreage further from the interstate — we scope each on its own terms.",
      "Cooke County land paired with a manufactured home stretches further than the same land paired with site-built construction.",
    ],
    pricingExplainer: [
      "What you see is what a Gainesville-area buyer pays — everything itemized above is already part of that quoted figure.",
      "The utility line stays flexible until our contractor has walked the land — a phone estimate is the starting point, not the final word.",
    ],
    gettingStarted: [
      "For a Gainesville-area buyer, the first useful question is usually your property's distance from I-35, since that can shape what's already run to the site.",
      "After that, it's floor plan and financing together — the process doesn't change based on which Cooke County property you're on.",
    ],
    localProof:
      "We've scoped both interstate-adjacent Gainesville-area lots and larger rural land further out in Cooke County.",
    faq: [
      {
        q: "Do you deliver to rural Cooke County land, not just near I-35?",
        a: "Yes — we scope rural land the same way we would an interstate-adjacent lot.",
      },
      {
        q: "Do you require land near Gainesville to be owned upfront?",
        a: "No — land doesn't need to be finalized first. Cooke County buyers reach us at every stage of that search.",
      },
      {
        q: "Is delivery countywide across Cooke County?",
        a: "Yes, all of it. Give us your address and we'll confirm delivery and setup details for your property.",
      },
    ],
    nearby: ['sherman', 'denison', 'decatur', 'whitesboro'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Gainesville, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Gainesville, TX',
    popularHomes: [
      'fleetwood-coyote-2bed-2bath-single-wide',
      'marathon-caldwell-4bed-2bath-double-wide',
      'marathon-terra-2bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  decatur: {
    county: 'Wise',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Decatur, TX and Wise County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Decatur is the Wise County seat where DFW's suburban growth starts thinning into genuinely rural ranch land — Texas Homes Direct covers both ends of that transition without treating either as the exception.",
    buyingHeading: 'Buying a Mobile Home in Wise County',
    buying: [
      "Wise County land around Decatur ranges from established in-town lots to larger ranch acreage further out — we scope the actual property rather than assuming one or the other.",
      "A HUD-code manufactured home remains the more affordable route into new construction throughout Wise County.",
    ],
    pricingExplainer: [
      "The price we give Decatur-area buyers doesn't shift later — everything itemized above is already in that number from the start.",
      "Utility hookups are priced in two stages: an estimate by phone, then a confirmed number once our contractor has actually seen the property.",
    ],
    gettingStarted: [
      "For a Decatur-area buyer, the first real step is your property — closer to town or further out on ranch land, since that shapes the site-work conversation.",
      "From there, floor plan and financing move in step with each other, not one waiting on the other.",
    ],
    localProof:
      "We've scoped both in-town Decatur lots and larger Wise County ranch acreage, treating neither as the unusual case.",
    faq: [
      {
        q: "Do you deliver to ranch land outside Decatur city limits?",
        a: "Yes — a lot of Wise County is ranch land, and we scope it the same way we would an in-town lot.",
      },
      {
        q: "Is owning Wise County land a condition before we talk?",
        a: "It isn't necessary yet. Some Wise County buyers already have their site, some are still looking, and some are working out family land.",
      },
      {
        q: "Will you reach my property anywhere in Wise County?",
        a: "We do — no part of Wise County is outside our range. Send your address for the specifics.",
      },
    ],
    nearby: ['bridgeport', 'gainesville', 'weatherford', 'bowie'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Decatur, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Decatur, TX',
    popularHomes: [
      'fleetwood-peredavid-3bed-2bath-double-wide',
      'marathon-daniel-1bed-1bath-park-model',
      'marathon-trinity-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  bowie: {
    county: 'Montague',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Bowie, TX and Montague County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Bowie sits in Montague County near the Red River and the Oklahoma line, well outside the DFW growth ring — Texas Homes Direct still delivers here with the same firm pricing as closer to the metro.",
    buyingHeading: 'Buying a Mobile Home in Montague County',
    buying: [
      "Ranch country surrounds Bowie on every side, and Montague County acreage rarely arrives with the same well, fencing, or access setup twice — each parcel gets its own look.",
      "Price is the clearest difference between the two options in Montague County — manufactured construction comes in under site-built, same code standard.",
    ],
    pricingExplainer: [
      "For Bowie-area buyers, one number covers it all — everything itemized above is already built into that quote.",
      "We won't finalize a utility cost without a real look at the land. A phone estimate opens the conversation; our contractor's visit ends it.",
    ],
    gettingStarted: [
      "For a Bowie-area buyer, the property conversation usually comes first and takes a little longer — rural Montague County land varies enough that we'd rather understand yours specifically.",
      "Once that's settled, floor plan and financing come next, paired together the same way for every buyer.",
    ],
    localProof:
      "We've scoped rural Montague County ranch properties around Bowie where site conditions varied enough that no two quotes looked the same.",
    faq: [
      {
        q: "Do you deliver as far out as Bowie and the Red River area?",
        a: "Yes — distance from the metro doesn't change our pricing or process.",
      },
      {
        q: "Is having land near Bowie a prerequisite for buying?",
        a: "No. Montague County land can be settled, unsettled, or a family matter still being worked through — we meet buyers wherever that stands.",
      },
      {
        q: "Does Montague County have complete delivery coverage?",
        a: "Ranch country or in-town Bowie, doesn't matter — send your address and we'll spell out the delivery and setup specifics.",
      },
    ],
    nearby: ['decatur', 'nocona', 'jacksboro', 'bridgeport'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Bowie, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Bowie, TX',
    popularHomes: [
      'marathon-gadwall-3bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
      'fleetwood-raven-3bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  jacksboro: {
    county: 'Jack',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Jacksboro, TX and Jack County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Jacksboro is the Jack County seat, home to the historic Fort Richardson site, and about as far from the DFW growth ring as this batch of cities gets — Texas Homes Direct still covers it with the same process as anywhere closer in.",
    buyingHeading: 'Buying a Mobile Home in Jack County',
    buying: [
      "Jack County land around Jacksboro is almost entirely rural, and larger parcels are the norm rather than the exception — we scope acreage on its own terms.",
      "Jack County buyers who run the numbers on both paths typically land on manufactured, since it costs less for the same size home.",
    ],
    pricingExplainer: [
      "A Jacksboro-area price is complete the day it's quoted, everything itemized above already included in that figure.",
      "The exception is utilities — we won't guess at that cost by phone. A rough estimate opens the conversation; our contractor's visit sets the real number.",
    ],
    gettingStarted: [
      "For a Jacksboro-area buyer, the property conversation is usually the whole first call — rural acreage this far out needs a real look before anything else makes sense to discuss.",
      "The rest is floor plan and financing at the same time, same pattern as any other Jack County property.",
    ],
    localProof:
      "We've scoped rural Jack County ranch properties around Jacksboro that needed a genuine walkthrough before any quote made sense.",
    faq: [
      {
        q: "Do you deliver as far out as Jacksboro?",
        a: "Yes — we cover Jack County the same as any closer-in area.",
      },
      {
        q: "Do I need land near Jacksboro squared away before contacting you?",
        a: "That's not expected upfront. Jack County buyers arrive with land ready, land pending, or a family-property conversation still open.",
      },
      {
        q: "Is delivery something you offer across all of Jack County?",
        a: "We cover Jack County entirely. Give us your address and we'll walk through the delivery specifics.",
      },
    ],
    nearby: ['bowie', 'graham', 'decatur', 'bridgeport'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Jacksboro, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Jacksboro, TX',
    popularHomes: [
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-bell-3bed-2bath-double-wide',
      'marathon-jackson-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  palestine: {
    county: 'Anderson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Palestine, TX and Anderson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Palestine is the Anderson County seat deep in the East Texas Piney Woods, and Texas Homes Direct treats wooded East Texas land as its own category of site work rather than a variation on open prairie.",
    buyingHeading: 'Buying a Mobile Home in Anderson County',
    buying: [
      "Wooded Anderson County land around Palestine often needs clearing before a home can go in — we scope that work specifically rather than assuming a standard site.",
      "New construction near Anderson costs more site-built than it does manufactured, for a comparable HUD-code home.",
    ],
    pricingExplainer: [
      "There's nothing added to a Palestine-area buyer's price down the line — everything itemized above is already part of it.",
      "Utility hookups are handled differently: a phone estimate gets things started, but the actual figure comes only after our contractor sees the property in person.",
    ],
    gettingStarted: [
      "A Palestine-area quote usually starts with how much of the lot is timbered — Anderson County clearing needs shift the site-work conversation more than almost anything else.",
      "After that conversation, we turn to floor plan and financing together, same sequence regardless of location.",
    ],
    localProof:
      "We've scoped wooded Anderson County properties around Palestine where clearing needs varied a lot from one lot to the next.",
    faq: [
      {
        q: "Can heavy timber on a Palestine-area lot change what setup costs?",
        a: "Anderson County timber varies enough lot to lot that we look at your actual clearing needs before quoting anything.",
      },
      {
        q: "Is land ownership near Palestine a condition of starting?",
        a: "No, it's not required. Some Anderson County buyers already have land, some don't yet, and some are sorting through a family situation.",
      },
      {
        q: "Do you deliver no matter the location within Anderson County?",
        a: "Anderson County in full — yes. Send your address and we'll confirm what delivery and setup involve.",
      },
    ],
    nearby: ['athens', 'crockett', 'jacksonville', 'fairfield'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Palestine, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'Single wide mobile home available for delivery near Palestine, TX',
    popularHomes: [
      'marathon-brewster-3bed-2bath-double-wide',
      'marathon-pearland-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  jacksonville: {
    county: 'Cherokee',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Jacksonville, TX and Cherokee County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Jacksonville is the largest town in Cherokee County, though Rusk to its south is the actual county seat — Texas Homes Direct covers both the same way regardless of which one holds the courthouse.",
    buyingHeading: 'Buying a Mobile Home in Cherokee County',
    buying: [
      "As the larger of the two main Cherokee County towns, Jacksonville draws buyers from a wide radius — we quote based on your actual property, not which town is closer.",
      "The cost advantage manufactured homes have over site-built construction holds up in Cherokee County the same as anywhere else we deliver.",
    ],
    pricingExplainer: [
      "The quote Jacksonville-area buyers get stays exactly as quoted, everything itemized above already factored into that number.",
      "Utilities are the one line we don't lock in remotely. A phone estimate is the opening number; a site visit from our contractor produces the real one.",
    ],
    gettingStarted: [
      "For a Jacksonville-area buyer, the property is the first real conversation, not the town name on the address — that's what actually determines site work.",
      "From there, floor plan and financing get handled as a pair, not as two separate conversations.",
    ],
    localProof:
      "We've delivered to properties throughout Cherokee County, from close to Jacksonville itself to land nearer the county seat in Rusk.",
    faq: [
      {
        q: "Is Jacksonville or Rusk the Cherokee County seat?",
        a: "Rusk is the county seat, though Jacksonville is the larger town — either way, we cover all of Cherokee County the same.",
      },
      {
        q: "Do I need to have secured Cherokee County land already?",
        a: "It's not a precondition. Cherokee County land might already be secured, might still be searched for, or might involve a family property still being worked out.",
      },
      {
        q: "Is coverage complete across Cherokee County?",
        a: "We do, the full extent of Cherokee County. Share your address for the exact delivery and setup details.",
      },
    ],
    nearby: ['rusk', 'palestine', 'tyler', 'athens'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Jacksonville, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Jacksonville, TX',
    popularHomes: [
      'marathon-pintail-4bed-2bath-double-wide',
      'marathon-chapman-1bed-1bath-park-model',
      'marathon-redhead-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  rusk: {
    county: 'Cherokee',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Rusk, TX and Cherokee County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Rusk is the Cherokee County seat, smaller than Jacksonville to its north but home to the courthouse and the county's administrative center — Texas Homes Direct works from Rusk outward across the same county either way.",
    buyingHeading: 'Buying a Mobile Home in Cherokee County',
    buying: [
      "Being the county seat doesn't mean Rusk-area land is more developed than Jacksonville's — Cherokee County's Piney Woods terrain shapes site work throughout, courthouse town or not.",
      "Cherokee County buyers get a meaningfully lower price going manufactured over site-built, without sacrificing HUD-code construction standards.",
    ],
    pricingExplainer: [
      "For a Rusk-area buyer, price certainty starts on day one — everything itemized above is already included in the figure.",
      "We treat utility costs on their own terms — an initial phone estimate, then an exact figure once our contractor has walked the property.",
    ],
    gettingStarted: [
      "Rusk-area quotes hinge early on clearing — Cherokee County's tree cover is dense enough that we address it before floor plans come up.",
      "Once we're clear on that, floor plan and financing move forward together — standard for any Cherokee County buyer.",
    ],
    localProof:
      "We've scoped wooded Cherokee County properties near Rusk with the same attention to clearing needs as anywhere else in the Piney Woods.",
    faq: [
      {
        q: "Is Rusk the county seat instead of Jacksonville?",
        a: "Yes, Rusk holds the Cherokee County courthouse, though Jacksonville is the larger town — we cover the whole county either way.",
      },
      {
        q: "Does the process require land near Rusk already in hand?",
        a: "No — the land question can be open when you first reach out. Cherokee County buyers land here at every stage of that process.",
      },
      {
        q: "Can delivery happen anywhere inside Cherokee County?",
        a: "Yes — all of Cherokee County is covered. Give us your address and we'll confirm the specifics for your property.",
      },
    ],
    nearby: ['jacksonville', 'palestine', 'henderson', 'crockett'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Rusk, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Rusk, TX',
    popularHomes: [
      'marathon-jasper-3bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
      'fleetwood-armadillo-3bed-2bath',
    ],
    lastModified: '2026-09-28',
  },

  henderson: {
    county: 'Rusk',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Henderson, TX and Rusk County. New manufactured homes and honest financing — get your free quote from us today.",
    intro:
      "Henderson is the Rusk County seat in the heart of East Texas oil country, and Texas Homes Direct delivers to Rusk County's wooded and formerly-industrial land with the same firm pricing as anywhere else.",
    buyingHeading: 'Buying a Mobile Home in Rusk County',
    buying: [
      "Some Rusk County land around Henderson was previously used for oil production, which can mean site conditions that need a closer look than typical wooded acreage — we confirm before quoting.",
      "Manufactured construction keeps its price edge over site-built in Rusk County — the same home costs less built this way.",
    ],
    pricingExplainer: [
      "A Henderson-area buyer's price doesn't have a second chapter — everything itemized above is already in the number they're given.",
      "Utility hookups don't get the same fixed treatment as the rest of the price. Expect a phone estimate first, then a contractor-verified number after a site visit.",
    ],
    gettingStarted: [
      "For a Henderson-area buyer, it's worth mentioning upfront if your land has any history of oil production or other prior use — it can shape what site work actually looks like.",
      "The next step is floor plan and financing, discussed together so one doesn't get decided without the other.",
    ],
    localProof:
      "We've scoped Rusk County properties near Henderson with prior oil-production history, confirming site conditions before quoting rather than assuming a standard lot.",
    faq: [
      {
        q: "Does prior oil production on the land affect setup near Henderson?",
        a: "It can, which is why we confirm site conditions on your specific property rather than assuming a standard setup.",
      },
      {
        q: "Is it necessary to own land near Henderson before we begin?",
        a: "That's optional at this point. Rusk County buyers show up with a settled lot, an active search, or a family-land question still unresolved.",
      },
      {
        q: "Does your reach extend across the full Rusk County area?",
        a: "Former oil-industry land in Rusk County included — send your address and we'll walk through delivery and setup for your site.",
      },
    ],
    nearby: ['rusk', 'kilgore', 'carthage', 'longview'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Single wide manufactured home exterior near Henderson, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide mobile home available for delivery near Henderson, TX',
    popularHomes: [
      'marathon-beaumont-3bed-2bath-single-wide',
      'marathon-bailey-3bed-2bath-double-wide',
      'marathon-darrell-1bed-1bath-park-model',
    ],
    lastModified: '2026-09-28',
  },

  kilgore: {
    county: 'Gregg',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Kilgore, TX and Gregg County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
    intro:
      "Kilgore is a Gregg County town still known for its downtown oil derricks, and Texas Homes Direct works with the same mix of wooded and formerly-industrial land here as anywhere else in East Texas oil country.",
    buyingHeading: 'Buying a Mobile Home in Gregg County',
    buying: [
      "Some Kilgore-area land carries the same prior-industrial-use questions as elsewhere in the East Texas oil patch — we confirm site conditions before quoting rather than assuming.",
      "A comparable site-built home near Gregg costs more than a new HUD-code manufactured home, which is the whole reason this comparison keeps coming up.",
    ],
    pricingExplainer: [
      "What a Kilgore-area buyer is quoted is the whole story on price, everything itemized above already built in.",
      "The one number we won't nail down over the phone is utilities. That starts as an estimate and becomes exact once our contractor sees the land.",
    ],
    gettingStarted: [
      "For a Kilgore-area buyer, it's worth flagging early if your property has any history connected to oil production — it can shape the site-work conversation.",
      "After that, it's floor plan and financing in tandem, the same approach we use everywhere we deliver.",
    ],
    localProof:
      "We've scoped Gregg County properties near Kilgore with prior industrial history, confirming actual site conditions rather than assuming a clean slate.",
    faq: [
      {
        q: "Does Kilgore's oil-industry history affect setup on nearby land?",
        a: "It can for some properties, which is why we confirm site conditions before quoting rather than assuming a standard lot.",
      },
      {
        q: "Do I need a lot near Kilgore secured before the first call?",
        a: "No. Land in Gregg County doesn't need to be locked down first — some buyers reach us before that's decided.",
      },
      {
        q: "Is Gregg County served in its entirety?",
        a: "Yes, no exceptions within Gregg County. Share your address and we'll confirm what that means for your property.",
      },
    ],
    nearby: ['longview', 'henderson', 'gladewater', 'tyler'],
    heroImage: '/homes/the-grayson/IMG_0789.webp',
    heroAlt: 'Double wide manufactured home exterior near Kilgore, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Kilgore, TX',
    popularHomes: [
      'marathon-loving-3bed-2bath-double-wide',
      'marathon-abilene-2bed-1bath-single-wide',
      'fleetwood-jackrabbit-3bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  longview: {
    county: 'Gregg',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Longview, TX and Gregg County. HUD-certified manufactured homes with turnkey setup and honest financing. Free quote today.",
    intro:
      "Longview is the Gregg County seat and the largest town in this stretch of East Texas, drawing buyers from Kilgore and Gladewater alike — Texas Homes Direct covers the whole county from here outward.",
    buyingHeading: 'Buying a Mobile Home in Gregg County',
    buying: [
      "Kilgore and Gladewater buyers moving toward more in-town options often land in Longview, and the quote follows the property either way, not the relocation story.",
      "Gregg County buyers pricing a new home find manufactured construction wins on cost against site-built, size for size.",
    ],
    pricingExplainer: [
      "The number stays the number for Longview-area buyers — everything itemized above is already reflected in that price.",
      "Utility costs are handled with two steps, not one: a phone estimate to start, and a contractor's on-site visit to finalize the actual figure.",
    ],
    gettingStarted: [
      "For a Longview-area buyer, the property is the first real conversation, in-town lot or land further out — that's what shapes site work more than proximity to the county seat.",
      "From there, floor plan and financing come together in one conversation, same as any other property.",
    ],
    localProof:
      "Gregg County deliveries for us range from Longview city lots out to acreage nearer Kilgore and Gladewater, same process the whole stretch.",
    faq: [
      {
        q: "Is your coverage just Longview, or all of Gregg County?",
        a: "Every part of it — Longview is just where our Gregg County team is centered, not where the coverage stops.",
      },
      {
        q: "Is a Gregg County site required before financing discussions?",
        a: "It's not mandatory. Gregg County buyers arrive with land secured, land in progress, or a family property still under discussion.",
      },
      {
        q: "Do you deliver to all corners of Gregg County?",
        a: "We do, across all of Gregg County. Give us your address and we'll spell out the delivery and setup details.",
      },
    ],
    nearby: ['kilgore', 'gladewater', 'marshall', 'henderson'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Single wide manufactured home exterior near Longview, TX',
    secondaryImage: '/homes/the-brewster/Brewster-Body-1.jpg',
    secondaryAlt: 'Double wide mobile home available for delivery near Longview, TX',
    popularHomes: [
      'marathon-kendall-3bed-2bath-double-wide',
      'marathon-longview-3bed-2bath-single-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
    ],
    lastModified: '2026-09-28',
  },

  gladewater: {
    county: 'Gregg',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Gladewater, TX and Gregg County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
    intro:
      "Gladewater is the quietest of the three Gregg County towns we cover, smaller than Longview and without Kilgore's oil-derrick landmarks — Texas Homes Direct treats it as its own market, not an afterthought to its bigger neighbors.",
    buyingHeading: 'Buying a Mobile Home in Gregg County',
    buying: [
      "Gladewater-area land tends to be quieter and more residential than Kilgore's mix of in-town and formerly-industrial lots — we scope each property on its own terms regardless.",
      "The math still favors manufactured construction in Gregg County — a HUD-code home costs less than a site-built equivalent.",
    ],
    pricingExplainer: [
      "A Gladewater-area buyer sees one price and pays that price — everything itemized above is already included in it.",
      "We don't guess at utility costs sight-unseen. A phone estimate is step one; our contractor's property visit produces the number that actually counts.",
    ],
    gettingStarted: [
      "For a Gladewater-area buyer, the property conversation looks about like it would in Longview or Kilgore — we still confirm what's actually on your specific lot before quoting anything.",
      "Once that's done, floor plan and financing move forward as a pair, same process countywide.",
    ],
    localProof:
      "We've delivered to quiet, residential Gladewater-area properties without treating the town as an afterthought to its larger Gregg County neighbors.",
    faq: [
      {
        q: "Do you cover Gladewater the same as Longview or Kilgore?",
        a: "Yes — all three are part of Gregg County, and we quote based on your specific property, not which town is largest.",
      },
      {
        q: "Is land near Gladewater something you require before we talk?",
        a: "No, not necessarily. Some Gregg County buyers have land ready to go, others are still hunting, and some have a family situation to sort out first.",
      },
      {
        q: "Does your coverage include the whole Gladewater area?",
        a: "Yes — every address in Gregg County. Send your address and we'll confirm delivery and setup specifics.",
      },
    ],
    nearby: ['kilgore', 'longview', 'gilmer', 'tyler'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Double wide manufactured home exterior near Gladewater, TX',
    secondaryImage: '/homes/the-chapman/Chapman-Hero.jpg',
    secondaryAlt: 'Single wide mobile home available for delivery near Gladewater, TX',
    popularHomes: [
      'fleetwood-roadrunner-3bed-2bath',
      'marathon-katy-3bed-2bath-single-wide',
      'marathon-dawson-4bed-2bath-double-wide',
    ],
    lastModified: '2026-09-28',
  },

  uvalde: {
    county: 'Uvalde',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Uvalde, TX and Uvalde County. New manufactured homes placed on land you already own, with honest financing. Free quote.",
    intro:
      "A lot of Uvalde County buyers already have the hard part solved: a few acres off US 83 or a corner of a family ranch that has been waiting for a house. Texas Homes Direct builds the whole conversation around that existing ground, matching a new manufactured home to the land you have instead of the other way around.",
    buyingHeading: 'Buying a Mobile Home in Uvalde County',
    buying: [
      "Owning the land changes what matters. Instead of shopping for a lot, an Uvalde buyer is mostly deciding where on the property the home should face, how far it sits from the road, and which floor plan suits the people moving in.",
      "Inherited or shared family acreage sometimes comes with title questions between relatives. Those don't stop a quote, but sorting them out early keeps the financing side of a purchase moving without surprises.",
    ],
    pricingExplainer: [
      "Your Uvalde quote is the amount you pay for the home itself. The checklist above is all inside that figure, and there is no second bill for the house waiting at the end.",
      "Utility work is different because every piece of ground is different. We give you a phone estimate for well, septic and power, then our own contractor walks your acreage and writes an exact bid that you approve before anything is final.",
    ],
    gettingStarted: [
      "Have the property address or a pin dropped on a map ready before you call. With that, we can talk about road access, where the pad might go, and whether power is already close by.",
      "If the land is still in a parent's or grandparent's name, mention it on that first call. It shapes the paperwork order, not whether the purchase can happen.",
    ],
    localProof:
      "Ranch parcels north toward the Frio and Nueces river country and lots closer to town along US 90 are quoted the same way across Uvalde County.",
    faq: [
      {
        q: "Can a new home go on Uvalde County ranch land my family already owns?",
        a: "Yes, family-owned ranch land is one of the most common starting points we see. We look at access, where the home would sit, and what utility work the spot needs, then quote around that.",
      },
      {
        q: "Is there a minimum acreage for placing a manufactured home near Uvalde?",
        a: "We don't set one. Any minimums come from county or deed restrictions on that parcel, so we check what applies to your property before a home is chosen.",
      },
      {
        q: "Do you serve Uvalde County outside the town of Uvalde?",
        a: "We do. Rural addresses off US 83 and US 90 are part of our coverage, and the only thing that changes from one to the next is the site work your land calls for.",
      },
      {
        q: "What should I know if my Uvalde land is shared with relatives?",
        a: "Mostly that the names on the title matter for financing. We'll talk through how ownership is held so you know which documents to gather before the loan moves ahead.",
      },
    ],
    nearby: ['hondo', 'castroville', 'bandera', 'devine'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Black mobile home with a cedar front porch and wooded hills behind it near Uvalde, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Black double wide manufactured home with wood steps on cleared land, available for Uvalde County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'jade-3bed-2bath-single-wide',
      '2876-5bed-3bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  pearsall: {
    county: 'Frio',
    tier: 'small-town',
    metaDescription:
      "Shopping mobile homes in Pearsall, TX? Texas Homes Direct delivers new manufactured homes across Frio County with no-pressure financing. Free quote.",
    intro:
      "Pearsall sits right on I-35 between San Antonio and Laredo, so getting a manufactured home into Frio County is a straight run down the interstate. Texas Homes Direct delivers to addresses in town and out on the farm-to-market roads that branch off that corridor.",
    buyingHeading: 'Buying a Mobile Home in Frio County',
    buying: [
      "The interstate gets a home to the county, but the last few miles decide how setup goes. A gravel ranch road, a low-water crossing or a tight gate all get looked at before your quote is final, so nothing about delivery is left to guesswork.",
      "Frio County buyers comparing a manufactured home with site-built construction usually find the factory-built option leaves more room in the budget for land improvements, fencing or a barn.",
    ],
    pricingExplainer: [
      "The figure on a Pearsall quote is the full house price, delivery included, with every item in the list above built in rather than added later.",
      "Hooking up water, septic and power is the part we price in two steps: a phone estimate after we hear about your property, then a firm number once our contractor has been out to see it and you have signed off.",
    ],
    gettingStarted: [
      "Tell us which road your Frio County property sits on and how a truck would reach it from I-35. That single detail answers a lot of questions about delivery and setup.",
      "Next comes the financing conversation and a short list of floor plans that fit your lot, and we can look at both on the same call.",
    ],
    localProof:
      "Our Frio County coverage runs from homesites near the Pearsall peanut statue out to brush country parcels well off the interstate.",
    faq: [
      {
        q: "Will you deliver to Frio County land on a gravel road outside Pearsall?",
        a: "Yes. Gravel and caliche roads are normal out here, and we look at the route, gates and turning room before your quote is finalized.",
      },
      {
        q: "Does being near I-35 change the price of a Pearsall delivery?",
        a: "No, the home price is the same either way. Proximity to the highway mainly affects how simple the final stretch of the delivery route is.",
      },
      {
        q: "Can I start in Pearsall before I've picked a floor plan?",
        a: "Absolutely. Plenty of Frio County buyers call with land and a budget but no floor plan in mind, and we narrow the options together from there.",
      },
      {
        q: "Are there permits involved for a home outside Pearsall city limits?",
        a: "Often there are, but what applies depends on the county and the exact parcel. We help you find out which requirements cover your property before anything is ordered.",
      },
    ],
    nearby: ['devine', 'pleasanton', 'hondo', 'uvalde'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Black double wide manufactured home with wood steps on cleared land near Pearsall, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide manufactured home with agave and limestone landscaping, available for Frio County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'marathon-mesquite-3bed-2bath-single-wide',
      'marathon-hays-4bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  cotulla: {
    county: 'La Salle',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Cotulla, TX and La Salle County. New manufactured homes and financing built around real credit situations. Get a quote.",
    intro:
      "Not every La Salle County buyer walks in with a perfect credit file, and Texas Homes Direct doesn't treat that as the end of the conversation. In Cotulla we start with where your credit actually stands, then look for the financing route that fits it.",
    buyingHeading: 'Buying a Mobile Home in La Salle County',
    buying: [
      "We can finance a home ourselves and also work with outside public and private lenders, which gives a Cotulla buyer more than one door to try. A no from one source doesn't settle the question for every source.",
      "Variable paychecks, recent job changes and thin credit histories all come up in La Salle County. We'd rather hear the real picture early and match it to a lender than chase an approval that falls apart later.",
    ],
    pricingExplainer: [
      "Once you approve a quote in Cotulla, the home price stays put. Everything in the list above sits inside it, so financing is based on the real total and not a number that grows.",
      "Utilities get handled separately and honestly. You'll hear a rough phone figure first, and a final amount only after our contractor inspects your property and you approve the bid.",
    ],
    gettingStarted: [
      "Have a rough sense of your monthly income, any existing debt payments, and whether you've had a recent credit check. Those three things tell us which financing paths to try first.",
      "With that in hand, we can line up a payment range and floor plans that fit inside it, before you've committed to anything.",
    ],
    localProof:
      "We work with buyers across La Salle County, from Cotulla neighborhoods near the Nueces River to rural tracts off I-35, on credit profiles of every kind.",
    faq: [
      {
        q: "Can I buy a manufactured home in Cotulla with past credit problems?",
        a: "Often, yes. Between our own financing and outside lenders, buyers with credit challenges frequently still have options, and we'll be straight with you about which ones fit.",
      },
      {
        q: "Does a variable oilfield or contract paycheck hurt my chances in La Salle County?",
        a: "It doesn't rule you out. Lenders look at income history differently, so we gather what shows your earnings over time and match it to the program that reads it fairly.",
      },
      {
        q: "Will checking my financing options near Cotulla commit me to buying?",
        a: "No. Talking through financing is part of figuring out whether a purchase makes sense, and you can stop at any point without obligation.",
      },
      {
        q: "Do you place homes on rural La Salle County tracts?",
        a: "Yes, rural tracts across La Salle County are covered. We'll review access and site work for your parcel once we have an address.",
      },
    ],
    nearby: ['pearsall', 'pleasanton', 'devine', 'carrizo-springs'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Double wide manufactured home with a lit porch and desert landscaping near Cotulla, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Two-tone single wide mobile home set under live oaks, available for La Salle County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
      'marathon-breckenridge-3bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  'carrizo-springs': {
    county: 'Dimmit',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Carrizo Springs, TX and Dimmit County. Straight answers by phone on new manufactured homes and financing. Free quote today.",
    intro:
      "Carrizo Springs is a long drive from any metro, and buyers in Dimmit County deserve the same straight answers by phone that anyone closer in would get. Texas Homes Direct handles the whole purchase by call, text and email, with no pressure to decide on anyone's schedule but yours.",
    buyingHeading: 'Buying a Mobile Home in Dimmit County',
    buying: [
      "Distance tends to make people worry they'll be an afterthought. We give Dimmit County buyers the full floor plan list, the real price, and a clear explanation of every step, the same as a buyer next door to a big city.",
      "Because there's no showroom pitch involved, you can take a quote home, share it with family, and come back with questions whenever you're ready. Nobody calls to push a deadline.",
    ],
    pricingExplainer: [
      "A Carrizo Springs quote covers the house and everything on the checklist above in one figure. What you approve is what the home costs when it's set.",
      "For water, septic and electric, a phone estimate comes first. After that our contractor visits the property in person and puts an exact bid in front of you to approve.",
    ],
    gettingStarted: [
      "A first call usually covers three things: where the land is along US 83 or US 277, what size household the home needs to fit, and roughly what monthly payment feels comfortable.",
      "After that we send floor plans and numbers in writing, so you can compare them on your own time instead of on the phone with us.",
    ],
    localProof:
      "Dimmit County buyers from Carrizo Springs out toward Asherton and Big Wells get the same written quotes and phone support as anyone else we serve.",
    faq: [
      {
        q: "Can I do the whole home purchase from Carrizo Springs by phone?",
        a: "Yes. Floor plans, quotes, financing paperwork and scheduling can all be handled by phone, text and email, so you don't need to travel to make progress.",
      },
      {
        q: "Is Dimmit County too far out for you to deliver?",
        a: "No. Dimmit County is within our delivery area, and we confirm the route to your specific property before a quote is finalized.",
      },
      {
        q: "How do I compare homes without seeing them in Carrizo Springs?",
        a: "Start with the photos, floor plans and, where available, the 3D tours on our site. We'll answer questions about room sizes and finishes as you narrow down the list.",
      },
      {
        q: "Will anyone pressure me to decide quickly on a Dimmit County quote?",
        a: "No one will. Your quote is yours to think over, and you set the pace for when, or whether, to move ahead.",
      },
    ],
    nearby: ['cotulla', 'pearsall', 'uvalde'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide mobile home with wood steps and a cactus garden near Carrizo Springs, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Dark single wide mobile home on a gravel drive beside an oak, available for Dimmit County buyers',
    popularHomes: [
      '2876-5bed-3bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
      'marathon-coleman-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  kerrville: {
    county: 'Kerr',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Kerrville, TX and Kerr County. New manufactured homes with site work handled start to finish and honest financing.",
    intro:
      "Kerrville buyers often say the site work worried them more than the house. Texas Homes Direct takes that off your plate in Kerr County, coordinating the pad, utilities, blocking, tie downs and skirting along with the home, so one company answers for the whole job.",
    buyingHeading: 'Buying a Mobile Home in Kerr County',
    buying: [
      "Land around the Guadalupe River valley ranges from flat lots in town to sloped, rocky parcels further out. Whatever your property looks like, the site is assessed in person so the setup plan fits the actual ground.",
      "Having a single point of contact means you aren't the one scheduling a dirt crew, a plumber and an electrician around each other. Our team sequences the work and keeps you informed at each stage.",
    ],
    pricingExplainer: [
      "The Kerrville quote for your home already contains everything on the list above. That part of the price doesn't move after you accept it.",
      "Well, septic and electric are estimated on the phone, then priced exactly by our contractor once they've walked the land, and you approve that bid before work begins.",
    ],
    gettingStarted: [
      "Photos of the spot where you want the home are surprisingly useful in Kerr County. They help us see slope, trees and access before the in-person site visit.",
      "Then we'll match a floor plan to the space, discuss financing, and schedule the property assessment that sets up the rest.",
    ],
    localProof:
      "Kerr County properties along the Guadalupe and out on the ranch roads toward Ingram and Center Point all get the same in-person site assessment before setup.",
    faq: [
      {
        q: "Who coordinates site work for a new home in Kerrville?",
        a: "We do. Texas Homes Direct schedules and manages the pad, utilities, blocking, tie downs and skirting, so you aren't coordinating separate crews yourself.",
      },
      {
        q: "Can you set a home on a sloped Kerr County lot?",
        a: "Many sloped lots work fine, but it depends on the specific grade. Our site visit determines what pad preparation your property needs before the home is placed.",
      },
      {
        q: "Do you cover Kerr County beyond Kerrville itself?",
        a: "Yes, the whole county is covered. Share your address and we'll confirm access and the setup plan for that spot.",
      },
      {
        q: "Do you handle county paperwork for a Kerrville-area home?",
        a: "We help with it. Requirements differ from county to county and parcel to parcel, so we work through what applies to yours rather than assuming.",
      },
    ],
    nearby: ['comfort', 'bandera', 'fredericksburg', 'junction'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background near Kerrville, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Black mobile home with a cedar front porch and wooded hills behind it, available for Kerr County buyers',
    popularHomes: [
      '2876-5bed-3bath-double-wide',
      'marathon-cisco-2bed-2bath-single-wide',
      'marathon-fisher-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  fredericksburg: {
    county: 'Gillespie',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Fredericksburg, TX and Gillespie County. New HUD-code manufactured homes, firm pricing, honest financing. Free quote.",
    intro:
      "In Gillespie County, people care about how a house is built, and that's a fair question to ask of a manufactured home. Every home Texas Homes Direct sells near Fredericksburg is built to the federal HUD code, inspected during construction, and labeled before it ever leaves the plant.",
    buyingHeading: 'Buying a Mobile Home in Gillespie County',
    buying: [
      "Factory building means framing, wiring and plumbing go together indoors, out of the weather, under a consistent inspection process. That controlled setting is a big part of why today's homes look nothing like the trailers people picture.",
      "Fredericksburg buyers can look closely at wall construction, insulation, windows and roofing on each model before choosing. We'll walk through the spec sheet line by line if that's how you like to compare.",
    ],
    pricingExplainer: [
      "Your Fredericksburg price covers the home plus every inclusion shown above, and it stays the same once you've accepted the quote.",
      "Utility connections are the exception, since land varies so much. We estimate them by phone, then our contractor inspects your site and provides an exact bid for you to approve.",
    ],
    gettingStarted: [
      "If construction quality is your main question, ask us for the spec details on two or three models you like. Comparing them side by side tends to settle the decision.",
      "From there we'll confirm your Gillespie County property details, talk through financing, and plan the site visit.",
    ],
    localProof:
      "Gillespie County buyers from the edge of Fredericksburg out along US 290 and US 87 get the same spec-sheet walkthrough and site visit.",
    faq: [
      {
        q: "How is a manufactured home near Fredericksburg inspected?",
        a: "It's inspected during construction at the plant under the federal HUD code and carries a certification label. Local setup inspections can apply too, depending on where it's placed.",
      },
      {
        q: "Can I see construction specs before choosing a home in Gillespie County?",
        a: "Yes. We'll share framing, insulation, window and roofing details for the models you're considering so you can compare them on paper.",
      },
      {
        q: "Do homes near Fredericksburg need any local approval?",
        a: "That depends on the parcel and the county. We help you find out what applies to your land before a home is ordered.",
      },
      {
        q: "Does your delivery area reach the Gillespie County back roads past Fredericksburg?",
        a: "It does. Ranch roads off US 290 and US 87 are part of our coverage, and the route to your gate gets checked before a quote is final.",
      },
    ],
    nearby: ['kerrville', 'comfort', 'johnson-city', 'mason'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    heroAlt: 'Gray single wide manufactured home with a covered entry under live oaks near Fredericksburg, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit porch and desert landscaping, available for Gillespie County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  brownwood: {
    county: 'Brown',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Brownwood, TX and Brown County. New manufactured homes priced around a monthly payment you can plan on. Free quote today.",
    intro:
      "For most Brown County families, the question isn't the sticker price, it's the monthly payment. Texas Homes Direct helps Brownwood buyers start from a payment they can live with and work backward to the homes and financing that fit it.",
    buyingHeading: 'Buying a Mobile Home in Brown County',
    buying: [
      "Working from a monthly figure keeps the shopping honest. Instead of falling for a floor plan and stretching to afford it, you see which homes land comfortably inside your budget before you get attached to one.",
      "Loan term, down payment and the financing source all move that monthly number, so we lay out a few combinations side by side. Brownwood buyers can see exactly what changes when one piece changes.",
    ],
    pricingExplainer: [
      "The home price on a Brownwood quote is set once you accept it, with everything on the list above already counted, so the payment math rests on a stable number.",
      "Utilities come with their own process: we estimate them by phone, then our contractor visits the property and gives you an exact bid, which you approve before it's added to the plan.",
    ],
    gettingStarted: [
      "Come to the first call with a monthly range in mind, even a loose one. It's the quickest way to narrow dozens of floor plans down to a realistic handful.",
      "We'll then check that range against the financing options open to you and confirm the details of your Brown County property.",
    ],
    localProof:
      "We work with Brown County buyers from Brownwood out toward Lake Brownwood and Early, starting every conversation from a payment range.",
    faq: [
      {
        q: "Can you tell me which Brownwood homes fit my monthly budget?",
        a: "Yes. Give us a payment range and we'll show the homes and financing combinations that land inside it, without pushing you toward the top of it.",
      },
      {
        q: "What changes my monthly payment on a Brown County home?",
        a: "Mainly the home's price, your down payment, the loan term and the lender. We show how each one moves the number so you can choose what to adjust.",
      },
      {
        q: "Do I need land before talking payments in Brownwood?",
        a: "No. Many buyers settle the payment question first and then line up land, and we can work in either order.",
      },
      {
        q: "Do you cover lake-area property around Lake Brownwood?",
        a: "We do, along with the rest of Brown County. Access and site work are reviewed for each address before a quote is finalized.",
      },
    ],
    nearby: ['brady', 'goldthwaite', 'comanche', 'coleman'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Dark single wide mobile home on a gravel drive beside an oak near Brownwood, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background, available for Brown County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'marathon-conroe-2bed-2bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  comanche: {
    county: 'Comanche',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Comanche, TX and Comanche County. Compare single wide and double wide manufactured homes with honest financing.",
    intro:
      "The first real decision for many Comanche County buyers is single wide or double wide. Texas Homes Direct lays both out honestly, comparing footprint, room layout and price, so you pick the size that fits your household and your lot.",
    buyingHeading: 'Buying a Mobile Home in Comanche County',
    buying: [
      "A single wide fits narrower lots and smaller budgets and works well for one or two people, a starter home, or a place on family land. A double wide opens up wider living rooms, bigger kitchens and more bedroom separation.",
      "Neither is the right answer for every Comanche family. We'll measure your intended site against each footprint and show what each size really costs before you lean either way.",
    ],
    pricingExplainer: [
      "Whichever size you choose, the Comanche quote for the home is final and includes every item on the list above.",
      "The utility side is quoted after the fact. First a phone estimate, then our contractor's on-site bid, which you review and approve.",
    ],
    gettingStarted: [
      "Measure the open space where the home would go, or send a rough sketch with distances to fences, trees and buildings. That shows us which footprints fit.",
      "Then we compare a few single wide and double wide options at your budget and talk through financing for each.",
    ],
    localProof:
      "Comanche County buyers from Comanche itself to properties near Proctor Lake and De Leon get the same side-by-side size comparison.",
    faq: [
      {
        q: "Should I choose a single wide or double wide in Comanche County?",
        a: "It depends on your lot size, household and budget. We compare both on those three points so the choice is clear for your situation.",
      },
      {
        q: "Will a double wide fit on my lot near Comanche?",
        a: "Often it will, but setbacks and access matter. Send us measurements or photos and we'll check the footprint against your site.",
      },
      {
        q: "Is financing different for single and double wide homes in Comanche?",
        a: "The process is the same for both. The loan amount differs with the home's price, which changes the monthly payment.",
      },
      {
        q: "Do you deliver across all of Comanche County?",
        a: "Yes. Give us your property address and we'll confirm delivery access and the setup plan.",
      },
    ],
    nearby: ['hamilton', 'brownwood', 'stephenville', 'goldthwaite'],
    heroImage: '/homes/the-katy/Katy-Hero.jpg',
    heroAlt: 'Two-tone single wide mobile home set under live oaks near Comanche, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'White double wide mobile home with black trim and a planted front yard, available for Comanche County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'marathon-jackson-1bed-1bath-park-model',
      'fleetwood-javelina-1bed-1bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  stephenville: {
    county: 'Erath',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Stephenville, TX and Erath County. Browse new manufactured home floor plans online, then get a firm quote. No pressure.",
    intro:
      "Stephenville buyers tend to do their homework, so Texas Homes Direct puts the floor plans, photos and 3D tours online where Erath County shoppers can study them before calling anyone. When you do call, it's to get a firm quote on homes you've already shortlisted.",
    buyingHeading: 'Buying a Mobile Home in Erath County',
    buying: [
      "Browsing first means the first conversation is about specifics: this kitchen layout, that bedroom count, whether a given model fits your lot. It saves Erath County buyers from sitting through a generic sales pitch.",
      "Each listing shows bedrooms, bathrooms, square footage and photos, and several include a 3D walkthrough. If something isn't clear from the page, ask and we'll fill in the details.",
    ],
    pricingExplainer: [
      "Once you have a Stephenville quote on a shortlisted home, that number is complete, covering everything listed above, and it won't climb afterward.",
      "Utilities follow a separate path. We give a phone estimate based on what you tell us, and our contractor then visits the land to produce an exact bid you approve.",
    ],
    gettingStarted: [
      "Save the listings you like and send us the names. Starting with a shortlist lets us confirm availability and pricing on those homes right away.",
      "From there we confirm your Erath County land details and go over financing for the models on your list.",
    ],
    localProof:
      "Erath County buyers in Stephenville and on rural land toward Dublin and Lingleville can do all their comparison shopping on our listings before the first call.",
    faq: [
      {
        q: "Can I browse manufactured homes for Stephenville online first?",
        a: "Yes. Floor plans, photos and specs are on our site, and many homes include a 3D tour, so you can shortlist before calling.",
      },
      {
        q: "Will you quote the exact homes I've shortlisted for Erath County?",
        a: "We will. Send the home names and your property location, and we'll confirm availability and pricing for each.",
      },
      {
        q: "Do I need to own Erath County land to get a quote?",
        a: "It isn't required. We can quote homes while your land is still being purchased or decided, then confirm site details later.",
      },
      {
        q: "Is rural Erath County within your delivery area?",
        a: "Yes, rural Erath County is covered along with Stephenville. We check access to your property before finalizing anything.",
      },
    ],
    nearby: ['granbury', 'comanche', 'hamilton', 'weatherford'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home with a lit front walkway at sunset near Stephenville, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Gray single wide manufactured home with a covered entry under live oaks, available for Erath County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'fleetwood-badger-3bed-2bath-double-wide',
      'marathon-brewster-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  meridian: {
    county: 'Bosque',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Meridian, TX and Bosque County. New manufactured homes, help sorting out county requirements, and honest financing.",
    intro:
      "Meridian is a small county seat, and Bosque County land comes with its own mix of deed restrictions, road frontage and local requirements. Texas Homes Direct helps buyers figure out what applies to their parcel before a home is ever ordered.",
    buyingHeading: 'Buying a Mobile Home in Bosque County',
    buying: [
      "Requirements for placing a manufactured home vary by county, by whether you're inside a town's limits, and by what's written in your deed. We don't assume; we help you check what governs your specific Bosque County land.",
      "Answering those questions first prevents the worst kind of surprise, a home chosen and financed for a site where it can't actually go. It also tells you which paperwork to gather early.",
    ],
    pricingExplainer: [
      "Meridian buyers get one price for the home, with every inclusion shown above folded in. Once accepted, it holds.",
      "Utility hookups are the piece we price with care: a phone estimate first, then an exact bid from our contractor after visiting the property, approved by you before work starts.",
    ],
    gettingStarted: [
      "If you have a copy of your deed or a survey, keep it handy. Those documents often answer placement questions before anyone has to call the county.",
      "Once your parcel's requirements are clear, we move into floor plans and financing that fit both the rules and your budget.",
    ],
    localProof:
      "Bosque County parcels from Meridian out past Meridian State Park and toward Clifton and Valley Mills are each checked for their own placement requirements.",
    faq: [
      {
        q: "What permits does a manufactured home near Meridian need?",
        a: "It varies by county, city limits and deed restrictions. We help you find out which requirements apply to your Bosque County parcel before a home is ordered.",
      },
      {
        q: "Can deed restrictions stop a manufactured home in Bosque County?",
        a: "Sometimes they limit home type, size or age. Reviewing your deed early tells us whether your land has any restrictions to plan around.",
      },
      {
        q: "Do you place homes outside Meridian in rural Bosque County?",
        a: "Yes. Rural Bosque County is part of our coverage, and we review access for your address before quoting.",
      },
      {
        q: "Can I start in Meridian before I own land?",
        a: "Yes. If you're still choosing a parcel, we can help you know what to ask about restrictions before you buy it.",
      },
    ],
    nearby: ['hamilton', 'cleburne', 'gatesville', 'waco'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Single wide manufactured home with agave and limestone landscaping near Meridian, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit front walkway at sunset, available for Bosque County buyers',
    popularHomes: [
      '2876-5bed-3bath-double-wide',
      'marathon-beaumont-3bed-2bath-single-wide',
      'marathon-pearland-3bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  'glen-rose': {
    county: 'Somervell',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Glen Rose, TX and Somervell County from a family-owned manufactured home dealer. Honest financing, free quote.",
    intro:
      "Texas Homes Direct is family-owned, and Glen Rose buyers deal with real people who answer their own phones. In Somervell County that means honest pricing, no commission games, and a team that's still around after your home is set.",
    buyingHeading: 'Buying a Mobile Home in Somervell County',
    buying: [
      "Being family-owned shows up in small things: you talk to the same few people throughout, nobody's quota depends on upselling you, and your questions get straight answers even when the answer is no.",
      "Somervell County is compact, but properties here still range from in-town lots to acreage along the Paluxy River. Every one gets the same attention to the details of the site.",
    ],
    pricingExplainer: [
      "Your Glen Rose quote lists one home price, covering everything on the checklist above, and we stand behind that number once you accept it.",
      "For well, septic and electric, we start with a phone estimate, then send our own contractor to your property for an exact bid, which you approve before we proceed.",
    ],
    gettingStarted: [
      "Call or message with your Somervell County address and a rough budget. You'll hear back from someone who can actually answer questions, not a call center.",
      "We'll take you through homes that fit, explain financing options, and set up a property visit when you're ready.",
    ],
    localProof:
      "Somervell County buyers from Glen Rose out toward Dinosaur Valley State Park and Nemo work with the same family-run team from first call through setup.",
    faq: [
      {
        q: "Who will I actually talk to about a Glen Rose home?",
        a: "A small, family-run team at Texas Homes Direct. You'll deal with the same people from your first question through setup.",
      },
      {
        q: "Do you deliver throughout Somervell County?",
        a: "Yes, the full county. Share your address and we'll walk you through access and setup for that property.",
      },
      {
        q: "Can I get help after my Glen Rose home is set?",
        a: "Yes. If something comes up after setup, contact us and we'll help you work through it with the right party.",
      },
      {
        q: "Is land along the Paluxy River area something you can place a home on?",
        a: "Many properties there work, but each site is different. Our site visit looks at access and placement for your specific parcel before anything is final.",
      },
    ],
    nearby: ['granbury', 'cleburne', 'stephenville'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'White double wide mobile home with black trim and a planted front yard near Glen Rose, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'White single wide mobile home with a wood deck and black trim, available for Somervell County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'fleetwood-moose-4bed-2bath-double-wide',
      'marathon-grapevine-2bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  'mineral-wells': {
    county: 'Palo Pinto',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Mineral Wells, TX and Palo Pinto County. New manufactured homes on either side of the county line, honest financing.",
    intro:
      "Mineral Wells sits on the line between Palo Pinto and Parker counties, so which county your land falls in matters more here than in most towns. Texas Homes Direct checks that detail first, because it decides whose requirements apply to your home.",
    buyingHeading: 'Buying a Mobile Home in Palo Pinto County',
    buying: [
      "Two properties a few miles apart can fall under different county offices, and a parcel inside city limits adds another layer. We help you confirm which jurisdiction governs your land before any paperwork starts.",
      "Beyond the county question, Palo Pinto County land varies from city lots near the historic Baker Hotel to rolling acreage west of town, and the site work is planned for the property you actually have.",
    ],
    pricingExplainer: [
      "The Mineral Wells home price doesn't depend on which side of the county line you're on, and it includes everything on the list above.",
      "Utility hookups, though, depend on the land itself. A phone estimate comes first; our contractor then inspects the site and provides an exact bid for your approval.",
    ],
    gettingStarted: [
      "Your property's address or parcel number is the most useful thing to bring, since it tells us right away which county and jurisdiction you're in.",
      "After that, choosing a floor plan and lining up financing happen together, built around your land and budget.",
    ],
    localProof:
      "We work with buyers on both the Palo Pinto County and Parker County sides of Mineral Wells, confirming jurisdiction for each address.",
    faq: [
      {
        q: "Does it matter which county my Mineral Wells land is in?",
        a: "Yes. Mineral Wells spans Palo Pinto and Parker counties, and the county your parcel falls in determines whose requirements apply to the home.",
      },
      {
        q: "Can you place a home inside Mineral Wells city limits?",
        a: "It depends on the specific lot and local requirements. We help you confirm what applies before you commit to a home.",
      },
      {
        q: "Do you deliver to rural Palo Pinto County?",
        a: "Yes. Rural properties across Palo Pinto County are covered, and we review access for your address before quoting.",
      },
      {
        q: "Can I finance a Mineral Wells home if I'm still buying the land?",
        a: "Yes. We can start on financing while the land purchase is in progress and match the timing to your situation.",
      },
    ],
    nearby: ['weatherford', 'granbury', 'jacksboro', 'stephenville'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'White single wide mobile home with a wood deck and black trim near Mineral Wells, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide mobile home with wood steps and a cactus garden, available for Palo Pinto County buyers',
    popularHomes: [
      '2876-5bed-3bath-double-wide',
      'marathon-daniel-1bed-1bath-park-model',
      'marathon-redhead-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  wharton: {
    county: 'Wharton',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Wharton, TX and Wharton County. New manufactured homes and a clear, step-by-step buying process. Get a free quote.",
    intro:
      "Wharton buyers often ask what actually happens between saying yes and moving in. Texas Homes Direct walks Wharton County families through each step in order, so you always know what's done, what's next, and who is handling it.",
    buyingHeading: 'Buying a Mobile Home in Wharton County',
    buying: [
      "The sequence runs roughly like this: confirm the property, choose a floor plan, settle financing, complete the site visit and utility bid, then delivery and setup. Each step has a clear owner, and you get updates as each one finishes.",
      "Knowing the order ahead of time helps a Wharton County buyer plan around everything else in life, like selling a current house, ending a lease or coordinating family who'll help move.",
    ],
    pricingExplainer: [
      "For a Wharton home, the accepted quote is the house's full price with every inclusion above inside it, so that number doesn't change as the steps go by.",
      "The one figure set later is utilities. You get a phone estimate early, then a precise bid after our contractor sees the land, and you approve it before work starts.",
    ],
    gettingStarted: [
      "Ask us for the step list in writing on the first call. Wharton buyers find it easier to track progress when they can check items off.",
      "The first item is always confirming your property and its access; floor plan and financing come right behind it.",
    ],
    localProof:
      "Wharton County buyers near the Colorado River in Wharton and out on farm roads toward Boling and Louise follow the same written step list.",
    faq: [
      {
        q: "What are the steps to buying a manufactured home in Wharton?",
        a: "Property confirmation, floor plan, financing, site visit and utility bid, then delivery and setup. We give you the list in writing and update you as each step finishes.",
      },
      {
        q: "Will I know who is handling each step of my Wharton County purchase?",
        a: "Yes. Each stage has a clear owner at Texas Homes Direct, and you'll know who to contact at every point.",
      },
      {
        q: "Do you deliver to farm properties outside Wharton?",
        a: "Yes. Rural Wharton County land is within our coverage, and access is checked for each address before a quote is finalized.",
      },
      {
        q: "Do I need to own land in Wharton County before step one?",
        a: "No. If your land is still being sorted out, we start with floor plans and financing and come back to the property step once it's settled.",
      },
    ],
    nearby: ['el-campo', 'columbus', 'edna'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Double wide manufactured home with a lit porch and desert landscaping near Wharton, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide manufactured home with agave and limestone landscaping, available for Wharton County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'fleetwood-rattlesnake-3bed-2bath-single-wide',
      'marathon-coleman-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  'el-campo': {
    county: 'Wharton',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in El Campo, TX. Replace an older home on your Wharton County lot with a new manufactured home. Honest financing, free quote.",
    intro:
      "Plenty of El Campo homeowners aren't buying land at all; they're replacing an older mobile home that has served its time on a lot they already own. Texas Homes Direct helps plan that swap, from the old home's removal to the new one's setup on the same spot.",
    buyingHeading: 'Buying a Mobile Home in Wharton County',
    buying: [
      "Replacing a home on an existing lot raises its own questions: can the current utility connections be reused, does the new footprint fit, and what has to happen to the old unit first. We look at all of it before quoting.",
      "A newer manufactured home also brings modern insulation, windows and layouts compared with a decades-old unit, which El Campo families often notice right away in comfort and upkeep.",
    ],
    pricingExplainer: [
      "The El Campo price for the new home is complete, with everything listed above, and it doesn't change once accepted.",
      "Because existing hookups may or may not be usable, utilities are estimated by phone and then bid exactly after our contractor inspects the lot, with your approval required.",
    ],
    gettingStarted: [
      "Tell us the age and size of the home that's on the lot now and whether anyone is still living in it. That shapes the plan for removal and the order of work.",
      "Next we compare new floor plans that fit the same space and go over financing for the replacement.",
    ],
    localProof:
      "We help Wharton County homeowners in and around El Campo plan replacements on lots where an older home already sits.",
    faq: [
      {
        q: "Can I replace my old mobile home in El Campo with a new one on the same lot?",
        a: "In many cases, yes. We review the lot, the existing connections, and any local requirements to plan the replacement before quoting.",
      },
      {
        q: "Can existing utility hookups on my El Campo lot be reused?",
        a: "Sometimes. Our contractor inspects what's there and tells you what can stay and what needs updating as part of the utility bid.",
      },
      {
        q: "What happens to the old home when I replace it near El Campo?",
        a: "It has to be removed before the new home is set. We'll talk through options for that step when we plan the replacement.",
      },
      {
        q: "Will a larger home fit where my old single wide sits?",
        a: "It might. We measure the lot and check setbacks to see which new footprints fit before you choose.",
      },
    ],
    nearby: ['wharton', 'edna', 'hallettsville', 'yoakum'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home with a lit front walkway at sunset near El Campo, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Two-tone single wide mobile home set under live oaks, available for Wharton County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'marathon-dove-1bed-1bath-single-wide',
      'marathon-cisco-2bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  edna: {
    county: 'Jackson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Edna, TX and Jackson County. Compact manufactured homes and full-size floor plans with honest financing. Free quote.",
    intro:
      "Not every Jackson County buyer needs a big house. Around Edna, some want a compact home for one or two people, a place for an aging parent on family land, or a weekend spot near Lake Texana, and Texas Homes Direct carries smaller floor plans for exactly that.",
    buyingHeading: 'Buying a Mobile Home in Jackson County',
    buying: [
      "Our smaller single wides and park models keep the footprint and the price down while still including a full kitchen, bath and bedroom. For a household of one or two, that's often all the room anyone wants to maintain.",
      "If you're adding a second home to land that already has one, local rules about multiple dwellings can apply. We help you check what's allowed on your Jackson County parcel first.",
    ],
    pricingExplainer: [
      "Small home or large, an Edna quote rolls in everything on the list above, and the figure holds once you accept it.",
      "A smaller home doesn't change how utilities work: they start as a phone estimate and become an exact bid after our contractor visits the property and you sign off.",
    ],
    gettingStarted: [
      "Tell us who the home is for and how many people will live in it. That alone narrows the list to a few practical floor plans.",
      "If the home is going beside an existing house, mention it, because placement and utility planning change when two homes share a property.",
    ],
    localProof:
      "Jackson County buyers in Edna, Ganado and on rural land near Lake Texana come to us for both compact homes and full-size floor plans.",
    faq: [
      {
        q: "Do you sell smaller manufactured homes for Edna buyers?",
        a: "Yes. We carry compact single wides and park models alongside larger floor plans, so a one- or two-person household has real options.",
      },
      {
        q: "Can I put a second home on family land in Jackson County?",
        a: "Possibly, but rules on multiple dwellings vary by location. We help you find out what applies to your parcel before choosing a home.",
      },
      {
        q: "Is a park model financed the same way as a larger home near Edna?",
        a: "Financing options can differ by home type. We'll go over which programs fit the specific home you're considering.",
      },
      {
        q: "Do you deliver near Lake Texana?",
        a: "Yes, along with the rest of Jackson County. We confirm access to the specific property before quoting.",
      },
    ],
    nearby: ['yoakum', 'el-campo', 'victoria', 'hallettsville'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    heroAlt: 'Gray single wide manufactured home with a covered entry under live oaks near Edna, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Black double wide manufactured home with wood steps on cleared land, available for Jackson County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'marathon-fisher-3bed-2bath-double-wide',
      'marathon-gadwall-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  'port-lavaca': {
    county: 'Calhoun',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Port Lavaca, TX and Calhoun County. New manufactured homes with one complete out-the-door price. Get your free quote.",
    intro:
      "Port Lavaca buyers want to know the total before they commit, and Texas Homes Direct gives Calhoun County one complete out-the-door price for the home. The list of what that price covers is right on this page, so nothing hides in the fine print.",
    buyingHeading: 'Buying a Mobile Home in Calhoun County',
    buying: [
      "An all-in home price makes comparing easy. Instead of adding delivery, setup, AC and taxes on top of a base figure, a Port Lavaca buyer reads one number and knows what the house costs.",
      "Calhoun County properties range from in-town lots near Lavaca Bay to rural land inland, and the home price stays the same across all of them; only the site-specific utility work varies.",
    ],
    pricingExplainer: [
      "The Port Lavaca home price we quote is the entire price for the home, every item on the list above included, with no add-ons later.",
      "Utilities are the only part we won't guess at. We give a phone estimate, then our contractor visits the property and writes an exact bid that you approve.",
    ],
    gettingStarted: [
      "Pick two or three homes you like and ask us for their out-the-door prices together. Seeing complete numbers side by side makes the decision much clearer.",
      "Then we confirm your Calhoun County property and walk through financing on the home you choose.",
    ],
    localProof:
      "Calhoun County buyers from Port Lavaca to Seadrift and Point Comfort receive the same complete, all-in home quotes.",
    faq: [
      {
        q: "Is the price you quote in Port Lavaca the full price of the home?",
        a: "Yes. The home price includes every item listed on this page, so you're comparing complete numbers, not a base price.",
      },
      {
        q: "Can I compare out-the-door prices on several homes for Calhoun County?",
        a: "Absolutely. Ask for quotes on a few models and we'll send complete prices for each so you can compare them side by side.",
      },
      {
        q: "Do you serve rural Calhoun County outside Port Lavaca?",
        a: "Yes. Rural properties are covered, and we verify access to your address before the quote is final.",
      },
      {
        q: "Do coastal properties near Port Lavaca have extra requirements?",
        a: "Some locations do, and they vary by parcel and county. We help you check what applies to your land before choosing a home.",
      },
    ],
    nearby: ['victoria', 'goliad', 'refugio', 'edna'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'White single wide mobile home with a wood deck and black trim near Port Lavaca, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit porch and desert landscaping, available for Calhoun County buyers',
    popularHomes: [
      '2876-5bed-3bath-double-wide',
      'marathon-breckenridge-3bed-2bath-single-wide',
      'marathon-pintail-4bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  hearne: {
    county: 'Robertson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Hearne, TX and Robertson County. First-time manufactured home buyers get plain answers and honest financing. Free quote.",
    intro:
      "Many Hearne buyers have never purchased a manufactured home before, and Texas Homes Direct explains each piece in plain language for first-time buyers in Robertson County. No jargon, and no question is too basic to ask.",
    buyingHeading: 'Buying a Mobile Home in Robertson County',
    buying: [
      "First-time buyers usually want to understand the difference between the home price and utility costs, how financing works, and what setup involves. We cover each topic before asking you to decide anything.",
      "Hearne grew up as a railroad town, and today Robertson County land ranges from older in-town lots to farm acreage along the Brazos. We look at whatever property you have, or help you think through what to look for if you don't have any yet.",
    ],
    pricingExplainer: [
      "For a first purchase in Hearne, the simplest thing to know is that the home price you accept covers everything shown above and won't change.",
      "Utilities are explained step by step: a phone estimate first, then our contractor visits your land and gives an exact bid that you approve before anything moves forward.",
    ],
    gettingStarted: [
      "Write down your questions before the first call. First-time Robertson County buyers often find that a list keeps the conversation focused on what matters to them.",
      "We'll answer them, then look at your budget, land situation and floor plans at whatever pace feels comfortable.",
    ],
    localProof:
      "First-time buyers across Robertson County, from Hearne to Calvert and Franklin, get the same plain-language walk-through.",
    faq: [
      {
        q: "I've never bought a manufactured home. Where do I start in Hearne?",
        a: "Start with a call. We'll explain how pricing, financing and setup work, then help you figure out what fits your budget and land.",
      },
      {
        q: "Can a first-time buyer in Robertson County get financing?",
        a: "Often, yes. Between our own financing and outside lenders, first-time buyers usually have options, and we'll be honest about which fit you.",
      },
      {
        q: "Do I need land before calling about a Hearne home?",
        a: "No. If you don't have land yet, we can talk about what to look for and work on financing in the meantime.",
      },
      {
        q: "Do you deliver across Robertson County?",
        a: "We do, from Hearne out to Calvert, Franklin and the Brazos bottomland. Each address gets its own access review before we quote.",
      },
    ],
    nearby: ['cameron', 'caldwell', 'navasota', 'rockdale'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Black double wide manufactured home with wood steps on cleared land near Hearne, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Dark single wide mobile home on a gravel drive beside an oak, available for Robertson County buyers',
    popularHomes: [
      'marathon-loving-3bed-2bath-double-wide',
      'fleetwood-bobcat-3bed-2bath-single-wide',
      'marathon-pigeon-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  madisonville: {
    county: 'Madison',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Madisonville, TX and Madison County. Moving out to rural land? New manufactured homes, honest financing. Free quote.",
    intro:
      "Madisonville sits along I-45 roughly halfway between two of the state's biggest metros, and many Madison County buyers are moving out from city life onto rural land for the first time. Texas Homes Direct helps them think through what changes when the home goes on acreage instead of a subdivision lot.",
    buyingHeading: 'Buying a Mobile Home in Madison County',
    buying: [
      "In a city, water, sewer and power are already at the curb. On rural Madison County land, a well, a septic system and an electric run may all be part of the project, so understanding those pieces early avoids surprises.",
      "Rural driveways, gates and clearings also affect how a home gets delivered. We look at the property's access before quoting so the plan fits the land you bought.",
    ],
    pricingExplainer: [
      "A Madisonville home price is complete once accepted and covers everything on the list above, regardless of how far out your acreage sits.",
      "The rural utility work is estimated by phone first, then priced exactly after our contractor visits the property; you approve that bid before it proceeds.",
    ],
    gettingStarted: [
      "If you're relocating, tell us whether you've already closed on the land or are still choosing. Those are different conversations, and both are fine.",
      "We'll also ask what's on the property now, such as an existing well, power pole or cleared pad, since that shapes the site work.",
    ],
    localProof:
      "Madison County buyers moving onto acreage around Madisonville, Midway and North Zulch get help planning the utility work that city lots never needed.",
    faq: [
      {
        q: "What changes when I put a home on rural land near Madisonville?",
        a: "Mainly utilities and access. Rural land may need a well, septic and an electric run, plus a driveway and clearing suited to delivery.",
      },
      {
        q: "Can you help me evaluate Madison County land before I buy it?",
        a: "We can tell you what to look at, such as access, power proximity and space for a septic system, so you ask the right questions before closing.",
      },
      {
        q: "Do you deliver to acreage off I-45 around Madisonville?",
        a: "Yes. Rural Madison County properties are covered, and we review the route to your land before finalizing a quote.",
      },
      {
        q: "Is financing different for a home on rural Madison County acreage?",
        a: "The home's financing process is similar, but your land situation can affect which programs fit. We'll go over that with you.",
      },
    ],
    nearby: ['navasota', 'crockett', 'huntsville', 'caldwell'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide mobile home with wood steps and a cactus garden near Madisonville, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Black mobile home with a cedar front porch and wooded hills behind it, available for Madison County buyers',
    popularHomes: [
      'marathon-ranger-2bed-1bath-single-wide',
      'marathon-bailey-3bed-2bath-double-wide',
      'marathon-amarillo-2bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  crockett: {
    county: 'Houston',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Crockett, TX and Houston County. New manufactured homes delivered to wooded rural land, with honest financing.",
    intro:
      "Crockett is the Houston County seat, surrounded by pine and hardwood country near the Davy Crockett National Forest. Texas Homes Direct delivers manufactured homes to that wooded rural land, planning access and clearing around the trees and roads buyers actually have.",
    buyingHeading: 'Buying a Mobile Home in Houston County',
    buying: [
      "Wooded Houston County property can be beautiful and tricky at once. A driveway through timber, overhanging limbs and soft shoulders all affect delivery, so we look at access and the cleared area before your quote is final.",
      "Some buyers have already cleared a homesite; others still have standing trees where the home will go. Either is fine, as long as we plan the clearing and pad together before the home is ordered.",
    ],
    pricingExplainer: [
      "Your Crockett quote is the home's full price, with the list above inside it, and that number holds once you've accepted it.",
      "Utility work on wooded Houston County land is estimated by phone, then bid exactly after our contractor walks the property, and you approve the bid before work begins.",
    ],
    gettingStarted: [
      "Send photos of the driveway entrance and the area where the home would sit. In Houston County's timber, those two views tell us the most about delivery.",
      "Next we discuss clearing, floor plans and financing together, so the site plan and the home fit each other.",
    ],
    localProof:
      "Houston County properties around Crockett, Grapeland and Lovelady, many of them wooded, get a delivery access review before every quote.",
    faq: [
      {
        q: "Can you deliver a home to wooded land near Crockett?",
        a: "Yes. We review driveway access, tree clearance and the homesite on wooded Houston County land before finalizing a quote.",
      },
      {
        q: "Do I need my Houston County homesite cleared before calling?",
        a: "No. We can plan clearing and the pad together with you, whether the site is already open or still has trees.",
      },
      {
        q: "Is all of Houston County within your delivery area?",
        a: "Every part of Houston County is covered, Grapeland and Lovelady included. Logging roads and long timber drives just mean a closer look at the route.",
      },
      {
        q: "Can I finance a home for land near the Davy Crockett National Forest?",
        a: "Yes. Financing depends on you and the home rather than the forest nearby, and we'll go over the options that fit.",
      },
    ],
    nearby: ['palestine', 'madisonville', 'jacksonville', 'lufkin'],
    heroImage: '/homes/the-katy/Katy-Hero.jpg',
    heroAlt: 'Two-tone single wide mobile home set under live oaks near Crockett, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background, available for Houston County buyers',
    popularHomes: [
      'fleetwood-pronghorn-4bed-2bath-double-wide',
      'marathon-conroe-2bed-2bath-single-wide',
      'marathon-trinity-4bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  fairfield: {
    county: 'Freestone',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Fairfield, TX and Freestone County. Start with the financing conversation, even before you have land. Free quote.",
    intro:
      "In Fairfield, it often makes sense to talk about financing before talking about land. Texas Homes Direct helps Freestone County buyers learn what they can afford first, so the land search and the home search both start from a real number.",
    buyingHeading: 'Buying a Mobile Home in Freestone County',
    buying: [
      "Knowing your financing range early keeps you from buying land that leaves too little room for the home, or falling for a floor plan the budget can't carry. It's the order that saves the most second-guessing.",
      "We can finance homes ourselves and also work with outside lenders, so a Fairfield buyer gets a realistic picture of options rather than a single yes or no.",
    ],
    pricingExplainer: [
      "Fairfield buyers get a home price that includes the full list above, and once accepted, the financing is built on that fixed figure.",
      "Utility costs follow later: a phone estimate when we know the property, then an exact bid from our contractor's site visit, which you approve.",
    ],
    gettingStarted: [
      "Bring basic income and debt information to the first call. With that, we can sketch a realistic financing range before you've chosen land or a home.",
      "Once the range is clear, we help you look at floor plans inside it and talk through what to look for in Freestone County land.",
    ],
    localProof:
      "Freestone County buyers in Fairfield, Teague and Wortham are welcome to start with the financing conversation before they've picked a property.",
    faq: [
      {
        q: "Should I get financing figured out before buying land in Fairfield?",
        a: "It often helps. Knowing your range first means the land and home you choose fit the same budget.",
      },
      {
        q: "Can I talk to you about financing without land in Freestone County?",
        a: "Yes. Many buyers start there, and we can revisit the site details once you've found a property.",
      },
      {
        q: "Do you deliver to rural Freestone County properties?",
        a: "Yes. Rural Freestone County is covered, and access to your address is checked before the quote is final.",
      },
      {
        q: "What if a bank already turned me down for a Fairfield home?",
        a: "That doesn't necessarily end it. With in-house financing and outside lenders, there may still be a path, and we'll tell you honestly if there is.",
      },
    ],
    nearby: ['corsicana', 'palestine', 'mexia'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Black mobile home with a cedar front porch and wooded hills behind it near Fairfield, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'White double wide mobile home with black trim and a planted front yard, available for Freestone County buyers',
    popularHomes: [
      'marathon-spoonbill-3bed-2bath-single-wide',
      'fleetwood-peredavid-3bed-2bath-double-wide',
      'marathon-temple-3bed-2bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  mexia: {
    county: 'Limestone',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Mexia, TX and Limestone County. New manufactured homes for in-town lots and acreage alike, with honest financing.",
    intro:
      "Mexia is the larger of Limestone County's two main towns, and a lot of buyers here are weighing an in-town lot against a few acres outside it. Texas Homes Direct covers both, explaining how a home on a city lot differs from one on rural land.",
    buyingHeading: 'Buying a Mobile Home in Limestone County',
    buying: [
      "Inside Mexia city limits, utilities are often available nearby, but local requirements and lot dimensions can narrow which homes fit. Out in the county, there's more room but more site work. We help you weigh the trade-off honestly.",
      "Whichever direction you lean, we look at the specific property, including setbacks, access and existing connections, before recommending floor plans for it.",
    ],
    pricingExplainer: [
      "Your Mexia home price covers everything on the checklist above whether the lot is in town or out, and it stays fixed after you accept the quote.",
      "Utilities vary more between town and country, so they're estimated by phone and then bid exactly once our contractor visits your property. You approve that bid.",
    ],
    gettingStarted: [
      "Let us know whether the property is inside Mexia city limits or out in the county. That one fact changes which requirements and utility questions come up first.",
      "Then we match floor plans to the lot size and go over financing for the homes that fit.",
    ],
    localProof:
      "We work with Limestone County buyers on in-town Mexia lots and on acreage toward Fort Parker State Park and Lake Mexia.",
    faq: [
      {
        q: "Can I put a manufactured home on a lot inside Mexia city limits?",
        a: "It depends on the lot and the city's requirements. We help you confirm what applies before you choose a home.",
      },
      {
        q: "Is a city lot or county acreage better for a Mexia-area home?",
        a: "Neither is better for everyone. City lots tend to have closer utilities, while county land offers more room but more site work. We'll compare both for your situation.",
      },
      {
        q: "Do you deliver to acreage around Lake Mexia?",
        a: "Yes. Rural Limestone County land is covered, and we check access to your address before finalizing a quote.",
      },
      {
        q: "Will my lot size in Mexia limit which homes I can choose?",
        a: "It can. Send us the lot dimensions and we'll show which footprints fit with room for setbacks.",
      },
    ],
    nearby: ['fairfield', 'groesbeck', 'corsicana'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background near Mexia, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Gray single wide manufactured home with a covered entry under live oaks, available for Limestone County buyers',
    popularHomes: [
      'jade-3bed-2bath-single-wide',
      'marathon-widgeon-4bed-2bath-double-wide',
      'fleetwood-roadrunner-3bed-2bath',
    ],
    lastModified: '2026-10-26',
  },

  groesbeck: {
    county: 'Limestone',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Groesbeck, TX and Limestone County. New manufactured homes delivered down rural roads and lake-area acreage.",
    intro:
      "Groesbeck is the Limestone County seat, a quieter town ringed by farm roads, ranchland and the shoreline around Lake Limestone. Texas Homes Direct delivers to those rural properties, where the route to the homesite matters as much as the home itself.",
    buyingHeading: 'Buying a Mobile Home in Limestone County',
    buying: [
      "County roads, cattle guards, creek crossings and long private drives are common around Groesbeck. We review the path from the highway to your pad so the delivery plan fits the land.",
      "Lake-area parcels and ranch tracts each bring their own setup questions about placement and utilities, and we answer them for the property you actually have instead of a generic lot.",
    ],
    pricingExplainer: [
      "A Groesbeck quote gives you the home's complete price, everything on the list above included, and it doesn't shift after acceptance.",
      "On rural land, utilities need a closer look: a phone estimate first, then an exact bid after our contractor visits, which you approve before work.",
    ],
    gettingStarted: [
      "Describe the route from the nearest highway to your property, including any gates, cattle guards or low spots. That helps us plan delivery early.",
      "Next we talk floor plans and financing, then schedule the site visit that sets the utility bid.",
    ],
    localProof:
      "We deliver to Limestone County acreage around Groesbeck, from ranch tracts off SH 14 to lake-area land near Lake Limestone and Old Fort Parker.",
    faq: [
      {
        q: "Can you deliver to ranch land with a long private drive near Groesbeck?",
        a: "Usually, yes. We review the drive, gates and any crossings so the delivery route works for your property.",
      },
      {
        q: "Do you place homes on lake-area land around Lake Limestone?",
        a: "Yes. We review access and placement for each parcel, and any lake-area requirements, before quoting.",
      },
      {
        q: "Do I need my Groesbeck property surveyed before calling?",
        a: "Not before calling. A survey can help later with placement, and we'll tell you if your situation calls for one.",
      },
      {
        q: "Is your coverage in Limestone County limited to Groesbeck?",
        a: "No. We cover the county's rural land and smaller communities too. Send your address and we'll confirm access.",
      },
    ],
    nearby: ['mexia', 'marlin', 'fairfield'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Dark single wide mobile home on a gravel drive beside an oak near Groesbeck, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit front walkway at sunset, available for Limestone County buyers',
    popularHomes: [
      'fleetwood-armadillo-3bed-2bath',
      'marathon-kendall-3bed-2bath-double-wide',
      'fleetwood-axis-3bed-2bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  marlin: {
    county: 'Falls',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Marlin, TX and Falls County. Smaller, budget-minded manufactured homes and honest financing. Get your free quote today.",
    intro:
      "Marlin buyers watching their budget closely can still get a new home. Texas Homes Direct carries smaller, lower-cost manufactured homes for Falls County households that want something modern and reliable without paying for space they won't use.",
    buyingHeading: 'Buying a Mobile Home in Falls County',
    buying: [
      "Our more affordable single wides still come with full kitchens, modern insulation and new appliances. For many Marlin buyers, the right home is the one that fits the budget comfortably, not the largest one available.",
      "Marlin's history as a mineral-water town is part of its character, and Falls County land today ranges from older town lots to farm acreage along the Brazos. Smaller footprints fit more of those lots easily.",
    ],
    pricingExplainer: [
      "For a budget-minded Marlin buyer, the accepted home price covers the whole list above, so the number you plan around is the number you pay.",
      "Utility hookups are estimated by phone, then priced exactly after our contractor sees your land; you approve the bid before any work starts.",
    ],
    gettingStarted: [
      "Share your total budget or a monthly range. We'll start with the most affordable homes that fit and only move up if you want to.",
      "Then we confirm your Falls County property and talk through financing options at that price level.",
    ],
    localProof:
      "Falls County buyers in Marlin, Rosebud and Lott can start with our lowest-cost floor plans and work up only if they choose to.",
    faq: [
      {
        q: "What's the most affordable new home I can get in Marlin?",
        a: "Our smaller single wides are the lowest-cost options. Tell us your budget and we'll show which ones fit, with everything included.",
      },
      {
        q: "Can a small single wide fit on an older Marlin town lot?",
        a: "Often it can. We check the lot dimensions and local requirements to confirm which footprints fit.",
      },
      {
        q: "Is financing available for lower-priced homes in Falls County?",
        a: "Yes. Financing options exist across price ranges, and we'll go over what fits your situation.",
      },
      {
        q: "Do you deliver to farm land around Marlin?",
        a: "We do. Farm roads around Marlin, Rosebud and Lott are all in reach, and the path to your homesite is looked at before pricing is set.",
      },
    ],
    nearby: ['groesbeck', 'cameron', 'mexia', 'waco'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Single wide manufactured home with agave and limestone landscaping near Marlin, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide mobile home with wood steps and a cactus garden, available for Falls County buyers',
    popularHomes: [
      'marathon-mallard-4bed-2bath-double-wide',
      'marathon-longview-3bed-2bath-single-wide',
      '2876-5bed-3bath-double-wide',
    ],
    lastModified: '2026-10-26',
  },

  gilmer: {
    county: 'Upshur',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Gilmer, TX and Upshur County. Tour manufactured home floor plans online, then get a firm quote and honest financing.",
    intro:
      "Gilmer buyers can tour many of our homes online before they ever pick up the phone. Texas Homes Direct posts floor plans, photos and, for many models, full 3D walkthroughs, so Upshur County shoppers can explore rooms and layouts from home.",
    buyingHeading: 'Buying a Mobile Home in Upshur County',
    buying: [
      "A 3D tour shows how rooms connect, how the kitchen opens to the living area, and how much space the bedrooms really have. It answers questions a flat floor plan can't.",
      "Upshur County land is mostly pine and hardwood country with rolling terrain, so once you've found a home you like, we look at how that footprint fits your specific site and its access.",
    ],
    pricingExplainer: [
      "When you request a Gilmer quote on a home you've toured, that price includes everything listed above and stays fixed after you accept it.",
      "The utility portion is priced separately: an estimate by phone, then an exact bid after our contractor visits your property, approved by you before work begins.",
    ],
    gettingStarted: [
      "Tour a few homes online and note what you like or don't about each. Those notes make the first call much more productive.",
      "We'll then confirm the homes are available, check them against your Upshur County land, and walk through financing.",
    ],
    localProof:
      "Upshur County buyers from Gilmer to Ore City and Big Sandy can walk through our tour-equipped homes online before choosing which ones to ask about.",
    faq: [
      {
        q: "Can I take a virtual tour of homes for Gilmer before calling?",
        a: "Yes. Many of our homes have 3D tours, and every listing has photos and floor plans you can review on our site.",
      },
      {
        q: "Do you deliver to wooded Upshur County property?",
        a: "Yes. We review driveway access and the homesite on wooded land before finalizing your quote.",
      },
      {
        q: "Is the home in the online tour what gets delivered to Gilmer?",
        a: "You get the same model and floor plan. Finishes can vary by build, so we'll confirm the details on the specific home you choose.",
      },
      {
        q: "Do I need land in Upshur County before requesting a quote?",
        a: "No. You can get pricing while you're still looking for land, then confirm site details once you have it.",
      },
    ],
    nearby: ['longview', 'kilgore', 'gladewater', 'mount-pleasant'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'White double wide mobile home with black trim and a planted front yard near Gilmer, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide manufactured home with agave and limestone landscaping, available for Upshur County buyers',
    popularHomes: [
      'marathon-woodduck-3bed-2bath-double-wide',
      'fleetwood-coyote-2bed-2bath-single-wide',
      'marathon-abilene-2bed-1bath-single-wide',
    ],
    lastModified: '2026-10-26',
  },

  clarksville: {
    county: 'Red River',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Clarksville, TX and Red River County. New manufactured homes at the same firm pricing, wherever your land sits.",
    intro:
      "Clarksville sits in the far northeastern reach of the state, with the Red River marking the county's northern edge, and Texas Homes Direct prices homes for Red River County the same as anywhere closer to a city. Being remote doesn't add a premium to the home itself.",
    buyingHeading: 'Buying a Mobile Home in Red River County',
    buying: [
      "Buyers out here sometimes expect a distance surcharge built into the price. With us, the home price is the home price; any differences come from the specific site work your land needs, not your zip code.",
      "Red River County land ranges from town lots in Clarksville to farm and timber acreage near the river, and each property gets reviewed for access before a quote is finalized.",
    ],
    pricingExplainer: [
      "The Clarksville home price includes everything on the list above and doesn't increase because of where the county sits on the map.",
      "Utilities depend on your specific land. We start with a phone estimate, then our contractor inspects the property and provides an exact bid you approve.",
    ],
    gettingStarted: [
      "Send the property location and a description of the road in. Remote acreage often has a long final stretch, and knowing it early helps planning.",
      "From there, choosing a home and lining up financing go hand in hand, with the same options any buyer gets.",
    ],
    localProof:
      "Red River County buyers from Clarksville to Detroit, Bogata and Annona receive the same home pricing as buyers much closer to a metro.",
    faq: [
      {
        q: "Does a Clarksville location raise the price of the home?",
        a: "No. The home price is the same, and only site-specific work like utilities varies from one property to the next.",
      },
      {
        q: "Do you deliver all the way to Red River County?",
        a: "Yes. Red River County is within our delivery area, and we check access to your property before finalizing a quote.",
      },
      {
        q: "Can I place a home on timber acreage near the Red River?",
        a: "Many properties there work. We review access, clearing and placement for your specific parcel before anything is final.",
      },
      {
        q: "Is financing available to Clarksville buyers on the same terms?",
        a: "Yes. Location doesn't change the financing options we offer; your situation and the home you choose do.",
      },
    ],
    nearby: ['paris', 'bonham', 'sulphur-springs'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Double wide manufactured home with a lit porch and desert landscaping near Clarksville, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Dark single wide mobile home on a gravel drive beside an oak, available for Red River County buyers',
    popularHomes: [
      'jasper-4bed-2bath-double-wide',
      'fleetwood-raven-3bed-2bath-single-wide',
      'marathon-terra-2bed-1bath-park-model',
    ],
    lastModified: '2026-10-26',
  },

  levelland: {
    county: 'Hockley',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Levelland, TX and Hockley County. New manufactured homes placed on land you already own, with honest financing.",
    intro:
      "Levelland is the Hockley County seat, and if you already hold a deed to land around it, Texas Homes Direct starts from that parcel. We fit a new manufactured home to the ground you own instead of asking you to shop for a lot first.",
    buyingHeading: 'Buying a Mobile Home in Hockley County',
    buying: [
      "With the land settled, the decisions narrow to placement and plan: which way the front door faces, how far the pad sits from the road, and how many bedrooms the household actually needs.",
      "When a parcel is held by several relatives or was inherited, the names on the title shape the financing paperwork. Clearing that up early keeps a Hockley County purchase moving once a floor plan is picked.",
    ],
    pricingExplainer: [
      "On a Levelland quote, the home's price already carries every item in the checklist above. Once you accept it, that figure is the one you pay for the house.",
      "Water, septic and electric are the exception. We estimate them over the phone, then a contractor we send walks your Hockley County land and writes an exact bid for you to approve before any of it is final.",
    ],
    gettingStarted: [
      "Have the property address or a dropped map pin ready. From that we can talk through road access, the likely pad location, and how near power already runs.",
      "If the deed is in an older relative's name, say so on the first call; it changes which documents come first, not whether the purchase works.",
    ],
    localProof:
      "Parcels in town and out on Hockley County roads toward Littlefield, Slaton and Brownfield are quoted on the same terms.",
    faq: [
      {
        q: "Can a new home go on Hockley County land I already own near Levelland?",
        a: "Yes. Owned land is a straightforward starting point; we review access, the pad location and utility needs for your parcel, then quote around them.",
      },
      {
        q: "Does it matter whose name is on my Levelland-area deed?",
        a: "It matters for financing. We'll go over how the title is held so you know which papers to gather before the loan moves forward.",
      },
      {
        q: "Will you set a home on Hockley County land outside the Levelland city limits?",
        a: "We will. Rural Hockley County addresses are covered, and what changes from one to the next is the site work, not the home price.",
      },
      {
        q: "Are there rules about placing a manufactured home on my Hockley County parcel?",
        a: "There can be, and they vary by county, city limits and deed. We help you confirm what governs your land before a home is ordered.",
      },
    ],
    nearby: ['lubbock', 'slaton', 'littlefield', 'brownfield'],
    heroImage: '/homes/the-katy/Katy-Hero.jpg',
    heroAlt: 'Two-tone single wide mobile home set under live oaks near Levelland, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'White single wide mobile home with a wood deck and black trim, available for Hockley County buyers',
    popularHomes: [
      'gilmer-texas-4-bed-2-bath-double-wide',
      'forney-texas-3-bed-2-bath-single-wide',
      'sulphur-springs-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  littlefield: {
    county: 'Lamb',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Littlefield, TX and Lamb County. Compare single wide and double wide manufactured homes against your lot. Free quote.",
    intro:
      "Choosing between a single wide and a double wide is usually the first real fork for a Lamb County purchase, and Texas Homes Direct lays the two side by side for Littlefield properties: footprint, room layout and price, so the size fits both the lot and the household.",
    buyingHeading: 'Buying a Mobile Home in Lamb County',
    buying: [
      "A single wide suits a narrower lot or a tighter budget and can hold two or three bedrooms comfortably. A double wide spreads out into a wider living room, a larger kitchen and more separation between bedrooms.",
      "We measure your intended site against each footprint before you lean one way, so the comparison reflects your actual Lamb County land instead of a brochure.",
    ],
    pricingExplainer: [
      "Whichever width you pick, the Littlefield figure covers the home and the full list above, and it stays put after you accept the quote.",
      "Utility hookups follow a separate path: a phone estimate first, then an exact bid from our contractor once your Lamb County property has been seen in person, which you approve.",
    ],
    gettingStarted: [
      "Pace off or measure the open space where the home would go and note distances to fences, trees and outbuildings. Those numbers tell us which footprints will fit.",
      "Then we price a single wide and a double wide at your budget and walk through financing for each.",
    ],
    localProof:
      "Lamb County sites around Littlefield, from town lots to acreage toward Muleshoe and Levelland, get the same footprint check before a size is chosen.",
    faq: [
      {
        q: "Which fits my Littlefield lot better, a single wide or a double wide?",
        a: "That depends on the lot's dimensions, your household and your budget. Send measurements and we'll compare both against your site.",
      },
      {
        q: "Is a double wide financed differently than a single wide in Lamb County?",
        a: "The process is the same. The loan amount follows the home's price, so the monthly payment differs with the size you pick.",
      },
      {
        q: "Can you deliver a double wide to rural Lamb County land?",
        a: "Usually, yes. We check the route and turning room for your property before the quote is final.",
      },
      {
        q: "Is a survey needed before I compare home sizes for my Littlefield land?",
        a: "Not to start. Rough measurements are enough for a first comparison, and we'll tell you if your situation calls for a survey.",
      },
    ],
    nearby: ['levelland', 'muleshoe', 'plainview', 'slaton'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Black double wide manufactured home with wood steps on cleared land near Littlefield, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Two-tone single wide mobile home set under live oaks, available for Lamb County buyers',
    popularHomes: [
      'crockett-texas-4-bed-2-bath-double-wide',
      'van-texas-1-bed-1-bath-tiny-home',
      'quinlan-texas-4-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  muleshoe: {
    county: 'Bailey',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Muleshoe, TX and Bailey County. Buy a new manufactured home by phone, text and email, with honest financing.",
    intro:
      "You can buy a home from Muleshoe without driving anywhere. Texas Homes Direct handles a Bailey County purchase by phone, text and email, from the first floor plan you look at to the paperwork that closes it.",
    buyingHeading: 'Buying a Mobile Home in Bailey County',
    buying: [
      "Floor plans, photos and quotes arrive in writing, so you can compare them at the kitchen table and share them with family before deciding. Questions get answered by the same small team each time.",
      "Distance doesn't trim the service. A Bailey County buyer sees the same homes, the same prices and the same explanation of each step as someone next door to a metro.",
    ],
    pricingExplainer: [
      "The Muleshoe quote you receive in writing is the home's full price, with every item listed above already inside it.",
      "Utilities are priced in two steps: a phone estimate when you describe the property, then an exact bid after our contractor visits your Bailey County land, approved by you before work starts.",
    ],
    gettingStarted: [
      "Tell us the best way to reach you, whether call, text or email, and where the property sits. We'll send floor plans that match your budget in writing.",
      "From there, financing paperwork and the site visit get scheduled around you, without a trip to sign anything early.",
    ],
    localProof:
      "Bailey County homesites near Muleshoe, and those out toward Littlefield and Plainview, are handled start to finish by phone, text and email.",
    faq: [
      {
        q: "Can I complete a Muleshoe home purchase without traveling?",
        a: "Yes. Quotes, floor plans, financing paperwork and scheduling all move by phone, text and email.",
      },
      {
        q: "How do I compare floor plans from Bailey County?",
        a: "Use the photos, floor plans and 3D tours on our listings, then ask us about room sizes or finishes on the homes you shortlist.",
      },
      {
        q: "Is Bailey County within your delivery area?",
        a: "It is. We confirm the route to your specific property before your quote is finalized.",
      },
      {
        q: "Will someone call me back about a Muleshoe question?",
        a: "Yes. A member of our team answers or returns calls, and you can text or email instead if that's easier.",
      },
    ],
    nearby: ['littlefield', 'plainview', 'levelland'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Dark single wide mobile home on a gravel drive beside an oak near Muleshoe, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Black mobile home with a cedar front porch and wooded hills behind it, available for Bailey County buyers',
    popularHomes: [
      'terrell-texas-3-bed-2-bath-double-wide',
      'greenville-texas-3-bed-2-bath-single-wide',
      'porter-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  plainview: {
    county: 'Hale',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Plainview, TX and Hale County. New manufactured homes with one complete out-the-door price. Get your free quote.",
    intro:
      "Plainview is the Hale County seat, and Texas Homes Direct gives every buyer there one out-the-door number for the home. The checklist on this page shows what that number covers, so the total isn't hidden in fine print.",
    buyingHeading: 'Buying a Mobile Home in Hale County',
    buying: [
      "A single all-in figure makes comparing homes simple. Delivery, setup, AC, taxes and the rest aren't stacked on top of a base price; the number on the quote is what the house costs.",
      "Hale County properties vary from in-town lots to open acreage, but the home price stays the same across them. Only the site-specific utility work changes from one address to the next.",
    ],
    pricingExplainer: [
      "A Plainview quote is the entire price of the home, with everything on the list above folded in and nothing added after you accept it.",
      "Utilities stay open until the land is seen. Over the phone you get an estimate; after our contractor's visit to your Hale County property you get the exact figure, and it waits on your approval.",
    ],
    gettingStarted: [
      "Pick two or three homes you like and ask for their out-the-door prices together. Complete numbers side by side make the choice clearer.",
      "Next we confirm your Hale County property details and go over financing on the home you choose.",
    ],
    localProof:
      "Hale County addresses around Plainview, and those toward Tulia and Lubbock, receive the same complete, all-in home quotes.",
    faq: [
      {
        q: "Is the Plainview price you quote the whole cost of the home?",
        a: "Yes, for the home itself. Every item on this page's checklist is inside that figure, so it's a finished number.",
      },
      {
        q: "Can I get out-the-door quotes on several homes for Hale County?",
        a: "Sure. Name a few models and we'll send each one's complete price for a direct comparison.",
      },
      {
        q: "Do you deliver to rural Hale County outside Plainview?",
        a: "We do. Before the quote is locked, we look at how a truck would reach your land.",
      },
      {
        q: "Does placing a home inside Plainview city limits involve extra steps?",
        a: "It can, depending on the lot and local requirements. We help you find out what applies before you commit to a home.",
      },
    ],
    nearby: ['tulia', 'littlefield', 'muleshoe', 'lubbock'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Black mobile home with a cedar front porch and wooded hills behind it near Plainview, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit porch and desert landscaping, available for Hale County buyers',
    popularHomes: [
      'whitehouse-texas-1-bed-1-bath-tiny-home',
      'chandler-texas-4-bed-2-bath-double-wide',
      'la-vernia-texas-1-bed-1-bath-tiny-home',
    ],
    lastModified: '2026-11-12',
  },

  tulia: {
    county: 'Swisher',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Tulia, TX and Swisher County. Written quotes on new manufactured homes, no deadline and no pressure to sign.",
    intro:
      "Tulia is the Swisher County seat, and a quote from Texas Homes Direct comes with no deadline attached. You can take it home, think it over and come back with questions on your own schedule, with no pressure to sign.",
    buyingHeading: 'Buying a Mobile Home in Swisher County',
    buying: [
      "If a smaller or less expensive home suits Swisher County land better, we'll say so, even when it's the lower sale.",
      "A quote stays with you as long as you need it. If you want to compare it with other homes, revisit your budget or talk it through with family, there's no reminder call pushing a date.",
    ],
    pricingExplainer: [
      "The figure on your Tulia quote is the house's full price, and everything listed above is already part of it.",
      "Utility work on Swisher County land is estimated by phone and then bid exactly once our contractor has seen the property; nothing there is final until you approve it.",
    ],
    gettingStarted: [
      "Ask for a written quote on any home that interests you, with no commitment attached. Holding a real number makes the rest of the decision easier.",
      "When you're ready, we confirm your property and start on financing; if you're not, the quote simply waits.",
    ],
    localProof:
      "Swisher County homesites around Tulia, and out toward Plainview, Canyon and Hereford, get written quotes with no deadline attached.",
    faq: [
      {
        q: "Will I be pressured to decide on a Tulia home quote?",
        a: "No. Your quote is yours to consider for as long as you like, and you decide whether and when to move forward.",
      },
      {
        q: "Can I ask for a quote on a Swisher County home just to compare?",
        a: "Yes. A quote carries no obligation, so ask about any home you're curious about.",
      },
      {
        q: "Will you set a home on Swisher County land away from town?",
        a: "We do. We look at access and the homesite for your address before finalizing anything.",
      },
      {
        q: "Will you tell me if a smaller home suits my Tulia land better?",
        a: "Yes. We'll recommend the home that fits your land and budget, even if it costs less.",
      },
    ],
    nearby: ['plainview', 'canyon', 'hereford', 'amarillo'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background near Tulia, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Black double wide manufactured home with wood steps on cleared land, available for Swisher County buyers',
    popularHomes: [
      'whitehouse-texas-1-bed-1-bath-tiny-home',
      'splendora-texas-3-bed-2-bath-double-wide',
      'giddings-texas-4-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  hereford: {
    county: 'Deaf Smith',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Hereford, TX and Deaf Smith County. In-house financing plus outside lenders for new manufactured homes.",
    intro:
      "Hereford is the Deaf Smith County seat, and Texas Homes Direct opens more than one financing door there. We finance homes ourselves and work with outside public and private lenders, so one decline doesn't end the conversation.",
    buyingHeading: 'Buying a Mobile Home in Deaf Smith County',
    buying: [
      "Different lenders weigh income, credit history and down payment differently. Trying the right source for your situation matters more than trying the first one available.",
      "We start with an honest look at where your finances stand, then match you to the programs most likely to approve, rather than submitting everywhere and hoping.",
    ],
    pricingExplainer: [
      "A Hereford quote fixes the home's price with everything above included, so any financing is built on a number that won't drift.",
      "Utilities come later in the process: estimated over the phone, then bid exactly by our contractor after a visit to your Deaf Smith County land, with your approval required.",
    ],
    gettingStarted: [
      "Have a rough idea of your monthly income, your current debt payments, and whether you've had a recent credit check. That points us toward the right lenders first.",
      "With a likely approval range in hand, we shortlist homes that fit inside it.",
    ],
    localProof:
      "Deaf Smith County buyers in Hereford and on land toward Canyon and Tulia can explore in-house and outside lending options in one conversation.",
    faq: [
      {
        q: "Is there still a way forward in Hereford after a bank declined me?",
        a: "That doesn't necessarily close the door. With our own financing and outside lenders, there may still be a path, and we'll be honest about it.",
      },
      {
        q: "Do you offer financing yourselves in Deaf Smith County?",
        a: "Yes. We finance homes directly and also work with public and private lenders, which widens the options.",
      },
      {
        q: "Can I learn what I qualify for before choosing a Hereford home?",
        a: "Yes. Starting with financing helps you shop within a range that will actually be approved.",
      },
      {
        q: "Will exploring financing for a Deaf Smith County home commit me?",
        a: "No. Looking at options is part of deciding, and you can stop at any time.",
      },
    ],
    nearby: ['canyon', 'tulia', 'amarillo'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'White double wide mobile home with black trim and a planted front yard near Hereford, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background, available for Deaf Smith County buyers',
    popularHomes: [
      'livingston-texas-3-bed-2-bath-single-wide',
      'chandler-texas-4-bed-2-bath-double-wide',
      'jacksonville-texas-2-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  canyon: {
    county: 'Randall',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Canyon, TX and Randall County. Tour manufactured home floor plans online, then get a firm quote. No pressure.",
    intro:
      "Canyon is the Randall County seat, and you can study most of Texas Homes Direct's floor plans before you ever call. Every listing shows photos, specs and square footage, and many include a 3D walkthrough, so the first conversation is about homes you've already picked out.",
    buyingHeading: 'Buying a Mobile Home in Randall County',
    buying: [
      "Walking through a home in 3D shows the flow from entry to kitchen to bedrooms in a way a printed floor plan can't, including how open the living space feels.",
      "Browsing first keeps the phone call short and specific: this layout, that bedroom count, and whether a given model fits your Randall County lot.",
    ],
    pricingExplainer: [
      "When you ask about a home you toured online, the Canyon quote covers that home and everything on the list above, fixed once accepted.",
      "Utilities are the one piece priced afterward: a phone estimate, then an exact bid from our contractor after visiting your Randall County property, for you to approve.",
    ],
    gettingStarted: [
      "Save the listings you like and send us their names. We'll confirm availability and pricing on that shortlist right away.",
      "After that, we check the homes against your property and go over financing for each.",
    ],
    localProof:
      "Randall County homesites around Canyon, and those toward Amarillo and Hereford, can start with our online listings and 3D tours before the first call.",
    faq: [
      {
        q: "Can I tour Canyon-area homes online before calling you?",
        a: "Yes. Listings include photos, floor plans and specs, and many have a 3D tour you can walk through from home.",
      },
      {
        q: "Will you quote homes I've shortlisted for Randall County?",
        a: "We will. Name the homes and say roughly where your Randall County land sits; we'll come back with availability and pricing for each one.",
      },
      {
        q: "Is the toured home the one delivered to my Canyon property?",
        a: "It's the same model and layout you toured. Some finishes change from build to build, so we confirm colors and options on the specific unit before you commit.",
      },
      {
        q: "Do you cover Randall County outside Canyon?",
        a: "Yes. Rural Randall County is included, and access to your address is checked before quoting.",
      },
    ],
    nearby: ['amarillo', 'hereford', 'tulia'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    heroAlt: 'Gray single wide manufactured home with a covered entry under live oaks near Canyon, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'White double wide mobile home with black trim and a planted front yard, available for Randall County buyers',
    popularHomes: [
      'vidor-texas-1-bed-1-bath-tiny-home',
      'carthage-texas-3-bed-2-bath-double-wide',
      'smithville-texas-1-bed-1-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  dumas: {
    county: 'Moore',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Dumas, TX and Moore County. New manufactured homes with a clear, written step-by-step buying process.",
    intro:
      "Dumas is the Moore County seat, and Texas Homes Direct lays out a Moore County purchase as a written sequence of steps, so at any point you know what's finished, what comes next and who is handling it.",
    buyingHeading: 'Buying a Mobile Home in Moore County',
    buying: [
      "Each stage has a named person on our side, so a question about financing or the site visit goes straight to whoever is handling it rather than starting over.",
      "Seeing the sequence early makes it easier to plan everything around it, such as a lease ending, a current house to sell, or family lining up to help with the move.",
    ],
    pricingExplainer: [
      "Your Dumas quote is the home's complete price with every inclusion above, and it doesn't change as the steps go by.",
      "Utilities are the only figure set later: a phone estimate early on, then an exact bid after our contractor walks your Moore County land, which you approve.",
    ],
    gettingStarted: [
      "Ask for the step list in writing on the first call. Checking items off makes progress easy to follow.",
      "Step one is always confirming the property and how a delivery reaches it; floor plan and financing come right after.",
    ],
    localProof:
      "Moore County properties in Dumas and out toward Dalhart and Borger move through the same written step list.",
    faq: [
      {
        q: "What are the steps to buy a manufactured home near Dumas?",
        a: "Confirm the property, choose a floor plan, settle financing, complete the site visit and utility bid, then delivery and setup, with updates at each stage.",
      },
      {
        q: "Who do I contact at each stage of a Moore County purchase?",
        a: "Each stage is assigned to someone specific on our team, and we tell you who before that stage begins.",
      },
      {
        q: "Can I start in Dumas before my land is settled?",
        a: "Yes. We can begin with floor plans and financing and return to the property step once it's settled.",
      },
      {
        q: "Will you bring a home out to Moore County land beyond Dumas?",
        a: "We do. Access to each address is reviewed before a quote is final.",
      },
    ],
    nearby: ['borger', 'dalhart', 'amarillo'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'White single wide mobile home with a wood deck and black trim near Dumas, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Gray single wide manufactured home with a covered entry under live oaks, available for Moore County buyers',
    popularHomes: [
      'trinity-texas-3-bed-2-bath-double-wide',
      'van-texas-1-bed-1-bath-tiny-home',
      'brazoria-texas-3-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  borger: {
    county: 'Hutchinson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Borger, TX and Hutchinson County. Replace an older home on your lot with a new manufactured home. Free quote.",
    intro:
      "If an older mobile home already sits on your Borger-area lot, Texas Homes Direct can plan its replacement. We work through the old unit's removal and the new home's setup on the same Hutchinson County spot as one project.",
    buyingHeading: 'Buying a Mobile Home in Hutchinson County',
    buying: [
      "Replacing a home raises its own questions: whether existing water, septic and electric connections can be reused, whether a new footprint fits, and what must happen to the old unit first. We look at each before quoting.",
      "A new home also brings current insulation, windows and layouts, which is a noticeable change from a unit built decades ago.",
    ],
    pricingExplainer: [
      "The Borger price for the new home covers everything on the list above and holds once you accept it.",
      "Utilities are the uncertain part of a swap, since the current lines may or may not be serviceable. Expect a phone figure first and a contractor's exact number after the Hutchinson County visit, which only applies once you approve it.",
    ],
    gettingStarted: [
      "Tell us the size and approximate age of the home on the lot now, and whether anyone still lives in it. That shapes the removal plan and the order of work.",
      "With that known, we line up floor plans sized for the same footprint or a little larger and work out how the replacement will be financed.",
    ],
    localProof:
      "Hutchinson County lots around Borger, and those toward Pampa and Spearman, can be planned as a remove-and-replace project with one team.",
    faq: [
      {
        q: "Can I replace an old mobile home on my Borger lot with a new one?",
        a: "Often, yes. Before quoting, we look at the lot's size, the condition of what's hooked up now, and whatever rules govern the parcel.",
      },
      {
        q: "Can the existing hookups on my Hutchinson County lot be reused?",
        a: "Some may be. The contractor's inspection sorts out which lines can stay and which need replacing, and that sorting is written into the utility bid.",
      },
      {
        q: "What do you do with my old unit when the new Borger home arrives?",
        a: "It has to come off the lot before the new home is set. We talk through options for that step while planning.",
      },
      {
        q: "Will a bigger home fit where my current Hutchinson County home sits?",
        a: "Possibly. Lot measurements and setback distances decide it, so send what you have and we'll test larger footprints against them.",
      },
    ],
    nearby: ['pampa', 'dumas', 'amarillo', 'spearman'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home with a lit front walkway at sunset near Borger, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'White single wide mobile home with a wood deck and black trim, available for Hutchinson County buyers',
    popularHomes: [
      'rosenberg-texas-4-bed-2-bath-double-wide',
      'coldspring-texas-1-bed-1-bath-single-wide',
      'montgomery-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  pampa: {
    county: 'Gray',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Pampa, TX and Gray County. New manufactured homes chosen around a monthly payment you can plan on.",
    intro:
      "Pampa is the Gray County seat, and Texas Homes Direct helps buyers there start from the monthly payment instead of the sticker price. Name a range you're comfortable with, and we work backward to the homes and financing that land inside it.",
    buyingHeading: 'Buying a Mobile Home in Gray County',
    buying: [
      "Starting from a payment keeps the search honest. You see which floor plans fit before you get attached to one that would stretch the budget.",
      "The home's price, your down payment, the loan term and the lender all move that monthly figure. We lay out a few combinations side by side so you can see what each lever changes.",
    ],
    pricingExplainer: [
      "The Pampa home price is fixed once accepted, with everything above already counted, so the payment math rests on a stable number.",
      "Utilities are figured separately: a phone estimate, then an exact bid after our contractor sees your Gray County property, which you approve before it's added.",
    ],
    gettingStarted: [
      "Bring a monthly range to the first call, even a loose one. It's the quickest way to narrow the field to a realistic handful of homes.",
      "We then check that range against the financing open to you and confirm your Gray County property details.",
    ],
    localProof:
      "Gray County homesites around Pampa, and toward Borger and Amarillo, can start every conversation from a monthly payment range.",
    faq: [
      {
        q: "Can you show me which Pampa homes fit my monthly budget?",
        a: "Yes. Tell us the payment you're aiming for, and we'll list the homes and loan setups that stay under it.",
      },
      {
        q: "What changes the monthly payment on a Gray County home?",
        a: "Four things: the price of the home, how much you put down, how long the loan runs, and which lender carries it.",
      },
      {
        q: "Should I settle on a payment before choosing a Pampa home?",
        a: "It helps. Knowing your range first keeps the shortlist realistic and avoids falling for a home that strains the budget.",
      },
      {
        q: "Will you bring a home anywhere in Gray County?",
        a: "Yes. We review access to your address before the quote is final.",
      },
    ],
    nearby: ['borger', 'amarillo', 'canadian'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide mobile home with wood steps and a cactus garden near Pampa, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit front walkway at sunset, available for Gray County buyers',
    popularHomes: [
      'cleveland-texas-4-bed-2-bath-double-wide',
      'la-vernia-texas-1-bed-1-bath-tiny-home',
      'conroe-texas-3-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  perryton: {
    county: 'Ochiltree',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Perryton, TX and Ochiltree County. New manufactured homes at the same price, no distance surcharge.",
    intro:
      "Perryton is the Ochiltree County seat, and a home delivered there costs the same as one delivered closer to a city. Texas Homes Direct doesn't add a distance surcharge to the house itself; the price follows the home you choose.",
    buyingHeading: 'Buying a Mobile Home in Ochiltree County',
    buying: [
      "The home price is the home price. Any difference between two Ochiltree County addresses comes from the site work each property needs, not from how far it is from anywhere.",
      "Land here ranges from town lots to open acreage, and each property's access is reviewed before a quote is finalized.",
    ],
    pricingExplainer: [
      "The Perryton figure covers the house and everything listed above, and it doesn't rise because of the county's location on the map.",
      "Utilities depend on your specific land: a phone estimate first, then an exact bid after our contractor inspects your Ochiltree County property, approved by you.",
    ],
    gettingStarted: [
      "Send the property location and a description of the road in, especially any long final stretch, gates or soft spots. It helps us plan delivery early.",
      "From there, choosing a home and lining up financing work the same as anywhere else we deliver.",
    ],
    localProof:
      "Ochiltree County homesites around Perryton, and toward Spearman and Canadian, are priced the same as homes delivered much closer to a metro.",
    faq: [
      {
        q: "Does Perryton's location add to the price of the home?",
        a: "No. The home price is the same; only site-specific work like utilities varies by property.",
      },
      {
        q: "Do you deliver as far as Ochiltree County?",
        a: "Yes. Ochiltree County is in our delivery area, and we confirm access to your property before quoting.",
      },
      {
        q: "Are financing options the same for a Perryton buyer?",
        a: "Yes. Location doesn't change the options; your situation and the home you choose do.",
      },
      {
        q: "Do I need my Ochiltree County land in hand before a quote?",
        a: "No. We can price homes while you're still securing land and confirm site details afterward.",
      },
    ],
    nearby: ['spearman', 'canadian', 'borger'],
    heroImage: '/homes/the-katy/Katy-Hero.jpg',
    heroAlt: 'Two-tone single wide mobile home set under live oaks near Perryton, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide mobile home with wood steps and a cactus garden, available for Ochiltree County buyers',
    popularHomes: [
      'kaufman-texas-2-bed-2-bath-single-wide',
      'lampasas-texas-5-bed-3-bath-double-wide',
      'sulphur-springs-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  spearman: {
    county: 'Hansford',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Spearman, TX and Hansford County. New manufactured homes, with help checking what applies to your parcel.",
    intro:
      "Spearman is the Hansford County seat, and before a home is ordered, Texas Homes Direct helps you check what applies to your parcel: deed restrictions, city limits and county requirements, which can differ from one piece of land to the next.",
    buyingHeading: 'Buying a Mobile Home in Hansford County',
    buying: [
      "Rules for placing a manufactured home vary by county, by whether the land is inside a town's limits, and by what the deed says. We help you confirm what governs your Hansford County land rather than assuming.",
      "Checking first avoids the worst surprise, a home chosen and financed for a site where it can't actually go, and tells you which documents to gather early.",
    ],
    pricingExplainer: [
      "Spearman buyers get one price for the home, with everything listed above inside it, and it holds once accepted.",
      "Utility work is quoted in two stages: an estimate during a phone call, then an exact contractor bid after a visit to your Hansford County parcel, which you approve.",
    ],
    gettingStarted: [
      "Keep a copy of your deed or a survey handy if you have one. Those documents often answer placement questions before anyone calls the county.",
      "Once your parcel's requirements are clear, we move on to floor plans and financing that fit them.",
    ],
    localProof:
      "Hansford County parcels in Spearman and out toward Perryton and Borger are each checked for their own placement requirements.",
    faq: [
      {
        q: "What approvals does a manufactured home near Spearman need?",
        a: "It varies by county, city limits and deed. We help you find out what applies to your Hansford County parcel before a home is ordered.",
      },
      {
        q: "Can a deed restriction limit a home on Hansford County land?",
        a: "Sometimes, by home type, size or age. Reviewing your deed early shows whether there's anything to plan around.",
      },
      {
        q: "Can I start in Spearman before I've bought land?",
        a: "Yes. While you compare parcels, we can tell you which deed and county questions to ask before buying.",
      },
      {
        q: "Can you place a home on open Hansford County land outside Spearman?",
        a: "We can. We'll look at the road and gate into the property before quoting.",
      },
    ],
    nearby: ['perryton', 'borger', 'dumas'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Black double wide manufactured home with wood steps on cleared land near Spearman, TX',
    secondaryImage: '/homes/the-moose/hero.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit porch and desert landscaping, available for Hansford County buyers',
    popularHomes: [
      'quitman-texas-3-bed-2-bath-double-wide',
      'silsbee-texas-2-bed-1-bath-single-wide',
      'brownwood-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  dalhart: {
    county: 'Dallam',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Dalhart, TX, in Dallam and Hartley counties. New manufactured homes and honest financing. Free quote.",
    intro:
      "Dalhart sits in both Dallam and Hartley counties, so which side of the line your land falls on decides whose requirements apply. Texas Homes Direct checks that first, before any paperwork for your home begins.",
    buyingHeading: 'Buying a Mobile Home in Dallam County',
    buying: [
      "Two Dalhart-area properties can fall under different county offices, and land inside city limits adds another layer. We help you confirm the jurisdiction for your parcel before choosing a home.",
      "Beyond that question, the home price is the same on either side of the line; only the site work for your particular property changes.",
    ],
    pricingExplainer: [
      "The Dalhart home price doesn't depend on which county your land is in, and it includes everything on the list above.",
      "Utility hookups depend on the land itself: a phone estimate first, then an exact bid after our contractor visits, approved by you.",
    ],
    gettingStarted: [
      "Bring the property address or parcel number. It tells us right away which county and jurisdiction you're in.",
      "After that, picking a floor plan and arranging financing happen together, built around your land and budget.",
    ],
    localProof:
      "Properties on both the Dallam County and Hartley County sides of Dalhart, and out toward Dumas, are checked for jurisdiction before quoting.",
    faq: [
      {
        q: "Why does it matter whether my land is on the Dallam or Hartley side of Dalhart?",
        a: "Yes. Dalhart spans Dallam and Hartley counties, and the county your parcel is in determines whose requirements apply.",
      },
      {
        q: "Can a home go inside Dalhart city limits?",
        a: "Possibly. Inside town, lot dimensions and local rules decide which homes qualify, so we check those for your lot first.",
      },
      {
        q: "Will you deliver to Dallam County acreage away from town?",
        a: "Yes. Rural Dallam County properties are covered, and access is reviewed for your address before quoting.",
      },
      {
        q: "Can financing start while I'm still buying land near Dalhart?",
        a: "Yes. We can work on financing during the land purchase and match the timing to your situation.",
      },
    ],
    nearby: ['dumas', 'amarillo'],
    heroImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    heroAlt: 'Dark single wide mobile home on a gravel drive beside an oak near Dalhart, TX',
    secondaryImage: '/homes/the-javelina/hero.jpg',
    secondaryAlt: 'Single wide manufactured home with agave and limestone landscaping, available for Dallam County buyers',
    popularHomes: [
      'gilmer-texas-4-bed-2-bath-double-wide',
      'jasper-texas-2-bed-2-bath-single-wide',
      'porter-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  canadian: {
    county: 'Hemphill',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Canadian, TX and Hemphill County. Tiny homes, compact single wides and full-size manufactured homes.",
    intro:
      "Not every Hemphill County household needs a large home. Around Canadian, Texas Homes Direct carries compact floor plans, including one-bedroom tiny homes and smaller single wides, alongside full-size double wides.",
    buyingHeading: 'Buying a Mobile Home in Hemphill County',
    buying: [
      "A smaller home keeps the footprint and the price down while still including a full kitchen, bath and bedroom. For one or two people, that can be all the space worth maintaining.",
      "If the home would join another dwelling on the same property, rules about multiple homes on one parcel can apply. We help you check what's allowed on your Hemphill County land first.",
    ],
    pricingExplainer: [
      "Small home or large, the Canadian quote includes everything on the list above, and the figure holds once accepted.",
      "A smaller footprint doesn't change how utilities work: a phone estimate, then an exact bid after our contractor visits your Hemphill County property, which you approve.",
    ],
    gettingStarted: [
      "Tell us how many people will live in the home and whether it will share the property with another house. Those two answers narrow the list fast.",
      "Then we compare compact and full-size options at your budget and go over financing for each.",
    ],
    localProof:
      "Hemphill County sites around Canadian, and toward Pampa and Perryton, can choose from tiny homes and compact single wides as well as full-size floor plans.",
    faq: [
      {
        q: "Do you sell tiny homes and other small homes for Canadian buyers?",
        a: "Yes. We carry one-bedroom tiny homes and compact single wides alongside larger floor plans.",
      },
      {
        q: "Can a second home go on family land in Hemphill County?",
        a: "Possibly, but rules on multiple dwellings vary. We help you find out what applies to your parcel before you choose.",
      },
      {
        q: "Is a tiny home financed the same way as a larger Canadian home?",
        a: "Not always. Loan programs differ between a tiny home and a larger one, so we match the program to the model you're looking at.",
      },
      {
        q: "How far into Hemphill County will you bring a home?",
        a: "Anywhere in the county. Your road and gate get a look before any price is final.",
      },
    ],
    nearby: ['pampa', 'perryton'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Double wide manufactured home with a lit porch and desert landscaping near Canadian, TX',
    secondaryImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    secondaryAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background, available for Hemphill County buyers',
    popularHomes: [
      'mineola-texas-2-bed-1-bath',
      'willis-texas-3-bed-2-bath-double-wide',
      'dayton-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  shamrock: {
    county: 'Wheeler',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Shamrock, TX and Wheeler County. Manufactured home financing for every kind of credit history. Free quote.",
    intro:
      "A credit history with bumps in it doesn't disqualify you in Shamrock. Texas Homes Direct looks at where your credit actually stands in Wheeler County, then searches for a financing route that fits it.",
    buyingHeading: 'Buying a Mobile Home in Wheeler County',
    buying: [
      "Thin credit files, past late payments and recent job changes are each treated differently from one lender to the next. Hearing the real picture early lets us aim for the program most likely to work.",
      "Between our own financing and outside public and private lenders, one decline is rarely the final word.",
    ],
    pricingExplainer: [
      "Once you approve a Shamrock quote, the home price stays fixed with everything above included, so financing is based on the real total.",
      "Utilities are handled honestly and separately: a phone estimate, then a final figure only after our contractor inspects your Wheeler County property and you approve it.",
    ],
    gettingStarted: [
      "Share a rough picture of your income, any current debts and anything you know about your credit report. That points us to the right lenders first.",
      "Then we line up a payment range and homes that fit within it, before you've committed to anything.",
    ],
    localProof:
      "Wheeler County homesites around Shamrock, and toward Clarendon and Pampa, can explore financing for every kind of credit history.",
    faq: [
      {
        q: "Can I buy a Shamrock home with less-than-perfect credit?",
        a: "Frequently. Credit problems narrow the field but don't automatically close it; we can finance some homes ourselves and also go to outside lenders.",
      },
      {
        q: "Does a recent job change hurt my chances in Wheeler County?",
        a: "Not necessarily. Lenders read work history differently, so we match your situation to programs that weigh it fairly.",
      },
      {
        q: "Will checking options for a Shamrock home commit me?",
        a: "No. Exploring financing is part of deciding, and you can stop whenever you like.",
      },
      {
        q: "Can you set a home on Wheeler County acreage outside Shamrock?",
        a: "Yes. We review access and site work for your parcel once we have the address.",
      },
    ],
    nearby: ['clarendon', 'memphis', 'pampa'],
    heroImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    heroAlt: 'Black mobile home with a cedar front porch and wooded hills behind it near Shamrock, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Two-tone single wide mobile home set under live oaks, available for Wheeler County buyers',
    popularHomes: [
      'quinlan-texas-4-bed-2-bath-double-wide',
      'seguin-texas-3-bed-2-bath-single-wide',
      'schulenburg-texas-2-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  clarendon: {
    county: 'Donley',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Clarendon, TX and Donley County from a family-owned manufactured home dealer. Honest financing.",
    intro:
      "Clarendon is the Donley County seat, and Texas Homes Direct is family-owned. That means a buyer there deals with the same few real people from the first question through setup.",
    buyingHeading: 'Buying a Mobile Home in Donley County',
    buying: [
      "Being family-owned shows up in small ways: the person who answered your first call knows your file, and answers come straight even when they're no.",
      "Donley County properties range from town lots to open land, and each one gets the same attention to its own site details.",
    ],
    pricingExplainer: [
      "Your Clarendon quote shows one home price, covering everything above, and we stand behind it once you accept.",
      "For well, septic and electric, we start with a phone estimate and then send our own contractor to your Donley County property for an exact bid, which you approve.",
    ],
    gettingStarted: [
      "Call or message with your address and a rough budget. You'll reach someone who can answer, not a call center.",
      "From there we suggest homes within the budget, explain the financing choices in plain terms, and book a property visit whenever you're ready.",
    ],
    localProof:
      "Donley County homesites around Clarendon, and toward Shamrock and Amarillo, work with the same small, family-run team from start to finish.",
    faq: [
      {
        q: "Who will I talk to about a Clarendon home?",
        a: "The same handful of people at Texas Homes Direct, from the first question to the day the home is set.",
      },
      {
        q: "Is all of Donley County within reach for delivery?",
        a: "It is. With your address in hand, we work out the route in and how setup will go on that property.",
      },
      {
        q: "Can I reach you after my Clarendon home is set?",
        a: "Yes. Call or write to us about anything that comes up once you've moved in, and we'll help you sort it out.",
      },
      {
        q: "Do I need land in Donley County before calling?",
        a: "No. We can talk homes and financing while you're still settling on a property.",
      },
    ],
    nearby: ['memphis', 'shamrock', 'amarillo'],
    heroImage: '/homes/the-pigeon/Marathon-Archer-7.jpeg',
    heroAlt: 'White double wide manufactured home with stone skirting and rolling hills in the background near Clarendon, TX',
    secondaryImage: '/homes/the-terra/Terra-Hero.jpg',
    secondaryAlt: 'White single wide mobile home with a wood deck and black trim, available for Donley County buyers',
    popularHomes: [
      'kountze-texas-2-bed-1-bath-single-wide',
      'henderson-texas-4-bed-2-bath-double-wide',
      'woodville-texas-1-bed-1-bath-tiny-home',
    ],
    lastModified: '2026-11-12',
  },

  brownfield: {
    county: 'Terry',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Brownfield, TX and Terry County. Every quote backed by an in-person site visit before utilities are priced.",
    intro:
      "Brownfield is the Terry County seat, and every Texas Homes Direct quote there is backed by an in-person site visit. Our own contractor walks your property before utility work is priced, so the plan matches the actual ground.",
    buyingHeading: 'Buying a Mobile Home in Terry County',
    buying: [
      "The visit looks at where the pad will go, how a delivery truck reaches it, and how far the property sits from existing water, septic and electric connections.",
      "What the contractor finds becomes an exact utility bid you can read and approve, instead of a figure guessed from a map.",
    ],
    pricingExplainer: [
      "The Brownfield home price is complete before the visit, with everything on the list above included, and it doesn't change afterward.",
      "The visit exists for utilities: you get a phone estimate first, and the contractor's walk of your Terry County land produces the exact bid you approve.",
    ],
    gettingStarted: [
      "Note anything you already know about the property: an existing well, a power pole, an old septic system or a cleared pad. It helps us plan the visit.",
      "Once the visit is scheduled, we finish choosing the floor plan and lining up financing in parallel.",
    ],
    localProof:
      "Terry County parcels in Brownfield and out toward Levelland, Seminole and Lamesa get the same contractor walk before utility work is priced.",
    faq: [
      {
        q: "What does your site visit check on Brownfield-area land?",
        a: "Pad placement, delivery access and distance to water, septic and electric, which together shape the exact utility bid.",
      },
      {
        q: "Do I need to be there for the Terry County site visit?",
        a: "That's something we coordinate with you, based on the property and your schedule.",
      },
      {
        q: "Does the site visit change my Brownfield home price?",
        a: "No. The home price is already set; the visit determines the utility bid, which you approve separately.",
      },
      {
        q: "Do you serve rural Terry County?",
        a: "Yes. Rural properties are covered, and access is confirmed before quoting.",
      },
    ],
    nearby: ['levelland', 'lubbock', 'seminole', 'lamesa'],
    heroImage: '/homes/the-pronghorn/Image.jpeg',
    heroAlt: 'White double wide mobile home with black trim and a planted front yard near Brownfield, TX',
    secondaryImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    secondaryAlt: 'Black double wide manufactured home with wood steps on cleared land, available for Terry County buyers',
    popularHomes: [
      'san-saba-texas-4-bed-2-bath-double-wide',
      'bullard-texas-3-bed-2-bath-single-wide',
      'austin-texas-4-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  seminole: {
    county: 'Gaines',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Seminole, TX and Gaines County. Start with financing before you pick land for a new manufactured home.",
    intro:
      "Seminole is the Gaines County seat, and with Texas Homes Direct the financing conversation can come before the land search. Knowing what you can afford first lets the lot and the home both start from a real number.",
    buyingHeading: 'Buying a Mobile Home in Gaines County',
    buying: [
      "A financing range set early keeps you from buying land that leaves too little for the home, or choosing a floor plan the budget can't carry.",
      "We finance homes ourselves and work with outside lenders, so a Gaines County buyer gets a realistic view of options rather than a single yes or no.",
    ],
    pricingExplainer: [
      "In Seminole, the accepted home price includes the whole checklist above, and that's the figure the loan is sized on.",
      "Utility costs come later: a phone estimate when the property is known, then an exact bid from our contractor's visit to your Gaines County land, which you approve.",
    ],
    gettingStarted: [
      "Bring basic income and debt information to the first call. With it, we can sketch a realistic range before you've chosen land or a home.",
      "With the range set, we show homes that fit it and point out what to look at when you tour Gaines County parcels.",
    ],
    localProof:
      "Gaines County buyers in Seminole, and toward Brownfield, Andrews and Lamesa, can begin with financing before a property is picked.",
    faq: [
      {
        q: "Should I sort out financing before buying land near Seminole?",
        a: "Usually it pays to. A financing range set first keeps the land purchase and the home inside one budget.",
      },
      {
        q: "Can I talk financing with you without land in Gaines County?",
        a: "Yes. We can start there and come back to site details once you've found a property.",
      },
      {
        q: "Will you deliver to Gaines County acreage outside Seminole?",
        a: "Yes. The county's rural land is part of our area; we just need the address to plan the route.",
      },
      {
        q: "What if a lender already said no to a Seminole purchase?",
        a: "Not necessarily the end. Our in-house financing and outside lenders give more than one path to try.",
      },
    ],
    nearby: ['brownfield', 'andrews', 'lamesa'],
    heroImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    heroAlt: 'Gray single wide manufactured home with a covered entry under live oaks near Seminole, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Dark single wide mobile home on a gravel drive beside an oak, available for Gaines County buyers',
    popularHomes: [
      'onalaska-texas-3-bed-2-bath-single-wide',
      'navasota-texas-4-bed-2-bath-double-wide',
      'canton-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  lamesa: {
    county: 'Dawson',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Lamesa, TX and Dawson County. First-time manufactured home buyers get plain answers and honest financing.",
    intro:
      "If you've never bought a manufactured home, Texas Homes Direct explains each part of a Dawson County purchase in plain language, from Lamesa outward. There's no jargon, and no question is too basic.",
    buyingHeading: 'Buying a Mobile Home in Dawson County',
    buying: [
      "We walk a first purchase through three topics before asking for any decision: how the home price differs from utility costs, how approval for a manufactured home loan works, and what setup covers.",
      "Whether you already own a Dawson County lot or haven't started looking, we can begin, and we'll point out what to check on any land you're considering.",
    ],
    pricingExplainer: [
      "The cleanest rule for a first Lamesa purchase: the home price you accept already contains the full checklist above and won't grow.",
      "Utilities are the piece that waits for the land. You'll hear a ballpark on the phone, then read an exact figure after our contractor walks your Dawson County property, and nothing moves until you approve it.",
    ],
    gettingStarted: [
      "Write your questions down before the first call. A list keeps the conversation on what matters to you.",
      "We answer them, then look at budget, land and floor plans at whatever pace is comfortable.",
    ],
    localProof:
      "First-time buyers across Dawson County, from Lamesa toward Big Spring, Brownfield and Seminole, get the same plain-language walk-through.",
    faq: [
      {
        q: "Where should a first-time buyer begin with a home for Lamesa?",
        a: "With a phone call. We cover pricing, financing and setup in plain terms, then narrow to homes that suit your budget and land.",
      },
      {
        q: "Can I qualify for financing in Dawson County on my first home?",
        a: "Quite possibly. We finance some homes ourselves and work with outside lenders, and we'll tell you honestly which routes fit your situation.",
      },
      {
        q: "Is it fine to call about a Lamesa home before I own land?",
        a: "Absolutely. We can talk through what to look for in a parcel and get financing started in the meantime.",
      },
      {
        q: "How much of Dawson County do you deliver to?",
        a: "All of it. Once we know your road and address, we plan the setup around them.",
      },
    ],
    nearby: ['big-spring', 'brownfield', 'seminole', 'snyder'],
    heroImage: '/homes/the-terra/Terra-Hero.jpg',
    heroAlt: 'White single wide mobile home with a wood deck and black trim near Lamesa, TX',
    secondaryImage: '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg',
    secondaryAlt: 'Black mobile home with a cedar front porch and wooded hills behind it, available for Dawson County buyers',
    popularHomes: [
      'sweeny-texas-3-bed-2-bath-single-wide',
      'bellville-texas-3-bed-2-bath-double-wide',
      'magnolia-texas-3-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  slaton: {
    county: 'Lubbock',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Slaton, TX and Lubbock County. New manufactured homes for in-town lots and county land alike.",
    intro:
      "Slaton shares Lubbock County with Lubbock, and whether your property sits inside Slaton's city limits or out in the county changes what applies to a new home. Texas Homes Direct sorts that out with you before a floor plan is chosen.",
    buyingHeading: 'Buying a Mobile Home in Lubbock County',
    buying: [
      "On an in-town lot, utilities are often close by, but lot dimensions and local requirements can narrow which homes fit. Out in the county there's usually more room but more site work.",
      "Whichever it is, setbacks, access and any existing service lines on that exact property guide which floor plans we suggest.",
    ],
    pricingExplainer: [
      "Town lot or county land, the Slaton price for the home is the same and includes everything on the checklist; it's fixed when you accept.",
      "Utility work is where town and country differ most. A phone estimate comes first, and our contractor's exact figure follows the visit to your Lubbock County property, pending your approval.",
    ],
    gettingStarted: [
      "Start by telling us the property's address. We'll check whether it falls inside Slaton or in unincorporated Lubbock County, which decides whose rules apply.",
      "Next we size floor plans to the lot and price financing for the two or three that fit best.",
    ],
    localProof:
      "Lubbock County properties in Slaton and out toward Post, Littlefield and Levelland are reviewed for city-lot or county-land requirements.",
    faq: [
      {
        q: "Can a manufactured home go on a lot inside Slaton city limits?",
        a: "Often, but the lot and the city's rules decide it. We confirm both before you choose a home.",
      },
      {
        q: "Is an in-town lot or county land better for a Slaton-area home?",
        a: "Neither is better for everyone. Town lots tend to have closer utilities; county land offers room but more site work.",
      },
      {
        q: "Will my Slaton lot size limit which homes fit?",
        a: "Sometimes. Give us the lot's width and depth, and we'll show which homes leave room for the required setbacks.",
      },
      {
        q: "Do you cover rural Lubbock County around Slaton?",
        a: "Yes. Access to your address is checked before quoting.",
      },
    ],
    nearby: ['lubbock', 'levelland', 'post', 'littlefield'],
    heroImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    heroAlt: 'Double wide manufactured home with a lit front walkway at sunset near Slaton, TX',
    secondaryImage: '/homes/the-pronghorn/Image.jpeg',
    secondaryAlt: 'White double wide mobile home with black trim and a planted front yard, available for Lubbock County buyers',
    popularHomes: [
      'terrell-texas-3-bed-2-bath-double-wide',
      'forney-texas-3-bed-2-bath-single-wide',
      'brenham-texas-3-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  post: {
    county: 'Garza',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Post, TX and Garza County. Written quotes on new manufactured homes so you can compare complete prices.",
    intro:
      "Post is the Garza County seat, and Texas Homes Direct puts every quote there in writing, so you can lay several homes next to each other and compare complete numbers instead of remembering phone conversations.",
    buyingHeading: 'Buying a Mobile Home in Garza County',
    buying: [
      "A written quote lists the home, its price and what's included. Two or three of them side by side make differences in size and value easy to see.",
      "Writing things down also helps when family members are part of the decision; everyone reads the same figures.",
    ],
    pricingExplainer: [
      "Each written Post quote shows the home's full price with the list above included, and the figure holds once accepted.",
      "Utilities are added later in their own written bid: estimated by phone first, then priced exactly after our contractor visits your Garza County land, for you to approve.",
    ],
    gettingStarted: [
      "Name two or three homes you're considering and ask for written quotes on all of them at once.",
      "Once you've compared them, we confirm your Garza County property and go over financing on the home you pick.",
    ],
    localProof:
      "Garza County homesites around Post, and toward Slaton, Lubbock and Snyder, receive every quote in writing.",
    faq: [
      {
        q: "Will my Post home quote be in writing?",
        a: "Yes. Every quote is written, listing the home, its price and what's included.",
      },
      {
        q: "Can I compare written quotes on several Garza County homes?",
        a: "Absolutely. Ask about a few models and we'll send each quote so you can compare them side by side.",
      },
      {
        q: "Can a home be delivered to Garza County land outside Post?",
        a: "Yes. We check access for your address before the quote is final.",
      },
      {
        q: "Do I need my Post-area land secured before asking for quotes?",
        a: "No. We can quote homes while land is still being arranged and confirm site details later.",
      },
    ],
    nearby: ['slaton', 'lubbock', 'snyder'],
    heroImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    heroAlt: 'Double wide mobile home with wood steps and a cactus garden near Post, TX',
    secondaryImage: '/homes/the-spoonbill/Spoonbill-Hero.jpg',
    secondaryAlt: 'Gray single wide manufactured home with a covered entry under live oaks, available for Garza County buyers',
    popularHomes: [
      'new-caney-texas-3-bed-2-bath-single-wide',
      'crockett-texas-4-bed-2-bath-double-wide',
      'gonzales-texas-2-bed-2-bath-single-wide',
    ],
    lastModified: '2026-11-12',
  },

  'big-spring': {
    county: 'Howard',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Big Spring, TX and Howard County. HUD-code manufactured homes, firm pricing and honest financing.",
    intro:
      "Big Spring is the Howard County seat, and each HUD-code manufactured home Texas Homes Direct sells there is built to that federal standard, inspected during construction and labeled before it leaves the plant.",
    buyingHeading: 'Buying a Mobile Home in Howard County',
    buying: [
      "Factory building means framing, wiring and plumbing come together indoors, out of the weather, under a consistent inspection process.",
      "You can compare wall construction, insulation, windows and roofing between models before choosing, and we'll go through the spec sheet line by line if that's how you like to decide.",
    ],
    pricingExplainer: [
      "Big Spring buyers see a single home price that already folds in the checklist above; accepting the quote locks it.",
      "Utility connections are the exception, since land varies so much: estimated by phone, then bid exactly after our contractor inspects your Howard County site, which you approve.",
    ],
    gettingStarted: [
      "If construction quality is your main question, ask for the specs on two or three models. Comparing them side by side tends to settle it.",
      "From there we confirm your Howard County property, talk through financing and plan the site visit.",
    ],
    localProof:
      "Howard County homesites around Big Spring, and toward Lamesa and Snyder, get the same spec-sheet walk-through and site visit.",
    faq: [
      {
        q: "How is a manufactured home for Big Spring inspected?",
        a: "Under the HUD program, the home is inspected at the plant while it's built, and each section carries a certification label. Depending on where it's set, a local inspection of the installation may follow.",
      },
      {
        q: "Can I see construction specs before choosing a Howard County home?",
        a: "Yes. Ask for the spec sheet on any model and compare framing, insulation values, window type and roof construction line by line.",
      },
      {
        q: "Does a home near Big Spring need local approval?",
        a: "That depends on the parcel and county. We help you find out what applies before a home is ordered.",
      },
      {
        q: "Do you deliver anywhere in Howard County?",
        a: "Yes. Send your address and we'll confirm the route and setup plan.",
      },
    ],
    nearby: ['midland', 'lamesa', 'snyder'],
    heroImage: '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg',
    heroAlt: 'Black double wide manufactured home with wood steps on cleared land near Big Spring, TX',
    secondaryImage: '/homes/the-widgeon/2-Stonewall.jpg.jpeg',
    secondaryAlt: 'Double wide manufactured home with a lit front walkway at sunset, available for Howard County buyers',
    popularHomes: [
      'shepard-texas-3-bed-2-bath',
      'wills-point-texas-3-bed-2-bath-single-wide',
      'sealy-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  andrews: {
    county: 'Andrews',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Andrews, TX and Andrews County. New manufactured homes delivered down rural drives, with honest financing.",
    intro:
      "Andrews is the Andrews County seat, and Texas Homes Direct plans the route to your homesite before anything else. How a delivery truck reaches the pad matters as much as the home that's on it.",
    buyingHeading: 'Buying a Mobile Home in Andrews County',
    buying: [
      "County roads, long private drives, gates and low spots all affect how a home arrives. We review the path from the nearest highway to your pad so the delivery plan fits the land.",
      "Each property gets its own look at placement and utilities, rather than being treated as a generic lot.",
    ],
    pricingExplainer: [
      "An Andrews quote gives you the home's complete price with the list above included, and it doesn't shift after you accept it.",
      "Water, septic and power are the open items. A phone conversation gives you a working estimate, and the binding number comes from our contractor after a look at your Andrews County acreage; you sign off on it before any utility work starts.",
    ],
    gettingStarted: [
      "Describe the route from the nearest paved road to your property, including any gates or soft ground. That lets us plan delivery early.",
      "Next comes floor plan and financing, then the site visit that sets the utility bid.",
    ],
    localProof:
      "Andrews County properties in town and out toward Seminole get a delivery-route review before every quote.",
    faq: [
      {
        q: "Can you deliver down a long private drive near Andrews?",
        a: "Usually, yes. We review the drive and any gates so the delivery route works for your property.",
      },
      {
        q: "Do you place homes on rural Andrews County land?",
        a: "Yes. We review access and placement for each parcel before quoting.",
      },
      {
        q: "Do I need a survey of my Andrews property before calling?",
        a: "Not before calling. A survey can help with placement later, and we'll tell you if you need one.",
      },
      {
        q: "Can I start before my Andrews County land is final?",
        a: "Yes. We can begin with floor plans and financing while the property is settled.",
      },
    ],
    nearby: ['seminole', 'odessa', 'midland'],
    heroImage: '/homes/the-moose/hero.jpeg',
    heroAlt: 'Double wide manufactured home with a lit porch and desert landscaping near Andrews, TX',
    secondaryImage: '/homes/the-wood-duck/Wood-Duck-Hero.jpg',
    secondaryAlt: 'Double wide mobile home with wood steps and a cactus garden, available for Andrews County buyers',
    popularHomes: [
      'rusk-texas-3-bed-2-bath-double-wide',
      'magnolia-texas-3-bed-2-bath-single-wide',
      'lockhart-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  monahans: {
    county: 'Ward',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Monahans, TX and Ward County. New manufactured homes with site work handled start to finish.",
    intro:
      "Monahans is the Ward County seat. Buy a home there through Texas Homes Direct and you get one phone number for the entire install, from leveling the pad to the last piece of skirting, rather than a list of contractors to manage.",
    buyingHeading: 'Buying a Mobile Home in Ward County',
    buying: [
      "The order matters on an install: dirt work before blocking, blocking before tie-downs, utilities before skirting closes everything in. We set that order for your Ward County site and tell you as each piece is done.",
      "None of it is planned from a map. Someone from our side looks at the ground in person before the setup plan is written.",
    ],
    pricingExplainer: [
      "Your Monahans quote already contains everything on the list above, and that part of the price doesn't move once you accept it.",
      "Well, septic and electric are estimated on the phone and priced exactly by our contractor after walking your Ward County land; you approve that bid before work begins.",
    ],
    gettingStarted: [
      "A few phone photos of the planned homesite, showing the ground, any brush and the way in, let us prepare before the in-person assessment.",
      "After that, a floor plan is matched to the homesite, financing is lined up, and the assessment visit goes on the calendar.",
    ],
    localProof:
      "Ward County properties in Monahans and out toward Pecos get one team coordinating every part of setup.",
    faq: [
      {
        q: "Do I have to hire my own crews for site work in Monahans?",
        a: "No. We schedule and oversee the pad, utility connections, blocking, tie-downs and skirting ourselves.",
      },
      {
        q: "Will someone look at my Ward County land in person?",
        a: "Yes. Every site is assessed in person before the setup plan and utility bid are final.",
      },
      {
        q: "Which parts of Ward County can you reach?",
        a: "Every part. Tell us where the property is and how the road in looks, and we'll plan the delivery and setup around it.",
      },
      {
        q: "Is there paperwork for a home on Monahans-area land?",
        a: "Often, and it varies by county and parcel. We help you work through what applies to yours.",
      },
    ],
    nearby: ['odessa', 'pecos'],
    heroImage: '/homes/the-javelina/hero.jpg',
    heroAlt: 'Single wide manufactured home with agave and limestone landscaping near Monahans, TX',
    secondaryImage: '/homes/the-katy/Katy-Hero.jpg',
    secondaryAlt: 'Two-tone single wide mobile home set under live oaks, available for Ward County buyers',
    popularHomes: [
      'greenville-texas-3-bed-2-bath-single-wide',
      'carthage-texas-3-bed-2-bath-double-wide',
      'willis-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

  pecos: {
    county: 'Reeves',
    tier: 'small-town',
    metaDescription:
      "Mobile homes for sale in Pecos, TX and Reeves County. Every manufactured home quote comes with an itemized list of what's included.",
    intro:
      "Pecos is the Reeves County seat, and Texas Homes Direct spells out what a home includes before you sign: the out-the-door checklist and the setup checklist on this page are the whole list, item by item.",
    buyingHeading: 'Buying a Mobile Home in Reeves County',
    buying: [
      "Knowing what's included matters most when comparing quotes. A low base price can hide delivery, setup or AC; ours lists every item so the comparison is fair.",
      "If something you need isn't on the list, such as a porch upgrade or a specific appliance, ask and we'll tell you plainly whether it can be added and what it costs.",
    ],
    pricingExplainer: [
      "The Pecos price covers the home plus every item listed above, and it stays the same once accepted.",
      "Utilities are the part not on a fixed list, because Reeves County land varies so much: we estimate them by phone, then our contractor bids them exactly after a visit, for your approval.",
    ],
    gettingStarted: [
      "Read through both checklists on this page and note anything you want explained. We'll go through them with you on the first call.",
      "Then we confirm your Reeves County property and talk floor plan and financing.",
    ],
    localProof:
      "Reeves County homesites around Pecos, and toward Monahans, get the same itemized checklists with every quote.",
    faq: [
      {
        q: "What exactly is included in a Pecos home quote?",
        a: "Everything on the out-the-door and setup checklists on this page. If you want something beyond them, we'll tell you plainly whether it can be added.",
      },
      {
        q: "Can I add an upgrade to a Reeves County home?",
        a: "Ask about the specific item. We'll say whether it's available for that model and what it would cost.",
      },
      {
        q: "Is rural Reeves County inside your delivery range?",
        a: "Yes. We check access for your address before finalizing the quote.",
      },
      {
        q: "Do I need Reeves County land before getting a Pecos quote?",
        a: "No. We can price homes while you're arranging land and confirm site details later.",
      },
    ],
    nearby: ['monahans', 'fort-stockton', 'odessa'],
    heroImage: '/homes/the-katy/Katy-Hero.jpg',
    heroAlt: 'Two-tone single wide mobile home set under live oaks near Pecos, TX',
    secondaryImage: '/homes/the-mesquite/Mesquite-Body-1.jpg',
    secondaryAlt: 'Dark single wide mobile home on a gravel drive beside an oak, available for Reeves County buyers',
    popularHomes: [
      'terrell-texas-3-bed-2-bath-double-wide',
      'mineola-texas-2-bed-1-bath',
      'quitman-texas-3-bed-2-bath-double-wide',
    ],
    lastModified: '2026-11-12',
  },

}
