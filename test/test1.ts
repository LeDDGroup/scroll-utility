import { Scroll } from "../src/scroll";
import { evaluate } from "./setup/index";
import { expect } from "chai";

const delay = ms => new Promise(r => setTimeout(r, ms));

export default test1;

interface IScrollWindow extends Window {
    Scroll: typeof Scroll;
}

declare const window: IScrollWindow;

function test1() {
    it("should do scroll", async function() {
        const firstPosition = await evaluate(() => {
            return window.pageYOffset;
        })
        const distToScroll = 100;
        const last = await evaluate(() => {
            const scroll = new window.Scroll()
            scroll.scrollTo({
                offset: 100,
            })
            return window.pageYOffset;
        });
        expect(last - distToScroll).to.be.equal(firstPosition)
    });

    it("should do exact amount of scroll", async function() {
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
        const elementTop = await evaluate(() => {
            const scroll = new window.Scroll()
            const element = document.getElementById("element1");
            scroll.scrollTo({
                element,
            });
            return element.getBoundingClientRect().top;
        })
        expect(elementTop).to.be.equal(0);
    });

    it("should do scroll with duration", async function() {
        await evaluate(() => {
            const scroll = new window.Scroll()
            // const element = document.getElementById("element1");
            scroll.scrollTo({
                offset: 1000,
                duration: 1000,
            });
        })
        await delay(1000);
        const elementTop = await evaluate(() => {
            // const element = document.getElementById("element1");
            // return element.getBoundingClientRect().top;
            return window.pageYOffset;
        });
        expect(elementTop).to.be.equal(1000);
    });
}
