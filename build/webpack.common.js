'use strict';

const path = require('path');
const webpack = require('webpack');

function getPath(filePath) {
  return path.join(__dirname, '..', filePath);
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
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
