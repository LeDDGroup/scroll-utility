import * as assert from "assert";
import * as connect from "connect";
import * as http from "http";
import * as serveStatic from "serve-static";
// import { Scroll } from "../src/scroll";
import { build } from "./bundle";
const Path = require('path');
import { load, close, evaluate } from "./server";

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

    it("should have correct title", async function() {
        await console.log(evaluate(() => {
            return document.title;
        }));
        await assert(evaluate(() => {
            return document.title;
        }), "Testing");
    });
});
