import * as http from "http"
import express = require("express")
import * as path from "path"

export { Server }

class Server {
  private server: http.Server = (null as any) as http.Server
  constructor() {}
  public async start() {
    const app = express()

    app.use(express.static(path.join(__dirname, "../../../dist/test/")))

    this.server = http.createServer(app)
    this.server.listen(8080)
    console.log("server started on port http://localhost:8080")
  }
  public stop() {
    this.server.close()
  }
}
