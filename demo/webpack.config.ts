import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { resolve } from "path"

function config(env: { NODE_ENV?: string } = {}): Configuration {
  const production = env.NODE_ENV !== "development"
  return {
    mode: production ? "production" : "development",
    entry: resolve(__dirname, "index.tsx"),
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new CopyWebpackPlugin([resolve(__dirname, "../dist/scroll-utility.js")]),
      new HtmlWebpackIncludeAssetsPlugin({ assets: ["./scroll-utility.js"], append: false }),
    ],
  }
}

export default config
