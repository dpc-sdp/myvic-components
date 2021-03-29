module.exports = function () {
  this.options.build.transpile.push(/^ol$/, /@mapbox\/.*/)
}
