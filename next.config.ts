import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/assets/fonts/:path*.woff2",
        headers: [
          {
            key: "Content-Type",
            value: "font/woff2",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
