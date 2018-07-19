import { Scroll as ScrollManager } from "../../../index";
import { WebDriver } from "selenium-webdriver";
// import { expect } from "chai";

declare const Scroll: typeof ScrollManager;

export {
  sample,
}

function sample(getBrowser: () => WebDriver) {
  describe("sample scenario description", () => {
    it("should do something", async () => {
      const browser = getBrowser();

      await browser.executeScript(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPercent(100, {});
      });

    })
  });
}
