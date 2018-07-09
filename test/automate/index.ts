import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";

const cap = capabilities.window.chrome;

let browser: any;

before(async () => {
  browser = await new webdriver.Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(cap)
    .build();
});

describe("client", async () => {
  let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;
  describe("first test", () => {
  });
});

after(async () => {
  await browser.quit();
});
