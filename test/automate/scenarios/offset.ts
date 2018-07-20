import { Scroll as ScrollManager } from "../../../index";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  offset,
}

function offset(browser: Scenario) {
  describe("offset scroll position", () => {
    it("should do scroll with offset", async () => {
      const duration = await browser.define("duration", 500);
      const scrollDistance = await browser.define("scrollDistance", 1000);

      const initialOffset = await browser.getYOffset();
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(scrollDistance, {
          duration,
        });
      });
      await delay(duration);
      const lastOffset = await browser.getYOffset();
      expect(lastOffset - initialOffset).to.be.eq(scrollDistance);
    })
  });
}

