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
      { source: "/careers", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
