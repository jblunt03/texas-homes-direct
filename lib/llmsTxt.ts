import { LAND_HOME_PACKAGES } from '@/lib/features'
import { LAND_HOME_HUB_PATH } from '@/lib/packages'

/**
 * The text served at /llms.txt (app/llms.txt/route.ts). It moved here from
 * public/llms.txt on 2026-11-21 so the Land-Home Packages line can follow its
 * flag (lib/features.json): with the flag off, the output is byte-for-byte
 * the old file. No prices or payments here (validator step 11g).
 */
const LAND_HOME_LINE = LAND_HOME_PACKAGES
  ? `- Land-home packages (a home and its lot sold together, turnkey) across Texas: https://www.texashomesdirect.com${LAND_HOME_HUB_PATH}\n`
  : ''

export const LLMS_TXT =
  `# Texas Homes Direct
> Family-owned, faith-based factory-direct manufactured and mobile home
  dealership serving all of Texas.

## Summary
Texas Homes Direct sells single wide and double wide manufactured and mobile
homes across Texas, factory-direct. We handle full site setup — water,
septic, electric, base pad, underpinning, and skirting — and those costs can
be rolled into financing rather than paid out of pocket.

The cash price covers the home. Delivery and setup are quoted separately. If
you finance, delivery and setup are included in your estimated monthly
payment.

## Core Advantages
- Factory-direct pricing with no dealership markup
- Full turnkey site setup, rollable into your loan
- In-house financing, plus several public lenders and private lending partners
- Faith-based, family-owned, transparent pricing
- Serving all of Texas

## Key Offerings
- Single wide manufactured and mobile homes
- Double wide manufactured and mobile homes
- Tiny homes (any home with one bedroom): https://www.texashomesdirect.com/tiny-homes
` +
  LAND_HOME_LINE +
  `- Full site setup and installation
- Free 3-minute mortgage analysis, no credit pull

## Contact
- Website: https://www.texashomesdirect.com
- Phone: (830) 381-1309
- Service area: All of Texas
`
