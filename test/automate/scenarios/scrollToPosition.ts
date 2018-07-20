import { Scroll as ScrollManager } from "../../../index";
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
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPosition(1500, {
          duration: 500,
        });
      });
      await delay(500);
      const lastOffset = await browser.getYOffset();
      expect(lastOffset).to.be.eq(1500);
    })
  });
}
