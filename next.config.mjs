/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'static.vecteezy.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ],
  },
};

export default nextConfig;
