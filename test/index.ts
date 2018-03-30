import { expect } from "chai";
import { Scroll } from "../src/scroll";
import { load, close, getPage } from "./setup/index";

// const delay = ms => new Promise(r => setTimeout(r, ms));

interface IScrollWindow extends Window {
    Scroll: typeof Scroll;
}

declare const window: IScrollWindow;

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

    it("should do scroll", async function() {
        const page = getPage();
        const firstPosition = await page.evaluate(() => {
            return window.pageYOffset;
        })
        const last = await page.evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollBy(100);
            return window.pageYOffset;
        })
        expect(last).to.be.gt(firstPosition)
    });
});
