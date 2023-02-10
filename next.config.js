/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   modularizeImports: {
      '@mui/material': {
         transform: '@mui/material/{{member}}',
      },
      '@mui/icons-material': {
         transform: '@mui/icons-material/{{member}}',
      },
   },
   //TODO: filtro más estricto
   //https://nextjs.org/docs/api-reference/next/image#remote-patterns
   images: {
      domains: [
         'www.sbbikestogo.com',
         //  'www.assets.specialized.com',
         'assets.specialized.com',
         'trek.scene7.com',
      ],
   },
   /*
   webpack: (config, options) => {
      config.module.rules.push({
         test: /\.svg$/,
         use: ['@svgr/webpack'],
      })
      return config
   },
   */
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.[jt]sx?$/,
         use: ['@svgr/webpack'],
      })

      return config
   },
}

module.exports = nextConfig
