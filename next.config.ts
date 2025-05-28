import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(isProd && {
    output: "export",
    basePath: "/webscraping",
  }),
};

export default nextConfig;

