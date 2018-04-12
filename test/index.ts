import { load, close, evaluate } from "./setup/index";
import offsetTest from "./tests/offsetTest";
import elementScroll from "./tests/elementScroll";
import percentScroll from "./tests/percentScroll";
import isScrollingTest from "./tests/isScrolling";

declare module "./globals";

export {
    evaluate,
}

before(async function() {
    this.timeout(20000);
    await load();
})

describe("scroll-utility", function() {
    beforeEach(async function() {
        await evaluate(() => {
            const scrollable = document.getElementById("scrollable");
            scrollable.scrollTo(0, 0);
            window.scrollTo(0, 0);
        })
    })

    offsetTest();
    elementScroll();
    percentScroll();
    isScrollingTest();
});

after(async function() {
    await close();
});

