"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The demo request. There is no mail service behind the site, so the form
 * doesn't pretend to send anything: it checks the fields, then opens the
 * visitor's own e-mail app with a message to the founder already written
 * from them. The address is shown too, for anyone without a mail app.
 */

type Field = "name" | "email" | "company" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "h-11 w-full rounded-xl border border-fog-200 bg-white px-3.5 text-[15px] text-ink-900 shadow-[inset_0_1px_2px_rgb(11_20_38/0.03)] placeholder:text-fog-400 transition-[border-color,box-shadow] focus:border-spark-500 focus:outline-none focus:ring-4 focus:ring-spark-100";

const copy = {
  en: {
    honeypot: "Website",
    name: "Your name",
    namePh: "Sara Ahmad",
    email: "Work email",
    company: "Company",
    companyPh: "Your forwarding company",
    country: "Country",
    countryPh: "Malaysia",
    teamSize: "Team size",
    teamSizePh: "How many people will use Routel?",
    sizes: ["1 to 5", "6 to 20", "21 to 50", "More than 50"],
    message: "What would you like to see?",
    messagePh: "Tell us about your routes, volumes, or the part of your process that hurts the most.",
    submit: "Write the e-mail",
    how: "This opens your e-mail app with the message ready to send to {email}. Nothing is sent until you press send there.",
    opened: "Your e-mail app should now show the message",
    openedBody: "Check it and press send. If nothing opened, write to us directly at {email}.",
    again: "Open it again",
    edit: "Change the details",
    privacy: "We only use your details to arrange the demo. No newsletter, no drip campaign.",
    errName: "Please tell us your name.",
    errEmail: "Enter a valid work email.",
    errCompany: "Please tell us your company.",
    errMessage: "Keep the message under 2000 characters.",
    fix: "A few fields need attention.",
    subject: "Demo request: {company}",
    bodyIntro: "Hello Musheer,\n\nI'd like a demo of Routel.",
    bodyName: "Name",
    bodyEmail: "Work email",
    bodyCompany: "Company",
    bodyCountry: "Country",
    bodyTeam: "Team size",
    bodyPlan: "Interested in",
    bodyMessage: "What I'd like to see",
  },
  ar: {
    honeypot: "الموقع الإلكتروني",
    name: "اسمك",
    namePh: "سارة أحمد",
    email: "بريد العمل الإلكتروني",
    company: "الشركة",
    companyPh: "اسم شركة الشحن الخاصة بك",
    country: "الدولة",
    countryPh: "ماليزيا",
    teamSize: "حجم الفريق",
    teamSizePh: "كم شخصاً سيستخدم Routel؟",
    sizes: ["من 1 إلى 5", "من 6 إلى 20", "من 21 إلى 50", "أكثر من 50"],
    message: "ما الذي تود أن تراه؟",
    messagePh: "أخبرنا عن خطوط الشحن لديك، أو أحجام شحناتك، أو الجزء الأكثر إرهاقاً في عملياتك.",
    submit: "اكتب الرسالة",
    how: "يفتح هذا تطبيق البريد لديك ورسالتك جاهزة للإرسال إلى {email}. لا يُرسل شيء حتى تضغط «إرسال» هناك.",
    opened: "يُفترض أن تظهر الرسالة الآن في تطبيق البريد",
    openedBody: "راجعها واضغط «إرسال». وإن لم يُفتح شيء، راسلنا مباشرة على {email}.",
    again: "افتحها مرة أخرى",
    edit: "عدّل البيانات",
    privacy: "نستخدم بياناتك فقط لترتيب العرض التجريبي. لا نشرات بريدية ولا رسائل تسويقية متتابعة.",
    errName: "يرجى إخبارنا باسمك.",
    errEmail: "أدخل بريداً إلكترونياً صالحاً للعمل.",
    errCompany: "يرجى إخبارنا باسم شركتك.",
    errMessage: "يجب ألا تتجاوز الرسالة 2000 حرف.",
    fix: "بعض الحقول تحتاج إلى مراجعة.",
    subject: "طلب عرض تجريبي: {company}",
    bodyIntro: "مرحباً مشير،\n\nأود مشاهدة عرض تجريبي لـ Routel.",
    bodyName: "الاسم",
    bodyEmail: "بريد العمل",
    bodyCompany: "الشركة",
    bodyCountry: "الدولة",
    bodyTeam: "حجم الفريق",
    bodyPlan: "الباقة التي تهمني",
    bodyMessage: "ما أود رؤيته",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const sizeValues = ["1-5", "6-20", "21-50", "50+"];

function FieldBox({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fill = (s: string, values: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

export function DemoForm({ plan }: { plan?: string }) {
  const locale = useLocale();
  const t = copy[locale];
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [mailto, setMailto] = useState<string | null>(null);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (get("website")) return; // bots fill the hidden field
    const f = { name: get("name"), email: get("email"), company: get("company"), country: get("country"), teamSize: get("teamSize"), message: get("message") };
    const next: Partial<Record<Field, string>> = {};
    if (f.name.length < 2) next.name = t.errName;
    if (!EMAIL_RE.test(f.email)) next.email = t.errEmail;
    if (f.company.length < 2) next.company = t.errCompany;
    if (f.message.length > 2000) next.message = t.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    const size = sizeValues.indexOf(f.teamSize);
    const lines = [
      t.bodyIntro,
      "",
      `${t.bodyName}: ${f.name}`,
      `${t.bodyEmail}: ${f.email}`,
      `${t.bodyCompany}: ${f.company}`,
      f.country ? `${t.bodyCountry}: ${f.country}` : "",
      size >= 0 ? `${t.bodyTeam}: ${t.sizes[size]}` : "",
      plan ? `${t.bodyPlan}: ${plan}` : "",
      f.message ? `\n${t.bodyMessage}:\n${f.message}` : "",
    ].filter((l, i) => i < 2 || l !== "");
    const url = `mailto:${site.email}?subject=${encodeURIComponent(fill(t.subject, { company: f.company }))}&body=${encodeURIComponent(lines.join("\n"))}`;
    setMailto(url);
    window.location.href = url;
  };

  const emailLink = (
    <a href={`mailto:${site.email}`} dir="ltr" className="font-semibold text-spark-700 hover:text-spark-800">
      {site.email}
    </a>
  );
  const withEmail = (s: string) => {
    const [before, after] = s.split("{email}");
    return (
      <>
        {before}
        {emailLink}
        {after}
      </>
    );
  };

  if (mailto) {
    return (
      <div className="rounded-2xl border border-spark-200 bg-spark-50 p-8 text-center">
        <Mail className="mx-auto h-10 w-10 text-spark-600" strokeWidth={1.75} />
        <h2 className="font-display mt-4 text-xl font-bold text-ink-900">{t.opened}</h2>
        <p className="mt-2 text-sm text-fog-600">{withEmail(t.openedBody)}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={mailto} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-medium text-white hover:bg-ink-800">
            {t.again}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
          <Button type="button" variant="secondary" size="md" onClick={() => setMailto(null)}>
            {t.edit}
          </Button>
        </div>
      </div>
    );
  }

  const e = errors;
  const hasErrors = Object.keys(e).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, attractive to bots. */}
      <div className="absolute -start-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          {t.honeypot} <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldBox label={t.name} name="name" error={e.name}>
          <input id="name" name="name" required autoComplete="name" className={cn(inputCls, e.name && "border-red-400")} placeholder={t.namePh} />
        </FieldBox>
        <FieldBox label={t.email} name="email" error={e.email}>
          <input id="email" name="email" type="email" dir="ltr" required autoComplete="email" className={cn(inputCls, e.email && "border-red-400")} placeholder="sara@yourforwarder.com" />
        </FieldBox>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldBox label={t.company} name="company" error={e.company}>
          <input id="company" name="company" required autoComplete="organization" className={cn(inputCls, e.company && "border-red-400")} placeholder={t.companyPh} />
        </FieldBox>
        <FieldBox label={t.country} name="country">
          <input id="country" name="country" autoComplete="country-name" className={inputCls} placeholder={t.countryPh} />
        </FieldBox>
      </div>

      <FieldBox label={t.teamSize} name="teamSize">
        <select id="teamSize" name="teamSize" className={cn(inputCls, "appearance-none")} defaultValue="">
          <option value="" disabled>
            {t.teamSizePh}
          </option>
          {sizeValues.map((v, i) => (
            <option key={v} value={v}>
              {t.sizes[i]}
            </option>
          ))}
        </select>
      </FieldBox>

      <FieldBox label={t.message} name="message" error={e.message}>
        <textarea id="message" name="message" rows={4} className={cn(inputCls, "h-auto py-3")} placeholder={t.messagePh} />
      </FieldBox>

      {hasErrors ? (
        <p role="alert" className="text-sm text-red-600">
          {t.fix}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Mail className="h-4 w-4" />
        {t.submit}
      </Button>
      <p className="text-xs leading-relaxed text-fog-500">{withEmail(t.how)}</p>
      <p className="text-xs text-fog-500">{t.privacy}</p>
    </form>
  );
}
