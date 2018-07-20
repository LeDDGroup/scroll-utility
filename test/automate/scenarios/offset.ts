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
      const duration = 500;
      const scrollDistance = 1000;
      const initialOffset = await browser.getYOffset();
      await browser.evaluate(() => {
        const scrollDistance = arguments[arguments.length - 2];
        const duration = arguments[arguments.length - 1];

        const windowManager =  new Scroll();
        windowManager.scroll.offset(scrollDistance, {
          duration,
        });
      }, scrollDistance, duration);
      await delay(duration);
      const lastOffset = await browser.getYOffset();
      expect(lastOffset - initialOffset).to.be.eq(scrollDistance);
    })
  });
}

