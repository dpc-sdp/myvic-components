const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: [
    // Add polyfills for IE11 support
    'core-js/modules/es6.promise',
    'core-js/modules/es6.array.iterator',
    'whatwg-fetch',
    // Bundle entrypoint
    './index.js'
  ],
  output: {
    filename: 'yourvic-bundle.js',
    chunkFilename: '[name].yourvic-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'YourVic',
    libraryTarget: 'umd',
    publicPath: 'dist/'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },
  mode: 'production',
  optimization: {
    usedExports: true
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // Exclude node_modues from transpile, except for those under @dpc-sdp (with windows or unix paths)
        exclude: /node_modules[\\/](?!(@dpc-sdp|chartjs-chart-treemap)).*/,
        loader: 'babel-loader',
        options: {
          rootMode: 'upward',
          presets: [[
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: 2
            }
          ]]
        }
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Set env var BUNDLE_ANALYZE to 1 to analyze bundle.
    new BundleAnalyzerPlugin({ analyzerMode: process.env.BUNDLE_ANALYZE === '1' ? 'server' : 'disabled' })
  ]
}
