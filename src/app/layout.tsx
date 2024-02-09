import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import UILibraryProvider from "../providers/UILibraryProvider";

const noto_sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Events Booking System",
  description: "Organize your own event!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noto_sans.className}>
        <UILibraryProvider>
          {children}
        </UILibraryProvider>
      </body>
    </html>
  );
}
