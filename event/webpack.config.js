const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './event/src/event.js',
  output: {
    filename: 'event.js',
    path: path.join(__dirname, '../', 'build/js'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
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