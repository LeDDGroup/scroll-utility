import { expect } from "chai";
// import { Scroll } from "../src/scroll";
import { load, close, getPage } from "./setup/index";

describe("scroll", function() {

    before(async function() {
        await load();
    });

    after(async function() {
        await close();
    });

    it("should load test page", async function() {
        const page = getPage();
        const pageTitle = await page.title();
        expect(pageTitle).to.be.equal("Testing")
    });
});
