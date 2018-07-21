import { Scroll as ScrollManager } from "../../../";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  offset,
}

function offset(browser: Scenario, horizontal: boolean = false) {
  describe("offset scroll position", () => {
    async function offsetTest() {
      await browser.define("horizontal", horizontal);
      const duration = await browser.define("duration", 500);
      const scrollDistance = await browser.define("scrollDistance", 1000);

      const initialOffset = await browser.getPageYOffset();
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(scrollDistance, {
          duration,
          horizontal,
        });
      });
      await delay(duration);
      const lastOffset = await browser.getPageYOffset();
      expect(lastOffset - initialOffset).to.be.eq(scrollDistance);
    }

    it("should do scroll with offset", async () => offsetTest())
  });
}
