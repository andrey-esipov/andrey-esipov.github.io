/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // andrey-esipov.github.io is a user/organization site, so it's served
  // from the repo root — no basePath / assetPrefix needed.
}

module.exports = nextConfig
