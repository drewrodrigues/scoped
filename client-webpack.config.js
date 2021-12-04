const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/client.tsx",
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "dist/client"),
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "client-tsconfig.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "client.html",
      template: "client/client.html",
    }),
  ],
  devServer: {
    port: 9000,
  },
};
