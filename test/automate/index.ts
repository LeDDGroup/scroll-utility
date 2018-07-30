import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { Server } from "./setup/index";

import { testScenarios } from "./scenaries";

const local_testing_site_url = "http://localhost:8080/";
const long_timeout = 0;

for (const os in capabilities) {
  for (const browser in capabilities[os]) {
    test(os, browser);
  }
}

function test(os: string, browserId: string) {
  describe(`testing in ${os} ${browserId}`, async function() {
    this.timeout(long_timeout);
    const cap = capabilities[os][browserId];
    let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;
    let server = new Server();
    before(async function() {
      this.timeout(long_timeout);
      await server.start();
      browser = await new webdriver.Builder()
        .usingServer("https://hub-cloud.browserstack.com/wd/hub")
        .withCapabilities(cap)
        .build();
    });
    describe("Browser setup", () => {
      it("Should navigate to local environment", async () => {
        await browser.get(local_testing_site_url);
        const title = await browser.getTitle();
        expect(title).to.be.eq("Testing");
      })
    });
    describe("Scenarios", () => {
      testScenarios(() => browser);
    })
    after(async function() {
      this.timeout(long_timeout);
      server.stop();
      await browser.quit();
    });
  });
}
