import { Container } from "@/components/ui/container";
import { DocsSidebar } from "@/components/docs/sidebar";
import { docsNav } from "@/lib/docs";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const nav = docsNav();
  return (
    <Container className="grid gap-8 py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:py-14">
      <DocsSidebar nav={nav} />
      <div className="min-w-0 max-w-3xl">{children}</div>
    </Container>
  );
}
