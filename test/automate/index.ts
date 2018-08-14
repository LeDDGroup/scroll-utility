import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { Server } from "./setup/index";

import { testScenarios } from "./scenaries";

const local_testing_site_url = "http://localhost:8080/";
const long_timeout = 0;

let server = new Server();
before(async function() {
  this.timeout(long_timeout);
  await server.start();
});
describe("client tests ", async function() {
  this.timeout(long_timeout);
  for (const os in capabilities) {
    for (const browser in capabilities[os]) {
      const cap = capabilities[os][browser];
      describe(`${os} ${browser}`, async function() {
        test(cap);
      });
    }
  }
});
after(async function() {
  this.timeout(long_timeout);
  await server.stop();
});

function test(cap) {
  let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;
  before(async function() {
    browser = await new webdriver.Builder()
      .usingServer("https://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(cap)
      .build();
    await browser.get(local_testing_site_url);
  });
  testScenarios(() => browser);
  after(async function() {
    await browser.quit();
  });
}
