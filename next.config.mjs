/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  env: {
    SPOTIFY_CLIENT_ID: "febdfe488e774c68aabb2e041145071f",
    SPOTIFY_CLIENT_SECRET: "2502fb6bd9d246f98dda3efdbd39b6dc",
    NEXTAUTH_SECRET: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
    NEXTAUTH_URL: "http://localhost:8000",
  },
};

export default nextConfig;
