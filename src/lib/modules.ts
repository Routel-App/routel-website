import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Bot,
  CalendarCheck,
  ChartColumn,
  FileCheck,
  FolderOpen,
  Globe,
  Mail,
  Receipt,
  Route,
  ShieldCheck,
  Ship,
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
 */
export const modules: Module[] = [
  {
    slug: "shipments",
    name: "Shipments & Jobs",
    short: "Full lifecycle of every freight job",
    description:
      "POL and POD, vessel and voyage, containers, Bill of Lading numbers, ETD and ETA, a status timeline and a complete audit log on every job.",
    icon: Ship,
    bullets: ["Job lifecycle from enquiry to closed", "Container and B/L tracking", "Status timeline + audit log"],
    docs: "/docs/shipments",
    featured: true,
  },
  {
    slug: "quotations",
    name: "Quotations & Route Rates",
    short: "Buying rates by route, quotes in minutes",
    description:
      "Store vendor buying rates by route and container type with validity windows. Generate quotations and convert them straight into jobs.",
    icon: Route,
    bullets: ["Rates by route and container type", "Validity windows", "Quote → job conversion"],
    docs: "/docs/quotations",
  },
  {
    slug: "bookings",
    name: "Bookings",
    short: "Vessel bookings tied to the job",
    description:
      "Manage vessel bookings against each job so operations always know what is booked, on which sailing, and what still needs confirming.",
    icon: CalendarCheck,
    bullets: ["Booking per job", "Vessel, voyage and cut-off details", "Booking confirmations on file"],
    docs: "/docs/bookings",
  },
  {
    slug: "invoicing",
    name: "Invoicing & Finance",
    short: "Multi-currency billing and collections",
    description:
      "Customer invoicing in MYR and USD, payment tracking, credit and debit notes, credit applications and credit limits, plus a Receivables & Payables hub.",
    icon: Receipt,
    bullets: ["MYR / USD invoicing", "Credit & debit notes", "Credit limits and applications"],
    docs: "/docs/invoicing",
    featured: true,
  },
  {
    slug: "accounting",
    name: "Accounting Reports",
    short: "Live books, no journal entries",
    description:
      "General Ledger, Trial Balance, Cash Position, P&L with gross profit and net income, AR aging, overdue invoices and customer profitability, all computed live from source transactions.",
    icon: ChartColumn,
    bullets: ["GL, Trial Balance, Cash Position", "P&L with net income", "AR aging and profitability"],
    docs: "/docs/accounting",
    featured: true,
  },
  {
    slug: "bill-of-lading",
    name: "Bill of Lading",
    short: "Carrier-grade House B/L from the job",
    description:
      "Generate a proper maritime House Bill of Lading with an annexure and container sheet directly from a job, formatted the way a carrier's B/L looks.",
    icon: Anchor,
    bullets: ["House B/L + annexure", "Container sheet", "Generated from job data"],
    docs: "/docs/bill-of-lading",
    featured: true,
  },
  {
    slug: "expenses",
    name: "Expenses & Payroll",
    short: "Overheads that flow into the GL",
    description:
      "Record rent, salaries, utilities, commissions, currency exchange and custom categories. Every entry posts to a proper operating-expense account, with salary lines linked to staff.",
    icon: Wallet,
    bullets: ["Custom expense categories", "Posts straight to the GL", "Salary lines linked to staff"],
    docs: "/docs/expenses",
  },
  {
    slug: "partners",
    name: "Vendors & Customers",
    short: "CRM-lite records and statements",
    description:
      "Full vendor and customer records, downloadable statements of account as PDF, and vendor cost tracking per job with multi-currency exchange-rate conversion.",
    icon: Users,
    bullets: ["Statements of account (PDF)", "Vendor cost per job", "Exchange-rate conversion"],
    docs: "/docs/partners",
  },
  {
    slug: "documents",
    name: "Document Management",
    short: "Every file where the shipment is",
    description:
      "Upload, attach and download documents per shipment, from booking confirmations to packing lists, so nothing lives in someone's inbox.",
    icon: FolderOpen,
    bullets: ["Attach files to any shipment", "Booking confirmations to packing lists", "Download from the job or the assistant"],
    docs: "/docs/documents",
  },
  {
    slug: "roles",
    name: "Role-based Access",
    short: "Admin, Management, Accounting, Operations, Sales, Pricing",
    description:
      "Named roles see and do only what is relevant to their job. Permissions are enforced consistently across every module, including the AI assistant.",
    icon: ShieldCheck,
    bullets: ["Six named roles", "Enforced in every module", "Same rules for the assistant"],
    docs: "/docs/roles",
  },
  {
    slug: "email-sync",
    name: "Email Sync",
    short: "Connect your inbox, auto-link to jobs",
    description:
      "Connect a Zoho, Microsoft or Google mailbox and Routel links incoming mail to the job or customer it belongs to automatically, so correspondence and tracking updates stay with the shipment instead of buried in an inbox.",
    icon: Mail,
    bullets: ["Zoho, Microsoft, Google", "Auto-links mail to jobs", "Tracking updates from the inbox"],
    docs: "/docs/email-sync",
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
    slug: "ai-assistant",
    name: "AI Assistant",
    short: "Talk to your operations in Arabic or English",
    description:
      "Create jobs, bookings, quotations and invoices, record expenses, read vendor invoices, run reports and fetch documents by chatting. Every write action is proposed, reviewed and confirmed by a human.",
    icon: Bot,
    bullets: ["Arabic and English", "Reads vendor invoices", "Propose → review → confirm"],
    docs: "/docs/ai-assistant",
    featured: true,
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
