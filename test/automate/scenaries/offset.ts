import { expect } from "chai";
import * as delay from "delay";
import { Scenario, IOptions } from ".";

export {
  offset,
}

function offset(browser: Scenario, options: IOptions = {}) {
  describe("offset scroll position", () => {
    async function offsetTest(scrollDistance: number) {
      const duration = 0;
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

      const expectedPosition = Math.round(scrollDistance + initialOffset);

      await browser.browser.takeScreenshot();
      expect(lastOffset).to.be.eq(expectedPosition);
    }

    it("should do scroll with offset fixed", async () => offsetTest(1000))
    it("should do scroll with offset some floating", async () => offsetTest(-16.76))
    it("should do scroll with offset some floating again", async () => offsetTest(16))
  });
}
