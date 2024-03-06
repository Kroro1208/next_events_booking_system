/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        domains: ["localhost", "firebasestorage.googleapis.com"]
    }
};

module.exports = nextConfig;
