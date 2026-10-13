"use server";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export type DemoFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "company" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  en: {
    name: "Please tell us your name.",
    email: "Enter a valid work email.",
    company: "Please tell us your company.",
    message: "Keep the message under 2000 characters.",
    fix: "A few fields need attention.",
    success: "Thanks. We'll reply within one business day to set up a time.",
  },
  ar: {
    name: "يرجى إخبارنا باسمك.",
    email: "أدخل بريداً إلكترونياً صالحاً للعمل.",
    company: "يرجى إخبارنا باسم شركتك.",
    message: "يجب ألا تتجاوز الرسالة 2000 حرف.",
    fix: "بعض الحقول تحتاج إلى مراجعة.",
    success: "شكراً لك. سنرد عليك خلال يوم عمل واحد لتحديد موعد.",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Handles the demo-request form.
 *
 * TODO(launch): deliver the request somewhere durable. Options, in order of
 * least setup: an email via Resend/Postmark, a row in a Google Sheet, or a
 * CRM webhook. Until then the request is logged on the server so nothing is
 * silently dropped during development.
 */
export async function submitDemoRequest(_prev: DemoFormState, formData: FormData): Promise<DemoFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const teamSize = String(formData.get("teamSize") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");
  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = messages[locale];

  // Bots fill the hidden field; humans never see it.
  if (honeypot) return { status: "success" };

  const errors: DemoFormState["errors"] = {};
  if (name.length < 2) errors.name = t.name;
  if (!EMAIL_RE.test(email)) errors.email = t.email;
  if (company.length < 2) errors.company = t.company;
  if (message.length > 2000) errors.message = t.message;
  if (Object.keys(errors).length) {
    return { status: "error", message: t.fix, errors };
  }

  console.info(
    "[demo-request]",
    JSON.stringify({ name, email, company, country, teamSize, plan, message, locale, at: new Date().toISOString() }),
  );

  return {
    status: "success",
    message: t.success,
  };
}
