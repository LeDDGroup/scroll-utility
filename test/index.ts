import * as webdriver from "selenium-webdriver"
import expect from "expect"
import capabilities from "./capabilities"
import * as ScrollUtility from "../"
declare const window: Window & { ScrollUtility: typeof ScrollUtility }

const local_testing_site_url = "http://localhost:8080/"

const duration = 0

for (const os in capabilities) {
  for (const browser in capabilities[os]) {
    const cap: webdriver.Capabilities = capabilities[os][browser]
    describe(`${os} ${browser}`, function(this) {
      let browser: webdriver.WebDriver = (null as any) as webdriver.WebDriver
      before(async function(this) {
        browser = await new webdriver.Builder()
          .usingServer("https://hub-cloud.browserstack.com/wd/hub")
          .withCapabilities(cap)
          .build()
        await browser.get(local_testing_site_url)
        expect(browser).not.toBeNull()
      })
      it("should have ScrollUtility", async function() {
        const scrollUtility = await browser.executeScript(() => {
          return window.ScrollUtility
        })
        expect(scrollUtility).toBeDefined()
      })
      ;[["html", "#scrollable"], ["#scrollable", "#element"]].forEach(([wrapper, element]) => {
        ;[false, true].forEach(horizontal => {
          describe("scrollTo", () => {
            ;[100, 53.3, 53.5, 53.7, 0].forEach(value => {
              it(`${value}`, async function() {
                await browser.executeScript(
                  (wrapper, horizontal, value) => {
                    const scroll = new window.ScrollUtility.Scroll(wrapper, horizontal)
                    return scroll.scrollTo(value)
                  },
                  wrapper,
                  horizontal,
                  value,
                )
                await wait(duration + 1)
                const scrollPosition = await browser.executeScript(
                  (wrapper, horizontal) =>
                    new window.ScrollUtility.Scroll(wrapper, horizontal).scrollPosition,
                  wrapper,
                  horizontal,
                )
                expect(scrollPosition).toBe(Math.floor(value))
              })
            })
          })
          describe("center element", () => {
            ;[0, 100, 50].forEach(percent => {
              it(`should be centered at ${percent}`, async function() {
                browser.executeScript(
                  (wrapper, horizontal, element) => {
                    new window.ScrollUtility.Scroll(wrapper, !horizontal).scrollTo(element, 50)
                  },
                  wrapper,
                  horizontal,
                  element,
                )
                browser.executeScript(
                  (wrapper, horizontal, element, percent) => {
                    new window.ScrollUtility.Scroll(wrapper, horizontal).scrollTo(element, percent)
                  },
                  wrapper,
                  horizontal,
                  element,
                  percent,
                )
                await wait(duration + 1)
              })
            })
          })
        })
      })
      after(async function() {
        await browser.quit()
      })
    })
  }
}

function wait(duration: number) {
  return new Promise(done => {
    setTimeout(done, duration)
  })
}
