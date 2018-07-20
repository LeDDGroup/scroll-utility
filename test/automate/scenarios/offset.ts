import { Scroll as ScrollManager } from "../../../index";
import { WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import * as delay from "delay";
import * as utils from "./utils";

declare const Scroll: typeof ScrollManager;

export {
  offset,
}

function offset(getBrowser: () => WebDriver) {
  describe("offset scroll position", () => {
    it("should do scroll with offset", async () => {
      const browser = getBrowser();

      const initialOffset = await utils.getYOffset(browser);
      await browser.executeScript(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(1000, {
          duration: 500,
        });
      });
      await delay(1000);
      const lastOffset = await utils.getYOffset(browser);
      expect(initialOffset).to.be.eq(lastOffset);
    })
  });
}
