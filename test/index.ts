import { expect } from "chai";
import { Scroll } from "../src/scroll";
import { load, close, evaluate } from "./setup/index";

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

    it("should do scroll", async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
        const firstPosition = await evaluate(() => {
            return window.pageYOffset;
        })
        const distToScroll = 100;
        const last = await evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollBy(100);
            return window.pageYOffset;
        });
        expect(last - distToScroll).to.be.equal(firstPosition)
    });

    it("should do exact amount of scroll", async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
        const firstPosition = await evaluate(() => {
            return window.pageYOffset;
        })
        const last = await evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                offset: 100,
            });
            return window.pageYOffset;
        })
        expect(last - 100).to.be.equal(firstPosition)
    });

    it("should scroll to half", async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
        const { position, scrollHeight } = await evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                percent: 50,
            });
            return {
                position: window.pageYOffset + window.innerHeight / 2,
                scrollHeight: document.body.scrollHeight,
            };
        })
        expect(position * 2).to.be.equal(scrollHeight);
    });

    it("should scroll to end", async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
        const { position, scrollHeight } = await evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                percent: 100,
            });
            return {
                position: window.pageYOffset + window.innerHeight,
                scrollHeight: document.body.scrollHeight,
            };
        })
        expect(position).to.be.equal(scrollHeight);
    });

    it("should scroll to element", async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
        const elementTop = await evaluate(() => {
            const scroll = new window.Scroll()
            const element = document.getElementById("element1");
            scroll.scrollTo({
                element,
            });
            return element.getBoundingClientRect().top;
        })
        console.log(elementTop);
        expect(elementTop).to.be.equal(0);
    });
});
