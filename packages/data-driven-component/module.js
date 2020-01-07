const path = require('path')

module.exports = function () {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/no-ssr.js'),
    fileName: 'yourvic-data-driven-no-ssr.js',
    ssr: false
  })
}
