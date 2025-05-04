import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Smallz Plates",
    short_name: "Smallz",
    description: "Experience culinary artistry and handcrafted cocktails in an unforgettable atmosphere.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  });
} 