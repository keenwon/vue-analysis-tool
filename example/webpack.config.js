'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

function getPath(filePath) {
  return path.join(__dirname, filePath);
}

module.exports = {
  entry: {
    app: getPath('app.js')
  },
  output: {
    path: getPath('dist/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    poll: true
  },
  devServer: {
    hot: true,
    overlay: true,
    contentBase: getPath('.'),
    index: 'index.html'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
