/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.builder.io"],
    unoptimized: true, // For better static export compatibility
  },
  // Enable webpack bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk for React/Next.js
            framework: {
              chunks: "all",
              name: "framework",
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Common library chunk
            lib: {
              test(module) {
                return (
                  module.size() > 50000 &&
                  /node_modules/.test(module.identifier())
                );
              },
              name: "lib",
              priority: 30,
              minChunks: 1,
              chunks: "all",
            },
            // Three.js specific chunk
            three: {
              test: /[\\/]node_modules[\\/](@react-three|three)[\\/]/,
              name: "three",
              priority: 20,
              chunks: "all",
            },
            // Framer Motion chunk
            motion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: "motion",
              priority: 20,
              chunks: "all",
            },
            // UI components chunk
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
              name: "ui",
              priority: 20,
              chunks: "all",
            },
            // Commons chunk for shared code
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 10,
              chunks: "all",
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-button",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
      "lucide-react",
    ],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: true, // Remove console.logs in production
  },
  // Output configuration for static hosting
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
