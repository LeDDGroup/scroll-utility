import { expect } from "chai";
import * as delay from "delay";
import { Scenario, IOptions } from ".";

export {
  scrollToPercent,
}

function scrollToPercent(browser: Scenario, options: IOptions= {}) {
  const duration = 500;
  const horizontal = options && options.horizontal;
  const initialize = browser.getManagerInit(options.elementScroll)
  describe("scroll to percent", () => {
    async function scrollToPercentTest(scrollPercent: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toPercent(${scrollPercent}, {
          duration: ${duration},
          horizontal: ${horizontal}
        });
      `);
      await delay(duration);
      const ratio = scrollPercent / 100;
      const scrollSize = await browser.getScrollSize(options);
      const size = await browser.getSize(options);
      const offset = await browser.getOffset(options);

      const expectedPosition = Math.floor((scrollSize - size) * ratio); // Some browsers don't scroll to floating values

      browser.browser.takeScreenshot();
      expect(offset).to.be.closeTo(expectedPosition, 0.5);
    }

    it("should scroll to the end of the page", async () => scrollToPercentTest(100));
    it("should scroll to 3 / 4", async () => scrollToPercentTest(75));
    it("should scroll to the middle of the page", async () => scrollToPercentTest(50));
    it("should scroll to 1 / 4", async () => scrollToPercentTest(25));
    it("should scroll to the start of the page", async () => scrollToPercentTest(0));
  });
}
