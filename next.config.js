const nextConfig = {
  images: {
  remotePatterns: [
    { protocol: "https", hostname: "**" }, // allow all HTTPS images
  ],
},

};

module.exports = nextConfig;
