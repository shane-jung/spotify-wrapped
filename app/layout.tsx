import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  style: "normal",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Spotify Listening History",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
