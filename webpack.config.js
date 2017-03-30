var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    app: './index.js',
    vendor: 'virtual-dom',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015'],
      },
    }],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}
