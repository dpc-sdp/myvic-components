const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './bar-chart-umd-entrypoint.js',
  output: {
    filename: 'yourvic-bar-chart-umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'BarChart',
    libraryTarget: 'umd',
    publicPath: 'dist/'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader']
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
}
