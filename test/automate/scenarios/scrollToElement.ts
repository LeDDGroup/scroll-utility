import { Scenario, IOptions } from "."
import { delay } from "../delay"
import { expectCloseBy } from "./expect-close-by"

export { scrollToElement }

function scrollToElement(browser: Scenario, options: IOptions, basicTests: boolean) {
  const duration = 0
  const horizontal = options && options.horizontal
  const initialize = browser.getManagerInit(options.elementScroll)
  const element = browser.getElementToScroll(options.elementScroll)
  it("scroll to element", async () => {
    async function scrollToElementTest(center: number) {
      await browser.evaluate(`
        ${initialize}
        scrollManager.centerElement(${element}, ${center}, {
          duration: ${duration},
          horizontal: ${horizontal},
        });
      `)
      await delay(duration)
      const [size, elementOffset, otherElementOffset, elementSize] = await Promise.all([
        browser.getSize(options),
        browser.getScrollOffset(options),
        browser.getElementScrollOffset(options),
        browser.getElementSize(options),
        browser.browser.takeScreenshot(), // return value not needed
      ])
      const ratio = center / 100
      expectCloseBy(otherElementOffset - elementOffset, (size - elementSize) * ratio)
    }

    const values = [0, 25, 75, 100]

    await scrollToElementTest(50)

    if (!basicTests) {
      for (const val of values) {
        await scrollToElementTest(val)
      }
    }
  })
}
