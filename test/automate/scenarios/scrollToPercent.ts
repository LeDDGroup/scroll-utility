import { Scroll as ScrollManager } from "../../../index";
import { expect } from "chai";
import * as delay from "delay";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  scrollToPercent,
}

function scrollToPercent(browser: Scenario) {
  function expectedPosition(pageYOffset: number, windowHeight: number, scrollPercent: number, scrollHeight: number) {
    const ratio = scrollPercent / 100;
    expect(pageYOffset + windowHeight * ratio).to.be.eq(scrollHeight * ratio);
  }
  describe("scroll to percent", () => {
    it("should scroll to the end of the page", async () => {
      const duration = await browser.define("duration", 500);
      const scrollPercent = await browser.define("scrollPercent", 100);

      await browser.evaluate(() => {
        const windowManager = new Scroll();
        windowManager.scroll.toPercent(scrollPercent, {
          duration,
        });
      });
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expectedPosition(pageYOffset, windowHeight, scrollPercent, scrollHeight);
    });
    it("should scroll to the middle of the page", async () => {
      const duration = await browser.define("duration", 500);
      const scrollPercent = await browser.define("scrollPercent", 50);

      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPercent(scrollPercent, {
          duration,
        });
      });
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expectedPosition(pageYOffset, windowHeight, scrollPercent, scrollHeight);
    });
    it("should scroll to the start of the page", async () => {
      const duration = await browser.define("duration", 500);
      const scrollPercent = await browser.define("scrollPercent", 0);

      await browser.evaluate(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.toPercent(scrollPercent, {
          duration,
        });
      });
      await delay(duration);
      const scrollHeight = await browser.getScrollHeight();
      const windowHeight = await browser.getWindowHeight();
      const pageYOffset = await browser.getYOffset();
      expectedPosition(pageYOffset, windowHeight, scrollPercent, scrollHeight);
    });
  });
}
