import { load, close, evaluate } from "./setup/index";
import offsetTest from "./offsetTest";

export {
    evaluate,
}

describe("scroll-utility", function() {
    before(async function() {
        await load();
    });

    after(async function() {
        await close();
    });

    beforeEach(async function() {
        await evaluate(() => { window.scrollTo(0, 0); })
    })

    offsetTest();
});
