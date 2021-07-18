const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const babelConfig = require("./babel.config");

module.exports = {
  mode: "development",
  entry: [path.join(__dirname, "../src/client/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/public"),
    filename: "index.js",
    environment: {
      arrowFunction: false,
      forOf: false,
    },
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelConfig(),
        },
      },
    ],
  },
  plugins: [
    // Define constants / variables, which were used when build project.
    new webpack.DefinePlugin({
      "process.env.VERSION": JSON.stringify("Robin.V1.0.0"),
    }),
    // provide _ as the lodash's alias, developers can directly use '_' without import or require at any where
    new webpack.ProvidePlugin({
      _: "lodash",
    }),
    new HtmlWebpackPlugin({
      title: "Books Management System",
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      // e.g. Output each progress message directly to the console:
      console.info(percentage, message, ...args);
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist/public"),
    hot: true,
    port: 8443,
    open: true,
    proxy: {
      "*": {
        target: "http://localhost:8000",
      },
    },
  },
};
