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
        text: "Buying prices per route, by shipping line and container type, with the dates they're valid for, entered once or imported from an Excel rate sheet. Compare the lines on a route side by side, quote from the one you choose, and convert the accepted quotation to a booking with nothing typed twice.",
        points: ["Lines on a route, side by side", "Validity dates on every rate", "Convert to Booking in one action"],
        mock: { title: "Quotation · Q-27-0412", badge: "Accepted", rows: [["Route", "Jeddah → Shanghai"], ["Ocean freight 2 × 40HC", "USD 4,200"], ["Local charges", "SAR 2,500"]], foot: "Convert to Booking" },
      },
      {
        title: "The carrier booking, read by AI",
        text: "Read Carrier Confirmation has AI read the line's PDF or a linked e-mail: vessel and voyage, cut-offs and the carrier's booking number. You tick what to save, and the Booking Confirmation goes to your customer with numbered revisions.",
        points: ["Reads the PDF or the e-mail", "You tick what to save", "Revised confirmations are numbered"],
        mock: { title: "Read from MSC confirmation.pdf", badge: "AI", rows: [["Vessel", "MSC ISABELLA · 412E"], ["Cargo cut-off", "14 Mar, 12:00"], ["Carrier ref.", "MSCJED4471"]], foot: "Save the ticked fields" },
      },
      {
        title: "A House B/L from the booking",
        text: "Generate Bill of Lading builds the House B/L and its container annexure from the booking's own parties, vessel and containers, in a carrier-style layout, then finalises and surrenders it.",
        points: ["Built from booking data", "Container annexure included", "Finalised, then surrendered"],
        mock: { title: "House B/L · HBL-27000412", badge: "Final", rows: [["Shipper", "Al Noor Trading"], ["Consignee", "Gulf Horizon FZE"], ["Master B/L", "MSCJED4471"]], foot: "Download PDF" },
      },
      {
        title: "Invoices, payments and the books",
        text: "Create Invoice turns the booking's sale lines into tax invoices; receipts and vendor payments post to the general ledger as they happen, and each booking shows its own profit.",
        points: ["Tax invoices from the charges", "Payments matched from the finance mailbox", "Profit per booking: AP, AR and net"],
        mock: { title: "Tax invoice · INV-27-0412", badge: "Issued", rows: [["Ocean freight 40HC", "USD 4,200"], ["Local charges", "SAR 2,500"], ["Total", "SAR 18,250.00"]], foot: "Profit 23.2%" },
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
      reply: "Quotation Q-27-0412 is ready from the route rate: USD 4,200 ocean freight plus SAR 2,500 local charges. Confirm to send it?",
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
        mock: { title: "Air booking · NXA27000415", badge: "Airline cargo", rows: [["Route", "RUH → KUL"], ["Airline", "Saudia"], ["Pieces", "6 · 380 kg gross"]], foot: "Booked" },
      },
      {
        title: "MAWB checked, HAWB issued",
        text: "The MAWB's 11 digits are checked against IATA's check digit and the airline is named from its prefix; a wrong number is refused. The House Air Waybill is created from the booking, edited as a draft and issued in the IATA layout.",
        points: ["Check digit verified", "Airline named from the prefix", "HAWB printed on A4, locked once issued"],
        mock: { title: "MAWB 065-12345675", badge: "Valid", rows: [["Airline", "Saudia (065)"], ["HAWB", "HAWB-27000415"], ["Status", "Issued"]], foot: "Print HAWB" },
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
        mock: { title: "Consolidation · CON-27-0031", badge: "Open", rows: [["Mode", "Sea LCL · own MBL"], ["Route", "Port Klang → Jeddah"], ["Container", "1 × 40HC"]], foot: "5 bookings" },
      },
      {
        title: "Suggested bookings",
        text: "Bookings on the same mode and route, departing within 14 days and not already in another consolidation, nearest first. Bookings with no master number take the consolidation's, and a later change reaches them.",
        points: ["Same mode and route", "Nearest departure first", "Master number carried down"],
        mock: { title: "Suggested for CON-27-0031", rows: [["NXS27000418", "6.2 CBM · 15 Mar"], ["NXS27000421", "11.0 CBM · 16 Mar"], ["NXS27000425", "4.8 CBM · 18 Mar"]], foot: "Add 3 bookings" },
      },
      {
        title: "Costs shared to the cent",
        text: "Enter the master's costs once. ROUTEL shares them by CBM or W/M for sea, by chargeable weight for air, or by a manual share, and each share lands as a cost line on its booking. A share already finalised or paid is locked.",
        points: ["CBM, W/M or chargeable weight", "Shares become cost lines", "Finalised shares are locked"],
        mock: { title: "Share ocean freight · USD 3,100.00 · 30 CBM", rows: [["NXS27000418 · 6.2 CBM", "USD 640.67"], ["NXS27000421 · 11.0 CBM", "USD 1,136.67"], ["… 3 more", "USD 1,322.66"]], foot: "Adds up to USD 3,100.00" },
      },
      {
        title: "Manifest and profit",
        text: "One printed manifest for the master: house numbers, shippers, consignees, goods, weights and CBM or chargeable weight. Revenue, cost and profit for the consolidation and for each booking in it.",
        points: ["One cargo manifest", "Profit per consolidation", "Profit per booking stays true"],
        mock: { title: "Profit · CON-27-0031", rows: [["Revenue", "USD 4,940"], ["Cost", "USD 3,860"], ["Profit", "USD 1,080 · 21.9%"]], foot: "Print manifest" },
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
      prompt: "What's the profit on NXS27000421 after the consolidation costs?",
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
        mock: { title: "Alerts · arrival notices due", badge: "3", rows: [["NXS27000398", "ETA 21 Mar · due today"], ["NXS27000402", "ETA 23 Mar · due tomorrow"], ["NXA27000390", "ETA 20 Mar · ETA moved"]], foot: "Open the booking" },
      },
      {
        title: "Arrival notice, sent from ROUTEL",
        text: "Consignee and notify party, carrier, master and house numbers, vessel or flight, route, ETA, containers or pieces, and the charges due. Send by email goes from the operations mailbox with the PDF attached, filed on the booking.",
        points: ["PDF with the charges due", "Sent from the operations mailbox", "Filed under the booking"],
        mock: { title: "Arrival Notice.pdf", badge: "Sent", rows: [["To", "Gulf Horizon FZE"], ["ETA", "21 Mar · Jeddah"], ["Charges due", "SAR 3,450.00"]], foot: "Sent by email" },
      },
      {
        title: "Delivery order with checks",
        text: "Record how the line released the cargo, with its DO number. The delivery order is issued only when released and paid, or within an active credit limit; a finance user can override with a reason, and the DO is valid for the days you set.",
        points: ["Released and paid, or on credit", "Override with a reason on record", "Valid for the days you set"],
        mock: { title: "Delivery order · DO-27-0187", badge: "Ready", rows: [["Line release", "Telex release ✓"], ["Invoice INV-27-0398", "Paid ✓"], ["Valid until", "28 Mar"]], foot: "Issue and send" },
      },
      {
        title: "AI reads the line's ETA change",
        text: "The line's arrival or delay notice is read by AI from the e-mail's attachment, and the new ETA is proposed in Documents for a person to approve.",
        points: ["Read from the line's notice", "Proposed, not applied", "A person approves"],
        mock: { title: "Read from the line's notice", badge: "AI", rows: [["Booking", "NXS27000402"], ["ETA was", "23 Mar"], ["New ETA", "25 Mar"]], foot: "Approve in Documents" },
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
      reply: "Two: NXS27000402 is waiting on the telex release, and NXS27000405 has invoice INV-27-0405 unpaid, SAR 2,180.00.",
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
      "NVOCC on ROUTEL: Bills of Lading in your own name, demurrage and detention on both sides, and agents with profit share, monthly settlements and agent statements.",
    headline: "Your own Bills of Lading, your D&D, your agent network",
    lead: "The NVOCC module turns the forwarding core into a carrier's desk: Bills of Lading issued in your name and on your terms, demurrage and detention worked out on both sides of the margin, and origin and destination agents settled by their profit-share agreement.",
    stat: { value: "2", label: "sides of every D&D tariff: what you charge, and what the line charges you" },
    figures: [
      { value: "5", label: "ways to share with an agent: share of the profit, per container, per CBM, fixed per booking, or none" },
      { value: "3", label: "ways to issue: Bill of Lading, Sea Waybill or short-form B/L" },
      { value: "1", label: "numbered agent statement per period, as a PDF" },
    ],
    features: [
      {
        title: "Bills of Lading in your name",
        text: "Issued as a Bill of Lading, a Sea Waybill or a short-form B/L, printed with your own terms on the reverse (uploaded from Word in Settings). Only an authorised signatory approves it, and their name prints under the signature. Each original printed is logged, and the originals handed over and returned are tracked.",
        points: ["B/L, Sea Waybill or short form", "Your terms on the reverse", "Authorised signatories"],
        mock: { title: "B/L · RTL-JED-27-0102", badge: "Original 3/3", rows: [["Issued by", "Your company, as carrier"], ["Signed by", "Authorised signatory"], ["Type", "Ocean B/L"]], foot: "Track originals" },
      },
      {
        title: "Demurrage and detention, both sides",
        text: "Each container on the booking keeps its dates, import and export. Two tariffs, your customer's and the line's, with free days and daily tiers per port, container type and partner; ROUTEL works out what you bill and what the line will bill you, shows the margin, and adds the charge to the booking once. The line's D&D invoice is read from its PDF, container by container.",
        points: ["Your tariff and the line's", "Per container, AR and AP", "Expected D&D and Alerts"],
        mock: { title: "D&D · MSCU 442118-0", rows: [["Free days", "4 · ended 19 Mar"], ["To bill (AR)", "6 days · USD 150"], ["Line's charge (AP)", "6 days · USD 120"]], foot: "Margin USD 30" },
      },
      {
        title: "Agents and profit share",
        text: "Origin and destination agents on every booking, each with the model an admin set: a share of the profit, a USD amount per container, per CBM or fixed per booking, or none. A booking is settled once, as a USD line in its charges; the month's bookings are settled together, and the agent gets a numbered statement.",
        points: ["Origin and destination agents", "Models set by the admin", "Monthly settlement and statement"],
        mock: { title: "Agent settlement · Feb", rows: [["Agent", "Destination agent, Shanghai"], ["Model", "50% of the profit"], ["Due to agent", "USD 1,240.00"]], foot: "Statement issued" },
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
      title: "The line's D&D invoice, checked container by container",
      text: "AI reads the line's demurrage and detention invoice from its PDF or photo, container by container, next to what your tariff says it should be; you review before anything is saved.",
      prompt: "Which containers run out of free time this week?",
      reply: "Three, all at Jeddah: MSCU 442118-0 on Tuesday, and two of Gulf Horizon's on Thursday. Show the expected D&D for each?",
    },
    versus: [
      { topic: "Own-name B/L", them: "Templates in a word processor", us: "Numbered, signed by an authorised user, tracked" },
      { topic: "D&D", them: "Worked out on a calendar, often after the line's invoice", us: "Both tariffs, per container, with the line's invoice checked" },
      { topic: "Agent profit share", them: "Spreadsheets at month end", us: "Set per agent, settled monthly, with a statement" },
    ],
    audience: [
      { title: "NVOCCs", text: "B/Ls in your name, on your terms." },
      { title: "Carriers' agents", text: "Equipment, free time and the agent network." },
      { title: "Forwarders growing into NVOCC", text: "The same bookings, with a carrier's desk on top." },
    ],
    faqs: [
      { q: "Is NVOCC available today?", a: "Yes. It opens per company from its business activities. The electronic B/L waits on an agreement with a certified platform." },
      { q: "Will it change how our forwarding works?", a: "No. New modules are off by default and open per company from its business activities; existing work stays as it is." },
      { q: "Which plan includes it?", a: "Carrier & Agencies, at USD 899 a month (SAR 3,299 in Saudi Arabia)." },
    ],
  },

  "land-transport": {
    metaTitle: "Land transport and trucking software",
    metaDescription:
      "Land transport on ROUTEL: container trucking orders on the booking, your fleet, drivers and lanes, a phone link for the driver with no app, trip expenses with fuel checks, truck profit and trip billing.",
    headline: "Trucking on the same booking, reported from the driver's phone",
    lead: "Transport orders move containers by truck: from the port to the consignee and the empty back to the depot, from the depot to the shipper and into the port, or from one place to another. The driver works from a link on the phone, with no app and no login, and every stop lands on the order with its time and photos.",
    stat: { value: "0", label: "apps for the driver to install: the link sent on WhatsApp opens their jobs" },
    figures: [
      { value: "3", label: "movements: import, export and local" },
      { value: "5", label: "checks on every fuel receipt before it counts" },
      { value: "30", label: "days' warning before a truck's papers or a driver's licence expire" },
    ],
    features: [
      {
        title: "Transport orders",
        text: "Made from the booking (one order per container) or on their own for an AR partner. Each order takes its stops from the movement and the booking, a lane that sets the price, the planned date and the day the container's free time ends. Assign the driver, the prime mover and the trailer, and the order goes from Assigned to On the road to Completed.",
        points: ["From the booking or on its own", "Stops from the movement", "Lanes that set the price"],
        mock: { title: "Transport order · TO-27-0244", badge: "Assigned", rows: [["Movement", "Import · port to consignee"], ["Container", "MSCU 442118-0"], ["Free time ends", "27 Mar"]], foot: "Truck 4721 · driver" },
      },
      {
        title: "The driver's phone link",
        text: "Sent on WhatsApp: the driver sees only their own jobs, never prices. At each stop, I arrived and I left, with the time and, if the driver allows it, where the phone is; a photo sends the EIR at the depot or the signed delivery note at the consignee. A new link retires the old one.",
        points: ["No account, no app", "Arrived and left at each stop", "EIR and delivery note photos"],
        mock: { title: "Stop 2 · consignee", badge: "Completed", rows: [["Arrived", "21 Mar, 09:58"], ["Left", "21 Mar, 10:42"], ["Photo", "Signed delivery note"]], foot: "Sent from the driver's phone" },
      },
      {
        title: "Trip expenses and fuel checks",
        text: "The driver sends a receipt photo and AI reads the total, the litres, the station and the day; the office can add one too. Each expense waits for approval with what it failed: more than the tank, over the truck's fuel standard, the odometer going back, entered twice, or no trip that day.",
        points: ["Receipts read by AI", "Five checks before it counts", "Truck profit by month"],
        mock: { title: "Fuel · Truck 4721", badge: "To approve", rows: [["Litres", "412 L"], ["Check", "Over the standard"], ["Since last refuel", "1,180 km"]], foot: "Approve or reject" },
      },
      {
        title: "Billing a trip",
        text: "A completed trip goes into its booking's charges in one click: the haulage at the trip's price, waiting at the consignee beyond the free hours from the driver's own times, and a rented truck's hire as the AP cost. Alerts show containers whose free time is about to end, and fleet papers about to expire.",
        points: ["Haulage, waiting and truck hire", "Through the booking's charges", "Free time and papers in Alerts"],
        mock: { title: "Billing · TO-27-0244", rows: [["Haulage", "SAR 950.00"], ["Waiting · 3 h", "SAR 150.00"], ["Billed", "Once, on the booking"]], foot: "Add to the booking's charges" },
      },
    ],
    flow: [
      { title: "Order", text: "From the booking, one per container." },
      { title: "Assign", text: "Driver, prime mover and trailer." },
      { title: "Drive", text: "Each stop reported from the phone." },
      { title: "Check", text: "Fuel and expenses approved by the office." },
      { title: "Bill", text: "Haulage and waiting on the booking's charges." },
    ],
    ai: {
      title: "The fuel receipt, read from a photo",
      text: "AI reads the driver's receipt photo into the expense; an amount or odometer the driver types wins over what it read, and nothing counts until the office approves it.",
      prompt: "Which containers on the road run out of free time this week?",
      reply: "Two: MSCU 442118-0 on TO-27-0244 ends on 27 Mar, and TGHU 801224-7 has already passed it. Open the orders?",
    },
    versus: [
      { topic: "Driver tools", them: "An app to install and log into", us: "A link on WhatsApp, no account" },
      { topic: "Fuel", them: "Receipts totalled at month end", us: "Five checks on every receipt before it counts" },
      { topic: "Trucking revenue", them: "Typed again into the invoice", us: "One click into the booking's charges" },
    ],
    audience: [
      { title: "Forwarders with trucks", text: "First and last mile on the same booking." },
      { title: "Hauliers", text: "Fleet, drivers, lanes, fuel and truck profit." },
      { title: "Operations managers", text: "Every order by day, with free time in red." },
    ],
    faqs: [
      { q: "Is land transport available today?", a: "Yes. It opens per company from its business activities; with it closed, nothing changes for your other work." },
      { q: "Does the driver need an account?", a: "No. The link shows only their own jobs, and a new link retires the old one." },
      { q: "Which plans include it?", a: "Basic, as the company's one activity, or Growth with the other activities." },
    ],
  },

  warehousing: {
    metaTitle: "Warehouse receipts and CFS software",
    metaDescription:
      "Warehouse receipts and CFS on ROUTEL: expected cargo filled from the packing list by AI, receiving on the phone with photos, QR labels scanned at loading, cargo release and your own storage tariff.",
    headline: "Cargo received, labelled and loaded, with nothing missing",
    lead: "For forwarders who receive their customers' cargo to consolidate it, and for CFS operators. Cargo is expected from the booking, AI fills the package lines from the packing list, the storekeeper receives it on the phone, and every package carries a label that's scanned when it's loaded.",
    stat: { value: "1", label: "QR label per package, scanned at loading with a phone camera" },
    figures: [
      { value: "4", label: "stages: expected, received, then loaded or released" },
      { value: "0", label: "storage tariffs fixed in the code: set your own" },
      { value: "1", label: "rule for release, the delivery order's: charges paid or credit in force" },
    ],
    features: [
      {
        title: "Warehouse receipts",
        text: "Numbered, with the depositor as an AR partner, the warehouse, who delivered it and when, and the package lines with count, packing, dimensions, weight and marks. At the door the storekeeper counts each line on the phone, notes where it was put and any damage, and takes photos. Receiving measures the booking from its receipts.",
        points: ["Package lines with dimensions", "Photos and damage notes", "Short or over shown at once"],
        mock: { title: "Warehouse receipt · WR-27-0519", badge: "Received", rows: [["Depositor", "Al Noor Trading"], ["Packages", "12 cartons · 1.84 CBM"], ["Damage", "None noted"]], foot: "3 photos" },
      },
      {
        title: "Expected cargo, filled by AI",
        text: "Cargo is expected from the booking, or on its own for a partner without a booking yet; AI reads the partner's packing list and fills the lines, and you check them before saving. Volume and W/M are worked out from the dimensions.",
        points: ["From the booking or on its own", "Packing list read by AI", "Received on the phone"],
        mock: { title: "Expected · from packing list.pdf", badge: "AI", rows: [["Lines read", "12 cartons"], ["Each", "60 × 40 × 64 cm · 18 kg"], ["Total", "1.84 CBM · 216 kg"]], foot: "Match and confirm" },
      },
      {
        title: "Labels, scanned at loading",
        text: "A QR label is printed for every package. When a consolidation is loaded, the phone camera reads each label: a package of another booking or consolidation gets a loud STOP, and the count shows a missing package before the container is closed.",
        points: ["One label per package", "Scanned with the phone", "Missing or wrong caught before closing"],
        mock: { title: "Loading CON-27-0031", badge: "11 / 12", rows: [["Scanned", "11 packages"], ["Missing", "WR-27-0519 · carton 7"], ["Container", "MSCU 442118-0"]], foot: "Hold before closing" },
      },
      {
        title: "Release and storage charges",
        text: "Cargo collected from the warehouse is released on the delivery order's terms: the booking's charges paid or the partner's credit in force, otherwise only finance can release it, with a reason. Storage is billed by the tariff you set: by W/M, CBM or package, per day, week or month, after free days, with a minimum and handling in and out.",
        points: ["Loaded into a consolidation", "Release with payment checks", "Your own storage tariff"],
        mock: { title: "Storage · WR-27-0519", rows: [["Free days", "5"], ["Billed", "9 days × 1.84 CBM"], ["Handling in/out", "SAR 120.00"]], foot: "Added to the booking's charges" },
      },
    ],
    flow: [
      { title: "Expect", text: "From the booking, filled from the packing list." },
      { title: "Receive", text: "Count, measure, photograph, confirm." },
      { title: "Label", text: "A QR label on every package." },
      { title: "Load", text: "Scan into the consolidation or container." },
      { title: "Release", text: "Paid or on credit, as for a delivery order." },
    ],
    ai: {
      title: "The packing list fills the receipt",
      text: "AI reads the partner's packing list into package lines; you check them before saving, and the storekeeper counts what actually arrived. Nothing is saved until a person confirms it.",
      prompt: "Al Noor's cargo arrived. Here's the packing list.",
      reply: "12 cartons, 60 × 40 × 64 cm, 18 kg each: 1.84 CBM, 216 kg. Expected under NXS27000418. Confirm the receipt?",
    },
    versus: [
      { topic: "Receiving", them: "Package lines typed from the packing list", us: "Read by AI, counted on the phone" },
      { topic: "Loading", them: "A missing carton found at destination", us: "Scanned in; missing or wrong caught before closing" },
      { topic: "Storage charges", them: "One fixed method, or a spreadsheet", us: "Your tariff, set in Settings" },
    ],
    audience: [
      { title: "Forwarders with a warehouse", text: "Receive, consolidate and load." },
      { title: "CFS operators", text: "Receipts, load plans and release." },
      { title: "3PL operators", text: "The receiving side of contract logistics." },
    ],
    faqs: [
      { q: "Is it available today?", a: "Yes. It opens per company from its business activities; with it closed, nothing changes for your other work." },
      { q: "How is storage billed?", a: "By the storage tariff you set. Nothing is charged until the tariff says so." },
      { q: "Do we need scanners?", a: "No. The label is scanned with the phone's camera; a handheld scanner works too." },
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
        mock: { title: "Port call · Jeddah · 412E", badge: "Alongside", rows: [["Vessel", "MSC ISABELLA"], ["ATA", "21 Mar, 06:10"], ["ETD", "22 Mar, 18:00"]], foot: "Berth 12" },
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
      { q: "Which plan includes it?", a: "Carrier & Agencies, at USD 899 a month (SAR 3,299 in Saudi Arabia)." },
    ],
  },

  "customs-brokerage": {
    metaTitle: "Customs clearance software",
    metaDescription:
      "Customs clearance on ROUTEL: one file per declaration — import, export or transit, by sea, air or land — with 12-digit HS codes, the customs value (CIF) at the customs exchange rate, a status path through inspection and release, and the documents still missing.",
    headline: "One clearance file per declaration, with the customs value worked out",
    lead: "Each declaration gets its own file: whose goods, where they clear, the lines with their tariff items and customs value, the documents customs need, and where the file stands. Link it to the booking when the shipment is yours, or keep it on its own.",
    stat: { value: "12", label: "digits in every line's HS code, with its origin and unit" },
    figures: [
      { value: "3", label: "kinds of file: import, export and transit" },
      { value: "3", label: "modes: sea, air and land" },
      { value: "1", label: "customs exchange rate per currency, on the declaration date" },
    ],
    features: [
      {
        title: "A file per declaration",
        text: "Import, export or transit; by sea, air or land; the customs office of entry or exit, and the importer or exporter with their registration. Pick a booking and it brings the B/L, the vessel and the arrival, and its consignee as the importer. The declaration and release order numbers are typed on the file.",
        points: ["Import, export, transit", "Customs office and importer", "Linked to the booking, or on its own"],
        mock: { title: "Clearance · CCNXS27000077", badge: "Documents complete", rows: [["Type", "Import · sea"], ["Lines", "8"], ["Linked booking", "NXS27000402"]], foot: "Mark declaration submitted" },
      },
      {
        title: "Lines and the customs value",
        text: "Each line carries a 12-digit HS code, the country of origin, a standard unit, the weights and the value. The customs value (CIF) is worked out per line at the customs exchange rate on the declaration date, with the freight and insurance shared over the lines by value or weight, and not added twice when the Incoterm already includes them.",
        points: ["12-digit HS codes", "CIF at the customs rate", "Freight and insurance shared"],
        mock: { title: "Customs value", rows: [["Invoice · USD 48,200", "@ 3.7500"], ["Freight and insurance", "Shared by value"], ["Customs value (CIF)", "SAR 184,600.00"]], foot: "Worked out per line" },
      },
      {
        title: "Status, inspection and release",
        text: "Draft, documents complete, declaration submitted, then under inspection, on hold or amendment requested, duties paid (or the guarantee lodged for transit), released with the release order, and delivered. Every change keeps who, when and why, and the file lists the documents still missing.",
        points: ["Inspection, hold and amendment", "Release order recorded", "Missing documents and history"],
        mock: { title: "CCNXS27000077", badge: "On hold", rows: [["Reason", "Certificate of origin"], ["Inspection", "Document check"], ["Missing", "1 document"]], foot: "Upload the certificate" },
      },
      {
        title: "The invoice read by AI, the duties estimated",
        text: "Read documents turns the seller's commercial invoice and packing list (PDF, scan, photo or Excel) into the declaration's lines, checking the totals and weights so nothing is dropped. Each line gets HS code suggestions, your own confirmed codes first, then the AI's, and the broker picks and confirms every code: a file can't be declared before. The Duties & taxes card then estimates duty and import VAT from your own tariff table, and a deposit request asks the importer for them ahead of release.",
        points: ["Commercial invoice and packing list read into lines", "HS codes suggested, the broker confirms each", "Duty and VAT estimate, deposit request to the importer"],
        mock: { title: "Line 3 · Stainless steel kitchen sinks", badge: "Suggested", rows: [["Suggested HS", "7324.10.00.00.00"], ["From", "Your history · same seller"], ["Status", "Waiting for the broker to confirm"]] },
      },
    ],
    flow: [
      { title: "Open", text: "The file, from the booking or on its own." },
      { title: "Value", text: "Lines, HS codes and the customs value." },
      { title: "Collect", text: "The documents customs need." },
      { title: "Follow", text: "Inspection, hold or amendment." },
      { title: "Release", text: "The release order, then delivery." },
    ],
    ai: {
      title: "The assistant knows every open file",
      text: "Ask where a file stands, what it is waiting for, or which files are on hold; the assistant reads the clearance files and answers from them.",
      prompt: "Which clearance files are on hold?",
      reply: "Two: CCNXS27000077 is waiting for the certificate of origin, and CCNXS27000081 has an amendment requested. Open them?",
    },
    versus: [
      { topic: "Customs value", them: "Worked out in a spreadsheet", us: "CIF per line, at the customs exchange rate" },
      { topic: "Where the file stands", them: "Phone calls and notes", us: "One status path, with who, when and why" },
      { topic: "Next to the shipment", them: "A separate customs system", us: "The file sits on the booking" },
    ],
    audience: [
      { title: "Customs brokers", text: "Every declaration on one board." },
      { title: "Forwarders with clearance", text: "Customs next to the shipment it belongs to." },
      { title: "Operations managers", text: "What each file is waiting for, at a glance." },
    ],
    faqs: [
      { q: "Is it available today?", a: "Yes: the clearance file, the commercial invoice read with AI, HS code suggestions the broker confirms, and duty and VAT estimates with a deposit request. It opens per company from its business activities." },
      { q: "Is it connected to the customs system?", a: "Not yet. The declaration is made in the customs system and its number typed on the file; links to FASAH, CEISA and uCustoms wait on government permits." },
      { q: "Which plan includes it?", a: "Carrier & Agencies, at USD 899 a month (SAR 3,299 in Saudi Arabia)." },
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
      { q: "Which plan includes it?", a: "Growth, when inventory launches." },
    ],
  },
};
