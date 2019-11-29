const path = require('path')

module.exports = function () {
  // Register `plugin.js` template
  console.log()
  this.addModule([path.resolve(__dirname, './data-driven-component/module.js'), {}])
  // this.addModule([path.resolve(__dirname, './ripple-map/module.js'), {}])
  // this.addModule(['./ripple-map/module.js', {}])
}

// module.exports.meta = require('./package.json')
