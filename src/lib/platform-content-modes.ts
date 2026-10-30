import type { PlatformContent } from "./platform-content";

/**
 * Platform pages for the modules opened by business activity: air freight,
 * consolidation and LCL, arrival notice and delivery order. Every claim is
 * taken from the Routel system's code on `development` (routes air*.ts,
 * consolidations.ts, import_release.ts and their libs). Designed-only ideas
 * (weight-break pricing, pre-alerts, e-AWB, DGR) are deliberately left out.
 */
export const platformContentModes: Record<"en" | "ar", Record<string, PlatformContent>> = {
  en: {
    "air-freight": {
      eyebrow: "Air Freight",
      title: "Air freight, express or airline, on the same booking",
      description:
        "Air bookings sit next to sea bookings in one system. Express shipments move with the carrier's own waybill and tracking; airline cargo moves under a checked MAWB and your own House Air Waybill. Chargeable weight drives the charges, and the block space you buy from airlines is tracked week by week.",
      stats: [
        { value: "2", label: "kinds of air booking: express and airline cargo" },
        { value: "64", label: "airports seeded, including RUH, JED and DMM" },
        { value: "43", label: "airlines by AWB prefix, Saudia among them" },
      ],
      painPoints: [
        "A MAWB number is typed wrong, and nobody notices until the cargo is at the airport.",
        "Volumetric weight is worked out on a calculator, and the invoice is built on the wrong kilos.",
        "Space bought from the airline sits half-empty, and you find out after the week has gone.",
      ],
      solutionIntro:
        "Routel treats air as a mode of the same booking. Pick Air when you create the booking; the AP partner decides whether it's express or airline cargo. The pieces give the chargeable weight, the charges follow it, the House Air Waybill prints from the booking, and every allocation shows what's sold, what's left and what it costs you.",
      features: [
        { title: "Express or airline cargo", description: "An AP marked as an express carrier makes the booking express, with a tracking link to DHL, FedEx, Aramex, UPS or SMSA. Any other AP makes it airline cargo." },
        { title: "MAWB, checked as you type", description: "11 digits with IATA's check digit. The airline is named from its prefix, a wrong number is refused, and the MAWB is stored in its standard form." },
        { title: "Pieces and chargeable weight", description: "Pieces, dimensions in cm and gross kg give the volumetric weight; the higher of the two, rounded up to the next half kilo, is the chargeable weight. Divisors default to 6000 for airline cargo and 5000 for express, and can be set per carrier." },
        { title: "Charges that follow the kilos", description: "Freight and surcharges are charged per kg. When the pieces change, every kg line moves to the new chargeable weight, except lines already on an issued invoice or a paid AP." },
        { title: "House Air Waybill", description: "Created from the booking, edited as a draft, then issued. It prints on A4 in the IATA layout with your logo as issuing agent; an issued HAWB is locked." },
        { title: "Air allocations (block space)", description: "Weekly kilos bought from an airline on a route, hard or soft. Bookings count against their week automatically; each week shows capacity, used, remaining and, for hard space, the unsold cost." },
        { title: "AI reads the airline's agreement", description: "Upload the allocation agreement as a PDF, scan or photo; the AI fills in the new allocation and matches the airline. Nothing is saved until a person saves it." },
        { title: "Who to call to fill the space", description: "For a week with space left, Routel lists the AR partners who shipped airline cargo on that route in the last six months but haven't booked this week." },
      ],
      workflow: [
        { title: "Book", description: "New Booking → Air. The AP partner sets express or airline cargo." },
        { title: "Weigh", description: "Enter the pieces; the chargeable weight and the kg charges follow." },
        { title: "Document", description: "Record the MAWB, then create and issue the House Air Waybill." },
        { title: "Fill the space", description: "The booking counts against its allocation week, and the alerts say when space needs a decision." },
        { title: "Bill", description: "Invoice from the booking's charges, as for any booking." },
      ],
      personas: [
        { role: "Operations", detail: "Create air bookings, enter pieces and issue the House Air Waybill." },
        { role: "Sales and pricing", detail: "Manage allocations, see the space left and the partners to call." },
        { role: "Admin", detail: "Airports, airlines and volumetric divisors." },
      ],
      faqs: [
        { q: "Does an express shipment get a House Air Waybill?", a: "No. The express carrier's own waybill is the document; Routel keeps its tracking number and links to the carrier's tracking page." },
        { q: "What happens to the charges when the pieces change?", a: "Every per-kg line moves to the new chargeable weight. Lines already on an issued invoice or a paid AP keep their quantity, and Routel tells you which ones." },
        { q: "Is air on by default?", a: "Air is opened by an admin in Settings → Business activities, alongside sea freight. A company that doesn't open it sees nothing of it." },
      ],
      related: ["bookings", "consolidation", "quotations"],
    },
    consolidation: {
      eyebrow: "Consolidation & LCL",
      title: "Many shippers, one master, every booking's profit right",
      description:
        "A consolidation carries several house bookings under one master: an LCL container under your own MBL, an air consolidation under your own MAWB, or space bought from a co-loader. Routel builds it from bookings on the same route, prints the manifest and shares the master's costs across the bookings, exact to the cent.",
      stats: [
        { value: "3", label: "ways to share costs: CBM, W/M or chargeable weight" },
        { value: "0.01", label: "split exact to the cent across bookings" },
        { value: "1", label: "manifest for the whole master" },
      ],
      painPoints: [
        "The master's ocean freight is split by hand in a spreadsheet, and the cents never add up.",
        "One booking's profit looks great and another's looks terrible, because the shared cost went to the wrong place.",
        "The manifest is retyped from five bookings the night before the cut-off.",
      ],
      solutionIntro:
        "Open a consolidation, tick the suggested bookings on the same route and mode, and enter the master's costs once. Routel shares them across the bookings as cost lines on each booking, so every booking carries its fair share and its profit stays true.",
      features: [
        { title: "Sea or air, own or co-loaded", description: "Under your own MBL or MAWB, or on space bought from a co-loader, with the carrier, ports or airports, vessel and voyage or flight, and the containers." },
        { title: "Suggested bookings", description: "Bookings on the same mode and route, departing within 14 days and not already in another consolidation, nearest first." },
        { title: "Master number carried down", description: "Bookings with no MBL or MAWB take the master's number, and a later change to it reaches them." },
        { title: "Costs shared to the cent", description: "By CBM or W/M for sea, by chargeable weight for air, or by a manual share. The remainder goes to the largest fractions, so the split always adds up." },
        { title: "Shares as cost lines", description: "Each share lands as an AP cost line on its booking. Sharing again moves the same lines; a share already finalised or paid is locked." },
        { title: "Cargo manifest", description: "One printed manifest for the master: house numbers, shippers, consignees, goods, weights and CBM or chargeable weight." },
        { title: "Profit per consolidation", description: "Revenue, cost and profit for the whole consolidation and for each booking in it." },
      ],
      workflow: [
        { title: "Open", description: "Create the consolidation with the master's details." },
        { title: "Fill", description: "Add the suggested bookings on the same route." },
        { title: "Cost", description: "Enter the master's costs once." },
        { title: "Share", description: "Share them across the bookings by CBM, W/M or weight." },
        { title: "Close", description: "Print the manifest and close the consolidation." },
      ],
      personas: [
        { role: "Operations and sales", detail: "Create consolidations and add bookings." },
        { role: "Accounting and operations", detail: "Enter master costs and share them." },
      ],
      faqs: [
        { q: "What does W/M mean?", a: "Weight or measure: the larger of the cargo's tonnes and its CBM. Sea consolidations can share costs on it." },
        { q: "Can a booking leave a consolidation after costs were shared?", a: "Yes, unless its share is already finalised or paid. Then the share is locked until it's unlocked." },
      ],
      related: ["bookings", "air-freight", "accounting"],
    },
    "arrival-notice": {
      eyebrow: "Arrival Notice & Delivery Order",
      title: "Tell the consignee on time. Release the cargo only when it's paid.",
      description:
        "For import bookings, Routel tells you when the arrival notice is due, sends it as a PDF with the charges, records how the line released the cargo, and issues the delivery order only when the cargo is released and paid, or the partner is within an active credit limit.",
      stats: [
        { value: "2", label: "documents, both e-mailed as PDF" },
        { value: "1", label: "delivery order in force at a time" },
        { value: "0", label: "releases before payment without a recorded reason" },
      ],
      painPoints: [
        "The consignee hears about the arrival when the storage charges have already started.",
        "A delivery order goes out before the invoice is paid, and the money is chased for weeks.",
        "The line moves the ETA in an e-mail nobody reads, and the notice goes out with the old date.",
      ],
      solutionIntro:
        "Routel puts the release on rails. The notice is due a set time before the ETA and shows in Alerts; it goes out from the operations mailbox with the PDF attached. The delivery order checks two things, released by the line and paid, and only a finance user can override, with a reason on record.",
      features: [
        { title: "Notice due on time", description: "By voyage length or a fixed number of days before the ETA. Due notices appear in Alerts, and a booking returns there if the ETA moves after sending." },
        { title: "Arrival notice PDF", description: "Consignee and notify party, carrier, master and house numbers, vessel or flight, route, ETA, containers or pieces, and the charges due with totals." },
        { title: "Sent from Routel", description: "\"Send by email\" goes from the operations mailbox to the partner's contacts, with the PDF attached, and is filed under the booking." },
        { title: "Line release recorded", description: "Original B/L, telex release or sea waybill, with the carrier's own DO number." },
        { title: "Delivery order with checks", description: "Issued only when released and paid, or within an active credit limit. A finance user can override with a reason; the DO prints with a signature block and is valid for the days you set." },
        { title: "AI reads the line's ETA change", description: "The line's arrival or delay notice is read by AI from the attachment, and the new ETA is proposed in Documents for a person to approve." },
      ],
      workflow: [
        { title: "Due", description: "The notice falls due before the ETA and appears in Alerts." },
        { title: "Notify", description: "Send the arrival notice by e-mail with the PDF." },
        { title: "Release", description: "Record how the line released the cargo." },
        { title: "Get paid", description: "Invoice and collect; the DO checks it." },
        { title: "Deliver", description: "Issue the delivery order and send it." },
      ],
      personas: [
        { role: "Operations and sales", detail: "Record the release, send the notice and issue the DO." },
        { role: "Finance (admin, management, accounting)", detail: "Override a DO before release or payment, with a reason." },
      ],
      faqs: [
        { q: "Does it work for air imports?", a: "Yes, for airline cargo; express shipments are delivered by the carrier, so they're left out. Air needs no B/L release." },
        { q: "What if the ETA changes after the notice was sent?", a: "The booking returns to Alerts so you can send an updated notice." },
      ],
      related: ["bookings", "invoicing", "documents"],
    },
  },
  ar: {
    "air-freight": {
      eyebrow: "الشحن الجوي",
      title: "الشحن الجوي، السريع أو عبر شركات الطيران، على الحجز نفسه",
      description:
        "الحجوزات الجوية بجانب الحجوزات البحرية في نظام واحد. الشحن السريع يتحرك ببوليصة شركة الشحن نفسها وتتبعها، والشحن عبر شركات الطيران يتحرك ببوليصة جوية رئيسية يُتحقق من رقمها وببوليصتك الجوية الفرعية. الوزن المحتسب يحدد الرسوم، والمساحات المشتراة من شركات الطيران تُتابع أسبوعاً بأسبوع.",
      stats: [
        { value: "2", label: "نوعان للحجز الجوي: سريع وعبر شركة طيران" },
        { value: "64", label: "مطاراً جاهزاً، منها الرياض وجدة والدمام" },
        { value: "43", label: "شركة طيران حسب بادئة البوليصة، ومنها السعودية" },
      ],
      painPoints: [
        "رقم البوليصة الجوية الرئيسية يُكتب خطأ، ولا ينتبه أحد حتى تصل البضاعة إلى المطار.",
        "الوزن الحجمي يُحسب بالآلة الحاسبة، والفاتورة تُبنى على كيلوغرامات خاطئة.",
        "المساحة المشتراة من شركة الطيران نصفها فارغ، وتعرف بعد أن يمضي الأسبوع.",
      ],
      solutionIntro:
        "يعامل Routel الشحن الجوي نمطاً للحجز نفسه. اختر «جوي» عند إنشاء الحجز، وشريك الذمم الدائنة يحدد هل هو سريع أم عبر شركة طيران. القطع تعطي الوزن المحتسب، والرسوم تتبعه، والبوليصة الجوية الفرعية تُطبع من الحجز، وكل مساحة محجوزة تعرض ما بِيع وما بقي وكم يكلفك.",
      features: [
        { title: "سريع أو عبر شركة طيران", description: "شريك ذمم دائنة مُعلَّم كشركة شحن سريع يجعل الحجز سريعاً، مع رابط تتبع لدى DHL أو FedEx أو Aramex أو UPS أو سمسا. وأي شريك آخر يجعله شحناً عبر شركة طيران." },
        { title: "البوليصة الجوية الرئيسية، تُفحص أثناء الكتابة", description: "11 رقماً مع رقم التحقق المعتمد من IATA. تُسمّى شركة الطيران من البادئة، ويُرفض الرقم الخاطئ، ويُحفظ بصيغته القياسية." },
        { title: "القطع والوزن المحتسب", description: "القطع وأبعادها بالسنتيمتر والوزن القائم تعطي الوزن الحجمي، والأعلى منهما مقرّباً لأعلى نصف كيلوغرام هو الوزن المحتسب. القاسم الافتراضي 6000 لشركات الطيران و5000 للشحن السريع، ويمكن تحديده لكل شركة." },
        { title: "رسوم تتبع الكيلوغرامات", description: "أجرة الشحن والرسوم الإضافية بالكيلوغرام. وحين تتغير القطع تنتقل كل بنود الكيلوغرام إلى الوزن المحتسب الجديد، إلا البنود الموجودة في فاتورة صادرة أو ذمة دائنة مدفوعة." },
        { title: "البوليصة الجوية الفرعية HAWB", description: "تُنشأ من الحجز، وتُعدَّل مسودةً، ثم تُصدر. وتُطبع على A4 بتصميم IATA وشعارك كوكيل مُصدِر، والبوليصة الصادرة مقفلة." },
        { title: "المساحات المحجوزة", description: "كيلوغرامات أسبوعية مشتراة من شركة طيران على مسار، ثابتة أو مرنة. تُحتسب الحجوزات على أسبوعها تلقائياً، وكل أسبوع يعرض السعة والمستخدم والمتبقي، وللمساحة الثابتة التكلفة غير المباعة." },
        { title: "الذكاء الاصطناعي يقرأ اتفاقية شركة الطيران", description: "ارفع الاتفاقية ملف PDF أو صورة، فيملأ الذكاء الاصطناعي المساحة الجديدة ويطابق شركة الطيران. ولا يُحفظ شيء حتى يحفظه شخص." },
        { title: "بمن تتصل لتملأ المساحة", description: "لأسبوع فيه مساحة متبقية، يعرض Routel شركاء الذمم المدينة الذين شحنوا جواً على المسار خلال الأشهر الستة الماضية ولم يحجزوا هذا الأسبوع." },
      ],
      workflow: [
        { title: "احجز", description: "حجز جديد ← جوي. شريك الذمم الدائنة يحدد سريع أو عبر شركة طيران." },
        { title: "زِن", description: "أدخل القطع، فيتبعها الوزن المحتسب ورسوم الكيلوغرام." },
        { title: "وثّق", description: "سجّل البوليصة الرئيسية، ثم أنشئ البوليصة الفرعية وأصدرها." },
        { title: "املأ المساحة", description: "يُحتسب الحجز على أسبوع مساحته، وتنبهك التنبيهات حين تحتاج المساحة قراراً." },
        { title: "فوتر", description: "الفاتورة من رسوم الحجز، كأي حجز." },
      ],
      personas: [
        { role: "العمليات", detail: "تنشئ الحجوزات الجوية، وتدخل القطع، وتصدر البوليصة الجوية الفرعية." },
        { role: "المبيعات والتسعير", detail: "تدير المساحات المحجوزة، وترى المتبقي والشركاء الذين يُتصل بهم." },
        { role: "المدير", detail: "المطارات وشركات الطيران وقواسم الوزن الحجمي." },
      ],
      faqs: [
        { q: "هل تحصل شحنة الشحن السريع على بوليصة جوية فرعية؟", a: "لا. بوليصة شركة الشحن السريع نفسها هي المستند، ويحتفظ Routel برقم التتبع ورابط صفحة التتبع." },
        { q: "ماذا يحدث للرسوم حين تتغير القطع؟", a: "تنتقل كل بنود الكيلوغرام إلى الوزن المحتسب الجديد، إلا البنود الموجودة في فاتورة صادرة أو ذمة دائنة مدفوعة، ويخبرك Routel بها." },
        { q: "هل الشحن الجوي مفعّل افتراضياً؟", a: "يفتحه المدير من الإعدادات ← الأنشطة التجارية، بجانب الشحن البحري. والشركة التي لا تفتحه لا ترى منه شيئاً." },
      ],
      related: ["bookings", "consolidation", "quotations"],
    },
    consolidation: {
      eyebrow: "التجميع والشحن الجزئي LCL",
      title: "عدة شاحنين، بوليصة رئيسية واحدة، وربح كل حجز صحيح",
      description:
        "يحمل التجميع عدة حجوزات فرعية تحت شحنة رئيسية واحدة: حاوية LCL ببوليصتك الرئيسية، أو تجميع جوي ببوليصتك الجوية الرئيسية، أو مساحة مشتراة من مجمّع آخر. يبنيه Routel من الحجوزات على المسار نفسه، ويطبع بيان الحمولة، ويوزع تكاليف الشحنة الرئيسية على الحجوزات بدقة حتى السنت.",
      stats: [
        { value: "3", label: "طرق لتوزيع التكلفة: الحجم أو W/M أو الوزن المحتسب" },
        { value: "0.01", label: "توزيع دقيق حتى السنت على الحجوزات" },
        { value: "1", label: "بيان حمولة للشحنة الرئيسية كلها" },
      ],
      painPoints: [
        "أجرة الشحن الرئيسية تُقسَّم يدوياً في جدول بيانات، والهللات لا تتطابق أبداً.",
        "ربح حجز يبدو ممتازاً وآخر سيئاً، لأن التكلفة المشتركة ذهبت للمكان الخطأ.",
        "بيان الحمولة يُعاد كتابته من خمسة حجوزات ليلة الإغلاق.",
      ],
      solutionIntro:
        "افتح تجميعاً، واختر الحجوزات المقترحة على المسار والنمط نفسيهما، وأدخل تكاليف الشحنة الرئيسية مرة واحدة. يوزعها Routel على الحجوزات بنود تكلفة في كل حجز، فيحمل كل حجز حصته العادلة ويبقى ربحه حقيقياً.",
      features: [
        { title: "بحري أو جوي، مباشر أو عبر مجمّع", description: "ببوليصتك الرئيسية البحرية أو الجوية، أو على مساحة من مجمّع آخر، مع الناقل والموانئ أو المطارات والسفينة والرحلة أو الرحلة الجوية والحاويات." },
        { title: "حجوزات مقترحة", description: "الحجوزات على النمط والمسار نفسيهما، المغادرة خلال 14 يوماً وغير المنضمة لتجميع آخر، الأقرب أولاً." },
        { title: "الرقم الرئيسي يصل للحجوزات", description: "الحجوزات بلا بوليصة رئيسية تأخذ رقم الشحنة الرئيسية، وأي تغيير لاحق عليه يصل إليها." },
        { title: "توزيع حتى السنت", description: "بالحجم أو W/M للبحري، وبالوزن المحتسب للجوي، أو بحصة يدوية. ويذهب الباقي للكسور الأكبر، فيتطابق المجموع دائماً." },
        { title: "الحصص بنود تكلفة", description: "كل حصة تصبح بند تكلفة على حجزها. وإعادة التوزيع تحرّك البنود نفسها، والحصة المعتمدة أو المدفوعة مقفلة." },
        { title: "بيان الحمولة", description: "بيان مطبوع واحد للشحنة الرئيسية: الأرقام الفرعية، والشاحنون، والمرسل إليهم، والبضائع، والأوزان، والحجم أو الوزن المحتسب." },
        { title: "الربح لكل تجميع", description: "الإيراد والتكلفة والربح للتجميع كله ولكل حجز فيه." },
      ],
      workflow: [
        { title: "افتح", description: "أنشئ التجميع ببيانات الشحنة الرئيسية." },
        { title: "املأ", description: "أضف الحجوزات المقترحة على المسار نفسه." },
        { title: "كلّف", description: "أدخل تكاليف الشحنة الرئيسية مرة واحدة." },
        { title: "وزّع", description: "وزعها على الحجوزات بالحجم أو W/M أو الوزن." },
        { title: "أغلق", description: "اطبع بيان الحمولة وأغلق التجميع." },
      ],
      personas: [
        { role: "العمليات والمبيعات", detail: "تنشئ التجميعات وتضيف الحجوزات." },
        { role: "المحاسبة والعمليات", detail: "تدخل تكاليف الشحنة الرئيسية وتوزعها." },
      ],
      faqs: [
        { q: "ماذا يعني W/M؟", a: "الوزن أو الحجم: الأكبر بين أطنان البضاعة وحجمها بالمتر المكعب. ويمكن للتجميعات البحرية التوزيع عليه." },
        { q: "هل يمكن لحجز مغادرة التجميع بعد توزيع التكلفة؟", a: "نعم، إلا إن كانت حصته معتمدة أو مدفوعة، فتبقى مقفلة حتى تُفتح." },
      ],
      related: ["bookings", "air-freight", "accounting"],
    },
    "arrival-notice": {
      eyebrow: "إشعار الوصول وأمر التسليم",
      title: "أبلغ المرسل إليه في الموعد. ولا تُفرج عن البضاعة إلا بعد السداد.",
      description:
        "في حجوزات الاستيراد، يخبرك Routel بموعد إشعار الوصول، ويرسله ملف PDF مع الرسوم، ويسجل طريقة إفراج الخط عن البضاعة، ولا يُصدر أمر التسليم إلا بعد الإفراج والسداد، أو إن كان الشريك ضمن حد ائتماني ساري.",
      stats: [
        { value: "2", label: "مستندان، يُرسلان بالبريد ملف PDF" },
        { value: "1", label: "أمر تسليم ساري في كل مرة" },
        { value: "0", label: "إفراج قبل السداد دون سبب مسجّل" },
      ],
      painPoints: [
        "يعلم المرسل إليه بالوصول بعد أن تبدأ رسوم التخزين.",
        "يخرج أمر التسليم قبل سداد الفاتورة، ويُطارد المبلغ أسابيع.",
        "يغيّر الخط موعد الوصول في بريد لا يقرؤه أحد، فيخرج الإشعار بالتاريخ القديم.",
      ],
      solutionIntro:
        "يضع Routel الإفراج على مسار واضح. يستحق الإشعار قبل موعد الوصول بمدة محددة ويظهر في التنبيهات، ويُرسل من بريد العمليات مع ملف PDF. ويفحص أمر التسليم أمرين: إفراج الخط والسداد، ولا يتجاوزهما إلا مستخدم المالية بسبب مسجّل.",
      features: [
        { title: "الإشعار في موعده", description: "حسب مدة الرحلة أو عدد أيام ثابت قبل موعد الوصول. والإشعارات المستحقة تظهر في التنبيهات، ويعود الحجز إليها إن تغيّر موعد الوصول بعد الإرسال." },
        { title: "إشعار الوصول PDF", description: "المرسل إليه والطرف المُخطَر، والناقل، والأرقام الرئيسية والفرعية، والسفينة أو الرحلة الجوية، والمسار، وموعد الوصول، والحاويات أو القطع، والرسوم المستحقة بإجمالياتها." },
        { title: "يُرسل من Routel", description: "«إرسال بالبريد» يخرج من بريد العمليات إلى جهات اتصال الشريك مع ملف PDF مرفق، ويُحفظ تحت الحجز." },
        { title: "تسجيل إفراج الخط", description: "البوليصة الأصلية أو الإفراج بالتلكس أو بوليصة الشحن البحري، مع رقم أمر التسليم من الناقل." },
        { title: "أمر تسليم بضوابط", description: "لا يُصدر إلا بعد الإفراج والسداد، أو ضمن حد ائتماني ساري. ويمكن لمستخدم المالية التجاوز بسبب، ويُطبع الأمر بخانة توقيع ويسري للأيام التي تحددها." },
        { title: "الذكاء الاصطناعي يقرأ تغيّر موعد الوصول", description: "يقرأ الذكاء الاصطناعي إشعار وصول الخط أو تأخيره من المرفق، ويقترح موعد الوصول الجديد في المستندات ليعتمده شخص." },
      ],
      workflow: [
        { title: "الاستحقاق", description: "يستحق الإشعار قبل موعد الوصول ويظهر في التنبيهات." },
        { title: "الإشعار", description: "أرسل إشعار الوصول بالبريد مع ملف PDF." },
        { title: "الإفراج", description: "سجّل طريقة إفراج الخط عن البضاعة." },
        { title: "التحصيل", description: "فوتر وحصّل، وأمر التسليم يتحقق من ذلك." },
        { title: "التسليم", description: "أصدر أمر التسليم وأرسله." },
      ],
      personas: [
        { role: "العمليات والمبيعات", detail: "تسجل الإفراج، وترسل الإشعار، وتصدر أمر التسليم." },
        { role: "المالية (المدير والإدارة والمحاسبة)", detail: "تتجاوز أمر التسليم قبل الإفراج أو السداد، بسبب مسجّل." },
      ],
      faqs: [
        { q: "هل يعمل مع الاستيراد الجوي؟", a: "نعم، للشحن عبر شركات الطيران. أما الشحن السريع فتسلّمه شركة الشحن نفسها، فهو مستثنى. والجوي لا يحتاج إفراجاً ببوليصة." },
        { q: "ماذا لو تغيّر موعد الوصول بعد إرسال الإشعار؟", a: "يعود الحجز إلى التنبيهات لترسل إشعاراً محدّثاً." },
      ],
      related: ["bookings", "invoicing", "documents"],
    },
  },
};
