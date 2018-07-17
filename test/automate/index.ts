import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { readFileSync } from "fs";
import { join } from "path";
import { Scroll } from "../../index";

declare const window: Window & {
  Scroll: typeof Scroll,
};

const scrollScript = readFileSync(join(__dirname, "../../dist/automate/index.js")).toString();

const cap = capabilities.window.chrome;

let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;

before(async function() {
  this.timeout(10000);
  browser = await new webdriver.Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(cap)
    .build();
});

describe("client", async function() {
  this.timeout(20000);
  describe("Browser setup", () => {
    it("Should navigate to *scroll-example*", async () => {
      await browser.get("https://leddgroup.com/scroll-example");
      const title = await browser.getTitle();
      expect(title).to.be.eq("Testing");
    })
    it("should insert scroll script successfully", async () => {
      await browser.executeScript(scrollScript);
      const windowScroll = await browser.executeScript(() => {
        return window.Scroll;
      });
      expect(!!windowScroll).eq(true);
    });
  });
  describe("basic test", () => {
  });
});

after(async function() {
  this.timeout(10000);
  await browser.quit();
});
