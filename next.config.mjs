/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", ],
    deviceSizes: [320, 420, 768], // for <Image layout="responsive">
    imageSizes: [16, 32, 48, 64, 96], // for layout="intrinsic" or "fixed"
    // unoptimized: true, // optional - disables Next.js optimization
  },
};

export default nextConfig;
