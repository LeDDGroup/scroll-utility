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
        const distToScroll = 100;
        const last = await page.evaluate((distToScroll) => {
            const scroll = new window.Scroll()
            scroll.scrollBy(distToScroll);
            return window.pageYOffset;
        }, distToScroll)
        expect(last - distToScroll).to.be.equal(firstPosition)
    });

    it("should do exact amount of scroll", async function() {
        const page = getPage();
        const firstPosition = await page.evaluate(() => {
            return window.pageYOffset;
        })
        const distToScroll = 100;
        const last = await page.evaluate((distToScroll) => {
            const scroll = new window.Scroll()
            scroll.scrollBy(distToScroll);
            return window.pageYOffset;
        }, distToScroll)
        expect(last - distToScroll).to.be.equal(firstPosition)
    });

});
