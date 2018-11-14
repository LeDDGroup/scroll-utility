import HtmlWebpackExternalsPlugin from "html-webpack-externals-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { resolve } from "path"

function config(env: { NODE_ENV?: string } = {}): Configuration {
  const production = env.NODE_ENV !== "development"
  return {
    mode: production ? "production" : "development",
    devtool: "inline-source-map",
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
      // alias: {
      //     "scroll-utility": "../src/index.ts",
      // }
    },
    externals: { "scroll-utility": "ScrollUtility" },
    plugins: [new HtmlWebpackPlugin()].concat(
      production
        ? [
            new HtmlWebpackExternalsPlugin({
              externals: [
                {
                  module: "scroll-utility",
                  entry: {
                    path: "https://cdn.jsdelivr.net/npm/scroll-utility@2",
                    type: "js",
                  },
                  global: "ScrollUtility",
                },
                {
                  module: "react",
                  entry: "https://unpkg.com/react@16/umd/react.production.min.js",
                  global: "React",
                },
                {
                  module: "react-dom",
                  entry: "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
                  global: "ReactDOM",
                },
              ],
            }),
          ]
        : [
            new CopyWebpackPlugin([resolve(__dirname, "../dist/scroll-utility.js")]),
            new HtmlWebpackIncludeAssetsPlugin({ assets: ["./scroll-utility.js"], append: false }),
          ],
    ),
  }
}

export default config
