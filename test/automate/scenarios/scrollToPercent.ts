import { Scroll as ScrollManager } from "../../../index";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  scrollToPercent,
}

function scrollToPercent(browser: Scenario) {
  describe("scroll to percent", () => {
    let duration = null;

    before("define global scroll duration", async () => {
      duration = await browser.define("duration", 500);
    });

    async function scrollToPercentTest(scrollPercent: number) {
      await browser.define("scrollPercent", 100);

      await browser.evaluate(() => {
        const windowManager = new Scroll();
        windowManager.scroll.toPercent(scrollPercent, {
          duration,
        });
      });
      await delay(duration);
      const ratio = scrollPercent / 100;
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();

      expect(pageYOffset + windowHeight * ratio).to.be.eq(scrollHeight * ratio);
    }

    it("should scroll to the end of the page", async () => {
      scrollToPercentTest(100);
    });
    it("should scroll to the middle of the page", async () => {
      scrollToPercentTest(50);
    });
    it("should scroll to the start of the page", async () => {
      scrollToPercentTest(0);
    });
  });
}
