import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";

const cap = capabilities.window.chrome;

describe("client", function(this) {
  let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;
  before(function () {
    browser = new webdriver.Builder()
      .usingServer("http://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(cap)
      .build();
  });
  after(function () {
    browser.quit();
  });
});
