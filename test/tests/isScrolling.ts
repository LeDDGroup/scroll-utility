import * as delay from "delay";
import { evaluate } from "../index";
import { expect } from "chai";

export default isScrollingTest;

function isScrollingTest() {
    describe("isScrolling", function() {
        describe("window scroll", function() {
            describe("automatic scroll", function() {
                it("should report automatic scroll without duration", async function() {
                    const isScrolling = await evaluate(() => {
                        Scroll.scrollTo({
                            offset: 100,
                        })
                        return Scroll.isScrolling;
                    });
                    expect(isScrolling.user).to.be.equal(false);
                    expect(isScrolling.auto).to.be.equal(true);
                    expect(isScrolling.any).to.be.equal(true);
                });

                it("should report automatic scroll with duration", async function() {
                    await evaluate(() => {
                        Scroll.scrollTo({
                            offset: 100,
                            duration: 500,
                        })
                    });
                    await delay(250);
                    let isScrolling = await evaluate(() => {
                        return Scroll.isScrolling;
                    });
                    expect(isScrolling.user).to.be.equal(false);
                    expect(isScrolling.auto).to.be.equal(true);
                    expect(isScrolling.any).to.be.equal(true);
                    await delay(350);
                });
            });
            describe("user scroll", function() {
                it("should report user scroll", async function() {
                    await evaluate(() => {
                        window.scrollTo(500, 500)
                    });
                    await delay(10);
                    const isScrolling = await evaluate(() => {
                        return Scroll.isScrolling;
                    });
                    expect(isScrolling.user).to.be.equal(true);
                    expect(isScrolling.auto).to.be.equal(false);
                    expect(isScrolling.any).to.be.equal(true);
                });
            });
        });

        describe("div scroll", function() {
            it("without duration", async function() {
                const isScrolling = await evaluate(() => {
                    divScroll.scrollTo({
                        offset: 100,
                    })
                    return divScroll.isScrolling;
                });
                expect(isScrolling.user).to.be.equal(false);
                expect(isScrolling.auto).to.be.equal(true);
                expect(isScrolling.any).to.be.equal(true);
            });

            it("with duration", async function() {
                await evaluate(() => {
                    divScroll.scrollTo({
                        offset: 100,
                        duration: 500,
                    })
                });
                await delay(250);
                let isScrolling = await evaluate(() => {
                    return divScroll.isScrolling;
                });
                expect(isScrolling.user).to.be.equal(false);
                expect(isScrolling.auto).to.be.equal(true);
                expect(isScrolling.any).to.be.equal(true);
                await delay(250);
                isScrolling = await evaluate(() => {
                    return divScroll.isScrolling;
                });
                expect(isScrolling.user).to.be.equal(false);
                expect(isScrolling.auto).to.be.equal(true);
                expect(isScrolling.any).to.be.equal(true);
                await delay(350);
            });

            describe("user scroll", async function() {
                it("should report user scroll", async function() {
                    await evaluate(() => {
                        scrollable.scrollTop = 502;
                        scrollable.scrollLeft = 505;
                    });
                    await delay(10);
                    const isScrolling = await evaluate(() => {
                        return divScroll.isScrolling;
                    });
                    expect(isScrolling.user).to.be.equal(true);
                    expect(isScrolling.auto).to.be.equal(false);
                    expect(isScrolling.any).to.be.equal(true);
                    await delay(100);
                });
            });
        });
    });
}
