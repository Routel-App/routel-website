import type { ServicePageCopy } from "./types";

export const servicePagesEn: Record<string, ServicePageCopy> = {
  "sea-freight": {
    metaTitle: "Sea freight forwarding software",
    metaDescription:
      "Run FCL sea freight on one booking: route rates and quotations, the carrier booking read by AI, the House B/L, tax invoices, collections and the general ledger.",
    headline: "Sea freight forwarding, from the first quote to the closed file",
    lead: "Every FCL shipment runs on one record in ROUTEL: the route rate and the quotation, the carrier booking, the House B/L, the tax invoice, the payment and the general ledger. The AI assistant does the typing and your team confirms.",
    stat: { value: "11", label: "statuses on one booking, from Booking Pending to Shipment Closed" },
    figures: [
      { value: "1", label: "booking number that every document hangs off" },
      { value: "0", label: "times the carrier's confirmation is retyped" },
      { value: "2", label: "currencies per company: its own and USD" },
    ],
    features: [
      {
        title: "Route rates and quotations",
        text: "Buying prices per route, entered once or imported from an Excel rate sheet. A quotation picks them up, and an accepted quotation converts to a booking with nothing typed twice.",
        points: ["Import a rate sheet from Excel", "Quotation from the route rate", "Convert to Booking in one action"],
        mock: { title: "Quotation · Q-26-0412", badge: "Accepted", rows: [["Route", "Jeddah → Shanghai"], ["Ocean freight 2 × 40HC", "USD 4,200"], ["Local charges", "SAR 2,500"]], foot: "Convert to Booking" },
      },
      {
        title: "The carrier booking, read by AI",
        text: "Read Carrier Confirmation has AI read the line's PDF or a linked e-mail: vessel and voyage, cut-offs and the carrier's booking number. You tick what to save, and the Booking Confirmation goes to your customer with numbered revisions.",
        points: ["Reads the PDF or the e-mail", "You tick what to save", "Revised confirmations are numbered"],
        mock: { title: "Read from MSC confirmation.pdf", badge: "AI", rows: [["Vessel", "MSC ISABELLA · 412E"], ["Cargo cut-off", "14 Nov, 12:00"], ["Carrier ref.", "MSCJED4471"]], foot: "Save the ticked fields" },
      },
      {
        title: "A House B/L from the booking",
        text: "Generate Bill of Lading builds the House B/L and its container annexure from the booking's own parties, vessel and containers, in a carrier-style layout, then finalises and surrenders it.",
        points: ["Built from booking data", "Container annexure included", "Finalised, then surrendered"],
        mock: { title: "House B/L · HBL-26000412", badge: "Final", rows: [["Shipper", "Al Noor Trading"], ["Consignee", "Gulf Horizon FZE"], ["Master B/L", "MSCJED4471"]], foot: "Download PDF" },
      },
      {
        title: "Invoices, payments and the books",
        text: "Create Invoice turns the booking's sale lines into tax invoices; receipts and vendor payments post to the general ledger as they happen, and each booking shows its own profit.",
        points: ["Tax invoices from the charges", "Payments matched from the finance mailbox", "Profit per booking: AP, AR and net"],
        mock: { title: "Tax invoice · INV-26-0412", badge: "Issued", rows: [["Ocean freight 40HC", "USD 4,200"], ["Local charges", "SAR 2,500"], ["Total", "SAR 18,250.00"]], foot: "Profit 23.2%" },
      },
    ],
    flow: [
      { title: "Quote", text: "From the route rate, by the assistant or by hand." },
      { title: "Book", text: "The accepted quotation becomes the booking." },
      { title: "Confirm", text: "AI reads the carrier's confirmation into the booking." },
      { title: "Load", text: "Gate In, SI Submitted, Vessel Loaded, Departed." },
      { title: "Document", text: "Issue the House B/L from the booking." },
      { title: "Bill and close", text: "Invoice, collect, and the books are already written." },
    ],
    ai: {
      title: "Ask in a sentence. Confirm in one click.",
      text: "The assistant searches route rates, drafts the quotation and the booking, reads the carrier's files, and issues the House B/L and the invoice. Each write waits for a person's confirmation and is logged.",
      prompt: "Quote Jeddah to Shanghai, 2 × 40HC, for Al Noor.",
      reply: "Quotation Q-26-0412 is ready from the route rate: USD 4,200 ocean freight plus SAR 2,500 local charges. Confirm to send it?",
      tools: ["search_route_rates", "create_quotation", "create_job", "create_bill_of_lading", "create_invoice_from_charges"],
    },
    versus: [
      { topic: "Carrier confirmation", them: "Retyped from the line's e-mail", us: "Read by AI; a person ticks what to save" },
      { topic: "Booking confirmation", them: "Re-sent as attachments, nobody sure which is current", us: "One original, then numbered revisions" },
      { topic: "House B/L", them: "Built in a word processor", us: "Generated from the booking's own data" },
      { topic: "Profit", them: "Worked out in a spreadsheet after month end", us: "Per booking, as the charges are entered" },
    ],
    audience: [
      { title: "Operations", text: "Bookings, the carrier booking, statuses and the House B/L." },
      { title: "Sales and pricing", text: "Route rates, quotations and the customers who accept them." },
      { title: "Finance", text: "Invoices, payments, the ledger and the profit on every booking." },
    ],
    faqs: [
      { q: "Can our customers track the shipment?", a: "Yes, on a public page with no login. They enter the booking, B/L or container number with their company name or account ID, and see the status timeline only." },
      { q: "Can we bring our rate sheets?", a: "Yes. Route rates import from Excel in one go, and the assistant can search them when it drafts a quotation." },
      { q: "Which taxes does it handle?", a: "The tax of the company's country: VAT in Saudi Arabia, SST in Malaysia and PPN in Indonesia, each with its report. Saudi tax invoices carry the ZATCA QR code." },
    ],
  },

  "air-freight": {
    metaTitle: "Air freight forwarding software",
    metaDescription:
      "Express and airline air freight on the same booking desk as sea: MAWB checked as you type, House Air Waybill, chargeable weight and weekly air allocations.",
    headline: "Air freight, express or airline, on the same booking desk",
    lead: "Air bookings sit next to sea bookings in ROUTEL. Express shipments move with the carrier's waybill and tracking; airline cargo moves under a checked MAWB and your own House Air Waybill. The chargeable weight drives the charges, and the block space you buy is tracked week by week.",
    stat: { value: "43", label: "airlines recognised from the AWB prefix, Saudia among them" },
    figures: [
      { value: "64", label: "airports seeded, RUH, JED and DMM among them" },
      { value: "6000", label: "default volumetric divisor for airline cargo, 5000 for express" },
      { value: "6", label: "months of shippers listed to fill the space left" },
    ],
    features: [
      {
        title: "Express or airline cargo",
        text: "An AP partner marked as an express carrier makes the booking express, with a tracking link to DHL, FedEx, Aramex, UPS or SMSA. Any other AP makes it airline cargo.",
        points: ["Chosen by the AP partner", "Express tracking links", "Airline cargo under a MAWB"],
        mock: { title: "Air booking · NXA26000415", badge: "Airline cargo", rows: [["Route", "RUH → KUL"], ["Airline", "Saudia"], ["Pieces", "6 · 380 kg gross"]], foot: "Booked" },
      },
      {
        title: "MAWB checked, HAWB issued",
        text: "The MAWB's 11 digits are checked against IATA's check digit and the airline is named from its prefix; a wrong number is refused. The House Air Waybill is created from the booking, edited as a draft and issued in the IATA layout.",
        points: ["Check digit verified", "Airline named from the prefix", "HAWB printed on A4, locked once issued"],
        mock: { title: "MAWB 065-12345675", badge: "Valid", rows: [["Airline", "Saudia (065)"], ["HAWB", "HAWB-26000415"], ["Status", "Issued"]], foot: "Print HAWB" },
      },
      {
        title: "Chargeable weight drives the charges",
        text: "Pieces, dimensions in cm and gross kilos give the volumetric weight; the higher of the two, rounded up to the next half kilo, is the chargeable weight. Per-kg lines follow it when the pieces change, except lines already invoiced or paid.",
        points: ["Volumetric vs gross, worked out", "Divisors per carrier", "Invoiced lines stay as they are"],
        mock: { title: "Chargeable weight", rows: [["Gross", "380 kg"], ["Volumetric", "412.1 kg"], ["Chargeable", "412.5 kg"]], foot: "6 per-kg lines updated" },
      },
      {
        title: "Air allocations, read by AI",
        text: "Weekly kilos bought from an airline on a route, hard or soft. Upload the agreement and AI fills in the allocation; bookings count against their week, and for space left ROUTEL lists the partners who shipped that route in the last six months.",
        points: ["Capacity, used and remaining per week", "Unsold cost of hard space", "Who to call to fill it"],
        mock: { title: "Allocation · RUH → KUL · week 46", badge: "Hard", rows: [["Capacity", "1,000 kg"], ["Used", "612.5 kg"], ["Remaining", "387.5 kg"]], foot: "4 partners to call" },
      },
    ],
    flow: [
      { title: "Book", text: "New Booking → Air; the AP partner sets express or airline." },
      { title: "Weigh", text: "Enter the pieces; the chargeable weight follows." },
      { title: "Document", text: "Record the MAWB, then issue the House Air Waybill." },
      { title: "Fill the space", text: "The booking counts against its allocation week." },
      { title: "Bill", text: "Invoice from the booking's charges, as for sea." },
    ],
    ai: {
      title: "AI reads the airline's paperwork",
      text: "Upload the airline's allocation agreement as a PDF, scan or photo, and AI fills in the new allocation and matches the airline. The assistant answers questions about bookings and space in a sentence. Nothing is saved until a person saves it.",
      prompt: "How much space is left on RUH → KUL this week?",
      reply: "387.5 kg of 1,000 kg on the Saudia hard allocation. Four partners shipped this route in the last six months and haven't booked this week.",
    },
    versus: [
      { topic: "MAWB numbers", them: "Typed, and checked at the airport", us: "Check digit verified as you type" },
      { topic: "Chargeable weight", them: "On a calculator, then retyped", us: "From the pieces; the charges follow" },
      { topic: "Block space", them: "Half-empty weeks found after they've gone", us: "Capacity, used and remaining, week by week" },
      { topic: "Sea and air", them: "Two systems, or two products", us: "One booking desk; air opens as an activity" },
    ],
    audience: [
      { title: "Air operations", text: "Bookings, pieces, the MAWB and the House Air Waybill." },
      { title: "Sales and pricing", text: "Allocations, the space left and the partners to call." },
      { title: "Admin", text: "Airports, airlines and volumetric divisors." },
    ],
    faqs: [
      { q: "Does an express shipment get a House Air Waybill?", a: "No. The express carrier's own waybill is the document; ROUTEL keeps its tracking number and links to the carrier's tracking page." },
      { q: "What happens to the charges when the pieces change?", a: "Every per-kg line moves to the new chargeable weight. Lines already on an issued invoice or a paid AP keep their quantity, and ROUTEL tells you which ones." },
      { q: "Is air on by default?", a: "An admin opens it in Settings → Business activities, next to sea freight. A company that doesn't open it sees nothing of it." },
    ],
  },

  consolidation: {
    metaTitle: "Consolidation and LCL software",
    metaDescription:
      "Consolidate many house bookings under one master, sea LCL or air: suggested bookings, one cargo manifest, and the master's costs shared exactly to the cent.",
    headline: "Many shippers in one container, and every booking's profit right",
    lead: "A consolidation carries several house bookings under one master: an LCL container under your own MBL, an air consolidation under your own MAWB, or space bought from a co-loader. ROUTEL builds it from bookings on the same route, prints the manifest and shares the master's costs across the bookings.",
    stat: { value: "0.01", label: "the split is exact to the cent: the remainder goes to the largest fractions" },
    figures: [
      { value: "3", label: "ways to share costs: CBM, W/M or chargeable weight" },
      { value: "14", label: "days ahead that suggested bookings depart within" },
      { value: "1", label: "cargo manifest for the whole master" },
    ],
    features: [
      {
        title: "Sea or air, own or co-loaded",
        text: "Under your own MBL or MAWB, or on space bought from a co-loader, with the carrier, the ports or airports, the vessel and voyage or the flight, and the containers.",
        points: ["Sea LCL or air", "Own master or a co-loader", "Containers on the master"],
        mock: { title: "Consolidation · CON-26-0031", badge: "Open", rows: [["Mode", "Sea LCL · own MBL"], ["Route", "Port Klang → Jeddah"], ["Container", "1 × 40HC"]], foot: "5 bookings" },
      },
      {
        title: "Suggested bookings",
        text: "Bookings on the same mode and route, departing within 14 days and not already in another consolidation, nearest first. Bookings with no master number take the consolidation's, and a later change reaches them.",
        points: ["Same mode and route", "Nearest departure first", "Master number carried down"],
        mock: { title: "Suggested for CON-26-0031", rows: [["NXS26000418", "6.2 CBM · 15 Nov"], ["NXS26000421", "11.0 CBM · 16 Nov"], ["NXS26000425", "4.8 CBM · 18 Nov"]], foot: "Add 3 bookings" },
      },
      {
        title: "Costs shared to the cent",
        text: "Enter the master's costs once. ROUTEL shares them by CBM or W/M for sea, by chargeable weight for air, or by a manual share, and each share lands as a cost line on its booking. A share already finalised or paid is locked.",
        points: ["CBM, W/M or chargeable weight", "Shares become cost lines", "Finalised shares are locked"],
        mock: { title: "Share ocean freight · USD 3,100.00 · 30 CBM", rows: [["NXS26000418 · 6.2 CBM", "USD 640.67"], ["NXS26000421 · 11.0 CBM", "USD 1,136.67"], ["… 3 more", "USD 1,322.66"]], foot: "Adds up to USD 3,100.00" },
      },
      {
        title: "Manifest and profit",
        text: "One printed manifest for the master: house numbers, shippers, consignees, goods, weights and CBM or chargeable weight. Revenue, cost and profit for the consolidation and for each booking in it.",
        points: ["One cargo manifest", "Profit per consolidation", "Profit per booking stays true"],
        mock: { title: "Profit · CON-26-0031", rows: [["Revenue", "USD 4,940"], ["Cost", "USD 3,860"], ["Profit", "USD 1,080 · 21.9%"]], foot: "Print manifest" },
      },
    ],
    flow: [
      { title: "Open", text: "Create the consolidation with the master's details." },
      { title: "Fill", text: "Add the suggested bookings on the same route." },
      { title: "Cost", text: "Enter the master's costs once." },
      { title: "Share", text: "By CBM, W/M or weight, exact to the cent." },
      { title: "Close", text: "Print the manifest and close the consolidation." },
    ],
    ai: {
      title: "The assistant knows every booking's share",
      text: "Each house booking is still a full booking, with its own invoices and House B/L, so the assistant reads and works on it as on any booking: its charges, its profit, its status.",
      prompt: "What's the profit on NXS26000421 after the consolidation costs?",
      reply: "USD 412.33: revenue USD 1,549.00, cost USD 1,136.67 from its 11.0 CBM share of the ocean freight.",
      tools: ["get_job_charges"],
    },
    versus: [
      { topic: "Splitting the master's cost", them: "By hand in a spreadsheet; the cents never add up", us: "Shared by CBM, W/M or weight, exact to the cent" },
      { topic: "Profit per booking", them: "Distorted when the shared cost lands in the wrong place", us: "Each booking carries its fair share" },
      { topic: "Manifest", them: "Retyped from five bookings before the cut-off", us: "Printed from the consolidation" },
    ],
    audience: [
      { title: "LCL and consolidation desks", text: "Open masters, add bookings, close them." },
      { title: "Accounting", text: "Enter the master's costs and share them." },
      { title: "Management", text: "Profit per consolidation and per booking." },
    ],
    faqs: [
      { q: "What does W/M mean?", a: "Weight or measure: the larger of the cargo's tonnes and its CBM. Sea consolidations can share costs on it." },
      { q: "Can a booking leave a consolidation after costs were shared?", a: "Yes, unless its share is already finalised or paid. Then the share is locked until it's unlocked." },
      { q: "Does it work for air?", a: "Yes: one MAWB with several HAWBs, shared by chargeable weight." },
    ],
  },

  "import-release": {
    metaTitle: "Arrival notice and delivery order software",
    metaDescription:
      "Import release on rails: the arrival notice due on time and e-mailed as PDF, the line's release recorded, and a delivery order only once the cargo is released and paid.",
    headline: "Tell the consignee on time. Release the cargo only when it's paid.",
    lead: "For import bookings, ROUTEL tells you when the arrival notice is due, sends it as a PDF with the charges, records how the line released the cargo, and issues the delivery order only when the cargo is released and paid, or the partner is within an active credit limit.",
    stat: { value: "0", label: "delivery orders released unpaid without a reason on record" },
    figures: [
      { value: "2", label: "documents, both e-mailed as PDF from the system" },
      { value: "3", label: "ways the line releases: original B/L, telex or sea waybill" },
      { value: "1", label: "delivery order in force at a time" },
    ],
    features: [
      {
        title: "The notice, due on time",
        text: "Due by voyage length or a fixed number of days before the ETA. Due notices appear in Alerts, and a booking comes back there if the ETA moves after the notice went out.",
        points: ["Due before the ETA", "Shown in Alerts", "Back in Alerts when the ETA moves"],
        mock: { title: "Alerts · arrival notices due", badge: "3", rows: [["NXS26000398", "ETA 21 Nov · due today"], ["NXS26000402", "ETA 23 Nov · due tomorrow"], ["NXA26000390", "ETA 20 Nov · ETA moved"]], foot: "Open the booking" },
      },
      {
        title: "Arrival notice, sent from ROUTEL",
        text: "Consignee and notify party, carrier, master and house numbers, vessel or flight, route, ETA, containers or pieces, and the charges due. Send by email goes from the operations mailbox with the PDF attached, filed on the booking.",
        points: ["PDF with the charges due", "Sent from the operations mailbox", "Filed under the booking"],
        mock: { title: "Arrival Notice.pdf", badge: "Sent", rows: [["To", "Gulf Horizon FZE"], ["ETA", "21 Nov · Jeddah"], ["Charges due", "SAR 3,450.00"]], foot: "Sent by email" },
      },
      {
        title: "Delivery order with checks",
        text: "Record how the line released the cargo, with its DO number. The delivery order is issued only when released and paid, or within an active credit limit; a finance user can override with a reason, and the DO is valid for the days you set.",
        points: ["Released and paid, or on credit", "Override with a reason on record", "Valid for the days you set"],
        mock: { title: "Delivery order · DO-26-0187", badge: "Ready", rows: [["Line release", "Telex release ✓"], ["Invoice INV-26-0398", "Paid ✓"], ["Valid until", "28 Nov"]], foot: "Issue and send" },
      },
      {
        title: "AI reads the line's ETA change",
        text: "The line's arrival or delay notice is read by AI from the e-mail's attachment, and the new ETA is proposed in Documents for a person to approve.",
        points: ["Read from the line's notice", "Proposed, not applied", "A person approves"],
        mock: { title: "Read from the line's notice", badge: "AI", rows: [["Booking", "NXS26000402"], ["ETA was", "23 Nov"], ["New ETA", "25 Nov"]], foot: "Approve in Documents" },
      },
    ],
    flow: [
      { title: "Due", text: "The notice falls due before the ETA and shows in Alerts." },
      { title: "Notify", text: "Send the arrival notice by e-mail with the PDF." },
      { title: "Release", text: "Record how the line released the cargo." },
      { title: "Get paid", text: "Invoice and collect; the DO checks it." },
      { title: "Deliver", text: "Issue the delivery order and send it." },
    ],
    ai: {
      title: "The day's releases, in one answer",
      text: "Ask the assistant what needs attention today: the notices due, the unpaid invoices holding a release, the partners near their credit limit. It reads the same alerts and credit status your team sees.",
      prompt: "Which imports can't be released yet, and why?",
      reply: "Two: NXS26000402 is waiting on the telex release, and NXS26000405 has invoice INV-26-0405 unpaid, SAR 2,180.00.",
      tools: ["get_alerts", "get_partner_credit_status"],
    },
    versus: [
      { topic: "Arrival notice", them: "Sent when someone remembers", us: "Due before the ETA, in Alerts" },
      { topic: "Release", them: "A DO goes out before the invoice is paid", us: "Released and paid, or a reason on record" },
      { topic: "ETA changes", them: "Buried in an e-mail nobody reads", us: "Read by AI and proposed for approval" },
    ],
    audience: [
      { title: "Import operations", text: "Notices, releases and delivery orders." },
      { title: "Finance", text: "The payment or credit check, and any override." },
      { title: "Customer service", text: "Consignees told on time, with the charges due." },
    ],
    faqs: [
      { q: "Does it work for air imports?", a: "Yes, for airline cargo. Express shipments are delivered by the carrier, so they're left out, and air needs no B/L release." },
      { q: "What if the ETA changes after the notice was sent?", a: "The booking comes back to Alerts so you can send an updated notice." },
      { q: "Who can override the payment check?", a: "A finance user (admin, management or accounting), with a reason that stays on record." },
    ],
  },

  nvocc: {
    metaTitle: "NVOCC software",
    metaDescription:
      "NVOCC on ROUTEL (in development): Bills of Lading in your own name, demurrage and detention on both sides, and agents with profit share.",
    headline: "Your own Bills of Lading, your D&D, your agent network",
    lead: "The NVOCC module turns the forwarding core into a carrier's desk: Bills of Lading issued in your name and on your terms, demurrage and detention worked out on both sides of the margin, and origin and destination agents settled by their profit-share agreement.",
    stat: { value: "2", label: "sides of every D&D tariff: what you charge, and what the line charges you" },
    figures: [
      { value: "5", label: "profit-share models: percentage, per container, per CBM, per B/L, or none" },
      { value: "2", label: "languages for your B/L terms, edited in Settings" },
      { value: "1", label: "agent statement per booking or per period" },
    ],
    features: [
      {
        title: "Bills of Lading in your name",
        text: "Numbered with a prefix per office or branch, printed with your own terms on the reverse, edited in Settings in English and Arabic. Issuing needs an authorised signatory, whose name prints on the B/L. Seaway bills, short-form B/Ls and the originals issued and surrendered are tracked.",
        points: ["Prefix per office", "Your terms, editable", "Authorised signatories"],
        mock: { title: "B/L · RTL-JED-26-0102", badge: "Original 3/3", rows: [["Issued by", "Your company, as carrier"], ["Signed by", "Authorised signatory"], ["Type", "Ocean B/L"]], foot: "Track originals" },
      },
      {
        title: "Demurrage and detention, both sides",
        text: "Containers become records with their dates: discharge, gate out full, empty return. Two tariffs, your customer's and the line's, with free days and daily tiers per port and container type; ROUTEL works out what you bill and what you'll be billed, and shows the margin.",
        points: ["Your tariff and the line's", "Per container, AR and AP", "Alerts before free time ends"],
        mock: { title: "D&D · MSCU 442118-0", rows: [["Free days", "4 · ended 19 Nov"], ["To bill (AR)", "6 days · USD 150"], ["Line's charge (AP)", "6 days · USD 120"]], foot: "Margin USD 30" },
      },
      {
        title: "Agents and profit share",
        text: "Origin and destination agents on every booking, each with the profit-share model an admin set: a percentage, an amount per container, per CBM or per B/L, or none. Settlements produce a debit or credit note and the agent's statement.",
        points: ["Origin and destination agents", "Models set by the admin", "Debit or credit notes"],
        mock: { title: "Agent settlement · Oct", rows: [["Agent", "Destination agent, Shanghai"], ["Model", "50/50 profit share"], ["Due to agent", "USD 1,240.00"]], foot: "Credit note drafted" },
      },
      {
        title: "Electronic B/L, with a certified platform",
        text: "The eBL is planned through an approved eBL platform on the DCSA standard, not a platform of our own. It waits on the choice of platform, a commercial agreement and each country's legal position.",
        points: ["Through a certified platform", "DCSA standard", "Awaiting an agreement"],
        mock: { title: "eBL", badge: "Awaiting agreement", rows: [["Standard", "DCSA"], ["Platform", "To be chosen"], ["Status", "Planned"]] },
      },
    ],
    flow: [
      { title: "Book", text: "The same booking, with your role as carrier." },
      { title: "Issue", text: "Your B/L, numbered, signed and tracked." },
      { title: "Track boxes", text: "Container dates drive the free time." },
      { title: "Bill D&D", text: "Your tariff to the customer, the line's to you." },
      { title: "Settle agents", text: "By their profit-share agreement." },
    ],
    ai: {
      title: "D&D dates from the e-mail, not from memory",
      text: "Container dates are entered by hand at first, then read by AI from the line's e-mails, then from container tracking. Every date the AI reads waits for a person's confirmation.",
      prompt: "Which containers run out of free time this week?",
      reply: "Three, all at Jeddah: MSCU 442118-0 on Tuesday, and two of Gulf Horizon's on Thursday. Draft the reminders?",
    },
    versus: [
      { topic: "Own-name B/L", them: "Templates in a word processor", us: "Numbered, signed by an authorised user, tracked" },
      { topic: "D&D", them: "Worked out on a calendar, often after the line's invoice", us: "Both tariffs, per container, with alerts" },
      { topic: "Agent profit share", them: "Spreadsheets at month end", us: "Set per agent, settled with notes and statements" },
    ],
    audience: [
      { title: "NVOCCs", text: "B/Ls in your name, on your terms." },
      { title: "Carriers' agents", text: "Equipment, free time and the agent network." },
      { title: "Forwarders growing into NVOCC", text: "The same bookings, with a carrier's desk on top." },
    ],
    faqs: [
      { q: "Is NVOCC available today?", a: "It is in development. The design above is approved; register interest and we'll open it to you first." },
      { q: "Will it change how our forwarding works?", a: "No. New modules are off by default and open per company from its business activities; existing work stays as it is." },
      { q: "Which plan includes it?", a: "NVOCC, Customs & Agencies, at $899 a month, coming." },
    ],
  },

  "land-transport": {
    metaTitle: "Land transport and trucking software",
    metaDescription:
      "Land transport on ROUTEL (in development): pickup and delivery orders, container moves to and from the port, and proof of delivery from the driver's phone with no app.",
    headline: "Trucking on the same booking, signed for on the driver's phone",
    lead: "Transport orders for pickups, deliveries and container moves, linked to a booking or standing alone. The driver gets a one-time link, with no app and no login, and the proof of delivery lands on the booking with a photo, a name and a signature.",
    stat: { value: "0", label: "apps for the driver to install: a signed one-time link opens the order" },
    figures: [
      { value: "4", label: "kinds of order: pickup, delivery, port move, warehouse transfer" },
      { value: "1", label: "link per order, expiring when the order ends" },
      { value: "6", label: "statuses, from Planned to Delivered, Failed or Cancelled" },
    ],
    features: [
      {
        title: "Transport orders",
        text: "Pickup, delivery, a container to or from the port, or a move between two warehouses; linked to a booking or standing alone. From and to, the date and time window, the cargo, and the trucking company as an AP partner or your own driver, with the truck and the driver's phone.",
        points: ["Four kinds of order", "On a booking or on its own", "Your trucks or a trucking company"],
        mock: { title: "Transport order · TO-26-0244", badge: "Sent to driver", rows: [["Type", "Container from the port"], ["From → To", "Jeddah Islamic Port → Al Noor DC"], ["Window", "21 Nov, 08:00–12:00"]], foot: "Truck 4721 · driver" },
      },
      {
        title: "Proof of delivery, no app",
        text: "The driver opens a signed one-time link on the phone that shows that order only. A photo, the receiver's name and signature, and the time; it is filed in the booking's documents, the status changes, and it shows in tracking. The link expires with the order.",
        points: ["Photo, name, signature, time", "Filed on the booking", "Shown in tracking"],
        mock: { title: "Proof of delivery", badge: "Delivered", rows: [["Received by", "Warehouse supervisor"], ["Time", "21 Nov, 10:42"], ["Photo", "1 attached"]], foot: "Signed on the driver's phone" },
      },
      {
        title: "The money on the booking",
        text: "The trucking company's cost enters the booking's charges as AP and the selling price as a charge, so the booking's profit stays true. The trucker's invoice is read by AI, as vendor invoices are today.",
        points: ["Trucking cost as AP", "Selling price as a charge", "Trucker's invoice read by AI"],
        mock: { title: "Charges · NXS26000398", rows: [["Trucking (AP)", "SAR 950.00"], ["Delivery (AR)", "SAR 1,300.00"], ["Margin", "SAR 350.00"]] },
      },
      {
        title: "From the delivery order to the truck",
        text: "When a delivery order is issued, ROUTEL suggests a delivery transport order for the consignee. Driver location, fuel per trip from the receipt photo and actual against planned trip time are being discussed with trucking companies before they're built.",
        points: ["Suggested from the DO", "Fuel and trip time under study", "Designed with trucking companies"],
        mock: { title: "Suggested from DO-26-0187", rows: [["Deliver to", "Gulf Horizon FZE"], ["Container", "MSCU 442118-0"], ["When", "After release"]], foot: "Create transport order" },
      },
    ],
    flow: [
      { title: "Plan", text: "Create the order, on a booking or alone." },
      { title: "Send", text: "The driver gets a one-time link." },
      { title: "Pick up", text: "The driver marks the pickup." },
      { title: "Deliver", text: "Photo, name and signature on the phone." },
      { title: "Bill", text: "Cost and price on the booking's charges." },
    ],
    ai: {
      title: "The trucker's invoice, read like any other",
      text: "AI reads the trucking company's invoice into cost lines, as it reads vendor invoices today; a person confirms before anything is saved.",
      prompt: "Record the trucker's invoice for NXS26000398.",
      reply: "Read SAR 950.00 for the port move on 21 Nov, matching TO-26-0244. Confirm to add it as an AP cost?",
    },
    versus: [
      { topic: "Proof of delivery", them: "Paper slips, photographed later", us: "Signed on the driver's phone, filed on the booking" },
      { topic: "Driver tools", them: "An app to install and log into", us: "A one-time link, no account" },
      { topic: "Trucking cost", them: "Outside the shipment's profit", us: "On the booking's charges" },
    ],
    audience: [
      { title: "Forwarders with trucks", text: "First and last mile on the same booking." },
      { title: "Trucking companies", text: "Orders, drivers and proof of delivery." },
      { title: "3PL operators", text: "Transfers between warehouses and deliveries to clients." },
    ],
    faqs: [
      { q: "Is land transport available today?", a: "It is in development. Register interest and we'll open it to you first." },
      { q: "Does the driver need an account?", a: "No. The link shows only that order and expires when the order ends." },
      { q: "Which plans include it?", a: "Freight Forwarder Growth when it launches, and the 3PL plan." },
    ],
  },

  warehousing: {
    metaTitle: "Warehouse receipts and CFS software",
    metaDescription:
      "Warehouse receipts and CFS on ROUTEL (in development): expected cargo read by AI, barcode labels scanned from a phone, load plans, cargo release and your own storage tariff.",
    headline: "Cargo received, labelled and loaded, with nothing missing",
    lead: "For forwarders who receive their customers' cargo to consolidate it, and for CFS operators. An expected shipment comes from the booking or the customer's e-mail, AI fills the package lines, the storekeeper confirms on the phone, and every package carries a barcode that's scanned out.",
    stat: { value: "1", label: "barcode label per package, scanned in and out from a phone camera" },
    figures: [
      { value: "4", label: "stages: expected, received, in warehouse, loaded or released" },
      { value: "0", label: "storage tariffs fixed in the code: set your own" },
      { value: "2", label: "checks before release: payment or active credit, and proof of delivery" },
    ],
    features: [
      {
        title: "Warehouse receipts",
        text: "Numbered, with the depositor as an AR partner, who delivered it (a trucking company or driver, linked to the transport order), the time, the package lines with count, packing, dimensions, weight and marks, photos and damage notes.",
        points: ["Package lines with dimensions", "Photos and damage notes", "Linked to the transport order"],
        mock: { title: "Warehouse receipt · WR-26-0519", badge: "Received", rows: [["Depositor", "Al Noor Trading"], ["Packages", "12 cartons · 1.84 CBM"], ["Damage", "None noted"]], foot: "3 photos" },
      },
      {
        title: "Expected cargo, filled by AI",
        text: "An expected shipment is created from the booking or the customer's e-mail; AI reads the packing list or delivery note and fills the lines, and the storekeeper matches and confirms from the phone. Volume and volumetric weight are worked out from the dimensions.",
        points: ["From the booking or an e-mail", "Packing list read by AI", "Confirmed on the phone"],
        mock: { title: "Expected · from packing list.pdf", badge: "AI", rows: [["Lines read", "12 cartons"], ["Each", "60 × 40 × 64 cm · 18 kg"], ["Total", "1.84 CBM · 216 kg"]], foot: "Match and confirm" },
      },
      {
        title: "Barcodes, scanned out",
        text: "A barcode label is printed from the browser for every package. When cargo is loaded or released, the storekeeper scans it with the phone camera, so ROUTEL knows which package left, for which receipt and booking, and a short or extra package shows before the container is closed.",
        points: ["Printed from the browser", "Scanned with the phone", "Short or extra caught before closing"],
        mock: { title: "Loading CON-26-0031", badge: "11 / 12", rows: [["Scanned", "11 packages"], ["Missing", "WR-26-0519 · carton 7"], ["Container", "MSCU 442118-0"]], foot: "Hold before closing" },
      },
      {
        title: "Load plans, release and storage charges",
        text: "Pick receipts into a consolidation or a container for a load plan, each receipt tied to its house booking. Cargo release follows the same checks as the delivery order. Storage is billed by the tariff you set in Settings: per day, week or month, per package, pallet, CBM or kg, with free days, tiers and handling.",
        points: ["Load plan into a consolidation", "Release with payment checks", "Your own storage tariff"],
        mock: { title: "Storage · WR-26-0519", rows: [["Free days", "5"], ["Billed", "9 days × 1.84 CBM"], ["Handling in/out", "SAR 120.00"]], foot: "Added to the booking's charges" },
      },
    ],
    flow: [
      { title: "Expect", text: "From the booking or the customer's e-mail." },
      { title: "Receive", text: "Count, measure, photograph, confirm." },
      { title: "Label", text: "A barcode on every package." },
      { title: "Load", text: "Scan into the consolidation or container." },
      { title: "Release", text: "Paid or on credit, with proof of delivery." },
    ],
    ai: {
      title: "The packing list fills the receipt",
      text: "AI reads the packing list or the delivery note into package lines; the storekeeper matches them against what arrived and confirms. Nothing is saved until a person confirms it.",
      prompt: "Al Noor's cargo arrived. Here's the packing list.",
      reply: "12 cartons, 60 × 40 × 64 cm, 18 kg each: 1.84 CBM, 216 kg. Expected under NXS26000418. Confirm the receipt?",
    },
    versus: [
      { topic: "Receiving", them: "Package lines typed from the packing list", us: "Read by AI, confirmed on the phone" },
      { topic: "Loading", them: "A missing carton found at destination", us: "Scanned out; short or extra caught before closing" },
      { topic: "Storage charges", them: "One fixed method, or a spreadsheet", us: "Your tariff, set in Settings" },
    ],
    audience: [
      { title: "Forwarders with a warehouse", text: "Receive, consolidate and load." },
      { title: "CFS operators", text: "Receipts, load plans and release." },
      { title: "3PL operators", text: "The receiving side of contract logistics." },
    ],
    faqs: [
      { q: "Is it available today?", a: "It is in development. Register interest and we'll open it to you first." },
      { q: "How is storage billed?", a: "By the warehouse tariff you set in Settings. The defaults are being tuned with freight experts before launch." },
      { q: "Do we need scanners?", a: "No. The barcode is scanned with the phone's camera." },
    ],
  },

  "shipping-agency": {
    metaTitle: "Shipping agency software",
    metaDescription:
      "Shipping agency on ROUTEL (in development): port calls, import and export manifests, delivery orders and D&D on behalf of the line, and PDA/FDA, for Saudi Arabia, Malaysia and Indonesia.",
    headline: "Line agency, from the port call to the final disbursement account",
    lead: "Agency work turns on the vessel's port call, not on a booking. ROUTEL gives it its own backbone: the call and its manifests, delivery orders and demurrage on behalf of the line, and the port disbursement accounts, settled with the principal on the same finance core.",
    stat: { value: "3", label: "countries from day one: Saudi Arabia, Malaysia and Indonesia" },
    figures: [
      { value: "2", label: "disbursement accounts per call: PDA, then FDA" },
      { value: "2", label: "manifests per call: import and export" },
      { value: "1", label: "core for every country; formats and port fees are settings" },
    ],
    features: [
      {
        title: "Port calls",
        text: "Each call holds the vessel, the voyage, the port, the principal line as a partner, the ETA, ATA and ETD, and the berth.",
        points: ["Principal as a partner", "ETA, ATA and ETD", "Berth"],
        mock: { title: "Port call · Jeddah · 412E", badge: "Alongside", rows: [["Vessel", "MSC ISABELLA"], ["ATA", "21 Nov, 06:10"], ["ETD", "22 Nov, 18:00"]], foot: "Berth 12" },
      },
      {
        title: "Manifests, read by AI",
        text: "Import and export manifests for every call, line by line from the line's B/Ls: B/L number, consignee, containers and goods. They import from Excel or from a PDF that AI reads; EDI comes later.",
        points: ["Import and export", "From Excel or PDF", "EDI later"],
        mock: { title: "Import manifest · 412E", badge: "AI", rows: [["B/Ls", "148"], ["Containers", "312"], ["Read from", "manifest.pdf"]], foot: "Review and confirm" },
      },
      {
        title: "On behalf of the line",
        text: "Delivery orders for each line B/L, on the line's conditions (the original or a telex release, the charges paid), and demurrage collected on the line's tariff, on the same engines as forwarding.",
        points: ["Delivery orders for the line", "D&D on the line's tariff", "The same checks as forwarding"],
        mock: { title: "DO for MEDU4471820", rows: [["Release", "Original B/L received ✓"], ["Charges", "Paid ✓"], ["D&D", "Within free time"]], foot: "Issue on behalf of the line" },
      },
      {
        title: "PDA and FDA",
        text: "An estimate for each call (port dues, pilotage, towage, the agency fee), the advance from the principal, the actual costs and the final settlement, with the principal's statement of account.",
        points: ["Estimate, advance, actual", "Final settlement", "Principal's statement"],
        mock: { title: "FDA · Jeddah · 412E", rows: [["PDA (advance)", "USD 48,000"], ["Actual costs", "USD 46,320"], ["Due to principal", "USD 1,680"]], foot: "Statement of account" },
      },
    ],
    flow: [
      { title: "Nominate", text: "Open the port call for the principal." },
      { title: "Estimate", text: "Send the PDA and collect the advance." },
      { title: "Manifest", text: "Import and export, read by AI." },
      { title: "Release", text: "Delivery orders on behalf of the line." },
      { title: "Settle", text: "FDA and the principal's statement." },
    ],
    ai: {
      title: "The manifest, without the retyping",
      text: "AI reads the line's manifest PDF into lines for a person to review, and the assistant answers questions about a call in a sentence.",
      prompt: "How many import containers on 412E are still unreleased?",
      reply: "41 of 312: 28 waiting on the original B/L, 13 with charges unpaid.",
    },
    versus: [
      { topic: "Manifests", them: "Retyped from the line's PDF", us: "Read by AI, from Excel or PDF" },
      { topic: "PDA/FDA", them: "Spreadsheets per call", us: "Estimate to settlement on the finance core" },
      { topic: "Countries", them: "A version per country", us: "One core; formats and fees are settings" },
    ],
    audience: [
      { title: "Line agencies", text: "Port calls, manifests and releases." },
      { title: "Port agents", text: "Disbursement accounts and principal statements." },
      { title: "Groups across the region", text: "Saudi Arabia, Malaysia and Indonesia on one core." },
    ],
    faqs: [
      { q: "Is it available today?", a: "It is in development. Register interest and we'll open it to you first." },
      { q: "Which countries?", a: "Saudi Arabia, Malaysia and Indonesia together, with each country's manifest format, port fees, currency and tax as settings." },
      { q: "Which plan includes it?", a: "NVOCC, Customs & Agencies, at $899 a month, coming." },
    ],
  },

  "customs-brokerage": {
    metaTitle: "Customs brokerage software",
    metaDescription:
      "Customs brokerage on ROUTEL (in development): declarations with HS codes suggested by AI and confirmed by the broker, bulk entry from Excel, and gateways to FASAH, CEISA and uCustoms awaiting government approval.",
    headline: "Customs declarations prepared by AI, decided by the broker",
    lead: "A declaration is its own record, linked to the booking when the shipment is yours, or standing alone. AI reads the commercial invoice and the packing list, suggests an HS code for every line with its reason, and the broker confirms or changes it. No declaration goes out with a code a person didn't confirm.",
    stat: { value: "0", label: "declarations filed with an HS code no person confirmed" },
    figures: [
      { value: "3", label: "government gateways prepared: FASAH, CEISA and uCustoms" },
      { value: "3", label: "kinds of declaration: import, export and transit" },
      { value: "1", label: "Excel file for thousands of house bills" },
    ],
    features: [
      {
        title: "Declarations",
        text: "Import, export or transit; the declarant, the lines with HS codes, values, duties and taxes, the status and the documents required. Duties are entered by hand first, then come from each country's tariff tables.",
        points: ["Import, export, transit", "Lines with HS codes", "Duties and taxes"],
        mock: { title: "Import declaration · CD-26-0077", badge: "Draft", rows: [["Lines", "8"], ["Customs value", "SAR 184,600"], ["Linked booking", "NXS26000402"]], foot: "Prepare for filing" },
      },
      {
        title: "HS codes suggested by AI",
        text: "AI reads the commercial invoice and the packing list to fill the declaration, and suggests an HS code for every line with the reason for it. The broker confirms or changes each one.",
        points: ["Invoice and packing list read", "A reason with every code", "The broker decides"],
        mock: { title: "Line 3 · Stainless steel kitchen sinks", badge: "AI", rows: [["Suggested HS", "7324.10"], ["Reason", "Sinks and wash basins, of stainless steel"], ["Status", "Waiting for the broker"]], foot: "Confirm or change" },
      },
      {
        title: "Bulk entry",
        text: "For small parcels and e-commerce: thousands of house bills imported from one Excel file into consolidated declarations, heading later to each country's low-value lanes through the same gateway.",
        points: ["Thousands of house bills", "From one Excel file", "Consolidated declarations"],
        mock: { title: "Bulk import · parcels.xlsx", rows: [["House bills", "2,418"], ["Declarations", "6"], ["Errors", "3 to review"]], foot: "Review errors" },
      },
      {
        title: "Gateways, awaiting approval",
        text: "Built now: the manual gateway that prepares the declaration and prints or exports it. The FASAH (Saudi Arabia), CEISA (Indonesia) and uCustoms (Malaysia) gateways are designed in and wait on government permits and access.",
        points: ["Manual gateway first", "FASAH, CEISA, uCustoms", "Awaiting government permits"],
        mock: { title: "Gateways", rows: [["Manual (print, export)", "Built first"], ["FASAH · Saudi Arabia", "Awaiting approval"], ["CEISA · uCustoms", "Awaiting approval"]] },
      },
    ],
    flow: [
      { title: "Receive", text: "The commercial invoice and packing list." },
      { title: "Read", text: "AI fills the lines and suggests HS codes." },
      { title: "Decide", text: "The broker confirms or changes each code." },
      { title: "Prepare", text: "Duties, taxes and the documents required." },
      { title: "File", text: "Print or export now; gateways once approved." },
    ],
    ai: {
      title: "A suggestion with its reason, never a filing on its own",
      text: "The AI explains every HS code it suggests, so the broker can check the reasoning in seconds. It never files: a declaration only goes out with codes a person confirmed.",
      prompt: "Fill the declaration from this commercial invoice.",
      reply: "8 lines read, customs value SAR 184,600. HS codes suggested for all 8, each with its reason; 2 are worth a second look. Review them?",
    },
    versus: [
      { topic: "HS classification", them: "Looked up line by line", us: "Suggested by AI with its reason; the broker decides" },
      { topic: "Data entry", them: "Retyped from the commercial invoice", us: "Read from the invoice and the packing list" },
      { topic: "Next to the shipment", them: "A separate customs system", us: "The declaration sits on the booking" },
    ],
    audience: [
      { title: "Customs brokers", text: "Declarations prepared faster, decided by you." },
      { title: "Forwarders with clearance", text: "Customs next to the shipment it belongs to." },
      { title: "E-commerce importers", text: "Bulk entry for small parcels." },
    ],
    faqs: [
      { q: "Is it available today?", a: "It is in development, and the government gateways wait on permits and access. Register interest and we'll open it to you first." },
      { q: "Does the AI file declarations?", a: "No. It suggests; the broker confirms every HS code, and nothing is filed with a code a person didn't confirm." },
      { q: "Which plan includes it?", a: "NVOCC, Customs & Agencies, at $899 a month, coming." },
    ],
  },

  "contract-logistics": {
    metaTitle: "3PL inventory software",
    metaDescription:
      "Inventory for your clients on ROUTEL (planned): items per client, locations down to the bin, an inventory ledger that's never edited, picking by FIFO or FEFO, and monthly storage billing.",
    headline: "Your clients' stock, kept like a ledger",
    lead: "For warehousing and distribution companies that hold stock for traders, distributors and online shops and ship it on their orders. The record is the client's item, not the booking; every movement is a line in a ledger, and billing runs from storage and handling each month.",
    stat: { value: "4", label: "levels of location: warehouse, zone, rack and bin" },
    figures: [
      { value: "0", label: "inventory movements edited or deleted after the fact" },
      { value: "2", label: "picking rules: oldest first or nearest expiry first" },
      { value: "1", label: "monthly billing run, creating draft invoices only" },
    ],
    features: [
      {
        title: "Items per client",
        text: "Every client has its items: SKU, unit, and tracking by batch, serial number or expiry date as each item needs. Locations run warehouse → zone → rack → bin.",
        points: ["SKU and unit", "Batch, serial or expiry", "Down to the bin"],
        mock: { title: "Item · AN-SKU-1042", badge: "Al Noor", rows: [["Unit", "Carton of 24"], ["Tracking", "Batch and expiry"], ["On hand", "1,280 cartons"]], foot: "4 locations" },
      },
      {
        title: "An inventory ledger",
        text: "Every receipt, issue, transfer and adjustment is a line that is never edited or deleted, and the balance is the sum of the lines, on the same idea as ROUTEL's books. Adjustments and stock counts need approval.",
        points: ["Lines never edited", "Balance from the lines", "Adjustments approved"],
        mock: { title: "Movements · AN-SKU-1042", rows: [["Received · ASN-0917", "+600"], ["Issued · RO-2231", "−240"], ["Adjustment (approved)", "−2"]], foot: "Balance 1,280" },
      },
      {
        title: "In and out",
        text: "In: an advance shipping notice from the client or its e-mail, read by AI, then receiving and put-away. Out: a release order, the quantity reserved oldest first or nearest expiry first, a pick list, packing and shipping by transport order or booking.",
        points: ["ASN read by AI", "FIFO or FEFO", "Pick, pack, ship"],
        mock: { title: "Release order · RO-2231", badge: "Picking", rows: [["Lines", "3 items · 240 cartons"], ["Rule", "Nearest expiry first"], ["Ship by", "Transport order"]], foot: "Print pick list" },
      },
      {
        title: "Monthly billing",
        text: "Storage per pallet per day or per CBM per month, handling per movement and value-added services, gathered in a monthly run that creates draft invoices for the accountant to review and issue.",
        points: ["Storage and handling", "Value-added services", "Drafts for the accountant"],
        mock: { title: "Billing run · October", rows: [["Clients", "14"], ["Draft invoices", "14"], ["Total", "SAR 96,420.00"]], foot: "Review and issue" },
      },
    ],
    flow: [
      { title: "Notify", text: "The client's ASN, read by AI." },
      { title: "Receive", text: "Count, check and put away." },
      { title: "Hold", text: "Every movement in the ledger." },
      { title: "Release", text: "Reserve, pick, pack and ship." },
      { title: "Bill", text: "A monthly run of draft invoices." },
    ],
    ai: {
      title: "Stock questions, answered from the ledger",
      text: "Balances come from the ledger's lines, so the answer to “how much is left” is always the same one your team sees.",
      prompt: "How many cartons of AN-SKU-1042 expire before March?",
      reply: "320 cartons in two batches, both in zone B. Reserve them first on the next release order?",
    },
    versus: [
      { topic: "Stock balance", them: "A number someone overwrote", us: "The sum of a ledger nobody edits" },
      { topic: "Picking", them: "Whatever is nearest", us: "Oldest first or nearest expiry first" },
      { topic: "Storage billing", them: "Worked out at month end", us: "A monthly run of draft invoices" },
    ],
    audience: [
      { title: "3PL warehouses", text: "Stock held for many clients." },
      { title: "Distribution companies", text: "Release orders shipped by your trucks." },
      { title: "E-commerce fulfilment", text: "Items, batches and expiry dates." },
    ],
    faqs: [
      { q: "Is it available today?", a: "It is planned, and will be built with a first client who needs it and tests it. Register interest to be that client." },
      { q: "Can clients see their stock?", a: "Through the client portal, which is planned." },
      { q: "Which plan includes it?", a: "3PL: Warehousing & Distribution, at $499 a month, coming." },
    ],
  },
};
