import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";

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
    describe("first test", () => {
    it("should do something", () => {
      expect("asdf").to.be.eq("asdf");
    })
  });
});

after(async function() {
  this.timeout(10000);
  await browser.quit();
});
