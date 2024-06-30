/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "dummyjson.com",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "firstlink-exim.s3.ap-south-1.amazonaws.com",
          },
        ],
      },
};

export default nextConfig;
