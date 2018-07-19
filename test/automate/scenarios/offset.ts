import { Scroll as ScrollManager } from "../../../index";
import { WebDriver } from "selenium-webdriver";
import { expect } from "chai";

declare const Scroll: typeof ScrollManager;

export {
  offset,
}

function offset(getBrowser: () => WebDriver) {
  describe("offset scroll position", () => {
    it("should do scroll with offset", async () => {
      const browser = getBrowser();

      const pageOffset = await browser.executeScript(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(1000, {
          duration: 500,
        });
        return window.pageYOffset;
      });
      expect(pageOffset).to.be.eq(0);
    })
  });
}

