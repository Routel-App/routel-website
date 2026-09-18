import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-fog-500">404</p>
      <h1 className="font-display mt-3 text-3xl font-bold text-ink-900">That page has sailed.</h1>
      <p className="mt-3 max-w-md text-fog-600">The link may be out of date, or the page hasn&rsquo;t been written yet.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/docs" variant="secondary">
          Open the docs
        </Button>
      </div>
    </Container>
  );
}
