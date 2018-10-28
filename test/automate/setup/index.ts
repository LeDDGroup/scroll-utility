import * as http from "http"
import express = require("express")
import { resolve } from "path"
import webpack from "webpack"
import config from "../../webpack.config"

class Server {
  private outDir = resolve(__dirname, "_static")
  private server: http.Server = (null as any) as http.Server
  public async generateFiles() {
    const compiler = webpack(config())
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
