const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/src/scripts/index.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'lib')
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /.css$/,
        loader: 'style-loader|css-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ]
};