import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../globals.css";
import { site, siteCopy } from "@/lib/site";
import { dirFor, locales } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  const title = `${site.name} — ${copy.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: copy.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: copy.description,
      url: locale === "en" ? site.url : `${site.url}/${locale}`,
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description: copy.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#121316",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={dirFor(locale)} className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Before first paint: lets CSS hold scroll reveals back only when JS will run them (components/motion/reveal.tsx). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
