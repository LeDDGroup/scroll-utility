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
                  (wrapper: string, horizontal: boolean, value: number) => {
                    const scroll = new window.ScrollUtility.Scroll(wrapper, horizontal)
                    scroll.scrollTo(value)
                  },
                  wrapper,
                  horizontal,
                  value,
                )
                await wait(duration + 1)
                const scrollPosition = await browser.executeScript(
                  (wrapper: string, horizontal: boolean) =>
                    window.ScrollUtility.getScrollPosition(wrapper, horizontal),
                  wrapper,
                  horizontal,
                )
                expect(scrollPosition).toBe(Math.floor(value))
              })
            })
          })
          describe("center element", () => {
            ;[0, 1, 0.5].forEach(value => {
              it(`should be centered at ${value}`, async function() {
                await browser.executeScript(
                  (wrapper: string, horizontal: boolean, element: HTMLElement) => {
                    new window.ScrollUtility.Scroll(wrapper, !horizontal).scrollTo.element(
                      element,
                      0.5,
                    )
                  },
                  wrapper,
                  horizontal,
                  element,
                )
                await browser.executeScript(
                  (wrapper: string, horizontal: boolean, element: HTMLElement, value: number) => {
                    new window.ScrollUtility.Scroll(wrapper, horizontal).scrollTo.element(
                      element,
                      value,
                    )
                  },
                  wrapper,
                  horizontal,
                  element,
                  value,
                )

                await wait(duration + 1)

                const placement = await browser.executeScript(
                  (wrapper: string, horizontal: boolean, element: HTMLElement) => {
                    return window.ScrollUtility.getElementPlacement(wrapper, element, horizontal)
                  },
                  wrapper,
                  horizontal,
                  element,
                )
                expect(placement).toBe(value)
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
