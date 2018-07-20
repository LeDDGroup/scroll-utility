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
      const initialOffset = await browser.getYOffset();
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(1000, {
          duration: 500,
        });
      });
      await delay(500);
      const lastOffset = await browser.getYOffset();
      expect(lastOffset - initialOffset).to.be.eq(1000);
    })
  });
}
