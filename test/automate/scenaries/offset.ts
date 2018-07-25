import { expect } from "chai";
import * as delay from "delay";
import { Scenario, IOptions } from ".";

export {
  offset,
}

function offset(browser: Scenario, options: IOptions = {}) {
  describe("offset scroll position", () => {
    async function offsetTest() {
      const duration = 500;
      const scrollDistance = 1000;
      const initialOffset = await browser.getOffset(options);
      const initialize = browser.getManagerInit(options.elementScroll)
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.offset(${scrollDistance}, {
          duration: ${duration},
          horizontal: ${options.horizontal},
        });
      `);
      await delay(duration);
      const lastOffset = await browser.getOffset(options);
      expect(lastOffset - initialOffset).to.be.eq(scrollDistance);
    }

    it("should do scroll with offset", async () => offsetTest())
  });
}
