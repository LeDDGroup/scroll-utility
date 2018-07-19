import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { readFileSync } from "fs";
import { join } from "path";
import { Scroll as ScrollManager } from "../../index";

declare const Scroll: typeof ScrollManager;

const scrollScript = readFileSync(join(__dirname, "./setup/index.js")).toString();

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
        return Scroll;
      });
      expect(!!windowScroll).eq(true);
    });
  });
  describe("basic test", () => {
    it("should do scroll with offset", async () => {
      const pageOffset = await browser.executeScript(() => {
        const windowManager =  new Scroll();
        windowManager.scroll.offset(1000, 1000);
        return window.pageYOffset;
      });
      expect(pageOffset).to.be.eq(0);
    })
  });
});

after(async function() {
  this.timeout(10000);
  await browser.quit();
});
