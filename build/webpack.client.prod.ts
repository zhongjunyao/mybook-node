const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const babelConfig = require("./babel.config");

module.exports = {
  mode: "production",
  entry: [path.join(__dirname, "../src/client/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/public"),
    filename: "index.js",
    environment: {
      arrowFunction: false,
      forOf: false,
    },
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelConfig(),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typesscript-loader",
          options: {
            transpileOnly: false,
          },
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
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      // e.g. Output each progress message directly to the console:
      console.info(percentage, message, ...args);
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/config/APIConfig.json"),
          to: path.resolve(__dirname, "../dist/public"),
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
