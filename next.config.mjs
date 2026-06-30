/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Routes merged into /what-we-do during the 5-page IA consolidation.
      { source: "/solutions", destination: "/what-we-do", permanent: true },
      { source: "/services", destination: "/what-we-do", permanent: true },
      { source: "/technology", destination: "/what-we-do", permanent: true },
      { source: "/industries", destination: "/what-we-do", permanent: true },
      // Resources retired; closest home is What We Do.
      { source: "/resources", destination: "/what-we-do", permanent: true },
      // Careers folded into About.
      { source: "/careers", destination: "/About", permanent: true },
      // Canonicalise the old lowercase case-studies route to the new URL.
      // (No /about rule: redirect source matching is case-insensitive, so it
      // would match /About itself and loop. The rewrite below handles /About.)
      { source: "/case-studies", destination: "/CaseStudies", permanent: true },
      // Redirect for old printed QR code URL path
      { source: "/CaseStudies.aspx", destination: "/CaseStudies", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Serve the capitalised public URLs from the existing route folders.
      { source: "/CaseStudies", destination: "/case-studies" },
      { source: "/CaseStudies/:slug*", destination: "/case-studies/:slug*" },
      { source: "/About", destination: "/about" },
    ];
  },
};

export default nextConfig;
