import { load, close, evaluate } from "./setup/index";
import test1 from "./test1";

describe("scroll", function() {

    before(async function() {
        await load();
    });

    after(async function() {
        await close();
    });

    beforeEach(async function() {
        this.timeout(500);
        await evaluate(() => { window.scrollTo(0, 0); })
    })

    test1();

});

