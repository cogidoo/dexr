import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dexr",
  description: "Pokemon card inventory scanning prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
