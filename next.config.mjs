/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "familydoctor.org",
            }
        ]
    }
};

export default nextConfig;
