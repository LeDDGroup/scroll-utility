import HtmlWebpackPlugin from "html-webpack-plugin"
import * as http from "http"
import express = require("express")
import { resolve } from "path"
import webpack from "webpack"

export { Server }

class Server {
  private root = resolve(__dirname, "../../../")
  private outDir = resolve(__dirname, "_static")
  private bundleName = "bundle.js"
  private server: http.Server = (null as any) as http.Server
  constructor() {}
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
        if (err) r(err)
        s()
      })
    })
  }
  public async start() {
    await this.generateFiles()
    const app = express()

    app.use(express.static(resolve(this.outDir)))

    this.server = http.createServer(app)
    this.server.listen(8080)
    console.log("server started on port http://localhost:8080")
  }
  public stop() {
    this.server.close()
  }
}
