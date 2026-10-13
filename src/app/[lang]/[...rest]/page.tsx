import { notFound } from "next/navigation";

// The [lang] layout pins its own params; this segment must accept any path so it can 404 inside the layout.
export const dynamicParams = true;

/** Unknown URLs under a locale render that locale's not-found page inside the site layout. */
export default function CatchAll() {
  notFound();
}
