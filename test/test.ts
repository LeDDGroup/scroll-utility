import Browser = require("zombie");

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000

describe("basic", function() {

    const browser = new Browser({ site: "http://localhost:1234" });

    before(function(done) {
        browser.visit("/", done);
    });

    after(function(done) {
        browser.window.close();
        done();
    });

    it("should have correct title", function() {
        browser.assert.text("title", "Testing");
    });

});
