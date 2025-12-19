/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  // Garantir que os paths do TypeScript funcionem
  transpilePackages: [],
}

module.exports = nextConfig

