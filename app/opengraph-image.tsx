import { ImageResponse } from "next/og";

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

const TITLE_A = "DELIVERING QUALITY";
const TITLE_B = "& RELIABILITY";
const EYEBROW = "OPERATING SINCE 1999";
const SUB = "Cross-border logistics across the United States, Mexico, and Canada.";
const FOOT_L = "tbmcarriers.com";
const FOOT_R = "C-TPAT · FAST · OEA · SMARTWAY";

export default async function OpengraphImage() {
  const [orbitron, oswald, fraunces] = await Promise.all([
    loadFont("Orbitron:wght@800", `${TITLE_A}${TITLE_B}TBM`),
    loadFont("Oswald:wght@600", `${EYEBROW}CARRIERS${FOOT_L}${FOOT_R}`),
    loadFont("Fraunces:opsz,wght@144,400", SUB),
  ]);

  const fonts = [
    orbitron && { name: "Orbitron", data: orbitron, weight: 800 as const, style: "normal" as const },
    oswald && { name: "Oswald", data: oswald, weight: 600 as const, style: "normal" as const },
    fraunces && { name: "Fraunces", data: fraunces, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600 | 800; style: "normal" }[];

  const titleFont = orbitron ? "Orbitron" : "serif";
  const labelFont = oswald ? "Oswald" : "sans-serif";
  const subFont = fraunces ? "Fraunces" : "serif";

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
        }}
      >
        {/* Top: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 78,
              height: 78,
              borderRadius: 16,
              background: "#e4432e",
              fontFamily: titleFont,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            TBM
          </div>
          <div
            style={{
              fontFamily: labelFont,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 8,
              opacity: 0.9,
            }}
          >
            CARRIERS
          </div>
        </div>

        {/* Middle: hero copy in the brand fonts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <span
            style={{
              fontFamily: labelFont,
              fontSize: 19,
              fontWeight: 600,
              color: "#ff6a4d",
              letterSpacing: 7,
            }}
          >
            {EYEBROW}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: titleFont,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.04,
              color: "#e4432e",
            }}
          >
            <span>{TITLE_A}</span>
            <span>{TITLE_B}</span>
          </div>
          <span
            style={{
              fontFamily: subFont,
              fontSize: 30,
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
            fontFamily: labelFont,
            fontSize: 18,
            fontWeight: 600,
            opacity: 0.55,
            letterSpacing: 4,
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
