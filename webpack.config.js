const webpack = require('webpack');

module.exports = {
  entry: {
    index:'./wxpackage/js/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src'
  },
  watch: true,
  watchOptions: {
    ignored: ['src', 'bin', 'libs', 'release', 'node_modules']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  mode: 'development'//关键
};