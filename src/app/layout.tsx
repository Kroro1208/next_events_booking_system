import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import UILibraryProvider from "../providers/UILibraryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "../providers/LayoutProvider";

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
    <ClerkProvider>
      <html lang="ja">
        <body className={`bg-gray-200 ${noto_sans.className} h-screen`}>
          <UILibraryProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </UILibraryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
