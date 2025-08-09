import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  webpack: (config, { isServer }) => {
    // Handle lightningcss binary issues
    if (isServer) {
      config.externals.push({
        'lightningcss': 'lightningcss'
      });
    }
    
    // Fallback for missing modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
  // Disable static optimization for pages using dynamic imports
  output: 'standalone',
};

export default nextConfig;
