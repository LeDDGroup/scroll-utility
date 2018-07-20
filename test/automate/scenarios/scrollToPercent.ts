import { Scroll as ScrollManager } from "../../../index";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  scrollToPercent,
}

function scrollToPercent(browser: Scenario) {
  describe("scroll to percent", () => {
    const duration = 500;
    it("should scroll to the end of the page", async () => {
      const scrollPercent = 100;
      await browser.evaluate(() => {
        const scrollDistance = arguments[arguments.length - 2];
        const duration = arguments[arguments.length - 1];

        const windowManager = new Scroll();
        windowManager.scroll.toPercent(scrollDistance, {
          duration,
        });
      }, scrollPercent, duration);
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expect(pageYOffset + windowHeight).to.be.eq(scrollHeight);
    });
    it("should scroll to the middle of the page", async () => {
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPercent(50, {
          duration,
        });
      });
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expect(pageYOffset + windowHeight / 2).to.be.eq(scrollHeight / 2);
    });
    it("should scroll to the start of the page", async () => {
      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPercent(0, {
          duration,
        });
      });
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expect(pageYOffset).to.be.eq(0);
    });
  });
}
