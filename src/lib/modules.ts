import type { LucideIcon } from "lucide-react";
import type { Locale } from "./i18n";
import { modulesAr } from "./modules.ar";
import {
  Anchor,
  Banknote,
  Bot,
  CalendarCheck,
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
    slug: "shipments",
    name: "Shipments & Jobs",
    short: "Full lifecycle of every freight job",
    description:
      "The center of the system — one record per shipment carrying POL/POD, shipper and consignee, vessel and voyage, containers, weight and cargo description, BL/HBL numbers and incoterms, plus the full chain of operational dates from cutting date to ETA. An 11-stage status — booking pending through delivered — shows the same way everywhere the job appears.",
    icon: Ship,
    bullets: ["11-stage status lifecycle", "Every operational date, cutting to ETA", "Same status badge everywhere"],
    docs: "/docs/shipments",
    featured: true,
  },
  {
    slug: "bookings",
    name: "Bookings",
    short: "Vessel bookings tied to the job",
    description:
      "A vessel booking tied to its job — carrier, vessel and voyage, container type and count, cut-off dates, shipper, consignee and notify party, and the carrier's own booking reference. Upload a booking confirmation PDF and the fields are extracted automatically to prefill the form.",
    icon: CalendarCheck,
    bullets: ["Carrier, vessel, voyage, cut-offs", "Shipper / consignee / notify party", "AI reads the confirmation PDF for you"],
    docs: "/docs/bookings",
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
    name: "Quotations & Route Rates",
    short: "Buying rates by route, quotes in minutes",
    description:
      "Store vendor buying rates by route and container type, each with a validity window that flags as expiring within 14 days before it lapses — or bulk-import a whole rate sheet from Excel. Build a customer quotation on top of a current rate and convert an accepted one straight into a job.",
    icon: Route,
    bullets: ["Rates by route and container type", "14-day expiry warning on validity", "Bulk import from Excel"],
    docs: "/docs/quotations",
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    short: "Multi-currency invoices, properly locked",
    description:
      "Customer invoices move from draft — clearly watermarked \"DRAFT TAX INVOICE — NOT OFFICIAL\" — to a finalized, numbered invoice once the job's Bill of Lading number is set, after which line items lock. Upload a vendor's cost invoice and the assistant extracts its line items to prefill your own.",
    icon: Receipt,
    bullets: ["Draft → final → paid, BL required to finalize", "MYR / USD invoicing", "AI reads vendor invoices to prefill yours"],
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
      "General Ledger, Trial Balance, Cash Position, P&L with gross profit and net income, AR and AP aging, an SST tax summary and customer profitability — all computed live from source transactions, not journal entries.",
    icon: ChartColumn,
    bullets: ["GL, Trial Balance, Cash Position", "AR and AP aging", "SST tax summary"],
    docs: "/docs/accounting",
    featured: true,
  },
  {
    slug: "bill-of-lading",
    name: "Bill of Lading",
    short: "Carrier-grade House B/L from the job",
    description:
      "Generate a proper maritime House Bill of Lading with an annexure and container sheet directly from a job's own data — including its incoterms — formatted the way a carrier's B/L looks.",
    icon: Anchor,
    bullets: ["House B/L + annexure", "Container sheet", "Generated from job data, incoterms included"],
    docs: "/docs/bill-of-lading",
    featured: true,
  },
  {
    slug: "expenses",
    name: "Expenses & Payroll",
    short: "Overheads that flow into the GL",
    description:
      "Record rent, salaries, utilities, petty cash, commissions, currency exchange and custom categories — company overhead, kept separate from vendor shipment costs sitting in payables. Every entry posts to a proper operating-expense account, with salary lines linked to staff.",
    icon: Wallet,
    bullets: ["Petty cash to payroll-linked salaries", "Posts straight to the GL", "Kept separate from vendor shipment costs"],
    docs: "/docs/expenses",
  },
  {
    slug: "documents",
    name: "Document Management",
    short: "Every file where the shipment is",
    description:
      "A permanent per-job document store — file type is verified from the actual file content, not just trusted from the upload — plus an AI review queue that classifies incoming email attachments (a B/L? a booking confirmation? a vendor invoice?) with a suggested job match for a person to approve or reject.",
    icon: FolderOpen,
    bullets: ["File type verified from content", "AI classifies incoming attachments", "Every suggestion needs a human approval"],
    docs: "/docs/documents",
  },
  {
    slug: "email-sync",
    name: "Email Sync",
    short: "Connect your inbox, auto-link to jobs",
    description:
      "Connect a Zoho or Microsoft mailbox and Routel links incoming and outgoing mail to the job it belongs to automatically, by scanning for job numbers and booking references — so correspondence lives next to the shipment instead of buried in an inbox.",
    icon: Mail,
    bullets: ["Zoho or Microsoft", "Auto-links mail by job or booking number", "Correspondence stays with the shipment"],
    docs: "/docs/email-sync",
  },
  {
    slug: "tracking",
    name: "Public Shipment Tracking",
    short: "A no-login status page for your customers",
    description:
      "Your own customers can look up a shipment with no login — but only with two pieces of information (an exact job, B/L or container number, plus their company name or account number), so it can't be used to fish for other customers' shipments. It shows a status timeline only, never the master B/L, container numbers, vessel or exact dates.",
    icon: MapPin,
    bullets: ["No login, two-piece lookup required", "Status timeline only", "Never shows commercially sensitive details"],
    docs: "/docs/tracking",
  },
  {
    slug: "labeling-center",
    name: "Labeling Center",
    short: "Flag anything that needs attention",
    description:
      "Tag any job, invoice, customer, vendor, quotation or booking with a note, a follow-up date and an assignee — so things that need attention don't get lost, without needing a separate task-tracking system.",
    icon: Tag,
    bullets: ["Tag any record in the system", "Follow-up date and assignee", "No separate task tool needed"],
    docs: "/docs/labeling-center",
  },
  {
    slug: "roles",
    name: "Role-based Access",
    short: "Admin, Management, Accounting, Operations, Sales, Pricing",
    description:
      "Six named roles — Admin, Management, Accounting, Operations, Sales and Pricing. Admin and Management see every module, differing only in that system configuration stays Admin-only. Accounting owns Finance and Reports, Sales and Pricing own Quotations, Operations owns the Bill of Lading and also reaches Route Rates — everything else is open to any signed-in member of staff.",
    icon: ShieldCheck,
    bullets: ["Six named roles", "Admin and Management see everything", "Narrows only the sensitive modules"],
    docs: "/docs/roles",
  },
  {
    slug: "ai-assistant",
    name: "AI Assistant",
    short: "Talk to your operations in Arabic or English",
    description:
      "Search jobs, customers and vendors, pull up details, list invoices, generate reports and read documents by chatting — in Arabic or English. Propose a new job, booking, invoice, business partner, expense or route rate (including importing a whole rate sheet from an attachment), or update a job. Every write stops as a proposal a person has to confirm, then it's created through the exact same code path and role permissions as the manual interface.",
    icon: Bot,
    bullets: ["Arabic and English", "Imports a rate sheet from an attachment", "Propose → review → confirm, same permissions as the UI"],
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
      "Each job carries an audit log of who changed what and when, and generated documents are kept with the shipment they belong to.",
    icon: FileCheck,
    bullets: ["Per-job audit log", "Generated documents on file", "Role-scoped visibility"],
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
