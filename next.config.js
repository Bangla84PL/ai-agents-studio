/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' for Vercel deployment
  // Use 'standalone' only for Docker deployments
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'api.supabase.smartcamp.ai',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Suppress build warnings for known issues
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Only ignore build errors in development, not production
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
