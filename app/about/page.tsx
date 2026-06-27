import type { Metadata } from "next";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import WhyBrands from "@/components/sections/WhyBrands";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mobikonnect — India's experiential marketing & customer engagement technology platform, engineering measurable engagement for 20+ years.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Stats />
      <Process />
      <WhyBrands />
      <Clients />
      <Contact />
    </>
  );
}
