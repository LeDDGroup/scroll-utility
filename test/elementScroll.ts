import * as delay from "delay";
import { evaluate } from "./index";
import { expect } from "chai";

export default elementScroll;

function elementScroll() {
    describe("to element", function() {
        describe("window scroll", function() {
            it("should scroll to element", async function() {
                const elementTop = await evaluate(() => {
                    Scroll.scrollTo({
                        element: element1,
                    });
                    return element1.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.eq(0);
            });

            it("should scroll to element with duration", async function() {
                const initial = await evaluate(() => {
                    Scroll.scrollTo({
                        element: element1,
                        duration: 500,
                    })
                    return element1.getBoundingClientRect().top;
                });
                await delay(250);
                let elementTop = await evaluate(() => {
                    return element1.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.lt(initial);
                expect(elementTop).to.be.gt(0);
                await delay(250);
                elementTop = await evaluate(() => {
                    return element1.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.eq(0);
            });

            it("should scroll to element with offset", async function() {
                const elementTop = await evaluate(() => {
                    Scroll.scrollTo({
                        offset: 100,
                        element: element1,
                    });
                    return element1.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.eq(-100);
            });
        });
        describe("div scroll", function() {
            it("should scroll to element", async function() {
                const elementTop = await evaluate(() => {
                    divScroll.scrollTo({
                        element: element,
                    });
                    return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.closeTo(0, 1);
            });

            it("should scroll to element with duration", async function() {
                const initial = await evaluate(() => {
                    divScroll.scrollTo({
                        element: element,
                        duration: 500,
                    })
                    return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                });
                await delay(250);
                let elementTop = await evaluate(() => {
                    return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.lt(initial);
                expect(elementTop).to.be.gt(0);
                await delay(250);
                elementTop = await evaluate(() => {
                    return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.lt(1);
                expect(elementTop).to.be.gt(-1);
            });

            it("should scroll to element with offset", async function() {
                const elementTop = await evaluate(() => {
                    divScroll.scrollTo({
                        offset: 100,
                        element: element,
                    });
                    return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                });
                expect(elementTop).to.be.closeTo(-100, 1);
            });
        });
    });
}
