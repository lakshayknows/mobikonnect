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
import { listPublishedCaseStudies } from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";

/**
 * The "Selected work" grid reads case studies from the database, so the page is
 * ISR rather than fully static. Publishing from the admin revalidates it.
 */
export const revalidate = 300;

export default async function Home() {
  let studies: Awaited<ReturnType<typeof listPublishedCaseStudies>> = [];

  if (isDbConfigured()) {
    try {
      studies = await listPublishedCaseStudies(6);
    } catch (error) {
      console.error("[home] failed to load case studies:", error);
    }
  }

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Expertise />
      <Technology />
      <HowWeWork />
      <WhyBrands />
      <Work studies={studies} />
      <Clients />
    </>
  );
}
