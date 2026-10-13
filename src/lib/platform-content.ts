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
  shipments: {
    eyebrow: "Shipments & Jobs",
    title: "One job record, from enquiry to delivered",
    description:
      "Every shipment is one record — POL/POD, shipper and consignee, vessel and voyage, containers, weight and cargo description, B/L numbers and incoterms — moving through the same 11-stage lifecycle everywhere it shows up.",
    stats: [
      { value: "11", label: "status stages, booking pending to delivered" },
      { value: "1", label: "record every other module hangs off" },
      { value: "0", label: "re-typed container numbers between screens" },
    ],
    painPoints: [
      "The vessel name lives in the booking email, the container list in a spreadsheet, and the status in whoever you last called.",
      "Different people's mental model of 'where the shipment is' drifts apart the moment it's not written down the same way everywhere.",
      "A customer's 'where's my container' email means re-checking three places before you can answer.",
    ],
    solutionIntro:
      "Routel gives the shipment one home. Everything — the booking, the containers, the Bill of Lading, the invoice, the vendor costs, the documents — hangs off the same job record, so there's one place to check and one status everyone sees.",
    features: [
      { title: "Every field that matters", description: "POL/POD, shipper/consignee, vessel/voyage, containers, weight and cargo description, B/L numbers, incoterms, and the full chain of operational dates from cutting date to ETA." },
      { title: "An 11-stage lifecycle", description: "Booking pending → booking confirmed → cargo received → SI submitted → vessel loaded → departed → in transit → arrived → customs clearance → delivered, or cancelled." },
      { title: "Same badge, everywhere", description: "The Jobs list, the Dashboard, customer and vendor views, and the public tracking page all read the same status off the same record." },
      { title: "A complete audit log", description: "Every field edit, status change and document upload is logged with who did it and when — never editable after the fact." },
    ],
    workflow: [
      { title: "Created", description: "From an accepted quotation, directly by Operations, or by describing it to the AI assistant." },
      { title: "Booked and documented", description: "The booking, containers and documents attach to the same job as they come in." },
      { title: "Tracked", description: "Status moves through its 11 stages as the shipment actually progresses, visible to your team and, within limits, your customer." },
      { title: "Closed out", description: "Delivered status locks the operational record; invoices, costs and reports stay fully visible." },
    ],
    personas: [
      { role: "Operations", detail: "Lives in the job day to day — booking, containers, documents, status." },
      { role: "Sales", detail: "Opens the jobs that belong to their customers to check on progress." },
      { role: "Management", detail: "Sees every job, company-wide, without asking anyone for an update." },
    ],
    faqs: [
      { q: "Who can open a job?", a: "Any signed-in member of staff — the core record isn't walled off by department. Specific actions, like generating the Bill of Lading, stay gated to the relevant role." },
      { q: "Can a customer see the job directly?", a: "Not the full record — they see a status timeline on the public tracking page, never commercially sensitive details like the master B/L or vessel name." },
      { q: "What happens when a shipment is cancelled?", a: "Cancelled is a lifecycle branch, not a deletion — the job and everything recorded against it stays on file." },
    ],
    related: ["bookings", "bill-of-lading", "tracking"],
  },

  bookings: {
    eyebrow: "Bookings",
    title: "The carrier's confirmation, read once and used everywhere",
    description:
      "Record a vessel booking against its job — carrier, vessel and voyage, equipment, cut-offs, shipper/consignee/notify party — or just upload the confirmation PDF and let the assistant fill it in for you.",
    stats: [
      { value: "1", label: "upload instead of a form to fill by hand" },
      { value: "0", label: "times you retype the vessel name" },
    ],
    painPoints: [
      "A booking confirmation PDF arrives, and the same vessel, voyage and cut-off dates get retyped into a spreadsheet, an email to the customer, and eventually the Bill of Lading.",
      "Rollovers and schedule changes mean updating the same details in multiple places, and hoping nothing gets missed.",
      "Cut-off dates buried in a PDF attachment are easy to lose track of until it's too late.",
    ],
    solutionIntro:
      "A booking is recorded once, against its job, and feeds the vessel, voyage and dates straight through to the Bill of Lading — with AI reading the confirmation PDF so nobody has to type it twice.",
    features: [
      { title: "AI reads the confirmation", description: "Upload a booking confirmation PDF and GPT-4.1 extracts vessel, voyage, dates, equipment and booking reference to prefill the form." },
      { title: "Shipper, consignee, notify party", description: "Captured on the booking itself, so they're already correct when the B/L is generated later." },
      { title: "Every cut-off tracked", description: "Cargo, documentation and any other deadline the carrier gives you, attached to the job instead of buried in an inbox." },
      { title: "Rollovers handled cleanly", description: "Edit the booking when the carrier changes something — the job updates with it, logged in the audit trail." },
    ],
    workflow: [
      { title: "Confirmation arrives", description: "By email or upload, from the carrier or your own Email Sync inbox." },
      { title: "Fields extracted", description: "The assistant reads the PDF and proposes a booking with every field filled in." },
      { title: "Checked and confirmed", description: "A person checks the proposal against the paper confirmation and confirms it." },
      { title: "Job updated", description: "Vessel, voyage, ETD and ETA populate the job and are ready for the Bill of Lading." },
    ],
    personas: [
      { role: "Operations", detail: "Creates and edits bookings as carriers confirm or change them." },
      { role: "Any signed-in staff", detail: "Can view the booking and download the confirmation once the job is open." },
    ],
    faqs: [
      { q: "Do I have to type the booking in by hand?", a: "No — upload the confirmation PDF and the assistant extracts the fields for you to check and confirm." },
      { q: "What happens on a schedule change?", a: "Edit the booking with the new details; the job updates and the change is logged. Regenerate the B/L if it was already issued." },
      { q: "Does one job ever have more than one booking?", a: "Usually one job has one booking, matching one vessel movement." },
    ],
    related: ["shipments", "bill-of-lading", "email-sync"],
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
      "The same company is a customer on one job and a vendor on another, but your system makes you register them twice and keep two records in sync.",
      "Checking what a partner owes you and what you owe them means pulling two separate reports and adding them up by hand.",
      "A statement of account only tells half the story if it only covers one side of the relationship.",
    ],
    solutionIntro:
      "One partner record carries payment terms, a credit limit, contacts and a combined AR+AP ledger — whichever side of a deal they're playing on a given job.",
    features: [
      { title: "No 'add a customer' vs 'add a vendor' step", description: "One record; an invoice references them as the customer, a vendor cost references them as the vendor." },
      { title: "Combined AR + AP ledger", description: "What they owe you and what you owe them, netted in one place instead of two disconnected balances." },
      { title: "Printable statement of account", description: "Opening balance, invoices, payments, costs and closing balance for a period, generated as PDF." },
      { title: "Vendor cost tracking per job", description: "Costs recorded in the vendor's own currency, converted at the job's exchange rate, feeding gross profit immediately." },
    ],
    workflow: [
      { title: "Create the partner once", description: "Name, contacts, payment terms — no need to decide upfront whether they're a customer or a vendor." },
      { title: "Use them on a job", description: "Reference them as the customer being invoiced, the vendor being billed, or both across different jobs." },
      { title: "Track the relationship", description: "The combined ledger and statement of account update as invoices, costs and payments are recorded." },
    ],
    personas: [
      { role: "Accounting", detail: "Manages payment terms, credit limits and statements." },
      { role: "Operations", detail: "Records vendor costs against jobs as they come in." },
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
      "Store vendor buying rates by route and container type with a validity window that flags expiry 14 days out, bulk-import a whole rate sheet from Excel, and convert an accepted quotation straight into a job.",
    stats: [
      { value: "14", label: "days warning before a rate expires" },
      { value: "1", label: "click from accepted quote to live job" },
    ],
    painPoints: [
      "A quote goes out built on a rate that quietly expired last week, and nobody notices until the margin doesn't add up.",
      "A new rate sheet from a vendor means re-typing dozens of lane and container-type combinations by hand.",
      "An accepted quotation becomes a job by re-entering the same route, equipment and pricing that was already captured once.",
    ],
    solutionIntro:
      "Keep the rate book current with 14-day expiry warnings and Excel bulk import, then let an accepted quotation carry its route, equipment and pricing straight into a job — nothing re-typed.",
    features: [
      { title: "Rates by route and container type", description: "One vendor's buying price for one lane and one equipment type, valid for a period." },
      { title: "14-day expiry warning", description: "Rates flag as expiring before they lapse, so Pricing can chase a refresh ahead of time, not after a quote fails." },
      { title: "Bulk import from Excel", description: "Load a whole rate sheet in one go instead of entering lanes one at a time." },
      { title: "One-click conversion to a job", description: "An accepted quotation carries its customer, route, equipment and vendor rate straight into a new job." },
    ],
    workflow: [
      { title: "Rate stored", description: "Pricing records or imports the vendor's buying rate for a lane and container type." },
      { title: "Quotation built", description: "Sales picks a valid rate, sets the selling price, and adds any other charges." },
      { title: "Sent and tracked", description: "Draft → sent → accepted, declined or expired." },
      { title: "Converted to a job", description: "An accepted quotation becomes a job in one step, the rate carried across as the expected vendor cost." },
    ],
    personas: [
      { role: "Pricing", detail: "Owns the rate book — route rates by lane, container type and validity." },
      { role: "Sales", detail: "Builds and sends quotations on top of current rates." },
      { role: "Operations", detail: "Also has Route Rate access, and completes the booking once a quotation converts." },
    ],
    faqs: [
      { q: "What happens to an expired rate?", a: "It's kept for history but hidden from new quotations by default — nothing is deleted." },
      { q: "Can I import a whole rate sheet at once?", a: "Yes — bulk import from Excel instead of entering each lane individually." },
      { q: "Who manages the rate book versus who quotes?", a: "Pricing (and Admin) manage route rates; Sales (and Admin) build quotations from them." },
    ],
    related: ["shipments", "invoicing", "business-partners"],
  },

  invoicing: {
    eyebrow: "Invoicing",
    title: "Invoices that can't go out ahead of the shipment",
    description:
      "A draft invoice is clearly watermarked until it's finalized — and finalizing is only possible once the job's Bill of Lading number is set, so nothing bills a shipment that hasn't actually moved.",
    stats: [
      { value: "2", label: "currencies, MYR and USD" },
      { value: "1", label: "rule: no B/L number, no finalized invoice" },
    ],
    painPoints: [
      "An invoice goes out before the shipment's documentation is even settled, and the numbers don't match what eventually ships.",
      "A draft invoice looks identical to a real one, so it's easy for a customer (or your own team) to mistake one for the other.",
      "Reading a vendor's cost invoice and re-typing every line into your own system is slow and invites typos.",
    ],
    solutionIntro:
      "Invoices move from a clearly-watermarked draft to a locked, finalized document only once the job's B/L number exists — with AI reading vendor invoices to save the re-typing.",
    features: [
      { title: "Draft, clearly marked", description: "Prints \"DRAFT TAX INVOICE — NOT OFFICIAL\" until it's finalized, so it's never confused for a real bill." },
      { title: "B/L number required to finalize", description: "An invoice can't be locked in until the shipment's Bill of Lading number is set." },
      { title: "Locked line items", description: "Finalizing assigns the real invoice number and stops further edits — adjustments go through a Credit or Debit Note instead." },
      { title: "AI reads vendor invoices", description: "Upload a vendor's cost invoice and the assistant extracts the line items to prefill your own." },
    ],
    workflow: [
      { title: "Draft created", description: "From the job's selling price, with lines still editable." },
      { title: "Reviewed", description: "Adjust descriptions, quantities and prices; add anything agreed after quotation." },
      { title: "Finalized", description: "Once the B/L number is set, finalizing locks it, assigns the number, and posts to the ledger." },
      { title: "Paid", description: "Payments record against it, partial or full, tracked in aging until cleared." },
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
      { title: "A dedicated finance mailbox", description: "Separate from the mailbox Email Sync connects for day-to-day job correspondence." },
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
      { q: "Is this the same mailbox as Email Sync?", a: "No — it's a separate, dedicated finance mailbox, kept apart from day-to-day job correspondence." },
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
      "General Ledger, Trial Balance, Cash Position, P&L, AR and AP aging, an SST summary and customer profitability — every report computed on demand from invoices, payments, costs and expenses, with nothing to close first.",
    stats: [
      { value: "7", label: "reports, one shared calculation" },
      { value: "0", label: "manual journal entries" },
    ],
    painPoints: [
      "Month-end means waiting on someone to run a batch close before the numbers are trustworthy.",
      "Two different reports — one from ops, one from finance — never quite agree because they're built on different exports.",
      "Finding out margin was wrong happens weeks after the job closed, not while there's still time to do anything about it.",
    ],
    solutionIntro:
      "Every report reads straight from the same transactions as they're saved — an invoice, a payment, a vendor cost, an expense — so there's no separate close step and no second set of numbers to reconcile.",
    features: [
      { title: "General Ledger & Trial Balance", description: "Every posting by account, always balanced by construction." },
      { title: "Cash Position", description: "Bank and cash now, plus what's receivable and payable over the coming period." },
      { title: "P&L with net income", description: "Gross profit from job margins, then operating expenses, down to net income." },
      { title: "AR/AP aging and SST summary", description: "Overdue receivables and payables bucketed by age, plus a tax summary ready for filing." },
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
      { q: "What currency are reports shown in?", a: "MYR, with USD transactions included at the exchange rate recorded on them." },
    ],
    related: ["invoicing", "finance-receivables", "expenses"],
  },

  "bill-of-lading": {
    eyebrow: "Bill of Lading",
    title: "A House B/L that looks like a carrier issued it",
    description:
      "Generate a House Bill of Lading with its container annexure directly from a job's own data — parties, vessel, cargo description, incoterms — laid out the way a carrier's B/L actually looks.",
    stats: [
      { value: "1", label: "click to generate from job data" },
      { value: "2", label: "documents — the B/L and its container annexure" },
    ],
    painPoints: [
      "A B/L built in a word processor from scratch means re-typing everything that's already sitting on the job.",
      "A document that doesn't look like a real carrier B/L raises eyebrows with a bank, a consignee or customs.",
      "An edit to a container after the B/L was generated means the document and the job quietly disagree.",
    ],
    solutionIntro:
      "The B/L is generated straight from the job's own parties, route, vessel and container rows — formatted like a carrier's document, not a letterhead — and regenerating after a correction keeps the two in sync.",
    features: [
      { title: "Generated from job data", description: "Shipper, consignee, notify party, vessel/voyage, ports, cargo description, weight, incoterms and freight terms, all pulled from the job." },
      { title: "Container annexure included", description: "One row per container — number, type, seal, package count — referencing the B/L number." },
      { title: "Carrier-style layout", description: "Boxes, numbering and terms where a consignee, bank or customs officer expects to find them." },
      { title: "Numbered properly", description: "The House B/L number is assigned by Routel; the carrier's Master B/L number is entered once issued." },
    ],
    workflow: [
      { title: "Job data checked", description: "Parties, route, vessel and containers confirmed accurate." },
      { title: "Generated", description: "One action produces the B/L and annexure as a single PDF, attached to the job." },
      { title: "Corrected if needed", description: "Regenerate after any edit so the document matches the job exactly." },
    ],
    personas: [
      { role: "Operations", detail: "Generates and regenerates the B/L." },
      { role: "Any signed-in staff", detail: "Can download it once it's on the job." },
    ],
    faqs: [
      { q: "What happens if I edit a container after generating?", a: "Regenerate the document — the PDF is a snapshot, not a live view." },
      { q: "Who assigns the House B/L number?", a: "Routel, from your prefix and sequence, the first time it's generated." },
      { q: "Can the assistant generate it for me?", a: "Yes — ask it to generate the House B/L for a job, subject to the same role check." },
    ],
    related: ["shipments", "bookings", "documents"],
  },

  expenses: {
    eyebrow: "Expenses & Payroll",
    title: "Overheads that make net income actually mean something",
    description:
      "Rent, salaries, utilities, petty cash, commissions and custom categories post straight to a proper operating-expense account the moment they're saved — the difference between gross profit and real net income.",
    stats: [
      { value: "6+", label: "built-in categories, each mapped to an account" },
      { value: "1", label: "click to see it reflected in net income" },
    ],
    painPoints: [
      "Job costs tell you the margin on shipments, but nobody's tracking whether the company as a whole is actually profitable.",
      "A spreadsheet of overheads at month-end means net income is always a week behind reality.",
      "Salary costs aren't tied to anyone in particular, so per-person payroll cost is a manual calculation every time.",
    ],
    solutionIntro:
      "Every overhead — rent, salaries, petty cash, commissions, currency exchange — posts to its own operating-expense account the moment it's saved, so net income in the P&L is always current.",
    features: [
      { title: "Built-in categories", description: "Rent, Salaries, Utilities, Petty cash, Commissions, Currency exchange, each mapped to an account." },
      { title: "Custom categories", description: "Admin adds new categories, each mapped to its own account, so reporting stays consistent." },
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
      { q: "Who can add a new expense category?", a: "Only Admin, so the chart of accounts stays consistent no matter who records the cost." },
    ],
    related: ["accounting", "invoicing", "business-partners"],
  },

  documents: {
    eyebrow: "Document Management",
    title: "Every file where the shipment actually is",
    description:
      "A permanent per-job document store, with file type verified from the file's actual content, plus an AI queue that classifies incoming email attachments and suggests which job they belong to.",
    stats: [
      { value: "2", label: "layers — manual upload, and AI-reviewed attachments" },
      { value: "100%", label: "of AI suggestions need a human approval" },
    ],
    painPoints: [
      "The packing list for a shipment is sitting in one person's inbox, and nobody else can find it without asking them directly.",
      "A mislabeled or disguised file type slips through because nothing actually checks what the file really is.",
      "Attachments on incoming emails have to be manually pulled out and filed against the right job one by one.",
    ],
    solutionIntro:
      "Documents live with the job, not in someone's inbox — uploaded manually or picked up automatically from linked email, with every file type verified and every AI suggestion reviewed by a person.",
    features: [
      { title: "Content-verified file types", description: "What a file actually is gets checked from its content, not just trusted from the filename." },
      { title: "Uploaded and generated, together", description: "Manual uploads sit alongside the quotation PDF, B/L, invoices and notes Routel generates automatically." },
      { title: "AI-classified attachments", description: "Incoming email attachments are classified — B/L? booking confirmation? vendor invoice? — with a suggested job match." },
      { title: "Versioned, never overwritten", description: "A corrected upload keeps the old version; the audit log shows who replaced what." },
    ],
    workflow: [
      { title: "A file arrives", description: "Uploaded directly, or attached to mail through Email Sync." },
      { title: "Classified", description: "The AI queue suggests what it is and which job it belongs to." },
      { title: "Approved", description: "A person confirms the suggestion before it's filed anywhere." },
      { title: "Findable", description: "Filtered by type on the job, or found instantly by asking the assistant." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Views, downloads, uploads and labels documents, and clears the AI review queue." },
    ],
    faqs: [
      { q: "Does the AI file documents automatically?", a: "No — every suggestion needs a person to approve or reject it first." },
      { q: "What happens to the old version if I upload a correction?", a: "It's kept, not overwritten — the newest is marked current and the audit log shows the change." },
      { q: "Can I find a document without opening the job?", a: "Yes — ask the assistant, e.g. \"send me the House B/L for JOB-2026-0412.\"" },
    ],
    related: ["email-sync", "shipments", "bill-of-lading"],
  },

  "email-sync": {
    eyebrow: "Email Sync",
    title: "Correspondence that files itself against the right job",
    description:
      "Connect a Zoho or Microsoft mailbox and incoming and outgoing mail links to the job it belongs to automatically, by scanning for job numbers and booking references.",
    stats: [
      { value: "2", label: "supported providers — Zoho and Microsoft" },
      { value: "1", label: "inbox, not one per person" },
    ],
    painPoints: [
      "The only record of a carrier's reply to a booking question is in one person's personal inbox.",
      "Finding an old email thread about a shipment means searching a mailbox by vague keywords and hoping.",
      "Attachments on job-related mail have to be manually downloaded and filed, one by one.",
    ],
    solutionIntro:
      "Connect the mailbox once, and correspondence that mentions a job, booking or B/L number attaches to that job automatically — travelling with the shipment instead of sitting in someone's inbox.",
    features: [
      { title: "Zoho or Microsoft", description: "Connect through the provider's own standard authorization screen — Routel never stores the password directly." },
      { title: "Automatic linking", description: "New mail is scanned for a job number, B/L number, or a known customer or vendor." },
      { title: "Attachments feed document review", description: "Linked attachments flow into the AI-classified document queue instead of staying stuck in email." },
      { title: "Separate from the finance mailbox", description: "A distinct, dedicated inbox handles payment matching — see Finance (Receivables & Payables)." },
    ],
    workflow: [
      { title: "Connected", description: "Admin authorizes the mailbox via Zoho or Microsoft." },
      { title: "Scanned", description: "New mail is checked for recognizable job, booking or B/L references." },
      { title: "Linked", description: "Matching mail attaches to the right job automatically." },
      { title: "Findable", description: "Ask the assistant instead of searching the mailbox directly." },
    ],
    personas: [
      { role: "Admin", detail: "Connects and manages mailbox sync." },
      { role: "Any signed-in staff", detail: "Sees linked mail on any job they can already open." },
    ],
    faqs: [
      { q: "Is Gmail supported?", a: "Not currently — Zoho and Microsoft 365 are the supported providers." },
      { q: "Does Routel see my password?", a: "No — authorization happens through the provider's own standard screen." },
      { q: "Is this the same inbox used for payment matching?", a: "No — that's a separate, dedicated finance mailbox. See Finance (Receivables & Payables)." },
    ],
    related: ["documents", "shipments", "finance-receivables"],
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
      "\"Where is my shipment\" is the single most common customer email, and answering it means stopping to check the job yourself every time.",
      "A tracking page that shows too much — container numbers, vessel names, exact dates — leaks information a competitor could use.",
      "A tracking link that works off a guessable number alone can be used to peek at shipments that aren't even the requester's.",
    ],
    solutionIntro:
      "A public page, no login, answers the status question directly — but only once both an exact reference and proof of relationship are given, and only with a status timeline, never the sensitive details.",
    features: [
      { title: "Two-piece lookup", description: "An exact job, B/L or container number, plus the company name or account number it belongs to." },
      { title: "No partial matches", description: "No search-by-keyword — guessing numbers can't be used to fish for other customers' shipments." },
      { title: "Status timeline only", description: "The same 11-stage status used internally, with no master B/L, container numbers, vessel or exact dates shown." },
      { title: "One link for every shipment", description: "Customers plug in their own reference rather than you generating a unique link per job." },
    ],
    workflow: [
      { title: "Customer visits the page", description: "No account needed." },
      { title: "Enters two references", description: "An exact shipment reference, plus their company name or account number." },
      { title: "Sees the status", description: "The current stage in the 11-stage lifecycle — nothing more." },
    ],
    personas: [
      { role: "Your customers", detail: "Check status without calling or emailing your team." },
      { role: "Operations", detail: "Keeps the job's status current, which is all the tracking page reflects." },
    ],
    faqs: [
      { q: "Does a customer need to log in?", a: "No — it's a public page, scoped by the two-piece lookup instead." },
      { q: "Can someone see another customer's shipment by guessing a number?", a: "No — a lookup needs both the exact reference and proof of relationship together." },
      { q: "Can a customer see the vessel name or container numbers?", a: "No — only the status timeline. Sensitive details stay inside the product." },
    ],
    related: ["shipments", "business-partners"],
  },

  "labeling-center": {
    eyebrow: "Labeling Center",
    title: "Flag it, and it won't get lost",
    description:
      "Tag any job, invoice, customer, vendor, quotation or booking with a note, a follow-up date and an assignee — without standing up a separate task-tracking tool.",
    stats: [
      { value: "6", label: "record types you can tag" },
      { value: "3", label: "things a tag carries — note, date, assignee" },
    ],
    painPoints: [
      "A \"come back to this\" moment gets handled with a sticky note, a Slack message, or just hoping you remember.",
      "Follow-ups fall through the cracks between the person who noticed the issue and the person who's supposed to act on it.",
      "Standing up a whole separate task-tracking tool is overkill for flagging a handful of records that need a second look.",
    ],
    solutionIntro:
      "A tag lives on the record itself — a note, a follow-up date, an assignee — so whoever opens that job or invoice sees the flag in context, with no separate list to remember to check.",
    features: [
      { title: "Tag any record", description: "Job, Invoice, Customer, Vendor, Quotation or Booking." },
      { title: "A note", description: "Free text on what needs attention and why." },
      { title: "A follow-up date", description: "Overdue tags are easy to spot at a glance." },
      { title: "An assignee", description: "Doesn't have to be the person who created the tag — ownership is explicit." },
    ],
    workflow: [
      { title: "Something needs a second look", description: "On a job, invoice, partner, quotation or booking." },
      { title: "Tagged", description: "A note, a follow-up date, and whoever owns the follow-up." },
      { title: "Surfaced in context", description: "Shows directly on the record, and in the assignee's own view of what's tagged to them." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Can tag any record they can already open, and assign it to anyone with access." },
    ],
    faqs: [
      { q: "Do I need a separate task tool alongside this?", a: "No — it's built specifically to avoid needing one for this kind of flagging." },
      { q: "Can I assign a tag to someone else?", a: "Yes — the assignee doesn't have to be whoever created the tag." },
      { q: "Can the assistant create a tag for me?", a: "Yes — describe what needs following up on and it proposes a tag with the note, date and assignee filled in." },
    ],
    related: ["shipments", "business-partners", "invoicing"],
  },

  roles: {
    eyebrow: "Role-based Access",
    title: "Six roles, enforced the same way everywhere",
    description:
      "Admin and Management see every module, narrowing only at system configuration. Accounting owns Finance and Reports, Sales and Pricing own Quotations, Operations owns the Bill of Lading and Route Rates — everything else is open to any signed-in staff.",
    stats: [
      { value: "6", label: "named roles" },
      { value: "1", label: "set of rules, enforced the same in the UI and the AI assistant" },
    ],
    painPoints: [
      "Permissions configured as checkboxes on a settings screen drift out of sync with what's actually enforced underneath.",
      "The AI assistant quietly has more (or less) access than the person using it, because it was wired up separately from the real permission system.",
      "Walling off entire modules by department means people constantly asking for exceptions just to do their job.",
    ],
    solutionIntro:
      "Permissions are checked on the server for every request, by the same rules whether the action came from a screen or from a sentence typed into the assistant — narrowing only the specific sensitive modules, not the whole product.",
    features: [
      { title: "Six named roles", description: "Admin, Management, Accounting, Operations, Sales, Pricing — each with a clear, specific scope." },
      { title: "Admin and Management see everything", description: "The only difference: system configuration (users, roles, settings) stays Admin-only." },
      { title: "Narrow, specific gates", description: "Accounting → Finance & Reports; Sales/Pricing → Quotations; Operations → Bill of Lading (and Route Rates too)." },
      { title: "Open by default elsewhere", description: "Jobs, Bookings, Business Partners, Documents and the Labeling Center are open to any signed-in staff." },
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
    related: ["ai-assistant", "shipments", "quotations"],
  },

  "ai-assistant": {
    eyebrow: "AI Assistant",
    title: "Talk to your operations, in Arabic or English",
    description:
      "Search, report and read by chatting — and propose a job, booking, invoice, business partner, expense or route rate. Every write stops as a proposal for a person to confirm, created through the exact same path as the manual UI.",
    stats: [
      { value: "2", label: "languages — Arabic and English, switchable mid-conversation" },
      { value: "0", label: "writes saved without a human confirmation" },
    ],
    painPoints: [
      "Simple requests — \"what's overdue\", \"create this invoice\" — mean navigating multiple screens just to get the same answer a sentence could give.",
      "An AI tool bolted onto a product often has its own separate, looser permission model than the actual application.",
      "Reading a vendor's invoice and re-typing every line into the system by hand is slow and error-prone.",
    ],
    solutionIntro:
      "The assistant reads and reports on request, and proposes writes for a person to review — in Arabic or English, with your exact role permissions, through the same code path the manual interface uses.",
    features: [
      { title: "Reads across the whole system", description: "Jobs, customers, vendors, invoices, reports, documents — by asking a question." },
      { title: "Proposes, never saves silently", description: "A job, booking, invoice, business partner, expense or route rate shows as a proposal card first." },
      { title: "Imports a rate sheet from an attachment", description: "Bulk-propose a whole vendor rate sheet instead of entering lanes one at a time." },
      { title: "Your exact permissions", description: "The same role checks as the manual interface — never more, never less." },
    ],
    workflow: [
      { title: "You ask", description: "In Arabic, English, or a mix — it asks for anything it's missing." },
      { title: "It proposes", description: "Every field, line and amount shown exactly as it will be saved." },
      { title: "You confirm, edit or cancel", description: "Nothing happens until one of these is pressed." },
      { title: "It's created", description: "Through the same path and role check as the manual UI, logged under your name." },
    ],
    personas: [
      { role: "Operations", detail: "Creates jobs and bookings, drafts documents, by chatting." },
      { role: "Accounting", detail: "Drafts invoices, records expenses, reads vendor invoices." },
      { role: "Management", detail: "Pulls reports and profitability instantly." },
    ],
    faqs: [
      { q: "Can it save something without my confirmation?", a: "No — there's no setting that allows silent execution. Every write is a proposal first." },
      { q: "Does it have more access than I do?", a: "No — it acts as you, checked against your exact role." },
      { q: "Can it read a vendor's invoice for me?", a: "Yes — upload the PDF and it extracts the line items into a proposed cost or invoice." },
    ],
    related: ["roles", "invoicing", "bookings"],
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
      { q: "Does this track activity inside the Routel app?", a: "No — it's visits to your public-facing branded site, not in-app activity, which already lives in each job's audit log." },
      { q: "Do I need to set up Google Analytics separately?", a: "No — it comes with the custom domain." },
    ],
    related: ["ai-assistant", "email-sync"],
  },

  compliance: {
    eyebrow: "Audit & Compliance",
    title: "A record of who changed what, and when",
    description:
      "Every job carries an audit log of field edits, status changes and document uploads — including anything created through the AI assistant, attributed to the person who confirmed it.",
    stats: [
      { value: "100%", label: "of job changes logged, person and timestamp" },
      { value: "0", label: "edits the log itself allows" },
    ],
    painPoints: [
      "A number changes on a job and nobody can say who changed it or why.",
      "Actions taken through an AI tool show up as \"the system\" instead of the person who actually confirmed them.",
      "An audit trail that can itself be edited isn't really an audit trail.",
    ],
    solutionIntro:
      "Every change to a job — manual or through the assistant — is logged with the person's name, the time, and the before/after values, and the log itself can't be edited.",
    features: [
      { title: "Per-job audit log", description: "Field edits, status changes, document uploads — all logged." },
      { title: "Assistant actions attributed to a person", description: "Recorded under the name of whoever confirmed them, never as \"the assistant.\"" },
      { title: "Generated documents on file", description: "Kept with the shipment they belong to, not a separate archive." },
      { title: "Role-scoped visibility", description: "Who can see what in the log follows the same role rules as the rest of the product." },
    ],
    workflow: [
      { title: "A change is made", description: "Manually, or confirmed through the assistant." },
      { title: "Logged immediately", description: "Person, timestamp, before and after values." },
      { title: "Visible, not editable", description: "The log can be read by anyone with access to the job, but never altered." },
    ],
    personas: [
      { role: "Any signed-in staff", detail: "Can see the audit log on any job they can open." },
    ],
    faqs: [
      { q: "Can the audit log be edited or deleted?", a: "No — it's an append-only record." },
      { q: "Does an action through the assistant show up differently?", a: "No — it's logged under the name of the person who confirmed it, with the same detail as a manual change." },
    ],
    related: ["shipments", "ai-assistant", "roles"],
  },
};

/** Platform pages in the given locale; untranslated pages fall back to English. */
export function getPlatformContent(locale: Locale): Record<string, PlatformContent> {
  if (locale === "en") return platformContent;
  return Object.fromEntries(
    Object.entries(platformContent).map(([slug, en]) => [slug, platformContentAr[slug] ?? en]),
  );
}
