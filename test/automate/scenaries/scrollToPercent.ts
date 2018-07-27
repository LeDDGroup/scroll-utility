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
      const scrollHeight = await browser.getScrollSize(options);
      const windowHeight = await browser.getSize(options);
      const pageYOffset = await browser.getOffset(options);

      expect(pageYOffset + windowHeight * ratio).to.be.closeTo(scrollHeight * ratio, 0.5);
    }

    it("should scroll to the end of the page", async () => scrollToPercentTest(100));
    it("should scroll to 3 / 4", async () => scrollToPercentTest(75));
    it("should scroll to the middle of the page", async () => scrollToPercentTest(50));
    it("should scroll to 1 / 4", async () => scrollToPercentTest(25));
    it("should scroll to the start of the page", async () => scrollToPercentTest(0));
  });
}
