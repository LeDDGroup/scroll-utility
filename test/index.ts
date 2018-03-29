import { expect } from "chai";
import * as connect from "connect";
import * as http from "http";
import * as serveStatic from "serve-static";
// import { Scroll } from "../src/scroll";
import { build } from "./bundle";
const Path = require('path');
import { load, close, page } from "./server";

describe("basic", function() {

    let server = null;

    before(async function() {
        await build();
        const app = await connect().use(serveStatic(Path.join(__dirname, './index.html')));
        server = await http.createServer(app);
        await server.listen(8080);
        await load()
    });


    after(async function() {
        await close();
        await server.close();
    });

    it("should load test page", async function() {
        const pageTitle = await page.title();
        expect(pageTitle).to.be.equal("Testing")
    });
});
