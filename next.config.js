/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removes double rerender https://github.com/vercel/next.js/issues/35822
  // Which is happening only in dev mode.
  reactStrictMode: false,
  // https://github.com/emotion-js/emotion/issues/2467#issuecomment-1088259201
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
