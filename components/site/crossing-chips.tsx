"use client";

import { MapPin } from "lucide-react";
import { Reveal } from "./reveal";
import { FOCUS_LOCATION_EVENT } from "./network-events";
import { useContent } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

/** Homepage crossing-pair labels → network-map location ids. */
const US_TO_ID: Record<string, string> = {
  "Otay Mesa, CA": "otay-mesa",
  "Calexico, CA": "calexico",
  "Nogales, AZ": "nogales-az",
  "Del Rio, TX": "del-rio",
  "Eagle Pass, TX": "eagle-pass",
  "Laredo, TX": "laredo",
  "El Paso, TX": "el-paso",
};

/**
 * The border-crossing pairs as interactive chips: tapping one spotlights
 * that gateway on the NetworkMap above (via FOCUS_LOCATION_EVENT).
 */
export function CrossingChips({ className }: { className?: string }) {
  const content = useContent();
  const { crossings } = content.home.network;
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {crossings.map((c, i) => {
        const id = US_TO_ID[c.us];
        return (
          <Reveal as="li" key={`${c.us}-${c.mx}`} delay={i * 0.04} y={12}>
            <button
              type="button"
              aria-label={`${c.us} ↔ ${c.mx} — ${content.ui.showOnMap}`}
              onClick={() =>
                id &&
                window.dispatchEvent(
                  new CustomEvent(FOCUS_LOCATION_EVENT, { detail: { id } })
                )
              }
              className="group flex w-full items-center justify-between gap-4 rounded-xl border border-black/6 bg-white px-6 py-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red/40 hover:shadow-md active:scale-[0.99]"
            >
              <span className="text-base font-semibold">{c.us}</span>
              <span aria-hidden="true" className="shrink-0 text-brand-red">
                ↔
              </span>
              <span className="flex items-center gap-2 text-base text-fg-muted">
                {c.mx}
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </button>
          </Reveal>
        );
      })}
    </ul>
  );
}
