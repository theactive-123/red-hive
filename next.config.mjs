/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger's shared Node hosting can't run sharp's native binary,
  // so serve images as-is (they are already optimized at the source).
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
