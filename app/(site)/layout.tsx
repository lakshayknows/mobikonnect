import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/** The public marketing shell — smooth scroll, custom cursor, navbar and footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
