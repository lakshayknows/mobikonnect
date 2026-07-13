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
const title = "Mobikonnect — Experiential Marketing & Customer Engagement Technology";
const description =
  "Mobikonnect is India's experiential marketing & customer engagement technology platform. We create measurable consumer, channel-partner and employee engagement experiences — promotions, loyalty, gamification and martech — powered by technology.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s · Mobikonnect",
  },
  description,
  keywords: [
    "experiential marketing",
    "customer engagement platform",
    "consumer promotions",
    "trade promotions",
    "loyalty programs",
    "rewards & gratification",
    "gamification",
    "martech",
    "WhatsApp & IVR campaigns",
    "Mobikonnect",
    "Parv Communications",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: "Mobikonnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
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
