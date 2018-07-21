import { Scroll as ScrollManager } from "../../../";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  scrollToPosition,
}

function scrollToPosition(browser: Scenario) {
  describe("scroll to position", () => {
    it("should scroll to certian position", async () => {
      const duration = await browser.define("duration", 500);
      const scrollPosition = await browser.define("scrollPosition", 1500);

      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPosition(scrollPosition, {
          duration,
        });
      });

      await delay(duration);
      const lastOffset = await browser.getPageYOffset();
      expect(lastOffset).to.be.eq(scrollPosition);
    })
  });
}
