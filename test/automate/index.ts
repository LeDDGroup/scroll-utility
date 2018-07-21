import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { readFileSync } from "fs";
import { join } from "path";
import { Scroll as ScrollManager } from "../../";

import { testScenarios } from "./scenarios";
declare const Scroll: typeof ScrollManager;

const testing_site_url = "https://leddgroup.com/scroll-example";
const scrollScript = readFileSync(join(__dirname, "./setup/index.js")).toString();
const cap = capabilities.window.chrome;
let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;

const to_ms = (ms: number) => ms * Math.pow(10, 3);
const long_timeout = to_ms(0);

before(async function() {
  this.timeout(long_timeout);
  browser = await new webdriver.Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(cap)
    .build();
});

describe("client", async function() {
  this.timeout(long_timeout);
  describe("Browser setup", () => {
    it("Should navigate to *scroll-example*", async () => {
      await browser.get(testing_site_url);
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
    testScenarios(() => browser);
  })
});

after(async function() {
  this.timeout(long_timeout);
  await browser.quit();
});
