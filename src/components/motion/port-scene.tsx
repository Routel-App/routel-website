"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, playWhileVisible } from "./gsap";
import { cn } from "@/lib/utils";
import { BOX, ContainerBox, Crane, ShipSide, boxColor, ink, paint, wavePath } from "./sprites";

/**
 * A container terminal at work, as a loop: the crane lifts three boxes off
 * the quay onto the ship (the booking's orange one first), the ship sails,
 * the next one comes in. Drawn with the shared sprites, so it matches the
 * scroll story and the Lottie files.
 *
 * The markup is the still frame (ship at the quay, fully loaded), which is
 * what visitors without JavaScript or with prefers-reduced-motion see.
 * `onStage` receives the booking status at each stage (for an HTML pill).
 */

const W = 1200;
const H = 440;
const QUAY_Y = 300;
const BOOM_Y = 110;
const TROLLEY_H = 14;
const SHIP_X = 300;
/** The three boxes the crane loads: top row, columns 3-5 of the ship. */
const slots = [3, 4, 5].map((col) => ({ x: SHIP_X + 40 + col * 60, y: QUAY_Y - 4 * BOX.h }));
/** Where they wait on the quay (second tier). */
const quay = [40, 100, 160].map((x) => ({ x, y: QUAY_Y - 2 * BOX.h }));
const loadColors = [paint.hero, paint.teal, paint.fogLight];

export type PortStage = "confirmed" | "gateIn" | "loaded" | "departed";

