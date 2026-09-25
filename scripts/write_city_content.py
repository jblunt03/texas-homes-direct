#!/usr/bin/env python3
"""
Authoring source for lib/cityContent.ts.

Every city's intro, buying paragraphs, local-proof line, and FAQ answers are
hand-written below — NOT generated from a fixed pool of template variants.
Fixed pools don't scale (see the Waco/Dallas duplicate-intro incident this
content replaced): with a handful of variants shared across hundreds of
cities, pages eventually share identical sentences word-for-word except for
the place name, which is exactly the duplicate-content pattern search
engines penalize.

Workflow for adding a new batch of cities:
  1. Add entries to CITIES below (unchanged structural fields).
  2. Write fresh copy for each new city in CITY_COPY. Do not copy/paste and
     reword an existing city's paragraph — start from the specific facts
     (county name, region character, floor plan mix) and write new sentences.
  3. Run this script to (re)generate lib/cityContent.ts.
  4. Run scripts/check_duplication.py. It compares every published city's
     intro/buying/localProof/FAQ text against every other city's (not just
     neighbors) using word-shingle similarity, with city/county names
     masked out first. Fix anything it flags before publishing.

Hard rules — every city's copy must follow these:
  - No delivery times, timelines, or turnaround windows anywhere.
  - No invented customers, testimonials, or specific transactions.
  - No county-specific regulations, statistics, market claims, or soil
    conditions that weren't explicitly provided.
  - No competitor names or competitor pricing.
  - Never state or imply whether Texas Homes Direct has a physical location.
  - Always "Texas Homes Direct" — never the abbreviation "THD".
  - No land sales or land-home packages — homes only. ("Family land, your
    own land, or a lot you're purchasing separately" describes the buyer's
    own land, not something Texas Homes Direct sells.)
  - No Spanish-language content.

See CLAUDE.md at the repo root for the full content and SEO ruleset this
generator (and the duplication checker) must satisfy.
"""
import json

# ─── Unchanged per-city fields (metadata, images, nearby, popular homes) ──
CITIES = [
    # slug, name, county, tier, meta, hero, heroAlt, sec, secAlt, nearby, popular
    ("austin", "Austin", "Travis", "metro",
     "Looking for mobile homes for sale in Austin, TX? Texas Homes Direct offers new manufactured homes and honest, no-pressure financing. Get your free quote today.",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home exterior near Austin, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior available near Austin, TX",
     ["round-rock", "georgetown", "san-marcos"],
     ["marathon-loving-3bed-2bath-double-wide", "fleetwood-rattlesnake-3bed-2bath-single-wide", "fleetwood-moose-4bed-2bath-double-wide"]),
    ("seguin", "Seguin", "Guadalupe", "small-town",
     "Mobile homes for sale in Seguin, TX and Guadalupe County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-terra/Terra-Hero.jpg", "Compact single wide mobile home exterior near Seguin, TX",
     "/homes/the-dove/IMG_0895.jpg.jpeg", "Mobile home exterior available for delivery near Seguin, TX",
     ["new-braunfels", "luling", "gonzales", "san-marcos"],
     ["fleetwood-axis-3bed-2bath-double-wide", "marathon-ranger-2bed-1bath-single-wide", "marathon-daniel-1bed-1bath-park-model"]),
    ("waco", "Waco", "McLennan", "metro",
     "Mobile homes for sale in Waco, TX and McLennan County. New manufactured homes, honest financing, and no dealership pressure. Get your free quote today.",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home exterior near Waco, TX",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Single wide mobile home exterior available near Waco, TX",
     ["hewitt", "woodway", "bellmead", "robinson"],
     ["marathon-amarillo-2bed-2bath-single-wide", "marathon-grayson-4bed-2bath-double-wide", "marathon-temple-3bed-2bath-single-wide"]),
    ("tyler", "Tyler", "Smith", "metro",
     "Mobile homes for sale in Tyler, TX and Smith County. HUD-certified manufactured homes with turnkey setup and honest, no-pressure financing. Free quote.",
     "/homes/the-chapman/Chapman-Hero.png", "Manufactured home exterior on wooded land near Tyler, TX",
     "/homes/the-javelina/hero.jpg", "Compact single wide mobile home available near Tyler, TX",
     ["whitehouse", "lindale", "bullard"],
     ["marathon-redhead-3bed-2bath-double-wide", "marathon-longview-3bed-2bath-single-wide", "marathon-widgeon-4bed-2bath-double-wide"]),
    ("el-paso", "El Paso", "El Paso", "metro",
     "Mobile homes for sale in El Paso, TX and El Paso County. New manufactured homes with in-house financing and turnkey setup — get your free quote from us today.",
     "/homes/the-pronghorn/Image.jpeg", "Manufactured home exterior available near El Paso, TX",
     "/homes/the-moose/hero.jpeg", "Double wide manufactured home available for delivery near El Paso, TX",
     ["socorro", "horizon-city", "canutillo", "anthony"],
     ["marathon-grapevine-2bed-2bath-single-wide", "marathon-bailey-3bed-2bath-double-wide", "marathon-darrell-1bed-1bath-park-model"]),
    ("san-antonio", "San Antonio", "Bexar", "metro",
     "Mobile homes for sale in San Antonio, TX and Bexar County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home exterior near San Antonio, TX",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home available for delivery near San Antonio, TX",
     ["new-braunfels", "boerne", "floresville", "castroville"],
     ["marathon-hays-4bed-2bath-double-wide", "marathon-pearland-3bed-2bath-single-wide", "marathon-pintail-4bed-2bath-double-wide"]),
    ("laredo", "Laredo", "Webb", "metro",
     "Mobile homes for sale in Laredo, TX and Webb County. Family-owned manufactured home dealer with honest, no-pressure financing. Free delivery quote today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Manufactured home exterior near Laredo, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near Laredo, TX",
     ["rio-bravo"],
     ["fleetwood-jackrabbit-3bed-2bath-double-wide", "fleetwood-bobcat-3bed-2bath-single-wide", "fleetwood-coyote-2bed-2bath-single-wide"]),
    ("mcallen", "McAllen", "Hidalgo", "metro",
     "Mobile homes for sale in McAllen, TX and Hidalgo County. New manufactured homes for Rio Grande Valley families with honest financing. Free quote today.",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior near McAllen, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide mobile home available for delivery near McAllen, TX",
     ["edinburg", "mission", "pharr", "hidalgo"],
     ["marathon-coleman-3bed-2bath-double-wide", "fleetwood-armadillo-3bed-2bath", "marathon-bell-3bed-2bath-double-wide"]),
    ("victoria", "Victoria", "Victoria", "small-town",
     "Mobile homes for sale in Victoria, TX and Victoria County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-moose/hero.jpeg", "Manufactured home exterior near Victoria, TX",
     "/homes/the-javelina/hero.jpg", "Single wide mobile home available for delivery near Victoria, TX",
     ["cuero", "goliad", "port-lavaca", "edna"],
     ["marathon-cisco-2bed-2bath-single-wide", "fleetwood-roadrunner-3bed-2bath", "marathon-spoonbill-3bed-2bath-single-wide"]),
    ("alice", "Alice", "Jim Wells", "small-town",
     "Mobile homes for sale in Alice, TX and Jim Wells County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home exterior near Alice, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Manufactured home available for delivery near Alice, TX",
     ["orange-grove", "premont"],
     ["fleetwood-badger-3bed-2bath-double-wide", "marathon-beaumont-3bed-2bath-single-wide", "fleetwood-peredavid-3bed-2bath-double-wide"]),
    ("pleasanton", "Pleasanton", "Atascosa", "small-town",
     "Mobile homes for sale in Pleasanton, TX and Atascosa County. Family-owned manufactured home dealer with honest financing. Get a free quote, no pressure.",
     "/homes/the-javelina/hero.jpg", "Single wide mobile home exterior near Pleasanton, TX",
     "/homes/the-katy/Katy-Hero.png", "Manufactured home available for delivery near Pleasanton, TX",
     ["floresville", "devine", "pearsall", "jourdanton"],
     ["marathon-conroe-2bed-2bath-single-wide", "marathon-gadwall-3bed-2bath-double-wide", "marathon-mesquite-3bed-2bath-single-wide"]),
    ("amarillo", "Amarillo", "Potter", "metro",
     "Mobile homes for sale in Amarillo, TX and Potter County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Manufactured home exterior near Amarillo, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Single wide manufactured home available for delivery near Amarillo, TX",
     ["canyon"],
     ["marathon-caldwell-4bed-2bath-double-wide", "marathon-jackson-1bed-1bath-park-model", "marathon-chapman-1bed-1bath-park-model"]),
    ("lubbock", "Lubbock", "Lubbock", "metro",
     "Mobile homes for sale in Lubbock, TX and Lubbock County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Double wide manufactured home exterior near Lubbock, TX",
     "/homes/the-katy/Katy-Hero.png", "Manufactured home available for delivery near Lubbock, TX",
     ["wolfforth", "shallowater", "idalou"],
     ["marathon-breckenridge-3bed-2bath-single-wide", "fleetwood-pronghorn-4bed-2bath-double-wide", "marathon-abilene-2bed-1bath-single-wide"]),
    ("corpus-christi", "Corpus Christi", "Nueces", "metro",
     "Mobile homes for sale in Corpus Christi, TX and Nueces County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-moose/hero.jpeg", "Manufactured home exterior near Corpus Christi, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home available for delivery near Corpus Christi, TX",
     ["portland", "ingleside", "robstown", "aransas-pass"],
     ["marathon-dawson-4bed-2bath-double-wide", "marathon-lanny-1bed-1bath-park-model", "marathon-pigeon-3bed-2bath-double-wide"]),
    ("dallas", "Dallas", "Dallas", "metro",
     "Mobile homes for sale in Dallas, TX and the DFW metro. New manufactured homes with honest financing and zero dealership pressure. Get a free quote today.",
     "/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg", "Double wide manufactured home exterior near Dallas, TX",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Manufactured home available for delivery near the DFW metro",
     ["mesquite", "garland", "irving", "richardson"],
     ["fleetwood-javelina-1bed-1bath-single-wide", "marathon-jasper-3bed-2bath-double-wide", "marathon-dove-1bed-1bath-single-wide"]),
    ("houston", "Houston", "Harris", "metro",
     "Mobile homes for sale in Houston, TX and Harris County. New manufactured homes with honest financing and zero dealership pressure. Get a free quote today.",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Double wide manufactured home exterior near Houston, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Houston, TX",
     ["pasadena", "bellaire", "katy", "spring"],
     ["marathon-fisher-3bed-2bath-double-wide", "fleetwood-raven-3bed-2bath-single-wide", "marathon-katy-3bed-2bath-single-wide"]),

    # ─── Batch 1: Hill Country small towns ──────────────────────────
    ("san-saba", "San Saba", "San Saba", "small-town",
     "Mobile homes for sale in San Saba, TX and San Saba County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Double wide manufactured home exterior near San Saba, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near San Saba, TX",
     ["lampasas", "goldthwaite", "llano", "brady"],
     ["marathon-trinity-4bed-2bath-double-wide", "marathon-longview-3bed-2bath-single-wide", "marathon-woodduck-3bed-2bath-double-wide"]),
    ("lampasas", "Lampasas", "Lampasas", "small-town",
     "Mobile homes for sale in Lampasas, TX and Lampasas County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-coleman/Coleman-Gallery-1.jpg", "Double wide manufactured home exterior near Lampasas, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Lampasas, TX",
     ["copperas-cove", "burnet", "san-saba", "gatesville"],
     ["marathon-brewster-3bed-2bath-double-wide", "marathon-grapevine-2bed-2bath-single-wide", "marathon-grayson-4bed-2bath-double-wide"]),
    ("llano", "Llano", "Llano", "small-town",
     "Mobile homes for sale in Llano, TX and Llano County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home exterior near Llano, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home available for delivery near Llano, TX",
     ["burnet", "fredericksburg", "san-saba", "johnson-city"],
     ["marathon-breckenridge-3bed-2bath-single-wide", "fleetwood-moose-4bed-2bath-double-wide", "marathon-beaumont-3bed-2bath-single-wide"]),
    ("goldthwaite", "Goldthwaite", "Mills", "small-town",
     "Mobile homes for sale in Goldthwaite, TX and Mills County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg", "Single wide manufactured home exterior near Goldthwaite, TX",
     "/homes/the-javelina/hero.jpg", "Compact mobile home available for delivery near Goldthwaite, TX",
     ["san-saba", "brownwood", "hamilton", "comanche"],
     ["marathon-daniel-1bed-1bath-park-model", "marathon-mallard-4bed-2bath-double-wide", "marathon-chapman-1bed-1bath-park-model"]),
    ("brady", "Brady", "McCulloch", "small-town",
     "Mobile homes for sale in Brady, TX and McCulloch County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
     "/homes/the-grayson/IMG_0789.webp", "Double wide manufactured home exterior near Brady, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Manufactured home available for delivery near Brady, TX",
     ["san-saba", "mason", "coleman", "brownwood"],
     ["fleetwood-badger-3bed-2bath-double-wide", "fleetwood-rattlesnake-3bed-2bath-single-wide", "marathon-hays-4bed-2bath-double-wide"]),
    ("mason", "Mason", "Mason", "small-town",
     "Mobile homes for sale in Mason, TX and Mason County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Manufactured home exterior near Mason, TX",
     "/homes/the-dove/IMG_0895.jpg.jpeg", "Single wide mobile home available for delivery near Mason, TX",
     ["brady", "llano", "junction", "fredericksburg"],
     ["marathon-bell-3bed-2bath-double-wide", "marathon-amarillo-2bed-2bath-single-wide", "marathon-trinity-4bed-2bath-double-wide"]),
    ("junction", "Junction", "Kimble", "small-town",
     "Mobile homes for sale in Junction, TX and Kimble County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home exterior near Junction, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near Junction, TX",
     ["mason", "sonora", "kerrville", "rocksprings"],
     ["marathon-brewster-3bed-2bath-double-wide", "fleetwood-armadillo-3bed-2bath", "marathon-pigeon-3bed-2bath-double-wide"]),
    ("burnet", "Burnet", "Burnet", "small-town",
     "Mobile homes for sale in Burnet, TX and Burnet County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home exterior near Burnet, TX",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Double wide manufactured home available for delivery near Burnet, TX",
     ["lampasas", "llano", "georgetown", "johnson-city"],
     ["marathon-pearland-3bed-2bath-single-wide", "marathon-caldwell-4bed-2bath-double-wide", "fleetwood-coyote-2bed-2bath-single-wide"]),
    ("blanco", "Blanco", "Blanco", "small-town",
     "Mobile homes for sale in Blanco, TX and Blanco County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-moose/hero.jpeg", "Manufactured home exterior near Blanco, TX",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Double wide manufactured home available for delivery near Blanco, TX",
     ["johnson-city", "fredericksburg", "boerne", "dripping-springs"],
     ["marathon-katy-3bed-2bath-single-wide", "marathon-pintail-4bed-2bath-double-wide", "fleetwood-raven-3bed-2bath-single-wide"]),
    ("johnson-city", "Johnson City", "Blanco", "small-town",
     "Mobile homes for sale in Johnson City, TX and Blanco County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg", "Double wide manufactured home exterior near Johnson City, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Johnson City, TX",
     ["blanco", "fredericksburg", "dripping-springs", "burnet"],
     ["fleetwood-bobcat-3bed-2bath-single-wide", "fleetwood-jackrabbit-3bed-2bath-double-wide", "marathon-bailey-3bed-2bath-double-wide"]),
    ("comfort", "Comfort", "Kendall", "small-town",
     "Mobile homes for sale in Comfort, TX and Kendall County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior near Comfort, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Manufactured home available for delivery near Comfort, TX",
     ["boerne", "kerrville", "fredericksburg", "bandera"],
     ["marathon-jasper-3bed-2bath-double-wide", "fleetwood-javelina-1bed-1bath-single-wide", "marathon-loving-3bed-2bath-double-wide"]),
    ("bandera", "Bandera", "Bandera", "small-town",
     "Mobile homes for sale in Bandera, TX and Bandera County. Family-owned manufactured home dealer with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-coleman/Coleman-Gallery-1.jpg", "Double wide manufactured home exterior near Bandera, TX",
     "/homes/the-javelina/hero.jpg", "Compact mobile home available for delivery near Bandera, TX",
     ["boerne", "kerrville", "hondo", "castroville"],
     ["fleetwood-roadrunner-3bed-2bath", "marathon-cisco-2bed-2bath-single-wide", "fleetwood-peredavid-3bed-2bath-double-wide"]),
    ("hondo", "Hondo", "Medina", "small-town",
     "Mobile homes for sale in Hondo, TX and Medina County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-pronghorn/Image.jpeg", "Manufactured home exterior near Hondo, TX",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home available for delivery near Hondo, TX",
     ["castroville", "devine", "uvalde", "bandera"],
     ["marathon-terra-2bed-1bath-park-model", "marathon-woodduck-3bed-2bath-double-wide", "marathon-darrell-1bed-1bath-park-model"]),
    ("devine", "Devine", "Medina", "small-town",
     "Mobile homes for sale in Devine, TX and Medina County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg", "Manufactured home exterior near Devine, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near Devine, TX",
     ["hondo", "castroville", "pleasanton", "pearsall"],
     ["marathon-lanny-1bed-1bath-park-model", "marathon-widgeon-4bed-2bath-double-wide", "marathon-temple-3bed-2bath-single-wide"]),
    ("castroville", "Castroville", "Medina", "small-town",
     "Mobile homes for sale in Castroville, TX and Medina County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Manufactured home exterior near Castroville, TX",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home available for delivery near Castroville, TX",
     ["hondo", "devine", "boerne", "san-antonio"],
     ["marathon-dove-1bed-1bath-single-wide", "fleetwood-axis-3bed-2bath-double-wide", "marathon-jackson-1bed-1bath-park-model"]),

    # ─── Batch 2: Guadalupe / Colorado River corridor towns ─────────
    ("new-braunfels", "New Braunfels", "Comal", "small-town",
     "Mobile homes for sale in New Braunfels, TX and Comal County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Double wide manufactured home exterior near New Braunfels, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near New Braunfels, TX",
     ["seguin", "san-marcos", "boerne", "schertz"],
     ["marathon-terra-2bed-1bath-park-model", "marathon-kendall-3bed-2bath-double-wide", "marathon-mallard-4bed-2bath-double-wide"]),
    ("lockhart", "Lockhart", "Caldwell", "small-town",
     "Mobile homes for sale in Lockhart, TX and Caldwell County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Double wide manufactured home exterior near Lockhart, TX",
     "/homes/the-javelina/hero.jpg", "Compact mobile home available for delivery near Lockhart, TX",
     ["luling", "san-marcos", "bastrop", "seguin"],
     ["marathon-dawson-4bed-2bath-double-wide", "marathon-mesquite-3bed-2bath-single-wide", "marathon-fisher-3bed-2bath-double-wide"]),
    ("luling", "Luling", "Caldwell", "small-town",
     "Mobile homes for sale in Luling, TX and Caldwell County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg", "Double wide manufactured home exterior near Luling, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near Luling, TX",
     ["lockhart", "seguin", "gonzales", "san-marcos"],
     ["marathon-gadwall-3bed-2bath-double-wide", "marathon-abilene-2bed-1bath-single-wide", "marathon-redhead-3bed-2bath-double-wide"]),
    ("gonzales", "Gonzales", "Gonzales", "small-town",
     "Mobile homes for sale in Gonzales, TX and Gonzales County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
     "/homes/the-chapman/Chapman-Hero.png", "Manufactured home exterior near Gonzales, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home available for delivery near Gonzales, TX",
     ["luling", "seguin", "cuero", "yoakum"],
     ["marathon-coleman-3bed-2bath-double-wide", "marathon-conroe-2bed-2bath-single-wide", "marathon-kendall-3bed-2bath-double-wide"]),
    ("floresville", "Floresville", "Wilson", "small-town",
     "Mobile homes for sale in Floresville, TX and Wilson County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Manufactured home exterior near Floresville, TX",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home available for delivery near Floresville, TX",
     ["pleasanton", "seguin", "karnes-city", "san-antonio"],
     ["marathon-spoonbill-3bed-2bath-single-wide", "fleetwood-pronghorn-4bed-2bath-double-wide", "marathon-ranger-2bed-1bath-single-wide"]),
    ("smithville", "Smithville", "Bastrop", "small-town",
     "Mobile homes for sale in Smithville, TX and Bastrop County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-coleman/Coleman-Gallery-1.jpg", "Double wide manufactured home exterior near Smithville, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Manufactured home available for delivery near Smithville, TX",
     ["bastrop", "la-grange", "elgin", "giddings"],
     ["marathon-bell-3bed-2bath-double-wide", "fleetwood-javelina-1bed-1bath-single-wide", "marathon-fisher-3bed-2bath-double-wide"]),
    ("elgin", "Elgin", "Bastrop", "small-town",
     "Mobile homes for sale in Elgin, TX and Bastrop County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home exterior near Elgin, TX",
     "/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg", "Manufactured home available for delivery near Elgin, TX",
     ["bastrop", "taylor", "giddings", "smithville"],
     ["fleetwood-raven-3bed-2bath-single-wide", "marathon-caldwell-4bed-2bath-double-wide", "marathon-mesquite-3bed-2bath-single-wide"]),
    ("bastrop", "Bastrop", "Bastrop", "small-town",
     "Mobile homes for sale in Bastrop, TX and Bastrop County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home exterior near Bastrop, TX",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Double wide manufactured home available for delivery near Bastrop, TX",
     ["elgin", "smithville", "lockhart", "giddings"],
     ["marathon-pintail-4bed-2bath-double-wide", "marathon-longview-3bed-2bath-single-wide", "marathon-dove-1bed-1bath-single-wide"]),
    ("giddings", "Giddings", "Lee", "small-town",
     "Mobile homes for sale in Giddings, TX and Lee County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
     "/homes/the-moose/hero.jpeg", "Manufactured home exterior near Giddings, TX",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Double wide manufactured home available for delivery near Giddings, TX",
     ["elgin", "brenham", "la-grange", "caldwell"],
     ["fleetwood-pronghorn-4bed-2bath-double-wide", "marathon-katy-3bed-2bath-single-wide", "marathon-dawson-4bed-2bath-double-wide"]),
    ("la-grange", "La Grange", "Fayette", "small-town",
     "Mobile homes for sale in La Grange, TX and Fayette County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-grayson/IMG_0789.webp", "Double wide manufactured home exterior near La Grange, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Manufactured home available for delivery near La Grange, TX",
     ["schulenburg", "giddings", "columbus", "flatonia"],
     ["marathon-brewster-3bed-2bath-double-wide", "marathon-cisco-2bed-2bath-single-wide", "fleetwood-axis-3bed-2bath-double-wide"]),
    ("schulenburg", "Schulenburg", "Fayette", "small-town",
     "Mobile homes for sale in Schulenburg, TX and Fayette County. HUD-certified manufactured homes with honest, no-pressure financing. Get a free quote today.",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior near Schulenburg, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Manufactured home available for delivery near Schulenburg, TX",
     ["la-grange", "flatonia", "columbus", "hallettsville"],
     ["marathon-widgeon-4bed-2bath-double-wide", "fleetwood-armadillo-3bed-2bath", "marathon-coleman-3bed-2bath-double-wide"]),
    ("flatonia", "Flatonia", "Fayette", "small-town",
     "Mobile homes for sale in Flatonia, TX and Fayette County. New manufactured homes with honest, no-pressure financing — get your free quote from us today.",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home exterior near Flatonia, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Compact mobile home available for delivery near Flatonia, TX",
     ["schulenburg", "la-grange", "gonzales", "hallettsville"],
     ["marathon-lanny-1bed-1bath-park-model", "marathon-redhead-3bed-2bath-double-wide", "marathon-darrell-1bed-1bath-park-model"]),
    ("cuero", "Cuero", "DeWitt", "small-town",
     "Mobile homes for sale in Cuero, TX and DeWitt County. Family-owned manufactured home dealer with honest, no-pressure financing. Free quote today.",
     "/homes/the-pronghorn/Image.jpeg", "Manufactured home exterior near Cuero, TX",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home available for delivery near Cuero, TX",
     ["yorktown", "gonzales", "victoria", "yoakum"],
     ["marathon-ranger-2bed-1bath-single-wide", "marathon-jasper-3bed-2bath-double-wide", "fleetwood-rattlesnake-3bed-2bath-single-wide"]),
    # ─── Batch 3: Brazos Valley / Coastal Bend / Bell County corridor ───
    ("columbus", "Columbus", "Colorado", "small-town",
     "Mobile homes for sale in Columbus, TX and Colorado County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Double wide manufactured home exterior near Columbus, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Columbus, TX",
     ["sealy", "la-grange", "schulenburg", "eagle-lake"],
     ["marathon-loving-3bed-2bath-double-wide", "marathon-conroe-2bed-2bath-single-wide", "marathon-gadwall-3bed-2bath-double-wide"]),
    ("sealy", "Sealy", "Austin", "small-town",
     "Mobile homes for sale in Sealy, TX and Austin County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-katy/Katy-Hero.png", "Double wide manufactured home exterior near Sealy, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Single wide manufactured home available for delivery near Sealy, TX",
     ["columbus", "brenham", "bellville", "katy"],
     ["marathon-amarillo-2bed-2bath-single-wide", "marathon-mallard-4bed-2bath-double-wide", "marathon-daniel-1bed-1bath-park-model"]),
    ("brenham", "Brenham", "Washington", "small-town",
     "Mobile homes for sale in Brenham, TX and Washington County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-moose/hero.jpeg", "Double wide manufactured home exterior near Brenham, TX",
     "/homes/the-javelina/hero.jpg", "Single wide manufactured home available for delivery near Brenham, TX",
     ["giddings", "navasota", "sealy", "caldwell"],
     ["marathon-beaumont-3bed-2bath-single-wide", "fleetwood-badger-3bed-2bath-double-wide", "fleetwood-bobcat-3bed-2bath-single-wide"]),
    ("navasota", "Navasota", "Grimes", "small-town",
     "Mobile homes for sale in Navasota, TX and Grimes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home exterior near Navasota, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Single wide manufactured home available for delivery near Navasota, TX",
     ["brenham", "bryan", "conroe", "caldwell"],
     ["marathon-breckenridge-3bed-2bath-single-wide", "marathon-kendall-3bed-2bath-double-wide", "marathon-pearland-3bed-2bath-single-wide"]),
    ("caldwell", "Caldwell", "Burleson", "small-town",
     "Mobile homes for sale in Caldwell, TX and Burleson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-pronghorn/Image.jpeg", "Double wide manufactured home exterior near Caldwell, TX",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home available for delivery near Caldwell, TX",
     ["brenham", "giddings", "bryan", "rockdale"],
     ["marathon-bailey-3bed-2bath-double-wide", "fleetwood-coyote-2bed-2bath-single-wide", "marathon-spoonbill-3bed-2bath-single-wide"]),
    ("cameron", "Cameron", "Milam", "small-town",
     "Mobile homes for sale in Cameron, TX and Milam County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior near Cameron, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Single wide manufactured home available for delivery near Cameron, TX",
     ["rockdale", "caldwell", "taylor", "temple"],
     ["marathon-jackson-1bed-1bath-park-model", "marathon-grayson-4bed-2bath-double-wide", "marathon-grapevine-2bed-2bath-single-wide"]),
    ("rockdale", "Rockdale", "Milam", "small-town",
     "Mobile homes for sale in Rockdale, TX and Milam County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg", "Double wide manufactured home exterior near Rockdale, TX",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Single wide manufactured home available for delivery near Rockdale, TX",
     ["cameron", "taylor", "giddings", "elgin"],
     ["marathon-temple-3bed-2bath-single-wide", "fleetwood-roadrunner-3bed-2bath", "marathon-pigeon-3bed-2bath-double-wide"]),
    ("taylor", "Taylor", "Williamson", "small-town",
     "Mobile homes for sale in Taylor, TX and Williamson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-coleman/Coleman-Gallery-1.jpg", "Double wide manufactured home exterior near Taylor, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Single wide manufactured home available for delivery near Taylor, TX",
     ["georgetown", "elgin", "rockdale", "round-rock"],
     ["marathon-trinity-4bed-2bath-double-wide", "marathon-chapman-1bed-1bath-park-model", "fleetwood-peredavid-3bed-2bath-double-wide"]),
    ("georgetown", "Georgetown", "Williamson", "small-town",
     "Mobile homes for sale in Georgetown, TX and Williamson County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-terra/Terra-Hero.jpg", "Double wide manufactured home exterior near Georgetown, TX",
     "/homes/the-dove/IMG_0895.jpg.jpeg", "Single wide manufactured home available for delivery near Georgetown, TX",
     ["round-rock", "taylor", "burnet", "cedar-park"],
     ["fleetwood-moose-4bed-2bath-double-wide", "marathon-abilene-2bed-1bath-single-wide", "marathon-hays-4bed-2bath-double-wide"]),
    ("yoakum", "Yoakum", "Lavaca", "small-town",
     "Mobile homes for sale in Yoakum, TX and Lavaca County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-chapman/Chapman-Hero.png", "Double wide manufactured home exterior near Yoakum, TX",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Single wide manufactured home available for delivery near Yoakum, TX",
     ["hallettsville", "cuero", "gonzales", "shiner"],
     ["marathon-terra-2bed-1bath-park-model", "marathon-woodduck-3bed-2bath-double-wide", "fleetwood-jackrabbit-3bed-2bath-double-wide"]),
    ("hallettsville", "Hallettsville", "Lavaca", "small-town",
     "Mobile homes for sale in Hallettsville, TX and Lavaca County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Double wide manufactured home exterior near Hallettsville, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Hallettsville, TX",
     ["yoakum", "schulenburg", "flatonia", "gonzales"],
     ["marathon-chapman-1bed-1bath-park-model", "marathon-pigeon-3bed-2bath-double-wide", "marathon-daniel-1bed-1bath-park-model"]),
    ("yorktown", "Yorktown", "DeWitt", "small-town",
     "Mobile homes for sale in Yorktown, TX and DeWitt County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-pigeon/Marathon-Archer-7.jpeg", "Double wide manufactured home exterior near Yorktown, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Single wide manufactured home available for delivery near Yorktown, TX",
     ["cuero", "goliad", "victoria", "gonzales"],
     ["marathon-hays-4bed-2bath-double-wide", "marathon-amarillo-2bed-2bath-single-wide", "marathon-kendall-3bed-2bath-double-wide"]),
    ("goliad", "Goliad", "Goliad", "small-town",
     "Mobile homes for sale in Goliad, TX and Goliad County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Double wide manufactured home exterior near Goliad, TX",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Single wide manufactured home available for delivery near Goliad, TX",
     ["yorktown", "victoria", "cuero", "beeville"],
     ["fleetwood-jackrabbit-3bed-2bath-double-wide", "marathon-katy-3bed-2bath-single-wide", "fleetwood-badger-3bed-2bath-double-wide"]),
    ("karnes-city", "Karnes City", "Karnes", "small-town",
     "Mobile homes for sale in Karnes City, TX and Karnes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg", "Double wide manufactured home exterior near Karnes City, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Single wide manufactured home available for delivery near Karnes City, TX",
     ["floresville", "kenedy", "cuero", "pleasanton"],
     ["fleetwood-roadrunner-3bed-2bath", "marathon-jackson-1bed-1bath-park-model", "marathon-brewster-3bed-2bath-double-wide"]),
    ("kenedy", "Kenedy", "Karnes", "small-town",
     "Mobile homes for sale in Kenedy, TX and Karnes County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-grayson/IMG_0789.webp", "Double wide manufactured home exterior near Kenedy, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Single wide manufactured home available for delivery near Kenedy, TX",
     ["karnes-city", "floresville", "cuero", "beeville"],
     ["marathon-jasper-3bed-2bath-double-wide", "fleetwood-rattlesnake-3bed-2bath-single-wide", "fleetwood-coyote-2bed-2bath-single-wide"]),
    ("beeville", "Beeville", "Bee", "small-town",
     "Mobile homes for sale in Beeville, TX and Bee County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-javelina/hero.jpg", "Double wide manufactured home exterior near Beeville, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Beeville, TX",
     ["goliad", "kenedy", "sinton", "refugio"],
     ["marathon-coleman-3bed-2bath-double-wide", "marathon-cisco-2bed-2bath-single-wide", "marathon-widgeon-4bed-2bath-double-wide"]),
    ("refugio", "Refugio", "Refugio", "small-town",
     "Mobile homes for sale in Refugio, TX and Refugio County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Double wide manufactured home exterior near Refugio, TX",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Single wide manufactured home available for delivery near Refugio, TX",
     ["beeville", "goliad", "sinton", "victoria"],
     ["marathon-longview-3bed-2bath-single-wide", "marathon-grayson-4bed-2bath-double-wide", "marathon-grapevine-2bed-2bath-single-wide"]),
    ("sinton", "Sinton", "San Patricio", "small-town",
     "Mobile homes for sale in Sinton, TX and San Patricio County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-spoonbill/Spoonbill-Hero.png", "Double wide manufactured home exterior near Sinton, TX",
     "/homes/the-katy/Katy-Hero.png", "Single wide manufactured home available for delivery near Sinton, TX",
     ["beeville", "refugio", "robstown", "ingleside"],
     ["marathon-woodduck-3bed-2bath-double-wide", "fleetwood-armadillo-3bed-2bath", "fleetwood-peredavid-3bed-2bath-double-wide"]),
    ("gatesville", "Gatesville", "Coryell", "small-town",
     "Mobile homes for sale in Gatesville, TX and Coryell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-katy/Katy-Hero.png", "Double wide manufactured home exterior near Gatesville, TX",
     "/homes/the-terra/Terra-Hero.jpg", "Single wide manufactured home available for delivery near Gatesville, TX",
     ["copperas-cove", "lampasas", "hamilton", "temple"],
     ["fleetwood-axis-3bed-2bath-double-wide", "marathon-spoonbill-3bed-2bath-single-wide", "marathon-dawson-4bed-2bath-double-wide"]),
    ("copperas-cove", "Copperas Cove", "Coryell", "small-town",
     "Mobile homes for sale in Copperas Cove, TX and Coryell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-moose/hero.jpeg", "Double wide manufactured home exterior near Copperas Cove, TX",
     "/homes/the-javelina/hero.jpg", "Single wide manufactured home available for delivery near Copperas Cove, TX",
     ["gatesville", "lampasas", "killeen", "harker-heights"],
     ["marathon-ranger-2bed-1bath-single-wide", "fleetwood-pronghorn-4bed-2bath-double-wide", "marathon-fisher-3bed-2bath-double-wide"]),
    ("killeen", "Killeen", "Bell", "small-town",
     "Mobile homes for sale in Killeen, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-wood-duck/Wood-Duck-Hero.jpg", "Double wide manufactured home exterior near Killeen, TX",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Single wide manufactured home available for delivery near Killeen, TX",
     ["harker-heights", "copperas-cove", "belton", "temple"],
     ["marathon-conroe-2bed-2bath-single-wide", "marathon-redhead-3bed-2bath-double-wide", "marathon-mesquite-3bed-2bath-single-wide"]),
    ("harker-heights", "Harker Heights", "Bell", "small-town",
     "Mobile homes for sale in Harker Heights, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-pronghorn/Image.jpeg", "Double wide manufactured home exterior near Harker Heights, TX",
     "/homes/the-mesquite/Mesquite-Body-1.jpg", "Single wide manufactured home available for delivery near Harker Heights, TX",
     ["killeen", "belton", "temple", "copperas-cove"],
     ["marathon-abilene-2bed-1bath-single-wide", "marathon-bell-3bed-2bath-double-wide", "marathon-terra-2bed-1bath-park-model"]),
    ("belton", "Belton", "Bell", "small-town",
     "Mobile homes for sale in Belton, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-gadwall/Gadwall-Hero.jpg", "Double wide manufactured home exterior near Belton, TX",
     "/homes/the-chapman/Chapman-Hero.png", "Single wide manufactured home available for delivery near Belton, TX",
     ["temple", "killeen", "harker-heights", "salado"],
     ["marathon-pintail-4bed-2bath-double-wide", "fleetwood-raven-3bed-2bath-single-wide", "marathon-beaumont-3bed-2bath-single-wide"]),
    ("temple", "Temple", "Bell", "small-town",
     "Mobile homes for sale in Temple, TX and Bell County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg", "Double wide manufactured home exterior near Temple, TX",
     "/homes/the-widgeon/2-Stonewall.jpg.jpeg", "Single wide manufactured home available for delivery near Temple, TX",
     ["belton", "killeen", "cameron", "salado"],
     ["marathon-lanny-1bed-1bath-park-model", "marathon-loving-3bed-2bath-double-wide", "marathon-temple-3bed-2bath-single-wide"]),
    ("hamilton", "Hamilton", "Hamilton", "small-town",
     "Mobile homes for sale in Hamilton, TX and Hamilton County. New manufactured homes with honest, no-pressure financing — get your free quote today.",
     "/homes/the-coleman/Coleman-Gallery-1.jpg", "Double wide manufactured home exterior near Hamilton, TX",
     "/homes/the-brewster/Brewster-Body-1.jpg", "Single wide manufactured home available for delivery near Hamilton, TX",
     ["goldthwaite", "comanche", "gatesville", "stephenville"],
     ["marathon-pearland-3bed-2bath-single-wide", "marathon-caldwell-4bed-2bath-double-wide", "fleetwood-bobcat-3bed-2bath-single-wide"]),
]

