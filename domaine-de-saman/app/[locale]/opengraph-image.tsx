import { ImageResponse } from "next/og";
import { getContent } from "@/content";

export const runtime = "edge";
export const alt = "Domaine de Saman — a private estate in the Pyrenees";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { site } = getContent(locale);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#2F4A3D",
          backgroundImage: "linear-gradient(135deg, #2F4A3D 0%, #24382E 100%)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C9B98A",
            marginBottom: 28,
          }}
        >
          {site.region}
        </div>
        <div
          style={{
            fontSize: 88,
            fontFamily: "serif",
            color: "#FAF7F0",
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            width: 120,
            height: 3,
            backgroundColor: "#9C7A3C",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: 30,
            color: "#EDE7D9",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
