import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

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
      <body className="bg-slate-950 text-gray-100">
        {/* <Navbar/> */}
        <div className="flex">
          {/* <Sidebar /> */}
          <main className={`${geist.className}  flex-1 min-h-screen`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
