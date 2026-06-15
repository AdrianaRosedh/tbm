import { ImageResponse } from "next/og";

// iOS home-screen tile — branded red TBM, generated statically at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "#e4432e",
          color: "white",
        }}
      >
        <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: -2 }}>
          TBM
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 8, opacity: 0.92 }}>
          CARRIERS
        </div>
      </div>
    ),
    size
  );
}
