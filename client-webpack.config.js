const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/client.ts",
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "dist/client"),
  },
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
    extensions: [".tsx", ".ts"],
  },
  mode: "development",
  plugins: [new HtmlWebpackPlugin()],
};
