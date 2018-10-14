import { Scenario, IOptions } from "."
import { delay } from "../delay"
import { expectCloseBy } from "./expect-close-by"

export { scrollToElement }

function scrollToElement(browser: Scenario, options: IOptions = {}) {
  const duration = 0
  const horizontal = options && options.horizontal
  const initialize = browser.getManagerInit(options.elementScroll)
  const element = browser.getElementToScroll(options.elementScroll)
  describe("scroll to element", () => {
    async function scrollToElementTest(center: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.scroll.toElement(${element}, {
          duration: ${duration},
          horizontal: ${horizontal},
          center: ${center},
        });
      `)
      await delay(duration)
      const ratio = center / 100
      const size = await browser.getSize(options)
      const elementOffset = await browser.getScrollOffset(options)
      const otherElementOffset = await browser.getElementScrollOffset(options)
      const elementSize = await browser.getElementSize(options)

      await browser.browser.takeScreenshot()
      expectCloseBy(otherElementOffset - elementOffset, (size - elementSize) * ratio)
    }

    const values = [0, 25, 50, 75, 100]

    for (const val of values) {
      it(`should scroll to element and center it at ${val}%`, async () => scrollToElementTest(val))
    }
  })
}
