import * as delay from "delay";
import { evaluate } from "./index";
import { expect } from "chai";

export default percentScroll;

function percentScroll() {
    describe("percent", function() {
        describe("window scroll", function() {
            it("should scroll to start", async function() {
                const scrollPosition = await evaluate(() => {
                    Scroll.scrollTo({
                        percent: 0,
                    });
                    return window.pageYOffset;
                });
                expect(scrollPosition).to.be.eq(0);
            });

            it("should scroll to half", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    Scroll.scrollTo({
                        percent: 50,
                    });
                    return {
                        scrollPosition: window.pageYOffset,
                        documentHeight: document.body.scrollHeight - window.innerHeight,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight / 2);
            });

            it("should scroll to end", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    Scroll.scrollTo({
                        percent: 100,
                    });
                    return {
                        scrollPosition: window.pageYOffset,
                        documentHeight: document.body.scrollHeight - window.innerHeight,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight);
            });

            it("should scroll with offset to half", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    Scroll.scrollTo({
                        offset: -100,
                        percent: 50,
                    });
                    return {
                        scrollPosition: window.pageYOffset,
                        documentHeight: document.body.scrollHeight - window.innerHeight,
                    };
                });
                expect(scrollPosition + 100).to.be.eq(documentHeight / 2);
            });

            it("should scroll with duration to half", async function() {
                await evaluate(() => {
                    Scroll.scrollTo({
                        duration: 500,
                        percent: 50,
                    });
                });
                await delay(500);
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    return {
                        scrollPosition: window.pageYOffset,
                        documentHeight: document.body.scrollHeight - window.innerHeight,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight / 2);
            });

            describe("scroll to element", () => {
                it("should scroll to start", async function() {
                    const elementTop = await evaluate(() => {
                        Scroll.scrollTo({
                            element: element1,
                            percent: 0,
                        });
                        return element1.getBoundingClientRect().top;
                    });
                    expect(elementTop).to.be.eq(0);
                });

                it("should scroll to half", async function() {
                    const { elementHalf, windowHeight } = await evaluate(() => {
                        Scroll.scrollTo({
                            element: element1,
                            percent: 50,
                        });
                        const bounding = element1.getBoundingClientRect();
                        const elementHalf = (bounding.top + bounding.bottom) / 2;
                        return {
                            elementHalf,
                            windowHeight: window.innerHeight,
                        };
                    });
                    expect(elementHalf).to.be.eq(windowHeight / 2);
                });

                it("should scroll to end", async function() {
                    const { elementBottom, windowHeight } = await evaluate(() => {
                        Scroll.scrollTo({
                            element: element1,
                            percent: 100,
                        });
                        return {
                            elementBottom: element1.getBoundingClientRect().bottom,
                            windowHeight: window.innerHeight,
                        };
                    });
                    expect(elementBottom).to.be.eq(windowHeight);
                });
            });
        });

        describe("div scroll", function() {
            it("should scroll to start", async function() {
                const scrollPosition = await evaluate(() => {
                    divScroll.scrollTo({
                        percent: 0,
                    });
                    return scrollable.scrollTop;
                });
                expect(scrollPosition).to.be.eq(0);
            });

            it("should scroll to half", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    divScroll.scrollTo({
                        percent: 50,
                    });
                    return {
                        scrollPosition: scrollable.scrollTop,
                        documentHeight: scrollable.scrollHeight - scrollable.getBoundingClientRect().height,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight / 2);
            });

            it("should scroll to end", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    divScroll.scrollTo({
                        percent: 100,
                    });
                    return {
                        scrollPosition: scrollable.scrollTop,
                        documentHeight: scrollable.scrollHeight - scrollable.getBoundingClientRect().height,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight);
            });

            it("should scroll with offset to half", async function() {
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    divScroll.scrollTo({
                        offset: -100,
                        percent: 50,
                    });
                    return {
                        scrollPosition: scrollable.scrollTop,
                        documentHeight: scrollable.scrollHeight - scrollable.getBoundingClientRect().height,
                    };
                });
                expect(scrollPosition + 100).to.be.eq(documentHeight / 2);
            });

            it("should scroll with duration to half", async function() {
                await evaluate(() => {
                    divScroll.scrollTo({
                        duration: 500,
                        percent: 50,
                    });
                });
                await delay(500);
                const { scrollPosition, documentHeight } = await evaluate(() => {
                    return {
                        scrollPosition: scrollable.scrollTop,
                        documentHeight: scrollable.scrollHeight - scrollable.getBoundingClientRect().height,
                    };
                });
                expect(scrollPosition).to.be.eq(documentHeight / 2);
            });

            describe("scroll to element", () => {
                it("should scroll to start", async function() {
                    const elementTop = await evaluate(() => {
                        divScroll.scrollTo({
                            element: element,
                            percent: 0,
                        });
                        return element.getBoundingClientRect().top - scrollable.getBoundingClientRect().top;
                    });
                    expect(elementTop).to.be.eq(0);
                });

                it("should scroll to half", async function() {
                    const { elementHalf, windowHeight } = await evaluate(() => {
                        divScroll.scrollTo({
                            element: element,
                            percent: 50,
                        });
                        const bounding = element.getBoundingClientRect();
                        const elementHalf = (bounding.top + bounding.bottom) / 2 - scrollable.getBoundingClientRect().top;
                        return {
                            elementHalf,
                            windowHeight: scrollable.getBoundingClientRect().height,
                        };
                    });
                    expect(elementHalf).to.be.eq(windowHeight / 2);
                });

                it("should scroll to end", async function() {
                    const { elementBottom, windowHeight } = await evaluate(() => {
                        divScroll.scrollTo({
                            element: element,
                            percent: 100,
                        });
                        return {
                            elementBottom: element.getBoundingClientRect().bottom - scrollable.getBoundingClientRect().top,
                            windowHeight: scrollable.getBoundingClientRect().height,
                        };
                    });
                    expect(elementBottom).to.be.eq(windowHeight);
                });
            });
        });
    });
}
