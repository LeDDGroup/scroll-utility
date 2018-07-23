import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

export {
  scrollToPercent,
}

function scrollToPercent(browser: Scenario) {
  const duration = 500;
  describe("scroll to percent", () => {
    async function scrollToPercentTest(scrollPercent: number) {

      await browser.evaluate(`
        const windowManager = new Scroll();
        windowManager.scroll.toPercent(${scrollPercent}, {
          duration: ${duration},
        });
      `);
      await delay(duration);
      const ratio = scrollPercent / 100;
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getPageYOffset();

      expect(pageYOffset + windowHeight * ratio).to.be.eq(scrollHeight * ratio);
    }

    it("should scroll to the end of the page", async () => scrollToPercentTest(100));
    it("should scroll to the middle of the page", async () => scrollToPercentTest(50));
    it("should scroll to the start of the page", async () => scrollToPercentTest(0));
  });
}
