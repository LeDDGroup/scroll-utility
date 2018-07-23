import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

export {
  scrollToPosition,
}

function scrollToPosition(browser: Scenario) {
  const duration = 500;
  const scrollPosition = 1500;
  describe("scroll to position", () => {
    it("should scroll to certian position", async () => {

      await browser.evaluate(`
        const windowManager =  new Scroll();
        windowManager.scroll.toPosition(${scrollPosition}, {
          duration: ${duration},
        });
      `);

      await delay(duration);
      const lastOffset = await browser.getPageYOffset();
      expect(lastOffset).to.be.eq(scrollPosition);
    })
  });
}
