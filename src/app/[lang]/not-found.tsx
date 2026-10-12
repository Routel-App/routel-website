import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

const copy = {
  en: {
    title: "That page has sailed.",
    text: "The link may be out of date, or the page hasn’t been written yet.",
    home: "Back to home",
    docs: "Open the docs",
  },
  ar: {
    title: "يبدو أن هذه الصفحة قد أبحرت.",
    text: "ربما يكون الرابط قديماً، أو أن الصفحة لم تُكتب بعد.",
    home: "العودة إلى الرئيسية",
    docs: "افتح التوثيق",
  },
} satisfies Record<Locale, { title: string; text: string; home: string; docs: string }>;

export default async function NotFound() {
  const t = copy[await getLocale()];
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-fog-500">404</p>
      <h1 className="font-display mt-3 text-3xl font-bold text-ink-900">{t.title}</h1>
      <p className="mt-3 max-w-md text-fog-600">{t.text}</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">{t.home}</Button>
        <Button href="/docs" variant="secondary">
          {t.docs}
        </Button>
      </div>
    </Container>
  );
}
