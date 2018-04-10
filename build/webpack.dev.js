'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watchOptions: {
    poll: true
  },
  devServer: {
    hot: true,
    overlay: true
  }
});
