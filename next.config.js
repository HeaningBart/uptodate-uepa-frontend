/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/contents/images/:tag/:first/:second",
        destination:
          "https://www.uptodate.com/contents/images/:tag/:first/:second",
        permanent: true,
      },
      {
        source: "/contents/:tag",
        destination: "/articles/:tag",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
