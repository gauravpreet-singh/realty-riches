import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Realty Riches Builders and Advisors | Find Your Place",
  description:
    "Discover premium residential properties, apartments, plots and investment opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}