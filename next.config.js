/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // If you move stills/thumbnails to Cloudinary later, add its domain here.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;
