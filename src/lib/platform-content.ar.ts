import type { PlatformContent } from "./platform-content";
import { platformContentArPart1 } from "./platform-content-ar/part1";
import { platformContentArPart2 } from "./platform-content-ar/part2";
import { platformContentModes } from "./platform-content-modes";

/** Arabic copy for src/lib/platform-content.ts, keyed by module slug. Same shape as the English entries. */
export const platformContentAr: Record<string, PlatformContent> = {
  ...platformContentArPart1,
  ...platformContentArPart2,
  ...platformContentModes.ar,
};
