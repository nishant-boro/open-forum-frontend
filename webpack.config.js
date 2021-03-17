const webpack = require("webpack");
var path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  devServer: {
    contentBase: "./src",
    watchContentBase: true,
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".ts", ".d.ts"],
    modules: ["node_modules"],
  },
};
