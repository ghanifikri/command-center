import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "172.16.128.11",
    "192.168.105.25",
    "localhost",
    "127.0.0.1",
  ],
  /* config options here */
};

export default nextConfig;
