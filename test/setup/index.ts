import * as connect from "connect";
import * as http from "http";
import * as serveStatic from "serve-static";
import { build } from "./bundle";
import * as browser from "./puppet-wrapper";
import * as Path from "path";

export {
    load,
    close,
    getPage,
}

let server;
let page;

const dist = Path.join(__dirname, '../../');

async function load() {

    await build();
    console.log(dist);
    const app = await connect().use(serveStatic(dist));
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
