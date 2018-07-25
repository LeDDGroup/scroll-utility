import { expect } from "chai";
import * as delay from "delay";
import { Scenario, IOptions} from ".";

export {
  scrollToPosition,
}

function scrollToPosition(browser: Scenario, options: IOptions = {}) {
  const duration = 500;
  const scrollPosition = 1500;
  const initialize = browser.getManagerInit(options.elementScroll);
  describe("scroll to position", () => {
    it("should scroll to certian position", async () => {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toPosition(${scrollPosition}, {
          duration: ${duration},
          horizontal: ${options.horizontal}
        });
      `);

      await delay(duration);
      const lastOffset = await browser.getOffset(options);
      expect(lastOffset).to.be.eq(scrollPosition);
    })
  });
}
