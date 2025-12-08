import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threshold – UK Property Videos in Seconds",
  description: "Rightmove, Zoopla, OnTheMarket → cinematic tour instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}