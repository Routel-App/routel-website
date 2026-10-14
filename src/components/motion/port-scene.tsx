"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, playWhileVisible } from "./gsap";
import { cn } from "@/lib/utils";

/**
 * A container terminal at work: the gantry crane lifts boxes off the quay
 * onto the ship, the ship sails, the next one comes in. Pure SVG + GSAP.
 *
 * The markup is the still frame (ship at the quay, fully loaded), which is
 * what visitors without JavaScript or with prefers-reduced-motion see. The
 * GSAP loop resets the scene and plays it, paused while off screen.
 * `onStatus` receives the booking status at each stage (for an HTML pill).
 */

const W = 1200;
const H = 440;
const DECK = 300;
const BOX_W = 56;
const BOX_H = 26;
const BOOM_Y = 110;
const TROLLEY_H = 14;

const palette = ["#47bcac", "#f7941d", "#e9eef4", "#2a3f66", "#1fa192", "#fab660", "#c3cdd9", "#158377"];

/** The ship's fixed load: columns × rows, colour picked by position. */
const cols = Array.from({ length: 9 }, (_, i) => 340 + i * 60);
const rows = [DECK - BOX_H, DECK - 2 * BOX_H, DECK - 3 * BOX_H];
/** The three boxes the crane loads: top row, columns 3-5. */
const slots = [3, 4, 5].map((c) => ({ x: cols[c], y: DECK - 4 * BOX_H }));
/** Where they wait on the quay (second tier). */
const quay = [40, 100, 160].map((x) => ({ x, y: DECK - 2 * BOX_H }));
const loadColors = ["#f7941d", "#47bcac", "#e9eef4"];

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
      const carried = q<SVGRectElement>("[data-carried]");
      const ship = q<SVGGElement>("[data-ship]");
      const quayBoxes = Array.from(svg.querySelectorAll<SVGRectElement>("[data-quay]"));
      const slotBoxes = Array.from(svg.querySelectorAll<SVGRectElement>("[data-slot]"));
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
          carried.setAttribute("x", String(s.x - BOX_W / 2));
          carried.setAttribute("y", String(top + s.drop + 6));
          carried.style.opacity = s.carry >= 0 ? "1" : "0";
          if (s.carry >= 0) carried.setAttribute("fill", loadColors[s.carry]);
          ship.setAttribute("transform", `translate(${s.shipX} ${s.bob})`);
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
          tl.to(s, { x: quay[k].x + BOX_W / 2, duration: 1.1 })
            .to(s, { drop: pickDrop, duration: 0.7 })
            .call(() => {
              quayBoxes[k].style.opacity = "0";
              s.carry = k;
            })
            .to(s, { drop: 24, duration: 0.7 })
            .to(s, { x: slot.x + BOX_W / 2, duration: 1.2 })
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
          <stop offset="0" stopColor="#0b1426" />
          <stop offset="1" stopColor="#12203a" />
        </linearGradient>
        <linearGradient id="port-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#13544f" />
          <stop offset="1" stopColor="#060b16" />
        </linearGradient>
        <radialGradient id="port-glow" cx="0.75" cy="0.2" r="0.6">
          <stop offset="0" stopColor="rgb(71 188 172 / 0.25)" />
          <stop offset="1" stopColor="rgb(71 188 172 / 0)" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#port-sky)" />
      <rect width={W} height={H} fill="url(#port-glow)" />

      {/* Distant terminal */}
      <g opacity="0.18" stroke="#97a5b8" strokeWidth="2" fill="none">
        {[980, 1060, 1140].map((x) => (
          <path key={x} d={`M${x} 330 V170 M${x + 24} 330 V170 M${x - 30} 170 H${x + 70} M${x - 30} 170 L${x} 140 L${x + 24} 140 L${x + 70} 170`} />
        ))}
      </g>

      {/* Ship */}
      <g data-ship="">
        <path d={`M300 ${DECK} H985 L955 352 H330 Z`} fill="#1c2d4d" />
        <path d={`M306 ${DECK + 10} H980`} stroke="#f7941d" strokeWidth="3" />
        <rect x="882" y={DECK - 70} width="66" height="70" rx="3" fill="#e9eef4" />
        <rect x="890" y={DECK - 60} width="50" height="8" rx="2" fill="#2a3f66" />
        <rect x="906" y={DECK - 94} width="22" height="24" rx="2" fill="#2a3f66" />
        <rect x="906" y={DECK - 88} width="22" height="5" fill="#f7941d" />
        {rows.map((y, r) =>
          cols.map((x, c) => (
            <rect key={`${r}-${c}`} x={x} y={y} width={BOX_W} height={BOX_H - 2} rx="2" fill={palette[(r * 3 + c * 5) % palette.length]} opacity={0.92} />
          )),
        )}
        {slots.map((s, k) => (
          <rect key={k} data-slot="" x={s.x} y={s.y} width={BOX_W} height={BOX_H - 2} rx="2" fill={loadColors[k]} />
        ))}
        {/* Container ribs */}
        <g stroke="rgb(6 11 22 / 0.25)" strokeWidth="1">
          {[...rows, ...slots.map((s) => s.y)].flatMap((y) =>
            cols.map((x) => <path key={`${x}-${y}`} d={`M${x + 14} ${y + 3} V${y + BOX_H - 5} M${x + 28} ${y + 3} V${y + BOX_H - 5} M${x + 42} ${y + 3} V${y + BOX_H - 5}`} />),
          )}
        </g>
      </g>

      {/* Quay with its stack */}
      <rect x="0" y={DECK} width="300" height={H - DECK} fill="#0b1426" />
      <rect x="0" y={DECK} width="300" height="6" fill="#2a3f66" />
      {[40, 100, 160].map((x, i) => (
        <rect key={x} x={x} y={DECK - BOX_H} width={BOX_W} height={BOX_H - 2} rx="2" fill={palette[(i * 3 + 2) % palette.length]} opacity="0.85" />
      ))}
      {quay.map((p, k) => (
        <rect key={k} data-quay="" x={p.x} y={p.y} width={BOX_W} height={BOX_H - 2} rx="2" fill={loadColors[k]} style={{ opacity: 0 }} />
      ))}

      {/* Gantry crane */}
      <g stroke="#f7941d" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d={`M240 ${DECK} V${BOOM_Y - 30} M282 ${DECK} V${BOOM_Y - 30} M240 ${BOOM_Y + 70} L282 ${BOOM_Y + 20} M240 ${BOOM_Y + 20} L282 ${BOOM_Y + 70}`} />
        <path d={`M130 ${BOOM_Y} H800`} strokeWidth="7" />
        <path d={`M240 ${BOOM_Y - 30} L800 ${BOOM_Y} M282 ${BOOM_Y - 30} L130 ${BOOM_Y}`} strokeWidth="2" opacity="0.7" />
      </g>
      <rect data-trolley="" x="700" y={BOOM_Y} width="40" height={TROLLEY_H} rx="2" fill="#fdd59e" />
      <line data-cable="" x1="720" x2="720" y1={BOOM_Y + TROLLEY_H} y2={BOOM_Y + TROLLEY_H + 24} stroke="#c3cdd9" strokeWidth="2" />
      <rect data-spreader="" x="688" y={BOOM_Y + TROLLEY_H + 24} width="64" height="6" rx="1" fill="#fdd59e" />
      <rect data-carried="" x="692" y={BOOM_Y + TROLLEY_H + 30} width={BOX_W} height={BOX_H - 2} rx="2" fill={loadColors[0]} style={{ opacity: 0 }} />

      {/* Sea, drawn over the hull's lower edge */}
      <rect x="0" y="332" width={W} height={H - 332} fill="url(#port-sea)" opacity="0.94" />
      <g fill="none" stroke="rgb(124 214 199 / 0.28)" strokeWidth="2" strokeLinecap="round">
        {[348, 372, 398].map((y, i) => (
          <path
            key={y}
            data-wave=""
            opacity={1 - i * 0.25}
            d={`M-120 ${y} ${Array.from({ length: 12 }, () => `q30 -${6 - i} 60 0 t60 0`).join(" ")}`}
          />
        ))}
      </g>
    </svg>
  );
}
