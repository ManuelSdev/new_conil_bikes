/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  //TODO: filtro más estricto
  //https://nextjs.org/docs/api-reference/next/image#remote-patterns
  images: {
    domains: ['www.sbbikestogo.com', 'assets.specialized.com'],
  },

}

module.exports = nextConfig
