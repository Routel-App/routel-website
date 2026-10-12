"use client";

import { useActionState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { submitDemoRequest, type DemoFormState } from "./actions";

const initial: DemoFormState = { status: "idle" };

const inputCls =
  "h-11 w-full rounded-xl border border-fog-200 bg-white px-3.5 text-[15px] text-ink-900 shadow-[inset_0_1px_2px_rgb(11_20_38/0.03)] placeholder:text-fog-400 transition-[border-color,box-shadow] focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100";

const copy = {
  en: {
    received: "Request received",
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
    sending: "Sending…",
    submit: "Request a demo",
    privacy: "We only use your details to arrange the demo. No newsletter, no drip campaign.",
  },
  ar: {
    received: "تم استلام طلبك",
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
    sending: "جارٍ الإرسال…",
    submit: "اطلب عرضاً تجريبياً",
    privacy: "نستخدم بياناتك فقط لترتيب العرض التجريبي. لا نشرات بريدية ولا رسائل تسويقية متتابعة.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const sizeValues = ["1-5", "6-20", "21-50", "50+"];

function Field({
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

export function DemoForm({ plan }: { plan?: string }) {
  const locale = useLocale();
  const t = copy[locale];
  const [state, action, pending] = useActionState(submitDemoRequest, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <CircleCheck className="mx-auto h-10 w-10 text-teal-600" strokeWidth={1.75} />
        <h2 className="font-display mt-4 text-xl font-bold text-ink-900">{t.received}</h2>
        <p className="mt-2 text-sm text-fog-600">{state.message}</p>
      </div>
    );
  }

  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="space-y-5">
      <input type="hidden" name="plan" value={plan ?? ""} />
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from people, attractive to bots. */}
      <div className="absolute -start-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          {t.honeypot} <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} name="name" error={e.name}>
          <input id="name" name="name" required autoComplete="name" className={cn(inputCls, e.name && "border-red-400")} placeholder={t.namePh} />
        </Field>
        <Field label={t.email} name="email" error={e.email}>
          <input id="email" name="email" type="email" dir="ltr" required autoComplete="email" className={cn(inputCls, e.email && "border-red-400")} placeholder="sara@yourforwarder.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.company} name="company" error={e.company}>
          <input id="company" name="company" required autoComplete="organization" className={cn(inputCls, e.company && "border-red-400")} placeholder={t.companyPh} />
        </Field>
        <Field label={t.country} name="country">
          <input id="country" name="country" autoComplete="country-name" className={inputCls} placeholder={t.countryPh} />
        </Field>
      </div>

      <Field label={t.teamSize} name="teamSize">
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
      </Field>

      <Field label={t.message} name="message" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(inputCls, "h-auto py-3")}
          placeholder={t.messagePh}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? t.sending : t.submit}
        {!pending ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>
      <p className="text-xs text-fog-500">{t.privacy}</p>
    </form>
  );
}
