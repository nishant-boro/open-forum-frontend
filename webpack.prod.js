const webpack = require("webpack");
var path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
    publicPath: "/",
  },
  devtool: "source-map",
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
  resolve: {
    extensions: [".js", ".jsx", ".css", ".ts", ".d.ts"],
    modules: ["node_modules"],
  },
};
