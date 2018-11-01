import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { resolve } from "path"

function config(env: { NODE_ENV?: string } = {}): Configuration {
  const production = env.NODE_ENV !== "development"
  return {
    mode: production ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      filename: "scroll-utility.js",
      path: resolve(__dirname, "dist"),
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
            configFile: "tsconfig-build.json",
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: production ? [] : [new HtmlWebpackPlugin({ template: "test/local/index.html" })],
  }
}

export default config
