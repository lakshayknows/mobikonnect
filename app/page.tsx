import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import Technology from "@/components/sections/Technology";
import HowWeWork from "@/components/sections/HowWeWork";
import WhyBrands from "@/components/sections/WhyBrands";
import Work from "@/components/sections/Work";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Expertise />
      <Technology />
      <HowWeWork />
      <WhyBrands />
      <Work />
      <Clients />
      <Contact />
    </>
  );
}
