/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    'localhost',
    '127.0.0.1',
    '192.168.1.70',
    '192.168.1.*',
  ],
};

export default nextConfig;