# ─── Hand-written per-city copy ──────────────────────────────────────────
# intro: 1 paragraph. buying: exactly 2 paragraphs. localProof: 1 sentence
# or two. faq: 3-5 {q, a} items, city-specific topics only — the
# definition/setup-scope/price-lock/utility-pricing topics live on shared
# explainer pages now, not in per-city FAQ. See CLAUDE.md's "Explainer
# pages" section. All fresh prose — no shared templates.
CITY_COPY = {
    # ─── Batch 3: Brazos Valley / Coastal Bend / Bell County corridor ───
    "columbus": {
        "intro": "Columbus sits right on I-10, which means Texas Homes Direct can reach a Colorado County property from either the Houston side or the San Antonio side without a detour — delivery logistics that don't depend on which direction you're coming from.",
        "buying": [
            "That two-direction access matters when a Columbus-area buyer is on a tighter schedule than most — there's no single choke point our trucks have to route through.",
            "Compared to site-built construction, a HUD-code manufactured home still runs meaningfully less for a Colorado County family, without a drop in construction quality.",
        ],
        "pricingExplainer": [
            "Once a Columbus-area buyer has a quote in hand, that number doesn't move — everything itemized above is already accounted for, regardless of delivery direction.",
            "Colorado County land varies enough that utility costs get a phone estimate first, then an exact bid once our contractor has actually walked the property.",
        ],
        "gettingStarted": [
            "The first real question for a Columbus-area buyer is the property itself — where it sits relative to I-10 shapes delivery scheduling more than almost anything else.",
            "From there, it's financing and floor plan, worked out in whichever order makes sense for you — neither one has to come first.",
        ],
        "localProof": "Colorado County buyers we've worked with have been delivered to from both directions along I-10, depending on where their property actually sits.",
        "faq": [
            {
                "q": "Does it matter which direction you deliver from for a Columbus property?",
                "a": "Not for pricing or process — we scope the route based on where your property actually is, whether that means coming from Houston or San Antonio.",
            },
            {
                "q": "Do I need to already own land in Colorado County?",
                "a": "No. Family property, land you've already purchased, or a lot you're still deciding on all work the same way with us.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide ships as one section and costs less upfront; a double wide ships as two sections joined on-site for meaningfully more square footage.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "sealy": {
        "intro": "A lot of Sealy-area buyers have never actually seen how a manufactured home gets built, so Texas Homes Direct walks through the HUD code construction process in plain terms — what's inspected, when, and why it matters for a home you'll own for decades.",
        "buying": [
            "Every home is built to the same federal HUD code and passes factory inspection before it ships to an Austin County address — the same standard whether it's headed to Sealy or anywhere else in Texas.",
            "Understanding what that construction standard actually covers helps a Sealy-area buyer compare a manufactured home honestly against a site-built house, instead of guessing at the difference.",
        ],
        "pricingExplainer": [
            "Once you understand what's built into the construction standard, the price makes more sense too — everything itemized above is already part of your Sealy-area quote.",
            "Utility costs are the one piece that depends on your specific Austin County property, so we start with a phone estimate and follow with an exact bid once a contractor has seen the site.",
        ],
        "gettingStarted": [
            "Most Sealy-area buyers start with questions about how the home is actually built, not the paperwork — which is where we'd rather start too.",
            "Once that part makes sense, we move to your property and your timeline, working through both at whatever pace you're comfortable with.",
        ],
        "localProof": "We've walked more than a few Austin County families through exactly what HUD-code construction involves before they ever committed to a floor plan.",
        "faq": [
            {
                "q": "What does 'HUD code' actually mean for the home I'd be buying?",
                "a": "It's the federal construction and safety standard every manufactured home built after June 1976 has to meet — structural design, materials, fire safety — verified by factory inspection before the home ships.",
            },
            {
                "q": "Do I need to already own land in Austin County?",
                "a": "Not at all — some Sealy-area buyers already have land squared away, others are still shopping for a lot, and some are working through family property.",
            },
            {
                "q": "Do you deliver throughout Austin County?",
                "a": "We do, across all of Austin County — reach out with your address and we'll confirm the details for your property.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "brenham": {
        "intro": "A lot of Washington County properties near Brenham come with more acreage than a typical in-town lot, and that changes what setup actually looks like — longer utility runs, more site prep, sometimes a completely different approach to the pad.",
        "buying": [
            "We scope a larger rural property the same careful way we'd scope a smaller one — nothing about acreage gets a generic answer near Brenham.",
            "Rural acreage or a smaller in-town lot, the cost gap between a HUD-code manufactured home and a comparable site-built house near Brenham stays about the same.",
        ],
        "pricingExplainer": [
            "Whatever your Washington County property looks like, the out-the-door home price is fixed the moment you see your quote — everything itemized above is already included.",
            "Utility costs are the exception, simply because rural acreage varies too much to price sight-unseen. A phone estimate starts the conversation, and a contractor's on-site visit finishes it.",
        ],
        "gettingStarted": [
            "For a Brenham-area buyer, the first real conversation is about the property itself — how many acres, what's already run to it, and what still needs to happen before a home can go on it.",
            "Once we understand the site, floor plan and financing follow naturally, sized to what actually fits the land you've got.",
        ],
        "localProof": "Washington County buyers we've worked with have ranged from a small in-town lot to several acres of family land, and we've scoped each one individually.",
        "faq": [
            {
                "q": "Does a larger rural property cost more to set up near Brenham?",
                "a": "It depends on what the site already has — existing utility access matters more than acreage alone. We'll give you a real answer after seeing what your property needs.",
            },
            {
                "q": "Do I need to already own land in Washington County?",
                "a": "No — we hear from Washington County buyers whether they already have land, are mid-purchase on a lot, or are sorting out family property.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide ships as one section and keeps costs lower; a double wide ships as two sections joined on-site for a larger household.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "navasota": {
        "intro": "A number of Navasota-area buyers already have a mobile home on their property — one that's aging out — and are looking at what it takes to replace it with something built to current standards, not just patch the old one again.",
        "buying": [
            "Replacing an older mobile home near Navasota usually means dealing with removal as much as installation, and we walk through both pieces before you commit to anything.",
            "A new manufactured home meeting current HUD code is a different construction standard entirely from an older mobile home — not just a fresher version of the same thing.",
        ],
        "pricingExplainer": [
            "A Navasota-area buyer sees one complete number, replacement home or new build alike — everything itemized above is already folded into that quote.",
            "The land itself, not the home it's replacing, is what determines the utility number for a Grimes County property. A phone estimate opens the conversation, and a contractor's visit closes it.",
        ],
        "gettingStarted": [
            "If there's already a mobile home on your Navasota-area property, that's the first thing worth telling us — it changes the setup conversation more than almost anything else.",
            "From there, we walk through what removal and replacement actually involve, then move into floor plan and financing once the site itself is understood.",
        ],
        "localProof": "We've worked with Grimes County families replacing an aging mobile home as often as we've worked with buyers starting on a completely open lot.",
        "faq": [
            {
                "q": "Do you handle removing an old mobile home near Navasota?",
                "a": "That's part of the conversation we have once we know your specific situation — reach out and we'll cover what applies to your property.",
            },
            {
                "q": "Is a new manufactured home actually different from an older mobile home?",
                "a": "Yes — construction standards changed significantly with the federal HUD code, and everything we sell meets the current standard, not an older one.",
            },
            {
                "q": "Do you deliver throughout Grimes County?",
                "a": "We do — reach out with your Grimes County address and we'll confirm what delivery and setup look like at your site.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "caldwell": {
        "intro": "A good share of Caldwell-area land has been passed down through Burleson County families for a generation or more, and Texas Homes Direct treats that kind of property differently — not as a blank lot, but as land with its own history and its own quirks.",
        "buying": [
            "Family land near Caldwell sometimes comes with an old well, a partial fence line, or a structure that's been there for decades — we work around what's actually there instead of assuming a clean slate.",
            "A manufactured home built to current HUD code still costs meaningfully less than site-built construction, whether the land under it has been in the family for one year or fifty.",
        ],
        "pricingExplainer": [
            "Whatever the history of your Burleson County property, the out-the-door price is the same fixed number once you see your quote — everything itemized above is included.",
            "Utility costs are the one variable, since older family land can have older infrastructure that needs a real look. A phone estimate starts it, and a contractor's visit finishes it.",
        ],
        "gettingStarted": [
            "For a lot of Caldwell-area buyers, the first real conversation is about the land itself — what's already there, what's been added over the years, and what still needs work.",
            "Once we understand the property's actual history, floor plan and financing come next, worked out around what the land can realistically support.",
        ],
        "localProof": "We've worked with Burleson County families setting up on land that had been theirs for decades, and with buyers on a lot purchased just months earlier.",
        "faq": [
            {
                "q": "Does older infrastructure on family land slow down setup near Caldwell?",
                "a": "Not usually — we just need to see what's actually there first. An older well or partial utility line gets accounted for like anything else on the site.",
            },
            {
                "q": "Do I need a permit for a manufactured home in Burleson County?",
                "a": "Every property is a little different, so we'd rather you confirm the specifics with Burleson County directly than get an answer here that might not actually apply to your lot.",
            },
            {
                "q": "What happens once I've picked a home?",
                "a": "After that, our team handles the build schedule, gets the home to your site, and manages the full setup — you'll hear from us along the way.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "cameron": {
        "intro": "Cameron-area families outgrowing a starter home usually need one thing above all: another bedroom, or two, without starting the whole search over. Texas Homes Direct carries floor plans built for exactly that kind of growth.",
        "buying": [
            "A four-bedroom double wide gives a growing Milam County household real separation between bedrooms, not just more square footage crammed into the same layout.",
            "Moving up in floor plan doesn't mean a different financing process — a larger home near Cameron is quoted and financed the same straightforward way as a smaller one.",
        ],
        "pricingExplainer": [
            "No matter which floor plan size a Cameron-area family settles on, the number holds once it's quoted — everything itemized above is already accounted for.",
            "We won't guess at utility costs from a phone call alone — Milam County land varies too much for that. A contractor's on-site visit is what turns the estimate into a real number.",
        ],
        "gettingStarted": [
            "For a Cameron-area family outgrowing their current space, the first real question is how many bedrooms actually solves the problem — not just how much bigger.",
            "Once we know what the household needs, we match floor plans to that number and walk through financing for whichever one fits.",
        ],
        "localProof": "We've helped Milam County families move from a cramped starter setup into a floor plan that actually matches how many people are living there.",
        "faq": [
            {
                "q": "What's the biggest floor plan available near Cameron?",
                "a": "We carry four-bedroom double wides among other layouts — reach out and we'll walk through what's currently available sized for your household.",
            },
            {
                "q": "Do I need to already own land in Milam County?",
                "a": "No. Some Milam County families already have their site, some are still hunting for one, and some are working through land that's been in the family.",
            },
            {
                "q": "Do you deliver throughout Milam County?",
                "a": "We do — send over your address and we'll lay out exactly what delivery and setup involve at your location.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "rockdale": {
        "intro": "An older mobile home and a new HUD-code manufactured home don't run the same utility bill, and that gap is part of what brings a lot of Rockdale-area families to Texas Homes Direct in the first place.",
        "buying": [
            "Current HUD code requires meaningfully better insulation and construction standards than older mobile homes were built to, which shows up directly in what a Milam County family pays to heat and cool their home.",
            "A new manufactured home near Rockdale still costs less upfront than comparable site-built construction, on top of the ongoing efficiency difference.",
        ],
        "pricingExplainer": [
            "Once you've got a quote in hand for a Rockdale-area home, that's the number — everything itemized above is already folded in, efficiency savings and all.",
            "Efficiency savings are one thing; the utility hookup bid is another, and that one still depends on your specific Rockdale-area property. A phone estimate opens it, a contractor's visit closes it.",
        ],
        "gettingStarted": [
            "A lot of Rockdale-area buyers start by asking what they'd actually save on utilities moving from an older home to a new one — a fair question, and one we're glad to walk through.",
            "From there, it's the usual next steps: your property, your floor plan, and financing that fits your budget.",
        ],
        "localProof": "We've talked more than a few Milam County families through the real difference between an older mobile home's utility costs and a new HUD-code home's.",
        "faq": [
            {
                "q": "Is a new manufactured home actually more efficient than an older mobile home?",
                "a": "Generally yes, though how much you'd actually save depends on the specific home you're replacing — an older single-pane, poorly-sealed unit shows a bigger gap than one that's held up well.",
            },
            {
                "q": "Do I need to already own land in Milam County?",
                "a": "It's not required. Milam County buyers show up with land already secured, a lot they're still deciding on, or family property in the mix, and any of those works.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide ships as one continuous section for a lower cost; a double wide arrives in two sections joined on-site for a noticeably bigger home.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "taylor": {
        "intro": "Before a Taylor-area buyer talks numbers with us, we'd rather they run our free mortgage analysis tool first — no credit pull, no obligation, just a real sense of what a Williamson County budget actually supports.",
        "buying": [
            "That tool exists so a Taylor-area buyer walks into the real conversation already knowing roughly what they can afford, instead of guessing.",
            "Site-built construction in Williamson County costs noticeably more than a comparable HUD-code manufactured home, without any step down in quality.",
        ],
        "pricingExplainer": [
            "Once you've got real numbers from the mortgage tool, the actual quote confirms them — everything itemized above is already built into the out-the-door price.",
            "Utility costs are the one number the tool can't predict, since Williamson County land varies too much. A phone estimate comes first, then an exact bid once a contractor has seen the property.",
        ],
        "gettingStarted": [
            "The first step for most Taylor-area buyers is the mortgage analysis tool — five minutes, no credit pull, and a real number to plan around before anything else happens.",
            "From there, the conversation moves to your property and which floor plan actually fits the number you just saw.",
        ],
        "localProof": "A lot of Williamson County buyers near Taylor start with our mortgage tool before they've even picked a floor plan — that's exactly how it's meant to work.",
        "faq": [
            {
                "q": "Does the mortgage analysis tool affect my credit?",
                "a": "No — it's a soft check with no credit pull, meant to give you real numbers before you commit to anything.",
            },
            {
                "q": "Do I need to already own land in Williamson County?",
                "a": "Not upfront. Whether you've already got a Williamson County lot, you're still looking, or you're navigating family land, we can move forward.",
            },
            {
                "q": "Do you deliver throughout Williamson County?",
                "a": "We do — every part of Williamson County. Send your address and we'll break down what delivery and setup involve at your specific location.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "georgetown": {
        "intro": "A single-level floor plan with no stairs to manage is usually what brings a Georgetown-area buyer looking to downsize to Texas Homes Direct — less house to maintain, without giving up real living space.",
        "buying": [
            "A smaller single wide keeps upkeep simple for a Georgetown-area buyer who doesn't need the extra bedrooms anymore, while still meeting the same HUD construction standard as any other home we sell.",
            "Downsizing doesn't mean downgrading — every floor plan we offer near Georgetown, large or small, passes the same factory inspection before it ships.",
        ],
        "pricingExplainer": [
            "A smaller floor plan generally means a smaller number, but the same rule applies either way — everything itemized above is already built into your Williamson County quote.",
            "Utility costs are the one thing that doesn't shrink with the floor plan, since they depend on the property itself. A phone estimate starts it, an exact contractor bid finishes it.",
        ],
        "gettingStarted": [
            "For a Georgetown-area buyer downsizing, the first real conversation is about what you're actually trying to simplify — fewer bedrooms, less yard, or both.",
            "Once we know what you're downsizing away from, we can match a floor plan that fits the smaller footprint you're after.",
        ],
        "localProof": "We've helped Williamson County buyers near Georgetown move into a simpler single-level home without feeling like they gave anything up.",
        "faq": [
            {
                "q": "What's the smallest floor plan available for a Georgetown-area buyer?",
                "a": "We carry compact single-section homes down to smaller footprints — reach out and we'll walk through what's currently available.",
            },
            {
                "q": "Is downsizing to a manufactured home a big financing change?",
                "a": "Not usually — financing works the same way regardless of floor plan size, and a smaller home often means a smaller monthly payment.",
            },
            {
                "q": "Do you deliver throughout Williamson County?",
                "a": "Yes — give us your address and we'll walk through what delivery and setup actually look like for your property.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "yoakum": {
        "intro": "A lot of Yoakum-area properties are working ranches or farms, not just residential lots, and that means setup has to work around outbuildings, fence lines, and equipment that's already there.",
        "buying": [
            "We scope a Lavaca County ranch property the same careful way we'd scope any other site — what's already there shapes the plan, not the other way around.",
            "A manufactured home built to current HUD code still runs meaningfully less than comparable site-built construction, working ranch or not.",
        ],
        "pricingExplainer": [
            "Whatever your Yoakum-area property looks like — barns, corrals, or open pasture — the out-the-door home price is the same fixed number once quoted.",
            "Utility hookups don't come with a flat number, since ranch and farm properties near Yoakum vary too much for that. We open with a phone estimate, then a contractor walks the land for the real figure.",
        ],
        "gettingStarted": [
            "For a Yoakum-area buyer on a working property, the first real question is what's already out there — outbuildings, fencing, equipment — since that shapes where the home actually goes.",
            "Once we understand the layout, we move into floor plan and financing, same as we would for any other property.",
        ],
        "localProof": "We've set up homes on working ranch and farm properties across Lavaca County, working around what was already on the land rather than starting from scratch.",
        "faq": [
            {
                "q": "Can you set up around existing barns or outbuildings near Yoakum?",
                "a": "Yes — we assess the actual site, including what's already there, before finalizing where the home goes.",
            },
            {
                "q": "Do I need a permit for a manufactured home in Lavaca County?",
                "a": "Permitting comes down to the specific property more than a blanket rule, so it's worth a direct call to Lavaca County to confirm what applies to yours.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "Sizing mostly comes down to your lot and your budget — a single wide keeps both lower, while a double wide gives a growing Yoakum-area household more room to spread out.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "hallettsville": {
        "intro": "If a Hallettsville-area buyer is comparing quotes from more than one dealer, we'll put ours in writing, itemized, so it's an actual apples-to-apples comparison instead of two numbers that don't mean the same thing.",
        "buying": [
            "A quote that isn't itemized can hide what's actually included — a Lavaca County buyer deserves to see setup, delivery, and utilities broken out, not folded into one vague number.",
            "Whichever quote you're comparing, a HUD-code manufactured home consistently comes in well under site-built construction costs near Hallettsville.",
        ],
        "pricingExplainer": [
            "An itemized quote is exactly what you'll get from us — everything listed above is already built into the out-the-door price for a Hallettsville-area buyer.",
            "Utility costs are the one line that can't be itemized upfront, since Lavaca County land varies too much. A phone estimate starts it, and a contractor's exact bid finishes it.",
        ],
        "gettingStarted": [
            "If you're shopping more than one dealer near Hallettsville, bring us their quote — we'll walk through ours side by side so you can see exactly what's different.",
            "Once you've compared real numbers, the next step is your property and your timeline for deciding.",
        ],
        "localProof": "More than one Lavaca County buyer has brought us a competing quote to compare, and we've walked through the line-item differences together.",
        "faq": [
            {
                "q": "Will you look at a competing quote from another dealer near Hallettsville?",
                "a": "Yes — bring it and we'll walk through the itemized differences so you can see what's actually being compared.",
            },
            {
                "q": "Do I need to already own land in Lavaca County?",
                "a": "No — land already owned, a lot still being purchased, or family property still in the works are all fine places to start with us.",
            },
            {
                "q": "Do you deliver throughout Lavaca County?",
                "a": "We cover all of Lavaca County — share your address and we'll confirm the specifics for your site.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "yorktown": {
        "intro": "A number of Yorktown-area buyers come to Texas Homes Direct after being told no somewhere else, and that's usually where the real conversation starts — a second look, not a repeat of the first rejection.",
        "buying": [
            "Between financing directly and working with outside public and private lenders, a DeWitt County buyer who's been turned down before often still has a workable path with us.",
            "A DeWitt County family ends up paying noticeably less for a HUD-code manufactured home than for site-built construction, whatever the financing search has looked like so far.",
        ],
        "pricingExplainer": [
            "Whatever your financing path ends up being, the out-the-door price for a Yorktown-area buyer works the same way — everything itemized above is already included.",
            "Utility costs are the one variable, since DeWitt County land varies too much to quote sight unseen. A phone estimate starts it, an exact contractor bid finishes it.",
        ],
        "gettingStarted": [
            "If you've been told no somewhere else, that's genuinely useful for us to know upfront — it doesn't rule anything out, it just tells us where to start.",
            "From there, we walk through financing options directly, then move into your property and floor plan once that part's settled.",
        ],
        "localProof": "We've worked with DeWitt County buyers near Yorktown who came to us after being turned down elsewhere, and found a path that actually worked.",
        "faq": [
            {
                "q": "I was denied financing somewhere else — is it worth trying again near Yorktown?",
                "a": "Often, yes. Between in-house financing and outside public and private lenders, we frequently find a path even after another lender said no.",
            },
            {
                "q": "Do I need to already own land in DeWitt County?",
                "a": "No — a DeWitt County buyer might already have land, might be shopping for a lot, or might be working through family property. All three are fine starting points.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide is one section and costs less; a double wide is two sections joined on-site with more total space.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "goliad": {
        "intro": "Goliad is one of the oldest towns in Texas, and the pace of a conversation with Texas Homes Direct matches that a little — no rush, no script, just an actual conversation about what a Goliad County family needs.",
        "buying": [
            "That unhurried approach matters most when a Goliad-area buyer has specific questions about their property or their timeline — a scripted answer doesn't hold up to real questions.",
            "Site-built construction runs well ahead of a comparable HUD-code manufactured home in cost, historic setting or not.",
        ],
        "pricingExplainer": [
            "For a Goliad-area buyer, there's no revised number waiting after the first one — everything itemized above is already locked into the price you're quoted.",
            "Utility hookups are the exception to that fixed number — Goliad County land is inconsistent enough that a phone estimate only opens the conversation, and the contractor's on-site bid is the figure that matters.",
        ],
        "gettingStarted": [
            "There's no set script for a first conversation near Goliad — we'll talk through your property, your timeline, and your actual questions in whatever order makes sense to you.",
            "Once we've covered what matters to you, we move into floor plan and financing at whatever pace works.",
        ],
        "localProof": "Goliad County families have taken their time with us, asking real questions before deciding, and we've never rushed anyone through it.",
        "faq": [
            {
                "q": "Do I need a permit for a manufactured home in Goliad County?",
                "a": "Requirements vary by county and by property, so it's worth confirming directly with Goliad County. We can help point you toward the right office.",
            },
            {
                "q": "Do I need to already own land in Goliad County?",
                "a": "It's not a prerequisite. Goliad County buyers come to us with land secured, a lot still in progress, or family property being worked through.",
            },
            {
                "q": "What happens once I've picked a home?",
                "a": "From there, we take the lead on the build timeline, delivery, and setup, checking in with you rather than going quiet until it's done.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "karnes-city": {
        "intro": "A fair number of Karnes City-area buyers are new to the area entirely — relocating for work, for family, or just a fresh start — and don't have the local context a longtime resident would. Texas Homes Direct fills in that gap without making you feel behind.",
        "buying": [
            "We walk a new-to-the-area Karnes County buyer through the same process as anyone else, just with a little more explanation along the way about how things work locally.",
            "New to the area or not, a HUD-code manufactured home still gets a Karnes County family into a new home for meaningfully less than building from scratch.",
        ],
        "pricingExplainer": [
            "Whether you've lived in Karnes County for years or just arrived, the out-the-door price works the same way — everything itemized above is already built in.",
            "Utility costs are the one number that depends on the specific property, not how long you've been in the area. A phone estimate starts it, a contractor's exact bid finishes it.",
        ],
        "gettingStarted": [
            "If you're new to Karnes City, that's worth telling us upfront — we'll walk through the process a little more thoroughly than we would with someone who's done this before.",
            "From there, it's the same path as anyone else: property, floor plan, and financing, explained clearly at each step.",
        ],
        "localProof": "We've helped more than a few families relocating to Karnes County get oriented on the process before they'd even settled into the area.",
        "faq": [
            {
                "q": "I just moved to the area — where do I even start near Karnes City?",
                "a": "Right here. Reach out and we'll walk through the whole process, starting with your property situation and what you're looking for.",
            },
            {
                "q": "Do I need to already own land in Karnes County?",
                "a": "Not necessarily. Some Karnes County buyers already have a site, others are still looking, and some are working through property that's stayed in the family.",
            },
            {
                "q": "Do you deliver throughout Karnes County?",
                "a": "Yes. Send your address over and we'll spell out what delivery and setup will look like at your property.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "kenedy": {
        "intro": "A Kenedy-area buyer doesn't have to wait until their land purchase closes to lock in a home price with Texas Homes Direct — the two don't have to move in lockstep.",
        "buying": [
            "Locking in a floor plan and price while a Karnes County land deal is still in progress gives a buyer one less variable to manage during closing.",
            "A HUD-code manufactured home puts a Karnes County family into a new home for noticeably less than site-built construction, whether your land deal has closed yet or not.",
        ],
        "pricingExplainer": [
            "Once a Kenedy-area buyer locks in a floor plan, the out-the-door price holds — everything itemized above stays fixed regardless of how long the land purchase takes.",
            "Utility costs are the exception, since they depend on the specific property once it's yours. A phone estimate can start early, but the exact bid waits until a contractor can walk the land.",
        ],
        "gettingStarted": [
            "If your Karnes County land purchase is still in progress, that's fine — a Kenedy-area buyer can lock in a floor plan and price now and finish the land side separately.",
            "Once both pieces are settled, we move straight into setup, using whatever timeline actually fits your situation.",
        ],
        "localProof": "We've locked in floor plans and pricing for Karnes County buyers whose land deals were still closing, so nothing had to wait on the other.",
        "faq": [
            {
                "q": "Can I pick a home before my land purchase near Kenedy is finished?",
                "a": "Yes — we can lock in a floor plan and price while your land purchase is still in progress, so the two aren't dependent on each other.",
            },
            {
                "q": "Do I need to already own land in Karnes County?",
                "a": "No. Whether you've already got land, you're still shopping for a lot, or you're working through family property, we'll meet you where you are.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide ships as one section for a lower entry cost; a double wide ships as two sections joined on-site, giving you meaningfully more room.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "beeville": {
        "intro": "A lot of Bee County land near Beeville isn't tied up in subdivision rules or HOA restrictions the way in-town lots can be, which gives a buyer more say over their own property than a typical suburban lot would.",
        "buying": [
            "That flexibility matters when a Beeville-area buyer wants to place a home, an outbuilding, or a garden a certain way — fewer outside rules to work around.",
            "Open acreage or a more restricted lot, a HUD-code manufactured home still costs a Bee County family meaningfully less than comparable site-built construction.",
        ],
        "pricingExplainer": [
            "A Bee County quote doesn't move once you've seen it — everything itemized above is already built into the number, regardless of what your property looks like.",
            "Utilities are the one line we won't pin down sight-unseen. We start with a phone estimate and follow it with a contractor's exact bid once they've actually walked the site.",
        ],
        "gettingStarted": [
            "For a Beeville-area buyer on open rural land, the first real question is simply what the property has and doesn't have yet — utilities, access, a cleared site.",
            "From there, floor plan and financing come next, worked out around what your specific land actually needs.",
        ],
        "localProof": "We've set up homes on unrestricted rural properties across Bee County where buyers had far more flexibility than a typical subdivision lot allows.",
        "faq": [
            {
                "q": "Are there fewer restrictions on rural land near Beeville?",
                "a": "Often, yes, compared to a subdivision — but specifics depend on your particular property, so it's worth confirming directly with Bee County for anything county-regulated.",
            },
            {
                "q": "Do I need to already own land in Bee County?",
                "a": "No. A Bee County buyer might already own the land, might be closing on a lot, or might be sorting through family property — all three work.",
            },
            {
                "q": "Do you deliver throughout Bee County?",
                "a": "Every part of it — send over your Bee County address and we'll spell out exactly what delivery and setup involve at your location.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "refugio": {
        "intro": "Selling a current home while buying a new manufactured one is its own kind of logistics puzzle, and Texas Homes Direct works with Refugio-area buyers managing exactly that — two moving pieces, one plan.",
        "buying": [
            "We can lock in a floor plan and financing for a Refugio County buyer while a current home sale is still working through closing, so neither piece holds up the other.",
            "Mid-transition or fully settled, a HUD-code manufactured home still puts a Refugio County family into a new home for noticeably less than building new.",
        ],
        "pricingExplainer": [
            "A Refugio-area buyer's out-the-door number doesn't shift based on how long the current home sale takes — everything itemized above is locked in the moment you're quoted.",
            "Utility costs are the exception, tied to the new property itself. A phone estimate can start early, with the exact bid following once a contractor has walked the land.",
        ],
        "gettingStarted": [
            "If you're selling a current home while buying near Refugio, tell us that upfront — we'll work the timeline around both pieces instead of assuming a simple, single transaction.",
            "From there, floor plan and financing move forward on their own track while the sale works through its own process.",
        ],
        "localProof": "We've coordinated with Refugio County buyers managing a current home sale and a new manufactured home purchase at the same time.",
        "faq": [
            {
                "q": "Can you work with my timeline if I'm selling my current home near Refugio?",
                "a": "Yes — tell us where things stand and we'll coordinate the floor plan and financing side without forcing your sale onto a rigid schedule.",
            },
            {
                "q": "Do I need to already own land in Refugio County?",
                "a": "It doesn't have to be settled yet. Refugio County buyers reach out with land already secured, a lot still being decided, or family property in progress.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide comes as a single section at a lower price point; a double wide comes as two sections joined once they're on your property, for more square footage.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "sinton": {
        "intro": "San Patricio County stretches across a fair amount of ground, and Texas Homes Direct covers all of it from Sinton out to the smaller communities around it — delivery coverage that doesn't stop at the town line.",
        "buying": [
            "Whether a Sinton-area buyer is close to town or out toward the county line, the same team and the same process apply — nothing changes based on distance within the county.",
            "No matter where in San Patricio County it's headed, a HUD-code manufactured home runs meaningfully under the cost of comparable site-built construction.",
        ],
        "pricingExplainer": [
            "The out-the-door price for a Sinton-area buyer holds regardless of exactly where in the county the property sits — everything itemized above is already included.",
            "Utility costs are the one variable tied to the specific site. A phone estimate starts it, and a contractor's exact bid follows once they've actually seen the property.",
        ],
        "gettingStarted": [
            "The first real question for a Sinton-area buyer is simply where in San Patricio County the property sits — we cover the whole county, so this shapes scheduling, not whether we can deliver.",
            "Once location's settled, we move into your property's specific setup needs and then floor plan and financing.",
        ],
        "localProof": "We've delivered across San Patricio County, from properties close to Sinton itself out to smaller communities nearby.",
        "faq": [
            {
                "q": "Do you deliver throughout San Patricio County, or just Sinton itself?",
                "a": "All of San Patricio County — send your address and we'll confirm delivery and setup specifics for your property.",
            },
            {
                "q": "Do I need to already own land in San Patricio County?",
                "a": "Not yet, and that's fine. San Patricio County buyers reach out with land already secured, a lot in progress, or family property still being decided.",
            },
            {
                "q": "What happens once I've picked a home?",
                "a": "Once that's settled, we manage the build, get the home to your property, and complete setup, keeping you in the loop the whole way.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "gatesville": {
        "intro": "Before a Gatesville-area buyer ever picks up the phone with us, they can see the full setup checklist and out-the-door pricing breakdown — nothing held back for the first call, nothing that only comes out once you're already talking to someone.",
        "buying": [
            "That upfront transparency matters to a Coryell County buyer who'd rather research on their own terms before a conversation starts, not be walked through it live for the first time.",
            "Whether you call first or read everything first, the bottom line stays the same: a HUD-code manufactured home costs a Coryell County family noticeably less than site-built construction.",
        ],
        "pricingExplainer": [
            "The full setup checklist and out-the-door pricing are laid out above before you ever have to ask — everything itemized is already built into your Gatesville-area quote.",
            "Utility costs are the one piece that can't be published in advance, since Coryell County land varies too much. A phone estimate starts it, a contractor's exact bid finishes it.",
        ],
        "gettingStarted": [
            "A Gatesville-area buyer can read through the full checklist and pricing breakdown above before ever reaching out — there's nothing held back for the first conversation.",
            "When you are ready to talk, we pick up from your property and your specific questions, not from scratch.",
        ],
        "localProof": "Coryell County buyers near Gatesville have told us they appreciated seeing the full breakdown before their first call, not during it.",
        "faq": [
            {
                "q": "Do I need to call before I can see pricing details for Gatesville?",
                "a": "No — the setup checklist and out-the-door pricing breakdown are available to review before you ever reach out.",
            },
            {
                "q": "Do I need to already own land in Coryell County?",
                "a": "No — Coryell County buyers come to us with land already picked out, a lot still under consideration, or family property still being sorted.",
            },
            {
                "q": "Do you deliver throughout Coryell County?",
                "a": "The full county — send your address and we'll break down exactly what delivery and setup involve at your specific location.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "copperas-cove": {
        "intro": "A Copperas Cove-area buyer can see every financing option we offer before ever stepping into a conversation — in-house, public lenders, private lenders — laid out plainly instead of introduced one at a time as the conversation goes.",
        "buying": [
            "Seeing every financing path upfront lets a Coryell County buyer walk into the real conversation already knowing which option probably fits, instead of discovering it mid-call.",
            "A Coryell County family still comes out ahead on cost with a HUD-code manufactured home versus building from scratch, no matter which financing path ends up fitting.",
        ],
        "pricingExplainer": [
            "The out-the-door price for a Copperas Cove-area buyer holds regardless of which financing path you choose — everything itemized above is already built in.",
            "Utility costs are the one number financing can't predict, since they depend on the property itself. A phone estimate starts it, a contractor's exact bid finishes it.",
        ],
        "gettingStarted": [
            "Before anything else, a Copperas Cove-area buyer can review all three financing paths — in-house, public, private — to get a sense of which one probably fits before talking to anyone.",
            "Once you've got a sense of the financing side, we move into your property and floor plan next.",
        ],
        "localProof": "We've laid out every financing option upfront for Coryell County buyers near Copperas Cove before their first real conversation with us.",
        "faq": [
            {
                "q": "What financing options are available for a Copperas Cove-area buyer?",
                "a": "In-house financing, public lending programs, and private lenders — all reviewed upfront so you know your options before committing to anything.",
            },
            {
                "q": "Do I need to already own land in Coryell County?",
                "a": "No — some Coryell County buyers already have their site, some are still shopping, and some are working through property that's stayed in the family.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "Section count is the real difference — one for a single wide, two joined on-site for a double wide, which is also where the extra square footage comes from.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "killeen": {
        "intro": "With Fort Cavazos right next door, a lot of Killeen-area buyers are relocating on military orders, and Texas Homes Direct works with that reality directly — financing and timelines that account for a move you didn't fully control the timing of.",
        "buying": [
            "A military family relocating to Bell County often has less lead time than a typical buyer, and we adjust the process to fit that reality rather than expecting you to fit ours.",
            "On orders or settled locally, a HUD-code manufactured home gets a Bell County family into a new home for noticeably less than comparable site-built construction.",
        ],
        "pricingExplainer": [
            "A Killeen-area quote is fixed the moment you see it, PCS orders or not — everything itemized above is already built into the number, with nothing added mid-move.",
            "Utility hookups are the one number we won't guess at — a phone estimate opens the conversation, and the exact figure comes only after a contractor has actually seen your property.",
        ],
        "gettingStarted": [
            "If you're relocating to Killeen on military orders, tell us that upfront — it changes what questions we ask first and how we prioritize the process.",
            "From there, we move into your property situation and financing, working around whatever timeline your move actually gives you.",
        ],
        "localProof": "We've worked with military families relocating to Bell County on orders, adjusting our process to fit a timeline they didn't set themselves.",
        "faq": [
            {
                "q": "Do you work with military families relocating to Killeen?",
                "a": "Yes — we regularly work with buyers relocating to Fort Cavazos and adjust the process around a military move's realities.",
            },
            {
                "q": "Do I need to already own land in Bell County?",
                "a": "Not a requirement. Some Bell County buyers already have a site lined up, some are still searching, and some are working through family land.",
            },
            {
                "q": "Do you deliver throughout Bell County?",
                "a": "We cover all of Bell County — send your address and we'll walk through what that means for your specific site.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "harker-heights": {
        "intro": "Harker Heights sits close enough to Killeen, Belton, and Temple that buyers sometimes aren't sure which of us actually covers their address. Short answer: all of them, including Harker Heights, get the same team and the same process.",
        "buying": [
            "Whichever Bell County city you're closest to, the pricing and process near Harker Heights don't change depending on which neighbor you're technically nearer to.",
            "A manufactured home built to current HUD code still costs meaningfully less than comparable site-built construction, wherever in the Bell County cluster it's headed.",
        ],
        "pricingExplainer": [
            "A Harker Heights-area quote is fixed the moment you see it, regardless of which nearby city's page brought you here — everything itemized above is already included.",
            "Utility hookups don't get the same fixed treatment, since Bell County land differs enough lot to lot that a phone estimate is just a starting point until a contractor sees it in person.",
        ],
        "gettingStarted": [
            "For a Harker Heights-area buyer, it genuinely doesn't matter whether your address technically reads Harker Heights, Killeen, or Belton — the first real question is your property, not your zip code.",
            "From there, floor plan and financing move forward the same way they would from any of our Bell County pages, since it's one team covering all of them.",
        ],
        "localProof": "We've delivered to Harker Heights addresses, Killeen addresses, and Belton addresses without missing a beat between them — it's the same coverage area to us.",
        "faq": [
            {
                "q": "Does it matter if I'm technically in Killeen or Belton instead of Harker Heights?",
                "a": "Not for us — we treat the whole Bell County cluster as one coverage area, so the city name on your address doesn't change the price or the process.",
            },
            {
                "q": "Do I need to already own land in Bell County?",
                "a": "It doesn't have to be. Bell County buyers show up with land already in hand, a lot they're still deciding on, or family property in progress.",
            },
            {
                "q": "Do you deliver throughout Bell County?",
                "a": "We cover all of Bell County — give us your address and we'll confirm what that looks like for your specific property.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "belton": {
        "intro": "Belton Lake draws a specific kind of buyer to the area — people looking for acreage near the water for a second property or a full-time home, not just an in-town lot. Texas Homes Direct works with exactly that kind of Bell County property.",
        "buying": [
            "Lake-adjacent acreage near Belton often has different access and utility conditions than an in-town lot, and we scope each site individually rather than assuming a standard package.",
            "Waterfront acreage or an in-town lot, a HUD-code manufactured home still runs meaningfully under the cost of comparable site-built construction near Belton.",
        ],
        "pricingExplainer": [
            "Lake-adjacent property or an in-town lot, the out-the-door price for a Belton-area buyer holds either way — everything itemized above is already built into your quote.",
            "Utility costs are the one variable, since lake-adjacent land can have its own access and terrain conditions. A phone estimate starts it, an exact contractor bid finishes it.",
        ],
        "gettingStarted": [
            "For a Belton-area buyer looking at lake-adjacent property, the first real question is what access the site actually has — road, utilities, distance from the water.",
            "Once we understand the property, floor plan and financing follow, sized to what actually fits a recreational or full-time setup.",
        ],
        "localProof": "We've set up homes on acreage near Belton Lake for buyers using the property as a full-time home and as a weekend retreat alike.",
        "faq": [
            {
                "q": "Can you set up a home on acreage near Belton Lake?",
                "a": "Yes — we scope lake-adjacent properties the same careful way we'd scope any site, accounting for access and terrain before finalizing a plan.",
            },
            {
                "q": "Do I need to already own land in Bell County?",
                "a": "No. A lot already secured, one you're still deciding on, or family property that's still being worked out — any of those gets you started with us.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide arrives as one section and keeps costs down; a double wide arrives as two sections joined on your property for more overall space.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "temple": {
        "intro": "Temple's medical center draws staff relocating from all over, and a fair number of them end up comparing a manufactured home against a new subdivision house before deciding — Texas Homes Direct lays out that comparison honestly.",
        "buying": [
            "A manufactured home built to current HUD code costs meaningfully less than a comparable new subdivision house near Temple, without stepping down in construction quality.",
            "Relocating for work doesn't have to mean rushing the decision — a Temple-area buyer gets the same unhurried comparison whether they're moving in a month or deciding a year out.",
        ],
        "pricingExplainer": [
            "Relocating for the medical center or not, the out-the-door price for a Temple-area buyer is locked in the moment you see your quote — everything itemized above is already included.",
            "The exception is utilities, tied entirely to your specific Bell County property — a phone estimate is the starting point, and the contractor's on-site bid is the number that actually counts.",
        ],
        "gettingStarted": [
            "For a Temple-area buyer weighing a manufactured home against a new subdivision house, the real comparison starts with actual numbers, not assumptions about either option.",
            "Once the cost comparison makes sense, we move into your property situation and financing, whatever your timeline for relocating looks like.",
        ],
        "localProof": "We've walked more than a few Bell County families relocating for work through a real, honest comparison against new subdivision construction near Temple.",
        "faq": [
            {
                "q": "How does a manufactured home actually compare to a new subdivision house near Temple?",
                "a": "Typically for meaningfully less, without a drop in HUD-code construction quality — run our free mortgage analysis tool to see real numbers for your budget.",
            },
            {
                "q": "Do I need to already own land in Bell County?",
                "a": "No. Whether your Bell County land is already secured, still being purchased, or tied up in family property, we'll work with where things stand.",
            },
            {
                "q": "Do you deliver throughout Bell County?",
                "a": "Yes. Share your address and we'll lay out what delivery and setup actually look like at your location.",
            },
        ],
        "lastModified": "2026-09-23",
    },
    "hamilton": {
        "intro": "Hamilton County is one of the smaller counties Texas Homes Direct serves, and that doesn't change how much attention a Hamilton-area buyer gets — the same process, the same care, regardless of county size.",
        "buying": [
            "A smaller county doesn't mean fewer options for a Hamilton-area buyer — the same full range of floor plans and financing paths apply here as anywhere else we deliver.",
            "Small county or not, a HUD-code manufactured home still costs a Hamilton County family noticeably less than comparable site-built construction.",
        ],
        "pricingExplainer": [
            "The out-the-door price for a Hamilton-area buyer works exactly the same way as anywhere else we serve — everything itemized above is already built in.",
            "The one thing we won't lock in over the phone is the utility number, since Hamilton County land is too inconsistent for that to be honest — a contractor's visit sets the real figure.",
        ],
        "gettingStarted": [
            "For a Hamilton-area buyer, the first real conversation covers the same ground it would anywhere else we serve — your property, your floor plan preferences, and your financing situation.",
            "From there, the process moves the same way it would in a larger county, just with fewer other buyers competing for the same delivery slots.",
        ],
        "localProof": "We've worked with Hamilton County families the same way we'd work with a buyer in a larger, more heavily served county.",
        "faq": [
            {
                "q": "Do you actually serve all of Hamilton County, or just the town itself?",
                "a": "Every part of Hamilton County — share your address and we'll walk through delivery and setup for your specific site.",
            },
            {
                "q": "Do I need to already own land in Hamilton County?",
                "a": "It's not necessary yet. Hamilton County buyers show up at every stage — land already in hand, a lot still being chosen, or family property in the works.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide is a single section that costs less to start; a double wide is two sections joined on-site, which adds meaningfully more living space.",
            },
        ],
        "lastModified": "2026-09-23",
    },

    "austin": {
        "intro": "Austin-area families looking at manufactured homes usually want the same thing: a real price, a clear financing picture, and someone who won't disappear once the paperwork starts. Texas Homes Direct works with buyers throughout Travis County on new single wide and double wide homes, with financing built around what you can actually afford.",
        "buying": [
            "A manufactured home costs meaningfully less than a comparable site-built house in the Austin area, without giving up HUD-code construction quality. Texas Homes Direct prices every home clearly upfront, so you're comparing real numbers instead of guessing.",
            "Travis County has room for a manufactured home whether you're placing it on family land, your own land, or a lot you're purchasing separately. We'll walk you through what your specific site needs before you commit to anything.",
        ],
        "pricingExplainer": [
            "Every Austin-area quote already reflects what it actually costs to build here — once you see the number, it's the number, itemized above and locked in.",
            "Travis County utility costs are the one thing we won't guess at over the phone. A starting estimate gets the conversation going, and a contractor's on-site visit sets the figure that actually counts.",
        ],
        "gettingStarted": [
            "Most Austin-area buyers open with a monthly-cost question, and that's genuinely where the first conversation goes — real numbers before floor plans, before setup, before anything else.",
            "Once you've seen a figure that makes sense, we get into your Travis County site: family land, land you already own, or a lot you're still buying all lead to the same walkthrough of what that specific property will need.",
        ],
        "localProof": "We've worked with Travis County families on both single wide and double wide homes, matching floor plans to lot size and budget rather than pushing one option.",
        "faq": [
{"q": "How much does a manufactured home cost in Austin?",
             "a": "It depends on the floor plan, size, and features you choose, but manufactured homes consistently run below the cost of a comparable site-built home. Run our free mortgage analysis to see real numbers for your budget."},
{"q": "Do I need to already own land in Travis County?",
             "a": "Not at all. Some Travis County buyers already have land, others are mid-purchase on a lot, and some are working through family property — we adapt to wherever you're starting from."},
{"q": "What's the difference between a single wide and a double wide?",
             "a": "A single wide is one continuous section and typically costs less; a double wide is built from two sections joined on-site and gives you more square footage. Which one makes sense depends on your lot and your family's needs."},
            {
                "q": "Does Austin's tech-driven housing market change how manufactured homes are priced?",
                "a": "Not directly — our pricing is based on the home and your specific Travis County site, not on what's happening in the broader Austin real estate market.",
            },
],
    },
    "seguin": {
        "intro": "A Guadalupe County buyer working with Texas Homes Direct deals with the same person from the first phone call through delivery — not a rotating cast of sales reps and a separate service department for setup.",
        "buying": [
            "That continuity matters most when something needs clarifying halfway through: a Seguin-area buyer isn't stuck explaining their situation over again to someone new every time they call.",
            "Guadalupe County land conditions differ enough — some lots already have utilities, some don't — that we walk each site individually rather than quoting a standard package sight unseen.",
        ],
        "gettingStarted": [
            "Two things come up on a first call near Seguin: where the home is actually going, and who you'll be talking to about it going forward.",
            "Guadalupe County land shows up in every condition — utilities ready, or nothing run yet — and whichever describes yours, the same person stays on your purchase through delivery and setup, not a different department at each stage.",
        ],
        "pricingExplainer": [
            "One quote, one number, no revisions — a Seguin-area buyer sees the complete out-the-door price before deciding anything, itemized above.",
            "Utility hookup costs are the exception, simply because no two Guadalupe County properties sit the same way. We give a phone estimate to start and follow it with a contractor's exact bid once they've walked the land.",
        ],
        "localProof": "Guadalupe County families we've worked with have stayed in touch with the same point of contact from their first call through the day their home was set.",
        "faq": [
{"q": "Will I be working with different people at different stages of the process?",
             "a": "No — one point of contact handles your Seguin-area purchase from the first conversation through setup, rather than passing you between departments."},
{"q": "Do I need to already own land in Guadalupe County?",
             "a": "No. Some buyers already have a site, some are still shopping for one, and some are working with family property — we work with any of those starting points."},
{"q": "What's the difference between a single wide and a double wide?",
             "a": "A single wide is one section and costs less upfront; a double wide is built from two joined sections and gives you meaningfully more space."},
],
        "lastModified": "2026-09-18",
    },
    "waco": {
        "intro": "If you're pricing out a manufactured home in the Waco area, the numbers usually make more sense than you'd expect compared to a traditional build. Texas Homes Direct works with McLennan County families on single wide and double wide homes with financing that's explained upfront, not buried in fine print.",
        "buying": [
            "McLennan County permitting and setup requirements aren't identical to every other county in Texas, and that's fine — it's our job to sort out, not yours. We coordinate the paperwork so you're not stuck chasing offices on your own.",
            "A double wide gives a Waco-area family more bedrooms and living space than a single wide, built from two sections joined on-site. A single wide costs less and sets up more simply. We'll help you weigh which one actually fits your household.",
        ],
        "pricingExplainer": [
            "A McLennan County quote from us doesn't creep upward as the paperwork moves along — everything itemized above is locked in from the first number you see.",
            "Because utility costs ride on the property, not a formula, we start with a phone estimate and let a contractor's actual visit to your Waco-area land set the real number.",
        ],
        "gettingStarted": [
            "Two details shape everything else for a Waco-area buyer: whether land is already lined up, and roughly how many bedrooms the household actually needs.",
            "McLennan County's permitting process isn't something you're expected to know going in — we handle that coordination once those two answers are in hand, then walk through single wide versus double wide against your actual lot.",
        ],
        "localProof": "We've delivered manufactured homes across McLennan County to families choosing both single wide and double wide floor plans, depending on their lot and budget.",
        "faq": [
{"q": "What size home fits my property?",
             "a": "That comes down to your lot's access, setback requirements, and layout more than raw acreage. We'll go over your specific site before recommending a single wide or double wide."},
{"q": "Do I need a permit for a manufactured home in McLennan County?",
             "a": "Permitting requirements vary by county and by property, so it's worth confirming with McLennan County directly. We can help point you to the right office."},
            {
                "q": "Is a manufactured home a realistic option somewhere as fast-growing as Waco?",
                "a": "Yes — growth in the area doesn't change the math. A HUD-code manufactured home still costs meaningfully less than comparable site-built construction near Waco.",
            },
            {
                "q": "What happens once I've picked a home?",
                "a": "From there, our team coordinates the build, delivery to your site, and the full setup, keeping you posted as things move along.",
            },
],
    },
    "tyler": {
        "intro": "Tyler-area buyers looking at manufactured homes often start with the same question: what's this actually going to cost each month? Texas Homes Direct gives Smith County families a real answer early, along with financing options that don't require guesswork.",
        "buying": [
            "Smith County families looking at the numbers usually find a manufactured home comes in well under what a comparable site-built house would cost, while still meeting the same HUD construction standards.",
            "Some buyers already have utilities in place on their land; others are starting from scratch. Texas Homes Direct scopes the actual setup work your property needs rather than quoting a generic package that may not apply.",
        ],
        "pricingExplainer": [
            "The real monthly number a Tyler-area buyer gets upfront stays real all the way through closing — everything itemized above is already in it, nothing tacked on later.",
            "Smith County soil and access vary enough lot to lot that a phone estimate alone would be a guess dressed up as a quote. A contractor's visit turns it into a real number.",
        ],
        "gettingStarted": [
            "A real monthly number comes first for most Tyler-area buyers, ahead of floor plans or setup details — there's no reason to guess at affordability before anything else gets discussed.",
            "With that number in hand, the next thing worth knowing is where the home is headed. Smith County buyers show up with land settled, land in progress, or nothing chosen yet, and each starting point moves forward the same way.",
        ],
        "localProof": "We've set up both single wide and double wide homes for Smith County families, sized to fit each buyer's lot and budget rather than a one-size-fits-all approach.",
        "faq": [
{"q": "Do I need to already own land?",
             "a": "No. Whether it's family land, land you already own, or a lot you're purchasing separately, Texas Homes Direct can work with your situation."},
{"q": "Can I see photos of available homes before deciding?",
             "a": "Yes — reach out and we'll go over photos and floor plans for homes that fit what you're looking for, so you know what you're getting before you commit."},
{"q": "Do you sell used homes, or only new ones?",
             "a": "Our focus is new, HUD-certified manufactured homes. Contact us for current availability."},
            {
                "q": "Does Tyler's reputation as a gardening and nursery hub affect setting up a home on a landscaped lot?",
                "a": "Not for setup itself — an established yard doesn't change the process, though we'll work with you on protecting mature landscaping during delivery if that's a concern.",
            },
],
    },
    "el-paso": {
        "intro": "El Paso families exploring manufactured homes deal with a market that works a little differently than the rest of Texas, but the basics of getting a fair price and honest financing don't change. Texas Homes Direct works directly with El Paso County buyers on both single wide and double wide homes.",
        "buying": [
            "Texas Homes Direct finances directly, and also works with a mix of public and private lenders — so buyers with less-than-perfect credit still typically have a path forward. The mortgage analysis tool won't pull your credit, so it's a low-risk way to see real numbers.",
            "Some El Paso County buyers already know exactly where their home will go — family land, land they already own, or a lot they're purchasing separately — and some are still deciding. Either way, we'll go over what the specific site requires.",
        ],
        "pricingExplainer": [
            "An El Paso County quote works the same whether your credit history is spotless or not — everything itemized above is locked into the number the moment you see it.",
            "Utility costs are the one figure we won't pretend to know from a phone call, since El Paso County terrain varies enough to matter. A contractor's on-site visit sets the real bid.",
        ],
        "gettingStarted": [
            "Financing questions usually come first in El Paso, since the mortgage analysis tool gives real numbers without a credit pull — a low-risk way to see where you actually stand before committing to anything.",
            "From there it's a matter of the site: some El Paso County buyers know exactly where the home is going, others are still deciding, and either way we go over what that particular property needs before you sign on to a floor plan.",
        ],
        "localProof": "We've worked with El Paso County families across a range of lot sizes and site conditions, matching each one to a floor plan that actually fits.",
        "faq": [
{"q": "What size home actually fits my lot?",
             "a": "That's mostly about lot access, setback rules, and layout — not just total acreage. We'll walk through your site with you before recommending a floor plan."},
{"q": "Do you deliver throughout El Paso County?",
             "a": "Yes — delivery throughout El Paso County is something we handle regularly. Give us your address and we can walk through what it looks like for your particular site."},
{"q": "Can I get financing with less-than-perfect credit?",
             "a": "Usually, yes. Between in-house financing and outside public and private lending partners, most buyers find something workable even without perfect credit."},
            {
                "q": "Is the process different because El Paso is a border city?",
                "a": "No — the home, the pricing, and the process are the same as anywhere else we serve in Texas. El Paso County's own permitting is the only local variable, and we manage that directly.",
            },
],
    },
    "san-antonio": {
        "intro": "Buying a manufactured home in San Antonio shouldn't feel like a negotiation game. Texas Homes Direct gives Bexar County buyers a real price upfront and financing that's explained plainly, whether you're looking at a single wide or a double wide.",
        "buying": [
            "A manufactured home built to current HUD code gets a Bexar County family into a new home for meaningfully less than comparable site-built construction, without sacrificing quality standards.",
            "Double wide homes arrive in two sections that are joined and finished on-site — a bigger undertaking than a single wide, but one our crews manage as part of your purchase. Either option is financed the same way.",
        ],
        "pricingExplainer": [
            "There's no negotiating a Bexar County quote upward after the fact — everything itemized above is already built into the number you saw on day one.",
            "What a contractor actually finds on your Bexar County property, not a phone estimate, is what determines the final utility bid — we give you the estimate first, then confirm it in person.",
        ],
        "gettingStarted": [
            "There's no back-and-forth to open a purchase near San Antonio — you get a real price on the home you're looking at first, and the rest of the conversation builds from that number.",
            "What follows is mostly about your Bexar County site: already owned, being purchased, or family property, plus whether a single wide or double wide actually fits the lot and the household moving into it.",
        ],
        "localProof": "We've worked with Bexar County families on a mix of single wide and double wide homes, sized around each buyer's lot and monthly budget.",
        "faq": [
{"q": "Do you deliver to all of Bexar County?",
             "a": "Yes, we deliver throughout Bexar County and the surrounding area. Share your address and we'll confirm the details specific to your property."},
            {
                "q": "Do you work with military families relocating to San Antonio's bases?",
                "a": "Yes — San Antonio has several military installations, and we regularly work with families relocating to the area on orders.",
            },
            {
                "q": "Do I need to already own land in Bexar County?",
                "a": "It's not a prerequisite. Bexar County buyers reach out with land already secured, a lot still being purchased, or family property still being sorted.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "A single wide keeps things simple with one section at a lower price point; a double wide adds a second section joined on-site for a bigger home.",
            },
],
    },
    "laredo": {
        "intro": "Webb County families looking at manufactured homes want two things upfront: an honest price and financing that makes sense for their budget. That's the whole approach at Texas Homes Direct — no runaround, no pressure, just real numbers for Laredo-area buyers.",
        "buying": [
            "Permitting and setup work differently from one Texas county to the next, and most buyers don't have the time to learn Webb County's specific process. Texas Homes Direct handles that coordination so you're not tracking down paperwork on your own.",
            "A single wide keeps your entry cost lower and your setup simpler; a double wide gives a growing Laredo family more bedrooms and square footage. Both are financed the same way, and we'll help you figure out which one fits.",
        ],
        "pricingExplainer": [
            "A Laredo-area quote holds the same way the rest of our pricing does — everything itemized above is already accounted for, border-city market or not.",
            "Webb County land conditions are inconsistent enough that we treat a phone estimate as a placeholder, not a promise — the contractor's on-site bid is the number that actually counts.",
        ],
        "gettingStarted": [
            "Price and land come up in that order for a Laredo-area buyer — the price shouldn't hinge on details about your property you haven't worked out yet, so we start with the number.",
            "Webb County permitting is ours to manage once you're ready to move, not something you need to arrive already understanding. After that it's sizing: single wide for a lower entry cost, double wide for a growing household.",
        ],
        "localProof": "Families across Webb County have worked with us on both single wide and double wide homes, matched to their lot size and monthly budget.",
        "faq": [
{"q": "Can I get approved with less-than-perfect credit?",
             "a": "Often, yes. Texas Homes Direct finances directly and also works with several outside lenders, which opens up options for buyers who wouldn't qualify through a single bank."},
{"q": "Do I have to own land already?",
             "a": "No — some buyers already have land, some are buying a lot separately, and some are working with family property. Let us know where things stand and we'll go from there."},
{"q": "Do you deliver throughout Webb County?",
             "a": "Yes. Give us your address and we'll walk through exactly what delivery and setup involve for your property."},
            {
                "q": "Does Laredo's role as a major trade hub affect delivery scheduling?",
                "a": "Not in a way that changes pricing or process — we scope delivery to your specific Webb County property the same way we would anywhere else.",
            },
],
    },
    "mcallen": {
        "intro": "Manufactured homes give a lot of Rio Grande Valley families a realistic path to ownership that a traditional build often can't match on price. Texas Homes Direct works with Hidalgo County buyers directly, with financing explained in plain terms from the start.",
        "buying": [
            "We quote setup as part of your home's price, not as a separate bill after delivery. Utility connections, the pad, underpinning, and skirting are all included and financed together for McAllen-area buyers.",
            "Whether you're working with land you already own in Hidalgo County, a lot you're buying separately, or family property, Texas Homes Direct can walk you through what your specific site will need.",
        ],
        "pricingExplainer": [
            "Beyond setup, the rest of a McAllen-area quote is just as fixed — tax, title, license, delivery, and appliances are all itemized above and locked in with the number you're given.",
            "Utility hookups are the one line item that can't be priced from a phone call alone, since Hidalgo County land varies too much. A contractor's visit is what turns the estimate into a real bid.",
        ],
        "gettingStarted": [
            "The first thing we walk through with a McAllen-area buyer is where the home is actually headed — owned land in Hidalgo County, family property, or a lot still being purchased all move forward the same way.",
            "From there it's a straightforward next step: setup is already part of the price you're quoted, not a bill that shows up after delivery, so there's nothing extra to plan around once your site is scoped.",
        ],
        "localProof": "We've worked with Hidalgo County families on single wide and double wide homes alike, sizing each one to the buyer's lot and budget.",
        "faq": [
{"q": "What size home makes sense for my property?",
             "a": "It depends more on your lot's access and layout than on total acreage. We'll go over your site before recommending a single wide or double wide."},
{"q": "Do you sell only new homes, or used ones too?",
             "a": "We primarily carry new, HUD-certified manufactured homes. Reach out for current availability."},
            {
                "q": "Do I need to already own land in Hidalgo County?",
                "a": "No. Some Rio Grande Valley buyers already have land, some are purchasing a lot separately, and some are working through family property.",
            },
            {
                "q": "Do you deliver throughout the Rio Grande Valley, or just McAllen itself?",
                "a": "Yes, the Rio Grande Valley broadly. Give us your address and we'll walk through what that means for delivery and setup at your property.",
            },
],
    },
    "victoria": {
        "intro": "Victoria County has plenty of families deciding between a manufactured home and a traditional build, and cost is usually the deciding factor. Texas Homes Direct lays out real numbers early so you're not guessing at what a home in Victoria will actually run.",
        "buying": [
            "A manufactured home built to current HUD code costs noticeably less than comparable site-built construction, without giving up on quality. Texas Homes Direct prices every home clearly so you can compare it honestly against other options.",
            "Some Victoria-area buyers already have a well, septic, and electric on their land; others are starting from raw ground. Either way, we scope the actual setup work your property needs rather than a one-size-fits-all package.",
        ],
        "pricingExplainer": [
            "Once a Victoria-area buyer has a number in hand, that's genuinely the number — everything itemized above is already built into what you were quoted, not added afterward.",
            "Utility costs are the exception to that fixed pricing, since Victoria County land conditions shift enough to matter. A phone estimate opens it, and a contractor's visit closes it.",
        ],
        "gettingStarted": [
            "Victoria County families typically start where the actual decision gets made: a direct, honest comparison against building a traditional house, laid out before anything else.",
            "Once those numbers hold up, the property itself is next — a well, septic, and electric already in place, or raw ground to start from. We scope the real work rather than guessing at it from a distance.",
        ],
        "localProof": "Victoria County families we've worked with have used a mix of family land, land they already owned, and newly purchased lots — there's no single required path.",
        "faq": [
{"q": "Do I need a permit for a manufactured home in Victoria County?",
             "a": "Requirements vary by county and by property, so it's worth checking with Victoria County directly before you buy. We can help point you toward the right office."},
{"q": "What happens once I've picked a home?",
             "a": "Our team takes care of coordinating the build, getting the home to your site, and completing the setup, keeping you in the loop the whole way."},
            {
                "q": "Why is Victoria sometimes called 'the Crossroads'?",
                "a": "It sits at the junction of several major highways connecting Houston, San Antonio, and the coast — which is also part of why our delivery coverage to the area is straightforward.",
            },
            {
                "q": "What's the difference between a single wide and a double wide?",
                "a": "Section count is the real distinction: one for a single wide at a lower price, two joined together on-site for a double wide with noticeably more room.",
            },
],
    },
    "alice": {
        "intro": "Alice-area families weighing a manufactured home against a traditional build usually start with one question: what's the real monthly cost? Texas Homes Direct answers that directly for Jim Wells County buyers, without a sales pitch attached.",
        "buying": [
            "There's more than one way to approach the land question in Jim Wells County — family property, land already owned, or a lot purchased separately all work with Texas Homes Direct. What matters is knowing what the specific site needs, which we'll cover once we know where things stand.",
            "A single wide is a practical starting point for a smaller lot or tighter budget; a double wide suits a family that needs more room. Financing and setup work the same either way — it comes down to what fits your situation.",
        ],
        "pricingExplainer": [
            "A Jim Wells County quote from us is complete on arrival — everything itemized above is already folded into the number, whether you're comparing it against other dealers or not.",
            "Utility hookups are priced differently because they have to be — South Texas land varies enough that a phone estimate is a starting point, not a final figure. A contractor's visit sets the real one.",
        ],
        "gettingStarted": [
            "The property comes up first for most Alice-area buyers, since it shapes everything after — family land, land already owned, or a lot being purchased separately all work the same way with us.",
            "With Jim Wells County land situated, single wide versus double wide is the next real decision, and that mostly comes down to lot size and what your household actually needs, which we'll go through together.",
        ],
        "localProof": "We've worked with Jim Wells County buyers across a range of budgets, from single-section starter homes to larger double wide floor plans.",
        "faq": [
{"q": "Do I need to already have land lined up?",
             "a": "Not at all. Some buyers already have land, some are purchasing a lot on their own, and some are working with family property — we'll sort out the details once we know your starting point."},
{"q": "Can I see photos before deciding on a home?",
             "a": "Yes. Contact us and we'll go over photos and floor plans for options that match your budget."},
{"q": "Do you deliver throughout Jim Wells County?",
             "a": "Yes, Jim Wells County is part of our regular delivery area. Reach out with your address and we'll go over the specifics for your property."},
            {
                "q": "Does Alice's oil and ranching history affect available lot sizes?",
                "a": "Property sizes vary widely across Jim Wells County regardless of history — we scope your specific site rather than assuming a standard size.",
            },
],
    },
    "pleasanton": {
        "intro": "You don't have to commit to anything to see what's available near Pleasanton. Texas Homes Direct will send real photos and floor plans for any model you're curious about, no pressure to decide on the spot.",
        "buying": [
            "Browsing at your own pace matters more with a purchase this size. An Atascosa County buyer can compare floor plans over a few days rather than a single conversation.",
            "For an Atascosa County family, going the HUD-code manufactured route instead of site-built construction usually means a noticeably smaller number at closing.",
        ],
        "gettingStarted": [
            "Nothing formal is required to start looking near Pleasanton — say what catches your eye and we'll send real photos and floor plans to look over on your own schedule.",
            "Whenever you're ready to talk specifics, Atascosa County land comes up next: a lot already picked, family property, or nothing settled yet are all fine places to be at that point.",
        ],
        "pricingExplainer": [
            "Once you've picked a floor plan, the number Texas Homes Direct quotes a Pleasanton-area buyer is complete — everything itemized above is already in it.",
            "We won't pretend to know your exact utility cost from a phone call \u2014 Atascosa County lots vary too much for that. What we can do is give a starting estimate right away, then send a contractor out to turn that into a firm bid follows from a contractor who's actually walked the land.",
        ],
        "localProof": "We've sent photos and floor plans to Atascosa County buyers who were still deciding, with no expectation they'd commit on the spot.",
        "faq": [
{"q": "Can I see photos of homes before talking to anyone?",
             "a": "Reach out and we'll send over images and floor plans — there's no obligation attached to asking."},
{"q": "Do I need a permit for a manufactured home in Atascosa County?",
             "a": "That's property-specific, not something we can answer with a blanket county rule \u2014 Atascosa County's office is the right place to confirm what applies to your lot."},
{"q": "What happens once I've picked a home?",
             "a": "From there, it's on us \u2014 lining up the build schedule, getting the home moving toward your site, and seeing the setup through to the end."},
],
        "lastModified": "2026-09-18",
    },
    "amarillo": {
        "intro": "A manufactured home is one of the more realistic paths to ownership for Amarillo-area families, especially compared to the cost of building from scratch. Texas Homes Direct works directly with Potter County buyers on financing that's explained clearly from day one.",
        "buying": [
            "Some Potter County buyers already have land ready to go; others are still working that part out. Texas Homes Direct works with buyers at either stage and is upfront about what each path involves.",
            "We finance directly, and we also work with outside public and private lenders — so most Amarillo-area buyers find a workable path regardless of their credit situation.",
        ],
        "pricingExplainer": [
            "An Amarillo-area quote is fixed the moment we give it to you — everything itemized above is already part of that number, Panhandle wind and all.",
            "Utility costs are the one line we won't quote sight-unseen, since Potter County land varies enough lot to lot. A phone estimate starts the conversation; a contractor's visit finishes it.",
        ],
        "gettingStarted": [
            "Financing tends to open the conversation near Amarillo, since it's what determines whether ownership is realistic in the first place — between in-house terms and outside lenders, most Potter County buyers find a path.",
            "After that, the property: some buyers already have a site ready to go, others are still working that out, and we're straightforward with either group about what their specific stage actually involves.",
        ],
        "localProof": "We've delivered manufactured homes to Potter County families choosing single wide and double wide floor plans based on lot size and household needs.",
        "faq": [
{"q": "How much does a manufactured home cost in Amarillo?",
             "a": "It depends on the floor plan and features, but manufactured homes are consistently more affordable than comparable site-built construction. The free mortgage analysis tool will give you a number specific to your budget."},
{"q": "Do you sell used homes, or only new inventory?",
             "a": "Our focus is new, HUD-certified manufactured homes. Reach out for what's currently available."},
            {
                "q": "Does Panhandle weather affect setup or delivery near Amarillo?",
                "a": "We plan around it as needed, but it doesn't change your price — everything itemized in your quote stays fixed regardless of conditions on delivery day.",
            },
            {
                "q": "Do I need to already own land in Potter County?",
                "a": "No — that's genuinely one of the first things we ask about, not a requirement to clear before reaching out. Wherever your land situation stands, we'll pick up from there.",
            },
],
    },
    "lubbock": {
        "intro": "Lubbock County families comparing a manufactured home to a traditional build usually find the numbers make the decision easier than expected. Texas Homes Direct gives straight answers on both cost and financing before you commit to anything.",
        "buying": [
            "Whether a home ends up on family land, land already owned, or a newly purchased lot, Lubbock County buyers get the same thing from Texas Homes Direct: a clear walkthrough of what that specific site will need.",
            "Permitting and setup requirements aren't identical everywhere in Texas, and most buyers have no reason to already know Lubbock County's process. That's what Texas Homes Direct handles, so you're not chasing down paperwork.",
        ],
        "pricingExplainer": [
            "Once you've seen a Lubbock County quote, that number is the number — everything itemized above is already accounted for, no revisions later.",
            "The one number we won't lock in over the phone is the utility bid, since Lubbock County land varies enough to matter. A contractor's on-site visit is what actually sets it.",
        ],
        "gettingStarted": [
            "Lubbock County buyers tend to start by putting real numbers next to a traditional build, which usually makes the decision easier than expected going in.",
            "Once that's settled, family land, land already owned, and a newly purchased lot all lead to the same walkthrough of what the property needs — and Lubbock County's permitting process is ours to manage, not yours to learn first.",
        ],
        "localProof": "We've set up manufactured homes across Lubbock County for families choosing both single wide and double wide floor plans.",
        "faq": [
{"q": "Do I need a permit for a manufactured home in Lubbock County?",
             "a": "Requirements vary by county and property, so it's worth checking directly with Lubbock County. We can help point you to the right office."},
{"q": "What happens after I choose a home?",
             "a": "We handle the build schedule, delivery, and setup from there, checking in with you at each step rather than going quiet until it's done."},
            {
                "q": "Is a manufactured home a good fit for South Plains agricultural land near Lubbock?",
                "a": "Often, yes — we scope agricultural and rural properties the same careful way we scope any site, accounting for what's already there before finalizing a plan.",
            },
            {
                "q": "Can I see photos of available homes before deciding?",
                "a": "Yes, gladly — say which floor plans interest you and we'll send real photos over before you're asked to decide on anything.",
            },
],
    },
    "corpus-christi": {
        "intro": "Corpus Christi-area families exploring manufactured homes want a price they can actually trust and financing that's explained plainly. That's the entire approach at Texas Homes Direct for Nueces County buyers — no games, no pressure.",
        "buying": [
            "For a lot of Nueces County families, the appeal starts with the price gap between a manufactured home and building from the ground up — often a significant difference, without stepping down in construction quality since every home meets current HUD code.",
            "You can review photos and floor plans for available homes before committing to anything. We'd rather you know exactly what you're choosing than decide based on a sales pitch.",
        ],
        "pricingExplainer": [
            "A Nueces County quote is complete the day you see it — everything itemized above is already built in, coastal property or not.",
            "Utility hookups are the exception, since land near the coast can vary as much as land further inland. A phone estimate opens the conversation, and a contractor's visit sets the real figure.",
        ],
        "gettingStarted": [
            "You can start near Corpus Christi just by asking to see photos and floor plans — no pressure to commit to anything before you've actually looked at what's out there.",
            "When you're ready to move past browsing, the cost comparison against a traditional build comes next, followed by the Nueces County land conversation — owned, purchased, or still being decided.",
        ],
        "localProof": "Nueces County buyers we've worked with have chosen everything from compact single-section homes to larger double wide layouts, depending on the lot and the budget.",
        "faq": [
{"q": "Do I need to already own land?",
             "a": "No — land ownership isn't a requirement to get started. Whether you're using family property, land you already hold, or a lot you plan to buy separately, Texas Homes Direct can work with it."},
{"q": "Can I get financing with less-than-perfect credit?",
             "a": "Usually, yes. Between financing directly and working with outside public and private lenders, most buyers find a workable path."},
{"q": "Do you deliver throughout Nueces County?",
             "a": "Yes. Once we have your address, we can tell you exactly what delivery and setup will involve for your particular lot."},
            {
                "q": "Does being on the coast change how a home near Corpus Christi is set up?",
                "a": "It can affect what a site needs — we assess your specific property, coastal or further inland, rather than applying one standard setup plan.",
            },
],
    },
    "dallas": {
        "intro": "DFW-area families pricing out a manufactured home often find it's a more realistic path to ownership than they assumed. Texas Homes Direct works directly with Dallas County buyers, with financing explained in plain terms from the first conversation.",
        "buying": [
            "Every home we sell is built to current HUD code and inspected at the factory before it ever ships — the same baseline standard no matter where in Texas it ends up, Dallas County included.",
            "Some Dallas-area buyers already have utilities in place; others are starting from raw land. Either way, Texas Homes Direct scopes the setup work your property actually needs instead of a generic package.",
        ],
        "pricingExplainer": [
            "A Dallas County quote doesn't move once it's in your hands — everything itemized above is already accounted for, whichever DFW suburb you're technically in.",
            "Utility costs are the one number that depends on the specific property rather than the general area, so we start with a phone estimate and finish with a contractor's exact on-site bid.",
        ],
        "gettingStarted": [
            "Whether this is actually realistic is usually the real first question for a DFW-area buyer, and the honest answer starts with the numbers rather than a pitch.",
            "After that comes the Dallas County property itself: utilities already run, or raw ground to start from. We scope the actual setup work the site needs before anything else gets decided.",
        ],
        "localProof": "We've delivered manufactured homes throughout Dallas County to families across a range of budgets and lot sizes.",
        "faq": [
{"q": "What size home fits my lot?",
             "a": "That comes down to lot access, setback rules, and layout more than raw square footage. We'll go over your site before recommending a floor plan."},
{"q": "Do I need a permit for a manufactured home in Dallas County?",
             "a": "Requirements vary by county and even by city within DFW, so it's worth checking for your specific address. We can help you figure out where to start."},
{"q": "Can I see homes before deciding?",
             "a": "Contact us and we can send over photos and floor plan details for whatever catches your eye — no need to decide on the spot."},
            {
                "q": "Does it matter which DFW suburb my property is actually in?",
                "a": "Not for pricing — the same process and the same out-the-door number apply across Dallas County and the surrounding DFW area.",
            },
],
    },
    "houston": {
        "intro": "Houston-area families looking into manufactured homes usually want the same two things: a real price and financing they can actually follow. Texas Homes Direct gives Harris County buyers both, without pressure to decide before you're ready.",
        "buying": [
            "A single wide can be a practical choice for a smaller lot or tighter budget, while a double wide suits a Houston-area family that needs more room. Financing and setup work the same either way.",
            "Some Harris County buyers already have a well, septic, and electric in place; others are starting from raw land. Texas Homes Direct scopes the setup work your property actually needs rather than a generic package.",
        ],
        "pricingExplainer": [
            "A Harris County quote holds steady from the day you see it — everything itemized above is already priced in, whichever part of the Houston area you're in.",
            "Utility hookups are the one line that can't be quoted from a phone call alone, since Harris County land varies enough to matter. A contractor's on-site visit sets the number that counts.",
        ],
        "gettingStarted": [
            "A real price and financing that actually makes sense come first for most Houston-area buyers, ahead of any conversation about a specific lot.",
            "Once those are clear, we turn to the Harris County property itself — what's already run to the site and what still needs to happen before a home can go on it — and price the actual work instead of a generic package.",
        ],
        "localProof": "Harris County families we've worked with span a wide range of lot sizes and budgets, choosing everything from compact single wides to larger double wide layouts.",
        "faq": [
{"q": "Do I need to already own land in Harris County?",
             "a": "Land ownership isn't a prerequisite here. Texas Homes Direct works with buyers who already have a site, buyers still shopping for one, and buyers planning to use family property."},
{"q": "What happens after I pick a home?",
             "a": "From there, we take over — coordinating the build, getting it delivered to your site, and finishing the full setup — and you'll hear from us along the way instead of being left to wonder."},
            {
                "q": "Is setup different for a property inside Houston versus further out in Harris County?",
                "a": "The process is the same either way — we scope your specific site rather than assuming a standard package based on how close you are to the city center.",
            },
            {
                "q": "Do you deliver throughout the greater Houston area?",
                "a": "We do — every part of the greater Houston area. Send your address and we'll spell out what delivery and setup actually involve at your location.",
            },
],
    },
    "san-saba": {
        "intro": "There's no reason to rush a decision this size. San Saba County buyers looking at a manufactured home get time to compare floor plans, ask questions, and see real financing numbers from Texas Homes Direct before committing to anything.",
        "buying": [
            "Single wide and double wide options both come standard with current HUD-code construction — the difference is mostly about square footage and where your budget lands. We'll walk through both with you.",
            "Placing a home on family property, land you've already purchased, or a lot you're buying separately are all workable paths in San Saba County. Texas Homes Direct scopes what your particular site calls for.",
        ],
        "gettingStarted": [
            "A San Saba County buyer's first conversation with us is unhurried on purpose — floor plans, financing numbers, and questions get real time before anything moves forward.",
            "Whenever you're ready, family property, a lot you've already purchased, and land you're still buying are all workable starting points, and we'll go from wherever you actually are.",
        ],
        "pricingExplainer": [
            "Ask ten different manufactured home dealers what's included in their price and you'll get ten different answers. At Texas Homes Direct, the number we quote for a San Saba-area home already accounts for everything above — it's not a starting point for negotiation.",
            "Utility costs are the one piece that can't be pinned down over the phone, because every San Saba County lot is different. We'll give a solid estimate first, then send our own contractor out to your property for an exact bid — one you see and approve before anything moves forward.",
        ],
        "localProof": "San Saba County has seen us deliver everything from compact starter homes to larger four-bedroom double wides, depending on what each family needed.",
        "faq": [
{"q": "Is bad credit a dealbreaker for financing?",
             "a": "Not usually. We finance in-house and also work alongside outside lenders, which tends to open up options that a single bank wouldn't offer."},
{"q": "Is owning land a prerequisite before I can buy?",
             "a": "No — plenty of our San Saba County buyers are still deciding on land when they first reach out. We can talk through your options either way."},
{"q": "How do single wide and double wide homes actually compare?",
             "a": "Single wides are narrower and typically cheaper to buy and set up; double wides are built in two joined sections and give you meaningfully more interior space. Your lot and your family size usually settle which one makes sense."},
],
        "lastModified": "2026-09-10",
    },
    "lampasas": {
        "intro": "Every dollar in a Texas Homes Direct quote for a Lampasas County buyer is itemized upfront — the home, the setup, the financing terms. Nothing shows up as a surprise once you've already committed.",
        "buying": [
            "Site work is one of the most misunderstood parts of buying a manufactured home. In Lampasas County, that means coordinating utility connections, the foundation pad, and permitting — work Texas Homes Direct manages so you don't have to learn it yourself.",
            "Down payment amounts shift depending on the lender and loan type, so there isn't one number that applies to every Lampasas-area buyer. We'll go over what actually applies to your situation.",
        ],
        "gettingStarted": [
            "A Lampasas County buyer's first call covers the real numbers before anything else — the home, the setup, and what financing actually looks like for your situation.",
            "Once you've seen those figures, the property comes next, and after that, down payment specifics — which shift by loan program, so we'll cover what actually applies to your situation rather than a number that doesn't.",
        ],
        "pricingExplainer": [
            "A lot of buyers assume a home price is just the beginning of the real cost. For Lampasas County buyers, it isn't — the number above already reflects the complete list, and that's the number you'll actually pay.",
            "No two properties near Lampasas sit the same way, which is exactly why we won't quote an exact utility number sight unseen. A phone estimate gets you in the ballpark, and our own contractor follows up on-site with a firm figure before you're asked to commit.",
        ],
        "localProof": "Buyers in Lampasas County have worked with us across a mix of financing paths — some through in-house terms, others through outside lenders.",
        "faq": [
{"q": "Is the site prep bundled into the sale price?",
             "a": "It is. Rather than treating utilities, the pad, and skirting as a separate project, we quote and finance them together with the home itself."},
{"q": "Can I get pre-approved without hurting my credit?",
             "a": "Yes — our mortgage analysis tool gives you real numbers without a hard credit pull, so you can see where you stand before deciding anything."},
{"q": "Does Lampasas County fall within your delivery area?",
             "a": "It does. Once we have your address, we'll map out exactly what delivery looks like for your property."},
{"q": "After I choose a floor plan, what's next?",
             "a": "We take the build and delivery logistics off your plate from there, checking in as your home moves through production and out to your site."},
],
        "lastModified": "2026-09-10",
    },
    "llano": {
        "intro": "Some Llano County families already have land that's been in the family for years; others are starting from a blank slate. Texas Homes Direct works with both, walking through real costs before any decision gets made.",
        "buying": [
            "The main tradeoff between a single wide and a double wide comes down to lot size and household needs — one keeps your upfront cost lower, the other gives a growing family more room to spread out.",
            "Every Texas county handles manufactured home permitting a little differently, and that includes Llano County. Rather than leaving you to figure out the paperwork, our team manages that piece directly.",
        ],
        "gettingStarted": [
            "Lot size is usually the first practical question for a Llano County buyer, since it settles single wide versus double wide before financing details even come up.",
            "From there, Llano County's own permitting process is something our team manages rather than something you're left to figure out — one less thing to research before you're ready to decide.",
        ],
        "pricingExplainer": [
            "Comparison shopping only works if the numbers mean the same thing. When Texas Homes Direct quotes a Llano County buyer, that number already includes everything listed above, so there's nothing hidden to compare against later.",
            "Soil, well depth, distance to power — all of it varies lot to lot around Llano, so a phone-only utility number would just be a guess dressed up as a fact. We start with an estimate, then have a contractor inspect the property and hand you a number you can actually rely on.",
        ],
        "localProof": "Homes we've delivered in Llano County have ranged from single-section layouts to larger four-bedroom double wides.",
        "faq": [
{"q": "What permitting steps apply in Llano County specifically?",
             "a": "That's worth confirming directly with Llano County, since requirements shift from one county to the next. We're glad to point you toward the right office to ask."},
{"q": "Do I need land squared away before reaching out?",
             "a": "Not at all — some buyers already have a site, others are still looking, and some are working with property that's been in the family. We meet you wherever you're starting."},
{"q": "Before I commit, can I look at photos of actual homes?",
             "a": "Sure — get in touch and we'll send over images and floor plans for whichever models interest you."},
],
        "lastModified": "2026-09-10",
    },
    "goldthwaite": {
        "intro": "Building a house from scratch in Mills County costs more than most families expect, which is part of why manufactured homes keep coming up in the conversation. Texas Homes Direct gives Goldthwaite-area buyers the real cost comparison, not a sales pitch.",
        "buying": [
            "New HUD-code construction doesn't mean a lower standard — it means the same modern building code applied at a lower price point than a comparable site-built home in Mills County.",
            "Whatever stage you're at with land — already own it, still shopping, or working through family property — Texas Homes Direct can map out what your specific site will require before you commit to a floor plan.",
        ],
        "gettingStarted": [
            "Most Goldthwaite-area buyers start by asking how this actually stacks up against building from scratch in Mills County, and the honest cost comparison is genuinely where we begin.",
            "After that, it's the property — already owned, still being shopped for, or family land in progress — and we map out what your specific site requires before any floor plan gets chosen.",
        ],
        "pricingExplainer": [
            "Some dealerships quote a base price and let the extras pile up afterward. Texas Homes Direct doesn't work that way for Goldthwaite-area buyers — the number above is the complete number, full stop.",
            "Utilities work differently than the rest of the price, because they genuinely can't be set from a phone call alone. We give Mills County buyers a solid phone estimate to start, then send a contractor to the actual property for an exact bid before anything is final.",
        ],
        "localProof": "Mills County buyers we've worked with have picked everything from a one-bedroom starter layout up to a spacious double wide.",
        "faq": [
{"q": "What's a realistic price range for a home in Goldthwaite?",
             "a": "It shifts based on floor plan and finish level, but manufactured homes consistently land below site-built pricing for comparable square footage. The mortgage analysis tool will give you a number tailored to your budget."},
{"q": "My credit isn't great — is financing still realistic?",
             "a": "Often, yes. Between our in-house financing and outside lending partners, there's usually a path forward even for buyers who wouldn't qualify through a single traditional bank."},
{"q": "Is your inventory limited to new homes?",
             "a": "Primarily, yes — our focus is new, HUD-certified manufactured homes. Reach out and we'll walk you through what's currently available."},
],
        "lastModified": "2026-09-10",
    },
    "brady": {
        "intro": "McCulloch County buyers aren't limited to one lending path with Texas Homes Direct. In-house financing, public loan programs, and private lenders are all on the table for a Brady-area purchase, which opens up more room for different credit situations.",
        "buying": [
            "Whether your land already has a well, septic, and electric in place or you're starting from bare ground, Texas Homes Direct scopes the actual work your site needs rather than quoting a one-size package.",
            "In-house financing is only one option — we also connect Brady-area buyers with a range of public and private lenders, which widens the path forward for buyers with varying credit profiles.",
        ],
        "gettingStarted": [
            "Financing is usually the first real conversation for a Brady-area buyer, since in-house terms, public programs, and private lenders are all genuinely on the table depending on your situation.",
            "Once that's sorted, we get into the property — a well, septic, and electric already in place, or bare ground to start from — and scope the real work from there.",
        ],
        "pricingExplainer": [
            "It's fair to be skeptical of a \"final\" price in this industry. For McCulloch County buyers, the number Texas Homes Direct quotes already has everything above folded in — there's no revised total waiting at closing.",
            "We won't tell a McCulloch County buyer we know their exact utility cost without ever seeing the land — that's not a real number, it's a guess. Instead, a phone estimate comes first, followed by an on-site contractor bid you review before it's locked in.",
        ],
        "localProof": "McCulloch County has seen us deliver both single wide and double wide homes, matched to each family's lot size and budget.",
        "faq": [
{"q": "How do I figure out what size home actually fits my lot?",
             "a": "It comes down to access for delivery and any setback requirements more than the total acreage you own. We'll walk your specific site with you before recommending anything."},
{"q": "Does McCulloch County fall inside your delivery range?",
             "a": "Yes — share your address and we'll spell out exactly what delivery and setup will look like for your property."},
{"q": "Once I've picked a home, what happens on your end?",
             "a": "We take over from there — coordinating the factory build, arranging delivery, and managing the on-site setup — and keep you posted at each stage."},
{"q": "What's actually covered in your quoted home price?",
             "a": "The list above is exhaustive, not a starting point. What's quoted is what's owed."},
],
        "lastModified": "2026-09-10",
    },
    "mason": {
        "intro": "Every home Texas Homes Direct sells passes factory inspection before it ever leaves the plant, built to the same HUD standard whether it's headed to Mason County or anywhere else in Texas. That consistency is part of what buyers are paying for.",
        "buying": [
            "A smaller lot or a tighter budget often points a Mason-area buyer toward a single wide; a larger household usually leans toward a double wide for the extra bedrooms. Financing works the same regardless of which one you choose.",
            "We're not limited to a single lending option — in-house financing, public loan programs, and private lenders are all on the table, which gives Mason County buyers more than one path to approval.",
        ],
        "gettingStarted": [
            "Lot size and household size are usually the first practical questions for a Mason-area buyer, since they settle single wide versus double wide before anything else gets discussed.",
            "From there, financing — in-house, public, or private — gives Mason County buyers more than one path to approval, so credit history alone doesn't have to be the deciding factor.",
        ],
        "pricingExplainer": [
            "You shouldn't have to do mental math to figure out your real cost. The price quoted to a Mason County buyer already includes everything listed above, calculated once and not revisited later.",
            "What we won't do is invent a utility figure before anyone's seen your land. A phone estimate gets the conversation started, and a contractor visits the property afterward to produce an exact bid, confirmed before you commit to it.",
        ],
        "localProof": "We've matched Mason County families to floor plans based on their actual lot and household size, not a fixed package.",
        "faq": [
{"q": "Do I need land in hand before I start this process?",
             "a": "No. We work with buyers who already own land, buyers still shopping for a lot, and buyers using property that's been in the family."},
{"q": "Can setup expenses be wrapped into my monthly payment?",
             "a": "Yes — instead of a separate bill for the pad and utilities, that cost gets built directly into your financing."},
{"q": "Do you serve all of Mason County, or just the town itself?",
             "a": "All of Mason County. Send your address our way and we'll confirm what delivery looks like for your specific location."},
],
        "lastModified": "2026-09-10",
    },
    "junction": {
        "intro": "Ask what's actually included in a manufactured home purchase near Junction, and the answer from Texas Homes Direct is everything: the base pad, utility hookups, underpinning, and skirting — not just the home itself showing up on a truck.",
        "buying": [
            "A manufactured home meeting current HUD code typically runs well under the cost of an equivalent site-built house near Junction — construction quality doesn't drop, but the price does.",
            "Kimble County land comes in all shapes — family property, a lot already purchased, or one you're still shopping for. Texas Homes Direct adjusts the setup plan to whichever applies to you.",
        ],
        "gettingStarted": [
            "A Junction-area buyer's first real question is usually about the land itself — Kimble County properties take all shapes, and we adjust the plan to whichever applies, family property, a lot already bought, or one still being shopped for.",
            "Once that's settled, financing and setup are laid out together, itemized rather than estimated, so there's a real number to plan around before you commit to a floor plan.",
        ],
        "pricingExplainer": [
            "There's a reason \"out-the-door\" matters to a Kimble County buyer: the price above is the complete price, not a partial number that grows as you go.",
            "Utility pricing has to wait for an actual look at the land, since no two Junction-area properties are the same. We start with a phone estimate, then send a contractor out to produce an exact figure you review before anything is finalized.",
        ],
        "localProof": "Kimble County buyers we've worked with span a wide range of budgets and lot sizes, from modest single-section homes to larger family layouts.",
        "faq": [
{"q": "What's a sensible way to figure out which floor plan fits my land?",
             "a": "Focus on delivery access and setback rules more than raw square footage of your lot. We'll go over your site in detail before recommending anything."},
{"q": "Will less-than-great credit rule me out?",
             "a": "Not necessarily. Between financing directly and partnering with outside lenders, most buyers land on an option that works."},
{"q": "Can I look over photos before making a decision?",
             "a": "Absolutely — reach out and we'll send along images and floor plans for any model that interests you."},
{"q": "Will extra costs show up after I've committed to a home?",
             "a": "It stays put. The items above are the complete quote, not a partial figure that grows later."},
],
        "lastModified": "2026-09-10",
    },
    "burnet": {
        "intro": "Burnet County buyers deserve a price they can actually verify, not a number that changes after the fact. That's the whole premise behind how Texas Homes Direct operates — no games, no pressure to sign quickly.",
        "buying": [
            "The base pad, underpinning, and skirting are fixed costs we quote right alongside the home. Utility connections are the one variable — Burnet County land differs enough that those get an exact bid from our own contractor before anything is final.",
            "Double wides arrive in two sections that get joined and finished once they're on your property — more moving parts than a single wide, but work our crews manage as part of the sale either way.",
        ],
        "gettingStarted": [
            "The first real question for a Burnet County buyer is usually the property itself — utility connections are the one variable that depends on your specific land, and that's where the conversation starts.",
            "Once your land situation is settled, we walk through financing next — what a monthly payment actually looks like once the fixed setup costs and your exact utility bid are both accounted for, no guesswork involved.",
        ],
        "pricingExplainer": [
            "A price that changes after you've committed isn't really a price. For Burnet County buyers, what's quoted above is what's owed — nothing more.",
            "The honest answer on utilities is that we can't know the exact cost until we've seen your land — soil, distance to lines, and well depth all vary too much for a phone guess. You'll get an estimate early, then a contractor-verified number before committing.",
        ],
        "localProof": "We've delivered homes across Burnet County ranging from compact single-section layouts to larger multi-bedroom double wides.",
        "faq": [
{"q": "Is owning land already a requirement?",
             "a": "No — we work with buyers who own land outright, buyers purchasing a lot separately, and buyers using property that's stayed in the family."},
{"q": "How should I think about single wide versus double wide?",
             "a": "Think budget and lot size for a single wide, and household size and future space needs for a double wide. We'll help you weigh the tradeoff against your actual situation."},
{"q": "Is Burnet County within your service area?",
             "a": "Yes, all of it. Pass along your address and we'll map out delivery specifics for your property."},
],
        "lastModified": "2026-09-10",
    },
    "blanco": {
        "intro": "What does a manufactured home actually run per month? That's usually the first question a Blanco County buyer asks, and Texas Homes Direct answers it directly instead of steering the conversation elsewhere.",
        "buying": [
            "A HUD-code manufactured home puts a Blanco family into a new house for noticeably less than an equivalent site-built project, without any compromise on the construction standard.",
            "Some Blanco County land already has a well, septic system, and electric service ready to go; other lots are a blank canvas. We size up the actual site work required rather than assuming a default package.",
        ],
        "gettingStarted": [
            "A Blanco County buyer's first real step is the property itself: some lots already have a well, septic system, and electric service ready to go, others are a blank canvas, and we size up the real work either way.",
            "Once that's clear, we get into the numbers — floor plan pricing, financing terms, and what your monthly payment actually looks like, laid out plainly before you're asked to decide on anything.",
        ],
        "pricingExplainer": [
            "Budgeting for a home only works if the number holds. Blanco County buyers get a quote from Texas Homes Direct that already includes everything above, so the number they plan around is the number they pay.",
            "Where we're careful not to overpromise is utility costs. Every property is different, so a phone estimate comes first, and an exact bid follows from a contractor who's actually walked the land — a number you approve before it's locked in.",
        ],
        "localProof": "Families across Blanco County have worked with us on both single wide and double wide floor plans, chosen around their specific lot and household.",
        "faq": [
{"q": "What are Blanco County's permitting requirements for a manufactured home?",
             "a": "Those vary by county, so it's worth confirming with Blanco County directly before you buy. We can steer you to the right office to ask."},
{"q": "What's the process after I've decided on a floor plan?",
             "a": "From that point, our team manages the build schedule, coordinates delivery, and oversees the on-site setup, keeping you in the loop the entire time."},
{"q": "What does the out-the-door price for a Blanco-area home actually cover?",
             "a": "That's the whole price. Everything above is already folded into the number you're given."},
],
        "lastModified": "2026-09-10",
    },
    "johnson-city": {
        "intro": "Deciding between a single wide and a double wide is usually the first real choice a Johnson City buyer has to make, and it comes down to lot size and household needs more than anything else. Texas Homes Direct walks through both before you commit to either.",
        "buying": [
            "A single wide keeps costs down for a smaller lot or tighter budget, while a double wide suits a Johnson City family that needs more bedrooms and living space. Either way, the financing process looks the same.",
            "Every home in our lineup meets current HUD construction code and goes through factory inspection before delivery — the same baseline standard no matter where in Blanco County it's headed.",
        ],
        "gettingStarted": [
            "For most Johnson City buyers, the first real decision isn't financing or land at all — it's single wide versus double wide, and that mostly comes down to lot size and how many people are moving in.",
            "Once that's settled, the property conversation follows naturally, and every home in our lineup meets the same HUD construction code and factory inspection no matter where in Blanco County it ends up.",
        ],
        "pricingExplainer": [
            "Nobody wants a surprise bill after they've already committed to a home. For Johnson City buyers, the price above is locked — everything listed is already part of it.",
            "Utilities are handled differently, because Blanco County land varies too much for a phone-only number. An estimate starts the conversation, then a contractor visits your specific property for an exact bid you actually approve, not a guess revised later.",
        ],
        "localProof": "Blanco County buyers near Johnson City have chosen a mix of single wide and double wide homes, based on what actually fit their property.",
        "faq": [
{"q": "Is prior land ownership required in Blanco County?",
             "a": "It isn't. We regularly work with buyers who already have land, buyers still searching for a lot, and buyers using property passed down in the family."},
{"q": "Will I be charged more than the quoted price once I've committed?",
             "a": "The quoted number holds. Everything above is already part of it, with nothing added afterward."},
],
        "lastModified": "2026-09-10",
    },
    "comfort": {
        "intro": "Manufactured home permitting works differently from one Texas county to the next, and most Comfort-area buyers have no reason to already know Kendall County's specific process. Texas Homes Direct handles that paperwork directly instead of leaving you to sort it out.",
        "buying": [
            "Kendall County land works in several configurations for a manufactured home — property already in the family, a lot you own outright, or one you're purchasing on your own. We'll scope your specific site once we know which applies.",
            "Not every Texas county handles manufactured home permitting the same way, and Kendall County has its own process. Texas Homes Direct manages that coordination so a Comfort-area buyer isn't tracking down paperwork solo.",
        ],
        "gettingStarted": [
            "You don't need to already understand Kendall County's permitting process to start near Comfort — that part is ours to manage once you're ready to move forward.",
            "Once that's settled, financing is next, and Kendall County permitting is something our team manages start to finish — not a process a Comfort-area buyer is expected to already understand.",
        ],
        "pricingExplainer": [
            "Some quotes look attractive because they're missing pieces. Comfort-area buyers get the opposite from Texas Homes Direct: a number that already has everything above built in.",
            "Kendall County land conditions vary enough that pretending to know utility costs without seeing the property wouldn't be honest. A phone estimate gets things started, and a contractor visit produces the exact bid, reviewed by you before it's final.",
        ],
        "localProof": "We've set up both single wide and double wide homes for families throughout Kendall County, sized to each buyer's actual needs.",
        "faq": [
{"q": "What permitting steps should I expect in Kendall County?",
             "a": "Those depend on the specific property and current county rules, so it's best to check directly with Kendall County. We can point you toward the right office."},
{"q": "My credit has some dings — can I still get approved?",
             "a": "In most cases, yes. Between in-house financing and a network of outside lenders, buyers with credit challenges typically still have workable options."},
{"q": "After I settle on a home, what does Texas Homes Direct handle next?",
             "a": "We take over coordinating the build schedule, arranging delivery, and managing the on-site setup, checking in with you as things progress."},
],
        "lastModified": "2026-09-10",
    },
    "bandera": {
        "intro": "Texas Homes Direct doesn't stop at getting a home onto your Bandera County property. The base pad, utility connections, underpinning, and skirting are all handled by our own crews and rolled into the same financing as the home.",
        "buying": [
            "A manufactured home meeting current HUD code costs meaningfully less than comparable site-built construction around Bandera, without any compromise on how the home is actually built.",
            "Some Bandera County properties already have utilities run; others are starting from raw land. Texas Homes Direct scopes exactly what your site needs instead of assuming a standard package applies.",
        ],
        "gettingStarted": [
            "Worth knowing upfront near Bandera: our own crews handle the full setup — base pad, utility connections, underpinning, skirting — not a subcontractor you have to coordinate separately.",
            "The next real question is the property itself. Some Bandera County land already has utilities run, some is starting from scratch, and we scope exactly what applies before anything moves forward.",
        ],
        "pricingExplainer": [
            "The whole point of an out-the-door price is that it doesn't move. For a Bandera County buyer, everything listed above is already factored into the quote, not added as a follow-up.",
            "We're upfront that utility costs can't be nailed down over the phone alone. Every lot near Bandera has its own conditions, so an estimate comes first, followed by an exact bid from a contractor who's actually been to the property.",
        ],
        "localProof": "Bandera County buyers have come to us with land already in the family, land they'd just bought, and lots they were still deciding on.",
        "faq": [
{"q": "What's the practical difference in living space between a single wide and a double wide?",
             "a": "A single wide is one continuous section with a smaller footprint and lower cost; a double wide is two joined sections offering substantially more room. Your lot and household size usually make the choice clear."},
{"q": "Is Bandera County part of your regular delivery territory?",
             "a": "It is — pass along your address and we'll walk through the delivery specifics for your property."},
{"q": "Before committing, can I look at real floor plans and photos?",
             "a": "Of course. Get in touch and we'll send over the details for whatever models fit what you're looking for."},
],
        "lastModified": "2026-09-10",
    },
    "hondo": {
        "intro": "A less-than-perfect credit history doesn't automatically rule out financing for a Hondo-area buyer. Between in-house terms and outside lending partners, Texas Homes Direct typically finds a workable path even when a single bank wouldn't approve it.",
        "buying": [
            "Between financing directly and partnering with outside public and private lenders, Texas Homes Direct typically has a path forward even for buyers whose credit isn't perfect.",
            "A Medina County property can work whether it's family land, a lot already owned, or one being purchased separately. We'll cover what a specific site calls for once we know which situation applies.",
        ],
        "gettingStarted": [
            "A Hondo-area buyer's first step is usually the property: family land, something already owned, or a lot being purchased separately all lead to the same walkthrough of what a specific Medina County site needs.",
            "Financing comes next, and it's rarely a dead end — between in-house terms and outside lending partners, most buyers find a workable path even when a single lender wouldn't approve them.",
        ],
        "pricingExplainer": [
            "A quote that leaves things out isn't really a quote — it's an opening offer. Hondo-area buyers get a complete number from Texas Homes Direct, with everything above already included.",
            "Medina County properties vary enough that utility costs genuinely can't be known from a phone call alone. A solid estimate comes first, then our own contractor visits the land for an exact bid you see and approve before anything is finalized.",
        ],
        "localProof": "Hondo-area families we've worked with have landed on floor plans ranging from compact single-section homes to larger double wides.",
        "faq": [
{"q": "What determines which floor plan actually fits my land?",
             "a": "Mostly delivery access and setback requirements rather than raw acreage. We'll go over your specific property before recommending a size."},
{"q": "Does your delivery area cover all of Medina County?",
             "a": "Yes. Once we have your address, we'll confirm exactly what delivery and setup will look like for your property."},
{"q": "Is approval realistic if my credit history isn't spotless?",
             "a": "Usually, yes. Between our own financing and outside lending partners, most buyers find a workable path regardless of credit history."},
],
        "lastModified": "2026-09-10",
    },
    "devine": {
        "intro": "Texas Homes Direct delivers throughout Medina County, not just to Devine itself, with the same pricing and setup process no matter where in the county your property sits.",
        "buying": [
            "Meeting current HUD code doesn't mean a lower-quality home — it means the same modern construction standard, priced well below an equivalent site-built house near Devine.",
            "Some Medina County buyers near Devine already have a site picked out; others are still deciding between options. Texas Homes Direct works with buyers at either stage of that process.",
        ],
        "gettingStarted": [
            "The first real question for a buyer near Devine is where things stand with the land — already picked out, or still being decided — and we work with buyers at either point before anything else gets settled.",
            "From there, pricing and setup work the same no matter where in Medina County the property sits, since delivery and service cover the whole county, not just Devine itself.",
        ],
        "pricingExplainer": [
            "The price you see should be the price you owe. For Devine-area buyers, that's exactly how Texas Homes Direct works — everything listed above is already part of the number.",
            "Every property in Medina County is different, so we won't claim to know your exact utility cost sight unseen. A phone estimate comes first, then a contractor visits the land to build a precise bid — the real number, seen before you commit.",
        ],
        "localProof": "Families near Devine in Medina County have worked with us on floor plans sized to fit their specific lot and household.",
        "faq": [
{"q": "Do I need land secured before reaching out?",
             "a": "No — some buyers already have a site lined up, some are still shopping, and some are working with family property. We meet you at whichever stage applies."},
{"q": "Can setup expenses be folded into my monthly payment?",
             "a": "Yes — that's actually the more common path for our Devine-area buyers, rather than writing a second check once the home is on the ground."},
{"q": "Does Texas Homes Direct serve all of Medina County?",
             "a": "It does. Share your address and we'll confirm the specifics of delivery for your property."},
{"q": "Is the price you quote for a home near Devine the full cost?",
             "a": "That's correct. Once the number above is quoted, it stays the number — no revisions later."},
],
        "lastModified": "2026-09-10",
    },
    "castroville": {
        "intro": "Texas Homes Direct is a family-owned, faith-based business, and that shapes how we work with Castroville-area buyers: straightforward pricing, no inflated numbers, and no pressure to sign before you're ready.",
        "buying": [
            "A double wide near Castroville gives a family more bedrooms and square footage than a single wide, built from two sections joined once on-site. A single wide costs less and goes up with a simpler process.",
            "The pad, underpinning, and skirting are quoted right alongside the home, no waiting required. Utility connections are the exception — Medina County land varies enough that those get an exact, contractor-verified bid before that cost is added to your financing.",
        ],
        "gettingStarted": [
            "The first real step for a Castroville-area buyer is the property — some Medina County land already has utilities run, some is a blank canvas — and we scope the actual work needed either way.",
            "From there it's single wide versus double wide, mostly a matter of how much space your household actually needs, worked through at your own pace with no pressure to decide on the spot.",
        ],
        "pricingExplainer": [
            "Trust in a price starts with what it actually includes. Castroville-area buyers get a number from Texas Homes Direct that already accounts for everything above, with nothing added after the fact.",
            "Utility costs are the exception we're upfront about: they depend on the property, not a phone call. Castroville-area buyers get a starting estimate, then a contractor visit to the actual land for an exact bid reviewed before anything is finalized.",
        ],
        "localProof": "Medina County families near Castroville have worked with us across a range of budgets, from modest single-section homes to larger double wides.",
        "faq": [
{"q": "Is prior land ownership necessary before I can buy?",
             "a": "No. We work with buyers who already own land, buyers purchasing a lot on their own, and buyers using family property."},
{"q": "What actually separates a single wide from a double wide?",
             "a": "A single wide is one continuous section, more compact and budget-friendly. A double wide is assembled from two joined sections and offers meaningfully more square footage."},
{"q": "Can I see photos before making a final decision?",
             "a": "Yes — reach out and we'll share photos and floor plan details for any home that catches your interest."},
],
        "lastModified": "2026-09-10",
    },
    "new-braunfels": {
        "intro": "Comal County buyers aren't choosing from three floor plans and calling it a day. Texas Homes Direct carries a range of layouts, from compact single-section homes to larger four-bedroom double wides, so the decision is about fit, not what happens to be on the lot.",
        "buying": [
            "A smaller floor plan keeps cost and setup simple for a New Braunfels-area buyer with a tighter lot; a larger double wide suits a family that needs the extra bedrooms. Both are financed the same way.",
            "Every floor plan we offer meets current HUD code and passes factory inspection before it ships — the range in size doesn't mean a range in construction standard.",
        ],
        "gettingStarted": [
            "Near New Braunfels, the first real step is usually narrowing down floor plans, since Comal County buyers have more than a handful of options — compact single-section homes up through larger four-bedroom double wides.",
            "Once a plan or two stands out, the property conversation follows: what your specific site needs doesn't change which homes are available to you, just how the setup itself gets handled.",
        ],
        "pricingExplainer": [
            "Whichever floor plan a New Braunfels-area buyer lands on, the price works the same way: everything itemized above is already built into the number you're quoted.",
            "Comal County land varies enough in soil and access that utility costs can't be quoted sight unseen. A phone estimate starts the conversation, and our contractor bids the actual property before you commit.",
        ],
        "localProof": "Comal County buyers we've worked with have picked from a genuine range of floor plans — not just whatever happened to be available.",
        "faq": [
{"q": "How many floor plans are actually available near New Braunfels?",
             "a": "More than a handful — reach out and we'll walk through current options sized and priced for what you're looking for."},
{"q": "Can I get approved with less-than-perfect credit?",
             "a": "Often, yes. Between financing directly and working with outside lenders, most buyers find a path even with credit challenges."},
{"q": "Do you deliver throughout Comal County?",
             "a": "Yes. Share your address and we'll confirm exactly what delivery and setup look like for your property."},
],
        "lastModified": "2026-09-18",
    },
    "lockhart": {
        "intro": "Buying a manufactured home involves more paperwork than most Lockhart-area buyers expect — permits, utility applications, title work. Texas Homes Direct manages all of it, not just the permit piece.",
        "buying": [
            "A Caldwell County buyer doesn't need to learn the county's process to buy from us; we file what needs filing and coordinate what needs coordinating.",
            "Compared to site-built construction, a HUD-code manufactured home puts Caldwell County buyers into a new home at a noticeably lower price point, same quality standard.",
        ],
        "gettingStarted": [
            "The first real thing we ask a Lockhart-area buyer about is the property itself — what size home actually fits the lot shapes the floor plans worth looking at before anything else does.",
            "What we do need early is your land situation, since it shapes the paperwork that follows. Once we know where the home is going, everything else routes through us instead of bouncing back to you.",
        ],
        "pricingExplainer": [
            "The paperwork gets handled, and so does the price — a Lockhart-area quote is complete the moment you see it, with everything itemized above already in it.",
            "Utility costs are the one thing that requires an actual site visit rather than a form. A phone estimate starts it, and our contractor's exact bid finishes it before anything is final.",
        ],
        "localProof": "We've walked Caldwell County families through permitting, utility applications, and title paperwork alongside their home purchase, not as a separate hassle.",
        "faq": [
{"q": "What paperwork does Texas Homes Direct actually handle for a Lockhart purchase?",
             "a": "Permitting, utility coordination, and the documentation tied to setup — we manage the filing so you're not tracking down forms yourself."},
{"q": "What size home actually fits my lot?",
             "a": "That's mostly about delivery access and setback rules, not just total acreage. We'll go over your specific site before recommending a floor plan."},
{"q": "Do I need a permit for a manufactured home in Caldwell County?",
             "a": "Yes, and we file it as part of the process — you won't need to visit the county office yourself."},
{"q": "What happens after I choose a home?",
             "a": "Once you're set on a home, our team runs point on everything else \u2014 scheduling the build, coordinating delivery, and handling setup."},
],
        "lastModified": "2026-09-18",
    },
    "luling": {
        "intro": "If you're comparing quotes from more than one manufactured home dealer near Luling, ask each one the same question: does this number include setup, or just the home? Texas Homes Direct's answer is always both.",
        "buying": [
            "A quote that leaves out setup, delivery, or utilities isn't actually cheaper — it's incomplete. We'd rather a Luling-area buyer see the full number upfront than get surprised comparing it to someone else's partial one.",
            "Permitting requirements aren't identical from one Texas county to the next, and Caldwell County is no exception. Texas Homes Direct manages that coordination directly.",
        ],
        "gettingStarted": [
            "A Luling-area buyer's first step is usually a numbers comparison — get quotes from more than one dealer, and check whether each one includes setup or just the home itself.",
            "Once you've got a real number to compare, the property comes next — Caldwell County permitting is ours to manage regardless, so that part doesn't change what you bring to the first call.",
        ],
        "pricingExplainer": [
            "When you compare our quote to anyone else's, compare the whole thing — everything itemized above is already folded into the number, not billed separately later.",
            "What we won't do is invent a utility number before anyone's seen your land. A phone estimate comes first, and our own contractor follows up on-site with an exact figure.",
        ],
        "localProof": "Luling-area families we've worked with have told us they appreciated seeing a complete number instead of piecing one together from several quotes.",
        "faq": [
{"q": "What should I ask other dealers to make sure I'm comparing quotes fairly?",
             "a": "Whether setup, delivery, and permitting are included in the number — a lot of quotes leave those out and add them back in later."},
{"q": "How much does a manufactured home cost near Luling?",
             "a": "It varies by floor plan and features, but the free mortgage analysis tool gives you a number specific to your budget and situation."},
{"q": "Do I need to already own land?",
             "a": "No. Family property, land you already own, or a lot you're purchasing separately all work with Texas Homes Direct."},
{"q": "Can I see the home before deciding?",
             "a": "Absolutely \u2014 just tell us which models caught your eye and we'll send over photos and floor plans before you commit to anything."},
],
        "lastModified": "2026-09-18",
    },
    "gonzales": {
        "intro": "A big down payment isn't always the barrier Gonzales County buyers assume it is. Down payment requirements shift depending on the loan program and your financial profile — there isn't one fixed number everyone has to hit.",
        "buying": [
            "Texas Homes Direct works through several loan programs precisely because a single down payment threshold doesn't fit every Gonzales-area buyer's situation.",
            "A manufactured home built to current HUD code gets a Gonzales County family into a new home for meaningfully less than an equivalent site-built house.",
        ],
        "gettingStarted": [
            "A Gonzales County buyer's first real question is usually financing, not land — the actual down payment figure depends on the loan program and your financial profile, which is exactly where we start.",
            "From there, the property comes up, and we scope what your specific Gonzales County site actually needs before any numbers get finalized.",
        ],
        "pricingExplainer": [
            "The price Texas Homes Direct quotes for a Gonzales-area home is complete from the start — everything itemized above is already in that number, regardless of which financing path you take.",
            "We don't quote utilities off a phone call alone \u2014 Gonzales County land is too inconsistent for that to be honest. The number you get upfront is a placeholder, until our own contractor for an exact bid.",
        ],
        "localProof": "We've worked with Gonzales County buyers on a range of down payment structures, matched to what actually fit their financial situation.",
        "faq": [
{"q": "Is there a minimum down payment for a Gonzales-area purchase?",
             "a": "It depends on the loan program — there isn't one number that applies to every buyer. We'll go over what actually applies to your situation."},
{"q": "Do I need to already own land in Gonzales County?",
             "a": "It's not required. We've worked with buyers who already owned their land, others who bought a lot specifically for this, and some building on property that's been passed down."},
{"q": "What happens once I've picked a home?",
             "a": "After that, the logistics become our problem, not yours: build timeline, delivery, and setup, all managed by our team."},
{"q": "Will costs get added after I've committed?",
             "a": "No. The quoted number already includes everything itemized above."},
],
        "lastModified": "2026-09-18",
    },
    "floresville": {
        "intro": "Texas Homes Direct sells factory-direct, which means a Floresville-area buyer isn't paying for an extra layer of dealership markup stacked on top of the manufacturer's price.",
        "buying": [
            "That direct relationship is part of why a manufactured home costs a Wilson County family less than comparable site-built construction — there's one fewer hand in the pricing.",
            "Tighter budget or a smaller lot near Floresville? A single wide often makes more sense. Need more square footage for a growing household? That's where a double wide earns its keep.",
        ],
        "gettingStarted": [
            "Starting near Floresville means understanding the price first: factory-direct, with no dealership markup layered on top of the manufacturer's own number.",
            "From there it's sizing and the property together — a tighter budget or smaller lot often points toward a single wide, while a growing Wilson County household usually leans toward a double wide.",
        ],
        "pricingExplainer": [
            "Factory-direct doesn't mean bare-bones — it means the price you see already includes everything itemized above, without a markup layer inflating it first.",
            "Wilson County properties vary enough in soil and access that we won't guess at utility costs sight unseen. A phone estimate comes first, then an exact bid from our contractor.",
        ],
        "localProof": "Wilson County buyers we've worked with have asked directly about markup, and the honest answer is the price reflects the factory number plus setup, not an added margin on top.",
        "faq": [
{"q": "What does 'factory-direct' actually mean for pricing?",
             "a": "It means Texas Homes Direct works directly with the manufacturer rather than through a separate dealership markup layer, which keeps the quoted price lower."},
{"q": "What permitting steps should I expect in Wilson County?",
             "a": "Permitting steps track the property and current Wilson County requirements, not a fixed checklist \u2014 best confirmed with the county directly."},
{"q": "Do you deliver throughout Wilson County?",
             "a": "We cover all of Wilson County. Send your address over and we'll lay out exactly what delivery and setup will look like at your location."},
],
        "lastModified": "2026-09-18",
    },
    "smithville": {
        "intro": "Texas Homes Direct doesn't deal in used or salvage manufactured homes near Smithville — every home in our inventory is new and HUD-certified, built to the current construction code.",
        "buying": [
            "That matters for financing as much as peace of mind: new HUD-certified homes qualify for loan programs that older or used units often can't.",
            "Site-built construction runs meaningfully higher than a comparable HUD-code manufactured home near Smithville \u2014 same construction standard, lower price tag.",
        ],
        "gettingStarted": [
            "The first real step for a Smithville-area buyer is the property — a well, septic, and electric already run, or bare ground to start from — since that shapes the setup plan more than anything else.",
            "From there, financing follows naturally — new construction opens up loan programs that wouldn't apply to an older or used unit, which is worth knowing before you start comparing numbers elsewhere.",
        ],
        "pricingExplainer": [
            "A Smithville-area quote for a new, HUD-certified home holds from the moment you get it — everything itemized above is already part of that number.",
            "Bastrop County land varies enough that a phone-only utility number would just be a guess. We start with an estimate, then send a contractor to the actual property for an exact bid.",
        ],
        "localProof": "Smithville-area families we've worked with have specifically asked about new-versus-used inventory, and every home we've delivered has been new and current-code.",
        "faq": [
{"q": "Do you sell used or refurbished homes near Smithville?",
             "a": "Everything we carry is brand new and HUD-certified \u2014 nothing used or refurbished. Get in touch and we'll walk you through what's currently in stock."},
{"q": "What permitting steps apply in Bastrop County?",
             "a": "That's worth confirming directly with Bastrop County, since requirements shift from one county to the next."},
{"q": "Do I need land squared away before reaching out?",
             "a": "It's not a prerequisite \u2014 we hear from Smithville-area buyers at every stage, whether they've already got a spot picked out or are still figuring that part out."},
],
        "lastModified": "2026-09-18",
    },
    "elgin": {
        "intro": "No two Elgin-area properties set up exactly the same way. Texas Homes Direct scopes each site individually rather than applying one generic setup plan across every Bastrop County lot.",
        "buying": [
            "Some lots need more prep work than others — clearing, grading, longer utility runs. We account for the specific site rather than assuming a standard package covers it.",
            "A single wide can be a practical starting point for an Elgin-area buyer on a smaller lot or tighter budget, while a double wide suits a family that needs more room.",
        ],
        "gettingStarted": [
            "An Elgin-area buyer's first step is a real look at the property — clearing, grading, or longer utility runs the land might still need — since that determines the setup plan more than anything else.",
            "Once we know what the site actually requires, sizing and financing follow, worked out against your Bastrop County lot rather than a generic package applied across the board.",
        ],
        "pricingExplainer": [
            "Even though every site is different, the home price itself doesn't move once it's quoted — everything itemized above is already in the number Texas Homes Direct gives an Elgin-area buyer.",
            "Guessing at a utility number before we've walked the property wouldn't be fair to an Elgin-area buyer. We open with a phone estimate, and the contractor's on-site figure is what actually counts.",
        ],
        "localProof": "We've adapted setup plans for Bastrop County properties ranging from cleared, level lots to more wooded sites near Elgin.",
        "faq": [
{"q": "Does my lot need to be cleared before Texas Homes Direct can set up near Elgin?",
             "a": "Not necessarily — we assess the site first and scope what work is actually needed rather than assuming a fixed requirement."},
{"q": "Am I required to have land before contacting you?",
             "a": "You're not. Elgin-area buyers come to us with family land, purchased lots, and land they're still looking for — we adjust to whichever applies."},
{"q": "Is Bastrop County entirely within your delivery range?",
             "a": "It is. Pass along your address and we'll confirm what setup looks like at your specific location."},
],
        "lastModified": "2026-09-18",
    },
    "bastrop": {
        "intro": "Call Texas Homes Direct about a Bastrop-area property and you'll talk to someone who actually knows the answer, not a call center reading from a script.",
        "buying": [
            "That direct access matters when a Bastrop County buyer has a specific question about their lot, their financing, or their timeline for deciding — a scripted answer doesn't help much.",
            "A double wide arrives in two sections joined and finished on your property — a bigger project than a single wide, but one our crews handle as part of the purchase.",
        ],
        "gettingStarted": [
            "Two things shape what happens next for a Bastrop-area buyer: where the property stands and how soon you're looking to move — both come up before any floor plan gets discussed.",
            "From there it's financing and setup, both explained in plain terms before you're asked to decide on anything — the same real-person access that answered your first question carries through the rest of the process.",
        ],
        "pricingExplainer": [
            "When you ask what's included in a Bastrop-area quote, you get a straight answer, not a transfer — everything itemized above is already in the number.",
            "Bastrop County land differs enough lot to lot that a contractor has to actually walk it before we'll commit to a utility figure. A phone estimate opens the conversation, and the real bid follows the site visit.",
        ],
        "localProof": "Bastrop County buyers we've worked with have reached the same team member on follow-up calls instead of starting over with someone new.",
        "faq": [
{"q": "If I call with a question, will I reach someone who actually knows my situation?",
             "a": "Yes — Bastrop-area buyers work with the same point of contact rather than a general call queue."},
{"q": "Do I need to already own land to start this process?",
             "a": "No. Bastrop County buyers reach out with family land, land they've bought, and land they're still shopping for — all three work."},
{"q": "How far out does your delivery area extend from Bastrop?",
             "a": "Across the whole county — tell us your address and we'll go over what that means for your specific property."},
],
        "lastModified": "2026-09-18",
    },
    "giddings": {
        "intro": "A lot of Giddings-area buyers are looking at a manufactured home for the first time and aren't sure what to ask. Texas Homes Direct walks through the process step by step, not assuming you already know the terminology.",
        "buying": [
            "There's no bad question for a Lee County first-time buyer — financing terms, site prep, permitting all get explained plainly before you're asked to decide anything.",
            "Lee County has room for a manufactured home whether it's going on family land, land already owned, or a lot purchased separately.",
        ],
        "gettingStarted": [
            "A Giddings-area buyer's first real step is the land situation in Lee County — family land, land already owned, or a lot purchased separately all work, and there's no bad question along the way.",
            "From there, financing terms and site prep get explained plainly before you're asked to decide anything, the same step-by-step approach whether this is your first manufactured home or not.",
        ],
        "pricingExplainer": [
            "First-time buyers especially benefit from a number that doesn't require translation — a Giddings-area quote already includes everything itemized above, plainly.",
            "We won't hand a first-time Lee County buyer a made-up utility figure just to sound decisive. A phone estimate is the honest starting point, and the contractor's site visit produces the number that actually counts.",
        ],
        "localProof": "We've walked first-time buyers in Lee County through the entire process, from financing basics to what happens on delivery day.",
        "faq": [
{"q": "I've never done this before — where do I even start?",
             "a": "With a phone call. We'll walk through land status, budget, and floor plan options before anything gets formal."},
{"q": "Do you deliver throughout Lee County?",
             "a": "Yes. Send us your address and we'll confirm what delivery and setup look like for your specific property."},
{"q": "What's the difference between a single wide and a double wide?",
             "a": "Square footage and price, mainly \u2014 a single wide is one section and the more budget-friendly option, while a double wide combines two sections on-site for a noticeably bigger home."},
],
        "lastModified": "2026-09-18",
    },
    "la-grange": {
        "intro": "Every home Texas Homes Direct sells near La Grange goes through two separate inspections — one at the factory before it ships, and one on-site once it's set. Neither step gets skipped.",
        "buying": [
            "The factory inspection confirms the build meets HUD code; the on-site inspection confirms the setup itself was done correctly on your Fayette County property.",
            "A manufactured home can get a Fayette County family into a new home for a lot less than site-built construction, without cutting corners on quality.",
        ],
        "gettingStarted": [
            "A La Grange-area buyer's first real question is usually the land — family property or a newly bought lot both lead to the same process, factory inspection through on-site sign-off.",
            "Once a floor plan is settled, that two-stage inspection kicks off automatically: one check at the factory before the home ships, one on-site once it's set on your Fayette County property.",
        ],
        "pricingExplainer": [
            "Both inspections are part of the same quoted price for a La Grange-area home — everything itemized above is already included, inspections and all.",
            "Fayette County soil and access vary enough property to property that a real utility figure has to wait for a contractor's visit. We'll give you a phone estimate in the meantime, but the site-verified number is what goes into your financing.",
        ],
        "localProof": "Fayette County homes we've delivered near La Grange have each passed both the factory build inspection and a final on-site check.",
        "faq": [
{"q": "What if I haven't settled on a piece of land yet?",
             "a": "That's fine — plenty of La Grange-area buyers start the process before their land situation is finalized."},
{"q": "Which parts of Fayette County can you actually reach?",
             "a": "All of it. Give us your address and we'll lay out exactly what delivery involves for that location."},
],
        "lastModified": "2026-09-18",
    },
    "schulenburg": {
        "intro": "Texas Homes Direct doesn't sell land, and we don't bundle land-and-home packages near Schulenburg — just homes, priced and financed on their own.",
        "buying": [
            "That's a deliberate line: a Fayette County buyer working with land they already have, or buying a lot on their own, gets the same straightforward home purchase either way.",
            "Site-built construction costs add up fast around Fayette County \u2014 a HUD-code manufactured home gets you the same quality build for meaningfully less.",
        ],
        "gettingStarted": [
            "The first thing we ask a Schulenburg-area buyer is what's happening with the land — already in the family, or a lot you've bought on your own — since that's the starting point for everything else.",
            "One thing that won't come up: Texas Homes Direct doesn't sell land or bundle land-and-home packages near Schulenburg, so whichever situation applies, you're getting a straightforward home purchase, priced and financed on its own.",
        ],
        "pricingExplainer": [
            "Since we're not bundling land into the deal, a Schulenburg-area quote stays simple — everything itemized above covers the home and setup, nothing else mixed in.",
            "A Fayette County lot's soil and access aren't things we can judge over the phone, so we hold off on a firm utility number until a contractor has actually stood on the property.",
        ],
        "localProof": "We've worked with Schulenburg-area buyers at every stage of the land question \u2014 some already owned it, some had just closed on a lot, some were still weighing options. Either way, our part is the home, never the land.",
        "faq": [
{"q": "Does Texas Homes Direct sell land along with the home?",
             "a": "No — we sell manufactured homes only. Whatever land situation you're working with, family property, your own lot, or one you're buying separately, we work with it."},
{"q": "How do I find out if you deliver to my specific address near Schulenburg?",
             "a": "Just send it over. We'll confirm coverage and walk through what delivery looks like for that property."},
{"q": "Is it possible to review floor plans and photos before deciding anything?",
             "a": "Yes — contact us and we'll pull together images and details for models that fit what you're after."},
],
        "lastModified": "2026-09-18",
    },
    "flatonia": {
        "intro": "The process for a Flatonia-area buyer breaks down into three parts: pick a floor plan, work out financing, and get it set up on your land. Texas Homes Direct manages the second and third parts so the first is the only real decision.",
        "buying": [
            "Permitting rules for a manufactured home shift from one Texas county to another, and Fayette County has its own version. A Flatonia-area buyer doesn't have to learn it — we file what's required.",
            "Household size tends to settle the single-wide-versus-double-wide question more than anything else: more bedrooms needed usually means a double wide makes sense, while a smaller household can do well with a single wide's lower cost.",
        ],
        "gettingStarted": [
            "The first real question for a Flatonia-area buyer is the land situation — Fayette County permitting is ours to file either way, so it doesn't change what you're deciding on the floor-plan side.",
            "From there, the process is genuinely simple: pick a floor plan, work out financing, and let us handle delivery and setup on your land — two of the three parts are on us.",
        ],
        "pricingExplainer": [
            "Simple doesn't mean vague — a Flatonia-area quote spells out everything itemized above in one clear number, not a rough estimate that changes later.",
            "A phone call alone can't account for what a specific Fayette County lot needs, so we treat the initial utility figure as a placeholder until our contractor has actually inspected the site.",
        ],
        "localProof": "Homes we've delivered near Flatonia have moved through the same three-part process regardless of floor plan or lot size.",
        "faq": [
{"q": "What are the actual steps in buying from Texas Homes Direct?",
             "a": "Pick a floor plan, work through financing, and let us handle delivery and setup — three parts, and we manage two of them."},
{"q": "Where do Fayette County's permitting rules come into play?",
             "a": "Before your home is set — we handle the filing so a Flatonia-area buyer doesn't have to navigate the county office directly."},
{"q": "What if I don't have land lined up yet?",
             "a": "That's common — some buyers reach out before their land situation is settled, and we work with wherever things stand."},
{"q": "Is there a way to review specific models before committing?",
             "a": "Sure — get in touch and we'll send photos and floor plan specs for anything that catches your eye."},
],
        "lastModified": "2026-09-18",
    },
    "cuero": {
        "intro": "Renting and owning run on different math, and a lot of DeWitt County families haven't actually run the comparison for a manufactured home near Cuero. Texas Homes Direct will walk through what ownership actually looks like for your budget.",
        "buying": [
            "A monthly payment on a manufactured home works differently than rent — it goes toward something you keep, on land that's yours.",
            "Some DeWitt County buyers already have a well, septic, and electric in place on their land; others are starting from bare ground. We scope the actual site work needed.",
        ],
        "gettingStarted": [
            "A Cuero-area buyer's first real step is the property — some DeWitt County land already has a well, septic, and electric in place, others are starting from bare ground, and we scope the real work either way.",
            "From there, the next step is straightforward: a look at your specific site, your rough budget, and which floor plan actually fits a DeWitt County lot — no pressure to land on an answer in one conversation.",
        ],
        "pricingExplainer": [
            "Whatever the comparison to renting looks like for your situation, the home price itself is fixed — a Cuero-area quote already includes everything itemized above.",
            "DeWitt County land varies enough in soil and access that we won't guess at utility costs over the phone. A solid estimate comes first, then our contractor bids the actual property.",
        ],
        "localProof": "We've run the ownership-versus-renting comparison with DeWitt County families more than once, using their actual numbers rather than a generic example.",
        "faq": [
{"q": "Is buying really more cost-effective than renting long-term?",
             "a": "It depends on your specific numbers, but a mortgage-style payment builds toward ownership where rent doesn't. Run the free mortgage analysis tool for a comparison based on your budget."},
{"q": "Do you deliver throughout DeWitt County?",
             "a": "Yes. Share your address and we'll confirm what delivery and setup involve for your property."},
{"q": "What happens once I've picked a home?",
             "a": "From there, we take over coordinating the build, getting it to your site, and finishing the setup."},
],
        "lastModified": "2026-09-18",
    },
}

missing = [slug for slug, *_ in CITIES if slug not in CITY_COPY]
if missing:
    raise SystemExit(f"Missing CITY_COPY entries for: {missing}")

for slug, name, *_ in CITIES:
    copy = CITY_COPY[slug]
    assert len(copy["buying"]) == 2, f"{slug}: buying must have exactly 2 paragraphs"
    # FAQ count varies per city now that the definition, setup-scope, and
    # pricing/utility questions live on shared explainer pages instead of
    # being repeated per city — see CLAUDE.md's "Explainer pages" note.
    assert 1 <= len(copy["faq"]) <= 7, f"{slug}: faq must have between 1 and 7 items"
    if "pricingExplainer" in copy:
        assert len(copy["pricingExplainer"]) == 2, f"{slug}: pricingExplainer must have exactly 2 paragraphs"
    if "gettingStarted" in copy:
        assert len(copy["gettingStarted"]) == 2, f"{slug}: gettingStarted must have exactly 2 paragraphs"


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


out = []
out.append("""/**
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

export const CITY_CONTENT: Record<string, CityContent> = {""")

for slug, name, county, tier, meta, hero, heroAlt, sec, secAlt, nearby, popular in CITIES:
    copy = CITY_COPY[slug]
    key = f"'{slug}'" if "-" in slug else slug
    out.append(f"  {key}: {{")
    out.append(f"    county: '{county}',")
    out.append(f"    tier: '{tier}',")
    out.append(f"    metaDescription:\n      \"{esc(meta)}\",")
    out.append(f"    intro:\n      \"{esc(copy['intro'])}\",")
    out.append(f"    buyingHeading: 'Buying a Mobile Home in {county} County',")
    out.append("    buying: [")
    for bt in copy["buying"]:
        out.append(f"      \"{esc(bt)}\",")
    out.append("    ],")
    if copy.get("pricingExplainer"):
        out.append("    pricingExplainer: [")
        for pt in copy["pricingExplainer"]:
            out.append(f"      \"{esc(pt)}\",")
        out.append("    ],")
    if copy.get("gettingStarted"):
        out.append("    gettingStarted: [")
        for gt in copy["gettingStarted"]:
            out.append(f"      \"{esc(gt)}\",")
        out.append("    ],")
    out.append(f"    localProof:\n      \"{esc(copy['localProof'])}\",")
    out.append("    faq: [")
    for item in copy["faq"]:
        out.append("      {")
        out.append(f"        q: \"{esc(item['q'])}\",")
        out.append(f"        a: \"{esc(item['a'])}\",")
        out.append("      },")
    out.append("    ],")
    out.append(f"    nearby: {json.dumps(nearby)},".replace('"', "'"))
    out.append(f"    heroImage: '{hero}',")
    out.append(f"    heroAlt: '{heroAlt}',")
    out.append(f"    secondaryImage: '{sec}',")
    out.append(f"    secondaryAlt: '{secAlt}',")
    out.append("    popularHomes: [")
    for p in popular:
        out.append(f"      '{p}',")
    out.append("    ],")
    if copy.get("lastModified"):
        out.append(f"    lastModified: '{copy['lastModified']}',")
    out.append("  },")
    out.append("")

out.append("}")

with open("lib/cityContent.ts", "w") as f:
    f.write("\n".join(out) + "\n")

print(f"Wrote lib/cityContent.ts ({len(CITIES)} cities)")
