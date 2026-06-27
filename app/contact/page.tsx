import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us the goal — repeat purchase, a launch, channel rewards, employee engagement — and we'll engineer the experience that gets you there.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build your next experience."
        highlight={["next", "experience."]}
        intro="Book a demo, request a proposal, or just tell us what you want your audience to feel."
      />
      <Contact />
    </>
  );
}
