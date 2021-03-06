const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: "esnext",
  entry: "./client/src/client.tsx",
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
      {
        test: /\.s?css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-url-loader",
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
      template: "client/src/client.html",
    }),
  ],
  devServer: {
    port: 9000,
  },
};
