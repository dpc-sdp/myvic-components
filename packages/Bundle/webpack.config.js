const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    Main: './main.js',
    Maps: './maps.js'
  },
  output: {
    filename: '[name].yourvic-bundle.js',
    chunkFilename: '[name].yourvic-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'YourVic[name]',
    libraryTarget: 'umd',
    publicPath: 'dist/'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },
  mode: 'production',
  optimization: {
    usedExports: true
  },
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
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
