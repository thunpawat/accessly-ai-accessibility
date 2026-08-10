import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accessly — AI Accessibility Marketing Assistant",
  description: "Analyze and improve marketing content for clearer, more inclusive communication.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
