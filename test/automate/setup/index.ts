import * as http from "http"
import express = require("express")
import * as path from "path"

class Server {
  private server: http.Server = (null as any) as http.Server
  public async start() {
    const app = express()

    app.use(express.static(path.join(__dirname, "../../../dist/test/")))

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
