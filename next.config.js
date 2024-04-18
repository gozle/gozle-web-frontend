const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});
const withPWA = require('next-pwa')({
  mode: 'production',
  dest: 'public',
  cacheOnFrontEndNav: true,
  disable: true,
});
const withTM = require('next-transpile-modules')(['@ratayev710/hls-player']);

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
    outputStyle: 'expanded',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /.*index.ts/i,
      sideEffects: false,
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gozle.com.tm',
      },
      {
        protocol: 'http',
        hostname: '95.85.116.222',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/videos',
        destination: '/videos/popular',
        permanent: true,
      },
    ];
  },
};

module.exports = withTM(withPWA(withBundleAnalyzer(nextConfig)));
