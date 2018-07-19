import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { readFileSync } from "fs";
import { join } from "path";
import { Scroll as ScrollManager } from "../../index";

import { scenarios } from "./scenarios";

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
  describe("Scenarios", () => {
    for (let scenario of scenarios) {
      scenario(() => browser);
    }
  })
});

after(async function() {
  this.timeout(10000);
  await browser.quit();
});
