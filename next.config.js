module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://muse-node-54j7nacyi-matheus-raduans-projects.vercel.app/:path*",
      },
    ];
  },
};
