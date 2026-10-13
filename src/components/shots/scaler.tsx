import type { ReactNode } from "react";

/**
 * Renders a 1000px-wide shot and scales it down per breakpoint so it fits a
 * phone or tablet column. Pass `zoom` classes to fit a narrower column. CSS zoom (not transform) so the layout box shrinks
 * with it and text stays crisp.
 */
export function ShotScaler({ children, zoom }: { children: ReactNode; zoom?: string }) {
  return (
    <div className="flex justify-center overflow-hidden">
      <div
        className={
          "w-[1000px] shrink-0 " +
          (zoom ?? "[zoom:0.34] min-[420px]:[zoom:0.38] sm:[zoom:0.58] md:[zoom:0.72] lg:[zoom:0.94] xl:[zoom:1]")
        }
      >
        {children}
      </div>
    </div>
  );
}