export function PortScene({ className, onStage, label }: { className?: string; onStage?: (s: PortStage) => void; label: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) return;
      const q = <T extends Element>(sel: string) => svg.querySelector(sel) as T;
      const trolley = q<SVGRectElement>("[data-trolley]");
      const cable = q<SVGLineElement>("[data-cable]");
      const spreader = q<SVGRectElement>("[data-spreader]");
      const carried = q<SVGGElement>("[data-carried]");
      const ship = q<SVGGElement>("[data-ship]");
      const quayBoxes = Array.from(svg.querySelectorAll<SVGGElement>("[data-quay]"));
      const slotBoxes = Array.from(svg.querySelectorAll<SVGGElement>("[data-slot]"));
      const waves = Array.from(svg.querySelectorAll<SVGPathElement>("[data-wave]"));

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const s = { x: 720, drop: 24, shipX: 0, bob: 0, carry: -1 };
        const draw = () => {
          const top = BOOM_Y + TROLLEY_H;
          trolley.setAttribute("x", String(s.x - 20));
          cable.setAttribute("x1", String(s.x));
          cable.setAttribute("x2", String(s.x));
          cable.setAttribute("y2", String(top + s.drop));
          spreader.setAttribute("x", String(s.x - 32));
          spreader.setAttribute("y", String(top + s.drop));
          carried.setAttribute("transform", `translate(${s.x - BOX.w / 2} ${top + s.drop + 6})`);
          carried.style.opacity = s.carry >= 0 ? "1" : "0";
          carried.querySelectorAll<SVGGElement>("[data-variant]").forEach((v, i) => (v.style.display = i === s.carry ? "" : "none"));
          ship.setAttribute("transform", `translate(${SHIP_X + s.shipX} ${QUAY_Y + s.bob})`);
        };
        const reset = () => {
          quayBoxes.forEach((b) => (b.style.opacity = "1"));
          slotBoxes.forEach((b) => (b.style.opacity = "0"));
          s.carry = -1;
          onStage?.("confirmed");
          draw();
        };
        reset();

        const tl = gsap.timeline({ repeat: -1, onUpdate: draw, defaults: { ease: "power2.inOut" } });
        tl.call(() => onStage?.("gateIn"), [], 0.4);
        slots.forEach((slot, k) => {
          const pickDrop = quay[k].y - (BOOM_Y + TROLLEY_H) - 6;
          const placeDrop = slot.y - (BOOM_Y + TROLLEY_H) - 6;
          tl.to(s, { x: quay[k].x + BOX.w / 2, duration: 1.1 })
            .to(s, { drop: pickDrop, duration: 0.7 })
            .call(() => {
              quayBoxes[k].style.opacity = "0";
              s.carry = k;
            })
            .to(s, { drop: 24, duration: 0.7 })
            .to(s, { x: slot.x + BOX.w / 2, duration: 1.2 })
            .to(s, { drop: placeDrop, duration: 0.7 })
            .call(() => {
              slotBoxes[k].style.opacity = "1";
              s.carry = -1;
            })
            .to(s, { drop: 24, duration: 0.5 });
        });
        tl.call(() => onStage?.("loaded"))
          .to(s, { x: 720, duration: 0.8 })
          .call(() => onStage?.("departed"))
          .to(s, { shipX: W, duration: 4, ease: "power1.in" })
          .call(reset)
          .set(s, { shipX: -W })
          .to(s, { shipX: 0, duration: 3.2, ease: "power2.out" })
          .to({}, { duration: 0.6 });

        const bob = gsap.to(s, { bob: 3, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", onUpdate: draw });
        const sea = gsap.to(waves, { x: -120, duration: 6, repeat: -1, ease: "none" });
        const visibility = [tl, bob, sea].map((t) => playWhileVisible(t as gsap.core.Timeline, svg));
        return () => visibility.forEach((v) => v.kill());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} ${H}`} className={cn("block w-full", className)} role="img" aria-label={label}>
      <defs>
        <linearGradient id="port-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={ink.deep} />
          <stop offset="1" stopColor={ink.hull} />
        </linearGradient>
        <linearGradient id="port-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={paint.sea} />
          <stop offset="1" stopColor={ink.bg} />
        </linearGradient>
        <radialGradient id="port-glow" cx="0.75" cy="0.2" r="0.6">
          <stop offset="0" stopColor="rgb(71 188 172 / 0.25)" />
          <stop offset="1" stopColor="rgb(71 188 172 / 0)" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#port-sky)" />
      <rect width={W} height={H} fill="url(#port-glow)" />

      {/* Distant terminal */}
      <g opacity="0.18" stroke={paint.fog} strokeWidth="2" fill="none">
        {[980, 1060, 1140].map((x) => (
          <path key={x} d={`M${x} 330 V170 M${x + 24} 330 V170 M${x - 30} 170 H${x + 70} M${x - 30} 170 L${x} 140 L${x + 24} 140 L${x + 70} 170`} />
        ))}
      </g>

      {/* Ship, with the three slots the crane fills */}
      <g data-ship="" transform={`translate(${SHIP_X} ${QUAY_Y})`}>
        <ShipSide x={0} y={0} length={690} slots={Array.from({ length: 9 }, (_, col) => [0, 1, 2].map((row) => ({ col, row }))).flat()} />
        {slots.map((sl, k) => (
          <g key={k} data-slot="">
            <ContainerBox x={sl.x - SHIP_X} y={sl.y - QUAY_Y} color={loadColors[k]} hero={k === 0} />
          </g>
        ))}
      </g>

      {/* Quay with its stack */}
      <rect x="0" y={QUAY_Y} width="300" height={H - QUAY_Y} fill={ink.deep} />
      <rect x="0" y={QUAY_Y} width="300" height="6" fill={ink.line} />
      {[40, 100, 160].map((x, i) => (
        <ContainerBox key={x} x={x} y={QUAY_Y - BOX.h} color={boxColor(i + 2)} opacity={0.85} />
      ))}
      {quay.map((p, k) => (
        <g key={k} data-quay="" style={{ opacity: 0 }}>
          <ContainerBox x={p.x} y={p.y} color={loadColors[k]} hero={k === 0} />
        </g>
      ))}

      {/* Gantry crane */}
      <Crane x={240} y={QUAY_Y} height={QUAY_Y - BOOM_Y} reach={560} back={110} />
      <rect data-trolley="" x="700" y={BOOM_Y} width="40" height={TROLLEY_H} rx="2" fill={paint.amber} />
      <line data-cable="" x1="720" x2="720" y1={BOOM_Y + TROLLEY_H} y2={BOOM_Y + TROLLEY_H + 24} stroke={paint.fog} strokeWidth="2" />
      <rect data-spreader="" x="688" y={BOOM_Y + TROLLEY_H + 24} width="64" height="6" rx="1" fill={paint.amber} />
      <g data-carried="" style={{ opacity: 0 }}>
        {loadColors.map((c, k) => (
          <g key={k} data-variant="" style={{ display: k === 0 ? "" : "none" }}>
            <ContainerBox x={0} y={0} color={c} hero={k === 0} />
          </g>
        ))}
      </g>

      {/* Sea, drawn over the hull's lower edge */}
      <rect x="0" y="332" width={W} height={H - 332} fill="url(#port-sea)" opacity="0.94" />
      <g fill="none" stroke="rgb(124 214 199 / 0.28)" strokeWidth="2" strokeLinecap="round">
        {[348, 372, 398].map((y, i) => (
          <path key={y} data-wave="" opacity={1 - i * 0.25} d={wavePath(-120, y, 24, 60, 6 - i)} />
        ))}
      </g>
    </svg>
  );
}
