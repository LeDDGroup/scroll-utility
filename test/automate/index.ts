import capabilities from "./capabilities"
import * as webdriver from "selenium-webdriver"
import { Server } from "./setup/index"
import expect from "expect"

import { testScenarios } from "./scenarios"

const local_testing_site_url = "http://localhost:8080/"
const long_timeout = 0

const branch = process.env["TRAVIS_BRANCH"]

const basicTests = !!branch && branch !== "master"

const server = new Server()
before(async function(this) {
  this.timeout(long_timeout)
  return server.start()
})
describe("client tests ", async function() {
  if (basicTests) {
    test(capabilities.Windows.chrome)
  } else {
    for (const os in capabilities) {
      for (const browser in capabilities[os]) {
        const cap: webdriver.Capabilities = capabilities[os][browser]
        describe(`${os} ${browser}`, async function() {
          test(cap)
        })
      }
    }
  }
})
after(async function(this) {
  this.timeout(long_timeout)
  await server.stop()
})

function test(cap: webdriver.Capabilities) {
  let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver
  before(async function(this) {
    this.timeout(long_timeout)
    browser = await new webdriver.Builder()
      .usingServer("https://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(cap)
      .build()
    await browser.get(local_testing_site_url)
    expect(browser).toBeTruthy()
  })
  testScenarios(() => browser, basicTests)
  after(async function(this) {
    this.timeout(long_timeout)
    await browser.quit()
  })
}
