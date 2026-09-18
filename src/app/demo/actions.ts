"use server";

export type DemoFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "company" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Bots fill the hidden field; humans never see it.
  if (honeypot) return { status: "success" };

  const errors: DemoFormState["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid work email.";
  if (company.length < 2) errors.company = "Please tell us your company.";
  if (message.length > 2000) errors.message = "Keep the message under 2000 characters.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few fields need attention.", errors };
  }

  console.info("[demo-request]", JSON.stringify({ name, email, company, country, teamSize, plan, message, at: new Date().toISOString() }));

  return {
    status: "success",
    message: "Thanks. We'll reply within one business day to set up a time.",
  };
}
