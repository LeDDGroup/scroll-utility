import { Scroll as ScrollManager } from "../../../index";
import { WebDriver } from "selenium-webdriver";

declare const Scroll: typeof ScrollManager;

export {
  scope,
}

function scope(getBrowser: () => WebDriver) {
  describe("creating a scope", () => {
    it("should create a scope for scrolling in window", async () => {
      const browser = getBrowser();
      await browser.executeScript(() => {
        new Scroll();
      });
    });
    it("should create a scope for scrolling in an element", async () => {
      const browser = getBrowser();
      await browser.executeScript(() => {
        new Scroll(document.getElementById("element") as HTMLElement);
      });
    });
  });
}
