import Browser = require("zombie");
import * as connect from "connect";
import * as http from "http";
import * as serveStatic from "serve-static";

declare const __dirname;

describe("basic", function() {


    const browser = new Browser({ site: "http://localhost:8080" });
    let server = null;

    before(function(done) {
        const app = connect().use(serveStatic(__dirname))
        server = http.createServer(app);
        server.listen(8080, () => {
            browser.visit("/", done);
        });
    });


    after(function(done) {
        server.close()
        browser.window.close();
        done();
    });

    it("should have correct title", function() {
        browser.assert.text("title", "Testing");
    });
});
