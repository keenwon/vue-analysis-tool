'use strict';

let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./build/webpack.prod');
    break;
  case 'test':
    config = require('./build/webpack.test');
    break;
  case 'dev':
  default:
    config = require('./build/webpack.dev');
    break;
}

module.exports = config;
