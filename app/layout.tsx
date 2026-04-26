import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auntie AI · Before You Click",
  description:
    "A senior-friendly AI co-pilot that catches scams before money is lost. Built for the Global AI Hackathon Singapore 2026.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Senior-friendly: prevent accidental zoom misery
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
