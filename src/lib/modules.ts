import type { LucideIcon } from "lucide-react";
import type { Locale } from "./i18n";
import { modulesAr } from "./modules.ar";
import {
  Anchor,
  Boxes,
  FileCheck2,
  Plane,
  Banknote,
  Bot,
  ChartColumn,
  FileCheck,
  FileMinus,
  FileSignature,
  FolderOpen,
  Globe,
  Mail,
  MapPin,
  Receipt,
  Route,
  ShieldCheck,
  Ship,
  Tag,
  Users,
  Wallet,
} from "lucide-react";

export type Module = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  /** Docs page for this module, if written. */
  docs?: string;
  featured?: boolean;
};

/**
 * Every module listed here is built and working in the product today.
 * Keep the copy accurate: describe what it does, not what it might do.
 * Source of truth: the product's own plan/feature code, not guesswork.
 */
export const modules: Module[] = [
  {
    slug: "bookings",
    name: "Bookings",
    short: "One record for every shipment, from booking to close",
    description:
      "The center of the system — the booking is the one record for a shipment, numbered by its booking number. It carries the shipment details (POL/POD, shipper and consignee, vessel and voyage, containers, incoterms, weights, volume, HBL and MBL numbers), the shipping timeline from gate-in and SI cut-off through ETD to ATA, the carrier booking, cost and sale charges with a profit summary, invoices, documents, tasks and follow-ups. Issue a Booking Confirmation (any later change produces a numbered revision), generate the Bill of Lading or create invoices from the header, and follow an 11-status lifecycle from booking pending to shipment closed.",
    icon: Ship,
    bullets: [
      "11-status lifecycle, booking pending to shipment closed",
      "Booking Confirmation with numbered revisions",
      "AI reads the B/L and the carrier's confirmation",
    ],
    docs: "/docs/bookings",
    featured: true,
  },
  {
    slug: "air-freight",
    name: "Air Freight",
    short: "Express and airline cargo, MAWB and HAWB, block space",
    description:
      "Air bookings in two kinds: express through carriers such as DHL, FedEx, Aramex, UPS and SMSA, with their tracking linked; and airline cargo under a Master Air Waybill checked against IATA's check digit, with your own House Air Waybill printed in IATA layout. Pieces and dimensions give the chargeable weight, and kg-based charges follow it. Air allocations track block space bought from airlines week by week, with alerts, unsold cost and an AI reader for the airline's agreement.",
    icon: Plane,
    bullets: ["Express or airline cargo, MAWB checked", "House Air Waybill in IATA layout", "Block space tracked week by week"],
    docs: "/docs/air-freight",
    featured: true,
  },
  {
    slug: "consolidation",
    name: "Consolidation & LCL",
    short: "Many bookings, one master, costs shared to the cent",
    description:
      "A consolidation is one master shipment carrying several house bookings: an LCL container under your own MBL, an air consolidation under your own MAWB, or space bought from a co-loader. Routel suggests bookings on the same route, prints the cargo manifest, and shares the master's costs across the bookings by CBM, W/M or chargeable weight, exact to the cent, so every booking's profit stays right.",
    icon: Boxes,
    bullets: ["Sea LCL or air, own master or co-loader", "Cargo manifest", "Costs shared by CBM, W/M or chargeable weight"],
    docs: "/docs/consolidation",
    featured: true,
  },
  {
    slug: "arrival-notice",
    name: "Arrival Notice & Delivery Order",
    short: "Notify the consignee on time, release only when paid",
    description:
      "For import bookings, Routel tells you when the arrival notice is due, prints it or e-mails it as a PDF with the charges due, and records how the line released the cargo. A numbered delivery order is issued only once the cargo is released and paid, or the partner is within an active credit limit; a finance user can override with a recorded reason. The AI reads the line's own arrival or delay notice and proposes the new ETA.",
    icon: FileCheck2,
    bullets: ["Arrival notice, due on time", "Delivery order only when released and paid", "AI reads the line's ETA change"],
    docs: "/docs/arrival-notice",
    featured: true,
  },
  {
    slug: "business-partners",
    name: "Business Partners",
    short: "One record, either side of a deal",
    description:
      "One record for a customer or a vendor — there's no separate 'add a customer' step. Which side of a deal a partner plays is decided per transaction. Each partner carries payment terms, a credit limit and currency, contacts, a combined AR+AP ledger and a printable statement of account.",
    icon: Users,
    bullets: ["One record, either side of a deal", "Combined AR + AP ledger", "Printable statement of account"],
    docs: "/docs/business-partners",
  },
  {
    slug: "quotations",
    name: "Quotations & Routes",
    short: "Route rates, route analytics and quotes in minutes",
    description:
      "Store vendor buying rates per POL→POD, shipping line and container type, each with a validity window marked Active, Expiring or Expired — or import a whole rate sheet from Excel and extend validity in bulk. Route Analytics shows top routes, origins and destinations, monthly volume and revenue, cost, profit and margin. Build a customer quotation on current rates and, once accepted, Convert to Booking: pick the route and only its charges are copied, and the quotation locks with a link to its booking.",
    icon: Route,
    bullets: ["Route rates with Active / Expiring / Expired validity", "Route analytics: volume, revenue, margin", "Convert to Booking in one click"],
    docs: "/docs/quotations",
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    short: "Multi-currency invoices, properly locked",
    description:
      "Create draft invoices straight from a booking's sale (AR) charges. Drafts are watermarked \"DRAFT TAX INVOICE\" and are the only invoices you can edit; an invoice becomes final and numbered once the booking's B/L number (MBL) is set, and issued invoices are corrected with credit or debit notes. Every document is in your base currency (e.g. MYR) or USD, and the assistant can read a vendor's invoice into cost lines on the booking.",
    icon: Receipt,
    bullets: ["Draft → final → paid, B/L required to finalize", "Base currency (e.g. MYR) and USD", "Created from the booking's sale charges"],
    docs: "/docs/invoicing",
    featured: true,
  },
  {
    slug: "finance-receivables",
    name: "Finance (Receivables & Payables)",
    short: "A mailbox that watches for payments",
    description:
      "A dedicated finance mailbox — separate from your day-to-day inbox — is scanned automatically for incoming payments. Routel proposes matching suggestions between an email and an outstanding invoice or vendor bill; a person reviews and confirms or rejects every one, so nothing is settled without a human saying so.",
    icon: Banknote,
    bullets: ["Dedicated, auto-scanned finance mailbox", "AI-proposed payment matches", "Human confirms every match"],
    docs: "/docs/finance-receivables",
  },
  {
    slug: "credit-notes",
    name: "Credit & Debit Notes",
    short: "Adjust what's owed, formally",
    description:
      "Reduce or increase what a customer owes after an invoice is already issued. A credit or debit note is drafted, then formally numbered, then applied against a specific finalized invoice — currency has to match, and it can only touch an invoice that's already locked.",
    icon: FileMinus,
    bullets: ["Credit reduces, debit increases", "Draft → numbered → applied", "Only against a finalized invoice"],
    docs: "/docs/credit-notes",
  },
  {
    slug: "credit-applications",
    name: "Credit Applications",
    short: "Trade credit, applied for and approved",
    description:
      "A public form captures a business's details and the credit they're requesting. Staff review and approve or reject it, and an approved application becomes an active credit agreement — limit, currency, term and expiry — tied to that customer. Approving a new one automatically retires the old one.",
    icon: FileSignature,
    bullets: ["Public application form", "Staff approve or reject", "New approval retires the old agreement"],
    docs: "/docs/credit-applications",
  },
  {
    slug: "accounting",
    name: "Accounting Reports",
    short: "Live books, no journal entries",
    description:
      "General Ledger, Trial Balance, Cash Position, P&L with gross profit and net income, AR and AP aging, the country's tax report (SST, PPN or VAT) and customer profitability — all computed live from source transactions, not journal entries.",
    icon: ChartColumn,
    bullets: ["GL, Trial Balance, Cash Position", "AR and AP aging", "Tax report (SST, PPN or VAT, per country)"],
    docs: "/docs/accounting",
    featured: true,
  },
  {
    slug: "bill-of-lading",
    name: "Bill of Lading",
    short: "Carrier-grade House B/L from the booking",
    description:
      "Generate a proper maritime House Bill of Lading with an annexure and container sheet directly from a booking's own data — including its incoterms — formatted the way a carrier's B/L looks.",
    icon: Anchor,
    bullets: ["House B/L + annexure", "Container sheet", "Generated from booking data, incoterms included"],
    docs: "/docs/bill-of-lading",
    featured: true,
  },
  {
    slug: "expenses",
    name: "Expenses & Payroll",
    short: "Overheads that flow into the GL",
    description:
      "Record rent, salaries, utilities, petty cash, commissions, currency exchange and custom categories — operating costs outside bookings, kept separate from the vendor costs charged to bookings. Every entry posts to a proper operating-expense account, with salary lines linked to staff.",
    icon: Wallet,
    bullets: ["Petty cash to payroll-linked salaries", "Posts straight to the GL", "Kept separate from booking costs"],
    docs: "/docs/expenses",
  },
  {
    slug: "documents",
    name: "Document Management",
    short: "Every file where the shipment is",
    description:
      "A permanent document store on every booking — file type is verified from the actual file content, not just trusted from the upload — plus an AI review queue for incoming email attachments. It classifies each one (a B/L, a booking confirmation, a booking request, a vendor invoice) and suggests the matching booking by booking number, B/L or container; a person then approves it to create or update a booking, create an invoice, or link it to a booking.",
    icon: FolderOpen,
    bullets: ["File type verified from content", "AI classifies incoming attachments", "Every suggestion needs a human approval"],
    docs: "/docs/documents",
  },
  {
    slug: "email-sync",
    name: "Email Sync",
    short: "Connect your inbox, auto-link to bookings",
    description:
      "Connect a Zoho or Microsoft 365 mailbox and Routel links incoming and outgoing mail to the booking it belongs to — automatically when the booking number appears in it or the message continues a linked thread, or manually — so correspondence lives next to the shipment instead of buried in an inbox.",
    icon: Mail,
    bullets: ["Zoho or Microsoft 365", "Auto-links mail by booking number and thread", "Correspondence stays on the booking"],
    docs: "/docs/email-sync",
  },
  {
    slug: "tracking",
    name: "Public Shipment Tracking",
    short: "A no-login status page for your customers",
    description:
      "Your own customers can look up a shipment with no login — but only with two pieces of information (the booking number, the B/L number or one full container number, plus their company name or account ID), so it can't be used to fish for other customers' shipments. It shows a status timeline only, never the master B/L, container numbers, vessel or exact dates.",
    icon: MapPin,
    bullets: ["No login, two-piece lookup required", "Status timeline only", "Never shows commercially sensitive details"],
    docs: "/docs/tracking",
  },
  {
    slug: "labeling-center",
    name: "Labeling Center",
    short: "Flag anything that needs attention",
    description:
      "Label any record — a booking, invoice, business partner or quotation — with a note, a follow-up date and an assignee — so things that need attention don't get lost, without needing a separate task-tracking system.",
    icon: Tag,
    bullets: ["Tag any record in the system", "Follow-up date and assignee", "No separate task tool needed"],
    docs: "/docs/labeling-center",
  },
  {
    slug: "roles",
    name: "Role-based Access",
    short: "Admin, Management, Accounting, Operations, Sales, Pricing",
    description:
      "Six named roles — Admin, Management, Accounting, Operations, Sales and Pricing. Admin and Management see every module, differing only in that system settings stay Admin-only. Everyone can read bookings; Operations and Sales edit them. Sales and Pricing own Quotations, Accounting owns Finance, Reports and Expenses, and Operations owns the Bill of Lading.",
    icon: ShieldCheck,
    bullets: ["Six named roles", "Admin and Management see everything", "Narrows only the sensitive modules"],
    docs: "/docs/roles",
  },
  {
    slug: "ai-assistant",
    name: "AI Assistant",
    short: "Built in: calls tools and runs your operations automatically",
    description:
      "Search bookings, customers and vendors, pull up details, list invoices, generate reports and read documents by chatting, in any language. Propose a new booking, invoice, business partner, expense or route rate (including importing a whole rate sheet from an attachment), or update a booking. Every write stops as a proposal a person has to confirm, then it's created through the exact same code path and role permissions as the manual interface.",
    icon: Bot,
    bullets: ["Calls the system's own tools", "Reads PDFs, images and rate sheets", "You confirm before anything is saved"],
    docs: "/docs/ai-assistant",
    featured: true,
  },
  {
    slug: "visitor-tracking",
    name: "Website Visitor Tracking",
    short: "See who visits your branded site",
    description:
      "When Routel runs on your own custom domain, visitor activity on that site is tracked automatically, so you can see who is looking without wiring up separate analytics.",
    icon: Globe,
    bullets: ["Built into your custom domain", "No separate analytics setup", "Visitor activity at a glance"],
    docs: "/docs/visitor-tracking",
  },
  {
    slug: "compliance",
    name: "Audit & Compliance",
    short: "A record of every change",
    description:
      "Each booking carries an activity log of who changed which field and when, and of every confirmation issued, and generated documents are kept with the booking they belong to.",
    icon: FileCheck,
    bullets: ["Per-booking activity log", "Generated documents on file", "Role-scoped visibility"],
  },
];

export const featuredModules = modules.filter((m) => m.featured);

/** The translatable part of a module. Translations live in modules.<locale>.ts keyed by slug. */
export type ModuleCopy = Pick<Module, "name" | "short" | "description" | "bullets">;

/** Modules with copy in the given locale; untranslated modules fall back to English. */
export function getModules(locale: Locale): Module[] {
  if (locale === "en") return modules;
  return modules.map((m) => ({ ...m, ...modulesAr[m.slug] }));
}

export function getFeaturedModules(locale: Locale): Module[] {
  return getModules(locale).filter((m) => m.featured);
}
