import type { Metadata, Viewport } from "next";
import { Montserrat, Karla } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const url = "https://mobikonnect.com";
const description =
  "Mobikonnect is a full-service mobile marketing & advertising agency engineering consumer promotions, loyalty programs, partnerships and contests for India's biggest brands.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Mobikonnect — We breathe & live mobile",
    template: "%s · Mobikonnect",
  },
  description,
  keywords: [
    "mobile marketing",
    "advertising agency",
    "consumer promotions",
    "loyalty programs",
    "contests",
    "sweepstakes",
    "Mobikonnect",
    "Parv Communications",
  ],
  openGraph: {
    title: "Mobikonnect — We breathe & live mobile",
    description,
    url,
    siteName: "Mobikonnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobikonnect — We breathe & live mobile",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#262626",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${karla.variable}`}>
      <body>
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
