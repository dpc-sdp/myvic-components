const { resolve } = require('path')

export default {
  rootDir: resolve(__dirname, '../../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  build: {
    transpile: [
      // TODO: We need to transpile ES module unless we have UMD version.
      // https://digital-engagement.atlassian.net/browse/MYVIC-90
      /@dpc-sdp\/yourvic/
    ]
  }
}
