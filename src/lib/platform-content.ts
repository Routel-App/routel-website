import type { Locale } from "./i18n";
import { platformContentAr } from "./platform-content.ar";

export type PlatformFeature = { title: string; description: string };
export type PlatformStep = { title: string; description: string };
export type PlatformPersona = { role: string; detail: string };
export type PlatformFaq = { q: string; a: string };
export type PlatformStat = { value: string; label: string };

export type PlatformContent = {
  eyebrow: string;
  title: string;
  description: string;
  stats: PlatformStat[];
  painPoints: string[];
  solutionIntro: string;
  features: PlatformFeature[];
  workflow: PlatformStep[];
  personas: PlatformPersona[];
  faqs: PlatformFaq[];
  related: string[];
};

/**
 * Keyed by module slug (src/lib/modules.ts). Every claim here must trace back
 * to the real product (routel-system-overview.md) — no invented stats, no
 * fabricated market segments, no testimonials. Stats are real, countable
 * facts about the product (stage counts, role counts), never performance
 * percentages we haven't measured.
 */
export const platformContent: Record<string, PlatformContent> = {
  bookings: {
    eyebrow: "Bookings",
    title: "One booking, from quotation to shipment closed",
    description:
      "The booking is Routel's core record: shipment details, the shipping timeline, the carrier booking, charges and profit, invoices, the Bill of Lading, documents and every change made along the way — all under one booking number, moving through one 11-status lifecycle.",
    stats: [
      { value: "11", label: "statuses, booking pending to shipment closed" },
      { value: "1", label: "record every other module hangs off" },
      { value: "0", label: "times you retype the carrier's confirmation" },
    ],
    painPoints: [
      "The vessel name lives in the carrier's email, the container list in a spreadsheet, the charges in another file, and the status in whoever you last called.",
      "A booking confirmation is re-sent after a change, and nobody can say which version the customer is working from.",
      "A customer's 'where's my container' email means re-checking three places before you can answer.",
    ],
    solutionIntro:
      "Routel gives every shipment one home: the booking. Shipment details, the carrier booking, charges, invoices, the B/L and the documents all live on the same record, with AI reading the carrier's paperwork so nobody types it twice — one place to check, one status everyone sees.",
    features: [
      { title: "Shipment details", description: "POL/POD, shipper and consignee, vessel/voyage, containers and container type, incoterms, weight, chargeable weight, volume, cargo description, HBL and MBL numbers, operations staff and sales person. Upload a B/L and AI reads it in." },
      { title: "Shipping timeline", description: "Gate-in cut-off, SI cut-off, ETD, SOB, ATD, ETA and ATA, kept on the booking instead of buried in an inbox." },
      { title: "Carrier booking, read for you", description: "Shipping line, Carrier Booking No., containers, notify party and booking notes. \"Read Carrier Confirmation\" has AI read the carrier's PDF or a linked e-mail, and you tick what to save." },
      { title: "Booking Confirmation with revisions", description: "The first one you issue is the original; any change afterwards makes the next one a \"Revised Booking Confirmation — Revision N\", so everyone knows which version is current." },
      { title: "Charges and profit", description: "Cost (AP) and sale (AR) lines in Booking Charges — AI can read a vendor invoice into cost lines — with a Profit Summary (AP · AR · Net) shown to finance roles only." },
      { title: "Invoice and B/L from the header", description: "Create Invoice turns the booking's sale (AR) lines into draft invoices; Generate Bill of Lading builds the House B/L from the booking's own data." },
      { title: "An 11-status lifecycle", description: "Booking Pending → Booking Confirmed → Gate In → SI Submitted → Vessel Loaded → Departed → In Transit → Arrived → Telex Status → Shipment Closed, or Cancelled." },
      { title: "Activity log, labels, tasks and follow-ups", description: "Every field change and every confirmation issued is logged with who did it and when; labels, tasks, follow-ups and documents sit on the same page." },
    ],
    workflow: [
      { title: "Created", description: "From an accepted quotation with \"Convert to Booking\", directly with New Booking, or by describing it to the AI assistant." },
      { title: "Confirmed with the carrier", description: "Read Carrier Confirmation fills in the carrier booking; issue the Booking Confirmation to your customer, with numbered revisions if anything changes." },
      { title: "Tracked", description: "Status moves through its stages as the shipment actually progresses, visible to your team and, within limits, your customer." },
      { title: "Invoiced and closed", description: "Create Invoice from the sale lines, generate the B/L, and move the booking to Shipment Closed — invoices, charges and reports stay fully visible." },
    ],
    personas: [
      { role: "Operations", detail: "Runs the booking day to day — carrier booking, timeline, documents, status and the Bill of Lading." },
      { role: "Sales", detail: "Creates and edits bookings for their customers and follows their progress." },
      { role: "Accounting", detail: "Invoices from the booking's sale lines and keeps an eye on the Profit Summary." },
      { role: "Management", detail: "Sees every booking, company-wide, without asking anyone for an update." },
    ],
    faqs: [
      { q: "Who can open and edit a booking?", a: "Every signed-in member of staff can read a booking. Editing is open to Admin, Management, Operations and Sales; specific actions, like generating the Bill of Lading, stay with the relevant role, and the Profit Summary is shown to finance roles only." },
      { q: "What happens when the carrier changes something?", a: "Read the new confirmation or edit the booking; the change lands in the activity log, and the next Booking Confirmation you issue goes out as a numbered revision. Regenerate the B/L if it was already issued." },
      { q: "Can a customer see the booking directly?", a: "Not the full record — they see a status timeline on the public tracking page, never commercially sensitive details like the master B/L or vessel name." },
      { q: "What happens when a booking is cancelled?", a: "Cancelled is a status, not a deletion — the booking and everything recorded against it stays on file." },
    ],
    related: ["quotations", "invoicing", "bill-of-lading"],
  },

  "business-partners": {
    eyebrow: "Business Partners",
    title: "One record, whichever side of the deal they're on",
    description:
      "Customers and vendors aren't two different record types in Routel — they're the same thing. Which side a partner plays is decided per transaction, with one combined ledger and one statement of account either way.",
    stats: [
      { value: "1", label: "record type for customers and vendors alike" },
      { value: "AR+AP", label: "netted into one ledger per partner" },
    ],
    painPoints: [
      "The same company is a customer on one booking and a vendor on another, but your system makes you register them twice and keep two records in sync.",
      "Checking what a partner owes you and what you owe them means pulling two separate reports and adding them up by hand.",
      "A statement of account only tells half the story if it only covers one side of the relationship.",
    ],
    solutionIntro:
      "One partner record carries payment terms, a credit limit, contacts and a combined AR+AP ledger — whichever side of a deal they're playing on a given booking.",
    features: [
      { title: "No 'add a customer' vs 'add a vendor' step", description: "One record; an invoice references them as the customer, a vendor cost references them as the vendor." },
      { title: "Combined AR + AP ledger", description: "What they owe you and what you owe them, netted in one place instead of two disconnected balances." },
      { title: "Printable statement of account", description: "Opening balance, invoices, payments, costs and closing balance for a period, generated as PDF." },
      { title: "Vendor costs per booking", description: "Cost (AP) lines recorded in Booking Charges in the vendor's own currency, feeding the booking's Profit Summary immediately." },
    ],
    workflow: [
      { title: "Create the partner once", description: "Name, contacts, payment terms — no need to decide upfront whether they're a customer or a vendor." },
      { title: "Use them on a booking", description: "Reference them as the customer being invoiced, the vendor being billed, or both across different bookings." },
      { title: "Track the relationship", description: "The combined ledger and statement of account update as invoices, costs and payments are recorded." },
    ],
    personas: [
      { role: "Accounting", detail: "Manages payment terms, credit limits and statements." },
      { role: "Operations", detail: "Records vendor cost lines on bookings as vendor invoices come in." },
      { role: "Any signed-in staff", detail: "Can view a partner record to check the relationship." },
    ],
    faqs: [
      { q: "Can the same company be both a customer and a vendor?", a: "Yes — that's the point. One record, used on either side of a deal depending on the transaction." },
      { q: "How is a credit limit set?", a: "Through a formal Credit Application, not a direct edit to the partner record — see Credit Applications." },
      { q: "Does a statement of account cover both sides?", a: "Yes — it reflects the combined AR+AP ledger for that partner, not just one side." },
    ],
    related: ["credit-applications", "finance-receivables", "quotations"],
  },

  quotations: {
    eyebrow: "Quotations & Route Rates",
    title: "Quotes built on rates that are never out of date",
    description:
      "Keep vendor buying rates per POL→POD, shipping line and container type in Routes, with validity shown as Active, Expiring or Expired, bulk-import a whole rate sheet from Excel, and convert an accepted quotation straight into a booking.",
    stats: [
      { value: "14", label: "days warning before a rate expires" },
      { value: "1", label: "click from accepted quote to live booking" },
    ],
    painPoints: [
      "A quote goes out built on a rate that quietly expired last week, and nobody notices until the margin doesn't add up.",
      "A new rate sheet from a vendor means re-typing dozens of lane and container-type combinations by hand.",
      "An accepted quotation becomes a booking by re-entering the same route, equipment and charges that were already captured once.",
    ],
    solutionIntro:
      "Keep the rate book current with expiry warnings and Excel bulk import, then let an accepted quotation carry its customer, route and charges straight into a booking — nothing re-typed.",
    features: [
      { title: "Route Rates", description: "One vendor's buying price for one POL→POD lane, shipping line and container type, valid for a period — add a New Rate or Extend validity in a click." },
      { title: "Active, Expiring, Expired", description: "Rates flag as Expiring 14 days before they lapse, so Pricing can chase a refresh ahead of time, not after a quote fails." },
      { title: "Bulk import from Excel", description: "Load a whole rate sheet in one go instead of entering lanes one at a time." },
      { title: "Convert to Booking", description: "Pick the route the customer accepted and only that route's charges are copied into a new booking; the quotation turns read-only with a \"Converted\" badge and a link to the booking." },
    ],
    workflow: [
      { title: "Rate stored", description: "Pricing records or imports the vendor's buying rate for a lane and container type." },
      { title: "Quotation built", description: "Sales picks a valid rate, sets the selling price, and adds any other charges." },
      { title: "Sent and tracked", description: "Draft → sent → accepted, declined or expired." },
      { title: "Converted to a booking", description: "An accepted quotation becomes a booking in one step, with the chosen route's charges carried across." },
    ],
    personas: [
      { role: "Pricing", detail: "Owns the rate book in Routes — rates by lane, shipping line, container type and validity — and reads Route Analytics for volume and margin per lane." },
      { role: "Sales", detail: "Builds and sends quotations on top of current rates." },
      { role: "Operations", detail: "Picks up the booking once a quotation converts and confirms it with the carrier." },
    ],
    faqs: [
      { q: "What happens to an expired rate?", a: "It's kept for history but hidden from new quotations by default — nothing is deleted." },
      { q: "Can I import a whole rate sheet at once?", a: "Yes — bulk import from Excel instead of entering each lane individually." },
      { q: "Who can work on quotations?", a: "Admin, Management, Sales and Pricing. Pricing usually keeps Route Rates current while Sales quotes from them." },
      { q: "Where did route analytics go?", a: "It sits next to the rates, on the Route Analytics tab in Routes: total shipments, unique routes, top routes and origins/destinations, monthly volume, and revenue, cost, profit and margin." },
    ],
    related: ["bookings", "invoicing", "business-partners"],
  },

  invoicing: {
    eyebrow: "Invoicing",
    title: "Invoices that can't go out ahead of the shipment",
    description:
      "Create Invoice on a booking turns its sale (AR) charge lines into draft invoices, clearly watermarked until finalized — and finalizing is only possible once the booking's B/L number (MBL) is set, so nothing bills a shipment that hasn't actually moved.",
    stats: [
      { value: "2", label: "currencies — your base currency (e.g. MYR) and USD" },
      { value: "1", label: "rule: no B/L number, no finalized invoice" },
    ],
    painPoints: [
      "An invoice goes out before the shipment's documentation is even settled, and the numbers don't match what eventually ships.",
      "A draft invoice looks identical to a real one, so it's easy for a customer (or your own team) to mistake one for the other.",
      "Reading a vendor's cost invoice and re-typing every line into your own system is slow and invites typos.",
    ],
    solutionIntro:
      "Invoices move from Draft to Final to Paid, and only reach Final once the booking's B/L number exists — with AI reading vendor invoices into cost lines to save the re-typing.",
    features: [
      { title: "Draft, clearly marked", description: "Prints with a \"DRAFT TAX INVOICE\" watermark until it's finalized, so it's never confused for a real bill. Only drafts can be edited." },
      { title: "B/L number required to finalize", description: "An invoice can't be finalized until the booking's B/L number (MBL) is set." },
      { title: "Locked line items", description: "Finalizing assigns the real invoice number and stops further edits — adjustments go through a Credit or Debit Note instead." },
      { title: "AI reads vendor invoices", description: "Upload a vendor's invoice and the assistant extracts its lines into the booking's cost (AP) charges." },
    ],
    workflow: [
      { title: "Draft created", description: "Create Invoice on the booking turns its sale (AR) charge lines into a draft, still editable." },
      { title: "Reviewed", description: "Adjust descriptions, quantities and prices; add anything agreed after quotation." },
      { title: "Final", description: "Once the B/L number is set, finalizing locks it, assigns the number, and posts to the ledger." },
      { title: "Paid", description: "Payments record against it, partial or full; it shows as Unpaid in aging until cleared." },
    ],
    personas: [
      { role: "Accounting", detail: "Drafts, finalizes and records payments against invoices." },
      { role: "Management", detail: "Can view everything on this page." },
      { role: "Sales", detail: "Can see invoice status for their own customers." },
    ],
    faqs: [
      { q: "Why does finalizing need a B/L number?", a: "It stops an invoice being locked in for a shipment that, on paper, hasn't actually moved yet." },
      { q: "Can I edit a finalized invoice?", a: "No — adjustments go through a formally numbered Credit or Debit Note applied against it instead." },
      { q: "Can the assistant create an invoice for me?", a: "Yes, as a draft proposal you review and confirm — see the AI Assistant." },
    ],
    related: ["finance-receivables", "credit-notes", "accounting"],
  },

  "finance-receivables": {
    eyebrow: "Finance (Receivables & Payables)",
    title: "A mailbox that proposes matches, not one that decides for you",
    description:
      "A dedicated finance mailbox, separate from day-to-day correspondence, is scanned automatically for incoming payments. Routel proposes a match; a person confirms or rejects it.",
    stats: [
      { value: "2", label: "mailboxes — ops and finance, kept separate" },
      { value: "100%", label: "of matches need a human confirmation" },
    ],
    painPoints: [
      "Someone has to read a shared inbox every day looking for remittance emails and manually match them against open invoices.",
      "A payment sits unmatched for days because nobody noticed the email, while the invoice quietly ages.",
      "Receivables and payables live in two separate places that have to be reconciled by hand to see the full cash picture.",
    ],
    solutionIntro:
      "A second, dedicated mailbox is scanned automatically, proposing matches between incoming mail and open invoices or vendor bills — with a person confirming every single one before anything settles.",
    features: [
      { title: "A dedicated finance mailbox", description: "Separate from the mailbox Email Sync connects for day-to-day booking correspondence." },
      { title: "Automatic scanning", description: "Every incoming message is checked against open invoices and outstanding vendor bills." },
      { title: "AI-proposed matching suggestions", description: "A candidate pairing between an email and the invoice or bill it probably settles." },
      { title: "Human confirms or rejects", description: "Nothing is settled automatically — a person reviews every suggestion before a payment record is created." },
    ],
    workflow: [
      { title: "Mailbox connected", description: "Admin connects the finance inbox via Zoho or Microsoft." },
      { title: "Mail scanned", description: "Incoming messages are checked against open receivables and payables." },
      { title: "Match proposed", description: "A suggested pairing appears for review." },
      { title: "Confirmed or rejected", description: "Confirming creates the payment record; rejecting discards the suggestion." },
    ],
    personas: [
      { role: "Accounting", detail: "Connects the mailbox and confirms or rejects matching suggestions." },
      { role: "Management", detail: "Sees the combined receivables and payables position." },
    ],
    faqs: [
      { q: "Does this move money?", a: "No — it matches and records payments. Routel doesn't initiate bank transfers or payment runs." },
      { q: "Is this the same mailbox as Email Sync?", a: "No — it's a separate, dedicated finance mailbox, kept apart from day-to-day booking correspondence." },
      { q: "What if a suggested match is wrong?", a: "Reject it. Nothing is settled unless a person confirms the match is correct." },
    ],
    related: ["invoicing", "business-partners", "accounting"],
  },

  "credit-notes": {
    eyebrow: "Credit & Debit Notes",
    title: "Adjust an issued invoice without ever touching it",
    description:
      "A credit note reduces what's owed, a debit note increases it — both drafted, formally numbered, then applied against a specific finalized invoice, so the original document and the adjustment both stay on record.",
    stats: [
      { value: "2", label: "types — credit reduces, debit increases" },
      { value: "3", label: "steps — draft, number, apply" },
    ],
    painPoints: [
      "A billing correction after the fact means editing the original invoice, erasing the record of what was actually sent to the customer.",
      "Informal adjustments — a verbal discount, an unlogged extra charge — leave no clean audit trail.",
      "Applying an adjustment to the wrong invoice, or in the wrong currency, creates a reconciliation headache later.",
    ],
    solutionIntro:
      "A credit or debit note is its own formally numbered document, applied against a specific finalized invoice — the original stays untouched, and the adjustment is on record in its own right.",
    features: [
      { title: "Credit reduces, debit increases", description: "A pricing correction or waived charge reduces what's owed; a charge discovered after the fact increases it." },
      { title: "Draft → numbered → applied", description: "The same discipline as an invoice — a draft first, a real number on finalizing, then applied to its target." },
      { title: "Currency must match", description: "A note can only adjust an invoice in the same currency, avoiding silent conversion errors." },
      { title: "Finalized invoices only", description: "A note can't be applied to a draft — only to an invoice that's already locked." },
    ],
    workflow: [
      { title: "Draft", description: "Choose the invoice, the amount and the reason." },
      { title: "Numbered", description: "Finalizing assigns a real, sequential number." },
      { title: "Applied", description: "The note adjusts the balance owed on that specific invoice." },
    ],
    personas: [
      { role: "Accounting", detail: "Drafts, finalizes and applies credit and debit notes." },
    ],
    faqs: [
      { q: "Can I edit the original invoice instead?", a: "No — finalized invoices are locked. Adjustments always go through a note." },
      { q: "Can a note apply to a draft invoice?", a: "No — only to an invoice that's already finalized." },
      { q: "Where does an applied note show up?", a: "On the customer's statement of account and in AR aging, netted against the invoice it adjusts." },
    ],
    related: ["invoicing", "credit-applications", "accounting"],
  },

  "credit-applications": {
    eyebrow: "Credit Applications",
    title: "Trade credit that goes through a real approval",
    description:
      "A public form captures a business's details and the credit they're requesting. Staff review and approve or reject it, and an approved application becomes an active agreement — limit, currency, term and expiry.",
    stats: [
      { value: "1", label: "active agreement per customer at a time" },
      { value: "0", label: "silent auto-approvals" },
    ],
    painPoints: [
      "A credit limit gets raised informally — a phone call, an email — with no record of who approved it or why.",
      "An old credit agreement and a new one both sit active at once, leaving it unclear which actually applies.",
      "There's no public, self-serve way for a prospective customer to even start the conversation about trade credit.",
    ],
    solutionIntro:
      "A public application starts the process, a deliberate staff decision approves or rejects it, and approving a new agreement automatically retires whatever was active before — one clear, current state per customer.",
    features: [
      { title: "Public application form", description: "A business applies with its own details and requested amount, no login required." },
      { title: "Deliberate review", description: "Staff approve or reject — there's no default or silent auto-approval." },
      { title: "A real agreement", description: "Approval creates a credit agreement with a limit, currency, term and expiry, tied to the business partner record." },
      { title: "Auto-retirement of the old agreement", description: "Approving a new application automatically retires the customer's previous one." },
    ],
    workflow: [
      { title: "Business applies", description: "Public form, no account needed." },
      { title: "Staff review", description: "Who they are, what they're asking for, against any existing relationship." },
      { title: "Approved or rejected", description: "A deliberate decision either way." },
      { title: "Agreement active", description: "Limit, currency, term and expiry now apply on the partner record." },
    ],
    personas: [
      { role: "Accounting", detail: "Reviews, approves and rejects credit applications." },
    ],
    faqs: [
      { q: "Does a customer need a login to apply?", a: "No — it's a public form." },
      { q: "What happens to their old agreement if a new one is approved?", a: "It's automatically retired — only one agreement is ever active per customer." },
      { q: "Does the agreement expire?", a: "Yes — every approved agreement has a term and an expiry date, not an indefinite standing arrangement." },
    ],
    related: ["business-partners", "invoicing", "credit-notes"],
  },

  accounting: {
    eyebrow: "Accounting Reports",
    title: "Live books, computed from what's already there",
    description:
      "Profit & Loss, Cash Position, Trial Balance, General Ledger, AR and AP aging, AP outstanding, customer profitability, your country's tax report (SST, PPN or VAT) and Network Partners — every report computed on demand from invoices, payments, costs and expenses, with nothing to close first.",
    stats: [
      { value: "10", label: "reports, one shared calculation, plus data exports" },
      { value: "0", label: "manual journal entries" },
    ],
    painPoints: [
      "Month-end means waiting on someone to run a batch close before the numbers are trustworthy.",
      "Two different reports — one from ops, one from finance — never quite agree because they're built on different exports.",
      "Finding out margin was wrong happens weeks after the shipment closed, not while there's still time to do anything about it.",
    ],
    solutionIntro:
      "Every report reads straight from the same transactions as they're saved — an invoice, a payment, a vendor cost, an expense — so there's no separate close step and no second set of numbers to reconcile.",
    features: [
      { title: "General Ledger & Trial Balance", description: "Every posting by account, always balanced by construction." },
      { title: "Cash Position", description: "Bank and cash now, plus what's receivable and payable over the coming period." },
      { title: "P&L with net income", description: "Gross profit from booking margins, then operating expenses, down to net income." },
      { title: "Aging, profitability and tax", description: "AR and AP aging, AP outstanding and customer profitability, plus a tax report (SST, PPN or VAT, per country) ready for filing." },
    ],
    workflow: [
      { title: "A transaction is saved", description: "An invoice, payment, vendor cost or expense, recorded in its own module." },
      { title: "It posts immediately", description: "No batch, no manual journal entry — the ledger updates the moment it's saved." },
      { title: "Reports read live", description: "Every report on this page is computed on demand from what's already posted." },
    ],
    personas: [
      { role: "Accounting", detail: "Runs every report, reconciles the books." },
      { role: "Management", detail: "Reads P&L, cash position and profitability company-wide." },
    ],
    faqs: [
      { q: "Do I need to close the books before running a report?", a: "No — every report reads live from source transactions, nothing to close first." },
      { q: "Can Sales see reports?", a: "Reports are Finance territory — Sales and Pricing are gated to Quotations instead." },
      { q: "What currency are reports shown in?", a: "Your base currency (e.g. MYR), with USD transactions included at the exchange rate recorded on them." },
      { q: "Where are route margins?", a: "Route analytics moved to Routes, next to the route rates — revenue, cost, profit and margin per lane." },
    ],
    related: ["invoicing", "finance-receivables", "expenses"],
  },

  "bill-of-lading": {
    eyebrow: "Bill of Lading",
    title: "A House B/L that looks like a carrier issued it",
    description:
      "Generate Bill of Lading on a booking produces a House B/L with its container annexure straight from the booking's own data — parties, vessel, cargo description, incoterms — laid out the way a carrier's B/L actually looks.",
    stats: [
      { value: "1", label: "click to generate from booking data" },
      { value: "2", label: "documents — the B/L and its container annexure" },
    ],
    painPoints: [
      "A B/L built in a word processor from scratch means re-typing everything that's already sitting on the booking.",
      "A document that doesn't look like a real carrier B/L raises eyebrows with a bank, a consignee or customs.",
      "An edit to a container after the B/L was generated means the document and the booking quietly disagree.",
    ],
    solutionIntro:
      "The B/L is generated straight from the booking's own parties, route, vessel and container rows — formatted like a carrier's document, not a letterhead — and regenerating after a correction keeps the two in sync.",
    features: [
      { title: "Generated from booking data", description: "Shipper, consignee, notify party, vessel/voyage, ports, cargo description, weight, incoterms and freight terms, all pulled from the booking." },
      { title: "Container annexure included", description: "One row per container — number, type, seal, package count — referencing the B/L number." },
      { title: "Carrier-style layout", description: "Boxes, numbering and terms where a consignee, bank or customs officer expects to find them." },
      { title: "Numbered properly", description: "The House B/L number is assigned by Routel; the carrier's Master B/L number is entered once issued." },
    ],
    workflow: [
      { title: "Booking data checked", description: "Parties, route, vessel and containers confirmed accurate." },
      { title: "Generated", description: "One action produces the B/L and annexure as a single PDF, attached to the booking." },
      { title: "Corrected if needed", description: "Regenerate after any edit so the document matches the booking exactly." },
    ],
    personas: [
      { role: "Operations", detail: "Generates and regenerates the B/L (as can Admin and Management)." },
      { role: "Any signed-in staff", detail: "Can download it once it's on the booking." },
    ],
    faqs: [
      { q: "What happens if I edit a container after generating?", a: "Regenerate the document — the PDF is a snapshot, not a live view." },
      { q: "Who assigns the House B/L number?", a: "Routel, from your prefix and sequence, the first time it's generated." },
      { q: "Can the assistant generate it for me?", a: "Yes — ask it to generate the House B/L for a booking, subject to the same role check." },
    ],
    related: ["bookings", "documents", "invoicing"],
  },

  expenses: {
    eyebrow: "Expenses & Payroll",
    title: "Overheads that make net income actually mean something",
    description:
      "Operating costs outside bookings — rent, salaries, utilities, petty cash, commissions and custom categories — post straight to a proper operating-expense account the moment they're saved — the difference between gross profit and real net income.",
    stats: [
      { value: "6+", label: "built-in categories, each mapped to an account" },
      { value: "1", label: "click to see it reflected in net income" },
    ],
    painPoints: [
      "Booking charges tell you the margin on each shipment, but nobody's tracking whether the company as a whole is actually profitable.",
      "A spreadsheet of overheads at month-end means net income is always a week behind reality.",
      "Salary costs aren't tied to anyone in particular, so per-person payroll cost is a manual calculation every time.",
    ],
    solutionIntro:
      "Every overhead — rent, salaries, petty cash, commissions, currency exchange — posts to its own operating-expense account the moment it's saved, so net income in the P&L is always current.",
    features: [
      { title: "Built-in categories", description: "Rent, Salaries, Utilities, Petty cash, Commissions, Currency exchange, each mapped to an account." },
      { title: "Custom categories", description: "Admin and Management add new categories, each mapped to its own account, so reporting stays consistent." },
      { title: "Salary lines linked to staff", description: "Payroll cost recorded per person and per month — a cost record, not a full payroll engine." },
      { title: "Posts immediately", description: "Paid from a bank account, or left unpaid and tracked as a payable, either way reflected in the GL right away." },
    ],
    workflow: [
      { title: "Recorded", description: "Date, category, amount and currency, paid or unpaid." },
      { title: "Posted", description: "The entry hits its expense account immediately, and the bank/cash or payables account if relevant." },
      { title: "Reflected in net income", description: "The next P&L run already includes it." },
    ],
    personas: [
      { role: "Accounting", detail: "Records expenses and salaries day to day." },
      { role: "Admin", detail: "Adds custom categories and registers staff for salary linking." },
      { role: "Management", detail: "Sees the totals land in the P&L." },
    ],
    faqs: [
      { q: "Is this a full payroll system?", a: "No — it's a cost record, not a payroll engine. Routel doesn't compute statutory deductions or produce payslips." },
      { q: "Can an expense be left unpaid?", a: "Yes — it posts to Accounts Payable until it's paid." },
      { q: "Who can add a new expense category?", a: "Admin and Management, so the chart of accounts stays consistent no matter who records the cost." },
    ],
    related: ["accounting", "invoicing", "business-partners"],
  },

  documents: {
    eyebrow: "Document Management",
    title: "Every file where the shipment actually is",
    description:
      "Documents live on the booking, with file type verified from the file's actual content, plus an AI review queue that classifies incoming email attachments and suggests which booking they belong to.",
    stats: [
      { value: "2", label: "layers — manual upload, and AI-reviewed attachments" },
      { value: "100%", label: "of AI suggestions need a human approval" },
    ],
    painPoints: [
      "The packing list for a shipment is sitting in one person's inbox, and nobody else can find it without asking them directly.",
      "A mislabeled or disguised file type slips through because nothing actually checks what the file really is.",
      "Attachments on incoming emails have to be manually pulled out and filed against the right booking one by one.",
    ],
    solutionIntro:
      "Documents live with the booking, not in someone's inbox — uploaded manually or picked up automatically from linked email, with every file type verified and every AI suggestion reviewed by a person.",
    features: [
      { title: "Content-verified file types", description: "What a file actually is gets checked from its content, not just trusted from the filename." },
      { title: "Uploaded and generated, together", description: "Manual uploads sit alongside the quotation PDF, B/L, invoices and notes Routel generates automatically." },
      { title: "AI-classified attachments", description: "Incoming email attachments are classified — B/L, booking confirmation, booking request, vendor invoice or other — with a suggested booking match by booking number, then B/L, then container." },
      { title: "One-click actions, human-approved", description: "Approve & Create Booking, Approve & Update Booking, Approve & Create Invoice, or Link to Booking — a person approves every one." },
      { title: "Versioned, never overwritten", description: "A corrected upload keeps the old version; the activity log shows who replaced what." },
    ],
    workflow: [
      { title: "A file arrives", description: "Uploaded directly, or attached to mail through Email Sync." },
      { title: "Classified", description: "The AI queue suggests what it is and which booking it belongs to." },
      { title: "Approved", description: "A person picks the action — create or update a booking, create an invoice, or link it — before anything is filed." },
      { title: "Findable", description: "Filtered by type on the booking, or found instantly by asking the assistant." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Views, downloads, uploads and labels documents, and clears the AI review queue." },
    ],
    faqs: [
      { q: "Does the AI file documents automatically?", a: "No — every suggestion needs a person to approve or reject it first." },
      { q: "What happens to the old version if I upload a correction?", a: "It's kept, not overwritten — the newest is marked current and the activity log shows the change." },
      { q: "Can I find a document without opening the booking?", a: "Yes — ask the assistant, e.g. \"send me the House B/L for our latest Port Klang booking.\"" },
    ],
    related: ["email-sync", "bookings", "bill-of-lading"],
  },

  "email-sync": {
    eyebrow: "Email Sync",
    title: "Correspondence that files itself against the right booking",
    description:
      "Connect a Zoho or Microsoft 365 mailbox and incoming and outgoing mail lands in the Email Archive, linked to its booking automatically when the booking number appears in it or the thread follows on from linked mail — or linked by hand.",
    stats: [
      { value: "2", label: "supported providers — Zoho and Microsoft 365" },
      { value: "1", label: "inbox, not one per person" },
    ],
    painPoints: [
      "The only record of a carrier's reply to a booking question is in one person's personal inbox.",
      "Finding an old email thread about a shipment means searching a mailbox by vague keywords and hoping.",
      "Attachments on booking-related mail have to be manually downloaded and filed, one by one.",
    ],
    solutionIntro:
      "Connect the mailbox once, and correspondence that mentions a booking number attaches to that booking automatically — travelling with the shipment instead of sitting in someone's inbox.",
    features: [
      { title: "Zoho or Microsoft 365", description: "Connect through the provider's own standard authorization screen — Routel never stores the password directly." },
      { title: "Automatic linking", description: "Mail links to a booking when its booking number appears in it, or when it follows on in a thread that's already linked. Anything else can be linked manually." },
      { title: "Attachments feed document review", description: "Linked attachments flow into the AI-classified document queue instead of staying stuck in email." },
      { title: "Separate from the finance mailbox", description: "A distinct, dedicated inbox handles payment matching — see Finance (Receivables & Payables)." },
    ],
    workflow: [
      { title: "Connected", description: "Admin authorizes the mailbox via Zoho or Microsoft 365." },
      { title: "Scanned", description: "New mail is checked for a booking number and for threads already linked to a booking." },
      { title: "Linked", description: "Matching mail attaches to the right booking automatically; the rest can be linked by hand." },
      { title: "Findable", description: "Ask the assistant instead of searching the mailbox directly." },
    ],
    personas: [
      { role: "Admin", detail: "Connects and manages mailbox sync." },
      { role: "Any signed-in staff", detail: "Sees linked mail on any booking they can already open." },
    ],
    faqs: [
      { q: "Is Gmail or Google Workspace supported?", a: "Not yet — Zoho and Microsoft 365 are the supported providers." },
      { q: "Does Routel see my password?", a: "No — authorization happens through the provider's own standard screen." },
      { q: "Is this the same inbox used for payment matching?", a: "No — that's a separate, dedicated finance mailbox. See Finance (Receivables & Payables)." },
    ],
    related: ["documents", "bookings", "finance-receivables"],
  },

  tracking: {
    eyebrow: "Public Shipment Tracking",
    title: "Answer 'where is my shipment' without a login",
    description:
      "Your own customers can check a status timeline with no account — but only with two pieces of information together, and never the commercially sensitive details.",
    stats: [
      { value: "2", label: "pieces of information required to look anything up" },
      { value: "0", label: "sensitive details shown — no B/L, vessel or exact dates" },
    ],
    painPoints: [
      "\"Where is my shipment\" is the single most common customer email, and answering it means stopping to check the booking yourself every time.",
      "A tracking page that shows too much — container numbers, vessel names, exact dates — leaks information a competitor could use.",
      "A tracking link that works off a guessable number alone can be used to peek at shipments that aren't even the requester's.",
    ],
    solutionIntro:
      "A public page, no login, answers the status question directly — but only once both an exact reference and proof of relationship are given, and only with a status timeline, never the sensitive details.",
    features: [
      { title: "Two-piece lookup", description: "The booking number, the B/L number or one full container number, plus the company name or account ID it belongs to." },
      { title: "No partial matches", description: "No search-by-keyword — guessing numbers can't be used to fish for other customers' shipments." },
      { title: "Status timeline only", description: "The same status lifecycle used internally, with no master B/L, container numbers, vessel or exact dates shown." },
      { title: "One link for every shipment", description: "Customers plug in their own reference rather than you generating a unique link per booking." },
    ],
    workflow: [
      { title: "Customer visits the page", description: "No account needed." },
      { title: "Enters two references", description: "A booking, B/L or full container number, plus their company name or account ID." },
      { title: "Sees the status", description: "The status timeline, from Booking Pending to Shipment Closed — nothing more." },
    ],
    personas: [
      { role: "Your customers", detail: "Check status without calling or emailing your team." },
      { role: "Operations", detail: "Keeps the booking's status current, which is all the tracking page reflects." },
    ],
    faqs: [
      { q: "Does a customer need to log in?", a: "No — it's a public page, scoped by the two-piece lookup instead." },
      { q: "Can someone see another customer's shipment by guessing a number?", a: "No — a lookup needs both the exact reference and proof of relationship together." },
      { q: "Can a customer see the vessel name or container numbers?", a: "No — only the status timeline. Sensitive details stay inside the product." },
    ],
    related: ["bookings", "business-partners"],
  },

  "labeling-center": {
    eyebrow: "Labeling Center",
    title: "Flag it, and it won't get lost",
    description:
      "Put a label on any record — a booking, an invoice, a business partner, a quotation — with a note, a follow-up date and an assignee, without standing up a separate task-tracking tool.",
    stats: [
      { value: "3", label: "things a label carries — note, date, assignee" },
      { value: "0", label: "separate task tools needed" },
    ],
    painPoints: [
      "A \"come back to this\" moment gets handled with a sticky note, a Slack message, or just hoping you remember.",
      "Follow-ups fall through the cracks between the person who noticed the issue and the person who's supposed to act on it.",
      "Standing up a whole separate task-tracking tool is overkill for flagging a handful of records that need a second look.",
    ],
    solutionIntro:
      "A label lives on the record itself — a note, a follow-up date, an assignee — so whoever opens that booking or invoice sees it in context, with no separate list to remember to check.",
    features: [
      { title: "Label any record", description: "Bookings, invoices, customers and vendors, quotations and more — on a booking, labels sit next to its tasks and follow-ups." },
      { title: "A note", description: "Free text on what needs attention and why." },
      { title: "A follow-up date", description: "Overdue labels are easy to spot at a glance." },
      { title: "An assignee", description: "Doesn't have to be the person who created the label — ownership is explicit." },
    ],
    workflow: [
      { title: "Something needs a second look", description: "On a booking, invoice, partner or quotation." },
      { title: "Labeled", description: "A note, a follow-up date, and whoever owns the follow-up." },
      { title: "Surfaced in context", description: "Shows directly on the record, and in the assignee's own view of what's assigned to them." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Can label any record they can already open, and assign it to anyone with access." },
    ],
    faqs: [
      { q: "Do I need a separate task tool alongside this?", a: "No — it's built specifically to avoid needing one for this kind of flagging." },
      { q: "Can I assign a label to someone else?", a: "Yes — the assignee doesn't have to be whoever created the label." },
      { q: "Can the assistant create a label for me?", a: "Yes — describe what needs following up on and it proposes a label with the note, date and assignee filled in." },
    ],
    related: ["bookings", "business-partners", "invoicing"],
  },

  roles: {
    eyebrow: "Role-based Access",
    title: "Six roles, enforced the same way everywhere",
    description:
      "Admin and Management see every module, narrowing only at system configuration. Accounting owns Finance, Reports and Expenses, Sales and Pricing own Quotations, Operations owns the Bill of Lading, and Operations and Sales edit bookings — which every signed-in member of staff can read.",
    stats: [
      { value: "6", label: "named roles" },
      { value: "1", label: "set of rules, enforced the same in the UI and the AI assistant" },
    ],
    painPoints: [
      "Permissions configured as checkboxes on a settings screen drift out of sync with what's actually enforced underneath.",
      "The AI assistant quietly has more (or less) access than the person using it, because it was wired up separately from the real permission system.",
      "Walling off entire modules by department means people constantly asking for exceptions just to get their work done.",
    ],
    solutionIntro:
      "Permissions are checked on the server for every request, by the same rules whether the action came from a screen or from a sentence typed into the assistant — narrowing only the specific sensitive modules, not the whole product.",
    features: [
      { title: "Six named roles", description: "Admin, Management, Accounting, Operations, Sales, Pricing — each with a clear, specific scope — plus general staff." },
      { title: "Admin and Management see everything", description: "The only difference: system configuration (users, roles, settings) stays Admin-only." },
      { title: "Narrow, specific gates", description: "Accounting → Finance, Reports & Expenses; Sales/Pricing → Quotations; Operations → Bill of Lading; Operations/Sales → editing bookings." },
      { title: "Open by default elsewhere", description: "Any signed-in staff can read bookings, and Business Partners, Documents and the Labeling Center are open to everyone." },
    ],
    workflow: [
      { title: "A user signs in", description: "With exactly one role." },
      { title: "Every request is checked", description: "Server-side, for every screen and every assistant action." },
      { title: "The same rule, every path", description: "A UI click and an assistant request hit the identical permission check." },
    ],
    personas: [
      { role: "Admin", detail: "Every module, plus user management and system configuration." },
      { role: "Management", detail: "Every module Admin sees, except system configuration." },
      { role: "Accounting / Operations / Sales / Pricing", detail: "Each gated to their specific sensitive modules, open elsewhere." },
    ],
    faqs: [
      { q: "Can the assistant do something a user couldn't do manually?", a: "No — it acts as the signed-in user and is checked against the exact same role rules." },
      { q: "Does every module require a specific role?", a: "No — only the ones explicitly gated. Most of the product is open to any signed-in staff member." },
      { q: "Who can create users or change roles?", a: "Only Admin." },
    ],
    related: ["ai-assistant", "bookings", "quotations"],
  },

  "ai-assistant": {
    eyebrow: "AI Assistant",
    title: "Meet your AI operations co-worker",
    description:
      "Routel's assistant sets up your company in a ten-minute chat, then works alongside your team: it creates quotations, bookings and invoices, records payments and answers \"who owes us most?\" from live data, in English or Arabic. It proposes every change on a card and you confirm it before anything is saved.",
    stats: [
      { value: "10 min", label: "to set up your company, by chat" },
      { value: "0", label: "records saved without your confirmation" },
      { value: "49/50", label: "scenarios passed in the Arabic & English exam run before every change" },
    ],
    painPoints: [
      "Setting up a new system means a consultant, a spreadsheet of settings and weeks before the first invoice goes out.",
      "Simple requests — \"who owes us most?\", \"invoice this shipment\" — mean clicking through several screens to do what one sentence could.",
      "An AI tool bolted onto a product often has looser rules than the product itself, or answers from guesses instead of your data.",
    ],
    solutionIntro:
      "Routel's assistant is built into the system: it calls the same business functions as the screens, with the same validation, role permissions, credit limits and numbering, and answers from your live data. It proposes; you confirm.",
    features: [
      { title: "Guided company setup", description: "A new company is welcomed with an ordered checklist and a progress bar: name in English and Arabic, registration number, document numbering, logo, address, tax number, bank details, team and roles, charge types. It leads one step at a time and fills in what it can read from a pasted registration certificate or letterhead." },
      { title: "Reminders for missing details", description: "Anything still empty after setup — logo, bank details, tax number — stays visible until it's filled in, with a \"Fill them in now\" button and one gentle reminder per conversation." },
      { title: "Does the work, with confirmation", description: "Quotations, bookings, invoices from booking charges, receipts, AP payments, credit notes, House B/Ls, notes and tasks, business partners, users, charge types, route rates, linking e-mails to bookings, approving registrations and credit applications. Each one shows a card with the exact fields and amounts." },
      { title: "Same rules as the screens", description: "It calls the same business functions as the manual pages: validation, role permissions, credit limits, currency checks and numbering. A sales user can't do what the sales role can't do." },
      { title: "Knows the whole system", description: "Answers from live data: search across bookings, containers, invoices, partners and ports; AR/AP aging, P&L, cash, tax summary and lane margins; e-mails per booking; documents waiting for review; website leads." },
      { title: "Daily brief", description: "A Today card for your role: overdue invoices, bills due, delivered-but-not-invoiced bookings, stale drafts, expiring quotes, follow-ups, arrivals and tasks. Built straight from the database." },
      { title: "Reads documents", description: "Upload a PDF or photo — a booking confirmation, an invoice, a certificate — and it extracts the fields." },
      { title: "Memory and context", description: "It remembers preferences (\"always answer in Arabic\") across conversations, which you can list or forget, and knows the page you're on and the partner or booking you just discussed." },
      { title: "User guide built in", description: "\"How do I finalize an invoice?\" is answered from Routel's own user guide, not guessed." },
      { title: "Undo and audit log", description: "Every confirmed action is logged: who did what, and the outcome. Notes, tasks, follow-ups, filed e-mails and draft quotations can be undone for 10 minutes; anything that moved money or got a document number is reversed by its own document, as accounting requires." },
      { title: "Cost control", description: "Admins see messages and model usage per day, and set a daily message limit per person." },
      { title: "Arabic and English", description: "Ask in either language, including Gulf and Malaysian phrasing. The whole interface is translated." },
    ],
    workflow: [
      { title: "You ask", description: "In Arabic or English, from any page — and attach a document if you have one." },
      { title: "It works it out", description: "It searches your live data, reads the attachment and calls the same functions the screens use." },
      { title: "It proposes", description: "Every change appears as a card with the exact fields and amounts." },
      { title: "You confirm", description: "Only the Confirm button saves. The action is logged, and safe ones can be undone for 10 minutes." },
    ],
    personas: [
      { role: "Admin", detail: "Sets the company up by chat in ten minutes, then keeps an eye on usage and daily limits." },
      { role: "Operations", detail: "Creates bookings and House B/Ls, files e-mails to bookings and keeps tasks and follow-ups moving." },
      { role: "Accounting", detail: "Invoices from booking charges, records receipts and AP payments, issues credit notes." },
      { role: "Sales & Management", detail: "Builds quotations, and asks \"who owes us most?\" or for lane margins and gets the answer from live data." },
    ],
    faqs: [
      { q: "Can it save something without my confirmation?", a: "No. The model never writes on its own — only the Confirm button saves." },
      { q: "Does it have more access than I do?", a: "No. It has exactly the permissions of the signed-in user, and calls the same functions as the screens." },
      { q: "Is my data stored by the AI provider?", a: "No. Requests are sent with storage turned off, so nothing is kept at the AI provider." },
      { q: "What if I confirm something by mistake?", a: "Notes, tasks, follow-ups, filed e-mails and draft quotations can be undone for 10 minutes. Anything that moved money or got a document number is reversed by its own document, such as a credit note." },
      { q: "Which plans include it?", a: "Growth and Enterprise include the full assistant. On Free and Starter, the assistant helps the admin set the company up, for up to 30 days." },
    ],
    related: ["bookings", "invoicing", "roles"],
  },

  "visitor-tracking": {
    eyebrow: "Website Visitor Tracking",
    title: "See who's looking at your branded site",
    description:
      "Run Routel on your own custom domain and visitor activity on that site is tracked automatically — no separate analytics tool to wire up.",
    stats: [
      { value: "0", label: "separate analytics setup required" },
      { value: "1", label: "domain — your own, not a shared Routel address" },
    ],
    painPoints: [
      "Running on your own branded domain is pointless if you have no idea whether anyone's actually visiting it.",
      "Standing up a separate analytics tool just to see visitor numbers is one more login and one more thing to maintain.",
    ],
    solutionIntro:
      "When Routel runs on your own custom domain, visitor activity is tracked as part of the package — visits, pages and timing, without extra setup.",
    features: [
      { title: "Built into your custom domain", description: "No separate analytics account or script to install." },
      { title: "Visitor activity at a glance", description: "How many visitors, which pages, and when." },
    ],
    workflow: [
      { title: "Custom domain set up", description: "Your own address instead of a shared Routel one." },
      { title: "Tracking starts automatically", description: "No extra configuration needed." },
    ],
    personas: [
      { role: "Admin / Management", detail: "View visitor activity on the branded site." },
    ],
    faqs: [
      { q: "Does this track activity inside the Routel app?", a: "No — it's visits to your public-facing branded site, not in-app activity, which already lives in each booking's activity log." },
      { q: "Do I need to set up Google Analytics separately?", a: "No — it comes with the custom domain." },
    ],
    related: ["ai-assistant", "email-sync"],
  },

  compliance: {
    eyebrow: "Audit & Compliance",
    title: "A record of who changed what, and when",
    description:
      "Every booking carries an activity log of field changes, status changes and every Booking Confirmation issued — including anything done through the AI assistant, attributed to the person who confirmed it.",
    stats: [
      { value: "100%", label: "of booking changes logged, person and timestamp" },
      { value: "0", label: "edits the log itself allows" },
    ],
    painPoints: [
      "A number changes on a booking and nobody can say who changed it or why.",
      "Actions taken through an AI tool show up as \"the system\" instead of the person who actually confirmed them.",
      "An audit trail that can itself be edited isn't really an audit trail.",
    ],
    solutionIntro:
      "Every change to a booking — manual or through the assistant — is logged with the person's name, the time, and the before/after values, and the log itself can't be edited.",
    features: [
      { title: "An activity log on every booking", description: "Field changes, status changes and every confirmation issued — all logged." },
      { title: "Assistant actions attributed to a person", description: "Recorded under the name of whoever confirmed them, never as \"the assistant.\"" },
      { title: "Generated documents on file", description: "Kept with the shipment they belong to, not a separate archive." },
      { title: "Role-scoped visibility", description: "Who can see what in the log follows the same role rules as the rest of the product." },
    ],
    workflow: [
      { title: "A change is made", description: "Manually, or confirmed through the assistant." },
      { title: "Logged immediately", description: "Person, timestamp, before and after values." },
      { title: "Visible, not editable", description: "The log can be read by anyone with access to the booking, but never altered." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Can see the activity log on any booking they can open." },
    ],
    faqs: [
      { q: "Can the audit log be edited or deleted?", a: "No — it's an append-only record." },
      { q: "Does an action through the assistant show up differently?", a: "No — it's logged under the name of the person who confirmed it, with the same detail as a manual change." },
    ],
    related: ["bookings", "ai-assistant", "roles"],
  },
};

/** Platform pages in the given locale; untranslated pages fall back to English. */
export function getPlatformContent(locale: Locale): Record<string, PlatformContent> {
  if (locale === "en") return platformContent;
  return Object.fromEntries(
    Object.entries(platformContent).map(([slug, en]) => [slug, platformContentAr[slug] ?? en]),
  );
}
