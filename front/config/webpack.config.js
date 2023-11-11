const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

module.exports = {
  entry: {
    app: ['./src/index.js', './src/index.scss']
  },
  output: {
    path: path.resolve(__dirname, '../back/webapp'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test:  /\.(js|ts|tsx|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Cx: 'cx',
      react: 'react',
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    })
  ],

};
