import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { siteConfig } from "../../config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <>
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <div className="flex-1">{children}</div>
                  </div>
                  <TailwindIndicator />
                </>
          </ThemeProvider>
      </body>
    </html>
  );
}
