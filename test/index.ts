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
        await page.evaluate(() => { window.scrollTo(0, 0); })
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
        await page.evaluate(() => { window.scrollTo(0, 0); })
        const firstPosition = await page.evaluate(() => {
            return window.pageYOffset;
        })
        const last = await page.evaluate((distToScroll) => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                offset: 100,
            });
            return window.pageYOffset;
        })
        expect(last - 100).to.be.equal(firstPosition)
    });

    it("should scroll to half", async function() {
        const page = getPage();
        await page.evaluate(() => { window.scrollTo(0, 0); })
        const position = await page.evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                percent: 50,
                offset: window.innerHeight / 2,
            });
            return window.pageYOffset;
        })
        const scrollHeight = await page.evaluate(() => {
            return document.body.scrollHeight
        })
        expect(position * 2).to.be.equal(scrollHeight);
    });

});
