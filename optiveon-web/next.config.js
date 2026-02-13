/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // 👈 REQUIRED for S3 static hosting
  reactStrictMode: true,
  images: {
    unoptimized: true, // 👈 REQUIRED for static export
  },
};

module.exports = nextConfig;
