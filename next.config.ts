import type { NextConfig } from "next";

const isNetlifyDomain = process.env.URL?.includes("netlify.app");

const nextConfig: NextConfig = {
  output: 'standalone',

  allowedDevOrigins: ['192.168.0.196'],
  
  basePath: process.env.BASEPATH_PREFIX === "/" ? "" : process.env.BASEPATH_PREFIX,
  
  assetPrefix: process.env.ASSET_PREFIX === "/" ? "" : process.env.ASSET_PREFIX,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.eonfreezone.com',
        port: '',
        pathname: '/**'
      }
    ]
  },

  async headers() {
    const headers = [];
    
    if (isNetlifyDomain) {
      headers.push({
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow"
          },
        ],
      });
    }

    return headers;
  },

  async redirects() {
    return [
      {
        source: "/newsletters/efz-jan-march-2018",
        destination: "/assets/pdfs/newsletters/jan-march-2018.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-april-june-2018",
        destination: "/assets/pdfs/newsletters/april-june-2018.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-july-sept-2018",
        destination: "/assets/pdfs/newsletters/july-sept-2018.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-oct-dec-2018",
        destination: "/assets/pdfs/newsletters/oct-dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-jan-mar-2019",
        destination: "/assets/pdfs/newsletters/jan-mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-july-september-2019",
        destination: "/assets/pdfs/newsletters/july-september-2019.pdf",
        permanent: true,
      },
      {
        source: "/newsletters/efz-oct-dec-2019",
        destination: "/assets/pdfs/newsletters/oct-dec-2019.pdf",
        permanent: true,
      },
    ];
  },

  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
