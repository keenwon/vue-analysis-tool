const webpackConfig = require('./webpack.test');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/index.js'
    ],
    reporters: ['spec'],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    colors: true,
    browsers: ['Chrome'],
    autoWatch: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    // webpackMiddleware: {
    //   stats: 'errors-only'
    // },
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-spec-reporter',
      'karma-webpack'
    ]
  });
}
