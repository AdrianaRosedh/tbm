import { ImageResponse } from "next/og";

// Branded favicon — the red "TBM" tile from the brand mark / OG image.
// No edge runtime, so it's generated statically at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: -0.5,
        }}
      >
        TBM
      </div>
    ),
    size
  );
}
