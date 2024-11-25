import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/products/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/", // URL, с которого перенаправляем
        destination: "/catalog", // URL, куда перенаправляем
        permanent: true, // true для 301, false для 302
      },
    ];
  },
};

export default nextConfig;
