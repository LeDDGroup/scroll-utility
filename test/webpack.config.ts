import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { resolve } from "path"
import { Configuration } from "webpack"

const root = resolve(__dirname, "../")
const outDir = resolve(__dirname, "./automate/setup/_static")

export function config(): Configuration {
  return {
    mode: "development",
    entry: resolve(root, "src/browser.ts"),
    output: {
      filename: "[name].js",
      path: outDir,
      library: "ScrollUtility",
      libraryTarget: "umd",
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          options: {
            configFile: resolve(root, "tsconfig.json"),
            compilerOptions: {
              declaration: false,
            },
          },
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
      new HtmlWebpackPlugin({ template: resolve(root, "test/local/index.html") }),
      new CopyWebpackPlugin([resolve(root, "test/local/index.css")]),
      new HtmlWebpackIncludeAssetsPlugin({ assets: ["./index.css"], append: false }),
    ],
  }
}

export default config
