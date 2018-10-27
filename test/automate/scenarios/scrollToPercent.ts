import { Scenario, IOptions } from "."
import { delay } from "../delay"
import { expectCloseBy } from "./expect-close-by"

export { scrollToPercent }

function scrollToPercent(browser: Scenario, options: IOptions, basicTests: boolean) {
  const duration = 0
  const horizontal = options && options.horizontal
  const initialize = browser.getManagerInit(options.elementScroll)
  it("scroll to percent", async () => {
    async function scrollToPercentTest(scrollPercent: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scrollTo("percent", {
          value: ${scrollPercent},
          duration: ${duration},
          horizontal: ${horizontal}
        });
      `)
      await delay(duration)
      const [scrollSize, size, offset] = await Promise.all([
        browser.getScrollSize(options),
        browser.getSize(options),
        browser.getOffset(options),
        browser.browser.takeScreenshot(), // return value not needed
      ])

      const ratio = scrollPercent / 100
      const expectedPosition = (scrollSize - size) * ratio

      expectCloseBy(offset, expectedPosition)
    }

    const values = [0, 25, 75, 100]

    await scrollToPercentTest(50)

    if (!basicTests) {
      for (const val of values) {
        await scrollToPercentTest(val)
      }
    }
  })
}
