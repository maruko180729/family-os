import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Family OS",
  description: "家庭经营系统",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF9F7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen max-w-[480px] mx-auto relative">
          <main className="pb-24 px-4">
            <PageTransition>{children}</PageTransition>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
