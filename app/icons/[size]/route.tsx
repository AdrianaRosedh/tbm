import { ImageResponse } from "next/og";

/**
 * PWA install icons (192 / 512) — the red "TBM" tile rendered at the sizes
 * Chrome needs for add-to-home-screen + splash. Full-bleed red keeps it
 * maskable-safe (the TBM mark stays inside the central safe zone).
 */
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size } = await params;
  const s = Math.min(1024, Math.max(48, Number.parseInt(size, 10) || 512));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e4432e",
          color: "white",
          fontWeight: 800,
          fontSize: s * 0.32,
          letterSpacing: -s * 0.012,
        }}
      >
        TBM
      </div>
    ),
    { width: s, height: s }
  );
}
