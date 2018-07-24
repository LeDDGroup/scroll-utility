import capabilities from "./capabilities";
import * as webdriver from "selenium-webdriver";
import { expect } from "chai";
import { Server } from "./setup/index";

import { testScenarios } from "./scenarios";

const local_testing_site_url = "http://localhost:8080/";
const cap = capabilities.window.chrome;
let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver;

const to_ms = (ms: number) => ms * Math.pow(10, 3);
const long_timeout = to_ms(0);


let server = new Server();

before(async function() {
  this.timeout(long_timeout);
  await server.start();
  browser = await new webdriver.Builder()
    .usingServer("https://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(cap)
    .build();
});

describe("client", async function() {
  this.timeout(long_timeout);
  describe("Browser setup", () => {
      it("Should navigate to local environment", async () => {
        await browser.get(local_testing_site_url);
        const title = await browser.getTitle();
        expect(title).to.be.eq("Testing");
      })
  })
  describe("Scenarios", () => {
    testScenarios(() => browser);
  })
});

after(async function() {
  this.timeout(long_timeout);
  server.stop();
  await browser.quit();
});
