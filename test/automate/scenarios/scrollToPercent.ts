import { Scenario, IOptions } from "."
import { delay } from "../delay";

export { scrollToPercent }

function scrollToPercent(browser: Scenario, options: IOptions = {}) {
  const duration = 0
  const horizontal = options && options.horizontal
  const initialize = browser.getManagerInit(options.elementScroll)
  describe("scroll to percent", () => {
    async function scrollToPercentTest(scrollPercent: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toPercent(${scrollPercent}, {
          duration: ${duration},
          horizontal: ${horizontal}
        });
      `)
      await delay(duration)
      const ratio = scrollPercent / 100
      const scrollSize = await browser.getScrollSize(options)
      const size = await browser.getSize(options)
      const offset = await browser.getOffset(options)

      const expectedPosition = Math.round((scrollSize - size) * ratio) // Some browsers don't scroll to floating values

      await browser.browser.takeScreenshot()
      expect(offset).toBe(expectedPosition)
    }

    const values = [0, 25, 50, 75, 100]

    for (const val of values) {
      it(`should scroll ${val}%`, async () => scrollToPercentTest(val))
    }
  })
}
