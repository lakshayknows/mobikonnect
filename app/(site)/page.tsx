import fs from "fs";
import path from "path";

// Self-executing server-side code to copy mockup images to public folder
try {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const filesToCopy = ["menu-open.png", "menu-open-900.png", "menu-mobile.png"];
  filesToCopy.forEach((file) => {
    const src = path.join(rootDir, file);
    const dest = path.join(publicDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
} catch (err) {
  console.error("Error copying files:", err);
}

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import Technology from "@/components/sections/Technology";
import HowWeWork from "@/components/sections/HowWeWork";
import WhyBrands from "@/components/sections/WhyBrands";
import Work from "@/components/sections/Work";
import Clients from "@/components/sections/Clients";

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
    </>
  );
}
