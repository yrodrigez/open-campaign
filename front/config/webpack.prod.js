const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const { EsbuildPlugin } = require('esbuild-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../back/webapp'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    clean: true,
    hashDigestLength: 8,
  },
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'es2022',
        css: true,
      }),
    ],
    concatenateModules: true,
    minimize: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].ltc.[contenthash].css',
      chunkFilename: '[name].ltc.[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: '.',
          noErrorOnMissing: true
        }
      ],
    }),
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
})
