import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sddelnxkuphscgevlazw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
