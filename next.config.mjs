/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  async rewrites() {
    return {
      fallback: [

        {
          source: '/:path*',
          destination: `https://www.uptodate.com/:path*`,
        },
      ],
    }
  }

};

export default nextConfig;
