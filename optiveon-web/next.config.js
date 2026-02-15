/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_OUTPUT_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
