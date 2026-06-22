import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content/site";

export const runtime = "edge";
export const alt =
  "TBM Carriers — Cross-border logistics across the United States, Mexico, and Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetch a Google Font as a TTF (server-side fetch with no browser UA gets the
 * truetype format), subset to the glyphs we render. Returns null on any
 * failure so the card still renders with a system fallback.
 */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:opentype|truetype)'\)/
    );
    if (!match) return null;
    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * Embed the real wordmark (`/brand/TBM-2.png`) as a data URL so the card shows
 * the actual logo, not a stand-in. Chunked base64 avoids call-stack limits;
 * returns null on failure so we fall back to a text wordmark.
 */
async function loadLogo(): Promise<string | null> {
  try {
    const res = await fetch(new URL("/brand/TBM-2.png", SITE.url));
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    }
    return `data:image/png;base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

const TITLE_A = "DELIVERING QUALITY";
const TITLE_B = "& RELIABILITY";
const EYEBROW = "OPERATING SINCE 1999";
const SUB = "Cross-border logistics across the United States, Mexico, and Canada.";
const FOOT_L = "tbmcarriers.com";
const FOOT_R = "C-TPAT · FAST · OEA · SMARTWAY";

export default async function OpengraphImage() {
  const [bold, semi, reg, logo] = await Promise.all([
    loadFont("Inter:wght@800", `${TITLE_A}${TITLE_B}`),
    loadFont("Inter:wght@600", `${EYEBROW}TBM CARRIERS${FOOT_L}${FOOT_R}`),
    loadFont("Inter:wght@400", SUB),
    loadLogo(),
  ]);

  const fonts = [
    bold && { name: "Inter", data: bold, weight: 800 as const, style: "normal" as const },
    semi && { name: "Inter", data: semi, weight: 600 as const, style: "normal" as const },
    reg && { name: "Inter", data: reg, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600 | 800;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 80px",
          background:
            "linear-gradient(135deg, #1d173b 0%, #0f0b26 55%, #241a4a 100%)",
          color: "white",
          fontFamily: "Inter",
        }}
      >
        {/* Top: the real wordmark (text fallback if the fetch fails) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              width={300}
              height={92}
              alt="TBM Carriers"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6 }}>
              TBM CARRIERS
            </span>
          )}
        </div>

        {/* Middle: hero copy — matches the live site (uppercase, brand red) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#f0563b",
              letterSpacing: 6,
            }}
          >
            {EYEBROW}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -1.6,
              color: "#f0563b",
            }}
          >
            <span>{TITLE_A}</span>
            <span>{TITLE_B}</span>
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            {SUB}
          </span>
        </div>

        {/* Bottom: footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 600,
            opacity: 0.6,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>{FOOT_L}</span>
          <span>{FOOT_R}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
