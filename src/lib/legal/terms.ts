import type { Locale } from "@/lib/i18n";
import type { LegalCopy } from "./types";
import { site } from "@/lib/site";

export const ENTITY = site.legalName;
export const PRIVACY_EMAIL = "privacy@routel.app";
export const LEGAL_UPDATED = "2026-11-28";
export const CONTACT_EMAIL = site.email;

/**
 * Terms of use for the ROUTEL service: the website, the free version, the
 * trial and the paid plans. The free-version billing clause is the one
 * docs/routel-central.md (section 2) requires: ROUTEL issues a preliminary
 * invoice only (during the trial too), and the tax invoice is the company's
 * own responsibility. The governing-law clause (section 13) is the founder's
 * to change; the rest is country-neutral.
 */
export const terms: Record<Locale, LegalCopy> = {
  en: {
    metaTitle: "Terms of use",
    metaDescription: "The terms on which ROUTEL provides its website, free version, free trial and paid plans.",
    eyebrow: "Legal",
    title: "Terms of use",
    lead: "These terms govern your use of ROUTEL: the website, the free version, the free trial and the paid plans. By creating an account or using the service, you agree to them.",
    updated: "Last updated",
    entity: `The service is provided by ${ENTITY} (“ROUTEL”, “we”, “us”).`,
    sections: [
      {
        title: "1. The service",
        body: [
          "ROUTEL is a hosted operating system for shipping and logistics companies: bookings, quotations, Bills of Lading, invoices, collections, accounting, documents, an AI assistant and the modules listed on the pricing page. What each plan includes, and its price, is set out on the pricing page and forms part of these terms.",
          "The service is for business use by companies and their authorised staff. It is not offered to consumers or to anyone under 18.",
        ],
      },
      {
        title: "2. Your account",
        body: [
          "You create an account on behalf of a company and confirm that you are authorised to bind it. You keep your sign-in details confidential, and you are responsible for everything done under your company's accounts. Tell us at once if you suspect unauthorised use.",
          "One subscription covers one company (one commercial registration). Branches and groups are covered by the Enterprise plan.",
          "The information you give us about your company must be accurate and kept up to date.",
        ],
      },
      {
        title: "3. The free trial and the free version",
        body: [
          "Every new account starts with a 14-day trial of the Growth plan, including AI document reading for 30 documents. When the trial ends, the account moves to the free version unless you subscribe to a paid plan.",
          "The free version includes one activity, 5 bookings a month, one user, the company setup assistant, and a preliminary invoice. Printouts from the free version carry the mark “Made with Routel”. Support on the free version is the user guide.",
          "On the free version, and during the trial from its first day, ROUTEL issues a “preliminary invoice” only. It does not carry the title “tax invoice” and is not an official invoice. Issuing the tax invoice from an approved billing system is your company's responsibility; you may link that invoice to the booking by its number or by uploading its file. An invoice keeps the type it was issued with: a preliminary invoice stays preliminary after you subscribe.",
          "We may change the limits of the free version. We will show the change in the service or on the pricing page before it takes effect.",
        ],
      },
      {
        title: "4. Paid plans",
        body: [
          "Paid plans are subscriptions, billed monthly or yearly at the prices on the pricing page. Every paid plan has unlimited users and no implementation fees.",
          "On the paid plans, where your country has VAT or sales tax, the tax invoice is issued inside ROUTEL. For companies in Saudi Arabia, it is e-invoicing compliant with the Zakat, Tax and Customs Authority (ZATCA). You remain responsible for the tax details your company enters and for the invoices it issues.",
          "Fees that we pass through to you, such as government fees for a government link, an electronic Bill of Lading or a customs declaration, are shown separately before you incur them.",
          "We may change a plan's price with at least 30 days' notice; the new price applies from your next billing period. Founding-customer prices are locked for the period stated in the offer.",
          "You may cancel at any time from your account or by writing to us. Cancellation takes effect at the end of the current billing period, and fees already paid are not refunded except where the law requires. When a paid plan ends or is not renewed, the account moves to the free version; nothing is deleted.",
          "If a payment is overdue, we may suspend access to the paid features after telling you and giving you time to pay. Your data is kept, not deleted, while access is suspended.",
        ],
      },
      {
        title: "5. Your data",
        body: [
          "Everything you enter into ROUTEL, including your business partners, shipments, documents, invoices and books, is yours. We process it only to provide the service, as described in the privacy policy, and we do not sell it.",
          "You are responsible for the data you enter, including the personal data of your customers, vendors and staff, and for having the right to enter it. Where ROUTEL processes personal data on your behalf, we act as the processor and you as the controller.",
          "You can export your data at any time while your account exists. Moving to the free version is not closing the account. When you close your account, we export your data on request for 30 days, and then delete it from the live service within 90 days, except records we must keep by law. Backups are taken every 24 hours and are not deleted on a schedule: data deleted from the service remains in earlier backups until those backups are removed, and on a verified request we remove it from them or put it beyond use, as the applicable law requires.",
        ],
      },
      {
        title: "6. Data processing",
        body: [
          "Where ROUTEL processes personal data on your behalf, these commitments apply:",
          "- we process it only on your documented instructions, which are the service as you configure and use it;\n- our staff and contractors who can access it are bound to confidentiality;\n- we use the sub-processors listed in the privacy policy, and we give at least 30 days' notice of a new one on the website or by e-mail, so that you can object;\n- we help you answer requests from the people whose data it is;\n- we inform you of a personal-data breach affecting your data without undue delay, and in any case within 48 hours of confirming it;\n- when your account is closed, we return your data on request and then delete it, as set out in section 5;\n- on request, we give you the information reasonably needed to show that we meet these commitments.",
        ],
      },
      {
        title: "7. The AI assistant",
        body: [
          "The AI assistant reads documents, drafts records and answers questions. Everything it proposes to save waits for a person's confirmation, and every action it carries out is logged.",
          "The assistant's output can be wrong. HS codes it suggests, figures it reads from a document, and answers it gives are proposals for a person to check; you remain responsible for what your company confirms, issues and files.",
          "Documents and messages you ask the assistant to read are processed by a third-party AI provider, as described in the privacy policy.",
        ],
      },
      {
        title: "8. Acceptable use",
        body: [
          "You agree not to:",
          "- use the service for anything unlawful, or to enter data you have no right to enter;\n- try to gain access to another company's data, or to the service's systems beyond your own account;\n- resell the service, or use it to build a competing product;\n- interfere with the service's operation, or load it beyond ordinary business use.",
          "We may suspend an account that breaks these terms, after telling you, unless the risk to the service or to other customers requires us to act first.",
        ],
      },
      {
        title: "9. Third-party services",
        body: [
          "Sign-in, hosting, file storage, e-mail synchronisation (when you connect a Microsoft 365 or Zoho mailbox) and AI processing are provided through third-party services named in the privacy policy. Your use of a mailbox you connect is also subject to that provider's terms.",
        ],
      },
      {
        title: "10. Availability and support",
        body: [
          "We work to keep the service available, with maintenance announced in advance where we can. Support is as stated for your plan on the pricing page. A service-level agreement is part of the Enterprise plan only.",
          "If we ever discontinue the service, we will tell you in advance, by e-mail and in the service, and you will be able to export your data before it ends.",
        ],
      },
      {
        title: "11. Intellectual property",
        body: [
          "ROUTEL, its software, design, documentation and name belong to us or our licensors. These terms give you the right to use the service for your company's business while your account is active, and nothing more.",
        ],
      },
      {
        title: "12. Disclaimer and limitation of liability",
        body: [
          "The free version and the trial are provided as they are, without warranty. For paid plans, we provide the service with reasonable skill and care, and we do not promise that it will be uninterrupted or free of errors.",
          "To the extent the law allows, our total liability to you for all claims is limited to the greater of the fees you paid us in the 12 months before the claim and USD 100. We are not liable for indirect loss or loss of profit, for loss of data that results from your failure to keep or export a copy where you could reasonably have done so, or for regulatory penalties arising from documents your company confirmed, issued or filed.",
          "These limits do not apply to liability for fraud, wilful misconduct or gross negligence, or for breach of our confidentiality or data-protection obligations, and nothing in these terms limits liability that cannot be limited by law.",
        ],
      },
      {
        title: "13. Changes to these terms",
        body: [
          "We may update these terms. When the change matters, we will tell you in the service or by e-mail at least 30 days before it takes effect. Using the service after that date means you accept the updated terms.",
        ],
      },
      {
        title: "14. Governing law",
        body: [
          "These terms are governed by the laws of the Kingdom of Saudi Arabia, and its courts have jurisdiction over any dispute, without prejudice to any rights you have under the mandatory law of the country where your company is registered.",
        ],
      },
      {
        title: "15. Contact",
        body: [`Questions about these terms: ${CONTACT_EMAIL}. Anything about personal data: ${PRIVACY_EMAIL}.`],
      },
    ],
  },
  ar: {
    metaTitle: "شروط الاستخدام",
    metaDescription: "الشروط التي يقدّم ROUTEL بموجبها موقعه ونسخته المجانية وتجربته المجانية وخططه المدفوعة.",
    eyebrow: "قانوني",
    title: "شروط الاستخدام",
    lead: "تحكم هذه الشروط استخدامك لـ ROUTEL: الموقع، والنسخة المجانية، والتجربة المجانية، والخطط المدفوعة. بإنشاء حساب أو استخدام الخدمة فأنت توافق عليها.",
    updated: "آخر تحديث",
    entity: `تُقدَّم الخدمة من \u2066${ENTITY}\u2069 («ROUTEL»، «نحن»).`,
    sections: [
      {
        title: "1. الخدمة",
        body: [
          "ROUTEL نظام تشغيل مستضاف لشركات الشحن والخدمات اللوجستية: الحجوزات، وعروض الأسعار، وبوالص الشحن، والفواتير، والتحصيل، والمحاسبة، والمستندات، والمساعد الذكي، والوحدات المذكورة في صفحة الأسعار. وما تشمله كل خطة وسعرها مبيّن في صفحة الأسعار، وهو جزء من هذه الشروط.",
          "الخدمة للاستخدام التجاري من الشركات وموظفيها المخوّلين، ولا تُقدَّم للمستهلكين ولا لمن هم دون 18 عاماً.",
        ],
      },
      {
        title: "2. حسابك",
        body: [
          "تنشئ الحساب نيابة عن شركة، وتقرّ بأنك مخوّل بإلزامها. وتحافظ على سرية بيانات الدخول، وتتحمل مسؤولية كل ما يُنفَّذ عبر حسابات شركتك. وأبلغنا فوراً إن اشتبهت في استخدام غير مصرّح به.",
          "الاشتراك الواحد لشركة واحدة (سجل تجاري واحد). والفروع والمجموعات تغطيها خطة المؤسسات.",
          "المعلومات التي تزوّدنا بها عن شركتك يجب أن تكون صحيحة ومحدّثة.",
        ],
      },
      {
        title: "3. التجربة المجانية والنسخة المجانية",
        body: [
          "كل حساب جديد يبدأ بتجربة 14 يوماً على خطة النمو والتوسع، ومعها قراءة 30 مستنداً بالذكاء الاصطناعي. وعند انتهاء التجربة ينتقل الحساب إلى النسخة المجانية ما لم تشترك في خطة مدفوعة.",
          "تشمل النسخة المجانية نشاطاً واحداً، و5 حجوزات شهرياً، ومستخدماً واحداً، ومساعد إعداد الشركة، وفاتورة مبدئية. وتحمل المطبوعات من النسخة المجانية عبارة «صُنع بـ Routel». والدعم في النسخة المجانية هو دليل المستخدم.",
          "في النسخة المجانية، وفي التجربة من يومها الأول، يصدر ROUTEL «فاتورة مبدئية» فقط، لا تحمل عنوان «فاتورة ضريبية» ولا تُعد فاتورة رسمية. وإصدار الفاتورة الضريبية من نظام فوترة معتمد مسؤولية شركتك، ويمكنك ربط تلك الفاتورة بالحجز بكتابة رقمها أو رفع ملفها. وتحتفظ الفاتورة بالنوع الذي صدرت به: فالفاتورة المبدئية تبقى مبدئية بعد الاشتراك.",
          "يجوز لنا تغيير حدود النسخة المجانية، ونعرض التغيير في الخدمة أو في صفحة الأسعار قبل سريانه.",
        ],
      },
      {
        title: "4. الخطط المدفوعة",
        body: [
          "الخطط المدفوعة اشتراكات تُحتسب شهرياً أو سنوياً بالأسعار المبيّنة في صفحة الأسعار. وكل خطة مدفوعة بلا حد للمستخدمين وبلا رسوم تطبيق.",
          "وفي الخطط المدفوعة، حيث يكون في دولتك ضريبة قيمة مضافة أو ضريبة مبيعات، تصدر الفاتورة الضريبية داخل ROUTEL، وهي للشركات في المملكة العربية السعودية فوترة إلكترونية متوافقة مع هيئة الزكاة والضريبة والجمارك. وتبقى شركتك مسؤولة عن البيانات الضريبية التي تُدخلها وعن الفواتير التي تصدرها.",
          "أما الرسوم التي نمرّرها إليك، مثل الرسوم الحكومية للربط الحكومي أو البوليصة الإلكترونية أو البيان الجمركي، فتُعرض منفصلة قبل أن تتحملها.",
          "يجوز لنا تغيير سعر خطة بإشعار لا يقل عن 30 يوماً، ويسري السعر الجديد من فترة الفوترة التالية. وأسعار العملاء المؤسسين مثبّتة للمدة المذكورة في العرض.",
          "يمكنك الإلغاء في أي وقت من حسابك أو بالكتابة إلينا. ويسري الإلغاء بنهاية فترة الفوترة الحالية، ولا تُسترد الرسوم المدفوعة إلا حيث يوجب النظام ذلك. وحين تنتهي خطة مدفوعة أو لا تُجدَّد ينتقل الحساب إلى النسخة المجانية، ولا يُحذف شيء.",
          "إن تأخر سداد دفعة، يجوز لنا إيقاف الوصول إلى مزايا الخطة المدفوعة بعد إبلاغك ومنحك مهلة للسداد. وتبقى بياناتك محفوظة ولا تُحذف خلال مدة الإيقاف.",
        ],
      },
      {
        title: "5. بياناتك",
        body: [
          "كل ما تُدخله في ROUTEL، بما فيه شركاء أعمالك وشحناتك ومستنداتك وفواتيرك ودفاترك، ملك لك. ولا نعالجه إلا لتقديم الخدمة كما هو مبيّن في سياسة الخصوصية، ولا نبيعه.",
          "أنت مسؤول عن البيانات التي تُدخلها، بما فيها البيانات الشخصية لعملائك ومورديك وموظفيك، وعن امتلاكك الحق في إدخالها. وحين يعالج ROUTEL بيانات شخصية نيابة عنك، فنحن جهة المعالجة وأنت جهة التحكم.",
          "يمكنك تصدير بياناتك في أي وقت ما دام حسابك قائماً. والانتقال إلى النسخة المجانية ليس إغلاقاً للحساب. وحين تغلق حسابك، نصدّر بياناتك عند الطلب خلال 30 يوماً، ثم نحذفها من الخدمة العاملة خلال 90 يوماً، عدا السجلات التي يوجب النظام الاحتفاظ بها. وتُؤخذ النسخ الاحتياطية كل 24 ساعة ولا تُحذف وفق جدول، فتبقى البيانات المحذوفة من الخدمة في النسخ السابقة حتى تُزال تلك النسخ، وعند طلب موثَّق نزيلها منها أو نجعلها غير قابلة للاستخدام، كما توجب الأنظمة والقوانين المنطبقة.",
        ],
      },
      {
        title: "6. معالجة البيانات",
        body: [
          "حين يعالج ROUTEL بيانات شخصية نيابة عنك، تنطبق الالتزامات التالية:",
          "- لا نعالجها إلا وفق تعليماتك الموثّقة، وهي الخدمة كما تضبطها وتستخدمها؛\n- موظفونا ومتعاقدونا الذين يستطيعون الوصول إليها ملتزمون بالسرية؛\n- نستعين بالمعالجين من الباطن المذكورين في سياسة الخصوصية، ونعلن عن أي معالج جديد في الموقع أو بالبريد قبل 30 يوماً على الأقل، ليتسنى لك الاعتراض؛\n- نساعدك في الرد على طلبات أصحاب البيانات؛\n- نبلغك بأي تسرّب لبيانات شخصية يمس بياناتك دون تأخير لا مبرر له، وفي كل الأحوال خلال 48 ساعة من التأكد منه؛\n- عند إغلاق حسابك نعيد إليك بياناتك عند الطلب ثم نحذفها، كما في القسم 5؛\n- نقدّم لك عند الطلب المعلومات اللازمة بشكل معقول لإثبات وفائنا بهذه الالتزامات.",
        ],
      },
      {
        title: "7. المساعد الذكي",
        body: [
          "يقرأ المساعد الذكي المستندات، ويجهّز السجلات، ويجيب عن الأسئلة. وكل ما يقترح حفظه ينتظر تأكيد شخص، وكل إجراء ينفّذه مسجَّل.",
          "قد يخطئ المساعد. ورموز HS التي يقترحها، والأرقام التي يقرؤها من مستند، والإجابات التي يقدّمها، اقتراحات يراجعها شخص، وتبقى أنت مسؤولاً عمّا تؤكده شركتك وتصدره وتقدّمه.",
          "المستندات والرسائل التي تطلب من المساعد قراءتها يعالجها مزوّد ذكاء اصطناعي خارجي، كما هو مبيّن في سياسة الخصوصية.",
        ],
      },
      {
        title: "8. الاستخدام المقبول",
        body: [
          "توافق على ألا:",
          "- تستخدم الخدمة في أي أمر مخالف للنظام، أو تُدخل بيانات لا تملك الحق في إدخالها؛\n- تحاول الوصول إلى بيانات شركة أخرى، أو إلى أنظمة الخدمة خارج حسابك؛\n- تعيد بيع الخدمة، أو تستخدمها لبناء منتج منافس؛\n- تعطّل عمل الخدمة، أو تحمّلها فوق الاستخدام التجاري المعتاد.",
          "يجوز لنا إيقاف حساب يخالف هذه الشروط بعد إبلاغك، ما لم يستلزم الخطر على الخدمة أو على العملاء الآخرين التصرف أولاً.",
        ],
      },
      {
        title: "9. الخدمات الخارجية",
        body: [
          "تسجيل الدخول، والاستضافة، وتخزين الملفات، ومزامنة البريد (حين تربط صندوق بريد Microsoft 365 أو Zoho)، ومعالجة الذكاء الاصطناعي، تُقدَّم عبر خدمات خارجية مذكورة في سياسة الخصوصية. واستخدامك لصندوق بريد تربطه يخضع أيضاً لشروط مزوّده.",
        ],
      },
      {
        title: "10. التوافر والدعم",
        body: [
          "نعمل على إبقاء الخدمة متاحة، مع الإعلان عن الصيانة مسبقاً حيث أمكن. والدعم كما هو مبيّن لخطتك في صفحة الأسعار. واتفاقية مستوى الخدمة جزء من خطة المؤسسات وحدها.",
          "وإن أوقفنا الخدمة نهائياً يوماً ما، فسنبلغك مسبقاً بالبريد وفي الخدمة، وستتمكن من تصدير بياناتك قبل توقفها.",
        ],
      },
      {
        title: "11. الملكية الفكرية",
        body: [
          "ROUTEL وبرمجياته وتصميمه ووثائقه واسمه ملك لنا أو لمرخّصينا. وتمنحك هذه الشروط حق استخدام الخدمة لأعمال شركتك ما دام حسابك سارياً، لا أكثر.",
        ],
      },
      {
        title: "12. إخلاء المسؤولية وحدودها",
        body: [
          "تُقدَّم النسخة المجانية والتجربة كما هي، بلا ضمان. وفي الخطط المدفوعة نقدّم الخدمة بمهارة وعناية معقولتين، ولا نعد بأنها لن تنقطع أو تخلو من الأخطاء.",
          "وبالقدر الذي يسمح به النظام، تقتصر مسؤوليتنا الإجمالية تجاهك عن كل المطالبات على الأعلى من: الرسوم التي دفعتها لنا في الأشهر الـ 12 السابقة للمطالبة، أو 100 دولار أمريكي. ولا نتحمل الخسائر غير المباشرة، ولا فوات الربح، ولا فقدان البيانات الناتج عن عدم احتفاظك بنسخة منها أو تصديرها حيث كان ذلك ممكناً لك بشكل معقول، ولا الغرامات النظامية الناشئة عن مستندات أكدتها شركتك أو أصدرتها أو قدّمتها.",
          "ولا تنطبق هذه الحدود على المسؤولية عن الاحتيال أو سوء السلوك المتعمد أو الإهمال الجسيم، ولا عن الإخلال بالتزاماتنا بالسرية وحماية البيانات، ولا يحدّ شيء في هذه الشروط من مسؤولية لا يجيز النظام الحد منها.",
        ],
      },
      {
        title: "13. تعديل هذه الشروط",
        body: [
          "يجوز لنا تحديث هذه الشروط. وحين يكون التغيير جوهرياً نبلغك به في الخدمة أو بالبريد قبل سريانه بـ 30 يوماً على الأقل. واستخدامك للخدمة بعد ذلك التاريخ يعني قبولك الشروط المحدّثة.",
        ],
      },
      {
        title: "14. النظام الواجب التطبيق",
        body: [
          "تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص محاكمها بأي نزاع، دون إخلال بأي حقوق لك بموجب الأنظمة الآمرة في الدولة التي سُجّلت فيها شركتك.",
        ],
      },
      {
        title: "15. التواصل",
        body: [`للأسئلة عن هذه الشروط: ${CONTACT_EMAIL}. ولأي أمر يخص البيانات الشخصية: ${PRIVACY_EMAIL}.`],
      },
    ],
  },
};
