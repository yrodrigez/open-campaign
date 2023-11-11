const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',

  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
})
