import type { Locale } from "@/lib/i18n";
import type { LegalCopy } from "./types";
import { CONTACT_EMAIL, ENTITY, PRIVACY_EMAIL } from "./terms";

/**
 * Privacy policy, written to the personal-data laws of the countries where
 * ROUTEL is offered (Qatar, Saudi Arabia, Malaysia, Indonesia): who we are,
 * what we collect, why, on what basis, who processes it for us, where it is
 * stored, how long we keep it, and the rights a person has.
 *
 * Product facts come from the app's user guide (origin/development,
 * artifacts/api-server/src/lib/assistantGuide): contacts from e-mail and
 * business cards is topic `crm-contacts`; AI reading is `customs-reading`,
 * `document-review` and `booking-documents-assistant`. Requests to the AI
 * provider carry `store: false` (lib/aiModel.ts, routes/assistant.ts).
 * Backups follow topic `database-backups` (every 24 hours, kept, none
 * deleted automatically). Hosting (a Hostinger VPS in Kuala Lumpur; the
 * website on Vercel) is the founder's statement. `@google-cloud/storage` is
 * listed in the app's package.json but imported nowhere, so Google Cloud is
 * not named as a processor.
 * No city of incorporation, headquarters or person's name is given here.
 */
export const privacy: Record<Locale, LegalCopy> = {
  en: {
    metaTitle: "Privacy policy",
    metaDescription:
      "How ROUTEL collects, uses, stores and protects personal data, under the personal-data laws of Qatar, Saudi Arabia, Malaysia and Indonesia.",
    eyebrow: "Legal",
    title: "Privacy policy",
    lead: "This policy explains what personal data ROUTEL collects, why, where it is kept and what rights you have. It is written to meet the personal-data laws of the countries where ROUTEL is offered: Qatar, Saudi Arabia, Malaysia and Indonesia.",
    updated: "Last updated",
    entity: `The data controller for the website and for account data is ${ENTITY} (“ROUTEL”, “we”). For the business data a customer enters into the service, the customer is the controller and ROUTEL is the processor, acting on the customer's instructions.`,
    sections: [
      {
        title: "1. What this policy covers",
        body: [
          "It covers the website at routel.app, the ROUTEL application (the free version, the trial and the paid plans), and the e-mails we exchange with you. It applies to everyone whose personal data we process: the people who use ROUTEL, the people who contact us, and the people whose details a customer enters into the service or receives in its connected mailboxes.",
        ],
      },
      {
        title: "2. The laws this policy follows",
        body: [
          "This policy is written to meet the personal-data laws of the countries where ROUTEL is offered:",
          "- Qatar: Law No. 13 of 2016 on Personal Data Privacy Protection.\n- Saudi Arabia: the Personal Data Protection Law (PDPL) and its regulations.\n- Malaysia: the Personal Data Protection Act 2010 (PDPA).\n- Indonesia: Law No. 27 of 2022 on Personal Data Protection (UU PDP).",
          "Your rights are those of the law that applies to you, usually the law of the country where you are or where the company that entered your data is registered. Where these laws differ, we follow the one that applies to the data in question.",
        ],
      },
      {
        title: "3. The data we collect",
        body: [
          "- Account data: your name, work e-mail, phone number, company name and role, and the sign-in records of your account.\n- Business data a customer enters: business partners and their contacts, shipments, documents, invoices, payments and accounting records. These can include personal data of a customer's own customers, suppliers and staff.\n- Mailbox data, only if a customer connects a Microsoft 365 or Zoho mailbox: the e-mails and attachments the service brings in to link them to bookings and to read documents.\n- Contacts from e-mail and business cards, only if a customer's admin turns this on: the names and e-mail addresses in the headers of the e-mails already in its connected mailboxes, and the business cards its users scan (section 6).\n- HR and payroll data a customer keeps about its employees (identity documents, nationality, date of birth, salary and bank details, leave records that may include medical certificates, e-signatures); drivers' location when they allow it, and the photos and receipts they send. Some of this is sensitive personal data; the customer, as controller, must have the consent or other basis its law requires, and access is limited to the roles the customer authorises.\n- Usage and technical data: the pages and actions used, the browser and device, the IP address, and server logs kept for security and troubleshooting.\n- Website forms: what you enter when you request a demo or write to us.",
          "We do not collect more than the service needs, and we do not collect payment card details on the website.",
        ],
      },
      {
        title: "4. Why we use it, and on what basis",
        body: [
          "- To provide the service you or your company asked for, and to run your account: on the basis of the contract with you or your company.\n- To keep the service secure, to prevent abuse and to fix faults: on the basis of our legitimate interest, within the limits the applicable law allows.\n- To answer a request you send us, such as a demo request: on the basis of the request itself.\n- To send you notices about the service, such as changes to the terms or to your plan: on the basis of the contract.\n- To send marketing e-mails: only with your consent, which you can withdraw at any time from the e-mail itself or by writing to us.",
          "For the business data a customer enters or receives, the customer decides why it is processed and must have its own lawful basis; we process it only to provide the service to that customer.",
          "We do not sell personal data, and we do not use it for automated decisions that have a legal effect on you.",
        ],
      },
      {
        title: "5. AI document reading and the assistant",
        body: [
          "ROUTEL uses AI to read documents so that people don't have to type them, and to run its assistant. What it reads:",
          "- carrier documents, such as booking confirmations, Bills of Lading and arrival notices;\n- supplier bills (AP invoices), to propose the costs on a booking, and shipping lines' demurrage and detention invoices, to compare them with the line's tariff;\n- commercial invoices and packing lists, to propose the lines of a customs declaration and HS code suggestions;\n- tax invoices issued from another billing system, to link them to a booking;\n- drivers' receipts (fuel, tolls, parking, repairs), to fill the trip expense;\n- attachments arriving in a connected mailbox, to suggest what each one is and which booking it belongs to; the text of operations e-mails that speak of a schedule change, to propose the new dates; and e-mails in the finance mailbox, to suggest which invoice a payment belongs to;\n- business cards and e-mail signatures, only when contacts from e-mail and business cards is on (section 6);\n- the questions and files a user gives the assistant.",
          "The content is sent to a third-party AI model provider (currently OpenAI) only to be processed, and the result comes back to the service. We send only what the task needs. Requests are sent with storage at the provider turned off, so the provider does not keep them for later use; under its business terms it may keep a request for up to 30 days for safety and abuse monitoring, and it does not use the content to train its models.",
          "Nothing the AI reads is saved until a person confirms it: the assistant's proposals wait for confirmation, e-mailed documents are approved in Documents, a customs HS code counts only when the broker confirms it, and every field read from a business card is checked before the contact is saved. Text inside a document is treated as data, never as an instruction. Every action the assistant carries out is logged.",
        ],
      },
      {
        title: "6. Contacts from e-mail and business cards",
        body: [
          "This part of the service finds the people a customer deals with at each of its business partners. It is off until the customer's admin turns it on; the settings page explains what is read before it is turned on.",
          "- E-mail headers: once it is on, the names and e-mail addresses in the From, To, Cc and Reply-To of the e-mails already synced from the customer's connected mailboxes are filed under the business partner each person works for, by their exact address or by the partner's domain. The customer's own staff and domains, no-reply addresses, newsletters and mailing lists are skipped. Only the header details are kept for this (the address, the name, whether the person sent or received the e-mail, the date and the mailbox); the text of the e-mails is not copied or stored for it. An address at a free e-mail service that matches no contact is kept without its name.\n- Becoming a contact: a person found in the e-mails becomes a contact only when a user adds them, or, if the admin chose to add people automatically, once they appear in a set number of e-mails at a known partner.\n- E-mail signatures: if the admin allows it, the AI reads the signature of a new person's latest e-mail once, to fill their position and phone numbers, at most 200 a day per company. The signature is then dropped; only the position and phone numbers are kept.\n- Business cards: a user can photograph a card (up to 4 photos of one card, or up to 20 cards at a time). Each photo is made smaller before it is read, which also removes its location data, and the AI reads the name, position, company and contact details. The user checks and can change every field before saving. The photos are kept with the contact in the customer's own private storage and open only from the contact's page, for people signed in.",
          "- Retention: the record of a person who was never added as a contact is deleted after 24 months, a period the customer's admin can set between 6 and 120 months. Saved contacts are kept until the customer deletes them.\n- Deletion: deleting a contact also deletes its card photos and its suggestions from the e-mails, and its addresses are not suggested again. Deleting a business partner deletes the people found at it and its contacts' card photos. When the feature is turned off nothing more is read, and the admin can choose to delete everything it collected about people who were not added as contacts. Addresses and domains a user chose to ignore are kept only so that they are not suggested again.",
          "The customer is the controller of these contacts. It is responsible for having a lawful basis to keep them and for giving the people concerned the notice its law requires. A person who wants their details removed can ask the customer, or write to us and we will pass the request on (section 11).",
        ],
      },
      {
        title: "7. Who processes data for us",
        body: [
          "We use these providers, under their data-processing terms and limited to the purpose named:",
          "- Hostinger: the virtual private server (VPS) that runs the service and its database.\n- Cloudflare: R2 object storage for the files you upload and for backups, and DNS.\n- Clerk: sign-in and account security.\n- OpenAI: AI processing, as described in section 5.\n- Microsoft or Zoho: only if a mailbox from that provider is connected, and only through the access granted.\n- Vercel: hosting of the website routel.app, including its server logs.",
          "We disclose personal data to no one else, except when the law requires it or to protect the service and its users from harm.",
        ],
      },
      {
        title: "8. Where your data is kept, and transfers across borders",
        body: [
          "The service and its database run on a Hostinger virtual private server located in Kuala Lumpur, Malaysia. The files you upload and the nightly backups are kept in Cloudflare R2 object storage. Each customer's data is kept in its own database and its own storage, separate from every other customer. A customer on the Enterprise plan can have its own dedicated server, in a location agreed with it.",
          "So the personal data of people in Qatar, Saudi Arabia or Indonesia is transferred to Malaysia, and some providers (section 7) process data in other countries. We make such transfers only to provide the service, with appropriate safeguards such as standard contractual clauses that protect the data to a level no lower than the applicable law requires, after a transfer risk assessment where the law requires one, and within the conditions that each law sets for transfers outside the country, including the Qatari law, the Saudi PDPL and its transfer regulations, the Malaysian PDPA and the Indonesian UU PDP.",
        ],
      },
      {
        title: "9. How long we keep it",
        body: [
          "- Account and business data: for as long as the account exists. When a trial ends or a paid plan lapses, the account moves to the free version and nothing is deleted; that is not closing the account. When a customer closes its account, we export its data on request for 30 days, and then delete it from the live service within 90 days.\n- E-mails synced from a connected mailbox, with their attachments: until the customer deletes them or closes its account.\n- Contacts from e-mail and business cards: as set out in section 6.\n- Backups: the whole database is backed up every 24 hours to Cloudflare R2 (and, on some servers, also on the server host). Backups are kept and are not deleted on a schedule, so data deleted from the service remains in earlier backups until those backups are removed. On a verified request to delete personal data, we remove it from the backups or put it beyond use, as the applicable law requires.\n- Server and security logs: up to 12 months.\n- Demo requests and correspondence: up to 24 months after our last contact.\n- Records we must keep by law, such as accounting records of our own business: for the period the law sets.",
        ],
      },
      {
        title: "10. How we protect it",
        body: [
          "Data travels over encrypted connections (TLS). Each customer's data is isolated in its own database and storage. Access by our staff is limited to what their work needs. Mailbox tokens are stored encrypted. Backups are taken every 24 hours. If a breach of personal data occurs, we inform the affected customer without undue delay, and in any case within 48 hours of confirming a breach that affects its data; we notify the competent authority and the people affected as the applicable law requires, and help the customer meet its own duty to notify.",
        ],
      },
      {
        title: "11. Your rights",
        body: [
          "Depending on the law that applies to you, you have the right to:",
          "- know how we process your personal data, which this policy sets out;\n- access your personal data and obtain a copy of it in a readable form;\n- ask us to correct, complete or update it;\n- ask us to delete or destroy it when it is no longer needed for the purpose it was collected for, subject to records the law requires us to keep;\n- withdraw consent where our processing relies on it, without affecting what was done before;\n- where your law provides it, object to or limit the processing, or receive your data in a commonly used format.",
          `To exercise a right, write to ${PRIVACY_EMAIL}, if you have an account from the e-mail address on it. We answer within the time limit set by the law that applies to you. If your data was entered by a customer of ours (for example, you are a contact at one of its business partners), we will pass your request to that customer, as the controller, and help it respond.`,
          "You also have the right to complain to the competent data protection authority in your country, for example: in Qatar, the National Data Privacy Office of the National Cyber Security Agency; in Saudi Arabia, the Saudi Data & AI Authority (SDAIA); in Malaysia, the Personal Data Protection Commissioner (JPDP); in Indonesia, the Ministry of Communication and Digital Affairs (Komdigi), or the personal data protection agency under the UU PDP once established.",
          `Data Protection Officer: ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: "12. Cookies",
        body: [
          "The website sets no cookies. The application uses the sign-in cookies set by Clerk to keep you signed in.",
        ],
      },
      {
        title: "13. Children",
        body: ["The service is for business use and is not directed at anyone under 18. We do not knowingly collect their data."],
      },
      {
        title: "14. Changes to this policy",
        body: [
          "We may update this policy. When the change matters, we will tell you in the service or by e-mail before it takes effect. The date at the top shows the current version.",
        ],
      },
      {
        title: "15. Contact",
        body: [`For anything about personal data: ${PRIVACY_EMAIL}. For anything else: ${CONTACT_EMAIL}.`],
      },
    ],
  },
  ar: {
    metaTitle: "سياسة الخصوصية",
    metaDescription:
      "كيف يجمع ROUTEL البيانات الشخصية ويستخدمها ويحفظها ويحميها، وفق أنظمة وقوانين حماية البيانات الشخصية في قطر والسعودية وماليزيا وإندونيسيا.",
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    lead: "تبيّن هذه السياسة ما يجمعه ROUTEL من بيانات شخصية، ولماذا، وأين تُحفظ، وما حقوقك. وهي مكتوبة لتستوفي أنظمة وقوانين حماية البيانات الشخصية في الدول التي يُقدَّم فيها ROUTEL: قطر والمملكة العربية السعودية وماليزيا وإندونيسيا.",
    updated: "آخر تحديث",
    entity: `جهة التحكم في بيانات الموقع وبيانات الحسابات هي ⁦${ENTITY}⁩ («ROUTEL»، «نحن»). أما بيانات الأعمال التي يُدخلها العميل في الخدمة، فالعميل هو جهة التحكم وROUTEL جهة المعالجة، يعمل وفق تعليمات العميل.`,
    sections: [
      {
        title: "1. ما تغطيه هذه السياسة",
        body: [
          "تغطي الموقع routel.app، وتطبيق ROUTEL (النسخة المجانية والتجربة والخطط المدفوعة)، والرسائل التي نتبادلها معك. وتنطبق على كل من نعالج بياناته الشخصية: من يستخدمون ROUTEL، ومن يتواصلون معنا، ومن يُدخل عميلٌ بياناتهم في الخدمة أو تصله رسائلهم في صناديق بريده المرتبطة.",
        ],
      },
      {
        title: "2. الأنظمة والقوانين التي تتبعها هذه السياسة",
        body: [
          "هذه السياسة مكتوبة لتستوفي أنظمة وقوانين حماية البيانات الشخصية في الدول التي يُقدَّم فيها ROUTEL:",
          "- قطر: القانون رقم (13) لسنة 2016 بشأن حماية خصوصية البيانات الشخصية.\n- المملكة العربية السعودية: نظام حماية البيانات الشخصية ولوائحه.\n- ماليزيا: قانون حماية البيانات الشخصية لسنة 2010 (PDPA).\n- إندونيسيا: القانون رقم 27 لسنة 2022 بشأن حماية البيانات الشخصية (UU PDP).",
          "وحقوقك هي ما يمنحه النظام أو القانون الذي ينطبق عليك، وهو عادةً قانون الدولة التي أنت فيها أو التي سُجّلت فيها الشركة التي أدخلت بياناتك. وحين تختلف هذه الأنظمة والقوانين، نتبع ما ينطبق منها على البيانات المعنية.",
        ],
      },
      {
        title: "3. البيانات التي نجمعها",
        body: [
          "- بيانات الحساب: اسمك، وبريد العمل، ورقم الهاتف، واسم الشركة ودورك فيها، وسجلات تسجيل الدخول إلى حسابك.\n- بيانات الأعمال التي يُدخلها العميل: شركاء الأعمال وجهات اتصالهم، والشحنات، والمستندات، والفواتير، والدفعات، والسجلات المحاسبية. وقد تتضمن بيانات شخصية لعملاء العميل ومورديه وموظفيه.\n- بيانات البريد، فقط إن ربط العميل صندوق بريد Microsoft 365 أو Zoho: الرسائل والمرفقات التي تجلبها الخدمة لربطها بالحجوزات وقراءة المستندات.\n- جهات الاتصال من البريد وبطاقات العمل، فقط إن شغّلها مدير النظام لدى العميل: الأسماء وعناوين البريد في ترويسات الرسائل الموجودة في صناديق بريده المرتبطة، وبطاقات العمل التي يمسحها مستخدموه (القسم 6).\n- بيانات الموارد البشرية والرواتب التي يحفظها العميل عن موظفيه (وثائق الهوية، والجنسية، وتاريخ الميلاد، والراتب والبيانات البنكية، وسجلات الإجازات وقد تتضمن تقارير طبية، والتواقيع الإلكترونية)، وموقع السائق حين يسمح بذلك والصور والإيصالات التي يرسلها. وبعضها بيانات حساسة، وعلى العميل بصفته جهة التحكم الحصول على الموافقة أو الأساس الذي يوجبه نظامه، ويقتصر الوصول إليها على الأدوار التي يحددها العميل.\n- بيانات الاستخدام والبيانات التقنية: الصفحات والإجراءات المستخدمة، والمتصفح والجهاز، وعنوان IP، وسجلات الخادم المحفوظة للأمان ومعالجة الأعطال.\n- نماذج الموقع: ما تُدخله حين تطلب عرضاً تجريبياً أو تكتب إلينا.",
          "لا نجمع أكثر مما تحتاجه الخدمة، ولا نجمع بيانات بطاقات الدفع في الموقع.",
        ],
      },
      {
        title: "4. لماذا نستخدمها، وعلى أي أساس",
        body: [
          "- لتقديم الخدمة التي طلبتها أنت أو شركتك، وتشغيل حسابك: على أساس العقد معك أو مع شركتك.\n- لحماية الخدمة، ومنع إساءة الاستخدام، وإصلاح الأعطال: على أساس مصلحتنا المشروعة، في الحدود التي تجيزها الأنظمة والقوانين المنطبقة.\n- للرد على طلب ترسله إلينا، مثل طلب عرض تجريبي: على أساس الطلب نفسه.\n- لإرسال إشعارات عن الخدمة، مثل تغيير الشروط أو خطتك: على أساس العقد.\n- لإرسال رسائل تسويقية: بموافقتك فقط، ويمكنك سحبها في أي وقت من الرسالة نفسها أو بالكتابة إلينا.",
          "وبيانات الأعمال التي يُدخلها العميل أو تصله، يحدد العميل غرض معالجتها، ويجب أن يكون له أساس نظامي خاص به، ولا نعالجها إلا لتقديم الخدمة لذلك العميل.",
          "لا نبيع البيانات الشخصية، ولا نستخدمها في قرارات آلية لها أثر نظامي عليك.",
        ],
      },
      {
        title: "5. قراءة المستندات بالذكاء الاصطناعي والمساعد الذكي",
        body: [
          "يستخدم ROUTEL الذكاء الاصطناعي لقراءة المستندات بدلاً من كتابتها يدوياً، ولتشغيل مساعده الذكي. وما يقرؤه:",
          "- مستندات الناقل، مثل تأكيدات الحجز وبوالص الشحن وإشعارات الوصول؛\n- فواتير الموردين، لاقتراح التكاليف على الحجز، وفواتير الأرضيات والتأخير من الخطوط الملاحية، لمقارنتها بتعرفة الخط؛\n- الفواتير التجارية وقوائم التعبئة، لاقتراح بنود البيان الجمركي ورموز HS؛\n- الفواتير الضريبية الصادرة من نظام فوترة آخر، لربطها بالحجز؛\n- إيصالات السائقين (الوقود، والرسوم، والمواقف، والإصلاح)، لتعبئة مصروف الرحلة؛\n- المرفقات الواردة إلى صندوق بريد مرتبط، لاقتراح نوع كل منها والحجز الذي يخصه؛ ونص رسائل بريد العمليات التي تتحدث عن تغيير في المواعيد، لاقتراح المواعيد الجديدة؛ ورسائل بريد المالية، لاقتراح الفاتورة التي تخصها الدفعة؛\n- بطاقات العمل وتواقيع البريد، فقط حين تكون جهات الاتصال من البريد وبطاقات العمل مشغّلة (القسم 6)؛\n- الأسئلة والملفات التي يعطيها المستخدم للمساعد.",
          "ويُرسل المحتوى إلى مزوّد نماذج ذكاء اصطناعي خارجي (حالياً OpenAI) لمعالجته فقط، وتعود النتيجة إلى الخدمة. ولا نرسل إلا ما تحتاجه المهمة. وتُرسل الطلبات مع إيقاف التخزين لدى المزوّد، فلا يحتفظ بها لاستخدام لاحق؛ ويجوز له بموجب شروطه التجارية الاحتفاظ بالطلب مدة تصل إلى 30 يوماً لأغراض السلامة ومنع إساءة الاستخدام، ولا يستخدم المحتوى لتدريب نماذجه.",
          "ولا يُحفظ شيء مما يقرؤه الذكاء الاصطناعي حتى يؤكده شخص: اقتراحات المساعد تنتظر التأكيد، والمستندات الواردة بالبريد تُعتمد في المستندات، ورمز HS في التخليص لا يُعتد به إلا بعد تأكيد المخلّص، وكل حقل يُقرأ من بطاقة العمل يُراجع قبل حفظ جهة الاتصال. والنص داخل المستند يُعامل كبيانات، لا كتعليمات. وكل إجراء ينفّذه المساعد مسجَّل.",
        ],
      },
      {
        title: "6. جهات الاتصال من البريد وبطاقات العمل",
        body: [
          "يتعرّف هذا الجزء من الخدمة على الأشخاص الذين يتعامل معهم العميل لدى كل شريك من شركاء أعماله. وهو متوقف حتى يشغّله مدير النظام لدى العميل، وصفحة إعداداته تبيّن ما يُقرأ قبل تشغيله.",
          "- ترويسات البريد: بعد تشغيله، تُحفظ الأسماء وعناوين البريد في خانات المرسل و«إلى» والنسخة و«الرد إلى» في الرسائل التي سبقت مزامنتها من صناديق بريد العميل المرتبطة، تحت شريك الأعمال الذي يعمل لديه كل شخص، بعنوانه نفسه أو بنطاق الشريك. ولا يُقترح موظفو العميل ولا نطاقاته، ولا عناوين عدم الرد، ولا النشرات والقوائم البريدية. ولا يُحفظ لهذا الغرض إلا بيانات الترويسة (العنوان، والاسم، وهل أرسل الشخص الرسالة أم استلمها، والتاريخ، وصندوق البريد)؛ ولا يُنسخ نص الرسائل ولا يُخزَّن لهذا الغرض. والعنوان لدى خدمة بريد مجانية الذي لا يطابق أي جهة اتصال يُحفظ بلا اسمه.\n- التحول إلى جهة اتصال: لا يصبح الشخص الموجود في البريد جهة اتصال إلا حين يضيفه مستخدم، أو إن اختار مدير النظام الإضافة التلقائية، حين يظهر في عدد محدد من الرسائل لدى شريك معروف.\n- تواقيع البريد: إن سمح مدير النظام، يقرأ الذكاء الاصطناعي مرة واحدة توقيع آخر رسالة من الشخص الجديد، ليملأ منصبه وأرقام هواتفه، بحد أقصى 200 في اليوم لكل شركة. ثم يُترك التوقيع، ولا يُحفظ إلا المنصب وأرقام الهواتف.\n- بطاقات العمل: يستطيع المستخدم تصوير البطاقة (حتى 4 صور لبطاقة واحدة، أو حتى 20 بطاقة دفعة واحدة). وتُصغَّر كل صورة قبل قراءتها، فيُزال منها أيضاً بيانات الموقع، ويقرأ الذكاء الاصطناعي الاسم والمنصب والشركة وبيانات التواصل. ويراجع المستخدم كل حقل ويستطيع تغييره قبل الحفظ. وتُحفظ الصور مع جهة الاتصال في التخزين الخاص بالعميل، ولا تُفتح إلا من صفحة جهة الاتصال لمن سجّل الدخول.",
          "- مدة الاحتفاظ: سجل الشخص الذي لم يُضَف بصفته جهة اتصال يُحذف بعد 24 شهراً، وهي مدة يستطيع مدير النظام لدى العميل ضبطها بين 6 و120 شهراً. وجهات الاتصال المحفوظة تبقى حتى يحذفها العميل.\n- الحذف: حذف جهة الاتصال يحذف أيضاً صور بطاقتها واقتراحاتها من البريد، ولا تُقترح عناوينها مرة أخرى. وحذف شريك الأعمال يحذف الأشخاص الموجودين لديه وصور بطاقات جهات اتصاله. وعند إيقاف الميزة لا يُقرأ شيء بعد ذلك، ويستطيع مدير النظام اختيار حذف كل ما جُمع عن الأشخاص الذين لم يُضافوا جهات اتصال. والعناوين والنطاقات التي اختار المستخدم تجاهلها تُحفظ فقط كي لا تُقترح مرة أخرى.",
          "والعميل هو جهة التحكم في جهات الاتصال هذه، وهو المسؤول عن وجود أساس نظامي للاحتفاظ بها، وعن إبلاغ الأشخاص المعنيين بما يوجبه نظامه. ومن أراد حذف بياناته يستطيع أن يطلب ذلك من العميل، أو أن يكتب إلينا فنحيل طلبه إليه (القسم 11).",
        ],
      },
      {
        title: "7. من يعالج البيانات نيابة عنا",
        body: [
          "نستعين بالمزوّدين التاليين، وفق شروط معالجة البيانات لديهم، وكلٌّ منهم محصور في الغرض المذكور:",
          "- Hostinger: الخادم الافتراضي الخاص (VPS) الذي تعمل عليه الخدمة وقاعدة بياناتها.\n- Cloudflare: تخزين الكائنات R2 للملفات التي ترفعها وللنسخ الاحتياطية، وخدمة DNS.\n- Clerk: تسجيل الدخول وأمان الحسابات.\n- OpenAI: معالجة الذكاء الاصطناعي، كما في القسم 5.\n- Microsoft أو Zoho: فقط إن رُبط صندوق بريد من ذلك المزوّد، وفي حدود الصلاحية الممنوحة.\n- Vercel: استضافة الموقع routel.app وسجلات خادمه.",
          "ولا نفصح عن بيانات شخصية لأي جهة أخرى، إلا حين يوجب النظام ذلك أو لحماية الخدمة ومستخدميها من الضرر.",
        ],
      },
      {
        title: "8. أين تُحفظ بياناتك، ونقلها عبر الحدود",
        body: [
          "تعمل الخدمة وقاعدة بياناتها على خادم افتراضي خاص لدى Hostinger في كوالالمبور، ماليزيا. وتُحفظ الملفات التي ترفعها والنسخ الاحتياطية الليلية في تخزين Cloudflare R2. وتُحفظ بيانات كل عميل في قاعدة بيانات خاصة به وتخزين خاص به، منفصلة عن كل عميل آخر. ويمكن لعميل خطة المؤسسات أن يكون له خادم خاص به، في موقع يُتفق عليه معه.",
          "ولذلك تُنقل البيانات الشخصية للأشخاص في قطر أو السعودية أو إندونيسيا إلى ماليزيا، ويعالج بعض المزوّدين (القسم 7) البيانات في دول أخرى. ولا نجري هذا النقل إلا لتقديم الخدمة، مع ضمانات مناسبة مثل البنود التعاقدية القياسية التي تحمي البيانات بمستوى لا يقل عمّا توجبه الأنظمة والقوانين المنطبقة، وبعد تقييم مخاطر النقل حيث يوجبه القانون، وضمن الشروط التي يضعها كل نظام أو قانون للنقل خارج الدولة، ومنها القانون القطري، ونظام حماية البيانات الشخصية السعودي ولائحة نقل البيانات خارج المملكة، وقانون PDPA الماليزي، وقانون UU PDP الإندونيسي.",
        ],
      },
      {
        title: "9. مدة الاحتفاظ",
        body: [
          "- بيانات الحساب والأعمال: ما دام الحساب قائماً. وحين تنتهي التجربة أو لا تُجدَّد خطة مدفوعة ينتقل الحساب إلى النسخة المجانية ولا يُحذف شيء، وهذا ليس إغلاقاً للحساب. وحين يغلق العميل حسابه، نصدّر بياناته عند الطلب خلال 30 يوماً، ثم نحذفها من الخدمة العاملة خلال 90 يوماً.\n- الرسائل التي تُزامَن من صندوق بريد مرتبط، ومرفقاتها: حتى يحذفها العميل أو يغلق حسابه.\n- جهات الاتصال من البريد وبطاقات العمل: كما في القسم 6.\n- النسخ الاحتياطية: تُنسخ قاعدة البيانات كاملة كل 24 ساعة إلى Cloudflare R2 (وفي بعض الخوادم على مستضيف الخادم أيضاً). وتُحفظ النسخ الاحتياطية ولا تُحذف وفق جدول، فتبقى البيانات المحذوفة من الخدمة في النسخ السابقة حتى تُزال تلك النسخ. وعند طلب موثَّق لحذف بيانات شخصية، نزيلها من النسخ الاحتياطية أو نجعلها غير قابلة للاستخدام، كما توجب الأنظمة والقوانين المنطبقة.\n- سجلات الخادم والأمان: حتى 12 شهراً.\n- طلبات العرض التجريبي والمراسلات: حتى 24 شهراً بعد آخر تواصل.\n- السجلات التي يوجب النظام الاحتفاظ بها، مثل السجلات المحاسبية لأعمالنا: للمدة التي يحددها النظام.",
        ],
      },
      {
        title: "10. كيف نحميها",
        body: [
          "تنتقل البيانات عبر اتصالات مشفّرة (TLS). وبيانات كل عميل معزولة في قاعدة بيانات وتخزين خاصين به. ووصول موظفينا محصور فيما يحتاجه عملهم. ورموز الوصول إلى البريد محفوظة مشفّرة. والنسخ الاحتياطية تُؤخذ كل 24 ساعة. وإن وقع تسرّب لبيانات شخصية، نُبلغ العميل المتأثر دون تأخير لا مبرر له، وفي كل الأحوال خلال 48 ساعة من التأكد من تسرّب يمس بياناته، ونُبلغ الجهة المختصة والمتضررين كما توجب الأنظمة والقوانين المنطبقة، ونساعد العميل على الوفاء بواجب الإبلاغ الذي يقع عليه.",
        ],
      },
      {
        title: "11. حقوقك",
        body: [
          "بحسب النظام أو القانون الذي ينطبق عليك، لك الحق في:",
          "- معرفة كيف نعالج بياناتك الشخصية، وهو ما تبيّنه هذه السياسة؛\n- الوصول إلى بياناتك الشخصية والحصول على نسخة منها بصيغة مقروءة؛\n- طلب تصحيحها أو إكمالها أو تحديثها؛\n- طلب حذفها أو إتلافها حين لا تعود لازمة للغرض الذي جُمعت له، مع مراعاة السجلات التي يوجب النظام الاحتفاظ بها؛\n- سحب الموافقة حين تعتمد معالجتنا عليها، دون أثر على ما تم قبل ذلك؛\n- حيث ينص النظام أو القانون الذي ينطبق عليك على ذلك، الاعتراض على المعالجة أو تقييدها، أو الحصول على بياناتك بصيغة شائعة الاستخدام.",
          `لممارسة أي حق، اكتب إلى ${PRIVACY_EMAIL}، ومن عنوان البريد المسجّل في حسابك إن كان لك حساب. ونرد خلال المدة التي يحددها النظام الذي ينطبق عليك. وإن كانت بياناتك قد أُدخلت من عميل لدينا (مثلاً أنت جهة اتصال لدى أحد شركاء أعماله)، فنحيل طلبك إلى ذلك العميل بصفته جهة التحكم ونساعده في الرد.`,
          "ولك أيضاً الحق في تقديم شكوى إلى الجهة المختصة بحماية البيانات في دولتك، ومنها مثلاً: في قطر، المكتب الوطني لخصوصية البيانات في الوكالة الوطنية للأمن السيبراني؛ وفي السعودية، الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)؛ وفي ماليزيا، مفوّض حماية البيانات الشخصية (JPDP)؛ وفي إندونيسيا، وزارة الاتصالات والشؤون الرقمية (Komdigi)، أو هيئة حماية البيانات الشخصية بموجب قانون UU PDP عند إنشائها.",
          `مسؤول حماية البيانات: ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: "12. ملفات تعريف الارتباط",
        body: [
          "لا يضع الموقع أي ملفات تعريف ارتباط. ويستخدم التطبيق ملفات تسجيل الدخول التي يضعها Clerk لإبقائك مسجّل الدخول.",
        ],
      },
      {
        title: "13. القاصرون",
        body: ["الخدمة للاستخدام التجاري وليست موجّهة لمن هم دون 18 عاماً، ولا نجمع بياناتهم عن علم."],
      },
      {
        title: "14. تعديل هذه السياسة",
        body: [
          "يجوز لنا تحديث هذه السياسة. وحين يكون التغيير جوهرياً نبلغك به في الخدمة أو بالبريد قبل سريانه. والتاريخ في أعلى الصفحة يبيّن النسخة الحالية.",
        ],
      },
      {
        title: "15. التواصل",
        body: [`لأي أمر يخص البيانات الشخصية: ${PRIVACY_EMAIL}. ولأي أمر آخر: ${CONTACT_EMAIL}.`],
      },
    ],
  },
};
