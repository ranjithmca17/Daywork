
module.exports = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '4000',
          pathname: '/images/*',
        },
      ],
    },
  }