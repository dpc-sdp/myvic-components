const path = require('path')

const resolve = path.resolve

// vue.config.js
module.exports = {
  chainWebpack: config => {
    // Add this to load a custom sass variables to override Ripple sass variables.
    // https://github.com/shakacode/sass-resources-loader#vuejs-webpack-templatevue-cli3
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/variables.scss',
        })
        .end()
    })

    // Add this to load Ripple svg icons
    const rippleIconPath = path.dirname(require.resolve('@dpc-sdp/ripple-icon/package.json'))
    const svgRule = config.module.rule('svg')
    svgRule
      .exclude
        .add(resolve(__dirname, rippleIconPath))
      .end()

    config.module
      .rule('rplicon')
      .test(/\.svg$/)
      .include
        .add(resolve(__dirname, rippleIconPath))
        .end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .end()
      .use('svgo-loader')
        .loader('svgo-loader')
        .end()
  },
  transpileDependencies: [
    // for IE11 support
    /@dpc-sdp/,
    /chartjs-chart-treemap/
  ]
}
