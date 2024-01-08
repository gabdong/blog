/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: `${process.env.REACT_APP_SERVER_URL}/apis/:path*`,
      },
    ];
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports({ ...nextConfig });
