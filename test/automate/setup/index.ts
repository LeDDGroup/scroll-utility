import HtmlWebpackPlugin from "html-webpack-plugin"
import * as http from "http"
import express = require("express")
import { resolve } from "path"
import webpack from "webpack"

class Server {
  private root = resolve(__dirname, "../../../")
  private outDir = resolve(__dirname, "_static")
  private bundleName = "bundle.js"
  private server: http.Server = (null as any) as http.Server
  public async generateFiles() {
    const compiler = webpack({
      mode: "production",
      entry: [resolve(this.root, "src/browser.ts"), resolve(this.root, "test/local/index.css")],
      output: {
        filename: this.bundleName,
        path: this.outDir,
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
              configFile: resolve(this.root, "tsconfig.json"),
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
      plugins: [new HtmlWebpackPlugin({ template: resolve(this.root, "test/local/index.html") })],
    })
    return new Promise<void>((s, r) => {
      compiler.run(err => {
        if (err) {
          r(err)
        } else {
          s()
        }
      })
    })
  }
  public async start() {
    await this.generateFiles()
    const app = express()

    app.use(express.static(resolve(this.outDir)))

    this.server = http.createServer(app)
    return new Promise<void>(s => {
      this.server.listen(8080, s)
    })
  }
  public async stop() {
    return new Promise<void>(s => {
      this.server.close(s)
    })
  }
}

export { Server }
