import { expect } from "chai";
import * as delay from "delay";
import { Scenario, IOptions } from ".";

export {
  scrollToElement,
}

function scrollToElement(browser: Scenario, options: IOptions= {}) {
  const duration = 0;
  const horizontal = options && options.horizontal;
  const initialize = browser.getManagerInit(options.elementScroll);
  const element = browser.getElementToScroll(options.elementScroll);
  describe("scroll to element", () => {
    async function scrollToElementTest(center: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toElement(${element}, {
          duration: ${duration},
          horizontal: ${horizontal},
          center: ${center},
        });
      `);
      await delay(duration);
      const ratio = center / 100;
      const size = await browser.getSize(options);
      const elementOffset = await browser.getScrollOffset(options);
      const otherElementOffset = await browser.getElementScrollOffset(options);
      const elementSize = await browser.getElementSize(options);

      await browser.browser.takeScreenshot();
      expect(otherElementOffset).to.be.closeTo((elementOffset + (size - elementSize) * ratio), 0.51);
    }

    it("should scroll to element", async () => scrollToElementTest(0));
    it("should scroll to element and center it at 25%", async () => scrollToElementTest(25));
    it("should scroll to element and center it at 50%", async () => scrollToElementTest(50));
    it("should scroll to element and center it at 75%", async () => scrollToElementTest(75));
    it("should scroll to element and center it at 100%", async () => scrollToElementTest(100));
  });
}
