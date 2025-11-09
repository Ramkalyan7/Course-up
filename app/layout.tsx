import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navigation/Navbar";

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
      <body className="bg-black text-gray-100">
        <Provider>
          <main className={`${geist.className}  flex-1 min-h-screen`}>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
