/**
 * The ONLY source of the estimated-payment disclosure text. Every component
 * that shows a monthly payment imports it from here (via
 * components/PaymentEstimate.tsx). validate_batch.py fails if this body text
 * appears in any other file, so it can't drift between pages.
 *
 * Don't add a rate, term, down payment, lender, or included/not-included
 * claim here. As of 2026-11-10 Notion's Interest Rate, Loan Term Years and
 * Down Payment Est fields are empty for every listing; if they're ever
 * filled in, this wording must be revisited to match. See CLAUDE.md
 * "Estimated payment disclosure".
 */
export const PAYMENT_DISCLOSURE = {
  label: 'est.',
  title: 'Estimated Monthly Payment',
  body:
    'Estimated monthly payments are for informational purposes only and are not an offer of credit or a commitment to lend. Your actual payment and interest rate may vary depending on factors such as your down payment, credit history, loan term, and lender. Site work your land requires, such as utility connections, is priced from an exact bid by our contractors after they visit your property, and may change your payment.',
} as const
