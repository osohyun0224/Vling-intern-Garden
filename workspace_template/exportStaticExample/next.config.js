/** @type {import('next').NextConfig} */
const path = require('path')

// 패키지에서 가져온 데이터가 (next.js)컴포넌트를 포함하는 경우 변환 과정이 필요
const withTM = require('next-transpile-modules')(['@bzznbyd/shared-ui'])

const nextConfig = {
  assetPrefix: `/${process.env.APP_NAME}`,
  output: 'export',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    path: `/${process.env.APP_NAME}/_next/image`,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'yt3.googleusercontent.com',
      'yt3.ggpht.com',
      'i.ytimg.com',
      's.ytimg.com',
      //#region [google]
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'lh7.googleusercontent.com',
      'lh8.googleusercontent.com',
      'lh9.googleusercontent.com',
      'lh10.googleusercontent.com',
      'lh11.googleusercontent.com',
      'lh12.googleusercontent.com',
      'lh13.googleusercontent.com',
      'lh14.googleusercontent.com',
      'lh15.googleusercontent.com',
      'lh16.googleusercontent.com',
      'lh17.googleusercontent.com',
      'lh18.googleusercontent.com',
      'lh19.googleusercontent.com',
      'lh20.googleusercontent.com',
      'lh21.googleusercontent.com',
      'lh22.googleusercontent.com',
      'lh23.googleusercontent.com',
      'lh24.googleusercontent.com',
      'lh25.googleusercontent.com',
      'lh26.googleusercontent.com',
      'lh27.googleusercontent.com',
      'lh28.googleusercontent.com',
      'lh29.googleusercontent.com',
      'lh30.googleusercontent.com',
      's3.ap-northeast-2.amazonaws.com',
    ],
  },
}

module.exports = withTM(nextConfig)
