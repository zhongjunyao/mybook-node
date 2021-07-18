const path = require('path');
const webpack = require('webpack');
const {
  merge
} = require('webpack-merge');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const babelConfig = require('./babel.config')
const eslintConfig = require('./eslint.config')

module.exports = {
  mode: 'production',
  entry: [
    path.join(__dirname, '../src/server/index.js')
  ],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: 'index.js',
    environment: {
      arrowFunction: false,
      forOf: false
    },
    clean: true
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: babelConfig()
      }
    }]
  },
  plugins:[
    // new webpack.ProgressPlugin((percentage, message, ...args) => {
    //   // e.g. Output each progress message directly to the console:
    //   console.info(`${Math.floor(percentage*100)}%`, message, ...args);
    // }),
    new ESLintPlugin(eslintConfig)
  ],
  optimization: {
    minimize: false,
  },
  stats: {
    logging: 'warn',
    errorStack: false,
    errorDetails: false,
  },
}