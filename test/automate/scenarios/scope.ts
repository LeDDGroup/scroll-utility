import { Scroll as ScrollManager } from "../../../index";
import { Scenario } from ".";

declare const Scroll: typeof ScrollManager;

export {
  scope,
}

function scope(browser: Scenario) {
  describe("creating a scope", () => {
    it("should create a scope for scrolling in window", async () => {
      await browser.evaluate(() => {
        new Scroll();
      });
    });
    it("should create a scope for scrolling in an element", async () => {
      await browser.evaluate(() => {
        new Scroll(document.getElementById("element") as HTMLElement);
      });
    });
  });
}
