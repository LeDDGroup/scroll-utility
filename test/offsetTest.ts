import { Scroll as IScroll } from "../src/scroll";
import * as delay from "delay";
import { evaluate } from "./index";
import { expect } from "chai";

export default offsetTest;

declare const Scroll: typeof IScroll;

function offsetTest() {
    describe("offset", function() {
        it("should do scroll", async function() {
            const scrollPosition = await evaluate(() => {
                const scroll = new Scroll()
                scroll.scrollTo({
                    offset: 100,
                })
                return window.pageYOffset;
            });
            expect(scrollPosition).to.be.equal(100);
        });

        it("should do scroll with duration", async function() {
            await evaluate(() => {
                const scroll = new Scroll()
                scroll.scrollTo({
                    offset: 100,
                    duration: 500,
                })
            });
            await delay(250);
            let scrollPosition = await evaluate(() => {
                return window.pageYOffset;
            });
            expect(scrollPosition).to.be.gt(0);
            expect(scrollPosition).to.be.lt(100);
            await delay(250);
            scrollPosition = await evaluate(() => {
                return window.pageYOffset;
            });
            expect(scrollPosition).to.be.equal(100);
        });
    });
}
