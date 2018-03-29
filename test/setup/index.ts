import * as connect from "connect";
import * as http from "http";
import * as serveStatic from "serve-static";
import { build } from "./bundle";
import * as Path from "path";
import * as browser from "./puppet-wrapper";

export {
    load,
    close,
    getPage,
}

let server;
let page;

async function load() {
    await build();
    const app = await connect().use(serveStatic(Path.join(__dirname, './index.html')));
    server = await http.createServer(app);
    await server.listen(8080);
    await browser.load()
    page = browser.page;
}

function getPage() {
    return page;
}

async function close() {
    await browser.close();
    server.close();
}
