import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config redirects run before src/proxy.ts, so these match the public (unprefixed / "/ar") URLs.
  async redirects() {
    // The "shipments" module and docs page were merged into "bookings".
    return [
      { source: "/platform/shipments", destination: "/platform/bookings", permanent: true },
      { source: "/ar/platform/shipments", destination: "/ar/platform/bookings", permanent: true },
      { source: "/docs/shipments", destination: "/docs/bookings", permanent: true },
      { source: "/ar/docs/shipments", destination: "/ar/docs/bookings", permanent: true },
    ];
  },
};

export default nextConfig;
