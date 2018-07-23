import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

export {
  offset,
}

function offset(browser: Scenario, horizontal: boolean = false) {
  describe("offset scroll position", () => {
    async function offsetTest() {
      const duration = 500;
      const scrollDistance = 1000;

      const initialOffset = await browser.getPageYOffset();
      await browser.evaluate(`
        const windowManager =  new Scroll();
        windowManager.scroll.offset(${scrollDistance}, {
          duration: ${duration},
          horizontal: ${horizontal},
        });
      `);
      await delay(duration);
      const lastOffset = await browser.getPageYOffset();
      expect(lastOffset - initialOffset).to.be.eq(scrollDistance);
    }

    it("should do scroll with offset", async () => offsetTest())
  });
}
