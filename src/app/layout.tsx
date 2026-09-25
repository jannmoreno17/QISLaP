import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const body = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap", weight: ["400", "600"] });
const display = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + "/"),
  title: { default: `${site.name} — ${site.fullName}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["quantum computing", "power engineering", "energy", "Philippines", "T.I.P.", "DOST-PCIEERD", "Q-RIEnTe", "SICAT", "solar PV"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PH",
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: `${site.name} — ${site.fullName}` }],
  },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/og.jpg`] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

// Applies the saved theme before paint to avoid a flash. Light is the default.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
