import * as Bundler from "parcel-bundler";
import * as express from "express";
import * as delay from "delay";
import * as Path from "path";

export {
  Server,
}

class Server {
  private app;
  constructor() {}
  public async start() {

    const app = express();

    const file = Path.join(__dirname, "../../local/index.html"); // Pass an absolute path to the entrypoint here
    const options = {}; // See options section of api docs, for the possibilities

    // Initialize a new bundler using a file and options
    const bundler = new Bundler(file, options);


    // Let express use the bundler middleware, this will let Parcel handle every request over your express server
    app.use(bundler.middleware());

    // Listen on port 8080
    this.app = app.listen(8080);
    return delay(5000);
  }
  public stop() {
    this.app.close();
  }
}
