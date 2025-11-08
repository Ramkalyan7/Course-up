import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "CourseUp - AI-Powered Course Generator",
  description: "Generate complete courses in minutes with AI",
};
const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-slate-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
