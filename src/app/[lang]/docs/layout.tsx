import { Container } from "@/components/ui/container";
import { DocsSidebar } from "@/components/docs/sidebar";
import { docsNav } from "@/lib/docs";
import { getLocale } from "@/lib/locale-server";

export default async function DocsLayout({ children }: LayoutProps<"/[lang]/docs">) {
  const nav = docsNav(await getLocale());
  return (
    <Container className="grid grid-cols-[minmax(0,1fr)] gap-6 pb-10 pt-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:py-14">
      <DocsSidebar nav={nav} />
      <div className="min-w-0 max-w-3xl xl:max-w-none">{children}</div>
    </Container>
  );
}
