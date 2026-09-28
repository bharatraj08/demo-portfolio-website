import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile, siteUrl } from "@/content/site";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const title = `${profile.name} | Software Developer for AI Products`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title,
    description: profile.description,
    url: siteUrl,
    images: [{ url: "og.png", width: 1200, height: 630, alt: `${profile.name}, software developer` }],
  },
  twitter: { card: "summary_large_image", title, description: profile.description, images: ["og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
