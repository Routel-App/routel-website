import type { Locale } from "@/lib/i18n";
import type { LegalCopy } from "./types";
import { ENTITY, PRIVACY_EMAIL } from "./terms";

/**
 * Privacy policy, written to the Personal Data Protection Law of Saudi
 * Arabia (PDPL): who we are, what we collect, why, on what basis, who
 * processes it for us, where it is stored, how long we keep it, and the
 * rights a person has. Hosting and storage providers are the ones the
 * system's deployment documents name (a Hostinger VPS; Cloudflare R2 for
 * files and backups); the founder chose not to name a country.
 */
export const privacy: Record<Locale, LegalCopy> = {
  en: {
    metaTitle: "Privacy policy",
    metaDescription: "How ROUTEL collects, uses, stores and protects personal data, in line with Saudi Arabia's Personal Data Protection Law.",
    eyebrow: "Legal",
    title: "Privacy policy",
    lead: "This policy explains what personal data ROUTEL collects, why, where it is kept and what rights you have. It is written to the Personal Data Protection Law of the Kingdom of Saudi Arabia (PDPL) and its regulations.",
    updated: "Last updated",
    entity: `The data controller for the website and for account data is ${ENTITY} (“ROUTEL”, “we”). For the business data a customer enters into the service, the customer is the controller and ROUTEL is the processor.`,
    sections: [
      {
        title: "1. What this policy covers",
        body: [
          "It covers the website at routel.app, the ROUTEL application (the free version, the trial and the paid plans), and the e-mails we exchange with you. It applies to everyone whose personal data we process: the people who use ROUTEL, the people who contact us, and the people whose details a customer enters into the service.",
        ],
      },
      {
        title: "2. The data we collect",
        body: [
          "- Account data: your name, work e-mail, phone number, company name and role, and the sign-in records of your account.\n- Business data a customer enters: business partners and their contacts, shipments, documents, invoices, payments and accounting records. These can include personal data of a customer's own customers, vendors and staff.\n- Mailbox data, only if you connect a Microsoft 365 or Zoho mailbox: the e-mails and attachments the service reads to link them to bookings and to read documents.\n- Usage and technical data: the pages and actions used, the browser and device, the IP address, and server logs kept for security and troubleshooting.\n- Website forms: what you enter when you request a demo or write to us.",
          "We do not collect more than the service needs, and we do not collect payment card details on the website.",
        ],
      },
      {
        title: "3. Why we use it, and on what basis",
        body: [
          "- To provide the service you or your company asked for, and to run your account: on the basis of the contract with you or your company.\n- To keep the service secure, to prevent abuse and to fix faults: on the basis of our legitimate interest, within the limits the PDPL allows.\n- To answer a request you send us, such as a demo request: on the basis of the request itself.\n- To send you notices about the service, such as changes to the terms or to your plan: on the basis of the contract.\n- To send marketing e-mails: only with your consent, which you can withdraw at any time from the e-mail itself or by writing to us.",
          "We do not sell personal data, and we do not use it for automated decisions that have a legal effect on you.",
        ],
      },
      {
        title: "4. The AI assistant",
        body: [
          "When you ask the assistant to read a document or an e-mail, or to answer a question, the content you give it is sent to a third-party AI model provider (currently OpenAI) to be processed, and the result comes back to the service. We send only what the task needs, and the provider processes it under its business terms, which do not allow it to use the content to train its models. Every change the assistant proposes waits for a person's confirmation, and every action it carries out is logged.",
        ],
      },
      {
        title: "5. Who processes data for us",
        body: [
          "We use these providers, each bound by a data processing agreement and limited to the purpose named:",
          "- Hostinger: the virtual private server (VPS) that runs the service and its database.\n- Cloudflare: R2 object storage for the files you upload and for backups, and DNS.\n- Clerk: sign-in and account security.\n- OpenAI: processing for the AI assistant, as described above.\n- Microsoft or Zoho: only if you connect a mailbox from that provider, and only through the access you grant.",
          "We disclose personal data to no one else, except when the law requires it or to protect the service and its users from harm.",
        ],
      },
      {
        title: "6. Where your data is kept",
        body: [
          "The service and its database run on a virtual private server at Hostinger. The files you upload and the nightly backups are kept in Cloudflare R2 object storage. Each customer's data is kept in its own database and its own storage bucket, separate from every other customer.",
          "Some of these providers process data outside the Kingdom of Saudi Arabia. Where personal data of people in the Kingdom is transferred outside it, we do so only within the conditions the PDPL and its regulations set for such transfers, including an agreement with the provider that protects the data to a level no lower than the law requires.",
        ],
      },
      {
        title: "7. How long we keep it",
        body: [
          "- Account and business data: for as long as the account is active. After an account ends, the customer can export its data for 30 days, and we delete the data within 90 days after that.\n- Backups: on a rolling schedule, and deleted with it.\n- Server and security logs: up to 12 months.\n- Demo requests and correspondence: up to 24 months after our last contact.\n- Records we must keep by law, such as accounting records of our own business: for the period the law sets.",
        ],
      },
      {
        title: "8. How we protect it",
        body: [
          "Data travels over encrypted connections (TLS). Each customer's data is isolated in its own database and storage. Access by our staff is limited to what their work needs and is logged. Mailbox tokens are stored encrypted. Backups are taken nightly. If a breach of personal data occurs, we will notify the competent authority and the people affected as the PDPL requires.",
        ],
      },
      {
        title: "9. Your rights",
        body: [
          "Under the PDPL you have the right to:",
          "- know how we process your personal data, which this policy sets out;\n- access your personal data and obtain a copy of it in a readable form;\n- ask us to correct, complete or update it;\n- ask us to destroy it when it is no longer needed for the purpose it was collected for, subject to records the law requires us to keep;\n- withdraw consent where our processing relies on it, without affecting what was done before.",
          `To exercise a right, write to ${PRIVACY_EMAIL} from the e-mail address on your account. We answer within 30 days. If your data was entered by a customer of ours (for example, you are a contact at one of its business partners), we will pass your request to that customer, as the controller, and help it respond.`,
          "You also have the right to complain to the competent authority in the Kingdom of Saudi Arabia, the Saudi Data & AI Authority (SDAIA).",
        ],
      },
      {
        title: "10. Cookies",
        body: [
          "The website uses only the cookies and browser storage needed for it to work, such as remembering your language. The application uses a session cookie to keep you signed in. We do not use advertising cookies, and we do not track you across other websites.",
        ],
      },
      {
        title: "11. Children",
        body: ["The service is for business use and is not directed at anyone under 18. We do not knowingly collect their data."],
      },
      {
        title: "12. Changes to this policy",
        body: [
          "We may update this policy. When the change matters, we will tell you in the service or by e-mail before it takes effect. The date at the top shows the current version.",
        ],
      },
      {
        title: "13. Contact",
        body: [`For anything about personal data: ${PRIVACY_EMAIL}.`],
      },
    ],
  },
  ar: {
    metaTitle: "سياسة الخصوصية",
    metaDescription: "كيف يجمع ROUTEL البيانات الشخصية ويستخدمها ويحفظها ويحميها، وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.",
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    lead: "تبيّن هذه السياسة ما يجمعه ROUTEL من بيانات شخصية، ولماذا، وأين تُحفظ، وما حقوقك. وهي مكتوبة وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية ولوائحه.",
    updated: "آخر تحديث",
    entity: `جهة التحكم في بيانات الموقع وبيانات الحسابات هي ${ENTITY} («ROUTEL»، «نحن»). أما بيانات الأعمال التي يُدخلها العميل في الخدمة، فالعميل هو جهة التحكم وROUTEL جهة المعالجة.`,
    sections: [
      {
        title: "1. ما تغطيه هذه السياسة",
        body: [
          "تغطي الموقع routel.app، وتطبيق ROUTEL (النسخة المجانية والتجربة والخطط المدفوعة)، والرسائل التي نتبادلها معك. وتنطبق على كل من نعالج بياناته الشخصية: من يستخدمون ROUTEL، ومن يتواصلون معنا، ومن يُدخل عميلٌ بياناتهم في الخدمة.",
        ],
      },
      {
        title: "2. البيانات التي نجمعها",
        body: [
          "- بيانات الحساب: اسمك، وبريد العمل، ورقم الهاتف، واسم الشركة ودورك فيها، وسجلات تسجيل الدخول إلى حسابك.\n- بيانات الأعمال التي يُدخلها العميل: شركاء الأعمال وجهات اتصالهم، والشحنات، والمستندات، والفواتير، والدفعات، والسجلات المحاسبية. وقد تتضمن بيانات شخصية لعملاء العميل ومورديه وموظفيه.\n- بيانات البريد، فقط إن ربطت صندوق بريد Microsoft 365 أو Zoho: الرسائل والمرفقات التي تقرؤها الخدمة لربطها بالحجوزات وقراءة المستندات.\n- بيانات الاستخدام والبيانات التقنية: الصفحات والإجراءات المستخدمة، والمتصفح والجهاز، وعنوان IP، وسجلات الخادم المحفوظة للأمان ومعالجة الأعطال.\n- نماذج الموقع: ما تُدخله حين تطلب عرضاً تجريبياً أو تكتب إلينا.",
          "لا نجمع أكثر مما تحتاجه الخدمة، ولا نجمع بيانات بطاقات الدفع في الموقع.",
        ],
      },
      {
        title: "3. لماذا نستخدمها، وعلى أي أساس",
        body: [
          "- لتقديم الخدمة التي طلبتها أنت أو شركتك، وتشغيل حسابك: على أساس العقد معك أو مع شركتك.\n- لحماية الخدمة، ومنع إساءة الاستخدام، وإصلاح الأعطال: على أساس مصلحتنا المشروعة، في الحدود التي يجيزها النظام.\n- للرد على طلب ترسله إلينا، مثل طلب عرض تجريبي: على أساس الطلب نفسه.\n- لإرسال إشعارات عن الخدمة، مثل تغيير الشروط أو خطتك: على أساس العقد.\n- لإرسال رسائل تسويقية: بموافقتك فقط، ويمكنك سحبها في أي وقت من الرسالة نفسها أو بالكتابة إلينا.",
          "لا نبيع البيانات الشخصية، ولا نستخدمها في قرارات آلية لها أثر نظامي عليك.",
        ],
      },
      {
        title: "4. المساعد الذكي",
        body: [
          "حين تطلب من المساعد قراءة مستند أو رسالة، أو الإجابة عن سؤال، يُرسل المحتوى الذي تعطيه إياه إلى مزوّد نماذج ذكاء اصطناعي خارجي (حالياً OpenAI) لمعالجته، وتعود النتيجة إلى الخدمة. ولا نرسل إلا ما تحتاجه المهمة، ويعالجه المزوّد وفق شروطه التجارية التي لا تجيز له استخدام المحتوى لتدريب نماذجه. وكل تغيير يقترحه المساعد ينتظر تأكيد شخص، وكل إجراء ينفّذه مسجَّل.",
        ],
      },
      {
        title: "5. من يعالج البيانات نيابة عنا",
        body: [
          "نستعين بالمزوّدين التاليين، وكلٌّ منهم ملتزم باتفاقية معالجة بيانات ومحصور في الغرض المذكور:",
          "- Hostinger: الخادم الافتراضي الخاص (VPS) الذي تعمل عليه الخدمة وقاعدة بياناتها.\n- Cloudflare: تخزين الكائنات R2 للملفات التي ترفعها وللنسخ الاحتياطية، وخدمة DNS.\n- Clerk: تسجيل الدخول وأمان الحسابات.\n- OpenAI: المعالجة للمساعد الذكي، كما سبق بيانه.\n- Microsoft أو Zoho: فقط إن ربطت صندوق بريد من ذلك المزوّد، وفي حدود الصلاحية التي تمنحها.",
          "ولا نفصح عن بيانات شخصية لأي جهة أخرى، إلا حين يوجب النظام ذلك أو لحماية الخدمة ومستخدميها من الضرر.",
        ],
      },
      {
        title: "6. أين تُحفظ بياناتك",
        body: [
          "تعمل الخدمة وقاعدة بياناتها على خادم افتراضي خاص لدى Hostinger. وتُحفظ الملفات التي ترفعها والنسخ الاحتياطية الليلية في تخزين Cloudflare R2. وتُحفظ بيانات كل عميل في قاعدة بيانات خاصة به ومساحة تخزين خاصة به، منفصلة عن كل عميل آخر.",
          "ويعالج بعض هؤلاء المزوّدين البيانات خارج المملكة العربية السعودية. وحين تُنقل بيانات شخصية لأشخاص في المملكة إلى خارجها، فلا يكون ذلك إلا ضمن الشروط التي يضعها نظام حماية البيانات الشخصية ولوائحه لهذا النقل، ومنها اتفاقية مع المزوّد تحمي البيانات بمستوى لا يقل عمّا يوجبه النظام.",
        ],
      },
      {
        title: "7. مدة الاحتفاظ",
        body: [
          "- بيانات الحساب والأعمال: ما دام الحساب سارياً. وبعد انتهاء الحساب يمكن للعميل تصدير بياناته لمدة 30 يوماً، ونحذفها خلال 90 يوماً بعد ذلك.\n- النسخ الاحتياطية: وفق جدول متجدد، وتُحذف معه.\n- سجلات الخادم والأمان: حتى 12 شهراً.\n- طلبات العرض التجريبي والمراسلات: حتى 24 شهراً بعد آخر تواصل.\n- السجلات التي يوجب النظام الاحتفاظ بها، مثل السجلات المحاسبية لأعمالنا: للمدة التي يحددها النظام.",
        ],
      },
      {
        title: "8. كيف نحميها",
        body: [
          "تنتقل البيانات عبر اتصالات مشفّرة (TLS). وبيانات كل عميل معزولة في قاعدة بيانات وتخزين خاصين به. ووصول موظفينا محصور فيما يحتاجه عملهم ومسجَّل. ورموز الوصول إلى البريد محفوظة مشفّرة. والنسخ الاحتياطية تُؤخذ ليلياً. وإن وقع تسرّب لبيانات شخصية، نُبلغ الجهة المختصة والمتضررين كما يوجب نظام حماية البيانات الشخصية.",
        ],
      },
      {
        title: "9. حقوقك",
        body: [
          "بموجب نظام حماية البيانات الشخصية، لك الحق في:",
          "- معرفة كيف نعالج بياناتك الشخصية، وهو ما تبيّنه هذه السياسة؛\n- الوصول إلى بياناتك الشخصية والحصول على نسخة منها بصيغة مقروءة؛\n- طلب تصحيحها أو إكمالها أو تحديثها؛\n- طلب إتلافها حين لا تعود لازمة للغرض الذي جُمعت له، مع مراعاة السجلات التي يوجب النظام الاحتفاظ بها؛\n- سحب الموافقة حين تعتمد معالجتنا عليها، دون أثر على ما تم قبل ذلك.",
          `لممارسة أي حق، اكتب إلى ${PRIVACY_EMAIL} من عنوان البريد المسجّل في حسابك. ونرد خلال 30 يوماً. وإن كانت بياناتك قد أُدخلت من عميل لدينا (مثلاً أنت جهة اتصال لدى أحد شركاء أعماله)، فنحيل طلبك إلى ذلك العميل بصفته جهة التحكم ونساعده في الرد.`,
          "ولك أيضاً الحق في تقديم شكوى إلى الجهة المختصة في المملكة العربية السعودية، الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).",
        ],
      },
      {
        title: "10. ملفات تعريف الارتباط",
        body: [
          "لا يستخدم الموقع إلا ملفات تعريف الارتباط وتخزين المتصفح اللازمة لعمله، مثل تذكّر لغتك. ويستخدم التطبيق ملف جلسة لإبقائك مسجّل الدخول. ولا نستخدم ملفات إعلانية، ولا نتتبعك عبر مواقع أخرى.",
        ],
      },
      {
        title: "11. القاصرون",
        body: ["الخدمة للاستخدام التجاري وليست موجّهة لمن هم دون 18 عاماً، ولا نجمع بياناتهم عن علم."],
      },
      {
        title: "12. تعديل هذه السياسة",
        body: [
          "يجوز لنا تحديث هذه السياسة. وحين يكون التغيير جوهرياً نبلغك به في الخدمة أو بالبريد قبل سريانه. والتاريخ في أعلى الصفحة يبيّن النسخة الحالية.",
        ],
      },
      {
        title: "13. التواصل",
        body: [`لأي أمر يخص البيانات الشخصية: ${PRIVACY_EMAIL}.`],
      },
    ],
  },
};
