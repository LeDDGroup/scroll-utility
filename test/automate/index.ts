import capabilities from "./capabilities"
import * as webdriver from "selenium-webdriver"
import { Server } from "./setup/index"

import { testScenarios } from "./scenarios"

const local_testing_site_url = "http://localhost:8080/"
const long_timeout = 0

let server = new Server()
beforeAll(async function() {
  await server.start()
}, long_timeout)
describe("client tests ", async function() {
  for (const os in capabilities) {
    for (const browser in capabilities[os]) {
      const cap: webdriver.Capabilities = capabilities[os][browser]
      describe(`${os} ${browser}`, async function() {
        test(cap)
      })
    }
  }
})
afterAll(async function() {
  await server.stop()
}, long_timeout)

function test(cap: webdriver.Capabilities) {
  let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver
  beforeAll(async function() {
    browser = await new webdriver.Builder()
      .usingServer("https://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(cap)
      .build()
    await browser.get(local_testing_site_url)
  })
  testScenarios(() => browser)
  afterAll(async function() {
    await browser.quit()
  })
}
