import * as delay from "delay";
import { evaluate } from "../index";
import { expect } from "chai";

export default stopScrollTest;

function stopScrollTest() {
    describe("stop scroll", function() {
        describe("window scroll", function() {
            it("should stop scroll with duration", async function() {
                await evaluate(() => {
                    Scroll.scrollTo({
                        offset: 200,
                        duration: 500,
                    })
                });
                await delay(50);
                await evaluate(() => {
                    Scroll.stop();
                });
                await delay(200);
                const isScrolling = await evaluate(() => {
                    return Scroll.isScrolling.any;
                });
                expect(isScrolling).to.be.false;
            });
            it("should stop scroll automatically with duration", async function() {
                await evaluate(() => {
                    Scroll.scrollTo({
                        offset: 200,
                        duration: 500,
                    })
                });
                await delay(50);
                await evaluate(() => {
                    window.scrollTo(100, 1000);
                });
                await delay(200);
                const isScrolling = await evaluate(() => {
                    return Scroll.isScrolling.any;
                });
                expect(isScrolling).to.be.false;
            });
        });

        describe("div scroll", function() {
            it("should stop scroll with duration", async function() {
                await evaluate(() => {
                    divScroll.scrollTo({
                        offset: 200,
                        duration: 500,
                    })
                });
                await delay(50);
                await evaluate(() => {
                    divScroll.stop();
                });
                await delay(200);
                const isScrolling = await evaluate(() => {
                    return divScroll.isScrolling.any;
                });
                expect(isScrolling).to.be.false;
            });
            it("should stop scroll automatically with duration", async function() {
                await evaluate(() => {
                    divScroll.scrollTo({
                        offset: 200,
                        duration: 500,
                    })
                });
                await delay(50);
                await evaluate(() => {
                    scrollable.scrollTop = 100;
                    scrollable.scrollLeft = 100;
                });
                await delay(200);
                const isScrolling = await evaluate(() => {
                    return divScroll.isScrolling.any;
                });
                expect(isScrolling).to.be.false;
            });
        });
    });
}
