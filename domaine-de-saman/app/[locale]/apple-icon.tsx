import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          backgroundColor: "#2F4A3D",
        }}
      >
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path d="M2 26 Q16 21 30 26" stroke="#FAF7F0" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M10.5 17 L16 6.5 L21.5 17 Z" fill="#FAF7F0" />
          <line x1="8" y1="17.5" x2="8" y2="23" stroke="#FAF7F0" strokeWidth="1" strokeLinecap="round" />
          <line x1="24" y1="17.5" x2="24" y2="23" stroke="#FAF7F0" strokeWidth="1" strokeLinecap="round" />
          <circle cx="8" cy="14" r="6.3" fill="#7FB989" />
          <circle cx="5" cy="18" r="3.8" fill="#7FB989" />
          <circle cx="24" cy="14" r="6.3" fill="#7FB989" />
          <circle cx="27" cy="18" r="3.8" fill="#7FB989" />
          <circle cx="16" cy="12.5" r="1.9" fill="#E8C878" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
